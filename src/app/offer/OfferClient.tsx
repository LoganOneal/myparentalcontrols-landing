"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import type { Stripe as StripeType, StripeElements } from "@stripe/stripe-js";
import {
  BellRing,
  Check,
  ChevronRight,
  Gamepad2,
  MessageCircle,
  Mic,
  ShieldAlert,
  ShieldCheck,
  Tag,
  Users,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { KodaLogo, StarIcon } from "@/components/icons";
import {
  DEFAULT_KODA_PLAN_ID,
  KODA_PLANS,
  type KodaPlan,
  type KodaPlanId,
} from "@/lib/plans";
import type { FunnelCompletion } from "@/types/funnel";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

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

const REVIEW_IMAGES = [
  {
    src: "/images/parents/parent5.jpg",
    alt: "Parent and child gaming together",
  },
  {
    src: "/images/parents/parent6.jpg",
    alt: "Parent watching a child play games online",
  },
];

const COUPON_CODE_SOURCES = [
  {
    stepId: "online-spaces",
    codes: {
      roblox: "ROBLOX",
      minecraft: "MINECRAFT",
      fortnite: "FORTNITE",
      discord: "DISCORD",
      steam: "STEAM",
      "league-of-legends": "LEAGUE",
      valorant: "VALORANT",
      "counter-strike": "CS2",
      "call-of-duty": "COD",
      vrchat: "VRCHAT",
      "other-pc-games": "PC",
    },
  },
  {
    stepId: "communication",
    codes: {
      "voice-chat": "VOICE",
      "direct-messages": "DM",
      "group-chats": "GROUP",
      "text-chat": "TEXT",
      "video-screen": "SCREEN",
    },
  },
  {
    stepId: "concerns",
    codes: {
      strangers: "STRANGER",
      "sexual-messages": "EXPLICIT",
      bullying: "BULLYING",
      "harmful-language": "THREAT",
      "hidden-conversations": "SEE_MORE",
      "screen-time": "TIME",
      visibility: "SEE_MORE",
    },
  },
] as const;

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

function getCouponDateCode(completedAt: string) {
  const date = new Date(completedAt);
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  const month = (safeDate.getMonth() + 1).toString().padStart(2, "0");
  const year = safeDate.getFullYear().toString().slice(-2);
  return `${month}${year}`;
}

function getCouponBase(answers: FunnelCompletion["answers"]) {
  for (const source of COUPON_CODE_SOURCES) {
    const selectedIds = answers[source.stepId] ?? [];
    const match = selectedIds.find((id) => id in source.codes);

    if (match) {
      return source.codes[match as keyof typeof source.codes];
    }
  }

  return "FAMILY";
}

function getOfferCode(completion: FunnelCompletion) {
  return `${getCouponBase(completion.answers)}_SAFE_${getCouponDateCode(
    completion.completedAt,
  )}`;
}

function splitPrice(price: string) {
  const clean = price.replace("$", "");
  const [dollars, cents = "00"] = clean.split(".");
  return { dollars, cents: cents.padEnd(2, "0") };
}

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 star review">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon
          key={index}
          className="h-7 w-7 text-[#FBBF24]"
          fill="currentColor"
          aria-hidden
        />
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

function FinalPlanOptions({
  selectedPlan,
  onSelect,
}: {
  selectedPlan: KodaPlan;
  onSelect: (planId: KodaPlanId) => void;
}) {
  return (
    <section className="mt-10 rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_54px_-44px_rgba(15,23,42,0.75)]">
      <div className="text-center">
        <div className="text-[12px] font-black uppercase tracking-[0.14em] text-[#2563EB]">
          Choose your plan
        </div>
        <h2 className="mt-1 text-[24px] font-black leading-tight text-gray-950">
          Choose my Koda plan
        </h2>
      </div>

      <div className="mt-4 space-y-2">
        {KODA_PLANS.map((plan) => {
          const selected = selectedPlan.id === plan.id;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelect(plan.id)}
              aria-pressed={selected}
              className={`grid w-full grid-cols-[1fr_auto] items-center gap-3 rounded-[18px] border-2 px-4 py-3 text-left transition-all ${
                selected
                  ? "border-[#2563EB] bg-blue-50 shadow-[0_16px_34px_-28px_rgba(37,99,235,0.9)]"
                  : "border-slate-200 bg-white hover:border-blue-200"
              }`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[16px] font-black leading-tight text-gray-950">
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <span className="rounded-full bg-[#2563EB] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.06em] text-white">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[12px] font-bold leading-snug text-slate-500">
                  {plan.billingLabel}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1.5">
                  {plan.originalLabel && (
                    <span className="text-[13px] font-semibold text-slate-400 line-through decoration-red-500">
                      {plan.originalLabel}
                    </span>
                  )}
                  <span className="text-[20px] font-black text-[#2563EB]">
                    {plan.priceLabel}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-end gap-1.5 text-[11px] font-black text-slate-500">
                  {selected && <Check className="h-3.5 w-3.5 text-[#2563EB]" />}
                  {plan.perMonthLabel}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
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
        <div className="flex min-w-0 items-center justify-center gap-1.5 rounded-2xl bg-white px-3 py-3 text-center text-[12px] font-black leading-tight text-gray-950 sm:text-[14px]">
          <Check className="h-4 w-4 shrink-0 text-lime-600" aria-hidden />
          <span className="min-w-0 whitespace-nowrap font-mono">{code}</span>
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
      <div className="relative mx-auto mt-6 h-[340px] max-w-[360px]">
        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[10px] border-white bg-[#22184F] text-white shadow-xl">
          <div className="text-[34px] font-black leading-none">5</div>
          <div className="text-[13px] font-black uppercase tracking-[0.08em]">
            signals
          </div>
        </div>
        {SIGNALS.map((signal, index) => {
          const positions = [
            "left-1/2 top-0 -translate-x-1/2",
            "right-0 top-[22%]",
            "right-[10%] bottom-0",
            "left-[10%] bottom-0",
            "left-0 top-[22%]",
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
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[13px] font-bold text-slate-600">
          Research-backed
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[13px] font-bold text-slate-600">
          Parent-first
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[13px] font-bold text-slate-600">
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const mediaScrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollToImage = (index: number) => {
    const scroller = mediaScrollerRef.current;
    if (!scroller) return;
    setActiveImageIndex(index);
    scroller.scrollTo({
      left: index * scroller.clientWidth,
      behavior: "smooth",
    });
  };

  const handleMediaScroll = () => {
    const scroller = mediaScrollerRef.current;
    if (!scroller) return;
    const nextIndex = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setActiveImageIndex(
      Math.min(Math.max(nextIndex, 0), REVIEW_IMAGES.length - 1),
    );
  };

  return (
    <section className="mt-10">
      <h2 className="text-center text-[31px] font-black leading-tight tracking-tight text-slate-800">
        Why parents <span className="text-[#2563EB]">love</span> protecting
        their kids with Koda
      </h2>

      <div className="relative mx-auto mt-6 h-[330px] w-[330px] overflow-hidden rounded-full shadow-[0_22px_54px_-40px_rgba(15,23,42,0.9)]">
        <div
          id="review-image-carousel"
          ref={mediaScrollerRef}
          onScroll={handleMediaScroll}
          className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          {REVIEW_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className="relative h-full w-full shrink-0 snap-center"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="330px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-4">
        {REVIEW_IMAGES.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => scrollToImage(index)}
            aria-label={`Show review image ${index + 1}`}
            aria-current={activeImageIndex === index ? "true" : undefined}
            className="flex h-8 w-8 items-center justify-center rounded-full"
          >
            <span
              className={`h-3 w-3 rounded-full transition-colors ${
                activeImageIndex === index ? "bg-slate-800" : "bg-slate-300"
              }`}
            />
          </button>
        ))}
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
  const [walletsAvailable, setWalletsAvailable] = useState(false);
  const [walletsChecked, setWalletsChecked] = useState(false);
  const stripeRef = useRef<StripeType | null>(null);
  const elementsRef = useRef<StripeElements | null>(null);
  const expressContainerRef = useRef<HTMLDivElement | null>(null);
  const expressInitialized = useRef(false);

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

  useEffect(() => {
    if (!stripePromise || !completion || expressInitialized.current) return;
    expressInitialized.current = true;

    let cancelled = false;

    async function init() {
      const stripe = await stripePromise;
      if (cancelled || !stripe) return;
      stripeRef.current = stripe;

      const res = await fetch("/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recordId: completion!.recordId,
          planId: selectedPlanId,
        }),
      });
      if (!res.ok || cancelled) return;
      const { clientSecret, paymentIntentId, amountCents } = await res.json();

      const plan = KODA_PLANS.find((p) => p.id === selectedPlanId)!;
      const elements = stripe.elements({
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: { colorPrimary: "#000000", borderRadius: "50px" },
        },
      });
      elementsRef.current = elements;

      const expressCheckout = elements.create("expressCheckout", {
        buttonHeight: 64,
        buttonTheme: { applePay: "black", googlePay: "black" },
        buttonType: { applePay: "plain", googlePay: "plain" },
        layout: { maxColumns: 1, maxRows: 2, overflow: "never" },
        lineItems: [{ name: plan.checkoutLabel, amount: amountCents }],
        paymentMethods: {
          applePay: "auto",
          googlePay: "auto",
          link: "never",
          paypal: "never",
          amazonPay: "never",
          klarna: "never",
        },
      });

      expressCheckout.on("ready", (event: { availablePaymentMethods?: Record<string, boolean> }) => {
        if (cancelled) return;
        setWalletsChecked(true);
        setWalletsAvailable(
          Boolean(event.availablePaymentMethods?.applePay || event.availablePaymentMethods?.googlePay),
        );
      });

      expressCheckout.on("click", (event: { resolve: (opts: { lineItems: Array<{ name: string; amount: number }> }) => void }) => {
        event.resolve({
          lineItems: [{ name: plan.checkoutLabel, amount: amountCents }],
        });
      });

      expressCheckout.on("confirm", async () => {
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/welcome?payment_intent=${paymentIntentId}&record_id=${completion!.recordId}&plan=${selectedPlanId}`,
          },
          redirect: "if_required",
        });

        if (result.error) return;

        router.push(
          `/welcome?payment_intent=${paymentIntentId}&record_id=${completion!.recordId}&plan=${selectedPlanId}`,
        );
      });

      if (cancelled || !expressContainerRef.current) return;
      expressCheckout.mount(expressContainerRef.current);
    }

    init().catch(() => {
      if (!cancelled) {
        setWalletsChecked(true);
        setWalletsAvailable(false);
      }
    });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completion]);

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

  const offerCode = getOfferCode(completion);

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
          <div
            ref={expressContainerRef}
            className={walletsChecked && !walletsAvailable ? "hidden" : "min-h-[64px]"}
          />
          {walletsAvailable && (
            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-[14px] font-medium text-gray-400">or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          )}
          {walletsAvailable ? (
            <button
              type="button"
              onClick={handleContinue}
              className="flex h-14 w-full items-center justify-center gap-2 text-[17px] font-bold text-gray-900 hover:text-gray-600 transition-colors"
            >
              Continue with another payment method
            </button>
          ) : (walletsChecked || !completion) && (
            <button
              type="button"
              onClick={handleContinue}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-black text-[19px] font-black text-white shadow-[0_18px_42px_-28px_rgba(0,0,0,0.85)]"
            >
              Continue to secure checkout
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          )}
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

        <FinalPlanOptions
          selectedPlan={selectedPlan}
          onSelect={setSelectedPlanId}
        />

        <div className="mt-4 pb-2">
          {walletsAvailable ? (
            <>
              <button
                type="button"
                onClick={() => expressContainerRef.current?.querySelector("button")?.click()}
                className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-black text-[19px] font-black text-white shadow-[0_18px_42px_-28px_rgba(0,0,0,0.85)]"
              >
                Pay now
              </button>
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-[14px] font-medium text-gray-400">or</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <button
                type="button"
                onClick={handleContinue}
                className="flex h-14 w-full items-center justify-center gap-2 text-[17px] font-bold text-gray-900 hover:text-gray-600 transition-colors"
              >
                Continue with another payment method
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleContinue}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-black text-[19px] font-black text-white shadow-[0_18px_42px_-28px_rgba(0,0,0,0.85)]"
            >
              Continue to secure checkout
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
