import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { getWaitlistRecord } from "@/lib/airtable";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ session_id?: string }>;

async function loadPremiumPosition(sessionId: string | undefined): Promise<
  | { state: "paid"; position: number; email: string | null }
  | { state: "pending" }
  | { state: "unknown" }
> {
  if (!sessionId) return { state: "unknown" };
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return { state: "pending" };

    const recordId = session.metadata?.recordId;
    if (!recordId) return { state: "unknown" };

    const record = await getWaitlistRecord(recordId);
    const position = record.fields["Premium Position"];
    if (typeof position === "number") {
      return {
        state: "paid",
        position,
        email: record.fields.Email ?? null,
      };
    }
    // Webhook hasn't fired yet — show optimistic placeholder.
    return { state: "pending" };
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
  const { session_id } = await searchParams;
  const result = await loadPremiumPosition(session_id);

  return (
    <main className="min-h-screen bg-[#F1F2F4] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm p-8 sm:p-10 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#ECFDF5] flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-7 h-7 text-[#059669]"
            aria-hidden
          >
            <path
              d="M5 12l4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1
          className="mt-5 text-[28px] leading-tight tracking-tight text-gray-900"
          style={{ fontFamily: "Moderat-Black, sans-serif", fontWeight: 700 }}
        >
          {result.state === "paid"
            ? "You skipped the line."
            : "Payment received."}
        </h1>

        {result.state === "paid" && (
          <>
            <div className="mt-6 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] p-5">
              <div className="text-[12px] font-bold tracking-wider uppercase text-[#059669]">
                Premium queue spot
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
                #{result.position.toLocaleString()}
              </div>
            </div>
            <p className="mt-5 text-[15px] text-gray-600 leading-snug">
              Watch your inbox{result.email ? ` at ${result.email}` : ""} —
              you'll receive setup instructions from our team within a few
              minutes.
            </p>
          </>
        )}

        {result.state === "pending" && (
          <p className="mt-5 text-[15px] text-gray-600 leading-snug">
            We're finalizing your premium queue position now. You'll receive a
            confirmation email with the details in just a moment.
          </p>
        )}

        {result.state === "unknown" && (
          <p className="mt-5 text-[15px] text-gray-600 leading-snug">
            We couldn't load your payment details, but if you completed
            checkout you'll receive an email confirmation shortly.
          </p>
        )}

        <Link
          href="/"
          className="inline-flex mt-8 items-center justify-center text-[14px] font-semibold text-gray-500 hover:text-gray-800 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
