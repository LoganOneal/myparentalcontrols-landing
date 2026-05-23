import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Gamepad2,
  LockKeyhole,
  MessageSquareWarning,
  Mic,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  KODA_PRODUCT_DESCRIPTION,
  SITE_URL,
  kodaSafetySoftwareJsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Koda Safety | Parental Security for PC Games",
  description:
    "Koda Safety helps parents monitor PC game voice chat, text chat, Discord, Roblox, Fortnite, Minecraft, and other online child safety risks.",
  alternates: {
    canonical: "/koda-safety",
  },
  openGraph: {
    title: "Koda Safety | Parental Security for PC Games",
    description: KODA_PRODUCT_DESCRIPTION,
    url: `${SITE_URL}/koda-safety`,
    images: [
      {
        url: "/seo/opengraph.jpg",
        alt: "Koda Safety parental security dashboard for PC games",
      },
    ],
  },
};

const FEATURES = [
  {
    icon: Mic,
    title: "Voice and chat risk",
    body: "Koda Safety focuses on live game conversations, party chat, DMs, and the moments parents usually cannot hear.",
  },
  {
    icon: BellRing,
    title: "Real-time parent alerts",
    body: "Parents get notified when language points to grooming, bullying, threats, self-harm, or sexual content.",
  },
  {
    icon: MessageSquareWarning,
    title: "Context, not noise",
    body: "Alerts are designed to give parents enough detail to respond calmly and understand what happened.",
  },
  {
    icon: Gamepad2,
    title: "Built for PC games",
    body: "Koda is shaped around Roblox, Discord, Fortnite, Minecraft, Steam, and the wider gaming spaces kids use.",
  },
];

const RISKS = [
  "Grooming language and isolation tactics",
  "Bullying, harassment, slurs, and threats",
  "Sexual content or requests for images",
  "Self-harm signals and dangerous escalation",
  "Attempts to move kids into private off-platform chats",
];

const PLATFORMS = [
  { label: "Roblox", href: "/blog/koda-safety-for-roblox" },
  { label: "Discord", href: "/blog/koda-safety-for-discord" },
  { label: "Fortnite", href: "/blog/koda-safety-for-fortnite" },
  { label: "Minecraft", href: "/blog/koda-safety-for-minecraft" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Koda Safety?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Koda Safety is a parental control system for PC games, voice chat, game chat, and online child safety alerts.",
      },
    },
    {
      "@type": "Question",
      name: "Is Koda Safety a parental control app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Koda Safety is a parental-control and parental-security product focused on gaming conversations and real-time safety alerts.",
      },
    },
    {
      "@type": "Question",
      name: "Which platforms does Koda Safety help parents monitor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Koda Safety is designed around PC games and online platforms including Roblox, Discord, Fortnite, Minecraft, Steam, and other gaming communities.",
      },
    },
  ],
};

export default function KodaSafetyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <JsonLd data={[kodaSafetySoftwareJsonLd, faqJsonLd]} />
        <section className="overflow-hidden bg-[#F1F2F4]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#2563EB] shadow-sm ring-1 ring-black/5">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Koda Safety
              </div>
              <h1 className="mt-5 max-w-[720px] text-[38px] font-bold leading-[1.04] tracking-tight text-[#1E1E1E] sm:text-[52px] lg:text-[64px]">
                Koda Safety for PC games, voice chat, and online risk.
              </h1>
              <p className="mt-5 max-w-[620px] text-base leading-relaxed text-black/70 sm:text-lg">
                Koda Safety helps parents see the dangerous moments that happen
                inside multiplayer games, Discord servers, live voice calls, and
                game chat without turning every game night into a ban.
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
                  href="/safety-privacy"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 font-bold text-black transition hover:bg-black/[0.04]"
                >
                  Safety & privacy
                  <LockKeyhole className="h-5 w-5" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[#111827] shadow-[0_26px_70px_-44px_rgba(0,0,0,0.75)] sm:min-h-[460px]">
              <Image
                src="/images/hero-mom-monitoring.png"
                alt="Parent reviewing Koda Safety alerts"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover opacity-80"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.05),rgba(17,24,39,0.82))]"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/94 p-4 shadow-[0_18px_38px_-24px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                    <ShieldAlert className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-black">
                      High-signal gaming alert
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-black/60">
                      Koda Safety gives parents context when a conversation
                      moves from normal play to something risky.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#121212] py-8 text-white">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-base font-bold leading-5">
                      {feature.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">
                      {feature.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                What Koda Safety means
              </p>
              <h2 className="mt-2 text-[32px] font-bold leading-tight text-black sm:text-[42px]">
                A gaming-first parental security layer.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-black/70 sm:text-lg">
              <p>
                Koda Safety is the part of parental controls that most families
                discover they need after basic app limits are already in place.
                It is built for the actual places kids socialize: multiplayer
                games, voice channels, DMs, servers, and platform chats.
              </p>
              <p>
                The product is intentionally focused on high-signal risk. When
                something points to grooming, bullying, threats, sexual content,
                or self-harm, parents get context they can act on quickly.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F8F9FB] px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                What Koda watches for
              </p>
              <h2 className="mt-2 text-[32px] font-bold leading-tight text-black sm:text-[42px]">
                Alerts for the conversations parents are most likely to miss.
              </h2>
              <p className="mt-4 max-w-[680px] text-base leading-relaxed text-black/65">
                Koda Safety is strongest when the risk is not simply which app a
                child opened, but what happened after they joined the match,
                server, party, or chat.
              </p>
            </div>
            <ul className="grid gap-3">
              {RISKS.map((risk) => (
                <li
                  key={risk}
                  className="flex items-start gap-3 rounded-lg border border-black/5 bg-white p-4 text-base font-semibold text-black shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]"
                    aria-hidden
                  />
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                Platform guides
              </p>
              <h2 className="mt-2 text-[32px] font-bold leading-tight text-black sm:text-[42px]">
                Start where your child already plays and talks.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/65">
                These Koda Safety guides connect the product to the platforms
                parents ask about most.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PLATFORMS.map((platform) => (
                <Link
                  key={platform.href}
                  href={platform.href}
                  className="group rounded-lg border border-black/5 bg-[#F8F9FB] p-5 transition hover:-translate-y-0.5 hover:border-[#2563EB]/25 hover:shadow-[0_12px_28px_rgba(37,99,235,0.10)]"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white">
                    <Gamepad2 className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-black">
                    Koda Safety for {platform.label}
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                    Read guide
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
