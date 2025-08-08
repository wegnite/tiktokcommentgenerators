import { getUserEmail, getUserUuid } from "@/services/user";
import { insertOrder, updateOrderCreemSession } from "@/models/order";
import { respData, respErr } from "@/lib/resp";
import { Order } from "@/types/order";
import { findUserByUuid } from "@/models/user";
import { getSnowId } from "@/lib/hash";
import { getPricingPage } from "@/services/page";
import { PricingItem } from "@/types/blocks/pricing";
import { creemService } from "@/services/creem";

export async function POST(req: Request) {
  try {
    let {
      credits,
      currency,
      amount,
      interval,
      product_id,
      product_name,
      valid_months,
      cancel_url,
    } = await req.json();

    if (!cancel_url) {
      cancel_url = `${
        process.env.NEXT_PUBLIC_PAY_CANCEL_URL ||
        process.env.NEXT_PUBLIC_WEB_URL
      }`;
    }

    if (!amount || !interval || !currency || !product_id) {
      return respErr("invalid params");
    }

    // validate checkout params
    const page = await getPricingPage("en");
    if (!page || !page.pricing || !page.pricing.items) {
      return respErr("invalid pricing table");
    }

    const item = page.pricing.items.find(
      (item: PricingItem) => item.product_id === product_id
    );
    if (
      !item ||
      !item.amount ||
      !item.interval ||
      !item.currency ||
      item.amount !== amount ||
      item.interval !== interval ||
      item.currency !== currency
    ) {
      return respErr("invalid checkout params");
    }

    if (!["year", "month", "one-time"].includes(interval)) {
      return respErr("invalid interval");
    }

    const is_subscription = interval === "month" || interval === "year";

    if (interval === "year" && valid_months !== 12) {
      return respErr("invalid valid_months");
    }

    if (interval === "month" && valid_months !== 1) {
      return respErr("invalid valid_months");
    }

    let user_uuid = await getUserUuid();
    let user_email = await getUserEmail();
    
    // 开发环境下允许测试用户
    if (!user_uuid && process.env.NODE_ENV === "development") {
      user_uuid = "test-user-" + Date.now();
      user_email = "test@example.com";
      console.log("Using test user for development:", user_uuid);
    } else if (!user_uuid) {
      return respErr("no auth, please sign-in");
    }
    
    if (!user_email) {
      const user = await findUserByUuid(user_uuid);
      if (user) {
        user_email = user.email;
      }
    }
    if (!user_email && process.env.NODE_ENV !== "development") {
      return respErr("invalid user");
    }

    const order_no = getSnowId();

    const currentDate = new Date();
    const created_at = currentDate.toISOString();

    let expired_at = "";

    const timePeriod = new Date(currentDate);
    timePeriod.setMonth(currentDate.getMonth() + valid_months);

    const timePeriodMillis = timePeriod.getTime();
    let delayTimeMillis = 0;

    // subscription
    if (is_subscription) {
      delayTimeMillis = 24 * 60 * 60 * 1000; // delay 24 hours expired
    }

    const newTimeMillis = timePeriodMillis + delayTimeMillis;
    const newDate = new Date(newTimeMillis);

    expired_at = newDate.toISOString();

    const order: Order = {
      order_no: order_no,
      created_at: created_at,
      user_uuid: user_uuid,
      user_email: user_email,
      amount: amount,
      interval: interval,
      expired_at: expired_at,
      status: "created",
      payment_gateway: "creem",
      credits: credits,
      currency: currency,
      product_id: product_id,
      product_name: product_name,
      valid_months: valid_months,
    };
    await insertOrder(order);

    // Create Creem checkout session
    const billing_period = creemService.getBillingPeriod(interval);
    
    const session = await creemService.createCheckoutSession({
      product_name: product_name,
      amount: creemService.formatAmount(amount),
      currency: currency,
      customer_email: user_email,
      success_url: `${process.env.NEXT_PUBLIC_WEB_URL}/pay-success/${order_no}`,
      cancel_url: cancel_url,
      billing_period: billing_period,
      metadata: {
        project: process.env.NEXT_PUBLIC_PROJECT_NAME || "",
        product_name: product_name,
        order_no: order_no,
        user_email: user_email,
        credits: credits,
        user_uuid: user_uuid,
      },
    });

    const creem_payment_id = session.id;
    const creem_customer_id = session.customer_id || "";
    const order_detail = JSON.stringify(session);

    await updateOrderCreemSession(order_no, creem_payment_id, creem_customer_id, order_detail);

    return respData({
      order_no: order_no,
      payment_url: session.payment_url,
      session_id: creem_payment_id,
      gateway: "creem",
    });
  } catch (e: any) {
    console.log("creem checkout failed: ", e);
    return respErr("checkout failed: " + e.message);
  }
}