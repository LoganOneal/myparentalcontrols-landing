"use client";

import { useEffect, useRef, useState } from "react";
import { GamesScreenMock } from "@/components/home/GamesScreenMock";
import { DevicesScreenMock } from "@/components/home/DevicesScreenMock";
import { AIScannerScreenMock } from "@/components/home/AIScannerScreenMock";
import { EvidenceScreenMock } from "@/components/home/EvidenceScreenMock";
import { BlocksScreenMock } from "@/components/home/BlocksScreenMock";

type Feature = {
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    title: "Receipts. So you know exactly what happened.",
    description:
      "We log every minute played, capture every chat, transcribe voice calls, and start screen-recording the moment a flag is raised. When you sit down to talk with your kid, you don't bluff — you have the timeline.",
  },
  {
    title:
      "Inside the games where other parental controls go blind",
    description:
      "Most grooming starts inside the games kids actually play. Network filters and screen-time apps can't see those chats. Koda runs inside the game itself, reading every party invite, voice call, and DM in real time.",
  },
  {
    title: "One dashboard. Every device your child uses.",
    description:
      "Lily's PC, the family iMac, her iPhone 14 — every device your child touches reports to a single dashboard on your phone. No gaps, no apps to switch between, no device we can't see.",
  },
  {
    title: "AI that only pings you when something is actually wrong",
    description:
      "Our AI reads tens of thousands of messages a week per child — and stays silent until it sees a real threat. Grooming language, sextortion, suicidal ideation. One alert that matters, not fifty you'd ignore.",
  },
  {
    title: "Block any app, any site, on every device — in one tap.",
    description:
      "Roblox at 2 AM? Tap and gone. Discord during school hours? Pre-scheduled. The same dashboard that watches everything also locks it down — instantly, on every device.",
  },
];

function renderMock(idx: number, className = "", bare = false) {
  if (idx === 0)
    return <EvidenceScreenMock className={className} bare={bare} />;
  if (idx === 1)
    return <GamesScreenMock className={className} bare={bare} />;
  if (idx === 2)
    return <DevicesScreenMock className={className} bare={bare} />;
  if (idx === 3)
    return <AIScannerScreenMock className={className} bare={bare} />;
  return <BlocksScreenMock className={className} bare={bare} />;
}

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AlertsForDangers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number(visible[0].target.getAttribute("data-feature-idx"));
          if (!Number.isNaN(idx)) setActiveIdx(idx);
        }
      },
      { root: container, threshold: [0.5, 0.75, 1] },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollToCard(idx: number) {
    cardRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  function goPrev() {
    const next = Math.max(0, activeIdx - 1);
    scrollToCard(next);
  }

  function goNext() {
    const next = Math.min(FEATURES.length - 1, activeIdx + 1);
    scrollToCard(next);
  }

  return (
    <section className="px-[15px] mt-[15px]">
      <div className="bg-white rounded-lg">
        {/* Section header */}
        <div className="mx-auto max-w-[1280px] px-4 sm:px-[60px] pt-12 sm:pt-16 pb-2">
          <h2
            className="text-center text-[28px] sm:text-[36px] lg:text-[44px] max-w-[900px] mx-auto"
            style={{
              fontFamily: "Moderat-Black, sans-serif",
              fontWeight: 700,
              color: "rgb(30, 30, 30)",
              lineHeight: 1.15,
            }}
          >
            Koda sees what every other parental control misses.
          </h2>

          <p
            className="mx-auto max-w-[720px] mt-5 text-center text-[15px] sm:text-[17px]"
            style={{ color: "rgb(68, 68, 68)", lineHeight: 1.6 }}
          >
            The real danger isn&rsquo;t the game. It&rsquo;s the conversation
            happening inside it. Koda helps parents spot risks in chats,
            DMs, and voice calls before they turn into abuse.
          </p>

          {/* Paired navigation arrows */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous feature"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-[var(--koda-bear-blue)] hover:border-[var(--koda-bear-blue)]/40 hover:shadow-sm transition-all cursor-pointer"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next feature"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-[var(--koda-bear-blue)] hover:border-[var(--koda-bear-blue)]/40 hover:shadow-sm transition-all cursor-pointer"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Horizontal scroll carousel — left-aligned with content, overflows right to show peek */}
        <div className="pb-12 pt-8 overflow-hidden">
          <div className="mx-auto max-w-[1280px]">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth gap-5 lg:gap-7 pl-4 sm:pl-8 lg:pl-[60px] pr-4 sm:pr-8 lg:pr-0"
            >
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  data-feature-idx={i}
                  className="snap-start shrink-0 w-[78vw] sm:w-[55vw] lg:w-[420px]"
                >
                  <div
                    className="rounded-2xl overflow-hidden h-full flex flex-col"
                    style={{
                      background: "#ffffff",
                      boxShadow: "0 2px 24px 0 rgba(0,0,0,0.06)",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Phone mockup area */}
                    <div
                      className="flex items-center justify-center px-6 sm:px-8 py-8 sm:py-10"
                      style={{
                        background:
                          "linear-gradient(145deg, #f4f7ff 0%, #edf2fe 60%, #f7f9ff 100%)",
                        minHeight: "340px",
                      }}
                    >
                      <div className="w-full max-w-[280px]">
                        {renderMock(i, "", false)}
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="px-6 sm:px-7 py-6 sm:py-7 flex-1 flex flex-col">
                      <h3
                        className="text-[17px] sm:text-[19px] lg:text-[20px] font-bold mb-3"
                        style={{
                          fontFamily: "Moderat-Black, sans-serif",
                          color: "rgb(30, 30, 30)",
                          lineHeight: 1.25,
                        }}
                      >
                        {f.title}
                      </h3>
                      <p
                        className="text-[13px] sm:text-[14px] lg:text-[15px] flex-1"
                        style={{ color: "rgb(80, 80, 80)", lineHeight: 1.6 }}
                      >
                        {f.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Right spacer so last card doesn't hit edge */}
              <div className="shrink-0 w-4 sm:w-8 lg:w-[60px]" aria-hidden />
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center items-center gap-2 pt-8">
            {FEATURES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show feature ${i + 1}`}
                onClick={() => scrollToCard(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIdx
                    ? "w-7 h-2.5 bg-[var(--koda-bear-blue)]"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
