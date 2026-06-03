"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import type {
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
  StripeExpressCheckoutElement,
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
const stripeFieldStyle = {
  base: {
    color: "#111827",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "16px",
    fontSmoothing: "antialiased",
    "::placeholder": {
      color: "#7C879B",
    },
  },
  invalid: {
    color: "#DC2626",
  },
};

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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletsChecked, setWalletsChecked] = useState(false);
  const [walletsAvailable, setWalletsAvailable] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const [country, setCountry] = useState("US");
  const [zipCode, setZipCode] = useState("");
  const mountedCardNumberElement = useRef<StripeCardNumberElement | null>(null);
  const mountedCardExpiryElement = useRef<StripeCardExpiryElement | null>(null);
  const mountedCardCvcElement = useRef<StripeCardCvcElement | null>(null);
  const mountedExpressCheckoutElement =
    useRef<StripeExpressCheckoutElement | null>(null);
  const expressCheckoutElementContainer = useRef<HTMLDivElement | null>(null);
  const cardNumberElementContainer = useRef<HTMLDivElement | null>(null);
  const cardExpiryElementContainer = useRef<HTMLDivElement | null>(null);
  const cardCvcElementContainer = useRef<HTMLDivElement | null>(null);
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
    setStripe(null);
    setWalletsChecked(false);
    setWalletsAvailable(false);
    setCardReady(false);

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
        const expressCheckoutElement = stripeElements.create(
          "expressCheckout",
          {
            buttonHeight: 52,
            buttonTheme: {
              applePay: "black",
              googlePay: "black",
            },
            buttonType: {
              applePay: "check-out",
              googlePay: "checkout",
            },
            layout: {
              maxColumns: 1,
              maxRows: 3,
              overflow: "never",
            },
            lineItems: [
              {
                name: plan.checkoutLabel,
                amount: paymentIntent.amountCents,
              },
            ],
            paymentMethods: {
              applePay: "auto",
              googlePay: "auto",
              link: "never",
              paypal: "never",
              amazonPay: "never",
              klarna: "never",
            },
          },
        );
        const cardNumberElement = stripeElements.create("cardNumber", {
          showIcon: true,
          iconStyle: "solid",
          placeholder: "1234 1234 1234 1234",
          style: stripeFieldStyle,
        });
        const cardExpiryElement = stripeElements.create("cardExpiry", {
          placeholder: "MM / YY",
          style: stripeFieldStyle,
        });
        const cardCvcElement = stripeElements.create("cardCvc", {
          placeholder: "CVC",
          style: stripeFieldStyle,
        });

        if (cancelled) {
          expressCheckoutElement.destroy();
          cardNumberElement.destroy();
          cardExpiryElement.destroy();
          cardCvcElement.destroy();
          return;
        }

        expressCheckoutElement.on("ready", (event) => {
          if (cancelled) return;
          setWalletsChecked(true);
          setWalletsAvailable(
            Boolean(
              event.availablePaymentMethods?.applePay ||
                event.availablePaymentMethods?.googlePay,
            ),
          );
        });
        expressCheckoutElement.on("availablepaymentmethodschange", (event) => {
          if (cancelled) return;
          setWalletsChecked(true);
          setWalletsAvailable(
            Boolean(
              event.paymentMethods?.applePay?.available ||
                event.paymentMethods?.googlePay?.available,
            ),
          );
        });
        expressCheckoutElement.on("loaderror", () => {
          if (cancelled) return;
          setWalletsChecked(true);
          setWalletsAvailable(false);
        });
        expressCheckoutElement.on("click", (event) => {
          event.resolve({
            lineItems: [
              {
                name: plan.checkoutLabel,
                amount: paymentIntent.amountCents,
              },
            ],
          });
        });
        expressCheckoutElement.on("cancel", () => {
          if (!cancelled) setSubmitting(false);
        });
        expressCheckoutElement.on("confirm", async (event) => {
          if (cancelled) return;
          setSubmitting(true);
          setError(null);

          try {
            const submit = await stripeElements.submit();
            if (submit.error) {
              const message =
                submit.error.message ?? "Please check your payment details.";
              event.paymentFailed({
                reason: "invalid_payment_data",
                message,
              });
              setError(message);
              setSubmitting(false);
              return;
            }

            const result = await stripeInstance.confirmPayment({
              elements: stripeElements,
              confirmParams: {
                return_url: `${window.location.origin}/welcome?record_id=${completion!.recordId}&plan=${plan.id}`,
              },
              redirect: "if_required",
            });

            if (result.error) {
              const message =
                result.error.message ?? "Payment could not be completed.";
              event.paymentFailed({
                reason: "fail",
                message,
              });
              setError(message);
              setSubmitting(false);
              return;
            }

            const paymentIntentId =
              result.paymentIntent?.id ?? paymentIntent.paymentIntentId;
            router.push(
              `/welcome?payment_intent=${paymentIntentId}&record_id=${completion!.recordId}&plan=${plan.id}`,
            );
          } catch (e) {
            const message =
              e instanceof Error
                ? e.message
                : "Payment could not be completed.";
            event.paymentFailed({
              reason: "fail",
              message,
            });
            setError(message);
            setSubmitting(false);
          }
        });

        mountedExpressCheckoutElement.current?.destroy();
        mountedCardNumberElement.current?.destroy();
        mountedCardExpiryElement.current?.destroy();
        mountedCardCvcElement.current?.destroy();
        if (
          !expressCheckoutElementContainer.current ||
          !cardNumberElementContainer.current ||
          !cardExpiryElementContainer.current ||
          !cardCvcElementContainer.current
        ) {
          expressCheckoutElement.destroy();
          cardNumberElement.destroy();
          cardExpiryElement.destroy();
          cardCvcElement.destroy();
          throw new Error("Payment form could not mount.");
        }
        expressCheckoutElement.mount(expressCheckoutElementContainer.current);
        cardNumberElement.mount(cardNumberElementContainer.current);
        cardExpiryElement.mount(cardExpiryElementContainer.current);
        cardCvcElement.mount(cardCvcElementContainer.current);
        mountedExpressCheckoutElement.current = expressCheckoutElement;
        mountedCardNumberElement.current = cardNumberElement;
        mountedCardExpiryElement.current = cardExpiryElement;
        mountedCardCvcElement.current = cardCvcElement;
        setStripe(stripeInstance);
        setIntent(paymentIntent);
        setCardReady(true);
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
      if (requestedKey.current === key) {
        requestedKey.current = null;
      }
      mountedExpressCheckoutElement.current?.destroy();
      mountedExpressCheckoutElement.current = null;
      mountedCardNumberElement.current?.destroy();
      mountedCardNumberElement.current = null;
      mountedCardExpiryElement.current?.destroy();
      mountedCardExpiryElement.current = null;
      mountedCardCvcElement.current?.destroy();
      mountedCardCvcElement.current = null;
    };
  }, [completion, plan, planId, router]);

  const handleSubmit = async () => {
    const cardNumberElement = mountedCardNumberElement.current;
    if (!stripe || !completion || !intent || !cardNumberElement) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await stripe.confirmCardPayment(intent.clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            email: completion.email,
            address: {
              country,
              postal_code: zipCode.trim(),
            },
          },
        },
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
    <main className="flex min-h-[100dvh] bg-[#FAFBFC] px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6">
      <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col">
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
          <div className="mb-5">
            <div className="text-[13px] font-black uppercase tracking-[0.14em] text-gray-950">
              Secure checkout
            </div>
            <h1 className="mt-1 text-[24px] font-black leading-tight text-gray-950">
              Activate your Koda plan
            </h1>
            <p className="mt-1 text-[15px] font-medium text-gray-600">
              {plan.protectionLabel} of protection for {completion.email} ↗
            </p>
            <p className="mt-1 text-[15px] font-medium text-gray-600">
              {plan.priceLabel} today · Cancel anytime
            </p>
          </div>

          <div
            className={walletsChecked && !walletsAvailable ? "hidden" : undefined}
          >
            {walletsAvailable && (
              <div className="mb-3 text-[13px] font-black uppercase tracking-[0.14em] text-[#2563EB]">
                Fast checkout
              </div>
            )}
            <div
              id="express-checkout-element"
              ref={expressCheckoutElementContainer}
            />
            {walletsAvailable && (
              <div className="mt-5 mb-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="text-[12px] font-black uppercase tracking-[0.14em] text-gray-400">
                  or pay with card
                </div>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="block">
              <span className="mb-1.5 block text-[13px] font-medium leading-none text-gray-950">
                Card number
              </span>
              <div
                ref={cardNumberElementContainer}
                className="flex h-14 items-center rounded-2xl border border-gray-200 bg-white px-4 shadow-[0_5px_14px_-12px_rgba(15,23,42,0.55)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="block">
                <span className="mb-1.5 block text-[13px] font-medium leading-none text-gray-950">
                  Expiration date
                </span>
                <div
                  ref={cardExpiryElementContainer}
                  className="flex h-14 items-center rounded-2xl border border-gray-200 bg-white px-4 shadow-[0_5px_14px_-12px_rgba(15,23,42,0.55)]"
                />
              </div>

              <div className="block">
                <span className="mb-1.5 block text-[13px] font-medium leading-none text-gray-950">
                  Security code
                </span>
                <div
                  ref={cardCvcElementContainer}
                  className="flex h-14 items-center rounded-2xl border border-gray-200 bg-white px-4 shadow-[0_5px_14px_-12px_rgba(15,23,42,0.55)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium leading-none text-gray-950">
                  Country
                </span>
                <select
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  className="h-14 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 text-[16px] font-medium text-gray-950 shadow-[0_5px_14px_-12px_rgba(15,23,42,0.55)] outline-none"
                >
                  <option value="US">United States</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium leading-none text-gray-950">
                  ZIP code
                </span>
                <input
                  value={zipCode}
                  onChange={(event) => setZipCode(event.target.value)}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="12345"
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 text-[16px] font-medium text-gray-950 shadow-[0_5px_14px_-12px_rgba(15,23,42,0.55)] outline-none placeholder:text-[#7C879B]"
                />
              </label>
            </div>
          </div>

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

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || submitting || !stripe || !cardReady}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-[#2563EB] text-[18px] font-black text-white shadow-[0_18px_42px_-28px_rgba(37,99,235,0.85)] transition-opacity disabled:opacity-50"
          >
            <LockKeyhole className="h-5 w-5" aria-hidden />
            {submitting
              ? "Processing..."
              : walletsAvailable
                ? `Pay with card ${plan.priceLabel}`
                : `Pay ${plan.priceLabel}`}
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
