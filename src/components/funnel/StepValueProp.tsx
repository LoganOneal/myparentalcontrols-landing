"use client";

import { useEffect, useState } from "react";
import { BellRing } from "lucide-react";
import { StarIcon } from "@/components/icons";

const PARENTS = [
  { label: "Kid playing video game with parent", src: "/images/parents/parent1.jpg" },
  { label: "Boys watching video games together", src: "/images/parents/parent2.jpg" },
  { label: "Daughter with her first gaming PC", src: "/images/parents/parent3.jpg" },
  { label: "Parent and teen gaming together", src: "/images/parents/parent4.jpg" },
  { label: "Teen gaming at computer", src: "/images/parents/parent5.jpg" },
  { label: "Parent watching teen play games", src: "/images/parents/parent6.jpg" },
];

function ParentAvatar({ label, src }: { label: string; src: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setLoaded(true);
    image.src = src;
  }, [src]);

  return loaded ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={label} className="h-full w-full object-cover" />
  ) : (
    <div className="h-full w-full bg-gray-100" />
  );
}

export function StepValueProp({
  brandColor,
  onNext,
}: {
  brandColor: string;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Research-backed badge */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3">
          <LaurelLeft />
          <div className="text-center">
            <div
              className="text-[11px] font-black tracking-[0.15em] uppercase"
              style={{ color: brandColor }}
            >
              Research-backed
            </div>
            <div className="text-[12px] text-gray-500 leading-snug mt-0.5">
              For modern online safety
            </div>
          </div>
          <LaurelRight />
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-[26px] sm:text-[28px] font-bold leading-[1.2] tracking-tight text-gray-900 text-center mb-5">
        Give your child freedom online, without being left in the dark.
      </h1>

      {/* Body copy */}
      <div className="space-y-4 text-center text-[15px] leading-relaxed text-gray-600 mb-8">
        <p>
          Koda monitors the conversations other parental controls miss: gaming chat, voice chat, direct messages, and group chats.
        </p>
        <div className="mx-auto flex max-w-[300px] items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-left shadow-[0_10px_24px_-18px_rgba(37,99,235,0.55)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--koda-bear-blue)] shadow-[0_8px_18px_-12px_rgba(37,99,235,0.8)]">
            <BellRing className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--koda-bear-blue)]">
              Parent alert
            </div>
            <p className="text-[15px] font-semibold leading-snug text-gray-900">
              You get alerted when something dangerous happens.
            </p>
          </div>
        </div>
      </div>

      {/* Social proof */}
      <div className="mt-auto flex flex-col items-center gap-3 mb-8">
        <div className="flex items-center justify-center">
          {PARENTS.map((parent, index) => (
            <div
              key={parent.src}
              className="relative h-11 w-11 overflow-hidden rounded-full border-[3px] border-white bg-gray-100 shadow-[0_4px_12px_-4px_rgba(15,23,42,0.4)]"
              style={{ marginLeft: index === 0 ? 0 : "-10px", zIndex: PARENTS.length - index }}
            >
              <ParentAvatar label={parent.label} src={parent.src} />
            </div>
          ))}
        </div>
        <p className="text-[14px] text-gray-700 text-center leading-snug">
          Koda protects <span className="font-extrabold">over 23,000 children</span> who game online. It will work for your child as well!
        </p>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 text-[var(--koda-bear-blue)]" fill="currentColor" />
            ))}
          </div>
          <span className="text-[13px] font-bold text-[var(--koda-bear-blue)]">4.8 stars from parents</span>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onNext}
        className="w-full h-14 rounded-full text-[17px] font-bold text-white transition-all duration-200"
        style={{ backgroundColor: brandColor }}
      >
        Continue
      </button>
    </div>
  );
}

function LaurelLeft() {
  return (
    <svg width="28" height="40" viewBox="0 0 28 40" fill="none" aria-hidden>
      <path d="M20 36C14 30 8 22 10 12" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <path d="M16 34C12 26 9 18 12 10" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
      <ellipse cx="18" cy="30" rx="4" ry="6" transform="rotate(-30 18 30)" fill="#2563EB" opacity="0.12" />
      <ellipse cx="14" cy="22" rx="4" ry="6" transform="rotate(-20 14 22)" fill="#2563EB" opacity="0.10" />
      <ellipse cx="12" cy="14" rx="3.5" ry="5.5" transform="rotate(-10 12 14)" fill="#2563EB" opacity="0.09" />
    </svg>
  );
}

function LaurelRight() {
  return (
    <svg width="28" height="40" viewBox="0 0 28 40" fill="none" aria-hidden>
      <path d="M8 36C14 30 20 22 18 12" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <path d="M12 34C16 26 19 18 16 10" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
      <ellipse cx="10" cy="30" rx="4" ry="6" transform="rotate(30 10 30)" fill="#2563EB" opacity="0.12" />
      <ellipse cx="14" cy="22" rx="4" ry="6" transform="rotate(20 14 22)" fill="#2563EB" opacity="0.10" />
      <ellipse cx="16" cy="14" rx="3.5" ry="5.5" transform="rotate(10 16 14)" fill="#2563EB" opacity="0.09" />
    </svg>
  );
}
