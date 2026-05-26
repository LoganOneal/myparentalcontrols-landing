"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type FeatureCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

const CARDS: FeatureCard[] = [
  {
    title: "A daily safety snapshot at a glance.",
    description:
      "Start with Lily's risk status, wellbeing score, recent trends, and monitored activity in one calm view.",
    image: "/images/app-ui-screenshots/insights-overview.png",
    alt: "Koda Insights screen showing Lily's safety score, trends, and recent activity",
  },
  {
    title: "Live monitoring where kids actually talk.",
    description:
      "See Roblox, Minecraft, Discord, Fortnite, and voice chats as they happen, including the places most filters miss.",
    image: "/images/app-ui-screenshots/activity-live-monitoring.png",
    alt: "Koda Activity screen showing live monitoring across games and chat apps",
  },
  {
    title: "Alerts ranked by what needs attention.",
    description:
      "Critical contact risks, inappropriate language, resolved reviews, and auto-blocking all stay organized by urgency.",
    image: "/images/app-ui-screenshots/alerts-suspicious-contact.png",
    alt: "Koda Alerts screen showing suspicious contact, inappropriate language, and resolved alerts",
  },
  {
    title: "Evidence review with the full context.",
    description:
      "Open the screen recording, chat excerpts, platform, timestamp, and AI pattern summary before you decide what to do next.",
    image: "/images/app-ui-screenshots/evidence-review.png",
    alt: "Koda Evidence Review screen showing recorded Minecraft gameplay and flagged chat messages",
  },
  {
    title: "Gaming time patterns, not just totals.",
    description:
      "Late-night sessions, bedtime misses, and top games make it clear when play is becoming a pattern.",
    image: "/images/app-ui-screenshots/gaming-time.png",
    alt: "Koda Gaming Time screen showing late-night sessions and top games",
  },
];

const VISIBLE_CARDS = 3;
const CARD_GAP = 24;

export function DigitalWellbeing() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const totalPages = Math.ceil(CARDS.length / VISIBLE_CARDS);

  const updateCardWidth = useCallback(() => {
    if (!trackRef.current) return;
    const containerWidth = trackRef.current.parentElement?.clientWidth ?? 0;
    const w = (containerWidth - CARD_GAP * (VISIBLE_CARDS - 1)) / VISIBLE_CARDS;
    setCardWidth(w);
  }, []);

  useEffect(() => {
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, [updateCardWidth]);

  const translateX = page * (cardWidth + CARD_GAP) * VISIBLE_CARDS;

  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  return (
    <section className="bg-white px-5 py-10 md:px-20 md:py-16">
      <div className="mx-auto max-w-[1192px]">
        {/* Top row: heading + arrows */}
        <div className="mb-10 flex items-end justify-between md:mb-12">
          <div className="flex flex-col gap-4 max-w-[576px]">
            <h2
              className="text-[28px] md:text-[44px] leading-[1.15] tracking-[-0.02em] text-[rgb(30,30,30)]"
              style={{ fontFamily: "Moderat-Black, var(--font-archivo-black), sans-serif", fontWeight: 700 }}
            >
              Koda sees what every other parental control misses.
            </h2>
            <p className="text-[15px] md:text-[17px] leading-[1.6] text-[rgb(68,68,68)]">
              The real danger isn&rsquo;t the game. It&rsquo;s the conversation
              happening inside it. Koda helps parents spot risks in chats, DMs,
              and voice calls before they turn into abuse.
            </p>
          </div>

          {/* Nav arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => canGoPrev && setPage(page - 1)}
              disabled={!canGoPrev}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-all hover:border-[var(--koda-bear-blue)]/40 hover:shadow-sm cursor-pointer"
              style={{ opacity: canGoPrev ? 1 : 0.4 }}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => canGoNext && setPage(page + 1)}
              disabled={!canGoNext}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-all hover:border-[var(--koda-bear-blue)]/40 hover:shadow-sm cursor-pointer"
              style={{ opacity: canGoNext ? 1 : 0.4 }}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-visible relative">
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${translateX}px)`,
              gap: `${CARD_GAP}px`,
            }}
          >
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="flex-shrink-0 flex flex-col"
                style={{ width: cardWidth > 0 ? `${cardWidth}px` : `calc(33.3333% - 16px)` }}
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 px-2 mt-4">
                  <h3
                    className="text-[17px] md:text-[20px] leading-[1.25] text-[rgb(30,30,30)] font-bold"
                    style={{ fontFamily: "Moderat-Black, var(--font-archivo-black), sans-serif" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.6] text-[rgb(80,80,80)]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="mt-10 flex justify-center items-center gap-2 md:mt-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === page
                  ? "w-7 h-2.5 bg-[var(--koda-bear-blue)]"
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
