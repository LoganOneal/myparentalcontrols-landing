"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BellRing,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Gamepad2,
  LockKeyhole,
  MessageCircle,
  Mic,
  Play,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Tag,
  Users,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { KodaLogo } from "@/components/icons";
import {
  DEFAULT_KODA_PLAN_ID,
  KODA_PLANS,
  type KodaPlan,
  type KodaPlanId,
} from "@/lib/plans";
import type { FunnelCompletion } from "@/types/funnel";

const OFFER_SECONDS = 9 * 60 + 52;

const BENEFITS: Array<{ title: string; body: string; Icon: LucideIcon }> = [
  {
    title: "Personalized safety plan",
    body: "Built around the games, chat channels, and concerns you selected.",
    Icon: ShieldCheck,
  },
  {
    title: "Gameplay and chat monitoring",
    body: "Koda watches for risky context across gameplay, voice, text, DMs, and groups.",
    Icon: Gamepad2,
  },
  {
    title: "Parent alerts that matter",
    body: "Get notified when something needs your attention, without reading every message.",
    Icon: BellRing,
  },
];

const SIGNALS: Array<{ label: string; Icon: LucideIcon; color: string }> = [
  { label: "Predators", Icon: Users, color: "#EF4444" },
  { label: "Bullying", Icon: MessageCircle, color: "#F97316" },
  { label: "Sexual content", Icon: ShieldAlert, color: "#EC4899" },
  { label: "Voice risk", Icon: Mic, color: "#8B5CF6" },
  { label: "Video and screens", Icon: Video, color: "#2563EB" },
];

const REVIEWS = [
  {
    name: "MeganK",
    body: "Koda helped us understand what was happening in voice chat without taking games away. The alert gave us enough context to have a calm conversation with our son.",
  },
  {
    name: "ParentOfTwo",
    body: "I used to worry most about what I could not see. Koda made the risky moments visible and gave us a plan that actually fit how our child games online.",
  },
];

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

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remaining = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function getOfferCode(email: string) {
  const prefix = email.split("@")[0]?.replace(/[^a-z0-9]+/gi, "_").slice(0, 12);
  return `${prefix || "koda"}_safe50`.toLowerCase();
}

function splitPrice(price: string) {
  const clean = price.replace("$", "");
  const [dollars, cents = "00"] = clean.split(".");
  return { dollars, cents: cents.padEnd(2, "0") };
}

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 star review">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="flex h-7 w-7 items-center justify-center bg-emerald-400 text-white"
        >
          <span className="text-[19px] leading-none">★</span>
        </span>
      ))}
    </div>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: KodaPlan;
  selected: boolean;
  onSelect: () => void;
}) {
  const dayPrice = splitPrice(plan.perDayLabel);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative w-full overflow-hidden rounded-[22px] border-2 bg-white text-left transition-all ${
        selected
          ? "border-[#2563EB] bg-blue-50 shadow-[0_24px_52px_-36px_rgba(37,99,235,0.9)]"
          : "border-gray-200 hover:border-blue-200"
      }`}
    >
      {plan.eyebrow && (
        <div
          className={`py-1.5 text-center text-[13px] font-black tracking-[0.06em] text-white ${
            selected ? "bg-[#2563EB]" : "bg-slate-700"
          }`}
        >
          {plan.eyebrow}
        </div>
      )}

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
            selected ? "border-[#2563EB] bg-[#2563EB]" : "border-slate-300"
          }`}
        >
          {selected && <Check className="h-4 w-4 text-white" aria-hidden />}
        </div>

        <div className="min-w-0">
          <div className="text-[18px] font-black leading-tight text-gray-950 sm:text-[20px]">
            {plan.name}
          </div>
          <div className="mt-1 text-[13px] font-bold leading-snug text-slate-500">
            {plan.billingLabel}
          </div>
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            {plan.originalLabel && (
              <span className="text-[15px] font-semibold text-slate-400 line-through decoration-red-500">
                {plan.originalLabel}
              </span>
            )}
            <span className="text-[17px] font-black text-[#2563EB]">
              {plan.priceLabel}
            </span>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-black text-[#2563EB] ring-1 ring-blue-100">
              {plan.perMonthLabel}
            </span>
          </div>
        </div>

        <div
          className={`relative min-w-[112px] rounded-2xl px-3 py-2 text-center ${
            selected ? "bg-[#2563EB] text-white" : "bg-slate-100 text-[#2563EB]"
          }`}
        >
          <div className="flex items-start justify-center gap-1 leading-none">
            <span className="mt-1 text-[18px] font-black">$</span>
            <span className="text-[48px] font-black tracking-tight">
              {dayPrice.dollars}
            </span>
            <span className="mt-1 text-[22px] font-black">{dayPrice.cents}</span>
          </div>
          <div className="text-[11px] font-black leading-none">
            per day
          </div>
          {plan.originalPerDayLabel && (
            <div className={`mt-1 text-[11px] font-bold line-through ${selected ? "text-blue-100" : "text-slate-500"}`}>
              {plan.originalPerDayLabel}/day
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

function DiscountTicket({
  seconds,
  code,
}: {
  seconds: number;
  code: string;
}) {
  const [minutes, remaining] = formatTime(seconds).split(":");

  return (
    <div className="relative mt-5 overflow-hidden rounded-[28px] bg-[#F1F4DD] px-5 py-5">
      <div className="absolute left-0 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      <div className="absolute right-0 top-1/2 h-10 w-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white" />
      <div className="flex items-center justify-center gap-3 text-center text-[19px] font-black leading-tight text-[#22184F]">
        <Tag className="h-8 w-8 rotate-[-18deg] text-lime-600" aria-hidden />
        Special family safety discount is applied
      </div>
      <div className="my-4 border-t-4 border-dashed border-white" />
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <div className="flex min-w-0 items-center justify-center gap-2 rounded-2xl bg-white px-3 py-3 text-[14px] font-black text-gray-950">
          <Check className="h-5 w-5 shrink-0 text-lime-600" aria-hidden />
          <span className="truncate">{code}</span>
        </div>
        <div className="rounded-2xl bg-lime-100 px-4 py-2 text-center">
          <div className="font-mono text-[30px] font-black leading-none text-lime-700">
            {minutes} : {remaining}
          </div>
          <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-gray-600">
            <span>minutes</span>
            <span>seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentLogos() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="grid grid-cols-4 items-center gap-2 text-center text-[13px] font-black">
        <div className="text-[#172B85]">VISA</div>
        <div className="mx-auto flex">
          <span className="block h-7 w-7 rounded-full bg-[#EB001B]" />
          <span className="-ml-3 block h-7 w-7 rounded-full bg-[#F79E1B]/90" />
        </div>
        <div className="text-slate-950">DISCOVER</div>
        <div className="text-[#006FCF]">AMEX</div>
      </div>
    </div>
  );
}

function BenefitsSection() {
  return (
    <section className="mt-8">
      <h2 className="text-center text-[32px] font-black leading-tight tracking-tight text-slate-800">
        What you get with <span className="text-[#2563EB]">Koda</span>
      </h2>

      <div className="relative mx-auto mt-5 h-[310px] max-w-[430px]">
        <div className="absolute left-2 top-4 w-[82%] rotate-[-5deg] rounded-[26px] border-[8px] border-black bg-white p-3 shadow-xl">
          <Image
            src="/images/app-ui-screenshots/insights-overview.png"
            alt="Koda parent safety overview"
            width={640}
            height={430}
            className="h-[190px] w-full rounded-[18px] object-cover object-top"
          />
        </div>
        <div className="absolute bottom-5 right-0 w-[72%] rotate-[4deg] rounded-[24px] border-[8px] border-black bg-white p-2 shadow-2xl">
          <Image
            src="/images/app-ui-screenshots/alerts-suspicious-contact.png"
            alt="Koda alert detail"
            width={640}
            height={360}
            className="h-[128px] w-full rounded-[14px] object-cover object-top"
          />
        </div>
      </div>

      <div className="mt-2 space-y-5">
        {BENEFITS.map((benefit) => (
          <div key={benefit.title} className="grid grid-cols-[auto_1fr] gap-4">
            <benefit.Icon className="mt-1 h-7 w-7 text-slate-700" aria-hidden />
            <div>
              <h3 className="text-[18px] font-black leading-tight text-gray-950">
                {benefit.title}
              </h3>
              <p className="mt-1 text-[17px] font-medium leading-relaxed text-slate-700">
                {benefit.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SignalsSection() {
  return (
    <section className="mt-10 text-center">
      <h2 className="text-[31px] font-black leading-tight tracking-tight text-[#22184F]">
        Based on child-safety research
      </h2>
      <div className="relative mx-auto mt-6 h-[300px] max-w-[430px]">
        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[10px] border-white bg-[#22184F] text-white shadow-xl">
          <div className="text-[34px] font-black leading-none">5</div>
          <div className="text-[13px] font-black uppercase tracking-[0.08em]">
            signals
          </div>
        </div>
        {SIGNALS.map((signal, index) => {
          const positions = [
            "left-1/2 top-0 -translate-x-1/2",
            "right-2 top-[72px]",
            "right-9 bottom-0",
            "left-9 bottom-0",
            "left-2 top-[72px]",
          ];
          return (
            <div
              key={signal.label}
              className={`absolute ${positions[index]} flex h-[108px] w-[108px] flex-col items-center justify-center rounded-[28px] text-white shadow-[0_18px_34px_-24px_rgba(15,23,42,0.75)]`}
              style={{ backgroundColor: signal.color }}
            >
              <signal.Icon className="h-8 w-8" aria-hidden />
              <div className="mt-2 px-2 text-[12px] font-black leading-tight">
                {signal.label}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3 text-[11px] font-black text-slate-600">
        <div className="rounded-full border border-slate-200 bg-white px-2 py-2">
          Research-backed
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-2 py-2">
          Parent-first
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-2 py-2">
          Context-aware
        </div>
      </div>
    </section>
  );
}

function ExpertSection() {
  return (
    <section className="mt-10 overflow-hidden rounded-[30px] bg-[#22184F] text-white shadow-[0_24px_60px_-46px_rgba(34,24,79,0.95)]">
      <div className="p-5 text-center">
        <h2 className="text-[30px] font-black leading-tight">
          Developed with care by online safety builders
        </h2>
        <p className="mt-4 text-[18px] font-medium leading-relaxed text-white/85">
          Koda is built for the places parents feel most in the dark: PC games,
          live voice, direct messages, group chats, and shared screens.
        </p>
      </div>
      <div className="relative h-[430px]">
        <Image
          src="/images/hero-kid-gaming.webp"
          alt="Child gaming online with Koda safety monitoring"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 560px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#22184F] via-[#22184F]/15 to-transparent" />
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <article className="rounded-[20px] border border-slate-200 bg-white p-5">
      <Stars />
      <h3 className="mt-5 text-[20px] font-black text-[#22184F]">
        {review.name}
      </h3>
      <p className="mt-4 text-[18px] font-medium leading-relaxed text-[#22184F]">
        {review.body}
      </p>
    </article>
  );
}

function ReviewsSection() {
  return (
    <section className="mt-10">
      <h2 className="text-center text-[31px] font-black leading-tight tracking-tight text-slate-800">
        Why parents <span className="text-[#2563EB]">love</span> protecting
        their kids with Koda
      </h2>

      <div className="relative mx-auto mt-6 h-[330px] w-[330px] overflow-hidden rounded-full shadow-[0_22px_54px_-40px_rgba(15,23,42,0.9)]">
        <Image
          src="/images/parents/parent5.jpg"
          alt="Parent sharing a Koda review"
          fill
          priority
          sizes="330px"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="flex h-18 w-18 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
            <Play className="ml-1 h-9 w-9 fill-white" aria-hidden />
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-4" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-slate-800" />
        <span className="h-3 w-3 rounded-full bg-slate-300" />
      </div>

      <div className="mt-8 space-y-5">
        {REVIEWS.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
    </section>
  );
}

export function OfferClient() {
  const router = useRouter();
  const [completion, setCompletion] = useState<
    FunnelCompletion | null | undefined
  >(undefined);
  const [selectedPlanId, setSelectedPlanId] =
    useState<KodaPlanId>(DEFAULT_KODA_PLAN_ID);
  const [seconds, setSeconds] = useState(OFFER_SECONDS);

  useEffect(() => {
    window.queueMicrotask(() => {
      setCompletion(
        parseCompletion(sessionStorage.getItem("koda:funnel:result")),
      );
      const savedPlan = sessionStorage.getItem("koda:selected-plan");
      if (KODA_PLANS.some((plan) => plan.id === savedPlan)) {
        setSelectedPlanId(savedPlan as KodaPlanId);
      }
    });
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setSeconds((value) => Math.max(value - 1, 0));
    }, 1000);
    return () => window.clearInterval(tick);
  }, []);

  const selectedPlan = useMemo(
    () => KODA_PLANS.find((plan) => plan.id === selectedPlanId)!,
    [selectedPlanId],
  );

  const handleContinue = () => {
    sessionStorage.setItem("koda:selected-plan", selectedPlanId);
    router.push(`/checkout?plan=${selectedPlanId}`);
  };

  if (completion === undefined) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-white px-5 py-10">
        <div className="text-center text-[15px] font-bold text-gray-500">
          Loading your plan...
        </div>
      </main>
    );
  }

  if (!completion) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-white px-5 py-10">
        <div className="max-w-sm text-center">
          <KodaLogo height={34} className="mb-6 justify-center" />
          <h1 className="text-[28px] font-black leading-tight text-gray-950">
            Your plan needs an email first.
          </h1>
          <button
            type="button"
            onClick={() => router.push("/get-started")}
            className="mt-6 h-14 w-full rounded-full bg-[#2563EB] text-[17px] font-bold text-white"
          >
            Go back
          </button>
        </div>
      </main>
    );
  }

  const offerCode = getOfferCode(completion.email);

  return (
    <main className="min-h-[100dvh] bg-white px-4 pb-10">
      <div className="mx-auto w-full max-w-[560px]">
        <div className="sticky top-0 z-20 -mx-4 border-t-4 border-[#2563EB] bg-white/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto grid max-w-[560px] grid-cols-[1fr_auto_1.5fr] items-center gap-3">
            <div className="text-[14px] font-medium leading-tight text-[#22184F]">
              50% discount reserved for:
            </div>
            <div className="font-mono text-[24px] font-black text-[#4F36F5]">
              {formatTime(seconds)}
            </div>
            <button
              type="button"
              onClick={handleContinue}
              className="h-12 rounded-full bg-[#4F36F5] px-4 text-[16px] font-black text-white shadow-[0_16px_38px_-26px_rgba(79,54,245,0.9)]"
            >
              Get my plan
            </button>
          </div>
        </div>

        <header className="pt-7 text-center">
          <KodaLogo height={34} className="mb-6 justify-center" />
          <h1 className="text-[38px] font-black leading-[1.08] tracking-tight text-slate-800">
            Unlock your child&apos;s{" "}
            <span className="text-[#4F36F5]">Koda</span> safety plan.
          </h1>
        </header>

        <DiscountTicket seconds={seconds} code={offerCode} />

        <section className="mt-6 space-y-3">
          {KODA_PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan.id === plan.id}
              onSelect={() => setSelectedPlanId(plan.id)}
            />
          ))}
        </section>

        <section className="mt-8">
          <h2 className="text-center text-[30px] font-black leading-tight text-gray-950">
            Select payment method
          </h2>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["Card", "Link", "Wallet"].map((method, index) => (
              <button
                key={method}
                type="button"
                className={`flex h-24 flex-col items-center justify-center rounded-[18px] border-2 text-[14px] font-black ${
                  index === 0
                    ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                {index === 0 ? (
                  <CreditCard className="mb-2 h-7 w-7" aria-hidden />
                ) : index === 1 ? (
                  <Sparkles className="mb-2 h-7 w-7" aria-hidden />
                ) : (
                  <LockKeyhole className="mb-2 h-7 w-7" aria-hidden />
                )}
                {method}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="mt-6 flex h-16 w-full items-center justify-center gap-3 rounded-full bg-black text-[19px] font-black text-white shadow-[0_18px_42px_-28px_rgba(0,0,0,0.85)]"
          >
            Continue with secure checkout
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>
          <div className="mt-5 text-center text-[18px] font-medium text-[#22184F]">
            or
          </div>
          <button
            type="button"
            onClick={handleContinue}
            className="mt-4 w-full border-b border-slate-200 pb-4 text-center text-[21px] font-black text-gray-950"
          >
            Continue with another payment method
          </button>
        </section>

        <section className="mt-8 text-center">
          <h2 className="text-[24px] font-black text-gray-950">
            Guaranteed safe checkout
          </h2>
          <div className="mt-4">
            <PaymentLogos />
          </div>
          <p className="mt-4 text-[16px] font-medium text-gray-700">
            All transactions are secure and encrypted.
          </p>
        </section>

        <BenefitsSection />
        <SignalsSection />
        <ExpertSection />
        <ReviewsSection />

        <div className="mt-10 pb-2">
          <button
            type="button"
            onClick={handleContinue}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-[#2563EB] text-[19px] font-black text-white shadow-[0_18px_42px_-28px_rgba(37,99,235,0.95)]"
          >
            <CheckCircle2 className="h-6 w-6" aria-hidden />
            Get my Koda plan
          </button>
        </div>
      </div>
    </main>
  );
}
