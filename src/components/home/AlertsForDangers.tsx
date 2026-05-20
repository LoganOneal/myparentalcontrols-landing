"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GamesScreenMock } from "@/components/home/GamesScreenMock";
import { DevicesScreenMock } from "@/components/home/DevicesScreenMock";
import { AIScannerScreenMock } from "@/components/home/AIScannerScreenMock";
import { EvidenceScreenMock } from "@/components/home/EvidenceScreenMock";
import { BlocksScreenMock } from "@/components/home/BlocksScreenMock";

/**
 * "Get alerts for dangers — online and in real life"
 *
 * Outer card cloned from bark.us /bark-app/. The interactive part is a
 * scroll-locked feature carousel: the section itself is FEATURES.length ×
 * 100vh tall (the "runway"), with a sticky inner viewport that pins the
 * phone + cards in place. As the user scrolls down the runway, their scroll
 * progress maps 1:1 to which feature is active — so they have to scroll
 * past all five before the page can continue.
 *
 * Mobile / tablet doesn't get the scroll-lock (sticky + giant runway feels
 * cramped on small screens) — it falls back to a 5-second auto-rotate.
 */

type Feature = {
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    title:
      "Inside Roblox, Minecraft, and Fortnite — where every other parental control goes blind",
    description:
      "Most grooming starts inside the games kids actually play. Network filters and screen-time apps can't see those chats. MyParentalControls runs inside the game itself, reading every party invite, voice call, and DM in real time.",
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
    title: "Receipts. So you know exactly what happened.",
    description:
      "We log every minute played, capture every chat, transcribe voice calls, and start screen-recording the moment a flag is raised. When you sit down to talk with your kid, you don't bluff — you have the timeline.",
  },
  {
    title: "Block any app, any site, on every device — in one tap.",
    description:
      "Roblox at 2 AM? Tap and gone. Discord during school hours? Pre-scheduled. The same dashboard that watches everything also locks it down — instantly, on every device.",
  },
];

export function AlertsForDangers() {
  const [activeIndex, setActiveIndex] = useState(0);
  /** Continuous scroll progress through the runway (0–1). Drives the
   *  horizontal progress bar so the user gets continuous feedback as they
   *  scroll, not just discrete card flips. */
  const [scrollProgress, setScrollProgress] = useState(0);
  /** Live-tracked `(min-width: 1024px)` via useSyncExternalStore — keeps the
   *  desktop/mobile branch reactive (scroll-driven on lg+, auto-rotate below)
   *  and lets us conditionally render the "Scroll to see more" cue without
   *  tripping the react-hooks set-state-in-effect rule. */
  const isDesktop = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
  const runwayRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /** Map current window scroll position to the feature index by computing
   *  progress through the runway. Called on every scroll event (passive). */
  function syncIndexToScroll() {
    if (!runwayRef.current) return;
    const rect = runwayRef.current.getBoundingClientRect();
    const runwayHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const scrolledIntoRunway = -rect.top;
    const scrollableDistance = runwayHeight - viewportHeight;
    if (scrollableDistance <= 0) return;
    const progress = Math.max(
      0,
      Math.min(1, scrolledIntoRunway / scrollableDistance),
    );
    setScrollProgress(progress);
    const idx = Math.min(
      FEATURES.length - 1,
      Math.floor(progress * FEATURES.length),
    );
    setActiveIndex(idx);
  }

  useEffect(() => {
    if (isDesktop) {
      window.addEventListener("scroll", syncIndexToScroll, { passive: true });
      syncIndexToScroll();
      return () => window.removeEventListener("scroll", syncIndexToScroll);
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % FEATURES.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isDesktop]);

  /** Click handler — pins the chosen feature and (on desktop) scrolls the
   *  window to the position within the runway that corresponds to it, so
   *  the sticky inner re-syncs naturally. */
  function handleSelect(idx: number) {
    setActiveIndex(idx);
    if (isDesktop && runwayRef.current) {
      const rect = runwayRef.current.getBoundingClientRect();
      const runwayHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = runwayHeight - viewportHeight;
      if (scrollableDistance > 0) {
        // Center of the slice that maps to this index
        const targetProgress = (idx + 0.5) / FEATURES.length;
        const target =
          rect.top + window.scrollY + targetProgress * scrollableDistance;
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((i) => (i + 1) % FEATURES.length);
      }, 5000);
    }
  }

  return (
    <section className="px-[15px] mt-[15px]">
      {/* No overflow-hidden — it would create a new scroll container and
          break position:sticky on the inner element. */}
      <div className="bg-white rounded-lg">
        {/* Section header — scrolls naturally above the runway. */}
        <div className="mx-auto max-w-[1280px] px-4 sm:px-[60px] pt-10 pb-6 lg:pb-0">
          <h2
            className="text-center text-[30px] sm:text-4xl lg:text-[46px]"
            style={{
              fontFamily:
                "Moderat-Black, sans-serif",
              fontWeight: 700,
              color: "rgb(30, 30, 30)",
              lineHeight: 1.2,
            }}
          >
            Get alerts for dangers — online and in real life
          </h2>

          <div className="mt-7 text-center">
            <p
              className="mx-auto max-w-[800px] px-5 text-base sm:text-lg"
              style={{ color: "rgb(68, 68, 68)", lineHeight: 1.5 }}
            >
              Our award-winning parental control app scans for dangers like
              predators, suicidal ideation, violence, and more. You&rsquo;ll
              get notified if there&rsquo;s something wrong.
            </p>
          </div>
        </div>

        {/* Scroll runway — desktop only. Mobile sees a normal-flow stacked
            layout where the inner content sits below the header. */}
        <div ref={runwayRef} className="lg:h-[500vh]">
          {/* Sticky inner — pins to viewport top on lg+. Flex column so the
              main content takes all available space and the scroll cue
              docks to the bottom of the viewport. */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col pt-4 pb-2">
            {/* Main content — phone left, cards right, vertically centered
                in the remaining space above the bottom cue. */}
            <div className="flex-1 flex items-center min-h-0">
              <div className="mx-auto max-w-[1280px] px-4 sm:px-[60px] w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Phone column — just the phone, no affordance underneath. */}
                  <div className="flex justify-center lg:justify-end">
                    {(() => {
                      const mockClass =
                        "transition-opacity duration-200 ease-in-out";
                      if (activeIndex === 0) return <GamesScreenMock className={mockClass} />;
                      if (activeIndex === 1) return <DevicesScreenMock className={mockClass} />;
                      if (activeIndex === 2) return <AIScannerScreenMock className={mockClass} />;
                      if (activeIndex === 3) return <EvidenceScreenMock className={mockClass} />;
                      return <BlocksScreenMock className={mockClass} />;
                    })()}
                  </div>

                  {/* Cards column — tight stack, all visible at once. */}
                  <div className="flex flex-col gap-3 lg:gap-4">
                    {FEATURES.map((f, i) => {
                      const active = i === activeIndex;
                      return (
                        <button
                          key={f.title}
                          type="button"
                          onClick={() => handleSelect(i)}
                          className={`w-full text-left cursor-pointer p-5 lg:p-6 rounded-2xl border transition-all duration-300 ${
                            active
                              ? "border-[#2563EB] bg-[#EFF6FF] lg:scale-[1.02]"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <h3 className="text-base lg:text-lg font-bold mb-1.5 text-[rgb(30,30,30)]">
                            {f.title}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: "rgb(68, 68, 68)", lineHeight: 1.45 }}
                          >
                            {f.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom scroll affordance — only renders inside the sticky on
                lg+. Animated mouse-wheel SVG + step counter + continuous
                progress bar. Sits at the bottom of the viewport while the
                section is scroll-locked. Fades out as the user reaches the
                last feature so they know the lock is about to release. */}
            <div
              aria-hidden
              className="hidden lg:flex flex-col items-center gap-2.5 pt-2 transition-opacity duration-300"
              style={{ opacity: scrollProgress >= 0.93 ? 0 : 1 }}
            >
              {/* Animated mouse-scroll icon — dot rolls from top to bottom
                  inside the mouse outline on a 1.5s loop. */}
              <svg
                width="24"
                height="38"
                viewBox="0 0 24 38"
                fill="none"
                aria-hidden
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="34"
                  rx="10"
                  stroke="#2563EB"
                  strokeWidth="2"
                />
                <circle cx="12" cy="10" r="2.5" fill="#2563EB">
                  <animate
                    attributeName="cy"
                    values="10;24"
                    keyTimes="0;1"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0"
                    keyTimes="0;0.6;1"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              <div className="flex items-center gap-2.5">
                <span
                  className="text-[11px] font-bold uppercase tracking-[1.8px]"
                  style={{ color: "rgb(30, 30, 30)" }}
                >
                  Scroll to continue
                </span>
                <span
                  className="text-[11px] font-bold tabular-nums px-2 py-0.5 rounded-full"
                  style={{ background: "#EFF6FF", color: "#1D4ED8" }}
                >
                  {activeIndex + 1} / {FEATURES.length}
                </span>
              </div>

              {/* Continuous progress bar — fills with the actual scroll
                  position, not just discrete index changes. */}
              <div
                className="w-[280px] h-1 rounded-full overflow-hidden"
                style={{ background: "#E5E7EB" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.round(scrollProgress * 100)}%`,
                    background: "#2563EB",
                    transition: "width 80ms linear",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
