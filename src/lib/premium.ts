import type Stripe from "stripe";
import {
  countPaidRecords,
  getWaitlistRecord,
  patchWaitlistRecord,
} from "@/lib/airtable";
import { formatPremiumPosition } from "@/lib/positions";
import { sendPremiumQueueEmail } from "@/lib/resend";
import { patchWaitlistByAirtableId } from "@/lib/supabase";

export type PremiumActivationResult = {
  state: "paid";
  position: number;
  email: string | null;
};

export async function activatePremiumPlan(args: {
  recordId: string;
  stripePaymentId: string;
}): Promise<PremiumActivationResult> {
  const record = await getWaitlistRecord(args.recordId);
  const email = record.fields.Email ?? null;
  const existingPosition = record.fields["Premium Position"];

  if (record.fields["Paid Skip"] && typeof existingPosition === "number") {
    return {
      state: "paid",
      position: existingPosition,
      email,
    };
  }

  const paidCount = await countPaidRecords();
  const premiumPosition = formatPremiumPosition(paidCount + 1);

  await patchWaitlistRecord(args.recordId, {
    "Paid Skip": true,
    "Stripe Session ID": args.stripePaymentId,
    "Premium Position": premiumPosition,
  });

  patchWaitlistByAirtableId(args.recordId, {
    paid_skip: true,
    stripe_session_id: args.stripePaymentId,
    premium_position: premiumPosition,
  }).catch((e) => console.error("supabase premium patch failed", e));

  if (email) {
    await sendPremiumQueueEmail({ to: email, premiumPosition }).catch((e) =>
      console.error("premium email failed", e),
    );
  }

  return {
    state: "paid",
    position: premiumPosition,
    email,
  };
}

export function getRecordIdFromPaymentIntent(
  paymentIntent: Stripe.PaymentIntent,
): string | null {
  return paymentIntent.metadata?.recordId ?? null;
}
