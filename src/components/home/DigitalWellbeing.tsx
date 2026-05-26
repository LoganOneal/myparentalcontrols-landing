"use client";

import {
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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

const DESKTOP_VISIBLE_CARDS = 3;
const DESKTOP_CARD_GAP = 24;
const MOBILE_CARD_GAP = 16;
const MOBILE_CARD_WIDTH_RATIO = 0.66;
const MOBILE_CARD_MAX_WIDTH = 255;

export function DigitalWellbeing() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const [page, setPage] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardGap, setCardGap] = useState(DESKTOP_CARD_GAP);
  const [cardsPerPage, setCardsPerPage] = useState(DESKTOP_VISIBLE_CARDS);
  const [isMouseDragging, setIsMouseDragging] = useState(false);
  const totalPages = Math.ceil(CARDS.length / cardsPerPage);

  const updateCardWidth = useCallback(() => {
    if (!trackRef.current) return;
    const containerWidth = trackRef.current.parentElement?.clientWidth ?? 0;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const nextGap = isMobile ? MOBILE_CARD_GAP : DESKTOP_CARD_GAP;
    const nextCardsPerPage = isMobile ? 1 : DESKTOP_VISIBLE_CARDS;
    const nextCardWidth = isMobile
      ? Math.min(MOBILE_CARD_MAX_WIDTH, containerWidth * MOBILE_CARD_WIDTH_RATIO)
      : (containerWidth - nextGap * (DESKTOP_VISIBLE_CARDS - 1)) /
        DESKTOP_VISIBLE_CARDS;

    setCardGap(nextGap);
    setCardsPerPage(nextCardsPerPage);
    setCardWidth(nextCardWidth);
  }, []);

  const scrollToPage = useCallback(
    (nextPage: number) => {
      if (!trackRef.current) return;
      const clampedPage = Math.max(0, Math.min(totalPages - 1, nextPage));
      const left = clampedPage * (cardWidth + cardGap) * cardsPerPage;
      trackRef.current.scrollTo({ left, behavior: "smooth" });
      setPage(clampedPage);
    },
    [cardGap, cardWidth, cardsPerPage, totalPages],
  );

  const updateActivePage = useCallback(() => {
    if (!trackRef.current || cardWidth <= 0) return;
    const pageWidth = (cardWidth + cardGap) * cardsPerPage;
    const nextPage = Math.round(trackRef.current.scrollLeft / pageWidth);
    setPage(Math.max(0, Math.min(totalPages - 1, nextPage)));
  }, [cardGap, cardWidth, cardsPerPage, totalPages]);

  useEffect(() => {
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, [updateCardWidth]);

  const activePage = Math.min(page, totalPages - 1);

  const canGoPrev = activePage > 0;
  const canGoNext = activePage < totalPages - 1;

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0 || !trackRef.current) {
      return;
    }

    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = trackRef.current.scrollLeft;
    setIsMouseDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isMouseDragging || event.pointerType !== "mouse" || !trackRef.current) {
      return;
    }

    event.preventDefault();
    const deltaX = event.clientX - dragStartXRef.current;
    trackRef.current.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (!isMouseDragging || event.pointerType !== "mouse") return;

    setIsMouseDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

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
              onClick={() => scrollToPage(activePage - 1)}
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
              onClick={() => scrollToPage(activePage + 1)}
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
        <div className="relative -mr-5 w-[calc(100%+20px)] overflow-hidden md:mr-0 md:w-full md:overflow-visible">
          <div
            ref={trackRef}
            onScroll={updateActivePage}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onPointerLeave={handlePointerEnd}
            className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth select-none ${
              isMouseDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ gap: `${cardGap}px` }}
          >
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="snap-start flex-shrink-0 flex flex-col w-[66vw] max-w-[255px] md:w-[calc(33.3333%-16px)] md:max-w-none"
                style={{ width: cardWidth > 0 ? `${cardWidth}px` : undefined }}
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    draggable={false}
                    className="object-cover"
                    sizes="(max-width: 767px) 66vw, 33vw"
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
              onClick={() => scrollToPage(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === activePage
                  ? "w-7 h-2.5 bg-[var(--koda-bear-blue)]"
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === activePage ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
