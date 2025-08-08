import { respOk } from "@/lib/resp";
import { creemService, CreemWebhookEvent } from "@/services/creem";

export async function POST(req: Request) {
  try {
    const creemWebhookSecret = process.env.CREEM_WEBHOOK_SECRET;
    
    if (!creemWebhookSecret) {
      throw new Error("invalid creem webhook config");
    }

    // Get the raw body for signature verification
    const rawBody = await req.text();
    
    // Get signature from headers
    const signature = req.headers.get("x-creem-signature") || 
                     req.headers.get("creem-signature") || 
                     "";
    
    if (!signature) {
      throw new Error("missing webhook signature");
    }

    // Verify webhook signature
    const isValid = await creemService.verifyWebhookSignature(rawBody, signature);
    
    if (!isValid) {
      throw new Error("invalid webhook signature");
    }

    // Parse the webhook event
    const event: CreemWebhookEvent = JSON.parse(rawBody);
    
    console.log("creem webhook event: ", event);

    // Handle the webhook event
    await creemService.handleWebhookEvent(event);

    return respOk();
  } catch (e: any) {
    console.log("creem notify failed: ", e);
    return Response.json(
      { error: `handle creem notify failed: ${e.message}` },
      { status: 500 }
    );
  }
}