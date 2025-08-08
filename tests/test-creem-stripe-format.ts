// 测试 Creem API（使用类似 Stripe 的格式）
const API_KEY = 'creem_test_2AKSH3Os21VtRxV6WvdQfz';
const API_URL = 'https://api.creem.io/v1';

async function testCreemStripeFormat() {
  console.log('测试 Creem API (Stripe 格式)...\n');
  
  // 1. 测试使用 Bearer token
  console.log('1. 测试使用 Bearer Authorization:');
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log(`   状态码: ${response.status}`);
    const text = await response.text();
    console.log(`   响应: ${text.substring(0, 200)}`);
  } catch (error) {
    console.log(`   错误: ${error}`);
  }
  
  // 2. 测试使用 Basic Auth
  console.log('\n2. 测试使用 Basic Authorization:');
  try {
    const encodedKey = Buffer.from(`${API_KEY}:`).toString('base64');
    const response = await fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${encodedKey}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log(`   状态码: ${response.status}`);
    const text = await response.text();
    console.log(`   响应: ${text.substring(0, 200)}`);
  } catch (error) {
    console.log(`   错误: ${error}`);
  }
  
  // 3. 测试创建 Checkout（Stripe 格式）
  console.log('\n3. 测试创建 Checkout Session (Stripe 格式):');
  try {
    const sessionData = {
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Test Product',
          },
          unit_amount: 999,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    };
    
    console.log('   请求数据:', JSON.stringify(sessionData, null, 2));
    
    const response = await fetch(`${API_URL}/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData)
    });
    
    console.log(`   状态码: ${response.status}`);
    const text = await response.text();
    console.log(`   响应: ${text}`);
  } catch (error) {
    console.log(`   错误: ${error}`);
  }
  
  // 4. 测试不同的端点路径
  console.log('\n4. 测试不同的端点路径:');
  const endpoints = [
    '/checkout-sessions',
    '/payments/checkout',
    '/sessions',
    '/api/checkout/sessions'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`   尝试: ${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        }
      });
      console.log(`     状态码: ${response.status}`);
    } catch (error) {
      console.log(`     错误: ${error}`);
    }
  }
}

testCreemStripeFormat().catch(console.error);