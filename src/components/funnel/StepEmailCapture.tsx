"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { KodaLogo, StarIcon } from "@/components/icons";

const PARENT_AVATARS = [
  "/images/parents/parent1.jpg",
  "/images/parents/parent2.jpg",
  "/images/parents/parent3.jpg",
  "/images/parents/parent4.jpg",
  "/images/parents/parent5.jpg",
];

export function StepEmailCapture({
  title,
  subtitle,
  defaultValue,
  brandColor,
  submitting,
  error,
  onSubmit,
}: {
  title: string;
  subtitle?: string;
  defaultValue?: string;
  brandColor: string;
  submitting: boolean;
  error: string | null;
  onSubmit: (email: string) => void;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  const inputFocusStyle = {
    "--tw-ring-color": brandColor,
  } as CSSProperties;

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid && !submitting) onSubmit(value.trim());
      }}
      className="flex flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="mx-auto mb-7 max-w-[460px] text-center">
        <KodaLogo
          height={34}
          className="mb-7 justify-center"
          color={brandColor}
        />
        <h1 className="text-[30px] font-black leading-[1.12] tracking-tight text-gray-900 sm:text-[34px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-[380px] text-[15px] font-medium leading-relaxed text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <input
          ref={inputRef}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="Enter your email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-16 w-full rounded-[22px] border-2 border-gray-200 bg-white px-5 text-[17px] font-semibold text-gray-900 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.65)] transition-all placeholder:text-gray-400 focus:outline-none"
          style={inputFocusStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = brandColor;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <p className="mx-auto mt-4 max-w-[390px] text-center text-[12.5px] font-medium leading-relaxed text-gray-500">
        We respect your privacy and never spam. Read our{" "}
        <a
          href="/privacy"
          className="whitespace-nowrap font-semibold underline underline-offset-2"
          style={{ color: brandColor }}
        >
          Privacy Policy
        </a>{" "}
        to understand how we use your data.
      </p>

      <div className="mt-auto pt-8">
        <div className="mb-5 rounded-[24px] border border-blue-100 bg-white p-4 shadow-[0_22px_50px_-38px_rgba(37,99,235,0.75)]">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="flex -space-x-3">
              {PARENT_AVATARS.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={42}
                  height={42}
                  className="h-[42px] w-[42px] rounded-full border-2 border-white object-cover shadow-sm"
                  style={{ zIndex: PARENT_AVATARS.length - index }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1" aria-label="5 star review">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className="h-4 w-4 text-[#FBBF24]"
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
          <p className="text-[16px] font-extrabold leading-snug tracking-tight text-gray-900">
            &ldquo;Koda gave us the context to step in calmly, without taking games away.&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2 text-[12px] font-bold text-gray-500">
            <CheckCircle
              className="h-4 w-4 shrink-0"
              style={{ color: brandColor }}
              aria-hidden
            />
            Trusted by parents protecting kids who game online
          </div>
        </div>

        <button
          type="submit"
          disabled={!valid || submitting}
          className="h-14 w-full rounded-full text-[17px] font-bold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ backgroundColor: brandColor }}
        >
          {submitting ? "Creating your plan..." : "Continue"}
        </button>
      </div>
    </form>
  );
}
