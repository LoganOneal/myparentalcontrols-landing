/**
 * Feature 3 mockup — "Catches self-harm, sexual content, and bullying — not
 * just predators". Shows a "What we watch for" screen with a breakdown of
 * threat categories and their flag counts.
 */

import * as React from "react";
import {
  COLORS,
  PhoneFrame,
  HeroHeader,
  BottomNav,
} from "@/components/home/PhoneMockShared";

type Category = {
  name: string;
  description: string;
  count: number;
  severity: "high" | "medium" | "low";
  iconBg: string;
  iconNode: React.ReactNode;
};

const CATEGORIES: Category[] = [
  {
    name: "Predator grooming",
    description: "Age-baiting, platform migration, asks for photos",
    count: 3,
    severity: "high",
    iconBg: "#FFE5E5",
    iconNode: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.red} aria-hidden>
        <path d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm0 6c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm0 14c-2.6 0-5.4-2-7-5 0-1.7 3.3-2.6 7-2.6s7 .9 7 2.6c-1.6 3-4.4 5-7 5z" />
      </svg>
    ),
  },
  {
    name: "Cyberbullying",
    description: "Pile-on harassment, insults, group exclusion",
    count: 1,
    severity: "medium",
    iconBg: "#FFF1D6",
    iconNode: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.medium} aria-hidden>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 11H8v-2h8v2zm0-3H8V8h8v2z" />
      </svg>
    ),
  },
  {
    name: "Self-harm & suicide",
    description: "Suicidal ideation, self-harm signals, hopelessness",
    count: 0,
    severity: "low",
    iconBg: "#E6F4FF",
    iconNode: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563EB" aria-hidden>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    name: "Sexual content",
    description: "Sexting, nudity, sextortion attempts",
    count: 2,
    severity: "high",
    iconBg: "#FFE5E5",
    iconNode: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.red} aria-hidden>
        <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m0-2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
      </svg>
    ),
  },
  {
    name: "Drug references",
    description: "Drugs, alcohol, vaping, mentions of dealing",
    count: 0,
    severity: "low",
    iconBg: "#F3E8FF",
    iconNode: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#7C3AED" aria-hidden>
        <path d="M4.22 11.29l7.07-7.07a5 5 0 0 1 7.07 7.07l-7.07 7.07a5 5 0 0 1-7.07-7.07zm5.66-3.54l-4.24 4.24a3 3 0 0 0 4.24 4.24l4.24-4.24-4.24-4.24z" />
      </svg>
    ),
  },
  {
    name: "Violence & threats",
    description: "Threats of harm, planned fights, weapons",
    count: 1,
    severity: "medium",
    iconBg: "#FFF1D6",
    iconNode: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.medium} aria-hidden>
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
      </svg>
    ),
  },
];

function CountPill({ count, severity }: { count: number; severity: Category["severity"] }) {
  const bg =
    count === 0
      ? "#E5E7EB"
      : severity === "high"
        ? COLORS.high
        : severity === "medium"
          ? COLORS.medium
          : COLORS.low;
  const color = count === 0 ? COLORS.textMuted : "white";
  return (
    <span
      className="inline-flex items-center justify-center font-bold rounded-full px-2"
      style={{ background: bg, color, fontSize: "10px", height: "20px", minWidth: "20px" }}
    >
      {count}
    </span>
  );
}

export function CategoriesScreenMock({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <PhoneFrame className={className} style={style}>
      <HeroHeader
        title={
          <>
            What we
            <br />
            watch for
          </>
        }
        subtitle={
          <>
            AI trained on 6 patterns —
            <br />
            beyond just predators.
          </>
        }
        iconNode={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm-1 16-4-4 1.4-1.4L11 14.2l5.6-5.6L18 10l-7 7z" />
          </svg>
        }
      />

      <div className="px-3 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 px-3 py-3 flex items-center justify-around">
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.high, fontSize: "20px" }}>
              5
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              High severity
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.medium, fontSize: "20px" }}>
              2
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Medium
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.low, fontSize: "20px" }}>
              7d
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              History
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900" style={{ fontSize: "13px" }}>
          Threat categories
        </h3>
        <span
          className="font-semibold"
          style={{ color: COLORS.textMuted, fontSize: "11px" }}
        >
          This week
        </span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {CATEGORIES.map((c) => (
          <div
            key={c.name}
            className="bg-white rounded-xl border border-gray-100 p-2.5 flex items-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
              style={{ background: c.iconBg }}
            >
              {c.iconNode}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: "11px" }}>
                {c.name}
              </p>
              <p className="text-gray-500 leading-snug mt-0.5" style={{ fontSize: "9px" }}>
                {c.description}
              </p>
            </div>
            <CountPill count={c.count} severity={c.severity} />
          </div>
        ))}
      </div>

      <BottomNav activeTab="Settings" />
    </PhoneFrame>
  );
}
