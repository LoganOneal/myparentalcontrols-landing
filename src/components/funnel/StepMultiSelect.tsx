"use client";

import { useState } from "react";
import type { FunnelOption } from "@/types/funnel";

export function StepMultiSelect({
  title,
  subtitle,
  options,
  defaultValue,
  min = 1,
  brandColor,
  onNext,
}: {
  title: string;
  subtitle?: string;
  options: FunnelOption[];
  defaultValue?: string[];
  min?: number;
  brandColor: string;
  onNext: (selected: string[]) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(defaultValue ?? [])
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isValid = selected.size >= min;

  return (
    <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-7">
        <h1 className="text-[26px] sm:text-[30px] leading-[1.2] tracking-tight text-gray-900 font-bold">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-2 mb-8">
        {options.map((opt) => {
          const isSelected = selected.has(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              className="w-full flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border-2 transition-all duration-150 text-left"
              style={{
                borderColor: isSelected ? brandColor : "#e5e7eb",
                backgroundColor: isSelected ? `${brandColor}08` : "white",
              }}
            >
              <span className="text-[15px] font-medium text-gray-900">
                {opt.label}
              </span>
              <div
                className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150"
                style={{
                  borderColor: isSelected ? brandColor : "#d1d5db",
                  backgroundColor: isSelected ? brandColor : "transparent",
                }}
              >
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5L4.2 7.2L8 3"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={() => onNext([...selected])}
          disabled={!isValid}
          className="w-full h-14 rounded-full text-[17px] font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: brandColor }}
        >
          Continue
        </button>
        {min > 0 && selected.size === 0 && (
          <p className="mt-2 text-center text-[13px] text-gray-400">
            Select at least one option to continue
          </p>
        )}
      </div>
    </div>
  );
}
