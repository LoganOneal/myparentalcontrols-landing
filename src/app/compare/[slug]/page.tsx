import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, X, Minus, ArrowRight, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { COMPARISONS, getComparison } from "@/data/comparisons";
import { SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return { title: "Compare | Koda" };
  return {
    title: comparison.title,
    description: comparison.description,
    alternates: { canonical: `${SITE_URL}/compare/${slug}` },
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      url: `${SITE_URL}/compare/${slug}`,
      type: "website",
    },
  };
}

function CellIcon({ value }: { value: string }) {
  const lower = value.toLowerCase();
  if (lower === "yes" || lower.startsWith("yes"))
    return <Check className="w-5 h-5 text-emerald-600 shrink-0" />;
  if (lower === "no")
    return <X className="w-5 h-5 text-red-400 shrink-0" />;
  return <Minus className="w-5 h-5 text-amber-500 shrink-0" />;
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-4 py-10 sm:py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-black/60 mb-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black/80">
            Koda vs {comparison.competitorName}
          </span>
        </nav>

        {/* Hero */}
        <header className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-bold text-black tracking-tight leading-tight">
            Koda vs {comparison.competitorName}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-black/70 leading-relaxed">
            {comparison.verdict}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-6 h-12 rounded-full bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition"
            >
              Try Koda Free
            </Link>
            <Link
              href="/koda-safety"
              className="inline-flex items-center justify-center px-6 h-12 rounded-full border border-black/10 text-black font-semibold hover:bg-black/5 transition"
            >
              Learn More
            </Link>
          </div>
        </header>

        {/* Feature comparison tables */}
        <div className="mt-16 space-y-12">
          {comparison.featureGroups.map((group) => (
            <section key={group.title}>
              <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                {group.title}
              </h2>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-black/5">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-black/[0.02]">
                      <th className="px-4 py-3 text-sm font-semibold text-black/70 w-[50%]">
                        Feature
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-[#2563EB] w-[25%]">
                        Koda
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-black/70 w-[25%]">
                        {comparison.competitorName}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {group.features.map((row) => (
                      <tr key={row.feature}>
                        <td className="px-4 py-3 text-sm text-black/80">
                          {row.feature}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <CellIcon value={row.koda} />
                            <span className="text-sm text-black/70">
                              {row.koda}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <CellIcon value={row.competitor} />
                            <span className="text-sm text-black/70">
                              {row.competitor}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        {/* Choose Koda if / Choose Competitor if */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl border border-[#2563EB]/20 bg-[#F6F8FF]">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
              <h3 className="text-lg font-bold text-black">
                Choose Koda if...
              </h3>
            </div>
            <ul className="space-y-3">
              {comparison.chooseKodaIf.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-black/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl border border-black/5 bg-white">
            <h3 className="text-lg font-bold text-black mb-4">
              Choose {comparison.competitorName} if...
            </h3>
            <ul className="space-y-3">
              {comparison.chooseCompetitorIf.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Minus className="w-5 h-5 text-black/30 mt-0.5 shrink-0" />
                  <span className="text-sm text-black/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strengths sections */}
        <div className="mt-16 space-y-10">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
              Where Koda is stronger
            </h2>
            <ul className="mt-4 space-y-3">
              {comparison.kodaStrengths.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2563EB] shrink-0" />
                  <span className="text-base text-black/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
              Where {comparison.competitorName} is stronger
            </h2>
            <ul className="mt-4 space-y-3">
              {comparison.competitorStrengths.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-black/30 shrink-0" />
                  <span className="text-base text-black/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-4">
            {comparison.faqs.map((faq, i) => (
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

        {/* CTA */}
        <section className="mt-16 p-8 sm:p-12 rounded-2xl bg-black text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to protect your child while they game?
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Koda Safety monitors voice and chat inside PC games so you can see
            risks like grooming, bullying, and threats in real time.
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
