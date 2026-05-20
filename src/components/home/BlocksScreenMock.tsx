/**
 * Feature 5 mockup — "Block any app, any site, on every device — in one
 * tap." Shows a School Hours mode toggle plus a list of quick-block switches.
 */

import * as React from "react";
import {
  COLORS,
  PhoneFrame,
  HeroHeader,
  BottomNav,
  PlatformBox,
  GrassBlockBox,
  FooterPill,
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
      <HeroHeader
        title={
          <>
            Quick
            <br />
            blocks
          </>
        }
        subtitle={
          <>
            One tap.
            <br />
            Every device.
          </>
        }
        iconNode={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M18 8h-1V6a5 5 0 1 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 1 1 6 0v2H9V6zm3 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
        }
      />

      <div className="px-3 mt-3 relative z-10">
        <div
          className="relative rounded-2xl px-3 py-3 flex items-center gap-3 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.redDeep} 60%, ${COLORS.redDark} 100%)`,
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.15) inset, 0 8px 24px rgba(37,99,235,0.30)",
          }}
        >
          {/* Subtle inner highlight to give the card depth. */}
          <span
            aria-hidden
            className="absolute -top-8 -left-8 w-20 h-20 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.18)", filter: "blur(8px)" }}
          />
          <span
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
            style={{
              background: "rgba(255,255,255,0.22)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.30)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
          </span>
          <div className="relative flex-1 min-w-0">
            <p
              className="text-white font-bold leading-tight flex items-center gap-1.5"
              style={{ fontSize: "12px" }}
            >
              School hours
              <span
                className="inline-flex items-center gap-0.5 text-[8px] font-bold rounded-full px-1.5 py-[1px] tabular-nums"
                style={{ background: "rgba(255,255,255,0.22)", color: "white" }}
              >
                <span className="block w-1 h-1 rounded-full bg-white mock-anim-breathe" />
                ON
              </span>
            </p>
            <p
              className="text-white/85 leading-tight mt-0.5 tabular-nums"
              style={{ fontSize: "10px" }}
            >
              8 AM – 3 PM weekdays · games &amp; social blocked
            </p>
          </div>
          <Toggle on accent="#FFFFFF" />
        </div>
      </div>

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

      <FooterPill text="Syncs to every device · seconds" />

      <BottomNav activeTab="Settings" />
    </PhoneFrame>
  );
}
