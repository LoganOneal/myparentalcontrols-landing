"use client";

import { useState } from "react";
import type { FunnelOption } from "@/types/funnel";
import { FunnelReviews } from "./FunnelReviews";

export function StepSingleSelect({
  title,
  subtitle,
  tip,
  footer,
  options,
  defaultValue,
  brandColor,
  onNext,
}: {
  title: string;
  subtitle?: string;
  tip?: string;
  footer?: "reviews";
  options: FunnelOption[];
  defaultValue?: string;
  brandColor: string;
  onNext: (selected: string[]) => void;
}) {
  const [selected, setSelected] = useState<string | null>(defaultValue ?? null);

  const handleSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => onNext([id]), 250);
  };

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

      {tip && (
        <p className="mb-5 text-[13px] text-gray-400">
          Tip: {tip}
        </p>
      )}

      <div className="space-y-2">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
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
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150"
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

      {footer === "reviews" && <FunnelReviews />}
    </div>
  );
}
