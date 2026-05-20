/**
 * Feature 3 mockup — "AI that only pings you when something is actually
 * wrong." Live scan feed showing the AI silently processing tens of
 * thousands of messages, then flagging one real threat.
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

type ScanRow = {
  platform: string;
  msgs: string;
  status: "clear" | "flag";
  flagText?: string;
  icon: React.ReactNode;
};

const SCANS: ScanRow[] = [
  {
    platform: "Roblox",
    msgs: "4,200 msgs",
    status: "clear",
    icon: <PlatformBox src="/images/platforms/roblox.svg" bg={COLORS.roblox} size={7} />,
  },
  {
    platform: "Discord",
    msgs: "1,800 msgs",
    status: "clear",
    icon: <PlatformBox src="/images/platforms/discord.svg" bg={COLORS.discord} size={7} />,
  },
  {
    platform: "Snapchat",
    msgs: '"send me one" · escalated',
    status: "flag",
    flagText: "Threat",
    icon: <PlatformBox src="/images/platforms/snapchat.svg" bg={COLORS.snapchat} size={7} />,
  },
  {
    platform: "Minecraft",
    msgs: "600 msgs",
    status: "clear",
    icon: <GrassBlockBox size={7} />,
  },
];

export function AIScannerScreenMock({
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
            AI is
            <br />
            on watch
          </>
        }
        subtitle={
          <>
            We stay quiet
            <br />
            until it matters.
          </>
        }
        iconNode={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M12 2 14 8l6 2-6 2-2 6-2-6-6-2 6-2 2-6zm6 12 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3zM5 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
          </svg>
        }
      />

      <div className="px-3 mt-3 relative z-10">
        <div
          className="bg-white rounded-2xl px-3 py-3 flex items-center justify-around ring-1 ring-black/5"
          style={{
            boxShadow:
              "0 1px 0 rgba(0,0,0,0.02), 0 8px 24px rgba(15,23,42,0.08)",
          }}
        >
          <div className="text-center">
            <div
              className="font-bold leading-none tabular-nums"
              style={{ color: COLORS.text, fontSize: "20px" }}
            >
              47K
            </div>
            <div className="text-gray-500 mt-1 font-medium" style={{ fontSize: "10px" }}>
              Msgs scanned
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div
              className="font-bold leading-none tabular-nums"
              style={{ color: COLORS.high, fontSize: "20px" }}
            >
              1
            </div>
            <div className="text-gray-500 mt-1 font-medium" style={{ fontSize: "10px" }}>
              Real threat
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div
              className="font-bold leading-none tabular-nums"
              style={{ color: COLORS.low, fontSize: "20px" }}
            >
              0
            </div>
            <div className="text-gray-500 mt-1 font-medium" style={{ fontSize: "10px" }}>
              False alarms
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 flex items-center justify-between">
        <h3
          className="font-bold text-gray-900 inline-flex items-center gap-1.5 rounded-full pl-1 pr-2.5 py-0.5 mock-anim-glow-pulse"
          style={{ fontSize: "11px", background: "rgba(37,99,235,0.08)" }}
        >
          <span className="relative inline-flex items-center justify-center w-4 h-4 rounded-full" style={{ background: COLORS.redDeep }} aria-hidden>
            <span className="block w-1.5 h-1.5 rounded-full bg-white mock-anim-breathe" />
          </span>
          Live scan
        </h3>
        <span
          className="font-semibold tabular-nums"
          style={{ color: COLORS.textMuted, fontSize: "11px" }}
        >
          Last 60s
        </span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {SCANS.map((s, i) => {
          const isFlag = s.status === "flag";
          return (
            <div
              key={s.platform + i}
              className="relative bg-white rounded-xl border border-gray-100 px-2.5 py-2 flex items-center gap-2.5 overflow-hidden"
              style={{
                boxShadow: isFlag
                  ? "0 1px 0 rgba(0,0,0,0.02), 0 4px 14px rgba(255,56,56,0.18)"
                  : "0 1px 0 rgba(0,0,0,0.02), 0 2px 6px rgba(15,23,42,0.04)",
                borderColor: isFlag ? "rgba(255,56,56,0.55)" : undefined,
                borderWidth: isFlag ? 1.5 : 1,
              }}
            >
              {/* Accent stripe + shimmer overlay on the threat row. */}
              {isFlag && (
                <>
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{ background: COLORS.high }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 mock-anim-shimmer pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,56,56,0.12), transparent)",
                    }}
                  />
                </>
              )}
              {s.icon}
              <div className="flex-1 min-w-0">
                <p
                  className="font-bold text-gray-900 leading-tight"
                  style={{ fontSize: "11px" }}
                >
                  {s.platform}
                </p>
                <p
                  className="leading-snug mt-0.5 tabular-nums"
                  style={{
                    fontSize: "9px",
                    color: isFlag ? COLORS.high : COLORS.textMuted,
                  }}
                >
                  {s.msgs}
                </p>
              </div>
              {s.status === "clear" ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={COLORS.low}
                  aria-hidden
                >
                  <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
              ) : (
                <span
                  className="inline-flex items-center gap-1 font-bold rounded-full px-2 mock-anim-slide-in"
                  style={{
                    background: COLORS.high,
                    color: "white",
                    fontSize: "9px",
                    height: "18px",
                    boxShadow: "0 2px 6px rgba(255,56,56,0.35)",
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="white" aria-hidden>
                    <path d="M12 2 1 21h22L12 2zm0 6 7 12H5l7-12zm-1 4v4h2v-4h-2zm0 5v2h2v-2h-2z" />
                  </svg>
                  {s.flagText}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <FooterPill text="One alert that matters" tone="alert" />

      <BottomNav activeTab="Activity" />
    </PhoneFrame>
  );
}
