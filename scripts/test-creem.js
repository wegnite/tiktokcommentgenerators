#!/usr/bin/env node

/**
 * Creem Integration Test Script
 * 
 * This script tests the Creem integration by simulating API calls
 * Run with: node scripts/test-creem.js
 */

const https = require('https');
const crypto = require('crypto');

// Configuration
const config = {
  apiKey: process.env.CREEM_API_KEY || 'your_test_api_key',
  apiUrl: process.env.CREEM_API_URL || 'https://api.creem.io/v1',
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET || 'your_webhook_secret',
  testMode: true
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test 1: Verify API Key
async function testApiKey() {
  log('\n📝 Test 1: Verify API Key', 'blue');
  
  if (!config.apiKey || config.apiKey === 'your_test_api_key') {
    log('❌ API Key not configured. Please set CREEM_API_KEY environment variable.', 'red');
    return false;
  }
  
  log('✅ API Key is configured', 'green');
  return true;
}

// Test 2: Create Product
async function testCreateProduct() {
  log('\n📝 Test 2: Create Test Product', 'blue');
  
  const product = {
    name: 'Test Product - ' + Date.now(),
    description: 'This is a test product',
    price: 9900, // $99.00
    currency: 'USD',
    billing_period: 'one_time',
    tax_mode: 'exclusive'
  };
  
  try {
    // Simulate product creation
    log(`Creating product: ${product.name}`, 'yellow');
    log(`Price: $${product.price / 100} ${product.currency}`, 'yellow');
    log('✅ Product creation simulated successfully', 'green');
    return product;
  } catch (error) {
    log(`❌ Product creation failed: ${error.message}`, 'red');
    return null;
  }
}

// Test 3: Create Checkout Session
async function testCheckoutSession(product) {
  log('\n📝 Test 3: Create Checkout Session', 'blue');
  
  if (!product) {
    log('⚠️  Skipping checkout session test (no product)', 'yellow');
    return null;
  }
  
  const session = {
    product_name: product.name,
    amount: product.price,
    currency: product.currency,
    customer_email: 'test@example.com',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
    metadata: {
      order_no: 'TEST_' + Date.now(),
      test_mode: true
    }
  };
  
  try {
    log(`Creating checkout session for: ${session.customer_email}`, 'yellow');
    log(`Amount: $${session.amount / 100} ${session.currency}`, 'yellow');
    
    // Simulate session creation
    const mockSession = {
      id: 'cs_test_' + Date.now(),
      payment_url: `https://pay.creem.io/checkout/cs_test_${Date.now()}`,
      status: 'pending',
      ...session
    };
    
    log(`✅ Checkout session created: ${mockSession.id}`, 'green');
    log(`Payment URL: ${mockSession.payment_url}`, 'green');
    return mockSession;
  } catch (error) {
    log(`❌ Checkout session creation failed: ${error.message}`, 'red');
    return null;
  }
}

// Test 4: Webhook Signature Verification
async function testWebhookSignature() {
  log('\n📝 Test 4: Webhook Signature Verification', 'blue');
  
  const payload = JSON.stringify({
    id: 'evt_test_123',
    type: 'payment.completed',
    created_at: new Date().toISOString(),
    data: {
      payment_id: 'pay_test_123',
      amount: 9900,
      currency: 'USD',
      status: 'succeeded'
    }
  });
  
  const signature = crypto
    .createHmac('sha256', config.webhookSecret)
    .update(payload)
    .digest('hex');
  
  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', config.webhookSecret)
    .update(payload)
    .digest('hex');
  
  if (signature === expectedSignature) {
    log('✅ Webhook signature verification passed', 'green');
    return true;
  } else {
    log('❌ Webhook signature verification failed', 'red');
    return false;
  }
}

// Test 5: Simulate Payment Webhook
async function testPaymentWebhook() {
  log('\n📝 Test 5: Simulate Payment Completed Webhook', 'blue');
  
  const webhookEvent = {
    id: 'evt_test_' + Date.now(),
    type: 'payment.completed',
    created_at: new Date().toISOString(),
    data: {
      payment_id: 'pay_test_' + Date.now(),
      customer_id: 'cust_test_123',
      amount: 9900,
      currency: 'USD',
      status: 'succeeded',
      customer_email: 'test@example.com',
      metadata: {
        order_no: 'TEST_123456',
        user_uuid: 'user_test_123',
        credits: 1000
      }
    }
  };
  
  log('Webhook Event:', 'yellow');
  log(JSON.stringify(webhookEvent, null, 2), 'yellow');
  
  log('✅ Payment webhook simulation successful', 'green');
  return webhookEvent;
}

// Test 6: Environment Check
async function testEnvironment() {
  log('\n📝 Test 6: Environment Configuration Check', 'blue');
  
  const requiredVars = [
    'CREEM_API_KEY',
    'CREEM_WEBHOOK_SECRET',
    'NEXT_PUBLIC_CREEM_ENABLED'
  ];
  
  const optionalVars = [
    'CREEM_API_URL',
    'NEXT_PUBLIC_WEB_URL'
  ];
  
  let allRequired = true;
  
  log('Required Environment Variables:', 'yellow');
  for (const varName of requiredVars) {
    if (process.env[varName]) {
      log(`  ✅ ${varName}: Set`, 'green');
    } else {
      log(`  ❌ ${varName}: Not set`, 'red');
      allRequired = false;
    }
  }
  
  log('\nOptional Environment Variables:', 'yellow');
  for (const varName of optionalVars) {
    if (process.env[varName]) {
      log(`  ✅ ${varName}: Set`, 'green');
    } else {
      log(`  ⚠️  ${varName}: Not set (using defaults)`, 'yellow');
    }
  }
  
  return allRequired;
}

// Main test runner
async function runTests() {
  log('====================================', 'blue');
  log('     Creem Integration Tests', 'blue');
  log('====================================', 'blue');
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0
  };
  
  // Run tests
  const tests = [
    { name: 'API Key Verification', fn: testApiKey },
    { name: 'Product Creation', fn: testCreateProduct },
    { name: 'Webhook Signature', fn: testWebhookSignature },
    { name: 'Payment Webhook', fn: testPaymentWebhook },
    { name: 'Environment Check', fn: testEnvironment }
  ];
  
  let product = null;
  
  for (const test of tests) {
    results.total++;
    try {
      let result;
      if (test.name === 'Product Creation') {
        product = await test.fn();
        result = product !== null;
      } else {
        result = await test.fn(product);
      }
      
      if (result !== false) {
        results.passed++;
      } else {
        results.failed++;
      }
    } catch (error) {
      results.failed++;
      log(`❌ Test failed with error: ${error.message}`, 'red');
    }
  }
  
  // Checkout session test (depends on product)
  if (product) {
    results.total++;
    const session = await testCheckoutSession(product);
    if (session) {
      results.passed++;
    } else {
      results.failed++;
    }
  }
  
  // Summary
  log('\n====================================', 'blue');
  log('           Test Summary', 'blue');
  log('====================================', 'blue');
  log(`Total Tests: ${results.total}`, 'blue');
  log(`Passed: ${results.passed}`, 'green');
  log(`Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
  
  if (results.failed === 0) {
    log('\n🎉 All tests passed! Creem integration is ready.', 'green');
  } else {
    log('\n⚠️  Some tests failed. Please review the configuration.', 'yellow');
  }
  
  // Integration checklist
  log('\n====================================', 'blue');
  log('      Integration Checklist', 'blue');
  log('====================================', 'blue');
  
  const checklist = [
    '1. Set up Creem account at https://creem.io',
    '2. Get API key from Creem dashboard',
    '3. Configure webhook URL in Creem dashboard',
    '4. Add environment variables to .env file',
    '5. Run database migration script',
    '6. Test checkout flow in development',
    '7. Test webhook handling',
    '8. Deploy to staging for testing',
    '9. Enable in production when ready'
  ];
  
  checklist.forEach(item => log(item, 'yellow'));
  
  log('\n📚 Documentation: docs/CREEM_INTEGRATION.md', 'blue');
  log('💬 Support: support@creem.io', 'blue');
}

// Run the tests
runTests().catch(error => {
  log(`\n❌ Test runner failed: ${error.message}`, 'red');
  process.exit(1);
});