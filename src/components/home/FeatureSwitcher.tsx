"use client";

import { useEffect, useRef, useState } from "react";

type Feature = {
  title: string;
  description: string;
  image: string;
};

// TODO: replace shared mpc-app-preview.png with four per-feature screenshots
// (alert toast, platform-coverage screen, flagged-event timeline, captured-DM
// detail) once design assets land in public/images/features/.
const FEATURES: Feature[] = [
  {
    title: "Real-time alerts the moment a predator makes contact",
    description:
      "MyParentalControls watches Roblox, Discord, Minecraft, Fortnite, and 40+ other chats running on your child's PC. The instant grooming language, a Discord invite from a stranger, or a request to “go private” appears, you get a push notification on your phone — not a weekly digest.",
    image: "/images/mpc-app-preview.png",
  },
  {
    title: "Coverage across 40+ apps, games, and chat platforms",
    description:
      "One install monitors every app your kid actually uses — TikTok, Snapchat, Instagram, Character.AI, ChatGPT, BeReal, Discord, and dozens more. See the full list of monitored platforms and what we watch for on each.",
    image: "/images/mpc-app-preview.png",
  },
  {
    title: "Catches self-harm, sexual content, and bullying — not just predators",
    description:
      "The same AI that flags grooming also flags suicide and self-harm conversations, sexting, sextortion, and pile-on bullying. You see what your child is going through before it becomes a crisis.",
    image: "/images/mpc-app-preview.png",
  },
  {
    title: "Sees encrypted and disappearing messages on the device",
    description:
      "End-to-end encrypted Messenger, vanishing Snaps, and disappearing Instagram DMs all bypass platform-level parental dashboards. MyParentalControls reads them on the endpoint, so encryption isn't a blind spot.",
    image: "/images/mpc-app-preview.png",
  },
];

export function FeatureSwitcher() {
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
    <section className="py-16 lg:py-24 px-4">
      <h2 className="text-center text-3xl sm:text-4xl lg:text-[48px] font-medium mb-12 lg:mb-16 mt-36">
        What does MyParentalControls include?
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
        <div className="relative mx-auto lg:mx-0 flex flex-col items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FEATURES[activeIndex].image}
            alt={`${FEATURES[activeIndex].title} preview`}
            className="w-[300px] lg:w-[350px] h-auto transition-opacity duration-300 ease-in-out mx-auto"
            style={{ opacity: imgOpacity }}
          />
          <div className="flex items-center justify-center gap-2 mt-4">
            {FEATURES.map((f, i) => (
              <button
                key={f.title}
                type="button"
                aria-label={`Go to feature: ${f.title}`}
                onClick={() => {
                  selectFeature(i);
                  resetInterval();
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {FEATURES.map((f, i) => {
            const active = i === activeIndex;
            return (
              <div
                key={f.title}
                onClick={() => {
                  selectFeature(i);
                  resetInterval();
                }}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                  active
                    ? "scale-105 border-black bg-gray-100"
                    : "border-gray-200 bg-white"
                }`}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
