import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  BLOG_POSTS,
  getBlogPost,
  type BlogPost,
} from "@/data/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

function parseDate(value: string) {
  const [month, day, year] = value.split("/").map(Number);
  if (!month || !day || !year) return null;
  return new Date(Date.UTC(year, month - 1, day));
}

function formatDate(value: string) {
  const date = parseDate(value);
  if (!date) return value;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function toDateTime(value: string) {
  const date = parseDate(value);
  if (!date) return undefined;
  return date.toISOString().slice(0, 10);
}

function getReadingTime(post: BlogPost) {
  const words = [
    post.title,
    post.excerpt,
    ...post.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(3, Math.min(12, Math.ceil(words / 220)));
}

function getArticleBody(post: BlogPost) {
  return post.sections
    .flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ])
    .join("\n\n");
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Blog | Koda" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | Koda`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: toDateTime(post.date),
      images: [
        {
          url: "/seo/opengraph.jpg",
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/seo/opengraph.jpg"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${postUrl}#article`,
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}/seo/opengraph.jpg`,
    datePublished: toDateTime(post.date),
    dateModified: toDateTime(post.date),
    articleSection: post.category,
    articleBody: getArticleBody(post),
    mainEntityOfPage: postUrl,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-[#F8F9FB]">
        <JsonLd data={articleJsonLd} />
        <section className="bg-[#F1F2F4]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-12 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-16">
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#1D4ED8]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back to blog
              </Link>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#2563EB] shadow-sm ring-1 ring-black/5">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                {post.category}
              </div>
              <h1 className="mt-5 max-w-[780px] text-[36px] font-bold leading-[1.08] tracking-tight text-[#1E1E1E] sm:text-[48px]">
                {post.title}
              </h1>
              <p className="mt-5 max-w-[720px] text-base leading-relaxed text-black/68 sm:text-lg">
                {post.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-black/55">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  <time dateTime={toDateTime(post.date)}>
                    {formatDate(post.date)}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" aria-hidden />
                  {getReadingTime(post)} min read
                </span>
              </div>
            </div>

            <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-[#111111] shadow-[0_26px_70px_-44px_rgba(0,0,0,0.75)] sm:min-h-[380px]">
              <Image
                src="/images/hero-kid-gaming.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover opacity-75"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.62))]"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/94 p-4 shadow-[0_18px_38px_-24px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                    <BookOpen className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-black">Koda guide</p>
                    <p className="mt-0.5 text-sm leading-snug text-black/60">
                      Parent-first guidance for gaming and online safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:py-16">
          <article className="rounded-lg bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-8">
            <div className="prose-cal max-w-none">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-lg bg-[#121212] p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#60A5FA]">
                Key takeaways
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/72">
                {post.takeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-2">
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#60A5FA]"
                      aria-hidden
                    />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/koda-safety"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-5 text-sm font-bold text-white transition hover:bg-[#1D4ED8]"
              >
                Koda Safety
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="rounded-lg border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                Related
              </p>
              <div className="mt-4 grid gap-2">
                {post.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between gap-3 rounded-md bg-[#F8F9FB] px-3 py-2.5 text-sm font-bold text-black transition hover:bg-[#DBEAFE] hover:text-[#1D4ED8]"
                  >
                    {link.label}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
