"use client";

import { useEffect, useState } from "react";

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
    <div className="flex flex-col items-center justify-center flex-1 animate-in fade-in duration-500 px-4">
      <div className="relative mb-8">
        <svg
          className="w-20 h-20 animate-spin"
          style={{ animationDuration: "3s" }}
          viewBox="0 0 80 80"
        >
          <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={brandColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="160"
            strokeDashoffset="80"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: `${brandColor}20` }}
          />
        </div>
      </div>

      <h2 className="text-[22px] font-bold text-gray-900 mb-5 text-center">
        {title}
      </h2>

      <div className="w-full max-w-[280px] mb-5">
        <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%`, backgroundColor: brandColor }}
          />
        </div>
      </div>

      <p className="text-[14px] text-gray-400 h-5 text-center transition-all duration-300">
        {messages[messageIndex] ?? ""}
      </p>
    </div>
  );
}
