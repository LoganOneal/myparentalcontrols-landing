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

type Post = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  excerpt?: string;
};

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
    description: post.description ?? title,
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
                If you are comparing MyParentalControls and Bark, the short
                version is simple: Bark is a broad parental-control app for
                phones, social media, web filtering, screen time, and location.
                MyParentalControls is built for families whose biggest concern
                is what happens inside PC games: game chat, voice, alerts, and
                evidence parents can use for a real conversation.
              </p>

              <h2>Quick verdict</h2>
              <p>
                Choose Bark if you want a general-purpose monitoring layer for
                mobile devices, social apps, web access, location, and screen
                time. Choose MyParentalControls if your child spends serious
                time on a gaming PC and you need visibility into Roblox,
                Discord, Fortnite, Minecraft, and other game environments where
                voice and chat risk can happen fast.
              </p>

              <div className="my-8 overflow-hidden rounded-lg border border-black/10">
                <div className="grid grid-cols-3 bg-[#121212] text-sm font-bold text-white">
                  <div className="p-3">Feature</div>
                  <div className="p-3">MyParentalControls</div>
                  <div className="p-3">Bark</div>
                </div>
                {[
                  {
                    feature: "Primary focus",
                    mpc: "PC games, gaming chat, voice risk, device activity, and high-signal safety alerts.",
                    bark: "Broad phone, social media, email, YouTube, screen time, web filtering, and location controls.",
                  },
                  {
                    feature: "Best fit",
                    mpc: "Parents worried about what happens during live gameplay and in-game conversations.",
                    bark: "Parents who want wide coverage across phones, tablets, social apps, and web activity.",
                  },
                  {
                    feature: "Gaming angle",
                    mpc: "Built around PC gaming visibility and the places generic parental controls miss.",
                    bark: "Useful for broader digital safety, but its public feature language is not centered on PC in-game voice monitoring.",
                  },
                  {
                    feature: "Alert workflow",
                    mpc: "Real-time gaming alerts with context parents can act on quickly.",
                    bark: "Alerts parents when monitored content or activity triggers a concern.",
                  },
                ].map((row) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-1 border-t border-black/10 text-sm sm:grid-cols-3"
                  >
                    <div className="bg-black/[0.03] p-3 font-bold text-black">
                      {row.feature}
                    </div>
                    <div className="p-3 text-black/75">{row.mpc}</div>
                    <div className="p-3 text-black/75">{row.bark}</div>
                  </div>
                ))}
              </div>

              <h2>Where Bark is strong</h2>
              <p>
                Bark is a well-known parental-control product with a broad
                safety footprint. Bark says its app can monitor texts, email,
                YouTube, and 30+ apps and platforms, and Bark also offers screen
                time, web filtering, app and site blocking, and location-related
                features. Bark Home extends filtering and screen-time controls
                to internet-connected devices in the home.
              </p>
              <p>
                That makes Bark a sensible comparison if your main question is
                whether a single tool can help across mobile devices, social
                media, web access, and general online activity.
              </p>

              <h2>Where MyParentalControls is different</h2>
              <p>
                MyParentalControls starts from a different parent problem:
                games are where kids hang out, and game environments are where
                many parental-control tools lose visibility. Web filters can
                block a site. Screen-time apps can limit a device. But parents
                often need to know what happened inside the game, who said what,
                whether voice chat turned risky, and whether a pattern is
                forming.
              </p>
              <p>
                That is the gap MyParentalControls is designed to close. The
                product is built for the PC games children actually play, with
                real-time alerts and a parent dashboard focused on gaming risk
                instead of another generic app list.
              </p>

              <h2>Choose MyParentalControls if</h2>
              <ul>
                <li>Your child plays PC games with open chat or voice chat.</li>
                <li>You worry about Roblox, Discord, Fortnite, Minecraft, Steam, or similar gaming communities.</li>
                <li>You want alerts that are specific to gaming behavior, not just general web or social activity.</li>
                <li>You need enough context to talk with your child about what actually happened.</li>
              </ul>

              <h2>Choose Bark if</h2>
              <ul>
                <li>You want broad monitoring across phones, tablets, email, YouTube, and social apps.</li>
                <li>Your main concern is web filtering, screen-time schedules, or location check-ins.</li>
                <li>Your child spends more time on mobile social apps than on PC games.</li>
                <li>You prefer a general family-safety app over a gaming-first tool.</li>
              </ul>

              <h2>The bottom line</h2>
              <p>
                Bark and MyParentalControls solve different versions of the
                same parent worry. Bark is broad. MyParentalControls is
                specialized. If the risk you care about most happens on a phone
                or across social accounts, Bark deserves a look. If the risk
                you care about most happens while your child is playing PC
                games, MyParentalControls is the sharper fit.
              </p>
            </div>
          </article>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-lg bg-[#121212] p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#60A5FA]">
                Best fit
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight">
                Pick the tool around the risk.
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/72">
                <p>
                  Bark is strongest as broad family-safety coverage for mobile,
                  social, web, and location.
                </p>
                <p>
                  MyParentalControls is strongest when PC gaming chat and voice
                  activity are the concern.
                </p>
              </div>
              <Link
                href="/get-started"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-5 text-sm font-bold text-white transition hover:bg-[#1D4ED8]"
              >
                Get Started
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
