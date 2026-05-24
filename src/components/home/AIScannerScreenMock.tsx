/**
 * Feature 3 mockup — "AI that only pings you when something is actually
 * wrong." Live scan feed showing the AI silently processing tens of
 * thousands of messages, then flagging one real threat.
 */

import * as React from "react";
import {
  COLORS,
  PhoneFrame,
  PlatformBox,
  GrassBlockBox,
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
    icon: <PlatformBox src="/images/platforms/roblox.svg" bg={COLORS.roblox} />,
  },
  {
    platform: "Discord",
    msgs: "1,800 msgs",
    status: "clear",
    icon: <PlatformBox src="/images/platforms/discord.svg" bg={COLORS.discord} />,
  },
  {
    platform: "Snapchat",
    msgs: '"send me one" · escalated',
    status: "flag",
    flagText: "Threat",
    icon: <PlatformBox src="/images/platforms/snapchat.svg" bg={COLORS.snapchat} />,
  },
  {
    platform: "Minecraft",
    msgs: "600 msgs",
    status: "clear",
    icon: <GrassBlockBox />,
  },
  {
    platform: "iMessage",
    msgs: "312 msgs",
    status: "clear",
    icon: (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-lg ring-1 ring-black/5"
        style={{ width: 32, height: 32, background: "#34C759" }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M12 3C6.5 3 2 6.7 2 11.2c0 2.6 1.5 4.9 3.9 6.4L5.2 21l3.6-1.7c1 .2 2.1.3 3.2.3 5.5 0 10-3.7 10-8.2S17.5 3 12 3z" />
        </svg>
      </span>
    ),
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
  const compact = bare;

  return (
    <PhoneFrame className={className} style={style} bare={bare}>
      <div
        className={`flex items-center justify-between ${
          compact ? "px-3 pt-3" : "px-4 pt-10"
        }`}
      >
        <h3
          className="inline-flex items-center gap-1.5 rounded-full bg-white pl-1 pr-2.5 py-1 font-bold text-gray-950 ring-1 ring-black/[0.06]"
          style={{ fontSize: compact ? "10px" : "11px" }}
        >
          <span className="relative inline-flex items-center justify-center w-4 h-4 rounded-full" style={{ background: COLORS.redDeep }} aria-hidden>
            <span className="block w-1.5 h-1.5 rounded-full bg-white mock-anim-breathe" />
          </span>
          Live scan
        </h3>
        <span
          className="rounded-full bg-white px-2 py-1 font-semibold tabular-nums ring-1 ring-black/[0.06]"
          style={{ color: COLORS.textMuted, fontSize: compact ? "9px" : "11px" }}
        >
          Last 60s
        </span>
      </div>

      <div className={compact ? "px-3 mt-2 space-y-1.5" : "px-4 mt-3 space-y-2"}>
        {SCANS.map((s, i) => {
          const isFlag = s.status === "flag";
          return (
            <div
              key={s.platform + i}
              className={`relative flex items-center gap-2.5 overflow-hidden rounded-[16px] border border-black/[0.06] bg-white px-2.5 ${
                compact ? "min-h-[42px] py-1.5" : "min-h-[52px] py-2"
              }`}
              style={{
                boxShadow: isFlag
                  ? "0 1px 0 rgba(255,255,255,0.90), 0 8px 18px rgba(255,56,56,0.14)"
                  : "0 1px 0 rgba(255,255,255,0.90), 0 3px 10px rgba(15,23,42,0.04)",
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
                  className="font-bold leading-tight text-gray-950"
                  style={{ fontSize: compact ? "10.5px" : "11px" }}
                >
                  {s.platform}
                </p>
                <p
                  className="leading-snug mt-0.5 tabular-nums"
                  style={{
                    fontSize: compact ? "8.5px" : "9px",
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
    </PhoneFrame>
  );
}
