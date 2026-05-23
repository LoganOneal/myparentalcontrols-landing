import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Clock3, ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TUTORIALS, getTutorial } from "@/data/tutorials";
import { SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return TUTORIALS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) return { title: "Tutorial | Koda" };
  return {
    title: `${tutorial.title} | Koda`,
    description: tutorial.description,
    alternates: { canonical: `${SITE_URL}/tutorials/${slug}` },
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      url: `${SITE_URL}/tutorials/${slug}`,
      type: "article",
    },
  };
}

const DIFFICULTY_STYLES = {
  Easy: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Medium: { bg: "bg-amber-50", text: "text-amber-700" },
  Hard: { bg: "bg-red-50", text: "text-red-700" },
};

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) notFound();

  const style = DIFFICULTY_STYLES[tutorial.difficulty];

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tutorial.title,
    description: tutorial.description,
    totalTime: `PT${tutorial.timeMinutes}M`,
    step: tutorial.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.instruction,
      text: step.detail || step.instruction,
    })),
  };

  return (
    <>
      <JsonLd data={howToJsonLd} />
      <SiteHeader />
      <main className="max-w-screen-lg mx-auto px-4 py-10 sm:py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-black/60 mb-6">
          <Link href="/tutorials" className="hover:underline">
            Tutorials
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black/80">{tutorial.platform}</span>
        </nav>

        {/* Hero */}
        <header>
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
            >
              {tutorial.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-black/50">
              <Clock3 className="w-4 h-4" />
              {tutorial.timeMinutes} minutes
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight leading-tight">
            {tutorial.title}
          </h1>
          <p className="mt-3 text-lg text-black/70 leading-relaxed max-w-2xl">
            {tutorial.description}
          </p>
        </header>

        {/* Steps */}
        <section className="mt-12">
          <ol className="space-y-4">
            {tutorial.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 p-5 rounded-2xl border border-black/5 bg-white"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2563EB] text-white text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-black">
                    {step.instruction}
                  </p>
                  {step.detail && (
                    <p className="mt-1.5 text-sm text-black/60 leading-relaxed">
                      {step.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Why it matters */}
        <section className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FFF7F7] border border-red-100">
          <h2 className="text-lg font-bold text-black">Why this matters</h2>
          <p className="mt-2 text-base text-black/70 leading-relaxed">
            {tutorial.whyItMatters}
          </p>
        </section>

        {/* Koda tip */}
        <section className="mt-6 p-6 sm:p-8 rounded-2xl border border-[#2563EB]/20 bg-[#F6F8FF]">
          <h2 className="text-lg font-bold text-black">
            How Koda Safety helps beyond settings
          </h2>
          <p className="mt-2 text-base text-black/70 leading-relaxed">
            {tutorial.kodaTip}
          </p>
          <Link
            href="/get-started"
            className="inline-flex mt-4 items-center justify-center px-5 h-10 rounded-full bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition"
          >
            Try Koda Free
            <ArrowRight className="ml-2 w-3.5 h-3.5" />
          </Link>
        </section>

        {/* Related platform */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={`/platforms/${tutorial.platformSlug}`}
            className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-black/10 text-sm font-semibold text-black hover:bg-black/5 transition"
          >
            {tutorial.platform} safety guide
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-black/10 text-sm font-semibold text-black hover:bg-black/5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All tutorials
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
