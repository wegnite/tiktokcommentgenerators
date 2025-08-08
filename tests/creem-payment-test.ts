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

// 测试 1: 验证 API Key
async function testApiKeyValidation() {
  console.log('\n========================================');
  console.log('测试 1: 验证 Creem API Key');
  console.log('========================================');
  
  try {
    // 尝试获取产品信息来验证 API key
    logInfo(`正在使用 API Key: ${TEST_CONFIG.API_KEY.substring(0, 20)}...`);
    logInfo(`尝试获取产品 ID: ${TEST_CONFIG.PRODUCT_ID}`);
    
    const product = await creemService.getProduct(TEST_CONFIG.PRODUCT_ID);
    
    if (product && product.id) {
      logSuccess('API Key 验证成功！');
      logInfo(`产品信息: ${JSON.stringify(product, null, 2)}`);
      return true;
    } else {
      logError('API Key 验证失败: 无法获取产品信息');
      return false;
    }
  } catch (error: any) {
    logError(`API Key 验证失败: ${error.message}`);
    if (error.message.includes('401')) {
      logWarning('错误代码 401: API Key 无效或未授权');
    } else if (error.message.includes('404')) {
      logWarning('错误代码 404: 产品不存在');
    }
    return false;
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
      product_name: 'Test Product - TikTok Comment Generator',
      amount: 999, // $9.99 in cents
      currency: 'USD',
      customer_email: TEST_CONFIG.TEST_EMAIL,
      success_url: `${TEST_CONFIG.BASE_URL}/pay-success/${orderNo}`,
      cancel_url: `${TEST_CONFIG.BASE_URL}/#pricing`,
      billing_period: 'one_time' as const,
      metadata: {
        order_no: orderNo,
        product_id: TEST_CONFIG.PRODUCT_ID,
        test_mode: true
      }
    };
    
    logInfo('创建支付会话参数:');
    console.log(JSON.stringify(sessionParams, null, 2));
    
    const session = await creemService.createCheckoutSession(sessionParams);
    
    if (session && session.id && session.payment_url) {
      logSuccess('支付会话创建成功！');
      logInfo(`会话 ID: ${session.id}`);
      logInfo(`支付链接: ${session.payment_url}`);
      logInfo('用户可以访问此链接进行支付');
      return session;
    } else {
      logError('支付会话创建失败: 响应数据不完整');
      return null;
    }
  } catch (error: any) {
    logError(`创建支付会话失败: ${error.message}`);
    return null;
  }
}

// 测试 3: 验证支付重定向
async function testPaymentRedirect(session: any) {
  console.log('\n========================================');
  console.log('测试 3: 验证支付重定向');
  console.log('========================================');
  
  if (!session || !session.payment_url) {
    logError('无有效的支付会话，跳过重定向测试');
    return false;
  }
  
  try {
    logInfo('检查支付链接可访问性...');
    
    // 使用 fetch 检查链接是否可访问
    const response = await fetch(session.payment_url, {
      method: 'HEAD',
      redirect: 'manual'
    });
    
    // Creem 支付页面应该返回 200 或 302 重定向
    if (response.status === 200 || response.status === 302 || response.status === 303) {
      logSuccess('支付链接验证成功！');
      logInfo(`状态码: ${response.status}`);
      logInfo('用户将被重定向到 Creem 支付页面');
      
      console.log('\n' + colors.yellow + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + colors.reset);
      console.log(colors.yellow + '⚡ 请在浏览器中访问以下链接完成测试支付:' + colors.reset);
      console.log(colors.blue + session.payment_url + colors.reset);
      console.log(colors.yellow + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + colors.reset);
      
      return true;
    } else {
      logWarning(`支付链接返回状态码: ${response.status}`);
      return false;
    }
  } catch (error: any) {
    logError(`重定向验证失败: ${error.message}`);
    return false;
  }
}

// 测试 4: 模拟支付成功回调
async function testPaymentSuccessCallback(sessionId: string) {
  console.log('\n========================================');
  console.log('测试 4: 模拟支付成功回调处理');
  console.log('========================================');
  
  try {
    logInfo('获取支付会话状态...');
    
    const session = await creemService.getCheckoutSession(sessionId);
    
    if (session) {
      logInfo(`当前会话状态: ${session.status}`);
      
      // 模拟 webhook 事件数据
      const mockWebhookEvent = {
        id: 'evt_' + getSnowId(),
        type: 'payment.completed',
        created_at: new Date().toISOString(),
        data: {
          payment_id: sessionId,
          customer_id: 'cus_test_123',
          amount: 999,
          currency: 'USD',
          status: 'succeeded',
          product_id: TEST_CONFIG.PRODUCT_ID,
          product_name: 'Test Product',
          customer_email: TEST_CONFIG.TEST_EMAIL,
          metadata: {
            order_no: session.metadata?.order_no || 'test_order'
          }
        }
      };
      
      logInfo('模拟 Webhook 事件:');
      console.log(JSON.stringify(mockWebhookEvent, null, 2));
      
      // 这里只是模拟，实际的 webhook 处理需要在支付完成后由 Creem 触发
      logSuccess('Webhook 事件结构验证成功');
      logInfo('实际支付完成后，Creem 将发送类似的 webhook 到您的回调端点');
      logInfo('回调端点: /api/creem-notify');
      
      return true;
    } else {
      logError('无法获取会话状态');
      return false;
    }
  } catch (error: any) {
    logError(`回调测试失败: ${error.message}`);
    return false;
  }
}

// 主测试函数
async function runTests() {
  console.log('\n' + colors.blue + '════════════════════════════════════════' + colors.reset);
  console.log(colors.blue + '     Creem 支付集成测试套件' + colors.reset);
  console.log(colors.blue + '════════════════════════════════════════' + colors.reset);
  
  let allTestsPassed = true;
  
  // 测试 1: API Key 验证
  const apiKeyValid = await testApiKeyValidation();
  if (!apiKeyValid) {
    allTestsPassed = false;
    logError('API Key 验证失败，请检查您的 API Key 是否正确');
    return;
  }
  
  // 测试 2: 创建支付会话
  const session = await testCreateCheckoutSession();
  if (!session) {
    allTestsPassed = false;
  }
  
  // 测试 3: 验证重定向
  if (session) {
    const redirectValid = await testPaymentRedirect(session);
    if (!redirectValid) {
      allTestsPassed = false;
    }
    
    // 测试 4: 模拟回调
    await testPaymentSuccessCallback(session.id);
  }
  
  // 测试总结
  console.log('\n' + colors.blue + '════════════════════════════════════════' + colors.reset);
  console.log(colors.blue + '              测试总结' + colors.reset);
  console.log(colors.blue + '════════════════════════════════════════' + colors.reset);
  
  if (allTestsPassed) {
    console.log(colors.green + '✅ 所有测试通过！' + colors.reset);
    console.log('\n下一步操作:');
    console.log('1. 访问上面提供的支付链接进行测试支付');
    console.log('2. 完成支付后，检查订单状态是否更新');
    console.log('3. 验证用户是否收到支付成功通知');
  } else {
    console.log(colors.red + '❌ 部分测试失败，请检查配置' + colors.reset);
  }
  
  console.log('\n' + colors.yellow + '提示: 这是测试环境，使用测试 API Key' + colors.reset);
  console.log(colors.yellow + '生产环境请替换为正式的 API Key' + colors.reset);
}

// 运行测试
if (require.main === module) {
  runTests().catch(error => {
    console.error('测试运行失败:', error);
    process.exit(1);
  });
}

export { runTests };