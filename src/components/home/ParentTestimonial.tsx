"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";

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
  {
    label: "Illustrated face for Elizabeth K.",
    background: "#FF6F8F",
    hair: "#2F2352",
    skin: "#FFE6D6",
    shirt: "#1942D8",
    accent: "#8B5CF6",
  },
  {
    label: "Illustrated face for Megan W.",
    background: "#FFE27A",
    hair: "#7A3F22",
    skin: "#FFD9BC",
    shirt: "#F97316",
    accent: "#1942D8",
  },
  {
    label: "Illustrated face for Lauren B.",
    background: "#BFD8FF",
    hair: "#413028",
    skin: "#F7C7A2",
    shirt: "#2563EB",
    accent: "#FF6F8F",
  },
  {
    label: "Illustrated face for Claire H.",
    background: "#FFD0B0",
    hair: "#E8B36D",
    skin: "#FFE3C7",
    shirt: "#1942D8",
    accent: "#F97316",
  },
] as const;

const AUTO_ADVANCE_MS = 6500;
const SWIPE_THRESHOLD_PX = 45;

const CARD_COLORS = [
  "bg-[#EFF6FF] ring-[var(--bark-blue)]/10",
  "bg-[#FFE0C4] ring-[#F97316]/12",
  "bg-[#DCEBFF] ring-[var(--bark-blue)]/12",
  "bg-[#FFE27A] ring-[#E8B000]/14",
] as const;

const CARD_POSITIONS = [
  "left-1/2 top-0 z-40 -translate-x-1/2 -rotate-[1deg] scale-100 opacity-100 sm:top-8 lg:left-[78%] lg:top-10 lg:rotate-[5deg]",
  "left-[64%] top-5 z-30 -translate-x-1/2 rotate-[4deg] scale-[0.96] opacity-95 sm:left-[66%] sm:top-12 lg:left-[58%] lg:top-12 lg:z-30 lg:rotate-[2deg] lg:scale-100",
  "left-[71%] top-10 z-20 -translate-x-1/2 rotate-[7deg] scale-[0.92] opacity-85 sm:left-[80%] sm:top-20 lg:left-[39%] lg:top-10 lg:z-20 lg:-rotate-[1deg] lg:scale-100 lg:opacity-100",
  "left-[36%] top-5 z-30 -translate-x-1/2 -rotate-[5deg] scale-[0.96] opacity-95 sm:left-[34%] sm:top-12 lg:left-[19%] lg:top-14 lg:z-10 lg:scale-100",
] as const;

function relativeSlot(index: number, activeIndex: number) {
  return (index - activeIndex + TESTIMONIALS.length) % TESTIMONIALS.length;
}

function IllustratedFace({ index }: { index: number }) {
  const avatar = AVATARS[index % AVATARS.length];

  return (
    <svg
      viewBox="0 0 96 96"
      role="img"
      aria-label={avatar.label}
      className="h-full w-full"
    >
      <circle cx="48" cy="48" r="48" fill={avatar.background} />
      <path
        d="M24 88c4-15 13-23 24-23s20 8 24 23H24z"
        fill={avatar.shirt}
      />
      <path
        d="M21 51c0-22 12-36 28-36 15 0 26 13 26 35v25H21V51z"
        fill={avatar.hair}
      />
      <circle cx="25" cy="52" r="6" fill={avatar.skin} />
      <circle cx="71" cy="52" r="6" fill={avatar.skin} />
      <ellipse cx="48" cy="52" rx="22" ry="25" fill={avatar.skin} />
      <path
        d="M26 42c4-16 14-25 29-25 8 5 14 13 17 24-12-6-30-8-46 1z"
        fill={avatar.hair}
      />
      <circle cx="38" cy="53" r="2.6" fill="#1E1E1E" />
      <circle cx="58" cy="53" r="2.6" fill="#1E1E1E" />
      <path
        d="M33 47c2-2 5-3 8-2"
        fill="none"
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      <path
        d="M55 45c3-1 6 0 8 2"
        fill="none"
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      <path
        d="M48 55c-2 4-3 7-1 9 1 1 3 1 5 0"
        fill="none"
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M40 68c5 5 12 5 17 0"
        fill="none"
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeWidth="2.6"
      />
      <circle cx="32" cy="61" r="4" fill={avatar.accent} opacity="0.42" />
      <circle cx="64" cy="61" r="4" fill={avatar.accent} opacity="0.42" />
      <circle cx="32" cy="37" r="2.8" fill={avatar.accent} />
      <circle cx="37" cy="34" r="2" fill="#FFFFFF" opacity="0.88" />
      <path
        d="M34 77c7 5 21 5 28 0"
        fill="none"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.75"
      />
    </svg>
  );
}

export function ParentTestimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const activeTestimonial = TESTIMONIALS[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? TESTIMONIALS.length - 1 : current - 1,
    );
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    setIsPaused(true);
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;

    const swipeDistance =
      event.changedTouches[0].clientX - touchStartX.current;

    if (swipeDistance > SWIPE_THRESHOLD_PX) {
      showPrevious();
    } else if (swipeDistance < -SWIPE_THRESHOLD_PX) {
      showNext();
    }

    touchStartX.current = null;
    setIsPaused(false);
  }

  return (
    <section className="isolate px-[15px] pt-[15px]">
      <div className="rounded-lg bg-white">
        <div className="mx-auto max-w-[1120px] px-5 py-10 sm:px-8 sm:py-14 lg:py-18">
          <div
            className="relative lg:hidden"
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onPointerEnter={() => setIsPaused(true)}
            onPointerLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <p className="sr-only" aria-live="polite">
              Showing testimonial {activeIndex + 1} of {TESTIMONIALS.length}:{" "}
              {activeTestimonial.quote}
            </p>

            <div className="relative mx-auto h-[465px] max-w-[1060px] overflow-visible sm:h-[520px] lg:h-[500px]">
              {TESTIMONIALS.map((testimonial, index) => {
                const slot = relativeSlot(index, activeIndex);
                const isActive = slot === 0;

                return (
                  <button
                    key={testimonial.quote}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`absolute h-[410px] w-[78vw] max-w-[330px] rounded-[28px] p-7 text-left shadow-[0_24px_54px_-34px_rgba(15,23,42,0.45)] ring-1 transition-all duration-700 ease-out sm:h-[435px] sm:max-w-none sm:w-[370px] sm:p-8 lg:h-[420px] lg:w-[360px] ${CARD_COLORS[index]} ${CARD_POSITIONS[slot]} ${
                      isActive
                        ? "cursor-default"
                        : "cursor-pointer hover:scale-[0.99]"
                    }`}
                    aria-label={`Bring testimonial ${index + 1} to front`}
                    aria-pressed={isActive}
                  >
                    <div
                      className={`flex h-full flex-col justify-between transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0 lg:opacity-100"
                      }`}
                    >
                      <blockquote>
                        <p className="text-[24px] font-semibold leading-[1.12] tracking-tight text-[rgb(30,30,30)] sm:text-[27px] lg:text-[27px]">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </blockquote>

                      <div className="flex items-center gap-4">
                        <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full bg-white ring-4 ring-white shadow-[0_12px_28px_-14px_rgba(15,23,42,0.45)] sm:h-14 sm:w-14">
                          <IllustratedFace index={testimonial.avatar} />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-base font-extrabold leading-tight text-[rgb(30,30,30)] sm:text-lg">
                            {testimonial.name}
                          </p>
                          <p className="mt-1 text-sm font-medium leading-snug text-gray-700 sm:text-base">
                            {testimonial.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              className="relative z-50 -mt-1 flex items-center justify-center gap-4 sm:-mt-4"
              aria-label="Choose testimonial"
            >
              {TESTIMONIALS.map((testimonial, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={testimonial.quote}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-full transition ${
                      isActive
                        ? "h-5 w-5 bg-white ring-[5px] ring-[var(--bark-blue)]"
                        : "h-4 w-4 bg-[var(--bark-blue)]/28 hover:bg-[var(--bark-blue)]/45"
                    }`}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-pressed={isActive}
                  />
                );
              })}
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <article
                key={testimonial.quote}
                className={`flex min-h-[300px] flex-col justify-between rounded-[28px] p-8 text-left shadow-[0_24px_54px_-34px_rgba(15,23,42,0.45)] ring-1 ${CARD_COLORS[index]}`}
              >
                <blockquote>
                  <p className="text-[27px] font-semibold leading-[1.12] tracking-tight text-[rgb(30,30,30)]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white ring-4 ring-white shadow-[0_12px_28px_-14px_rgba(15,23,42,0.45)]">
                    <IllustratedFace index={testimonial.avatar} />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-lg font-extrabold leading-tight text-[rgb(30,30,30)]">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-base font-medium leading-snug text-gray-700">
                      {testimonial.detail}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
