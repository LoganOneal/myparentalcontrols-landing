import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  Gamepad2,
  MessageSquareWarning,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing | Koda",
  description:
    "Compare Koda parental control plans for PC game monitoring, voice chat alerts, text chat risk detection, and family safety coverage.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing | Koda",
    description:
      "Choose a Koda plan for parental controls, PC game monitoring, voice chat alerts, and online safety protection.",
    url: `${SITE_URL}/pricing`,
  },
};

type Highlight = {
  icon: LucideIcon;
  title: string;
  body: string;
};

type Plan = {
  name: string;
  eyebrow: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  annualMonthlyEquivalent: string;
  annualSavings: string;
  badge?: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

type CompareRow = {
  feature: string;
  starter: string;
  family: string;
  plus: string;
};

const HIGHLIGHTS: Highlight[] = [
  {
    icon: Gamepad2,
    title: "Gaming-first coverage",
    body: "Plans focus on the PC games and chat spaces where kids actually talk.",
  },
  {
    icon: BellRing,
    title: "Real-time parent alerts",
    body: "Get notified when voice or chat points to grooming, bullying, threats, or self-harm.",
  },
  {
    icon: ShieldCheck,
    title: "Annual savings",
    body: "Pay yearly to lower the monthly cost and keep protection running without gaps.",
  },
];

const PLANS: Plan[] = [
  {
    name: "Starter",
    eyebrow: "For one gaming device",
    description:
      "A simple monitoring layer for parents who want visibility into one child's gaming PC.",
    monthlyPrice: 12,
    annualPrice: 99,
    annualMonthlyEquivalent: "8.25",
    annualSavings: "Save $45 yearly",
    cta: "Start with Starter",
    features: [
      "1 child profile",
      "1 monitored computer",
      "Voice and text risk alerts",
      "Roblox, Discord, Fortnite, Minecraft, and Steam coverage",
      "7-day alert history",
      "Email support",
    ],
  },
  {
    name: "Family",
    eyebrow: "Best for most families",
    description:
      "Full parent alerts and history for families with multiple devices or more than one child.",
    monthlyPrice: 19,
    annualPrice: 179,
    annualMonthlyEquivalent: "14.92",
    annualSavings: "Save $49 yearly",
    badge: "Most popular",
    cta: "Choose Family",
    featured: true,
    features: [
      "Up to 4 child profiles",
      "Up to 5 monitored computers",
      "Real-time voice and text alerts",
      "30-day alert and transcript history",
      "Weekly family safety summary",
      "Priority email support",
    ],
  },
  {
    name: "Plus",
    eyebrow: "For higher-risk households",
    description:
      "More history, more context, and faster support for parents who need a deeper safety record.",
    monthlyPrice: 29,
    annualPrice: 279,
    annualMonthlyEquivalent: "23.25",
    annualSavings: "Save $69 yearly",
    cta: "Choose Plus",
    features: [
      "Up to 8 child profiles",
      "Up to 10 monitored computers",
      "90-day alert and transcript history",
      "Sensitive-risk escalation alerts",
      "Device setup review checklist",
      "Priority support within 1 business day",
    ],
  },
];

const COMPARE_ROWS: CompareRow[] = [
  {
    feature: "Child profiles",
    starter: "1",
    family: "Up to 4",
    plus: "Up to 8",
  },
  {
    feature: "Monitored computers",
    starter: "1",
    family: "Up to 5",
    plus: "Up to 10",
  },
  {
    feature: "Voice and text alerts",
    starter: "Included",
    family: "Included",
    plus: "Included",
  },
  {
    feature: "Alert history",
    starter: "7 days",
    family: "30 days",
    plus: "90 days",
  },
  {
    feature: "Weekly safety summary",
    starter: "Not included",
    family: "Included",
    plus: "Included",
  },
  {
    feature: "Support",
    starter: "Email",
    family: "Priority email",
    plus: "Priority, 1 business day",
  },
];

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/pricing#webpage`,
  name: "Pricing",
  url: `${SITE_URL}/pricing`,
  description:
    "Compare Koda parental control plans for PC game monitoring, voice chat alerts, text chat risk detection, and family safety coverage.",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  mainEntity: {
    "@type": "OfferCatalog",
    name: "Koda plans",
    itemListElement: PLANS.map((plan) => ({
      "@type": "Offer",
      name: `Koda ${plan.name}`,
      price: plan.annualPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      url: `${SITE_URL}/pricing`,
      description: `${plan.name} plan billed annually at $${plan.annualPrice}/year.`,
    })),
  },
};

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-lg border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${
        plan.featured
          ? "border-[#2563EB] bg-[#EFF6FF]"
          : "border-black/5 bg-white"
      }`}
    >
      {plan.badge ? (
        <span className="absolute right-5 top-5 rounded-full bg-[#2563EB] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white">
          {plan.badge}
        </span>
      ) : null}

      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
        {plan.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold leading-tight text-black">
        {plan.name}
      </h2>
      <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-black/65">
        {plan.description}
      </p>

      <div className="mt-6 border-t border-black/10 pt-6">
        <div className="flex items-end gap-2">
          <span className="text-[44px] font-bold leading-none text-black">
            ${plan.monthlyPrice}
          </span>
          <span className="pb-1 text-sm font-semibold text-black/55">
            /mo
          </span>
        </div>
        <p className="mt-2 text-sm text-black/60">
          Or ${plan.annualPrice}/year, about ${plan.annualMonthlyEquivalent}/mo.
        </p>
        <p className="mt-1 text-sm font-bold text-[#15803D]">
          {plan.annualSavings} with annual billing.
        </p>
      </div>

      <ul className="mt-6 grid gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]"
              aria-hidden
            />
            <span className="text-sm font-semibold leading-relaxed text-black/75">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/get-started"
        className={`mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-base font-bold transition ${
          plan.featured
            ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
            : "border border-black/10 bg-white text-black hover:bg-black/[0.04]"
        }`}
      >
        {plan.cta}
        <ArrowRight className="h-5 w-5" aria-hidden />
      </Link>
    </article>
  );
}

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <JsonLd data={pricingJsonLd} />
        <section className="bg-[#F1F2F4] px-5 py-14 sm:py-18 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                Koda pricing
              </p>
              <h1 className="mt-3 text-[42px] font-bold leading-[1.04] tracking-tight text-[#1E1E1E] sm:text-[58px] lg:text-[72px]">
                Plans for safer PC gaming.
              </h1>
              <p className="mt-5 max-w-[660px] text-base leading-relaxed text-black/70 sm:text-lg">
                Choose monthly flexibility or annual billing for a lower
                effective price. These early-access prices are placeholders
                while Koda&apos;s launch plans are finalized.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 font-bold text-white transition hover:bg-[#1D4ED8]"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 font-bold text-black transition hover:bg-black/[0.04]"
                >
                  How Koda Works
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {HIGHLIGHTS.map((highlight) => {
                const Icon = highlight.icon;
                return (
                  <div
                    key={highlight.title}
                    className="rounded-lg border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h2 className="mt-4 text-base font-bold leading-5 text-black">
                      {highlight.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-black/60">
                      {highlight.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                  Plan options
                </p>
                <h2 className="mt-2 text-[32px] font-bold leading-tight text-black sm:text-[42px]">
                  Pick the level of coverage your family needs.
                </h2>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#DCFCE7] px-4 py-2 text-sm font-bold text-[#166534]">
                <Users className="h-4 w-4" aria-hidden />
                Annual billing saves up to $69/year
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F8F9FB] px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                Compare plans
              </p>
              <h2 className="mt-2 text-[32px] font-bold leading-tight text-black sm:text-[42px]">
                Every plan includes Koda&apos;s core safety alerts.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/65">
                Move up when you need more child profiles, more monitored
                devices, longer history, or faster support.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto rounded-lg border border-black/10 bg-white">
              <div className="min-w-[720px]">
                <div className="grid grid-cols-[1.1fr_repeat(3,0.8fr)] border-b border-black/10 bg-[#121212] text-white">
                  <div className="px-4 py-3 text-sm font-bold">Feature</div>
                  <div className="px-4 py-3 text-sm font-bold">Starter</div>
                  <div className="px-4 py-3 text-sm font-bold">Family</div>
                  <div className="px-4 py-3 text-sm font-bold">Plus</div>
                </div>
                {COMPARE_ROWS.map((row) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-[1.1fr_repeat(3,0.8fr)] border-b border-black/5 last:border-b-0"
                  >
                    <div className="px-4 py-4 text-sm font-bold text-black">
                      {row.feature}
                    </div>
                    <div className="px-4 py-4 text-sm font-semibold text-black/65">
                      {row.starter}
                    </div>
                    <div className="bg-[#EFF6FF] px-4 py-4 text-sm font-semibold text-black/75">
                      {row.family}
                    </div>
                    <div className="px-4 py-4 text-sm font-semibold text-black/65">
                      {row.plus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 border-t border-black/10 pt-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                Included with every plan
              </p>
              <h2 className="mt-2 text-[30px] font-bold leading-tight text-black sm:text-[40px]">
                A monitoring layer for the moments app limits miss.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: MessageSquareWarning,
                  text: "Risk detection for grooming, bullying, threats, sexual content, and self-harm signals.",
                },
                {
                  icon: BellRing,
                  text: "Parent alerts designed around context, not noise.",
                },
                {
                  icon: Gamepad2,
                  text: "Coverage for PC games and gaming communities.",
                },
                {
                  icon: ShieldCheck,
                  text: "A setup flow that helps parents focus on their biggest concerns.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-start gap-3">
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]"
                      aria-hidden
                    />
                    <p className="text-base font-semibold leading-relaxed text-black/75">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
