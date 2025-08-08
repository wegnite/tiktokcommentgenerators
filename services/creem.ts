import { Order } from "@/types/order";
import { getSnowId } from "@/lib/hash";

export interface CreemProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billing_period?: 'monthly' | 'yearly' | 'one_time';
  tax_mode?: 'inclusive' | 'exclusive';
  tax_category?: string;
}

export interface CreemCheckoutSession {
  id: string;
  payment_url: string;
  status: string;
  customer_id?: string;
  amount: number;
  currency: string;
  product_name: string;
  metadata?: Record<string, any>;
}

export interface CreemWebhookEvent {
  id: string;
  type: string;
  created_at: string;
  data: {
    payment_id?: string;
    customer_id?: string;
    amount?: number;
    currency?: string;
    status?: string;
    product_id?: string;
    product_name?: string;
    customer_email?: string;
    metadata?: Record<string, any>;
  };
}

class CreemService {
  private apiKey: string;
  private apiUrl: string;
  private webhookSecret: string;

  constructor() {
    this.apiKey = process.env.CREEM_API_KEY || '';
    this.apiUrl = process.env.CREEM_API_URL || 'https://api.creem.io/v1';
    this.webhookSecret = process.env.CREEM_WEBHOOK_SECRET || '';
  }

  private async makeRequest(
    endpoint: string,
    method: string = 'GET',
    body?: any
  ): Promise<any> {
    const url = `${this.apiUrl}${endpoint}`;
    
    const headers = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Creem API error: ${response.status} - ${error}`);
    }

    return await response.json();
  }

  async createProduct(product: Partial<CreemProduct>): Promise<CreemProduct> {
    return await this.makeRequest('/products', 'POST', product);
  }

  async getProduct(productId: string): Promise<CreemProduct> {
    return await this.makeRequest(`/products/${productId}`);
  }

  async createCheckoutSession(params: {
    product_id?: string;
    product_name: string;
    amount: number;
    currency: string;
    customer_email: string;
    success_url: string;
    cancel_url: string;
    metadata?: Record<string, any>;
    billing_period?: 'monthly' | 'yearly' | 'one_time';
  }): Promise<CreemCheckoutSession> {
    // If product_id is provided, use it; otherwise create inline product
    const sessionData: any = {
      success_url: params.success_url,
      cancel_url: params.cancel_url,
      metadata: params.metadata,
      customer: {
        email: params.customer_email,
      }
    };

    if (params.product_id) {
      // Use existing product
      sessionData.line_items = [{
        product: params.product_id,
        quantity: 1
      }];
    } else {
      // Create inline product
      sessionData.line_items = [{
        price_data: {
          currency: params.currency.toUpperCase(),
          unit_amount: params.amount,
          product_data: {
            name: params.product_name,
          },
          recurring: params.billing_period !== 'one_time' ? {
            interval: params.billing_period === 'monthly' ? 'month' : 'year'
          } : undefined
        },
        quantity: 1
      }];
    }

    return await this.makeRequest('/checkout/sessions', 'POST', sessionData);
  }

  async getCheckoutSession(sessionId: string): Promise<CreemCheckoutSession> {
    return await this.makeRequest(`/checkout/sessions/${sessionId}`);
  }

  async getPayment(paymentId: string): Promise<any> {
    return await this.makeRequest(`/payments/${paymentId}`);
  }

  async createSubscription(params: {
    customer_id: string;
    product_id: string;
    trial_days?: number;
  }): Promise<any> {
    return await this.makeRequest('/subscriptions', 'POST', params);
  }

  async cancelSubscription(subscriptionId: string): Promise<any> {
    return await this.makeRequest(`/subscriptions/${subscriptionId}/cancel`, 'POST');
  }

  async verifyWebhookSignature(
    payload: string,
    signature: string
  ): Promise<boolean> {
    // Creem webhook signature verification
    // This is a simplified version - actual implementation depends on Creem's documentation
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(payload)
      .digest('hex');
    
    return signature === expectedSignature;
  }

  async handleWebhookEvent(event: CreemWebhookEvent): Promise<void> {
    console.log('Creem webhook event received:', event.type);
    
    switch (event.type) {
      case 'payment.completed':
      case 'payment.succeeded':
        await this.handlePaymentCompleted(event);
        break;
      
      case 'subscription.created':
        await this.handleSubscriptionCreated(event);
        break;
      
      case 'subscription.cancelled':
        await this.handleSubscriptionCancelled(event);
        break;
      
      default:
        console.log('Unhandled Creem webhook event:', event.type);
    }
  }

  private async handlePaymentCompleted(event: CreemWebhookEvent): Promise<void> {
    const { data } = event;
    
    if (!data.payment_id || !data.metadata?.order_no) {
      throw new Error('Invalid payment completed event data');
    }

    const { findOrderByOrderNo, updateOrderStatus } = await import('@/models/order');
    const { updateCreditForOrder } = await import('@/services/credit');
    const { updateAffiliateForOrder } = await import('@/services/affiliate');
    const { getIsoTimestr } = await import('@/lib/time');
    
    const order = await findOrderByOrderNo(data.metadata.order_no);
    
    if (!order || order.status !== 'created') {
      throw new Error(`Invalid order: ${data.metadata.order_no}`);
    }

    const paid_at = getIsoTimestr();
    const paid_email = data.customer_email || order.user_email;
    const paid_detail = JSON.stringify(event);

    await updateOrderStatus(
      order.order_no,
      'paid',
      paid_at,
      paid_email,
      paid_detail
    );

    if (order.user_uuid && order.credits > 0) {
      await updateCreditForOrder(order);
    }

    if (order.user_uuid) {
      await updateAffiliateForOrder(order);
    }

    console.log('Creem payment completed successfully:', order.order_no);
  }

  private async handleSubscriptionCreated(event: CreemWebhookEvent): Promise<void> {
    console.log('Creem subscription created:', event.data);
    // Handle subscription creation logic
  }

  private async handleSubscriptionCancelled(event: CreemWebhookEvent): Promise<void> {
    console.log('Creem subscription cancelled:', event.data);
    // Handle subscription cancellation logic
  }

  formatAmount(amount: number): number {
    // Creem expects amount in smallest currency unit (e.g., cents)
    return Math.round(amount);
  }

  getBillingPeriod(interval: string): 'monthly' | 'yearly' | 'one_time' {
    switch (interval) {
      case 'month':
        return 'monthly';
      case 'year':
        return 'yearly';
      default:
        return 'one_time';
    }
  }
}

export const creemService = new CreemService();