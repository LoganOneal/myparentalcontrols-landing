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
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import postsData from "@/data/blog-posts.json";

type Post = { slug: string; title: string; date: string };

const posts = postsData as Post[];

function decode(html: string) {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

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

function getReadingTime(title: string) {
  const words = decode(title).split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.min(7, Math.round(words / 3) + 2));
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return { title: "Blog | MyParentalControls" };
  const title = decode(post.title);
  return {
    title: `${title} | MyParentalControls`,
    description: title,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const title = decode(post.title);
  const related = posts.filter((item) => item.slug !== slug).slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="bg-[#F8F9FB]">
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
                Parent resource
              </div>
              <h1 className="mt-5 max-w-[780px] text-[36px] font-bold leading-[1.08] tracking-tight text-[#1E1E1E] sm:text-[48px]">
                {title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-black/55">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  <time dateTime={toDateTime(post.date)}>
                    {formatDate(post.date)}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" aria-hidden />
                  {getReadingTime(post.title)} min read
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
                    <p className="text-sm font-bold text-black">
                      MyParentalControls guide
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-black/60">
                      Built for quick scanning before a deeper family
                      conversation.
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
              <p className="text-lg leading-relaxed text-black/75">
                This resource is part of the MyParentalControls blog refresh.
                The article frame is ready for long-form copy, with a calmer
                layout that matches the landing page and keeps parents focused
                on the next useful step.
              </p>

              <h2>What parents can take from this</h2>
              <ul>
                <li>Read the signal first, then decide whether to restrict, block, or talk.</li>
                <li>Look for repeat behavior across games, chats, and devices.</li>
                <li>Keep the conversation specific: what happened, when it happened, and what changes now.</li>
              </ul>

              <h2>How MyParentalControls helps</h2>
              <p>
                MyParentalControls watches the places generic parental controls
                miss: in-game text, voice chat, device activity, and app usage.
                When something risky appears, parents get a clearer alert feed
                instead of another dashboard to decode.
              </p>
            </div>
          </article>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-lg bg-[#121212] p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#60A5FA]">
                Related reads
              </p>
              <div className="mt-4 grid gap-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group rounded-lg bg-white/8 p-4 transition hover:bg-white/12"
                  >
                    <p className="text-sm font-bold leading-snug text-white">
                      {decode(item.title)}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#60A5FA]">
                      Read next
                      <ArrowRight
                        className="h-4 w-4 transition group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
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
