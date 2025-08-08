import { findOrderByOrderNo, findOrderByCreemPaymentId } from "@/models/order";
import { respData, respErr } from "@/lib/resp";

export async function POST(req: Request) {
  try {
    const { order_no, session_id } = await req.json();

    if (!order_no && !session_id) {
      return respErr("Missing order_no or session_id");
    }

    let order = null;

    // Try to find order by order number
    if (order_no) {
      order = await findOrderByOrderNo(order_no);
    }

    // If not found, try to find by Creem payment ID
    if (!order && session_id) {
      order = await findOrderByCreemPaymentId(session_id);
    }

    if (!order) {
      return respErr("Order not found");
    }

    return respData({
      order_no: order.order_no,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      credits: order.credits,
      product_name: order.product_name,
      created_at: order.created_at,
      paid_at: order.paid_at,
      user_email: order.user_email,
    });
  } catch (error: any) {
    console.error("Check order status error:", error);
    return respErr("Failed to check order status");
  }
}