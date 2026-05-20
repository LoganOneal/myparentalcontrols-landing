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

      <div className="px-3 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 px-3 py-3 flex items-center justify-around">
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.text, fontSize: "20px" }}>
              47K
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Msgs scanned
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.high, fontSize: "20px" }}>
              1
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Real threat
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.low, fontSize: "20px" }}>
              0
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              False alarms
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 flex items-center gap-1.5" style={{ fontSize: "13px" }}>
          <span className="relative inline-flex" aria-hidden>
            <span className="block w-2 h-2 rounded-full" style={{ background: COLORS.redDeep }} />
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: COLORS.redDeep, opacity: 0.5 }}
            />
          </span>
          Live scan
        </h3>
        <span className="font-semibold" style={{ color: COLORS.textMuted, fontSize: "11px" }}>
          Last 60s
        </span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {SCANS.map((s, i) => (
          <div
            key={s.platform + i}
            className="bg-white rounded-xl border border-gray-100 px-2.5 py-2 flex items-center gap-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            style={
              s.status === "flag"
                ? { borderColor: COLORS.high, borderWidth: 1.5 }
                : undefined
            }
          >
            {s.icon}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: "11px" }}>
                {s.platform}
              </p>
              <p className="leading-snug mt-0.5" style={{ fontSize: "9px", color: s.status === "flag" ? COLORS.high : COLORS.textMuted }}>
                {s.msgs}
              </p>
            </div>
            {s.status === "clear" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill={COLORS.low} aria-hidden>
                <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
              </svg>
            ) : (
              <span
                className="inline-flex items-center gap-1 font-bold rounded-full px-2"
                style={{ background: COLORS.high, color: "white", fontSize: "9px", height: "18px" }}
              >
                ⚠ {s.flagText}
              </span>
            )}
          </div>
        ))}
      </div>

      <p
        className="text-center mt-3 px-4 font-semibold leading-snug"
        style={{ color: COLORS.textMuted, fontSize: "10px" }}
      >
        One alert that matters. Not fifty you&rsquo;d ignore.
      </p>

      <BottomNav activeTab="Activity" />
    </PhoneFrame>
  );
}
