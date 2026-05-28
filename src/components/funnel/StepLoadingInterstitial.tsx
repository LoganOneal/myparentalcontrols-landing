"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { StarIcon } from "@/components/icons";

const ANALYSIS_ROWS = [
  {
    label: "Mapping game coverage",
    detail: "Checking PC games, platforms, and play patterns",
    offset: 28,
  },
  {
    label: "Reviewing chat signals",
    detail: "Voice, text, direct messages, group chats, and screen sharing",
    offset: 12,
  },
  {
    label: "Checking gameplay context",
    detail: "Looking at what happened around each session",
    offset: -8,
  },
  {
    label: "Building parent alerts",
    detail: "Prioritizing moments that may need attention",
    offset: -24,
  },
];

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 100);
}

function getRowProgress(progress: number, offset: number) {
  return clamp(Math.round(progress + offset));
}

export function StepLoadingInterstitial({
  title,
  messages = [],
  duration = 4000,
  brandColor,
  onComplete,
}: {
  title: string;
  messages?: string[];
  duration?: number;
  brandColor: string;
  onComplete: () => void;
}) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = duration / Math.max(messages.length, 1);
    const tick = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= messages.length - 1) return prev;
        return prev + 1;
      });
    }, messageInterval);

    const progressStep = duration / 50;
    const progressTick = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, progressStep);

    const timeout = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearInterval(tick);
      clearInterval(progressTick);
      clearTimeout(timeout);
    };
  }, [duration, messages.length, onComplete]);

  return (
    <div className="flex flex-1 flex-col animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="mb-6 text-center">
        <div
          className="mx-auto mb-3 h-1.5 w-16 overflow-hidden rounded-full"
          style={{ backgroundColor: `${brandColor}18` }}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%`, backgroundColor: brandColor }}
          />
        </div>
        <h1 className="text-[28px] font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-[32px]">
          Personalizing your plan...
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-gray-500">
          {messages[messageIndex] ?? title}
        </p>
      </div>

      <div className="space-y-4">
        {ANALYSIS_ROWS.map((row) => {
          const rowProgress = getRowProgress(progress, row.offset);
          const complete = rowProgress >= 100;

          return (
            <div key={row.label}>
              <div className="mb-1.5 flex items-end justify-between gap-3">
                <div>
                  <div className="text-[15px] font-extrabold leading-tight text-gray-900">
                    {row.label}
                  </div>
                  <div className="mt-0.5 text-[11px] font-medium leading-tight text-gray-400">
                    {row.detail}
                  </div>
                </div>
                <div className="flex min-w-[52px] items-center justify-end gap-1.5">
                  <span className="text-[13px] font-black tabular-nums text-gray-900">
                    {rowProgress}%
                  </span>
                  {complete ? (
                    <Check className="h-4 w-4 text-emerald-500" aria-hidden />
                  ) : (
                    <LoaderCircle
                      className="h-4 w-4 animate-spin text-gray-300"
                      aria-hidden
                    />
                  )}
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#7dd3fc_0%,#60a5fa_48%,#2563eb_100%)] transition-all duration-300 ease-out"
                  style={{ width: `${rowProgress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 overflow-hidden rounded-[26px] bg-[#101827] shadow-[0_24px_60px_-38px_rgba(15,23,42,0.9)]">
        <div className="relative h-[168px] overflow-hidden">
          <Image
            src="/images/parents/parent6.jpg"
            alt="Parent helping child at a computer"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 520px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,39,0)_18%,rgba(16,24,39,0.96)_100%)]" />
        </div>

        <div className="relative -mt-[52px] px-5 pb-5 pt-2 text-white">
          <div className="mb-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                className="h-4 w-4 text-[#FBBF24]"
                fill="currentColor"
              />
            ))}
          </div>
          <p className="text-[19px] font-bold leading-snug tracking-tight">
            Koda helped us spot a risky chat early, without taking games away.
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-blue-100/80">
            The alert gave me the context I needed to have a calm conversation with my son. He still gets to play with friends, and I know when to step in.
          </p>
          <p className="mt-4 text-[12px] font-extrabold text-blue-200/70">
            Parent of a 12-year-old gamer
          </p>
        </div>
      </div>
    </div>
  );
}
