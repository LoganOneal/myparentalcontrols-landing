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
 * Two distinct experiences gated by viewport size:
 *
 *   • Desktop (lg+): vertical scroll-lock. Section runway is FEATURES.length
 *     × 100vh tall, with a sticky inner viewport pinning the phone + cards.
 *     Page scroll progress drives `activeIndex` 1:1. Bottom-of-viewport
 *     animated mouse + step counter + progress bar tells users to keep
 *     scrolling.
 *
 *   • Mobile (< lg): horizontal scroll-snap carousel. Each panel pairs the
 *     phone mockup (scaled to 280px wide so it fits any modern phone) with
 *     its matching feature title + description. Swiping left/right
 *     advances; an IntersectionObserver on the panels updates activeIndex
 *     based on whichever panel is centered. Tap a dot to smooth-scroll to
 *     that panel.
 */

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
    title: "Block any app, any site, on every device — in one tap.",
    description:
      "Roblox at 2 AM? Tap and gone. Discord during school hours? Pre-scheduled. The same dashboard that watches everything also locks it down — instantly, on every device.",
  },
];

/** Renders the right mock for a given index. Extracted so desktop + mobile
 *  branches don't duplicate the switch. `bare=true` renders without the
 *  iPhone X bezel (used on mobile where the bezel adds redundant chrome
 *  and the lib's content-box padding breaks layout). */
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

export function AlertsForDangers() {
  const [activeIndex, setActiveIndex] = useState(0);
  /** Continuous scroll progress through the runway (0–1). Drives the
   *  desktop progress bar so the user gets continuous feedback as they
   *  scroll, not just discrete card flips. */
  const [scrollProgress, setScrollProgress] = useState(0);
  /** Live-tracked `(min-width: 1024px)` via useSyncExternalStore — keeps the
   *  desktop/mobile branch reactive (scroll-driven on lg+, swipe-driven
   *  below) and lets us conditionally render the desktop bottom cue
   *  without tripping the react-hooks set-state-in-effect rule. */
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
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobilePanelRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    // Mobile: observe panels within the horizontal scroll container. The
    // panel with the largest intersection ratio (i.e. the one currently
    // snapped into view) wins.
    if (!mobileScrollRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number(
            visible[0].target.getAttribute("data-feature-idx"),
          );
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      {
        root: mobileScrollRef.current,
        threshold: [0.5, 0.75, 1],
      },
    );
    mobilePanelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isDesktop]);

  /** Pin a feature and bring it into view in whichever layout is active. */
  function handleSelect(idx: number) {
    setActiveIndex(idx);
    if (isDesktop && runwayRef.current) {
      const rect = runwayRef.current.getBoundingClientRect();
      const runwayHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = runwayHeight - viewportHeight;
      if (scrollableDistance > 0) {
        const targetProgress = (idx + 0.5) / FEATURES.length;
        const target =
          rect.top + window.scrollY + targetProgress * scrollableDistance;
        window.scrollTo({ top: target, behavior: "smooth" });
      }
      return;
    }
    // Mobile: smooth-scroll the matching panel to the horizontal center
    // of the carousel.
    mobilePanelRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  return (
    <section className="px-[15px] mt-[15px]">
      {/* No overflow-hidden — it would create a new scroll container and
          break position:sticky on the inner desktop element. */}
      <div className="bg-white rounded-lg">
        {/* Section header — always rendered, sits above both layouts. */}
        <div className="mx-auto max-w-[1280px] px-4 sm:px-[60px] pt-10 pb-6 lg:pb-0">
          <h2
            className="text-center text-[30px] sm:text-4xl lg:text-[46px]"
            style={{
              fontFamily: "Moderat-Black, sans-serif",
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

        {/* DESKTOP — scroll-locked runway with sticky phone + cards. */}
        <div className="hidden lg:block">
          <div ref={runwayRef} className="lg:h-[500vh]">
            {/* Sticky inner — pins to viewport top on lg+. Flex column so the
                main content takes all available space and the scroll cue
                docks to the bottom of the viewport. */}
            <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col pt-4 pb-2">
              <div className="flex-1 flex items-center min-h-0">
                <div className="mx-auto max-w-[1280px] px-4 sm:px-[60px] w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="flex justify-center lg:justify-end">
                      {/* All 5 mocks render into the same grid cell and we
                          cross-fade by toggling opacity per activeIndex.
                          Avoids the hard unmount/mount that made the
                          previous version pop. `pointer-events-none` on
                          inactive layers prevents stray click targets. */}
                      <div className="relative grid isolate">
                        {/* Soft tinted glow behind the phone — anchors it
                            in space and reads premium. -z-10 keeps it below
                            the bezel; pointer-events-none keeps it inert. */}
                        <div
                          aria-hidden
                          className="absolute -inset-10 -z-10 pointer-events-none rounded-[48%]"
                          style={{
                            background:
                              "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(37,99,235,0.22), rgba(37,99,235,0.05) 55%, transparent 75%)",
                            filter: "blur(8px)",
                          }}
                        />
                        {FEATURES.map((_, i) => (
                          <div
                            key={i}
                            className="col-start-1 row-start-1 transition-opacity duration-500 ease-in-out"
                            style={{
                              opacity: i === activeIndex ? 1 : 0,
                              pointerEvents:
                                i === activeIndex ? "auto" : "none",
                            }}
                            aria-hidden={i !== activeIndex}
                          >
                            {renderMock(i)}
                          </div>
                        ))}
                      </div>
                    </div>

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
                              style={{
                                color: "rgb(68, 68, 68)",
                                lineHeight: 1.45,
                              }}
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

              {/* Bottom scroll affordance — desktop only. */}
              <div
                aria-hidden
                className="flex flex-col items-center gap-2.5 pt-2 transition-opacity duration-300"
                style={{ opacity: scrollProgress >= 0.93 ? 0 : 1 }}
              >
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

        {/* MOBILE — horizontal scroll-snap carousel. Each panel pairs the
            scaled phone with its matching feature title + description. */}
        <div className="lg:hidden">
          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                ref={(el) => {
                  mobilePanelRefs.current[i] = el;
                }}
                data-feature-idx={i}
                className="w-full shrink-0 snap-center flex flex-col items-center gap-5 pt-2 pb-6 px-4"
              >
                {/* Bare phone (no iPhone X bezel on mobile). The mock
                    renders inside a plain rounded card with iPhone aspect
                    ratio — solves the bezel-layout overlap bug while
                    keeping each panel's phone-shaped silhouette. */}
                <div className="w-[280px] max-w-full">
                  {renderMock(i, "", true)}
                </div>

                {/* Feature text — title + description, centered. No card
                    border on mobile since the panel IS the card. */}
                <div className="text-center max-w-[420px] px-2">
                  <h3
                    className="text-lg font-bold mb-2 text-[rgb(30,30,30)]"
                    style={{ lineHeight: 1.3 }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgb(68, 68, 68)", lineHeight: 1.5 }}
                  >
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots — tap to smooth-scroll to that panel. */}
          <div className="flex justify-center gap-2 pb-10">
            {FEATURES.map((f, i) => (
              <button
                key={f.title}
                type="button"
                aria-label={`Show feature: ${f.title}`}
                onClick={() => handleSelect(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === activeIndex
                    ? "bg-[#2563EB]"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
