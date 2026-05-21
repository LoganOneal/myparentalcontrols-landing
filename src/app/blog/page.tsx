import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Gamepad2,
  MessageSquareWarning,
  Mic,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import postsData from "@/data/blog-posts.json";

export const metadata = {
  title: "Blog | MyParentalControls",
  description:
    "Parent-first guides, safety explainers, and app reviews from MyParentalControls.",
};

type Post = { slug: string; title: string; date: string };
type Topic = { icon: LucideIcon; label: string; description: string };

const posts = postsData as Post[];
const featuredPost = posts[0];
const editorPicks = posts.slice(1, 5);
const latestPosts = posts.slice(5);

const TOPICS: Topic[] = [
  {
    icon: Gamepad2,
    label: "Games",
    description: "What parents should know before kids join the lobby.",
  },
  {
    icon: Mic,
    label: "Voice chat",
    description: "The risky moments filters and screen-time apps miss.",
  },
  {
    icon: MessageSquareWarning,
    label: "Text alerts",
    description: "Grooming, bullying, scams, and other high-signal warnings.",
  },
  {
    icon: ShieldAlert,
    label: "Blocking",
    description: "Practical ways to lock down apps, sites, and devices.",
  },
];

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

function getPostLabel(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes(" vs ") || normalized.includes("comparison")) {
    return "Comparison";
  }
  if (normalized.includes("best") || normalized.includes("apps")) {
    return "Roundup";
  }
  if (
    normalized.startsWith("how") ||
    normalized.startsWith("why") ||
    normalized.startsWith("can") ||
    normalized.startsWith("do")
  ) {
    return "Guide";
  }
  return "Insight";
}

function getReadingTime(title: string) {
  const words = decode(title).split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.min(7, Math.round(words / 3) + 2));
}

function PostMeta({ post, inverse = false }: { post: Post; inverse?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${
        inverse ? "text-white/75" : "text-black/55"
      }`}
    >
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-4 w-4" aria-hidden />
        <time dateTime={toDateTime(post.date)}>{formatDate(post.date)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-4 w-4" aria-hidden />
        {getReadingTime(post.title)} min read
      </span>
    </div>
  );
}

function TopicBadge({ topic }: { topic: Topic }) {
  const Icon = topic.icon;
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span>
        <span className="block text-sm font-bold text-white">{topic.label}</span>
        <span className="mt-1 block text-sm leading-relaxed text-white/65">
          {topic.description}
        </span>
      </span>
    </div>
  );
}

function FeaturedPostCard({ post }: { post: Post }) {
  const title = decode(post.title);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative isolate flex min-h-[420px] overflow-hidden rounded-lg bg-[#101010] p-6 text-white shadow-[0_24px_70px_-42px_rgba(0,0,0,0.7)] sm:p-8"
    >
      <Image
        src="/images/hero-kid-gaming.webp"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="absolute inset-0 -z-20 object-cover opacity-60 transition duration-500 group-hover:scale-105"
        priority
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(16,16,16,0.15),rgba(16,16,16,0.92))]"
      />
      <div className="flex w-full flex-col justify-between">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white ring-1 ring-white/20">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Featured
        </div>

        <div>
          <div className="mb-4 inline-flex items-center rounded-full bg-[#2563EB] px-3 py-1 text-sm font-bold text-white">
            {getPostLabel(title)}
          </div>
          <h2 className="max-w-[680px] text-[30px] font-bold leading-[1.1] tracking-tight sm:text-[42px]">
            {title}
          </h2>
          <div className="mt-5">
            <PostMeta post={post} inverse />
          </div>
          <span className="mt-7 inline-flex items-center gap-2 font-bold text-white">
            Read article
            <ArrowRight
              className="h-5 w-5 transition group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CompactPostCard({ post }: { post: Post }) {
  const title = decode(post.title);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex min-h-[180px] flex-col justify-between rounded-lg border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
    >
      <div>
        <div className="inline-flex items-center rounded-full bg-[#2563EB]/10 px-2.5 py-1 text-xs font-bold text-[#2563EB]">
          {getPostLabel(title)}
        </div>
        <h3 className="mt-4 text-xl font-bold leading-tight text-black transition group-hover:text-[#1D4ED8]">
          {title}
        </h3>
      </div>
      <div className="mt-6 flex items-end justify-between gap-3">
        <PostMeta post={post} />
        <ArrowRight
          className="h-5 w-5 shrink-0 text-black/25 transition group-hover:translate-x-1 group-hover:text-[#2563EB]"
          aria-hidden
        />
      </div>
    </Link>
  );
}

function ListPostCard({ post }: { post: Post }) {
  const title = decode(post.title);

  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group grid gap-4 rounded-lg border border-black/5 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#2563EB]/25 hover:shadow-[0_12px_28px_rgba(37,99,235,0.10)] sm:grid-cols-[1fr_auto]"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-xs font-bold text-black/60">
              {getPostLabel(title)}
            </span>
            <time
              dateTime={toDateTime(post.date)}
              className="text-sm text-black/45"
            >
              {formatDate(post.date)}
            </time>
          </div>
          <h3 className="mt-3 text-lg font-bold leading-snug text-black transition group-hover:text-[#1D4ED8]">
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-between gap-3 self-end text-sm font-bold text-[#2563EB] sm:self-center">
          <span>{getReadingTime(post.title)} min</span>
          <ArrowRight
            className="h-5 w-5 transition group-hover:translate-x-1"
            aria-hidden
          />
        </div>
      </Link>
    </li>
  );
}

export default function BlogIndexPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-[#F1F2F4]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#2563EB] shadow-sm ring-1 ring-black/5">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Parent resource center
              </div>
              <h1 className="mt-5 text-[38px] font-bold leading-[1.06] tracking-tight text-[#1E1E1E] sm:text-[48px] lg:text-[56px]">
                Safer gaming starts with knowing what to look for.
              </h1>
              <p className="mt-5 max-w-[620px] text-base leading-relaxed text-black/70 sm:text-lg">
                Practical guides for the apps, games, DMs, and voice chats where
                kids spend their time. Clear signals, plain language, and next
                steps parents can actually use.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#latest"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 font-bold text-white transition hover:bg-[#1D4ED8]"
                >
                  Browse articles
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </a>
                <Link
                  href="/app-reviews"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 font-bold text-black transition hover:bg-black/[0.04]"
                >
                  App reviews
                </Link>
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[#DBEAFE] shadow-[0_26px_70px_-44px_rgba(0,0,0,0.75)] sm:min-h-[440px]">
              <Image
                src="/images/hero-mom-monitoring.png"
                alt="Parent reviewing a child safety dashboard"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]"
              />
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                <div className="rounded-full bg-white/92 px-3 py-1.5 text-sm font-bold text-[#1E1E1E] shadow-sm">
                  Weekly safety brief
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg">
                  <BookOpen className="h-5 w-5" aria-hidden />
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/94 p-4 shadow-[0_18px_38px_-24px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                    <ShieldAlert className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-black">
                      New parent guide ready
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-black/60">
                      Turn confusing safety headlines into a calmer plan for
                      tonight.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#121212] py-8 text-white">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-5 lg:grid-cols-4 lg:px-8">
            {TOPICS.map((topic) => (
              <TopicBadge key={topic.label} topic={topic} />
            ))}
          </div>
        </section>

        <section id="latest" className="scroll-mt-24 bg-[#F8F9FB] py-14 sm:py-18">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                  Latest from the blog
                </p>
                <h2 className="mt-2 text-[32px] font-bold leading-tight text-black sm:text-[42px]">
                  Read what matters before it becomes a problem.
                </h2>
              </div>
              <p className="max-w-[420px] text-base leading-relaxed text-black/60">
                A cleaner library for fast scanning: featured reads up top,
                then everything else in a dense, parent-friendly index.
              </p>
            </div>

            {featuredPost ? (
              <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
                <FeaturedPostCard post={featuredPost} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {editorPicks.map((post) => (
                    <CompactPostCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            ) : null}

            <ul className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2">
              {latestPosts.map((post) => (
                <ListPostCard key={post.slug} post={post} />
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-6 rounded-lg bg-[#F1F2F4] p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                Need the app-by-app version?
              </p>
              <h2 className="mt-2 text-2xl font-bold text-black sm:text-3xl">
                Start with the platforms your kid actually uses.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-black/65">
                Our app reviews cover real risks, built-in parental controls,
                and what MyParentalControls can monitor in each environment.
              </p>
            </div>
            <Link
              href="/app-reviews"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 font-bold text-white transition hover:bg-[#1D4ED8]"
            >
              View app reviews
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
