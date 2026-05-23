"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Koda gave me the exact clip, transcript, and timestamp. I could talk to my child calmly because I knew what happened.",
    name: "Koda parent",
    detail: "Parent of a 12-year-old gamer",
    image: "/images/Girl2.jpg",
    imagePosition: "object-[50%_32%]",
  },
  {
    quote:
      "The alert showed the chat, the voice clip, and the time it happened. We knew what to ask instead of guessing.",
    name: "Koda parent",
    detail: "Parent of a 10-year-old Roblox player",
    image: "/images/Girl1.jpg",
    imagePosition: "object-[50%_28%]",
  },
  {
    quote:
      "I did not need another screen-time chart. I needed the moment that mattered. Koda showed me exactly where to step in.",
    name: "Koda parent",
    detail: "Parent of a 13-year-old gamer",
    image: "/images/Guy1.jpg",
    imagePosition: "object-[50%_24%]",
  },
  {
    quote:
      "The summary was calm and specific. It gave us enough context to have a real conversation that same night.",
    name: "Koda parent",
    detail: "Parent of an 11-year-old Minecraft fan",
    image: "/images/Girl2.jpg",
    imagePosition: "object-[50%_32%]",
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
    <section className="px-[15px] pt-[15px]">
      <div className="rounded-lg bg-white">
        <div className="mx-auto max-w-[1120px] px-5 py-10 sm:px-8 sm:py-14 lg:py-18">
          <div
            className="relative"
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
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={testimonial.image}
                            alt=""
                            className={`h-full w-full object-cover ${testimonial.imagePosition}`}
                          />
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
        </div>
      </div>
    </section>
  );
}
