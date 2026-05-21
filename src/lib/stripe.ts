import Stripe from "stripe";

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
            description: "Jump to the front of the MyParentalControls waitlist.",
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
