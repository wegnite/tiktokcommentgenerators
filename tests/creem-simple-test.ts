// 简单的 Creem API 测试
const API_KEY = 'creem_test_2AKSH3Os21VtRxV6WvdQfz';
const API_URL = 'https://api.creem.io/v1';

async function testCreemAPI() {
  console.log('测试 Creem API...\n');
  
  // 1. 测试基本连接
  console.log('1. 测试 API 连接:');
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      }
    });
    
    console.log(`   状态码: ${response.status}`);
    const text = await response.text();
    console.log(`   响应: ${text.substring(0, 200)}...`);
    
    if (response.ok) {
      console.log('   ✅ API 连接成功\n');
    } else {
      console.log('   ❌ API 连接失败\n');
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error}\n`);
  }
  
  // 2. 测试创建支付会话（使用最简单的参数）
  console.log('2. 测试创建支付会话:');
  try {
    const sessionData = {
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 999,
          product_data: {
            name: 'Test Product'
          }
        },
        quantity: 1
      }],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
    };
    
    console.log('   请求数据:', JSON.stringify(sessionData, null, 2));
    
    const response = await fetch(`${API_URL}/checkout/sessions`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData)
    });
    
    console.log(`   状态码: ${response.status}`);
    const text = await response.text();
    console.log(`   响应: ${text}`);
    
    if (response.ok) {
      const data = JSON.parse(text);
      console.log('   ✅ 支付会话创建成功');
      console.log(`   会话 ID: ${data.id}`);
      console.log(`   支付链接: ${data.url || data.payment_url}`);
    } else {
      console.log('   ❌ 支付会话创建失败');
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error}`);
  }
  
  // 3. 测试获取产品信息
  console.log('\n3. 测试获取产品:');
  const productId = 'prod_4714mbpgKtkHSFJ6JgkZJw';
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      }
    });
    
    console.log(`   产品 ID: ${productId}`);
    console.log(`   状态码: ${response.status}`);
    const text = await response.text();
    console.log(`   响应: ${text}`);
    
    if (response.ok) {
      console.log('   ✅ 产品存在');
    } else if (response.status === 404) {
      console.log('   ⚠️  产品不存在');
    } else {
      console.log('   ❌ 获取产品失败');
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error}`);
  }
}

testCreemAPI().catch(console.error);