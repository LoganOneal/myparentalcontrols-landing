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
    icon: <GrassBlockBox size={7} />,
  },
  {
    name: "Discord",
    detail: "DMs · servers · voice",
    on: false,
    icon: <PlatformBox src="/images/platforms/discord.svg" bg={COLORS.discord} size={7} />,
  },
  {
    name: "TikTok",
    detail: "Feed and DMs",
    on: true,
    icon: <PlatformBox src="/images/platforms/tiktok.svg" bg={COLORS.tiktok} size={7} />,
  },
  {
    name: "Adult sites",
    detail: "Network-level filter",
    on: true,
    icon: (
      <span
        className="inline-flex items-center justify-center rounded-lg shrink-0"
        style={{ background: "#1F2937", width: 28, height: 28 }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zM9 8h6v2H9V8zm-1 4h8v2H8v-2z" />
        </svg>
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
  return (
    <PhoneFrame className={className} style={style} bare={bare}>
      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900" style={{ fontSize: "13px" }}>
          Quick blocks
        </h3>
        <span
          className="font-semibold"
          style={{ color: COLORS.textMuted, fontSize: "11px" }}
        >
          Tap to toggle
        </span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {BLOCKS.map((b, i) => (
          <div
            key={b.name + i}
            className="relative bg-white rounded-xl border border-gray-100 p-2.5 flex items-center gap-2.5"
            style={{
              boxShadow:
                "0 1px 0 rgba(0,0,0,0.02), 0 2px 6px rgba(15,23,42,0.04)",
            }}
          >
            {b.icon}
            <div className="flex-1 min-w-0">
              <p
                className="font-bold text-gray-900 leading-tight"
                style={{ fontSize: "11px" }}
              >
                {b.name}
              </p>
              <p
                className="text-gray-500 leading-snug mt-0.5"
                style={{ fontSize: "9px" }}
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
