import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  SearchCheck,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  BLOG_POSTS,
  getBlogPost,
  type BlogPost,
} from "@/data/blog-posts";
import {
  getEditorialContributor,
  type EditorialContributor,
} from "@/data/editorial";
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

function absoluteUrl(value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `${SITE_URL}${value}`;
}

function getReadingTime(post: BlogPost) {
  const words = [
    post.title,
    post.excerpt,
    post.quickAnswer,
    post.researchMethod,
    ...post.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...post.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...post.sources.flatMap((source) => [source.title, source.note]),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(3, Math.min(12, Math.ceil(words / 220)));
}

function getArticleBody(post: BlogPost) {
  return [
    "Direct answer",
    post.quickAnswer,
    ...post.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    "How this guide was researched",
    post.researchMethod,
    ...post.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...post.sources.flatMap((source) => [
      `${source.publisher}: ${source.title}`,
      source.note,
    ]),
  ]
    .join("\n\n");
}

function getWordCount(post: BlogPost) {
  return getArticleBody(post).split(/\s+/).filter(Boolean).length;
}

function contributorJsonLd(contributor: EditorialContributor) {
  return {
    "@type": contributor.type,
    name: contributor.name,
    url: contributor.url ? absoluteUrl(contributor.url) : SITE_URL,
    description: contributor.bio,
    sameAs: contributor.sameAs,
  };
}

function thingJsonLd(name: string) {
  return {
    "@type": "Thing",
    name,
  };
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
  const author = getEditorialContributor(post.authorId);
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | Koda`,
    description: post.description,
    keywords: [...post.about, ...post.mentions],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: toDateTime(post.date),
      modifiedTime: toDateTime(post.dateModified),
      authors: [author.name],
      tags: [...post.about, ...post.mentions],
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
  const author = getEditorialContributor(post.authorId);
  const reviewer = getEditorialContributor(post.reviewerId);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    url: postUrl,
    headline: post.title,
    description: post.description,
    image: [`${SITE_URL}/seo/opengraph.jpg`],
    datePublished: toDateTime(post.date),
    dateModified: toDateTime(post.dateModified),
    articleSection: post.category,
    articleBody: getArticleBody(post),
    wordCount: getWordCount(post),
    isAccessibleForFree: true,
    inLanguage: "en-US",
    keywords: [...post.about, ...post.mentions].join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: contributorJsonLd(author),
    reviewedBy: contributorJsonLd(reviewer),
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    about: post.about.map(thingJsonLd),
    mentions: post.mentions.map(thingJsonLd),
    citation: post.sources.map((source) => ({
      "@type": "CreativeWork",
      name: source.title,
      url: source.url,
      publisher: {
        "@type": "Organization",
        name: source.publisher,
      },
      dateModified: toDateTime(source.accessed),
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };
  const faqJsonLd =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;
  const jsonLd = faqJsonLd
    ? [articleJsonLd, breadcrumbJsonLd, faqJsonLd]
    : [articleJsonLd, breadcrumbJsonLd];

  return (
    <>
      <SiteHeader />
      <main className="bg-[#F8F9FB]">
        <JsonLd data={jsonLd} />
        <section className="bg-[#F1F2F4]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-12 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-16">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-sm font-bold text-black/55"
              >
                <Link href="/" className="transition hover:text-[#2563EB]">
                  Home
                </Link>
                <span aria-hidden>/</span>
                <Link href="/blog" className="transition hover:text-[#2563EB]">
                  Blog
                </Link>
                <span aria-hidden>/</span>
                <span className="max-w-[340px] truncate text-black/70">
                  {post.title}
                </span>
              </nav>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#1D4ED8]"
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
                    Published {formatDate(post.date)}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <SearchCheck className="h-4 w-4" aria-hidden />
                  <time dateTime={toDateTime(post.dateModified)}>
                    Updated {formatDate(post.dateModified)}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" aria-hidden />
                  {getReadingTime(post)} min read
                </span>
              </div>
              <div className="mt-5 grid max-w-[720px] gap-2 rounded-lg bg-white/70 p-4 text-sm text-black/65 ring-1 ring-black/5 sm:grid-cols-2">
                <span className="inline-flex items-start gap-2">
                  <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
                  <span>
                    <span className="block font-bold text-black">Written by</span>
                    {author.name}
                  </span>
                </span>
                <span className="inline-flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
                  <span>
                    <span className="block font-bold text-black">Reviewed by</span>
                    {reviewer.name}
                  </span>
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
            <section className="rounded-lg bg-[#F8F9FB] p-5 ring-1 ring-black/5">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                <SearchCheck className="h-4 w-4" aria-hidden />
                Direct answer
              </p>
              <p className="mt-3 text-lg font-bold leading-relaxed text-black">
                {post.quickAnswer}
              </p>
            </section>
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
              <section id="methodology">
                <h2>How this guide was researched</h2>
                <p>{post.researchMethod}</p>
              </section>
              {post.faqs.length > 0 ? (
                <section id="faq">
                  <h2>Parent questions answered</h2>
                  {post.faqs.map((faq) => (
                    <section key={faq.question}>
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </section>
                  ))}
                </section>
              ) : null}
              <section id="sources">
                <h2>Sources reviewed</h2>
                <p>
                  These are the primary references reviewed for this guide. Koda
                  links to original sources so parents and AI answer systems can
                  verify claims quickly.
                </p>
                <ol>
                  {post.sources.map((source) => (
                    <li key={source.id}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.title}
                      </a>{" "}
                      <span>
                        - {source.publisher}. Accessed{" "}
                        {formatDate(source.accessed)}. {source.note}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-lg border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                Editorial trust
              </p>
              <dl className="mt-4 grid gap-3 text-sm leading-relaxed text-black/65">
                <div>
                  <dt className="font-bold text-black">Author</dt>
                  <dd>{author.name}</dd>
                </div>
                <div>
                  <dt className="font-bold text-black">Reviewer</dt>
                  <dd>{reviewer.name}</dd>
                </div>
                <div>
                  <dt className="font-bold text-black">Last reviewed</dt>
                  <dd>{formatDate(post.lastReviewed)}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-black/55">
                {reviewer.credentials}
              </p>
            </div>

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
                Verify
              </p>
              <div className="mt-4 grid gap-2">
                <a
                  href="#methodology"
                  className="group flex items-center justify-between gap-3 rounded-md bg-[#F8F9FB] px-3 py-2.5 text-sm font-bold text-black transition hover:bg-[#DBEAFE] hover:text-[#1D4ED8]"
                >
                  Research method
                  <FileText className="h-4 w-4 shrink-0" aria-hidden />
                </a>
                <a
                  href="#sources"
                  className="group flex items-center justify-between gap-3 rounded-md bg-[#F8F9FB] px-3 py-2.5 text-sm font-bold text-black transition hover:bg-[#DBEAFE] hover:text-[#1D4ED8]"
                >
                  {post.sources.length} sources reviewed
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                </a>
                {post.faqs.length > 0 ? (
                  <a
                    href="#faq"
                    className="group flex items-center justify-between gap-3 rounded-md bg-[#F8F9FB] px-3 py-2.5 text-sm font-bold text-black transition hover:bg-[#DBEAFE] hover:text-[#1D4ED8]"
                  >
                    Parent FAQs
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </a>
                ) : null}
              </div>
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
