"use client";

import { useEffect, useRef, useState } from "react";
import { AlertsScreenMock } from "@/components/home/AlertsScreenMock";
import { PlatformsScreenMock } from "@/components/home/PlatformsScreenMock";
import { CategoriesScreenMock } from "@/components/home/CategoriesScreenMock";
import { CapturedScreenMock } from "@/components/home/CapturedScreenMock";

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
  image: string;
};

const FEATURES: Feature[] = [
  {
    title: "Real-time alerts the moment a predator makes contact",
    description:
      "MyParentalControls watches Roblox, Discord, Minecraft, Fortnite, and 40+ other chats running on your child's PC. The instant grooming language, a Discord invite from a stranger, or a request to “go private” appears, you get a push notification on your phone — not a weekly digest.",
    image: "/images/features/alerts.svg",
  },
  {
    title: "Coverage across 40+ apps, games, and chat platforms",
    description:
      "One install monitors every app your kid actually uses — TikTok, Snapchat, Instagram, Character.AI, ChatGPT, BeReal, Discord, and dozens more. See the full list of monitored platforms and what we watch for on each.",
    image: "/images/features/platforms.svg",
  },
  {
    title:
      "Catches self-harm, sexual content, and bullying — not just predators",
    description:
      "The same AI that flags grooming also flags suicide and self-harm conversations, sexting, sextortion, and pile-on bullying. You see what your child is going through before it becomes a crisis.",
    image: "/images/features/categories.svg",
  },
  {
    title: "Sees encrypted and disappearing messages on the device",
    description:
      "End-to-end encrypted Messenger, vanishing Snaps, and disappearing Instagram DMs all bypass platform-level parental dashboards. MyParentalControls reads them on the endpoint, so encryption isn't a blind spot.",
    image: "/images/features/captured.svg",
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
                  "w-[305px] sm:w-[350px] transition-opacity duration-300 ease-in-out";
                const mockStyle = { opacity: imgOpacity };
                if (activeIndex === 0) return <AlertsScreenMock className={mockClass} style={mockStyle} />;
                if (activeIndex === 1) return <PlatformsScreenMock className={mockClass} style={mockStyle} />;
                if (activeIndex === 2) return <CategoriesScreenMock className={mockClass} style={mockStyle} />;
                return <CapturedScreenMock className={mockClass} style={mockStyle} />;
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
                      i === activeIndex ? "bg-[#14B8A6]" : "bg-gray-300"
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
                        ? "border-[#14B8A6] bg-[#F0FDFA] lg:scale-[1.02]"
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
