import Stripe from "stripe";
import { getKodaPlan, type KodaPlanId } from "@/lib/plans";

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY env var");
  cached = new Stripe(key);
  return cached;
}

export async function createSkipLineCheckoutSession(args: {
  recordId: string;
  email: string;
}): Promise<{ sessionId: string; url: string | null }> {
  const stripe = getStripe();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: args.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Skip the line",
            description: "Jump to the front of the Koda waitlist.",
          },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ],
    metadata: { recordId: args.recordId },
    success_url: `${siteUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/get-started?step=5`,
    allow_promotion_codes: false,
    payment_method_types: ["card", "link"],
  });

  return { sessionId: session.id, url: session.url };
}

export async function createKodaPlanPaymentIntent(args: {
  recordId: string;
  email: string;
  planId: KodaPlanId;
}): Promise<{
  clientSecret: string;
  paymentIntentId: string;
  amountCents: number;
  priceLabel: string;
  planName: string;
}> {
  const stripe = getStripe();
  const plan = getKodaPlan(args.planId);

  const intent = await stripe.paymentIntents.create({
    amount: plan.amountCents,
    currency: "usd",
    receipt_email: args.email,
    description: `Koda ${plan.checkoutLabel}`,
    automatic_payment_methods: { enabled: true },
    metadata: {
      recordId: args.recordId,
      planId: plan.id,
      planName: plan.name,
    },
  });

  if (!intent.client_secret) {
    throw new Error("Stripe PaymentIntent missing client_secret");
  }

  return {
    clientSecret: intent.client_secret,
    paymentIntentId: intent.id,
    amountCents: plan.amountCents,
    priceLabel: plan.priceLabel,
    planName: plan.name,
  };
}
