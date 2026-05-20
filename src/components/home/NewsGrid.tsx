"use client";

import Link from "next/link";
import { useRef } from "react";

/**
 * News & lawsuits coverage about Roblox / Discord child-safety issues.
 *
 * Horizontal snap-scroll carousel: cards lined up in one row, native
 * scroll on touch devices, prev/next buttons on desktop. Drop a screenshot
 * into public/images/news/<filename>.png and set `screenshot` on the entry
 * to swap it in.
 */

type NewsItem = {
  source: string;
  sourceColor?: string;
  headline: string;
  date: string;
  href: string;
  screenshot?: string;
};

const ITEMS: NewsItem[] = [
  {
    source: "CBS News",
    sourceColor: "#0033A0",
    headline:
      "Oklahoma becomes latest state to sue Roblox over child safety concerns",
    date: "2024",
    href: "https://www.cbsnews.com/news/oklahoma-becomes-latest-state-to-sue-roblox-over-child-safety-concerns/",
    screenshot: "cbs-oklahoma.png",
  },
  {
    source: "Associated Press",
    sourceColor: "#FF322E",
    headline:
      "Roblox reaches $12M settlement with Nevada to expand youth protections",
    date: "2025",
    href: "https://apnews.com/article/roblox-nevada-settlement-28b3d7d7a483dc28462a7504b67c9bbc",
    screenshot: "ap-nevada.png",
  },
  {
    source: "BBC News",
    sourceColor: "#BB1919",
    headline:
      "Texas sues Roblox, alleging it put 'paedophiles and profits' over safety",
    date: "Nov 2025",
    href: "https://www.bbc.co.uk/news/articles/cy0kd4kk0kqo",
    screenshot: "bbc-texas.png",
  },
  {
    source: "NPR",
    sourceColor: "#E70033",
    headline:
      "Roblox bets on facial scanning to keep its youngest users safe",
    date: "Nov 2025",
    href: "https://www.npr.org/2025/11/21/nx-s1-5614161/roblox-bets-on-facial-scanning-to-keep-its-youngest-users-safe",
    screenshot: "npr-facial-scanning.png",
  },
  {
    source: "NBC News",
    sourceColor: "#0A6EBD",
    headline:
      "Nebraska becomes the latest state to sue Roblox over child safety failures",
    date: "2025",
    href: "https://www.nbcnews.com/tech/tech-news/roblox-lawsuit-nebraska-attorney-general-what-to-know-rcna261733",
    screenshot: "nbc-nebraska.png",
  },
  {
    source: "CNN",
    sourceColor: "#CC0000",
    headline:
      "Louisiana sues Roblox, alleging the gaming site fails to protect children",
    date: "Aug 2025",
    href: "https://www.cnn.com/2025/08/15/us/louisiana-roblox-lawsuit-child-protection-hnk",
    screenshot: "cnn-louisiana.png",
  },
];

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={item.href}
      aria-label={`${item.source}: ${item.headline}`}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="snap-start shrink-0 w-[340px] sm:w-[440px] lg:w-[500px] rounded-2xl overflow-hidden bg-white border border-gray-200/80 hover:border-gray-300 transition-colors group block"
    >
      <div className="aspect-[4/3] bg-gray-50 relative border-b border-gray-200/80">
        {item.screenshot ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`/images/news/${item.screenshot}`}
            alt={item.headline}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-center">
              <div
                className="inline-block text-white text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full"
                style={{ background: item.sourceColor ?? "#1E1A24" }}
              >
                {item.source}
              </div>
              <p className="mt-3 text-gray-400 text-xs">Article screenshot</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em]">
          <span
            className="font-bold"
            style={{ color: item.sourceColor ?? "#1E1A24" }}
          >
            {item.source}
          </span>
          <span className="text-gray-300" aria-hidden>
            •
          </span>
          <span className="text-gray-500 font-medium">{item.date}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug line-clamp-3 group-hover:text-black transition-colors">
          {item.headline}
        </h3>
      </div>
    </Link>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === "left" ? "left-3 sm:left-6 lg:left-10" : "right-3 sm:right-6 lg:right-10"
      } z-10 w-12 h-12 rounded-full bg-white/95 backdrop-blur border border-gray-200 hover:bg-white hover:border-gray-300 transition items-center justify-center text-gray-900 hidden md:flex`}
    >
      <span aria-hidden className="text-2xl leading-none -mt-0.5">
        {direction === "left" ? "‹" : "›"}
      </span>
    </button>
  );
}

export function NewsGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("a");
    const cardWidth = firstCard?.offsetWidth ?? 360;
    el.scrollBy({ left: direction * (cardWidth + 24), behavior: "smooth" });
  }

  return (
    <>
      <div className="text-center sm:mt-52 mt-24 px-4 max-w-3xl mx-auto">
        <h2
          className="text-3xl sm:text-[48px] leading-tight"
          style={{
            fontFamily: "Moderat-Black, sans-serif",
            fontWeight: 700,
          }}
        >
          Why parents are taking Roblox to court 📰
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-700">
          State attorneys general, regulators, and families are filing
          lawsuits against the platforms where predators target kids.
          Don&rsquo;t wait for the next headline to be about your family.
        </p>
      </div>

      {/* Full-bleed carousel — spans the entire viewport width */}
      <div className="relative w-full mt-12 sm:mt-16">
        <ArrowButton direction="left" onClick={() => scrollByCard(-1)} />
        <ArrowButton direction="right" onClick={() => scrollByCard(1)} />
        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 px-4 sm:px-8 lg:px-16 no-scrollbar"
        >
          {ITEMS.map((item) => (
            <NewsCard key={item.headline} item={item} />
          ))}
          {/* Trailing spacer so the last card has breathing room past the edge */}
          <span aria-hidden className="shrink-0 w-4" />
        </div>
      </div>

    </>
  );
}
