"use client";

import { useEffect, useRef, useState } from "react";
import { StarIcon } from "@/components/icons";

const TESTIMONIALS = [
  {
    quote:
      "Koda helped us discover our son had been regularly talking with an adult in his 30s. I'm so grateful we installed it.",
    name: "Elizabeth K.",
    detail: "Mom of a 12-year-old gamer",
    avatar: 0,
  },
  {
    quote:
      "Koda helps me protect my son without cutting him off from the friends he plays with after school.",
    name: "Megan W.",
    detail: "Mom of a 10-year-old Roblox player",
    avatar: 1,
  },
  {
    quote:
      "Koda gave me the exact clip, transcript, and timestamp. I could talk to my child calmly because I knew exactly what happened.",
    name: "Lauren B.",
    detail: "Mom of a 13-year-old gamer",
    avatar: 2,
  },
  {
    quote:
      "Must-have if you want to protect your kid online. I was shocked to discover the awful things strangers were saying to my son.",
    name: "Claire H.",
    detail: "Mom of an 11-year-old Minecraft fan",
    avatar: 3,
  },
] as const;

const AVATARS = [
  { background: "#FF6F8F", hair: "#2F2352", skin: "#FFE6D6", shirt: "#1942D8", accent: "#8B5CF6" },
  { background: "#FFE27A", hair: "#7A3F22", skin: "#FFD9BC", shirt: "#F97316", accent: "#1942D8" },
  { background: "#BFD8FF", hair: "#413028", skin: "#F7C7A2", shirt: "#2563EB", accent: "#FF6F8F" },
  { background: "#FFD0B0", hair: "#E8B36D", skin: "#FFE3C7", shirt: "#1942D8", accent: "#F97316" },
] as const;

function MiniAvatar({ index }: { index: number }) {
  const a = AVATARS[index % AVATARS.length];
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
      <circle cx="48" cy="48" r="48" fill={a.background} />
      <path d="M24 88c4-15 13-23 24-23s20 8 24 23H24z" fill={a.shirt} />
      <path d="M21 51c0-22 12-36 28-36 15 0 26 13 26 35v25H21V51z" fill={a.hair} />
      <circle cx="25" cy="52" r="6" fill={a.skin} />
      <circle cx="71" cy="52" r="6" fill={a.skin} />
      <ellipse cx="48" cy="52" rx="22" ry="25" fill={a.skin} />
      <path d="M26 42c4-16 14-25 29-25 8 5 14 13 17 24-12-6-30-8-46 1z" fill={a.hair} />
      <circle cx="38" cy="53" r="2.6" fill="#1E1E1E" />
      <circle cx="58" cy="53" r="2.6" fill="#1E1E1E" />
      <path d="M40 68c5 5 12 5 17 0" fill="none" stroke="#1E1E1E" strokeLinecap="round" strokeWidth="2.6" />
      <circle cx="32" cy="61" r="4" fill={a.accent} opacity="0.42" />
      <circle cx="64" cy="61" r="4" fill={a.accent} opacity="0.42" />
    </svg>
  );
}

export function FunnelReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const t = TESTIMONIALS[activeIndex];

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <div className="flex items-center gap-1.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="w-4 h-4 text-[var(--koda-bear-blue)]" fill="currentColor" />
        ))}
        <span className="ml-1 text-[13px] font-bold text-[var(--koda-bear-blue)]">
          4.8 stars from parents
        </span>
      </div>

      <div className="rounded-xl bg-gray-50 p-4 min-h-[110px] transition-all duration-300">
        <p className="text-[14px] leading-relaxed text-gray-700 mb-3">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white ring-2 ring-white shadow-sm flex-shrink-0">
            <MiniAvatar index={t.avatar} />
          </div>
          <div>
            <div className="text-[13px] font-bold text-gray-900 leading-none">{t.name}</div>
            <div className="text-[12px] text-gray-500 mt-0.5">{t.detail}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Show review ${i + 1}`}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === activeIndex ? "20px" : "6px",
              height: "6px",
              backgroundColor: i === activeIndex ? "var(--koda-bear-blue)" : "#d1d5db",
            }}
          />
        ))}
      </div>
    </div>
  );
}
