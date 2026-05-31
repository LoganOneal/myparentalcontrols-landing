"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import type { FunnelAnswers, FunnelOption } from "@/types/funnel";

const GENERIC_GAME_IDS = ["other-pc-games", "not-sure"];
const GENERIC_COMM_IDS = ["mostly-alone", "not-sure"];

const COMM_LABELS: Record<string, string> = {
  "voice-chat": "voice chats",
  "text-chat": "text chats",
  "direct-messages": "DMs",
  "group-chats": "group chats",
  "video-screen": "video calls",
};

function formatList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function getGameNames(answers: FunnelAnswers, gameOptions: FunnelOption[]): string {
  const selected = answers["online-spaces"] ?? [];
  const specific = gameOptions
    .filter((opt) => selected.includes(opt.id) && !GENERIC_GAME_IDS.includes(opt.id))
    .map((opt) => opt.label);

  if (specific.length === 0) return "all your child's PC and Mac apps";
  const hasGeneric = selected.some((id) => GENERIC_GAME_IDS.includes(id));
  if (hasGeneric) return `${formatList(specific)} and other apps`;
  return formatList(specific);
}

function getCommNames(answers: FunnelAnswers): string {
  const selected = answers["communication"] ?? [];
  const specific = selected
    .filter((id) => !GENERIC_COMM_IDS.includes(id))
    .map((id) => COMM_LABELS[id] ?? id);

  if (specific.length === 0) return "all communication channels";
  const hasGeneric = selected.some((id) => GENERIC_COMM_IDS.includes(id));
  if (hasGeneric) return `${formatList(specific)} and more`;
  return formatList(specific);
}

type SlideTemplate = {
  id: string;
  image: string;
  title: (games: string, comms: string) => string;
  description: (games: string, comms: string) => string;
};

const SLIDE_TEMPLATES: SlideTemplate[] = [
  {
    id: "evidence-review",
    image: "/images/app-ui-screenshots/evidence-review.png",
    title: () => "See exactly what happened — with proof.",
    description: (games, comms) =>
      `When something risky happens in ${games}, you get the screen recording, chat transcript, and AI analysis — not just a vague alert.`,
  },
  {
    id: "live-monitoring",
    image: "/images/app-ui-screenshots/activity-live-monitoring.png",
    title: (games) => `Live monitoring across ${games}.`,
    description: (_games, comms) =>
      `See real-time activity including ${comms} — the places most parental controls can't reach.`,
  },
  {
    id: "alerts",
    image: "/images/app-ui-screenshots/alerts-suspicious-contact.png",
    title: () => "Alerts ranked by what needs your attention.",
    description: (_games, comms) =>
      `Koda scans ${comms} for grooming patterns, inappropriate content, and suspicious contacts — then ranks by urgency so you know what to check first.`,
  },
  {
    id: "gaming-time",
    image: "/images/app-ui-screenshots/gaming-time.png",
    title: () => "Gaming time patterns, not just totals.",
    description: (games) =>
      `See late-night sessions, bedtime misses, and exactly how long your child spends in ${games} — broken down by day.`,
  },
  {
    id: "insights",
    image: "/images/app-ui-screenshots/insights-overview.png",
    title: () => "A daily safety snapshot at a glance.",
    description: () =>
      `Start your day with risk status, wellbeing score, and recent trends — one calm view instead of scattered notifications.`,
  },
];

export function StepProductShowcase({
  answers,
  gameOptions,
  brandColor,
  onNext,
}: {
  answers: FunnelAnswers;
  gameOptions: FunnelOption[];
  brandColor: string;
  onNext: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [maxSeen, setMaxSeen] = useState(0);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);

  const games = getGameNames(answers, gameOptions);
  const comms = getCommNames(answers);
  const hasSeenAll = maxSeen >= SLIDE_TEMPLATES.length - 1;

  const goToSlide = (index: number) => {
    setCurrent(index);
    if (index > maxSeen) setMaxSeen(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchDelta.current < -50 && current < SLIDE_TEMPLATES.length - 1) {
      goToSlide(current + 1);
    } else if (touchDelta.current > 50 && current > 0) {
      goToSlide(current - 1);
    }
  };

  const slide = SLIDE_TEMPLATES[current];

  return (
    <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-5 sm:mb-6 text-center">
        <h1 className="text-[22px] sm:text-[26px] font-bold leading-[1.2] tracking-tight text-gray-900">
          How Koda protects your child
        </h1>
      </div>

      <div
        className="relative mb-4 sm:mb-5 overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {SLIDE_TEMPLATES.map((s) => (
            <div key={s.id} className="w-full flex-shrink-0">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#06b6d4]">
                <Image
                  src={s.image}
                  alt={s.title(games, comms)}
                  fill
                  className="object-contain p-3 sm:p-6"
                  sizes="(max-width: 520px) 100vw, 520px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 mb-3">
        {SLIDE_TEMPLATES.map((s, index) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="h-2 rounded-full transition-all duration-200"
            style={{
              width: index === current ? 24 : 8,
              backgroundColor: index === current ? brandColor : "#d1d5db",
            }}
          />
        ))}
      </div>

      <div className="mb-4 text-center">
        <h2 className="text-[17px] sm:text-[20px] font-bold text-gray-900 leading-tight mb-1.5">
          {slide.title(games, comms)}
        </h2>
        <p className="text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">
          {slide.description(games, comms)}
        </p>
      </div>

      <div className="mt-auto">
        {hasSeenAll ? (
          <button
            type="button"
            onClick={onNext}
            className="w-full h-14 rounded-full text-[17px] font-bold text-white transition-all duration-200"
            style={{ backgroundColor: brandColor }}
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={() => goToSlide(current + 1)}
            className="w-full h-14 rounded-full text-[17px] font-bold text-white transition-all duration-200"
            style={{ backgroundColor: brandColor }}
          >
            Next
          </button>
        )}
        {!hasSeenAll && (
          <p className="mt-1.5 text-center text-[12px] text-gray-400">
            {current + 1} of {SLIDE_TEMPLATES.length}
          </p>
        )}
      </div>
    </div>
  );
}
