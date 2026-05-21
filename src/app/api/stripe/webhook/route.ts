import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  countPaidRecords,
  getWaitlistRecord,
  patchWaitlistRecord,
} from "@/lib/airtable";
import { patchWaitlistByAirtableId } from "@/lib/supabase";
import { sendPremiumQueueEmail } from "@/lib/resend";
import { formatPremiumPosition } from "@/lib/positions";

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

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const recordId = session.metadata?.recordId;
  if (!recordId) {
    console.warn("Webhook event missing recordId metadata");
    return NextResponse.json({ received: true });
  }

  try {
    const record = await getWaitlistRecord(recordId);
    if (record.fields["Paid Skip"]) {
      // Already processed (Stripe webhook can deliver more than once).
      return NextResponse.json({ received: true, alreadyPaid: true });
    }

    const paidCount = await countPaidRecords();
    const premiumPosition = formatPremiumPosition(paidCount + 1);

    await patchWaitlistRecord(recordId, {
      "Paid Skip": true,
      "Stripe Session ID": session.id,
      "Premium Position": premiumPosition,
    });

    patchWaitlistByAirtableId(recordId, {
      paid_skip: true,
      stripe_session_id: session.id,
      premium_position: premiumPosition,
    }).catch((e) => console.error("supabase webhook patch failed", e));

    const email = record.fields.Email;
    if (email) {
      await sendPremiumQueueEmail({ to: email, premiumPosition }).catch(
        (e) => console.error("premium email failed", e),
      );
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook handler failed", err);
    return new NextResponse("Webhook handler error", { status: 500 });
  }
}
