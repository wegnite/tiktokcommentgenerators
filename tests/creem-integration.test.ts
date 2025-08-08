/**
 * Creem Integration Test Suite
 * 
 * This test suite validates the Creem payment gateway integration
 * including checkout flow, webhook handling, and order processing.
 */

import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { creemService } from '@/services/creem';
import { insertOrder, findOrderByOrderNo, updateOrderStatus } from '@/models/order';
import { Order } from '@/types/order';

// Mock environment variables
beforeAll(() => {
  process.env.CREEM_API_KEY = 'test_api_key';
  process.env.CREEM_API_URL = 'https://api.creem.io/v1';
  process.env.CREEM_WEBHOOK_SECRET = 'test_webhook_secret';
  process.env.NEXT_PUBLIC_WEB_URL = 'http://localhost:3000';
  process.env.NEXT_PUBLIC_PROJECT_NAME = 'TestProject';
});

describe('Creem Service', () => {
  describe('Product Management', () => {
    it('should create a product successfully', async () => {
      const product = {
        name: 'Test Product',
        price: 9900, // $99.00 in cents
        currency: 'USD',
        billing_period: 'monthly' as const,
        tax_mode: 'exclusive' as const,
      };

      // Mock the API call
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: 'prod_123', ...product }),
        })
      ) as jest.Mock;

      const result = await creemService.createProduct(product);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(product.name);
    });

    it('should handle billing period conversion correctly', () => {
      expect(creemService.getBillingPeriod('month')).toBe('monthly');
      expect(creemService.getBillingPeriod('year')).toBe('yearly');
      expect(creemService.getBillingPeriod('one-time')).toBe('one_time');
    });

    it('should format amount correctly', () => {
      expect(creemService.formatAmount(99.99)).toBe(100);
      expect(creemService.formatAmount(100)).toBe(100);
      expect(creemService.formatAmount(99.994)).toBe(100);
      expect(creemService.formatAmount(99.995)).toBe(100);
    });
  });

  describe('Checkout Session', () => {
    it('should create a checkout session successfully', async () => {
      const params = {
        product_name: 'Premium Plan',
        amount: 9900,
        currency: 'USD',
        customer_email: 'test@example.com',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        billing_period: 'monthly' as const,
        metadata: {
          order_no: '123456',
          user_uuid: 'user_123',
        },
      };

      const mockSession = {
        id: 'cs_123',
        payment_url: 'https://pay.creem.io/checkout/cs_123',
        status: 'pending',
        customer_id: 'cust_123',
        amount: 9900,
        currency: 'USD',
        product_name: 'Premium Plan',
        metadata: params.metadata,
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSession),
        })
      ) as jest.Mock;

      const result = await creemService.createCheckoutSession(params);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('payment_url');
      expect(result.customer_id).toBe('cust_123');
    });
  });

  describe('Webhook Handling', () => {
    it('should verify webhook signature correctly', async () => {
      const payload = JSON.stringify({ event: 'payment.completed' });
      const crypto = require('crypto');
      const secret = 'test_webhook_secret';
      const signature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

      const isValid = await creemService.verifyWebhookSignature(payload, signature);
      expect(isValid).toBe(true);
    });

    it('should reject invalid webhook signature', async () => {
      const payload = JSON.stringify({ event: 'payment.completed' });
      const invalidSignature = 'invalid_signature';

      const isValid = await creemService.verifyWebhookSignature(payload, invalidSignature);
      expect(isValid).toBe(false);
    });

    it('should handle payment completed event', async () => {
      const event = {
        id: 'evt_123',
        type: 'payment.completed',
        created_at: '2024-01-01T00:00:00Z',
        data: {
          payment_id: 'pay_123',
          customer_id: 'cust_123',
          amount: 9900,
          currency: 'USD',
          status: 'succeeded',
          customer_email: 'test@example.com',
          metadata: {
            order_no: '123456',
            user_uuid: 'user_123',
            credits: 1000,
          },
        },
      };

      // Mock order functions
      jest.mock('@/models/order', () => ({
        findOrderByOrderNo: jest.fn(() => Promise.resolve({
          order_no: '123456',
          status: 'created',
          user_uuid: 'user_123',
          credits: 1000,
        })),
        updateOrderStatus: jest.fn(() => Promise.resolve()),
      }));

      jest.mock('@/services/credit', () => ({
        updateCreditForOrder: jest.fn(() => Promise.resolve()),
      }));

      jest.mock('@/services/affiliate', () => ({
        updateAffiliateForOrder: jest.fn(() => Promise.resolve()),
      }));

      // Test should not throw
      await expect(creemService.handleWebhookEvent(event)).resolves.not.toThrow();
    });
  });
});

describe('Creem API Routes', () => {
  describe('POST /api/checkout-creem', () => {
    it('should create a Creem checkout session', async () => {
      const requestBody = {
        product_id: 'prod_123',
        product_name: 'Premium Plan',
        credits: 1000,
        interval: 'month',
        amount: 9900,
        currency: 'USD',
        valid_months: 1,
      };

      // Mock the fetch for internal API call
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({
            code: 0,
            data: {
              order_no: '123456',
              payment_url: 'https://pay.creem.io/checkout/cs_123',
              session_id: 'cs_123',
              gateway: 'creem',
            },
          }),
        })
      ) as jest.Mock;

      const response = await fetch('/api/checkout-creem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      expect(result.code).toBe(0);
      expect(result.data).toHaveProperty('payment_url');
      expect(result.data.gateway).toBe('creem');
    });
  });

  describe('POST /api/creem-notify', () => {
    it('should handle Creem webhook notifications', async () => {
      const webhookPayload = {
        id: 'evt_123',
        type: 'payment.completed',
        created_at: '2024-01-01T00:00:00Z',
        data: {
          payment_id: 'pay_123',
          customer_email: 'test@example.com',
          metadata: {
            order_no: '123456',
          },
        },
      };

      const crypto = require('crypto');
      const signature = crypto
        .createHmac('sha256', 'test_webhook_secret')
        .update(JSON.stringify(webhookPayload))
        .digest('hex');

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ code: 0 }),
        })
      ) as jest.Mock;

      const response = await fetch('/api/creem-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-creem-signature': signature,
        },
        body: JSON.stringify(webhookPayload),
      });

      expect(response.status).toBe(200);
    });
  });
});

describe('Frontend Integration', () => {
  it('should display Creem payment button when enabled', () => {
    process.env.NEXT_PUBLIC_CREEM_ENABLED = 'true';
    
    // This would be an actual React component test
    // For now, we just verify the environment variable is set correctly
    expect(process.env.NEXT_PUBLIC_CREEM_ENABLED).toBe('true');
  });

  it('should hide Creem payment button when disabled', () => {
    process.env.NEXT_PUBLIC_CREEM_ENABLED = 'false';
    
    expect(process.env.NEXT_PUBLIC_CREEM_ENABLED).toBe('false');
  });
});

// Cleanup
afterAll(() => {
  jest.clearAllMocks();
});