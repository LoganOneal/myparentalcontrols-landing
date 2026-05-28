import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { activatePremiumPlan, getRecordIdFromPaymentIntent } from "@/lib/premium";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return new NextResponse("Missing webhook signature/secret", { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error("Stripe signature verification failed", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "payment_intent.succeeded"
  ) {
    return NextResponse.json({ received: true });
  }

  const payment =
    event.type === "checkout.session.completed"
      ? (event.data.object as Stripe.Checkout.Session)
      : (event.data.object as Stripe.PaymentIntent);
  const recordId =
    event.type === "checkout.session.completed"
      ? (payment as Stripe.Checkout.Session).metadata?.recordId
      : getRecordIdFromPaymentIntent(payment as Stripe.PaymentIntent);
  if (!recordId) {
    console.warn("Webhook event missing recordId metadata");
    return NextResponse.json({ received: true });
  }

  try {
    const result = await activatePremiumPlan({
      recordId,
      stripePaymentId: payment.id,
    });

    return NextResponse.json({ received: true, position: result.position });
  } catch (err) {
    console.error("Stripe webhook handler failed", err);
    return new NextResponse("Webhook handler error", { status: 500 });
  }
}
