import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PlatformLogo } from "@/components/PlatformLogo";
import { getPlatformsByCategory, PLATFORMS } from "@/data/platforms";

export const metadata = {
  title: "Platforms We Cover | Koda",
  description:
    "Every app, game, and chat platform Koda monitors in real time — Discord, Roblox, Minecraft, Fortnite, Snapchat, TikTok, and 50+ more.",
};

const CATEGORY_ORDER: (keyof ReturnType<typeof getPlatformsByCategory>)[] = [
  "Games",
  "Chat & social",
  "Video & streaming",
  "AI companions",
  "Photo & creative",
  "Reading & community",
  "Other",
];

export default function PlatformsPage() {
  const grouped = getPlatformsByCategory();
  const totalCount = PLATFORMS.length;

  return (
    <>
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E66E8]/10 text-[#1E66E8] text-xs font-semibold">
            {totalCount} platforms covered
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-black tracking-tight">
            Every app your kid uses. One alert feed.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-black/70">
            Koda monitors conversations and activity across the
            games, chat apps, and social platforms kids actually use — and
            alerts your phone the moment something looks risky.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          {CATEGORY_ORDER.map((cat) => {
            const items = grouped[cat];
            if (!items || items.length === 0) return null;
            return (
              <section key={cat}>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-black">
                    {cat}
                  </h2>
                  <span className="text-sm text-black/50 font-medium">
                    {items.length} {items.length === 1 ? "app" : "apps"}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/platforms/${p.slug}`}
                      className="group flex items-start gap-3 p-4 rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition"
                    >
                      <PlatformLogo platform={p} size={44} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-black leading-tight truncate">
                            {p.name}
                          </div>
                          <span className="text-black/30 group-hover:text-black/70 transition">
                            →
                          </span>
                        </div>
                        <div className="text-sm text-black/60 mt-0.5 line-clamp-2">
                          {p.blurb}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-black/5 bg-[#F6F8FF] text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-black">
            Don&rsquo;t see an app your child uses?
          </h3>
          <p className="mt-2 text-black/70 max-w-xl mx-auto">
            We add new platforms every month based on what parents request.
            Tell us what to cover next.
          </p>
          <a
            href="mailto:support@myparentalcontrols.com?subject=Platform%20request"
            className="inline-flex mt-4 items-center justify-center px-5 h-11 rounded-full bg-[#1E66E8] text-white font-semibold hover:bg-[#1853BD] transition"
          >
            Request a platform
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
