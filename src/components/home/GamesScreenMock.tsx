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
  {
    name: "League of Legends",
    detail: "2 party chats",
    icon: (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-lg font-black text-white ring-1 ring-black/5"
        style={{ width: 32, height: 32, background: "#0A1428", fontSize: "14px" }}
      >
        L
      </span>
    ),
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
          Connected games
        </h3>
        <span
          className="rounded-full bg-white px-2 py-1 font-semibold tabular-nums ring-1 ring-black/[0.06]"
          style={{ color: COLORS.textMuted, fontSize: compact ? "9px" : "11px" }}
        >
          Today
        </span>
      </div>

      <div className={compact ? "px-3 mt-2 space-y-1.5" : "px-4 mt-3 space-y-2"}>
        {GAMES.map((g) => (
          <div
            key={g.name}
            className={`relative flex items-center gap-2.5 overflow-hidden rounded-[16px] border border-black/[0.06] bg-white px-2.5 ${
              compact ? "min-h-[42px] py-1.5" : "min-h-[52px] py-2"
            }`}
            style={{
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.90), 0 3px 10px rgba(15,23,42,0.04)",
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
              <p
                className="font-bold leading-tight text-gray-950"
                style={{ fontSize: compact ? "10.5px" : "11px" }}
              >
                {g.name}
              </p>
              <p
                className="text-gray-500 leading-snug mt-0.5 flex items-center gap-1.5"
                style={{ fontSize: compact ? "8.5px" : "9px" }}
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
