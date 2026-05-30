import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { getWaitlistRecord, countPaidRecords } from "@/lib/airtable";
import { activatePremiumPlan, getRecordIdFromPaymentIntent } from "@/lib/premium";
import { formatWaitlistQueuePosition } from "@/lib/positions";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  session_id?: string;
  payment_intent?: string;
  record_id?: string;
}>;

async function loadResult(params: {
  sessionId?: string;
  paymentIntentId?: string;
  recordId?: string;
}): Promise<
  | { state: "paid"; waitlistPosition: number; email: string | null }
  | { state: "pending" }
  | { state: "unknown" }
> {
  if (!params.sessionId && !params.paymentIntentId && !params.recordId) {
    return { state: "unknown" };
  }

  try {
    const stripe = getStripe();

    if (params.paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        params.paymentIntentId,
      );
      if (paymentIntent.status !== "succeeded") return { state: "pending" };

      const recordId =
        getRecordIdFromPaymentIntent(paymentIntent) ?? params.recordId;
      if (!recordId) return { state: "unknown" };

      await activatePremiumPlan({
        recordId,
        stripePaymentId: paymentIntent.id,
      });

      const paidCount = await countPaidRecords();
      const email = paymentIntent.receipt_email ?? null;
      return {
        state: "paid",
        waitlistPosition: formatWaitlistQueuePosition(paidCount),
        email,
      };
    }

    if (params.sessionId) {
      const session = await stripe.checkout.sessions.retrieve(params.sessionId);
      if (session.payment_status !== "paid") return { state: "pending" };

      const recordId = session.metadata?.recordId;
      if (!recordId) return { state: "unknown" };

      await activatePremiumPlan({
        recordId,
        stripePaymentId: session.id,
      });

      const paidCount = await countPaidRecords();
      return {
        state: "paid",
        waitlistPosition: formatWaitlistQueuePosition(paidCount),
        email: session.customer_email ?? null,
      };
    }

    const recordId = params.recordId;
    if (!recordId) return { state: "unknown" };

    const record = await getWaitlistRecord(recordId);
    const paidCount = await countPaidRecords();
    return {
      state: "paid",
      waitlistPosition: formatWaitlistQueuePosition(paidCount),
      email: record.fields.Email ?? null,
    };
  } catch (err) {
    console.error("welcome page load failed", err);
    return { state: "unknown" };
  }
}

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id, payment_intent, record_id } = await searchParams;
  const result = await loadResult({
    sessionId: session_id,
    paymentIntentId: payment_intent,
    recordId: record_id,
  });

  return (
    <main className="min-h-screen bg-[#F1F2F4] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm p-8 sm:p-10 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#DBEAFE] flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-7 h-7 text-[#2563EB]"
            aria-hidden
          >
            <path
              d="M12 9v4m0 4h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1
          className="mt-5 text-[28px] leading-tight tracking-tight text-gray-900"
          style={{ fontFamily: "Moderat-Black, sans-serif", fontWeight: 700 }}
        >
          Koda is at capacity.
        </h1>

        <p className="mt-3 text-[15px] text-gray-600 leading-snug">
          Due to high demand, Koda is currently at full usage capacity.
          We&apos;ve released the hold on your card.
        </p>

        {result.state === "paid" && (
          <>
            <div className="mt-6 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] p-5">
              <div className="text-[12px] font-bold tracking-wider uppercase text-[#2563EB]">
                Waitlist position
              </div>
              <div
                className="mt-1 text-gray-900"
                style={{
                  fontFamily: "Moderat-Black, sans-serif",
                  fontSize: "44px",
                  lineHeight: 1,
                  fontWeight: 700,
                }}
              >
                #{result.waitlistPosition.toLocaleString()}
              </div>
            </div>
            <p className="mt-5 text-[15px] text-gray-600 leading-snug">
              To make sure every family gets reliable monitoring and timely
              alerts, we&apos;re adding new users in small batches. We&apos;ll
              email you{result.email ? ` at ${result.email}` : ""} the moment a
              spot opens up.
            </p>
          </>
        )}

        {result.state === "pending" && (
          <p className="mt-5 text-[15px] text-gray-600 leading-snug">
            We&apos;re processing your request. You&apos;ll receive a
            confirmation email with your waitlist position shortly.
          </p>
        )}

        {result.state === "unknown" && (
          <p className="mt-5 text-[15px] text-gray-600 leading-snug">
            We couldn&apos;t load your details, but if you completed
            checkout you&apos;ll receive a confirmation email shortly.
          </p>
        )}

        <Link
          href="/"
          className="inline-flex mt-8 items-center justify-center rounded-full bg-[#2563EB] text-white text-[14px] font-semibold px-6 py-3 hover:bg-[#1D4ED8] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
