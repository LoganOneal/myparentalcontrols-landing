import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { KodaLogo } from "@/components/icons";
import { PlatformLogo } from "@/components/PlatformLogo";
import {
  PLATFORMS,
  getPlatform,
  type Platform,
  type RiskLevel,
} from "@/data/platforms";
import { BLOG_POSTS } from "@/data/blog-posts";

type Params = { slug: string };

export function generateStaticParams() {
  return PLATFORMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) return { title: "Platform | Koda" };
  return {
    title: `${platform.name} Parental Controls & Risks | Koda`,
    description: `${platform.name}: ${platform.blurb} Read the risks every parent should know and how Koda protects your child.`,
  };
}

const RISK_STYLES: Record<RiskLevel, { bg: string; text: string; label: string }> = {
  low: { bg: "#E8F5EE", text: "#0F7A3F", label: "Low" },
  medium: { bg: "#FFF4E0", text: "#9C5800", label: "Medium" },
  high: { bg: "#FFE4E6", text: "#B91C1C", label: "High" },
};

function RiskPill({ level }: { level: RiskLevel }) {
  const s = RISK_STYLES[level];
  return (
    <span
      className="inline-flex items-center px-2.5 h-6 rounded-full text-xs font-bold"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
      {children}
    </h2>
  );
}

function RelatedPlatforms({ current }: { current: Platform }) {
  const related = PLATFORMS.filter(
    (p) => p.slug !== current.slug && p.category === current.category
  ).slice(0, 4);
  if (related.length === 0) return null;
  return (
    <div className="mt-16">
      <SectionTitle>More {current.category}</SectionTitle>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {related.map((p) => (
          <Link
            key={p.slug}
            href={`/platforms/${p.slug}`}
            className="flex items-center gap-3 p-3 rounded-2xl border border-black/5 bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition"
          >
            <PlatformLogo platform={p} size={36} rounded="rounded-lg" />
            <span className="font-semibold text-sm text-black truncate">
              {p.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function PlatformDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  const faqJsonLd =
    platform.faqs && platform.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: platform.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-4 py-10 sm:py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-black/60 mb-6">
          <Link href="/game-safety" className="hover:underline">
            Game Safety
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black/80">{platform.name}</span>
        </nav>

        {/* Hero */}
        <header className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <PlatformLogo platform={platform} size={72} rounded="rounded-2xl" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  {platform.category}
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold text-black tracking-tight">
                  {platform.name}
                </h1>
              </div>
            </div>
            <p className="text-lg text-black/80 max-w-2xl leading-relaxed">
              {platform.blurb}
            </p>
            {/* Age ratings */}
            <div className="flex flex-wrap gap-2">
              {platform.age.apple && (
                <span className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-black text-white text-xs font-semibold">
                  Apple {platform.age.apple}
                </span>
              )}
              {platform.age.google && (
                <span className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-[#34A853] text-white text-xs font-semibold">
                  Google {platform.age.google}
                </span>
              )}
              {platform.age.common && (
                <span className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-[#1E66E8]/10 text-[#1E66E8] text-xs font-semibold">
                  Common Sense {platform.age.common}
                </span>
              )}
            </div>
          </div>

          {/* Risk summary card */}
          <aside className="w-full lg:w-[320px] rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-black/50">
              Risk Summary
            </h2>
            <ul className="mt-3 space-y-2">
              {platform.risks.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-black/80">{r.label}</span>
                  <RiskPill level={r.level} />
                </li>
              ))}
            </ul>
          </aside>
        </header>

        {/* Content sections */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <article className="space-y-12">
            <section>
              <SectionTitle>What is {platform.name}?</SectionTitle>
              <p className="mt-4 text-base sm:text-lg text-black/80 leading-relaxed">
                {platform.whatIs}
              </p>
            </section>

            <section>
              <SectionTitle>How does {platform.name} work?</SectionTitle>
              <p className="mt-4 text-base sm:text-lg text-black/80 leading-relaxed">
                {platform.howItWorks}
              </p>
            </section>

            <section>
              <SectionTitle>What parents need to know</SectionTitle>
              <ul className="mt-4 space-y-3">
                {platform.parentsNeedToKnow.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                      style={{ background: platform.brandColor }}
                    />
                    <span className="text-base sm:text-lg text-black/80 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionTitle>Serious risks &amp; safety concerns</SectionTitle>
              <div className="mt-5 space-y-4">
                {platform.topConcerns.map((c, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-black/5 bg-[#FFF7F7]"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#B91C1C] text-white text-xs font-bold"
                      >
                        !
                      </span>
                      <div>
                        <h3 className="font-bold text-black text-lg">
                          {c.title}
                        </h3>
                        <p className="mt-1 text-black/80 leading-relaxed">
                          {c.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>Parental controls available</SectionTitle>
              <p className="mt-4 text-base sm:text-lg text-black/80 leading-relaxed">
                {platform.parentalControls}
              </p>
              {platform.parentalControlsSteps && platform.parentalControlsSteps.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-black">
                    Step-by-step setup guide
                  </h3>
                  <ol className="mt-3 space-y-2 list-decimal list-inside">
                    {platform.parentalControlsSteps.map((step, i) => (
                      <li
                        key={i}
                        className="text-base text-black/80 leading-relaxed"
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </section>

            <section className="p-6 sm:p-8 rounded-2xl border border-[#1E66E8]/20 bg-[#F6F8FF]">
              <div className="flex flex-col gap-3">
                <KodaLogo height={34} />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-black">
                    How Koda covers {platform.name}
                  </h2>
                  <p className="mt-2 text-black/80 leading-relaxed">
                    {platform.mpcCoverage}
                  </p>
                </div>
              </div>
            </section>

            <section className="p-6 sm:p-8 rounded-2xl bg-black text-white">
              <h2 className="text-xl sm:text-2xl font-bold">Bottom line</h2>
              <p className="mt-3 text-white/85 leading-relaxed">
                {platform.recommendation}
              </p>
              <Link
                href="/get-started"
                className="inline-flex mt-5 items-center justify-center px-5 h-11 rounded-full bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition"
              >
                Get Started
              </Link>
            </section>
          </article>

          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-black/5 bg-white p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-black/50">
                On this page
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  `What is ${platform.name}?`,
                  `How it works`,
                  `What parents need to know`,
                  `Serious risks`,
                  `Parental controls`,
                  `How Koda covers it`,
                  `Bottom line`,
                ].map((label) => (
                  <li key={label}>
                    <span className="text-black/70">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* FAQ Section */}
        {platform.faqs && platform.faqs.length > 0 && (
          <section className="mt-16">
            <SectionTitle>Frequently asked questions</SectionTitle>
            <div className="mt-6 space-y-4">
              {platform.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-black/5 bg-white"
                >
                  <summary className="cursor-pointer px-5 py-4 text-base font-semibold text-black list-none flex items-center justify-between">
                    {faq.question}
                    <ArrowRight className="w-4 h-4 text-black/40 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-4 text-sm text-black/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related guides */}
        {platform.relatedBlogSlugs && platform.relatedBlogSlugs.length > 0 && (
          <section className="mt-16">
            <SectionTitle>Related safety guides</SectionTitle>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {platform.relatedBlogSlugs
                .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
                .filter(Boolean)
                .map((post) => (
                  <Link
                    key={post!.slug}
                    href={`/blog/${post!.slug}`}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-black/5 bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-widest text-black/50">
                        {post!.category}
                      </div>
                      <div className="font-semibold text-sm text-black truncate">
                        {post!.title}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black/30 shrink-0" />
                  </Link>
                ))}
            </div>
          </section>
        )}

        <RelatedPlatforms current={platform} />
      </main>
      <SiteFooter />
    </>
  );
}
