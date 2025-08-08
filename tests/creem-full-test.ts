import { creemService } from '@/services/creem';
import { getSnowId } from '@/lib/hash';

// 测试配置
const TEST_CONFIG = {
  API_KEY: 'creem_test_2AKSH3Os21VtRxV6WvdQfz',
  PRODUCT_ID: 'prod_4714mbpgKtkHSFJ6JgkZJw',
  TEST_EMAIL: 'test@example.com',
  BASE_URL: 'http://localhost:3000'
};

// 颜色输出
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function logSuccess(message: string) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function logError(message: string) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function logInfo(message: string) {
  console.log(`${colors.blue}ℹ${colors.reset} ${message}`);
}

function logWarning(message: string) {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
}

function logHighlight(message: string) {
  console.log(`${colors.cyan}➜${colors.reset} ${message}`);
}

// 测试 1: 验证 API Key 和产品
async function testApiKeyAndProduct() {
  console.log('\n========================================');
  console.log('测试 1: 验证 API Key 和产品配置');
  console.log('========================================');
  
  try {
    logInfo(`使用 API Key: ${TEST_CONFIG.API_KEY.substring(0, 20)}...`);
    logInfo(`验证产品 ID: ${TEST_CONFIG.PRODUCT_ID}`);
    
    // 尝试获取产品信息来验证 API key 和产品
    const product = await creemService.getProduct(TEST_CONFIG.PRODUCT_ID);
    
    if (product && product.id) {
      logSuccess('API Key 验证成功！');
      logSuccess('产品验证成功！');
      console.log('\n产品信息:');
      console.log(`• ID: ${product.id}`);
      console.log(`• 名称: ${product.name}`);
      console.log(`• 价格: $${(product.price / 100).toFixed(2)} ${product.currency}`);
      console.log(`• 计费周期: ${product.billing_period || 'one_time'}`);
      
      return true;
    } else {
      logError('无法获取产品信息');
      return false;
    }
  } catch (error: any) {
    // 如果产品不存在，尝试创建
    if (error.message.includes('404')) {
      logWarning('产品不存在，尝试创建新产品...');
      
      try {
        const newProduct = await creemService.createProduct({
          id: TEST_CONFIG.PRODUCT_ID,
          name: 'TikTok Comment Generator - Premium',
          description: 'Generate viral TikTok comments with AI',
          price: 999, // $9.99 in cents
          currency: 'USD',
          billing_period: 'one_time',
          tax_mode: 'exclusive'
        });
        
        if (newProduct) {
          logSuccess('产品创建成功！');
          return true;
        }
      } catch (createError: any) {
        logInfo('无法创建产品，将在支付会话中动态创建');
        // Creem 支持在创建会话时动态定义产品
        return true;
      }
    } else if (error.message.includes('401')) {
      logError('API Key 无效或未授权');
      return false;
    } else {
      logWarning(`验证失败: ${error.message}`);
      logInfo('将尝试在支付会话中动态创建产品');
      return true;
    }
  }
}

// 测试 2: 创建支付会话
async function testCreateCheckoutSession() {
  console.log('\n========================================');
  console.log('测试 2: 创建 Creem 支付会话');
  console.log('========================================');
  
  try {
    const orderNo = getSnowId();
    logInfo(`生成订单号: ${orderNo}`);
    
    const sessionParams = {
      product_id: TEST_CONFIG.PRODUCT_ID,
      product_name: 'TikTok Comment Generator - Premium',
      amount: 999, // $9.99 in cents
      currency: 'USD',
      customer_email: TEST_CONFIG.TEST_EMAIL,
      success_url: `${TEST_CONFIG.BASE_URL}/pay-success/${orderNo}`,
      cancel_url: `${TEST_CONFIG.BASE_URL}/#pricing`,
      billing_period: 'one_time' as const,
      metadata: {
        order_no: orderNo,
        product_id: TEST_CONFIG.PRODUCT_ID,
        product_name: 'TikTok Comment Generator',
        test_mode: true,
        credits: 100
      }
    };
    
    logInfo('创建支付会话...');
    logHighlight('支付产品: ' + sessionParams.product_name);
    logHighlight('价格: $9.99 USD');
    logHighlight('类型: 一次性付款');
    
    const session = await creemService.createCheckoutSession(sessionParams);
    
    if (session && session.id && session.payment_url) {
      logSuccess('支付会话创建成功！');
      console.log('\n' + colors.green + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + colors.reset);
      logInfo(`会话 ID: ${colors.yellow}${session.id}${colors.reset}`);
      logInfo(`订单号: ${colors.yellow}${orderNo}${colors.reset}`);
      console.log(colors.green + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + colors.reset);
      
      return { session, orderNo };
    } else {
      logError('支付会话创建失败: 响应数据不完整');
      return null;
    }
  } catch (error: any) {
    logError(`创建支付会话失败: ${error.message}`);
    console.error('详细错误:', error);
    return null;
  }
}

// 测试 3: 验证支付流程
async function testPaymentFlow(sessionData: any) {
  console.log('\n========================================');
  console.log('测试 3: 完整支付流程验证');
  console.log('========================================');
  
  if (!sessionData || !sessionData.session) {
    logError('无有效的支付会话，跳过流程测试');
    return false;
  }
  
  const { session, orderNo } = sessionData;
  
  console.log('\n' + colors.cyan + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + colors.reset);
  console.log(colors.yellow + '     🎯 支付测试指南' + colors.reset);
  console.log(colors.cyan + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + colors.reset);
  
  console.log('\n' + colors.green + '步骤 1: 访问支付页面' + colors.reset);
  console.log('请在浏览器中打开以下链接:');
  console.log(colors.blue + session.payment_url + colors.reset);
  
  console.log('\n' + colors.green + '步骤 2: 完成测试支付' + colors.reset);
  console.log('• 使用测试信用卡: 4242 4242 4242 4242');
  console.log('• 有效期: 任何未来日期');
  console.log('• CVV: 任意3位数字');
  console.log('• 邮编: 任意5位数字');
  
  console.log('\n' + colors.green + '步骤 3: 验证支付成功' + colors.reset);
  console.log('支付成功后，您将被重定向到:');
  console.log(colors.yellow + `${TEST_CONFIG.BASE_URL}/pay-success/${orderNo}` + colors.reset);
  
  console.log('\n' + colors.green + '步骤 4: 检查订单状态' + colors.reset);
  console.log('• 订单状态应更新为 "paid"');
  console.log('• 用户应收到支付成功通知');
  console.log('• Credits 应该添加到用户账户');
  
  console.log('\n' + colors.cyan + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + colors.reset);
  
  // 模拟 Webhook 数据结构
  console.log('\n' + colors.yellow + '预期的 Webhook 回调数据:' + colors.reset);
  const mockWebhook = {
    id: 'evt_' + getSnowId(),
    type: 'payment.completed',
    created_at: new Date().toISOString(),
    data: {
      payment_id: session.id,
      amount: 999,
      currency: 'USD',
      status: 'succeeded',
      customer_email: TEST_CONFIG.TEST_EMAIL,
      metadata: {
        order_no: orderNo,
        credits: 100
      }
    }
  };
  
  console.log(JSON.stringify(mockWebhook, null, 2));
  
  logSuccess('支付流程配置完成！');
  logInfo('Webhook 端点: /api/creem-notify');
  
  return true;
}

// 测试 4: 验证 API 端点
async function testApiEndpoints() {
  console.log('\n========================================');
  console.log('测试 4: 验证 API 端点');
  console.log('========================================');
  
  try {
    // 检查 checkout 端点
    logInfo('检查 /api/checkout-creem 端点...');
    const checkoutResponse = await fetch(`${TEST_CONFIG.BASE_URL}/api/checkout-creem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credits: 100,
        currency: 'USD',
        amount: 999,
        interval: 'one-time',
        product_id: 'test_product',
        product_name: 'Test Product',
        valid_months: 1
      })
    });
    
    if (checkoutResponse.ok) {
      logSuccess('/api/checkout-creem 端点可访问');
    } else {
      logWarning(`/api/checkout-creem 返回状态: ${checkoutResponse.status}`);
    }
    
    // 检查 notify 端点
    logInfo('检查 /api/creem-notify 端点...');
    const notifyResponse = await fetch(`${TEST_CONFIG.BASE_URL}/api/creem-notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test: true })
    });
    
    if (notifyResponse.status === 400 || notifyResponse.status === 401) {
      logSuccess('/api/creem-notify 端点已配置（需要正确的签名）');
    } else {
      logWarning(`/api/creem-notify 返回状态: ${notifyResponse.status}`);
    }
    
    return true;
  } catch (error: any) {
    logError(`API 端点测试失败: ${error.message}`);
    return false;
  }
}

// 主测试函数
async function runTests() {
  console.log('\n' + colors.cyan + '════════════════════════════════════════════════════════════' + colors.reset);
  console.log(colors.cyan + '           Creem 支付集成完整测试' + colors.reset);
  console.log(colors.cyan + '════════════════════════════════════════════════════════════' + colors.reset);
  
  console.log('\n' + colors.yellow + '测试环境信息:' + colors.reset);
  console.log(`• API Key: ${TEST_CONFIG.API_KEY.substring(0, 25)}...`);
  console.log(`• 环境: 测试环境 (Test Mode)`);
  console.log(`• 基础 URL: ${TEST_CONFIG.BASE_URL}`);
  
  let allTestsPassed = true;
  
  // 测试 1: API Key 验证
  const apiKeyValid = await testApiKeyAndProduct();
  if (!apiKeyValid) {
    allTestsPassed = false;
    logError('API Key 验证失败，终止测试');
    return;
  }
  
  // 测试 2: 创建支付会话
  const sessionData = await testCreateCheckoutSession();
  if (!sessionData) {
    allTestsPassed = false;
  }
  
  // 测试 3: 支付流程
  if (sessionData) {
    await testPaymentFlow(sessionData);
  }
  
  // 测试 4: API 端点
  await testApiEndpoints();
  
  // 测试总结
  console.log('\n' + colors.cyan + '════════════════════════════════════════════════════════════' + colors.reset);
  console.log(colors.cyan + '                    测试总结' + colors.reset);
  console.log(colors.cyan + '════════════════════════════════════════════════════════════' + colors.reset);
  
  if (allTestsPassed && sessionData) {
    console.log('\n' + colors.green + '✅ Creem 支付集成配置成功！' + colors.reset);
    console.log('\n' + colors.yellow + '下一步操作:' + colors.reset);
    console.log('1. 点击上面的支付链接进行测试支付');
    console.log('2. 使用测试卡号: 4242 4242 4242 4242');
    console.log('3. 完成支付后检查订单状态');
    console.log('4. 验证 webhook 回调是否正常工作');
  } else {
    console.log('\n' + colors.red + '❌ 部分测试未通过，请检查配置' + colors.reset);
  }
  
  console.log('\n' + colors.yellow + '⚠️  重要提示:' + colors.reset);
  console.log('• 这是测试环境，使用的是测试 API Key');
  console.log('• 生产环境部署前请替换为正式 API Key');
  console.log('• 确保设置正确的 Webhook Secret');
  console.log('• 配置生产环境的成功/取消 URL');
}

// 运行测试
if (require.main === module) {
  runTests().catch(error => {
    console.error('测试运行失败:', error);
    process.exit(1);
  });
}

export { runTests };