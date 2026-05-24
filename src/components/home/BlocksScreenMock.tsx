/**
 * Feature 5 mockup — "Block any app, any site, on every device — in one
 * tap." Shows a School Hours mode toggle plus a list of quick-block switches.
 */

import * as React from "react";
import {
  COLORS,
  PhoneFrame,
  PlatformBox,
  GrassBlockBox,
} from "@/components/home/PhoneMockShared";

type BlockRow = {
  name: string;
  detail: string;
  on: boolean;
  icon: React.ReactNode;
};

const BLOCKS: BlockRow[] = [
  {
    name: "All games",
    detail: "Roblox · Minecraft · Fortnite",
    on: true,
    icon: <GrassBlockBox />,
  },
  {
    name: "Discord",
    detail: "DMs · servers · voice",
    on: false,
    icon: <PlatformBox src="/images/platforms/discord.svg" bg={COLORS.discord} />,
  },
  {
    name: "TikTok",
    detail: "Feed and DMs",
    on: true,
    icon: <PlatformBox src="/images/platforms/tiktok.svg" bg={COLORS.tiktok} />,
  },
  {
    name: "Adult sites",
    detail: "Network-level filter",
    on: true,
    icon: (
      <span
        className="inline-flex items-center justify-center rounded-lg shrink-0"
        style={{ background: "#1F2937", width: 32, height: 32 }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zM9 8h6v2H9V8zm-1 4h8v2H8v-2z" />
        </svg>
      </span>
    ),
  },
  {
    name: "Netflix",
    detail: "Streaming after bedtime",
    on: false,
    icon: (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-lg font-black ring-1 ring-black/5"
        style={{ background: "#111111", color: "#E50914", width: 32, height: 32, fontSize: "15px" }}
      >
        N
      </span>
    ),
  },
];

function Toggle({ on, accent = COLORS.redDeep }: { on: boolean; accent?: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full transition-colors"
      style={{
        width: 30,
        height: 18,
        background: on ? accent : "#D1D5DB",
        padding: 2,
        boxShadow: on
          ? `inset 0 1px 2px rgba(0,0,0,0.15)`
          : "inset 0 1px 2px rgba(0,0,0,0.08)",
      }}
      aria-hidden
    >
      <span
        className="block bg-white rounded-full"
        style={{
          width: 14,
          height: 14,
          transform: on ? "translateX(12px)" : "translateX(0)",
          transition: "transform 0.2s cubic-bezier(.4,1.4,.5,1)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.05)",
        }}
      />
    </span>
  );
}

export function BlocksScreenMock({
  className = "",
  style,
  bare = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  bare?: boolean;
}) {
  const compact = bare;

  return (
    <PhoneFrame className={className} style={style} bare={bare}>
      <div
        className={`flex items-center justify-between ${
          compact ? "px-3 pt-3" : "px-4 pt-10"
        }`}
      >
        <h3
          className="font-bold leading-tight text-gray-950"
          style={{ fontSize: compact ? "12px" : "15px" }}
        >
          Quick blocks
        </h3>
        <span
          className="rounded-full bg-white px-2 py-1 font-semibold ring-1 ring-black/[0.06]"
          style={{ color: COLORS.textMuted, fontSize: compact ? "9px" : "11px" }}
        >
          Tap to toggle
        </span>
      </div>

      <div className={compact ? "px-3 mt-2 space-y-1.5" : "px-4 mt-3 space-y-2"}>
        {BLOCKS.map((b, i) => (
          <div
            key={b.name + i}
            className={`relative flex items-center gap-2.5 rounded-[16px] border border-black/[0.06] bg-white px-2.5 ${
              compact ? "min-h-[42px] py-1.5" : "min-h-[52px] py-2"
            }`}
            style={{
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.90), 0 3px 10px rgba(15,23,42,0.04)",
            }}
          >
            {b.icon}
            <div className="flex-1 min-w-0">
              <p
                className="font-bold leading-tight text-gray-950"
                style={{ fontSize: compact ? "10.5px" : "11px" }}
              >
                {b.name}
              </p>
              <p
                className="text-gray-500 leading-snug mt-0.5"
                style={{ fontSize: compact ? "8.5px" : "9px" }}
              >
                {b.detail}
              </p>
            </div>
            <Toggle on={b.on} />
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}
