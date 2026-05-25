"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type InsightCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

const CARDS: InsightCard[] = [
  {
    title: "Identify trends and patterns",
    description:
      "View trends in your kid’s online routines, including shifts from their baseline of social interactions, daytime activity, or sleep habits, to help you spot meaningful changes in their wellbeing.",
    image: "/images/insights/trends-patterns.webp",
    alt: "Image of the online data removal feature in app",
  },
  {
    title: "Daytime and nighttime activity",
    description:
      "Gain a clear and personalized view of your kid’s online usage patterns throughout the day and overnight, making it easier to understand behaviors that impact healthy habits or might interfere with their sleep.",
    image: "/images/insights/daytime-nighttime.webp",
    alt: "Man with headphones on relaxing in a chair and browsing his laptop",
  },
  {
    title: "Social interactions",
    description:
      "Get insight into your kid’s social behavior patterns, including their engagement style and the volume and tone of their online interactions. Uncover their unique social persona based on their social patterns.",
    image: "/images/insights/social-interactions.webp",
    alt: "Image of a phone with a notification from Aura verifying a call",
  },
  {
    title: "Personalized insights",
    description:
      "Access science-backed recommendations, tips, and conversation starters based on your kid’s daytime and nighttime activity and their unique social persona.",
    image: "/images/insights/personalized-insights.webp",
    alt: "Person walking behind a fluted glass window",
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
    <section className="px-5 md:px-20 py-16 md:py-32 bg-[#f0eae2]">
      <div className="mx-auto max-w-[1192px]">
        {/* Top row: heading + arrows */}
        <div className="flex items-end justify-between mb-16">
          <div className="flex flex-col gap-4 max-w-[576px]">
            <h2
              className="text-[28px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.02em] text-[#161616]"
              style={{ fontFamily: '"Basel grotesk", sans-serif' }}
            >
              Get deeper insights into your child&rsquo;s digital wellbeing
            </h2>
            <p
              className="text-[16px] md:text-[18px] leading-[1.3] text-[rgb(77,77,77)]"
              style={{ fontFamily: '"Basel grotesk", sans-serif' }}
            >
              Kids are navigating a digital world with real risks. Aura Parents
              helps you understand if your kids are happy, healthy, and safe
              online and enables you to help them build healthier digital habits
              and online balance.
            </p>
          </div>

          {/* Nav arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => canGoPrev && setPage(page - 1)}
              disabled={!canGoPrev}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity"
              style={{ opacity: canGoPrev ? 1 : 0.4 }}
              aria-label="Previous"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  opacity="0.2"
                  cx="20"
                  cy="20"
                  r="20"
                  fill="#161616"
                />
                <path
                  d="M18.9088 15.1562C19.1692 14.8959 19.5913 14.8959 19.8516 15.1562C20.112 15.4165 20.112 15.8387 19.8516 16.099L16.2753 19.6754L25.3802 19.6754C25.7484 19.6754 26.0469 19.9738 26.0469 20.342C26.0469 20.7102 25.7484 21.0087 25.3802 21.0087L16.276 21.0087L19.8516 24.5843C20.112 24.8446 20.112 25.2668 19.8516 25.5271C19.5913 25.7874 19.1692 25.7874 18.9088 25.5271L14.1948 20.8131C13.9344 20.5527 13.9344 20.1306 14.1948 19.8702L18.9088 15.1562Z"
                  fill="#161616"
                />
              </svg>
            </button>
            <button
              onClick={() => canGoNext && setPage(page + 1)}
              disabled={!canGoNext}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity"
              style={{ opacity: canGoNext ? 1 : 0.4 }}
              aria-label="Next"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  opacity="0.2"
                  cx="20"
                  cy="20"
                  r="20"
                  transform="matrix(-1 0 0 1 40 0)"
                  fill="#161616"
                />
                <path
                  d="M21.0912 15.1562C20.8308 14.8959 20.4087 14.8959 20.1484 15.1562C19.888 15.4165 19.888 15.8387 20.1484 16.099L23.7247 19.6754L14.6198 19.6754C14.2516 19.6754 13.9531 19.9738 13.9531 20.342C13.9531 20.7102 14.2516 21.0087 14.6198 21.0087L23.724 21.0087L20.1484 24.5843C19.888 24.8446 19.888 25.2668 20.1484 25.5271C20.4087 25.7874 20.8308 25.7874 21.0912 25.5271L25.8052 20.8131C26.0656 20.5527 26.0656 20.1306 25.8052 19.8702L21.0912 15.1562Z"
                  fill="#161616"
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
                <div className="relative w-full overflow-hidden rounded-3xl" style={{ aspectRatio: "270/371" }}>
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
                    className="text-[20px] md:text-[24px] leading-[1.33] text-[rgb(22,22,22)]"
                    style={{ fontFamily: '"Basel grotesk book", "Basel grotesk", sans-serif' }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[16px] md:text-[18px] leading-[1.3] text-[rgb(77,77,77)]"
                    style={{ fontFamily: '"Basel grotesk", sans-serif' }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-2 mt-16">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="w-2 h-2 rounded-full transition-colors"
              style={{
                backgroundColor: i === page ? "rgb(22, 22, 22)" : "rgba(22, 22, 22, 0.25)",
              }}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
