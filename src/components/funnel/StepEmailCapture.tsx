"use client";

import { useEffect, useRef, useState } from "react";

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
      className="flex flex-col flex-1 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="mb-8">
        <h1 className="text-[26px] sm:text-[30px] leading-[1.2] tracking-tight text-gray-900 font-bold">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
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
          className="w-full h-14 px-5 rounded-xl border-2 border-gray-200 bg-white text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all"
          style={
            {
              "--tw-ring-color": brandColor,
            } as React.CSSProperties
          }
          onFocus={(e) => {
            e.currentTarget.style.borderColor = brandColor;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="mt-auto pt-8">
        <button
          type="submit"
          disabled={!valid || submitting}
          className="w-full h-14 rounded-full text-[17px] font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: brandColor }}
        >
          {submitting ? "Saving..." : "Get My Safety Plan"}
        </button>
        <p className="mt-3 text-center text-[12px] text-gray-400">
          No spam. We&apos;ll only use your email to send your personalized plan.
        </p>
      </div>
    </form>
  );
}
