# Creem Payment Gateway Integration Guide

## Overview

This document describes the Creem payment gateway integration in the TikTok Comment Generator application. Creem is integrated alongside Stripe to provide an alternative payment method for users.

## Features

- ✅ One-time and subscription payments
- ✅ Global tax handling (Merchant of Record)
- ✅ Fraud protection
- ✅ Webhook support for real-time payment updates
- ✅ Multiple currency support
- ✅ Easy integration with existing order system

## Configuration

### 1. Environment Variables

Add the following environment variables to your `.env` file:

```env
# Creem Configuration
CREEM_API_KEY="your_creem_api_key"
CREEM_API_URL="https://api.creem.io/v1"
CREEM_WEBHOOK_SECRET="your_webhook_secret"
NEXT_PUBLIC_CREEM_ENABLED="true"  # Set to "true" to enable Creem
```

### 2. Database Migration

Run the following SQL migration to add Creem support to your database:

```sql
-- Add Creem payment gateway support to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_gateway VARCHAR(50) DEFAULT 'stripe';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS creem_payment_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS creem_customer_id VARCHAR(255);

-- Add indexes for Creem lookups
CREATE INDEX IF NOT EXISTS idx_orders_creem_payment_id ON orders(creem_payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_gateway ON orders(payment_gateway);
```

### 3. Webhook Configuration

1. Log in to your Creem dashboard
2. Navigate to the "Developers" section
3. Click on "Webhooks" and add a new webhook
4. Set the webhook URL to: `https://yourdomain.com/api/creem-notify`
5. Copy the webhook secret and add it to your `.env` file

## API Endpoints

### Checkout Endpoint

**POST** `/api/checkout-creem`

Creates a new Creem checkout session.

```json
{
  "product_id": "prod_123",
  "product_name": "Premium Plan",
  "credits": 1000,
  "interval": "month",
  "amount": 9900,
  "currency": "USD",
  "valid_months": 1
}
```

Response:
```json
{
  "code": 0,
  "data": {
    "order_no": "123456789",
    "payment_url": "https://pay.creem.io/checkout/cs_xxx",
    "session_id": "cs_xxx",
    "gateway": "creem"
  }
}
```

### Webhook Endpoint

**POST** `/api/creem-notify`

Handles Creem webhook notifications for payment events.

Webhook events handled:
- `payment.completed` - Payment successfully completed
- `subscription.created` - New subscription created
- `subscription.cancelled` - Subscription cancelled

## Frontend Integration

### Payment Button

The pricing component automatically displays a "Pay with Creem" button when `NEXT_PUBLIC_CREEM_ENABLED` is set to `true`.

```tsx
// In components/blocks/pricing/index.tsx
{isCreemEnabled && (
  <Button
    variant="secondary"
    onClick={() => handleCheckout(item, false, true)}
  >
    Pay with Creem
  </Button>
)}
```

### Payment Flow

1. User clicks "Pay with Creem" button
2. System creates an order with `payment_gateway: 'creem'`
3. Creem checkout session is created via API
4. User is redirected to Creem's hosted payment page
5. After payment, user is redirected back to success page
6. Webhook confirms payment and updates order status

## Testing

### Local Testing with ngrok

1. Install ngrok: `npm install -g ngrok`
2. Start your local server: `npm run dev`
3. Create a tunnel: `ngrok http 3000`
4. Update webhook URL in Creem dashboard to ngrok URL
5. Test payments using Creem test mode

### Test Cards

In Creem test mode, use these test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

### Running Tests

```bash
# Run all tests
npm test

# Run Creem integration tests only
npm test -- tests/creem-integration.test.ts

# Run with coverage
npm test -- --coverage
```

## Order Processing

### Order States

Orders can have the following states:
- `created` - Order created, payment pending
- `paid` - Payment completed successfully
- `deleted` - Order cancelled or deleted

### Payment Gateway Field

The `payment_gateway` field identifies which payment processor was used:
- `stripe` - Payment via Stripe
- `creem` - Payment via Creem

## Troubleshooting

### Common Issues

1. **Webhook signature verification failing**
   - Ensure `CREEM_WEBHOOK_SECRET` matches the secret in Creem dashboard
   - Check that the raw request body is used for signature verification

2. **Payment URL not redirecting**
   - Verify `success_url` and `cancel_url` are absolute URLs
   - Check that URLs are whitelisted in Creem dashboard

3. **Orders not updating after payment**
   - Check webhook endpoint is accessible
   - Verify webhook events are being received (check logs)
   - Ensure database has proper indexes

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=creem:*
```

This will log all Creem API calls and webhook events.

## Security Considerations

1. **API Keys**: Never expose API keys in client-side code
2. **Webhook Verification**: Always verify webhook signatures
3. **HTTPS**: Ensure all endpoints use HTTPS in production
4. **PCI Compliance**: Creem handles PCI compliance as Merchant of Record

## Support

- Creem Documentation: https://docs.creem.io
- Creem Support: support@creem.io
- Application Issues: Create an issue in the repository

## Migration from Stripe-only

If migrating from a Stripe-only setup:

1. Run database migration to add Creem fields
2. Update environment variables
3. Deploy new API endpoints
4. Enable Creem in frontend (`NEXT_PUBLIC_CREEM_ENABLED=true`)
5. Test both payment methods in staging
6. Monitor both payment gateways after deployment

## Best Practices

1. **Dual Gateway Support**: Keep both Stripe and Creem active for redundancy
2. **Error Handling**: Implement proper error handling for both gateways
3. **Monitoring**: Set up monitoring for both payment systems
4. **Testing**: Test both payment flows regularly
5. **Documentation**: Keep this documentation updated with any changes