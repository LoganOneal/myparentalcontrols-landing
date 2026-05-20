"use client";

import { useEffect, useRef, useState } from "react";
import { GamesScreenMock } from "@/components/home/GamesScreenMock";
import { DevicesScreenMock } from "@/components/home/DevicesScreenMock";
import { AIScannerScreenMock } from "@/components/home/AIScannerScreenMock";
import { EvidenceScreenMock } from "@/components/home/EvidenceScreenMock";
import { BlocksScreenMock } from "@/components/home/BlocksScreenMock";

/**
 * "Get alerts for dangers — online and in real life"
 *
 * Layout cloned from bark.us /bark-app/ (white card, 8px corners, 15px outer
 * gutter, 1280px inner container with 60px desktop padding, centered headline
 * + subtitle). Replaces the bark static phone with an interactive carousel:
 * left column rotates through four feature screens, right column has four
 * clickable cards that pin the active feature on click.
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
  const [imgOpacity, setImgOpacity] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function selectFeature(index: number) {
    setImgOpacity(0);
    setTimeout(() => {
      setActiveIndex(index);
      setImgOpacity(1);
    }, 150);
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setImgOpacity(0);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % FEATURES.length);
        setImgOpacity(1);
      }, 150);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function resetInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setImgOpacity(0);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % FEATURES.length);
        setImgOpacity(1);
      }, 150);
    }, 5000);
  }

  return (
    <section className="px-[15px] mt-[15px]">
      <div className="bg-white rounded-lg py-10 mx-auto max-w-[1395px]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-[60px]">
          <h2
            className="text-center text-[30px] sm:text-4xl lg:text-[46px]"
            style={{
              fontFamily:
                '"Moderat-Black", var(--font-bricolage), sans-serif',
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

          {/* Desktop-only 60px spacer matching bark's wp-block-spacer.mobile-hidden */}
          <div aria-hidden className="hidden sm:block h-[60px]" />

          <div className="mt-10 sm:mt-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative mx-auto lg:mx-0 flex flex-col items-center gap-6 lg:ml-auto">
              {(() => {
                const mockClass =
                  "w-[320px] sm:w-[380px] lg:w-[440px] transition-opacity duration-300 ease-in-out";
                const mockStyle = { opacity: imgOpacity };
                if (activeIndex === 0) return <GamesScreenMock className={mockClass} style={mockStyle} />;
                if (activeIndex === 1) return <DevicesScreenMock className={mockClass} style={mockStyle} />;
                if (activeIndex === 2) return <AIScannerScreenMock className={mockClass} style={mockStyle} />;
                if (activeIndex === 3) return <EvidenceScreenMock className={mockClass} style={mockStyle} />;
                return <BlocksScreenMock className={mockClass} style={mockStyle} />;
              })()}
              <div className="flex items-center justify-center gap-2 mt-2">
                {FEATURES.map((f, i) => (
                  <button
                    key={f.title}
                    type="button"
                    aria-label={`Show feature: ${f.title}`}
                    onClick={() => {
                      selectFeature(i);
                      resetInterval();
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === activeIndex ? "bg-[#2563EB]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {FEATURES.map((f, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={f.title}
                    type="button"
                    onClick={() => {
                      selectFeature(i);
                      resetInterval();
                    }}
                    className={`text-left cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                      active
                        ? "border-[#2563EB] bg-[#EFF6FF] lg:scale-[1.02]"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-[rgb(30,30,30)]">
                      {f.title}
                    </h3>
                    <p
                      className="text-sm sm:text-base"
                      style={{ color: "rgb(68, 68, 68)", lineHeight: 1.5 }}
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
    </section>
  );
}
