"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import type {
  Stripe,
  StripeElements,
  StripePaymentElement,
} from "@stripe/stripe-js";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { KodaLogo } from "@/components/icons";
import {
  DEFAULT_KODA_PLAN_ID,
  getKodaPlan,
  type KodaPlanId,
} from "@/lib/plans";
import type { FunnelCompletion } from "@/types/funnel";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

type PaymentIntentResponse = {
  clientSecret: string;
  paymentIntentId: string;
  amountCents: number;
  priceLabel: string;
  planName: string;
};

function parseCompletion(value: string | null): FunnelCompletion | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<FunnelCompletion>;
    if (
      parsed &&
      typeof parsed.email === "string" &&
      typeof parsed.recordId === "string"
    ) {
      return parsed as FunnelCompletion;
    }
  } catch {
    return null;
  }
  return null;
}

function parsePlanId(value: string | null): KodaPlanId {
  if (value === "monthly" || value === "quarterly" || value === "annual") {
    return value;
  }
  return DEFAULT_KODA_PLAN_ID;
}

export function CheckoutClient() {
  const router = useRouter();
  const [completion, setCompletion] = useState<
    FunnelCompletion | null | undefined
  >(undefined);
  const [planId, setPlanId] = useState<KodaPlanId>(DEFAULT_KODA_PLAN_ID);
  const [intent, setIntent] = useState<PaymentIntentResponse | null>(null);
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [elements, setElements] = useState<StripeElements | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedElement = useRef<StripePaymentElement | null>(null);
  const paymentElementContainer = useRef<HTMLDivElement | null>(null);
  const requestedKey = useRef<string | null>(null);

  useEffect(() => {
    window.queueMicrotask(() => {
      const params = new URLSearchParams(window.location.search);
      const selectedPlanId = parsePlanId(
        params.get("plan") ?? sessionStorage.getItem("koda:selected-plan"),
      );
      setPlanId(selectedPlanId);
      sessionStorage.setItem("koda:selected-plan", selectedPlanId);
      setCompletion(
        parseCompletion(sessionStorage.getItem("koda:funnel:result")),
      );
    });
  }, []);

  const plan = useMemo(() => getKodaPlan(planId), [planId]);

  useEffect(() => {
    if (completion === undefined) {
      return;
    }
    if (completion === null) {
      window.queueMicrotask(() => setLoading(false));
      return;
    }
    if (!stripePromise) {
      window.queueMicrotask(() => {
        setError("Stripe is missing a publishable key.");
        setLoading(false);
      });
      return;
    }

    const key = `${completion.recordId}:${planId}`;
    if (requestedKey.current === key) return;
    requestedKey.current = key;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setIntent(null);

    async function preparePayment() {
      try {
        setLoading(true);
        const res = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recordId: completion!.recordId,
            planId,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        const paymentIntent = (await res.json()) as PaymentIntentResponse;
        const stripeInstance = await stripePromise;
        if (!stripeInstance) throw new Error("Stripe could not load.");

        const stripeElements = stripeInstance.elements({
          clientSecret: paymentIntent.clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#2563EB",
              colorText: "#111827",
              borderRadius: "14px",
              fontFamily:
                "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            },
          },
        });
        const paymentElement = stripeElements.create("payment", {
          layout: "tabs",
        });

        if (cancelled) {
          paymentElement.destroy();
          return;
        }

        mountedElement.current?.destroy();
        if (!paymentElementContainer.current) {
          throw new Error("Payment form could not mount.");
        }
        paymentElement.mount(paymentElementContainer.current);
        mountedElement.current = paymentElement;
        setStripe(stripeInstance);
        setElements(stripeElements);
        setIntent(paymentIntent);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not load checkout.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    preparePayment();

    return () => {
      cancelled = true;
    };
  }, [completion, planId]);

  const handleSubmit = async () => {
    if (!stripe || !elements || !completion || !intent) return;
    setSubmitting(true);
    setError(null);
    try {
      const submit = await elements.submit();
      if (submit.error) {
        setError(submit.error.message ?? "Please check your payment details.");
        setSubmitting(false);
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/welcome?record_id=${completion.recordId}&plan=${plan.id}`,
        },
        redirect: "if_required",
      });

      if (result.error) {
        setError(result.error.message ?? "Payment could not be completed.");
        setSubmitting(false);
        return;
      }

      const paymentIntentId = result.paymentIntent?.id ?? intent.paymentIntentId;
      router.push(
        `/welcome?payment_intent=${paymentIntentId}&record_id=${completion.recordId}&plan=${plan.id}`,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment could not be completed.");
      setSubmitting(false);
    }
  };

  if (completion === undefined) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#FAFBFC] px-5 py-10">
        <div className="text-center text-[15px] font-bold text-gray-500">
          Loading secure checkout...
        </div>
      </main>
    );
  }

  if (!completion) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#FAFBFC] px-5 py-10">
        <div className="max-w-sm text-center">
          <KodaLogo height={34} className="mb-6 justify-center" />
          <h1 className="text-[28px] font-black leading-tight text-gray-950">
            Your checkout needs a saved plan first.
          </h1>
          <button
            type="button"
            onClick={() => router.push("/get-started")}
            className="mt-6 h-14 w-full rounded-full bg-[#2563EB] text-[17px] font-bold text-white"
          >
            Start again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[#FAFBFC] px-4 py-4 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100dvh-32px)] w-full max-w-[520px] flex-col">
        <header className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/offer")}
            aria-label="Back to offer"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <KodaLogo height={30} />
          <div className="h-10 w-10" aria-hidden />
        </header>

        <section className="rounded-[30px] bg-white p-5 shadow-[0_24px_70px_-54px_rgba(15,23,42,0.85)]">
          <div className="mb-5 rounded-[24px] bg-blue-50 p-4 ring-1 ring-blue-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[12px] font-black uppercase tracking-[0.14em] text-[#2563EB]">
                  Secure checkout
                </div>
                <h1 className="mt-1 text-[27px] font-black leading-tight text-gray-950">
                  Activate your Koda plan
                </h1>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-gray-600">
                  {plan.checkoutLabel} for {completion.email}
                </p>
              </div>
              <div className="rounded-2xl bg-[#2563EB] px-3 py-2 text-right text-white">
                <div className="text-[11px] font-bold opacity-80">Today</div>
                <div className="text-[20px] font-black leading-none">
                  {plan.priceLabel}
                </div>
              </div>
            </div>
          </div>

          <div
            id="payment-element"
            ref={paymentElementContainer}
            className="min-h-[226px] rounded-2xl border border-gray-100 bg-white p-1"
          />

          {loading && (
            <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-3 text-center text-[14px] font-bold text-gray-500">
              Loading secure payment form...
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-[14px] font-bold text-red-700 ring-1 ring-red-100">
              {error}
            </div>
          )}
        </section>

        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || submitting || !stripe || !elements}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-[#2563EB] text-[18px] font-black text-white shadow-[0_18px_42px_-28px_rgba(37,99,235,0.85)] transition-opacity disabled:opacity-50"
          >
            <LockKeyhole className="h-5 w-5" aria-hidden />
            {submitting ? "Processing..." : `Pay ${plan.priceLabel}`}
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 text-[13px] font-bold text-gray-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden />
            Payments are encrypted and processed by Stripe
          </div>
        </div>
      </div>
    </main>
  );
}
