/**
 * Feature 1 mockup — "Inside the games where every other parental control
 * goes blind." Shows the four games we run directly inside (Roblox, Minecraft,
 * Fortnite, Discord) with live chat-monitoring status.
 */

import * as React from "react";
import {
  COLORS,
  PhoneFrame,
  PlatformBox,
  GrassBlockBox,
} from "@/components/home/PhoneMockShared";

type GameRow = {
  name: string;
  detail: string;
  flag?: number;
  live?: boolean;
  icon: React.ReactNode;
};

const GAMES: GameRow[] = [
  {
    name: "Roblox",
    detail: "47 chats today",
    icon: <PlatformBox src="/images/platforms/roblox.svg" bg={COLORS.roblox} />,
  },
  {
    name: "Minecraft",
    detail: "12 chats today",
    icon: <GrassBlockBox />,
  },
  {
    name: "Fortnite",
    detail: "3 voice calls live",
    live: true,
    icon: <PlatformBox src="/images/platforms/fortnite.svg" bg="#2A3F8F" />,
  },
  {
    name: "Discord",
    detail: "8 channels watched",
    flag: 1,
    icon: <PlatformBox src="/images/platforms/discord.svg" bg={COLORS.discord} />,
  },
];

/** Inline EQ bars — animated visualizer for the "voice live" row. */
function EqBars() {
  return (
    <span className="inline-flex items-end gap-[2px] h-3" aria-hidden>
      {[0, 0.15, 0.3, 0.1].map((delay, i) => (
        <span
          key={i}
          className="mock-anim-eq-bar block w-[2px] rounded-full"
          style={{
            height: "10px",
            background: COLORS.low,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </span>
  );
}

export function GamesScreenMock({
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
          Connected games
        </h3>
        <span
          className="font-semibold tabular-nums"
          style={{ color: COLORS.textMuted, fontSize: "11px" }}
        >
          Today
        </span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {GAMES.map((g) => (
          <div
            key={g.name}
            className="relative bg-white rounded-xl border border-gray-100 p-2.5 flex items-center gap-2.5 overflow-hidden"
            style={{
              boxShadow:
                "0 1px 0 rgba(0,0,0,0.02), 0 2px 6px rgba(15,23,42,0.04)",
              borderColor: g.flag ? "rgba(255,56,56,0.35)" : undefined,
            }}
          >
            {/* Accent stripe on flagged row. */}
            {g.flag ? (
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ background: COLORS.high }}
              />
            ) : null}
            {g.icon}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: "11px" }}>
                {g.name}
              </p>
              <p
                className="text-gray-500 leading-snug mt-0.5 flex items-center gap-1.5"
                style={{ fontSize: "9px" }}
              >
                {g.live && <EqBars />}
                {g.detail}
              </p>
            </div>
            {g.flag ? (
              <span
                className="inline-flex items-center gap-1 font-bold rounded-full px-2 mock-anim-breathe"
                style={{ background: COLORS.high, color: "white", fontSize: "9px", height: "18px" }}
              >
                <span className="block w-1.5 h-1.5 rounded-full bg-white" />
                {g.flag} flag
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1 font-semibold rounded-full px-2"
                style={{
                  background: "#EFF6FF",
                  color: COLORS.redDeep,
                  fontSize: "9px",
                  height: "18px",
                }}
              >
                <span
                  className="block w-1.5 h-1.5 rounded-full mock-anim-breathe"
                  style={{ background: COLORS.low }}
                />
                Watching
              </span>
            )}
          </div>
        ))}
      </div>

    </PhoneFrame>
  );
}
