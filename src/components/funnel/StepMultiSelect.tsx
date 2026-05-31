"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CircleQuestionMark,
  Gamepad2,
  Mic,
  MessageSquare,
  Mail,
  Users,
  Video,
  User,
  HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FunnelOption } from "@/types/funnel";

function OptionIcon({
  option,
  isSelected,
  brandColor,
}: {
  option: FunnelOption;
  isSelected: boolean;
  brandColor: string;
}) {
  if (!option.icon && !option.fallbackIcon) return null;

  const iconMap: Record<string, LucideIcon> = {
    question: CircleQuestionMark,
    gamepad: Gamepad2,
    mic: Mic,
    "message-square": MessageSquare,
    mail: Mail,
    users: Users,
    video: Video,
    user: User,
    "help-circle": HelpCircle,
  };
  const FallbackIcon = iconMap[option.fallbackIcon ?? ""] ?? Gamepad2;
  const hasCustomBackground = Boolean(option.iconBackground);

  return (
    <span
      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-colors duration-150"
      style={{
        borderColor: hasCustomBackground
          ? "transparent"
          : isSelected
            ? `${brandColor}30`
            : "#e5e7eb",
        backgroundColor:
          option.iconBackground ?? (isSelected ? "white" : "#f9fafb"),
      }}
    >
      {option.icon ? (
        <Image
          src={option.icon}
          alt=""
          aria-hidden="true"
          width={26}
          height={26}
          className="max-h-7 w-auto max-w-8 object-contain"
        />
      ) : (
        <FallbackIcon
          aria-hidden="true"
          className="h-5 w-5"
          strokeWidth={2}
          style={{ color: isSelected ? brandColor : "#6b7280" }}
        />
      )}
    </span>
  );
}

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
              className="w-full flex min-h-14 items-center justify-between gap-4 rounded-xl border-2 px-3.5 py-2.5 text-left transition-all duration-150"
              style={{
                borderColor: isSelected ? brandColor : "#e5e7eb",
                backgroundColor: isSelected ? `${brandColor}08` : "white",
              }}
            >
              <span className="flex min-w-0 items-center gap-3">
                <OptionIcon
                  option={opt}
                  isSelected={isSelected}
                  brandColor={brandColor}
                />
                <span className="min-w-0 text-[15px] font-medium leading-snug text-gray-900">
                  {opt.label}
                </span>
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
