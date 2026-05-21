"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Plus, X } from "lucide-react";
import { MyParentalControlsLogo } from "@/components/icons";
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
const STORAGE_KEY = "mpc:wizard:state:v1";

type StoredState = {
  recordId: string;
  position: number;
  form: WizardFormData;
};

function loadStored(): StoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : null;
  } catch {
    return null;
  }
}

function saveStored(s: StoredState) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

function clearStored() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export default function GetStartedPage() {
  return (
    <Suspense fallback={<WizardShell><div /></WizardShell>}>
      <WizardClient />
    </Suspense>
  );
}

function WizardClient() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<WizardStep>(1);
  const [form, setForm] = useState<WizardFormData>({ email: "" });
  const [recordId, setRecordId] = useState<string | null>(null);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore session on mount (covers Stripe cancel redirect to ?step=5)
  useEffect(() => {
    const stored = loadStored();
    if (stored) {
      setRecordId(stored.recordId);
      setWaitlistPosition(stored.position);
      setForm(stored.form);
    }
    const stepParam = Number(searchParams.get("step") ?? 1);
    const requestedStep = (stepParam >= 1 && stepParam <= 5
      ? stepParam
      : 1) as WizardStep;
    // Only jump deep into the wizard if we have the corresponding record state
    if (requestedStep > 1 && !stored?.recordId) {
      setStep(1);
    } else {
      setStep(requestedStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = () =>
    setStep((s) => Math.min(TOTAL_STEPS, s + 1) as WizardStep);
  const back = () => setStep((s) => Math.max(1, s - 1) as WizardStep);

  const handleEmailSubmit = useCallback(async (email: string) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as {
        recordId: string;
        position: number;
      };
      setRecordId(data.recordId);
      setWaitlistPosition(data.position);
      const nextForm = { ...form, email };
      setForm(nextForm);
      saveStored({
        recordId: data.recordId,
        position: data.position,
        form: nextForm,
      });
      setStep(2);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }, [form]);

  const patch = useCallback(
    async (fields: Partial<WizardFormData>) => {
      if (!recordId) {
        next();
        return;
      }
      setSubmitting(true);
      setError(null);
      try {
        const res = await fetch(`/api/waitlist/${recordId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        });
        if (!res.ok) throw new Error(await res.text());
        const nextForm = { ...form, ...fields };
        setForm(nextForm);
        if (waitlistPosition !== null) {
          saveStored({
            recordId,
            position: waitlistPosition,
            form: nextForm,
          });
        }
        next();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      } finally {
        setSubmitting(false);
      }
    },
    [form, recordId, waitlistPosition],
  );

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
      const data = (await res.json()) as {
        sessionId: string;
        url: string | null;
      };
      if (data.url) {
        // Clear session right before redirect — /welcome is the terminal page.
        // We keep stored state in case Stripe redirects back on cancel.
        window.location.href = data.url;
        return;
      }
      throw new Error("Checkout URL missing");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't open checkout.");
      setSubmitting(false);
    }
  };

  const canGoBack = step > 1 && step < 5;

  return (
    <WizardShell
      step={step}
      onBack={canGoBack ? back : undefined}
    >
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
          onSubmit={(kidsCount, kidsAges) =>
            patch({ kidsCount, kidsAges })
          }
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
        />
      )}
    </WizardShell>
  );
}

/* --------------------------------- Shell --------------------------------- */

function WizardShell({
  children,
  step,
  onBack,
}: {
  children: React.ReactNode;
  step?: WizardStep;
  onBack?: () => void;
}) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F1F2F4]">
      {/* Top bar — brand left, progress center. Intentionally no close X. */}
      <header className="sticky top-0 z-10 bg-[#F1F2F4]/85 backdrop-blur-md">
        <div className="max-w-[640px] mx-auto h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-[44px]">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label="Back"
                className="-ml-2 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200/60 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <MyParentalControlsLogo height={22} color="#111827" />
            )}
          </div>
          <div className="flex-1 flex justify-center">
            {step ? <ProgressDots current={step} total={TOTAL_STEPS} /> : null}
          </div>
          <div className="min-w-[44px]" aria-hidden />
        </div>
      </header>

      {/* Card */}
      <main className="flex-1 flex items-stretch sm:items-center justify-center px-4 sm:px-6 py-4 sm:py-10">
        <div className="w-full max-w-[480px] flex flex-col bg-white rounded-2xl shadow-[0_2px_28px_rgba(15,23,42,0.06)] border border-gray-100 px-5 sm:px-8 py-6 sm:py-9 min-h-[440px]">
          {children}
        </div>
      </main>
    </div>
  );
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Step ${current} of ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i + 1 === current
              ? "w-6 bg-[#2563EB]"
              : i + 1 < current
              ? "w-1.5 bg-[#2563EB]"
              : "w-1.5 bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function StepHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1
        className="text-[26px] sm:text-[28px] leading-[1.15] tracking-tight text-gray-900"
        style={{ fontFamily: "Moderat-Black, sans-serif", fontWeight: 700 }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-[15px] leading-snug text-gray-600">
          {subtitle}
        </p>
      )}
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
      className="flex flex-col flex-1"
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
          By continuing you agree to receive product emails from
          MyParentalControls.
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
    <div className="flex flex-col flex-1">
      <StepHeader
        title="How many kids?"
        subtitle="So we can tailor what we monitor across each device."
      />

      <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-3 mb-6">
        <span className="px-2 text-[15px] text-gray-700">Kids</span>
        <div className="flex items-center gap-2">
          <StepperButton
            onClick={() => setCountSafe(Math.max(1, count - 1))}
            ariaLabel="Decrement kids"
          >
            −
          </StepperButton>
          <span className="w-8 text-center text-[18px] font-bold tabular-nums text-gray-900">
            {count}
          </span>
          <StepperButton
            onClick={() => setCountSafe(Math.min(6, count + 1))}
            ariaLabel="Increment kids"
          >
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
                      const nextAges = [...ages];
                      nextAges[i] = a;
                      setAges(nextAges);
                    }}
                    className={`
                      h-9 min-w-9 px-2 rounded-full text-[14px] font-semibold transition-colors
                      ${
                        selected
                          ? "bg-[#2563EB] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
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
    <div className="flex flex-col flex-1">
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
                ${
                  on
                    ? "bg-[#2563EB] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }
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
    <div className="flex flex-col flex-1">
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
                ${
                  on
                    ? "border-[#2563EB] bg-[#EFF4FF]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }
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
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addCustom())
              }
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
}: {
  position: number | null;
  submitting: boolean;
  error: string | null;
  onSkip: () => void;
}) {
  return (
    <div className="flex flex-col flex-1">
      <StepHeader title="You're in." />

      <div className="rounded-2xl bg-[#EFF4FF] border border-[#DBEAFE] p-6 mb-5 text-center">
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

      <div className="rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2563EB] text-white text-[11px] font-bold">
            ★
          </span>
          <span className="text-[13px] font-bold uppercase tracking-wider text-[#2563EB]">
            Skip the line
          </span>
        </div>
        <p className="text-[15px] text-gray-700 leading-snug">
          Pay <strong>$1</strong> and we&apos;ll move you to{" "}
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

      <div className="mt-auto pt-6 text-center">
        <Link
          href="/"
          onClick={() => clearStored()}
          className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          I&apos;ll wait my turn
        </Link>
      </div>
    </div>
  );
}
