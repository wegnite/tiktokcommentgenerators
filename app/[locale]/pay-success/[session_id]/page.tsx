import Stripe from "stripe";
import { handleOrderSession } from "@/services/order";
import { redirect } from "next/navigation";
import { findOrderByOrderNo, findOrderByCreemPaymentId } from "@/models/order";

export default async function ({
  params,
}: {
  params: Promise<{ session_id: string }>;
}) {
  try {
    const { session_id } = await params;

    // First, check if this is an order number (for Creem)
    const orderByNo = await findOrderByOrderNo(session_id);
    if (orderByNo) {
      // This is a Creem payment, already handled by webhook
      if (orderByNo.status === 'paid') {
        redirect(process.env.NEXT_PUBLIC_PAY_SUCCESS_URL || "/");
        return;
      }
      // Check if it's a Creem payment ID
      const orderByCreemId = await findOrderByCreemPaymentId(session_id);
      if (orderByCreemId && orderByCreemId.status === 'paid') {
        redirect(process.env.NEXT_PUBLIC_PAY_SUCCESS_URL || "/");
        return;
      }
    } else {
      // This is a Stripe payment
      const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");
      const session = await stripe.checkout.sessions.retrieve(session_id);
      await handleOrderSession(session);
    }
  } catch (e) {
    console.error("Payment success page error:", e);
    redirect(process.env.NEXT_PUBLIC_PAY_FAIL_URL || "/");
  }

  redirect(process.env.NEXT_PUBLIC_PAY_SUCCESS_URL || "/");
}
