import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PlatformLogo } from "@/components/PlatformLogo";
import { PLATFORMS, type Platform } from "@/data/platforms";

export const metadata: Metadata = {
  title: "PC Game Safety for Parents | Koda",
  description:
    "Safety guides for every PC game your child plays. Risks, parental controls, and how Koda monitors Roblox, Minecraft, Fortnite, Discord, Valorant, and more.",
  keywords: [
    "gaming safety for kids",
    "parental controls for gaming",
    "is Roblox safe for kids",
    "is Fortnite safe for kids",
    "is Minecraft safe for kids",
    "PC game parental controls",
    "gaming parental control app",
  ],
};

const FEATURED_SLUGS = [
  "roblox",
  "minecraft",
  "discord",
  "fortnite",
  "valorant",
  "call-of-duty",
];

const REVIEW_CRITERIA = [
  {
    label: "Predator contact risk",
    description: "How easily can strangers reach your child through this game?",
  },
  {
    label: "Voice chat exposure",
    description:
      "Is voice chat on by default? Can it be restricted to friends?",
  },
  {
    label: "Content concerns",
    description:
      "Sexual content, graphic violence, or user-generated risk?",
  },
  {
    label: "Built-in parental controls",
    description: "Does the game offer meaningful parent-managed restrictions?",
  },
  {
    label: "Grooming patterns",
    description:
      "Is this game known for grooming, off-platform pipelines, or exploitation?",
  },
  {
    label: "Koda coverage",
    description:
      "What can Koda monitor inside this game? Voice, text, both?",
  },
];

function FeaturedCard({ platform }: { platform: Platform }) {
  const highRisks = platform.risks.filter((r) => r.level === "high");
  return (
    <Link
      href={`/platforms/${platform.slug}`}
      className="group relative flex flex-col rounded-2xl border border-black/5 bg-white p-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition"
    >
      <div className="flex items-center gap-4">
        <PlatformLogo platform={platform} size={56} rounded="rounded-xl" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-black truncate">
            {platform.name}
          </h3>
          <p className="text-sm text-black/60 line-clamp-1">{platform.blurb}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-black/20 group-hover:text-black/60 transition shrink-0" />
      </div>
      {highRisks.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {highRisks.map((r) => (
            <span
              key={r.label}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700"
            >
              {r.label}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

function GameCard({ platform }: { platform: Platform }) {
  return (
    <Link
      href={`/platforms/${platform.slug}`}
      className="flex items-center gap-3 p-3 rounded-2xl border border-black/5 bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition"
    >
      <PlatformLogo platform={platform} size={40} rounded="rounded-lg" />
      <div className="flex-1 min-w-0">
        <span className="font-semibold text-sm text-black truncate block">
          {platform.name}
        </span>
        <span className="text-xs text-black/50 truncate block">
          {platform.blurb}
        </span>
      </div>
    </Link>
  );
}

export default function GameSafetyPage() {
  const featured = FEATURED_SLUGS.map((slug) =>
    PLATFORMS.find((p) => p.slug === slug)
  ).filter(Boolean) as Platform[];

  const remaining = PLATFORMS.filter(
    (p) => !FEATURED_SLUGS.includes(p.slug)
  );

  return (
    <>
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-4 py-10 sm:py-16">
        {/* Hero */}
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            {PLATFORMS.length} games reviewed
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-black tracking-tight leading-tight">
            PC Game Safety for Parents
          </h1>
          <p className="mt-4 text-lg text-black/70 leading-relaxed max-w-2xl">
            Honest safety guides for the games your child actually plays. Risks,
            parental controls, and how Koda monitors voice and chat inside each
            game.
          </p>
        </header>

        {/* Featured Games */}
        <section className="mt-14">
          <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
            Highest-risk games parents ask about
          </h2>
          <p className="mt-2 text-sm text-black/60">
            These games have the highest search volume from parents concerned
            about safety. Each guide covers risks, controls, and monitoring.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((platform) => (
              <FeaturedCard key={platform.slug} platform={platform} />
            ))}
          </div>
        </section>

        {/* More Games */}
        {remaining.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
              More PC games &amp; platforms
            </h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {remaining.map((platform) => (
                <GameCard key={platform.slug} platform={platform} />
              ))}
            </div>
          </section>
        )}

        {/* How We Review */}
        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
            How we review each game
          </h2>
          <p className="mt-2 text-sm text-black/60 max-w-2xl">
            Every game guide is written from a parent&apos;s perspective. We
            evaluate six risk dimensions specific to PC gaming.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEW_CRITERIA.map((criteria) => (
              <div
                key={criteria.label}
                className="p-4 rounded-xl border border-black/5 bg-white"
              >
                <div className="text-sm font-bold text-black">
                  {criteria.label}
                </div>
                <p className="mt-1 text-xs text-black/60">
                  {criteria.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 p-8 sm:p-12 rounded-2xl bg-black text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Monitor what happens inside these games
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Koda Safety monitors voice and text chat inside PC games so you can
            see risks like grooming, bullying, and threats in real time.
          </p>
          <Link
            href="/get-started"
            className="inline-flex mt-6 items-center justify-center px-8 h-12 rounded-full bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
