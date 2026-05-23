import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PlatformLogo } from "@/components/PlatformLogo";
import { PLATFORMS, getPlatform } from "@/data/platforms";

export const metadata = {
  title: "App Reviews for Parents | Koda",
  description:
    "Honest, parent-first reviews of the games, chat apps, and social platforms your kids actually use. Risks, age ratings, parental controls, and our bottom line on every app.",
};

const FEATURED_SLUGS = [
  "discord",
  "roblox",
  "tiktok",
  "snapchat",
  "fortnite",
  "instagram",
  "minecraft",
  "youtube",
];

const HIGH_RISK_SLUGS = [
  "kik",
  "monkey",
  "omegle",
  "yubo",
  "character-ai",
  "replika",
  "telegram",
  "twitter",
];

const AI_SLUGS = ["chatgpt", "claude", "character-ai", "replika", "sora"];

function ReviewTile({ slug }: { slug: string }) {
  const platform = getPlatform(slug);
  if (!platform) return null;
  return (
    <Link
      href={`/platforms/${platform.slug}`}
      className="group flex items-start gap-3 p-4 rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition"
    >
      <PlatformLogo platform={platform} size={44} />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-black leading-tight truncate">
            {platform.name}
          </div>
          <span className="text-black/30 group-hover:text-black/70 transition">
            →
          </span>
        </div>
        <div className="text-sm text-black/60 mt-0.5 line-clamp-2">
          {platform.blurb}
        </div>
      </div>
    </Link>
  );
}

export default function AppReviewsPage() {
  const total = PLATFORMS.length;

  return (
    <>
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-4 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E66E8]/10 text-[#1E66E8] text-xs font-semibold">
            App reviews for parents
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-black tracking-tight">
            What every app is actually doing to your kid.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-black/70">
            Honest, parent-first reviews of the games, chat apps, and social
            platforms your kids actually use. Every review covers the real
            risks, the in-app parental controls, and our bottom-line
            recommendation.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/platforms"
              className="inline-flex items-center justify-center px-5 h-11 rounded-full bg-[#1E66E8] text-white font-semibold hover:bg-[#1853BD] transition"
            >
              Browse all {total} reviews &rarr;
            </Link>
            <a
              href="#featured"
              className="inline-flex items-center justify-center px-5 h-11 rounded-full border border-black/10 text-black font-semibold hover:bg-black/5 transition"
            >
              Start with the big ones
            </a>
          </div>
        </div>

        {/* Featured */}
        <section id="featured" className="mt-16 scroll-mt-24">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              The apps every parent should read first
            </h2>
            <Link
              href="/platforms"
              className="text-sm font-semibold text-[#1E66E8] hover:underline"
            >
              See all &rarr;
            </Link>
          </div>
          <p className="mt-2 text-black/70 max-w-2xl">
            If you only have time to read a handful, start here. These are the
            platforms generating the most parent questions, the most safety
            headlines, and the most Koda alerts.
          </p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FEATURED_SLUGS.map((slug) => (
              <ReviewTile key={slug} slug={slug} />
            ))}
          </div>
        </section>

        {/* High risk */}
        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-black">
            High-risk apps we recommend blocking
          </h2>
          <p className="mt-2 text-black/70 max-w-2xl">
            For these, our bottom line is consistent: not recommended for
            minors. Read each review to understand exactly why — then block
            them at the device or router level.
          </p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {HIGH_RISK_SLUGS.map((slug) => (
              <ReviewTile key={slug} slug={slug} />
            ))}
          </div>
        </section>

        {/* AI companions callout */}
        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-black">
            AI chatbots &amp; companions
          </h2>
          <p className="mt-2 text-black/70 max-w-2xl">
            The newest and least-understood category. Every chatbot in this
            list has been linked to teen mental-health concerns, academic
            integrity issues, or both.
          </p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AI_SLUGS.map((slug) => (
              <ReviewTile key={slug} slug={slug} />
            ))}
          </div>
        </section>

        {/* How we review */}
        <section className="mt-16 p-6 sm:p-8 rounded-2xl border border-black/5 bg-white">
          <h2 className="text-xl sm:text-2xl font-bold text-black">
            How we review apps
          </h2>
          <p className="mt-3 text-black/80 leading-relaxed">
            Every review follows the same template so you can compare apples
            to apples. We look at five things parents actually care about:
          </p>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "What it is, plainly",
                body: "No jargon. What the app does and why kids actually use it.",
              },
              {
                title: "Where the risk lives",
                body: "Predator contact, sex/nudity, privacy, language, violence — rated low / medium / high.",
              },
              {
                title: "What parents miss",
                body: "The defaults that look safe but aren't, and the workarounds kids use.",
              },
              {
                title: "Built-in parental controls",
                body: "What the platform itself offers, how strong it is, and how to turn it on.",
              },
              {
                title: "How Koda covers it",
                body: "What we monitor, what alerts you'll get, and what we can't see (yet).",
              },
              {
                title: "Bottom line",
                body: "The recommendation — block it, restrict it, or allow it with conversation.",
              },
            ].map((row) => (
              <li key={row.title} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1E66E8] text-white text-xs font-bold shrink-0"
                >
                  ✓
                </span>
                <div>
                  <div className="font-semibold text-black">{row.title}</div>
                  <div className="text-sm text-black/70">{row.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Full catalog CTA */}
        <section className="mt-16 p-6 sm:p-10 rounded-2xl bg-black text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {total} reviews and counting.
          </h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">
            Browse the full catalog by category — games, chat &amp; social,
            video &amp; streaming, AI companions, and more.
          </p>
          <Link
            href="/platforms"
            className="inline-flex mt-6 items-center justify-center px-6 h-12 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Browse all {total} reviews &rarr;
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
