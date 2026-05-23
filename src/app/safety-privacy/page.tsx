import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  FileText,
  LockKeyhole,
  MessageSquareWarning,
  ShieldCheck,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Koda Safety & Privacy | Family Data and Monitoring",
  description:
    "How Koda Safety handles family monitoring, parent alerts, child data, privacy, retention, and deletion requests.",
  alternates: {
    canonical: "/safety-privacy",
  },
  openGraph: {
    title: "Koda Safety & Privacy",
    description:
      "Clear parent guidance on Koda Safety monitoring, family data, privacy, and responsible use.",
    url: `${SITE_URL}/safety-privacy`,
    images: [{ url: "/seo/opengraph.jpg" }],
  },
};

const PRINCIPLES = [
  {
    icon: BellRing,
    title: "High-signal alerts",
    body: "Koda Safety is designed around serious risk signals, not endless low-value notifications.",
  },
  {
    icon: MessageSquareWarning,
    title: "Parent context",
    body: "Alerts should help parents understand what happened and talk with their child calmly.",
  },
  {
    icon: LockKeyhole,
    title: "Privacy by default",
    body: "Family data should be protected, access should be limited, and deletion should be easy to request.",
  },
];

const safetyPrivacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/safety-privacy#webpage`,
  name: "Koda Safety & Privacy",
  url: `${SITE_URL}/safety-privacy`,
  description:
    "How Koda Safety handles family monitoring, child data, parent alerts, privacy, retention, and deletion requests.",
  isPartOf: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export default function SafetyPrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <JsonLd data={safetyPrivacyJsonLd} />
        <section className="bg-[#F1F2F4] px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#2563EB] shadow-sm ring-1 ring-black/5">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Safety & privacy
              </div>
              <h1 className="mt-5 text-[38px] font-bold leading-[1.04] tracking-tight text-[#1E1E1E] sm:text-[52px] lg:text-[64px]">
                How Koda Safety protects family data.
              </h1>
              <p className="mt-5 max-w-[680px] text-base leading-relaxed text-black/70 sm:text-lg">
                Koda Safety is built to help parents spot serious online risks
                while keeping family trust, privacy, and responsible use at the
                center of the product.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 md:grid-cols-3">
            {PRINCIPLES.map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="rounded-lg border border-black/5 bg-[#F8F9FB] p-5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="mt-4 text-xl font-bold text-black">
                    {principle.title}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-black/65">
                    {principle.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-[#F8F9FB] px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                What parents should know
              </p>
              <h2 className="mt-2 text-[32px] font-bold leading-tight text-black sm:text-[42px]">
                Monitoring works best when it is clear and purposeful.
              </h2>
            </div>
            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-bold text-black">
                  What Koda monitors
                </h3>
                <p className="mt-3 text-base leading-relaxed text-black/70">
                  Koda Safety focuses on PC game conversations, online chats,
                  voice risk, and platform activity that may point to grooming,
                  bullying, threats, sexual content, self-harm, or harmful
                  language.
                </p>
              </section>
              <section>
                <h3 className="text-2xl font-bold text-black">
                  What parents see
                </h3>
                <p className="mt-3 text-base leading-relaxed text-black/70">
                  Parents should receive alert context that helps them respond
                  to safety issues. The goal is to make the next conversation
                  with a child more grounded, not to create a constant stream of
                  low-value surveillance.
                </p>
              </section>
              <section>
                <h3 className="text-2xl font-bold text-black">
                  How to talk to kids about it
                </h3>
                <p className="mt-3 text-base leading-relaxed text-black/70">
                  Tell your child that Koda Safety is being used, which devices
                  and platforms are covered, and what kinds of alerts matter.
                  Clear expectations help monitoring feel like protection
                  instead of a surprise.
                </p>
              </section>
              <section>
                <h3 className="text-2xl font-bold text-black">
                  Data retention and deletion
                </h3>
                <p className="mt-3 text-base leading-relaxed text-black/70">
                  Families can request access, correction, or deletion of
                  personal data by contacting support. The full legal policy is
                  available in the privacy policy.
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-6 rounded-lg bg-[#121212] p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#60A5FA]">
                Legal details
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Review the full policy language.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
                This page is a plain-language overview. The privacy policy and
                terms contain the full legal terms for Koda Safety.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/privacy"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 font-bold text-white transition hover:bg-[#1D4ED8]"
              >
                Privacy policy
                <FileText className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/tos"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 font-bold text-white transition hover:bg-white/15"
              >
                Terms
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
