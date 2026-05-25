import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Download,
  MessageSquareWarning,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "How Koda Works | Parental Controls for PC Games",
  description:
    "How Koda works: parents set up monitoring, Koda watches game voice and chat for risk, and families get real-time safety alerts with context.",
  alternates: {
    canonical: "/how-it-works",
  },
  openGraph: {
    title: "How Koda Works | Parental Controls for PC Games",
    description:
      "See how Koda monitors PC game conversations and alerts parents when voice or chat points to online safety risks.",
    url: `${SITE_URL}/how-it-works`,
  },
};

type Step = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    icon: SlidersHorizontal,
    title: "Tell Koda what matters",
    body: "Parents start with a short setup flow about age, platforms, concerns, and the kinds of conversations they want help watching.",
  },
  {
    icon: Download,
    title: "Connect the devices",
    body: "Koda is built around the computers and gaming spaces where kids use voice chat, text chat, DMs, and multiplayer communities.",
  },
  {
    icon: MessageSquareWarning,
    title: "Monitor voice and chat",
    body: "The system looks for high-risk language patterns in live gaming conversations, including grooming, bullying, threats, sexual content, and self-harm signals.",
  },
  {
    icon: BellRing,
    title: "Alert parents with context",
    body: "When something looks serious, parents get a clear alert with enough context to respond calmly instead of guessing.",
  },
];

const SIGNALS = [
  "Grooming language and attempts to isolate a child",
  "Bullying, harassment, slurs, and threats",
  "Sexual content or requests for private images",
  "Self-harm signals or dangerous escalation",
  "Pressure to move conversations into private off-platform chats",
];

const howItWorksJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/how-it-works#webpage`,
  name: "How Koda Works",
  url: `${SITE_URL}/how-it-works`,
  description:
    "How Koda works: parents set up monitoring, Koda watches game voice and chat for risk, and families get real-time safety alerts with context.",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <JsonLd data={howItWorksJsonLd} />
        <section className="bg-[#F1F2F4] px-5 py-14 sm:py-18 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
              Product walkthrough
            </p>
            <h1 className="mt-3 max-w-[820px] text-[42px] font-bold leading-[1.04] tracking-tight text-[#1E1E1E] sm:text-[58px] lg:text-[72px]">
              How Koda Works
            </h1>
            <p className="mt-5 max-w-[720px] text-base leading-relaxed text-black/70 sm:text-lg">
              Koda gives parents visibility into the live gaming conversations
              that normal parental controls miss, then surfaces the moments
              that deserve attention.
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
                href="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 font-bold text-black transition hover:bg-black/[0.04]"
              >
                Pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  className="rounded-lg border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-black/40">
                      Step {index + 1}
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl font-bold leading-tight text-black">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-black/65">
                    {step.body}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-[#121212] px-5 py-14 text-white sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#93C5FD]">
                What Koda watches for
              </p>
              <h2 className="mt-2 text-[32px] font-bold leading-tight sm:text-[42px]">
                High-signal risks, not every ordinary message.
              </h2>
              <p className="mt-4 max-w-[640px] text-base leading-relaxed text-white/65 sm:text-lg">
                The goal is to help parents notice dangerous patterns earlier
                without turning normal gaming into constant surveillance noise.
              </p>
            </div>
            <ul className="grid gap-3">
              {SIGNALS.map((signal) => (
                <li
                  key={signal}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-base font-semibold text-white"
                >
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#93C5FD]"
                    aria-hidden
                  />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-5 border-t border-black/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[28px] font-bold leading-tight text-black sm:text-[36px]">
                Build your family safety plan.
              </h2>
              <p className="mt-2 max-w-[620px] text-base leading-relaxed text-black/65">
                Answer a few questions about your child&apos;s games, chats,
                and biggest risks.
              </p>
            </div>
            <Link
              href="/get-started"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 font-bold text-white transition hover:bg-[#1D4ED8]"
            >
              Get Started
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
