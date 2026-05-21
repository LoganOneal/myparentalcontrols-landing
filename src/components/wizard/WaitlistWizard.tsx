"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, X, Check, Plus } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import type { WizardFormData, WizardStep } from "@/types/wizard";

const GAMES = [
  "Roblox",
  "Minecraft",
  "Fortnite",
  "Discord",
  "Valorant",
  "Counter-Strike 2",
  "League of Legends",
  "Rocket League",
  "Grand Theft Auto",
  "Call of Duty",
  "Other",
];

const CONCERNS = [
  "Predator contact",
  "Cyberbullying",
  "Inappropriate content",
  "Excessive screen time",
  "Voice chat dangers",
  "Stranger DMs",
  "Self-harm content",
];

const TOTAL_STEPS = 5;

let stripePromise: ReturnType<typeof loadStripe> | null = null;
function getStripeClient() {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    stripePromise = key ? loadStripe(key) : Promise.resolve(null);
  }
  return stripePromise;
}

type Props = {
  open: boolean;
  initialStep: WizardStep;
  onClose: () => void;
};

export function WaitlistWizard({ open, initialStep, onClose }: Props) {
  const [step, setStep] = useState<WizardStep>(initialStep);
  const [form, setForm] = useState<WizardFormData>({ email: "" });
  const [recordId, setRecordId] = useState<string | null>(null);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStep(initialStep);
      setError(null);
    }
  }, [open, initialStep]);

  const next = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1) as WizardStep);
  const back = () => setStep((s) => Math.max(1, s - 1) as WizardStep);

  const handleEmailSubmit = async (email: string) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { recordId: string; position: number };
      setRecordId(data.recordId);
      setWaitlistPosition(data.position);
      setForm((f) => ({ ...f, email }));
      next();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const patch = async (fields: Partial<WizardFormData>) => {
    if (!recordId) return next();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/waitlist/${recordId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error(await res.text());
      setForm((f) => ({ ...f, ...fields }));
      next();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkipLine = async () => {
    if (!recordId) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { sessionId: string; url: string | null };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      const stripe = await getStripeClient();
      if (!stripe) throw new Error("Stripe not configured");
      const { error: stripeErr } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
      if (stripeErr) throw stripeErr;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't open checkout.");
      setSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 transition-opacity duration-200" />
        <Dialog.Popup
          className="
            fixed inset-x-0 bottom-0 z-50 flex flex-col
            bg-white shadow-2xl outline-none
            rounded-t-2xl max-h-[92vh]
            data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full
            sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
            sm:rounded-2xl sm:max-w-[440px] sm:w-[440px] sm:max-h-[680px]
            sm:data-[starting-style]:translate-y-[calc(-50%+8px)] sm:data-[starting-style]:opacity-0
            sm:data-[ending-style]:translate-y-[calc(-50%+8px)] sm:data-[ending-style]:opacity-0
            transition-[transform,opacity] duration-300 ease-out
          "
        >
          {/* Mobile drag handle */}
          <div className="sm:hidden pt-2 pb-1 flex justify-center" aria-hidden>
            <div className="w-9 h-1 rounded-full bg-gray-300" />
          </div>

          {/* Header: back + progress + close */}
          <div className="flex items-center justify-between px-4 pt-2 pb-3 sm:px-6 sm:pt-5">
            <button
              type="button"
              onClick={step > 1 && step < 5 ? back : onClose}
              className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label={step > 1 && step < 5 ? "Back" : "Close"}
            >
              {step > 1 && step < 5 ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </button>
            <ProgressDots current={step} total={TOTAL_STEPS} />
            <Dialog.Close
              className="w-9 h-9 -mr-2 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6">
            {step === 1 && (
              <StepEmail
                defaultValue={form.email}
                submitting={submitting}
                error={error}
                onSubmit={handleEmailSubmit}
              />
            )}
            {step === 2 && (
              <StepKids
                defaultCount={form.kidsCount ?? 1}
                defaultAges={form.kidsAges ?? []}
                submitting={submitting}
                error={error}
                onSubmit={(kidsCount, kidsAges) => patch({ kidsCount, kidsAges })}
              />
            )}
            {step === 3 && (
              <StepGames
                defaultValue={form.games ?? []}
                submitting={submitting}
                error={error}
                onSubmit={(games) => patch({ games })}
              />
            )}
            {step === 4 && (
              <StepConcerns
                defaultValue={form.concerns ?? []}
                submitting={submitting}
                error={error}
                onSubmit={(concerns) => patch({ concerns })}
              />
            )}
            {step === 5 && (
              <StepWaitlist
                position={waitlistPosition}
                submitting={submitting}
                error={error}
                onSkip={handleSkipLine}
                onWait={onClose}
              />
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i + 1 === current
              ? "w-6 bg-[#2563EB]"
              : i + 1 < current
              ? "w-1.5 bg-[#2563EB]"
              : "w-1.5 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2
        className="text-[26px] sm:text-[28px] leading-[1.15] tracking-tight text-gray-900"
        style={{ fontFamily: "Moderat-Black, sans-serif", fontWeight: 700 }}
      >
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-[15px] leading-snug text-gray-600">{subtitle}</p>}
    </div>
  );
}

function PrimaryButton({
  children,
  disabled,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-full inline-flex items-center justify-center
        bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF]
        disabled:bg-[#2563EB]/50 disabled:cursor-not-allowed
        text-white font-bold rounded-full
        h-14 text-[17px] transition-colors
      "
    >
      {children}
    </button>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return <p className="mt-3 text-sm text-red-600">{children}</p>;
}

/* ----------------------------- Step 1: Email ----------------------------- */

function StepEmail({
  defaultValue,
  submitting,
  error,
  onSubmit,
}: {
  defaultValue: string;
  submitting: boolean;
  error: string | null;
  onSubmit: (email: string) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid && !submitting) onSubmit(value.trim());
      }}
      className="flex flex-col h-full"
    >
      <StepHeader
        title="Get on the waitlist."
        subtitle="One field, no spam. We'll save your spot the second you submit."
      />
      <input
        ref={inputRef}
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        spellCheck={false}
        placeholder="you@email.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-full h-14 px-4 rounded-xl
          border border-gray-200 bg-white
          text-[17px] text-gray-900 placeholder:text-gray-400
          focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15
          transition-shadow
        "
      />
      <ErrorText>{error}</ErrorText>
      <div className="mt-auto pt-6">
        <PrimaryButton type="submit" disabled={!valid || submitting}>
          {submitting ? "Saving…" : "Continue"}
        </PrimaryButton>
        <p className="mt-3 text-center text-[12px] text-gray-500">
          By continuing you agree to receive product emails from MyParentalControls.
        </p>
      </div>
    </form>
  );
}

/* ----------------------------- Step 2: Kids ----------------------------- */

function StepKids({
  defaultCount,
  defaultAges,
  submitting,
  error,
  onSubmit,
}: {
  defaultCount: number;
  defaultAges: number[];
  submitting: boolean;
  error: string | null;
  onSubmit: (count: number, ages: number[]) => void;
}) {
  const [count, setCount] = useState(defaultCount);
  const [ages, setAges] = useState<number[]>(() => {
    const arr = [...defaultAges];
    while (arr.length < defaultCount) arr.push(0);
    return arr.slice(0, defaultCount);
  });

  const setCountSafe = (n: number) => {
    setCount(n);
    setAges((prev) => {
      const arr = [...prev];
      while (arr.length < n) arr.push(0);
      return arr.slice(0, n);
    });
  };

  const valid = ages.length === count && ages.every((a) => a >= 4 && a <= 18);
  const ageOptions = useMemo(
    () => Array.from({ length: 15 }, (_, i) => i + 4),
    [],
  );

  return (
    <div className="flex flex-col h-full">
      <StepHeader
        title="How many kids?"
        subtitle="So we can tailor what we monitor across each device."
      />

      <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-3 mb-6">
        <span className="px-2 text-[15px] text-gray-700">Kids</span>
        <div className="flex items-center gap-2">
          <StepperButton onClick={() => setCountSafe(Math.max(1, count - 1))} ariaLabel="Decrement kids">
            −
          </StepperButton>
          <span className="w-8 text-center text-[18px] font-bold tabular-nums text-gray-900">
            {count}
          </span>
          <StepperButton onClick={() => setCountSafe(Math.min(6, count + 1))} ariaLabel="Increment kids">
            +
          </StepperButton>
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i}>
            <div className="text-[13px] font-semibold text-gray-700 mb-2">
              Kid {i + 1} age
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ageOptions.map((a) => {
                const selected = ages[i] === a;
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      const next = [...ages];
                      next[i] = a;
                      setAges(next);
                    }}
                    className={`
                      h-9 min-w-9 px-2 rounded-full text-[14px] font-semibold transition-colors
                      ${selected
                        ? "bg-[#2563EB] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                    `}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <ErrorText>{error}</ErrorText>

      <div className="mt-auto pt-6">
        <PrimaryButton
          disabled={!valid || submitting}
          onClick={() => onSubmit(count, ages)}
        >
          {submitting ? "Saving…" : "Continue"}
        </PrimaryButton>
      </div>
    </div>
  );
}

function StepperButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-10 h-10 rounded-full bg-white border border-gray-200 text-[18px] font-bold text-gray-700 hover:bg-gray-100 transition-colors"
    >
      {children}
    </button>
  );
}

/* ----------------------------- Step 3: Games ----------------------------- */

function StepGames({
  defaultValue,
  submitting,
  error,
  onSubmit,
}: {
  defaultValue: string[];
  submitting: boolean;
  error: string | null;
  onSubmit: (games: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>(defaultValue);
  const toggle = (g: string) =>
    setSelected((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
    );
  const valid = selected.length > 0;

  return (
    <div className="flex flex-col h-full">
      <StepHeader
        title="Which games do they play?"
        subtitle="Pick any that apply. We monitor 3,000+ games — these are the most common."
      />
      <div className="flex flex-wrap gap-2">
        {GAMES.map((g) => {
          const on = selected.includes(g);
          return (
            <button
              key={g}
              type="button"
              onClick={() => toggle(g)}
              className={`
                inline-flex items-center gap-1.5 h-11 px-4 rounded-full
                text-[14px] font-semibold transition-colors
                ${on
                  ? "bg-[#2563EB] text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
              `}
            >
              {on && <Check className="w-3.5 h-3.5" />}
              {g}
            </button>
          );
        })}
      </div>
      <ErrorText>{error}</ErrorText>
      <div className="mt-auto pt-6">
        <PrimaryButton
          disabled={!valid || submitting}
          onClick={() => onSubmit(selected)}
        >
          {submitting ? "Saving…" : "Continue"}
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ----------------------------- Step 4: Concerns ----------------------------- */

function StepConcerns({
  defaultValue,
  submitting,
  error,
  onSubmit,
}: {
  defaultValue: string[];
  submitting: boolean;
  error: string | null;
  onSubmit: (concerns: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>(defaultValue);
  const [custom, setCustom] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const toggle = (c: string) =>
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  const addCustom = () => {
    const v = custom.trim();
    if (!v) return;
    if (!selected.includes(v)) setSelected((prev) => [...prev, v]);
    setCustom("");
    setShowCustom(false);
  };
  const valid = selected.length > 0;

  return (
    <div className="flex flex-col h-full">
      <StepHeader
        title="What worries you most?"
        subtitle="Pick all that apply. We'll tune your alerts around these."
      />
      <div className="space-y-2">
        {CONCERNS.map((c) => {
          const on = selected.includes(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => toggle(c)}
              className={`
                w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border transition-colors text-left
                ${on
                  ? "border-[#2563EB] bg-[#EFF4FF]"
                  : "border-gray-200 bg-white hover:border-gray-300"}
              `}
            >
              <span className="text-[15px] font-medium text-gray-900">{c}</span>
              <span
                className={`
                  w-5 h-5 rounded-md flex items-center justify-center transition-colors
                  ${on ? "bg-[#2563EB]" : "border border-gray-300"}
                `}
              >
                {on && <Check className="w-3.5 h-3.5 text-white" />}
              </span>
            </button>
          );
        })}

        {selected
          .filter((c) => !CONCERNS.includes(c))
          .map((c) => (
            <div
              key={c}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-[#2563EB] bg-[#EFF4FF]"
            >
              <span className="text-[15px] font-medium text-gray-900">{c}</span>
              <button
                type="button"
                onClick={() => toggle(c)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Remove"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

        {showCustom ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustom())}
              placeholder="Type your concern…"
              className="flex-1 h-12 px-4 rounded-xl border border-gray-200 text-[15px] focus:outline-none focus:border-[#2563EB]"
            />
            <button
              type="button"
              onClick={addCustom}
              className="h-12 px-4 rounded-xl bg-[#2563EB] text-white text-[14px] font-semibold"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowCustom(true)}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-dashed border-gray-300 text-[14px] font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add your own
          </button>
        )}
      </div>

      <ErrorText>{error}</ErrorText>
      <div className="mt-auto pt-6">
        <PrimaryButton
          disabled={!valid || submitting}
          onClick={() => onSubmit(selected)}
        >
          {submitting ? "Saving…" : "Continue"}
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ----------------------------- Step 5: Waitlist ----------------------------- */

function StepWaitlist({
  position,
  submitting,
  error,
  onSkip,
  onWait,
}: {
  position: number | null;
  submitting: boolean;
  error: string | null;
  onSkip: () => void;
  onWait: () => void;
}) {
  return (
    <div className="flex flex-col h-full text-center">
      <StepHeader title="You're in." />

      <div className="rounded-2xl bg-[#EFF4FF] border border-[#DBEAFE] p-6 mb-5">
        <div className="text-[12px] font-bold tracking-wider uppercase text-[#2563EB]">
          Your waitlist spot
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
          #{position?.toLocaleString() ?? "—"}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 p-5 text-left">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2563EB] text-white text-[11px] font-bold">
            ★
          </span>
          <span className="text-[13px] font-bold uppercase tracking-wider text-[#2563EB]">
            Skip the line
          </span>
        </div>
        <p className="text-[15px] text-gray-700 leading-snug">
          Pay <strong>$1</strong> and we'll move you to{" "}
          <strong>around #8</strong> in the premium queue. Onboarding email
          arrives in minutes.
        </p>
        <div className="mt-4">
          <PrimaryButton onClick={onSkip} disabled={submitting}>
            {submitting ? "Opening checkout…" : "Skip the line — $1"}
          </PrimaryButton>
          <p className="mt-2 text-center text-[11px] text-gray-500">
            Apple Pay, Google Pay, or card · Powered by Stripe
          </p>
        </div>
      </div>

      <ErrorText>{error}</ErrorText>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={onWait}
          className="w-full text-[14px] font-semibold text-gray-500 hover:text-gray-800 transition-colors py-2"
        >
          I'll wait my turn
        </button>
      </div>
    </div>
  );
}
