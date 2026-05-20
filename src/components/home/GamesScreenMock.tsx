/**
 * Feature 1 mockup — "Inside the games where every other parental control
 * goes blind." Shows the four games we run directly inside (Roblox, Minecraft,
 * Fortnite, Discord) with live chat-monitoring status.
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

type GameRow = {
  name: string;
  detail: string;
  flag?: number;
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
    icon: <PlatformBox src="/images/platforms/fortnite.svg" bg="#2A3F8F" />,
  },
  {
    name: "Discord",
    detail: "8 channels watched",
    flag: 1,
    icon: <PlatformBox src="/images/platforms/discord.svg" bg={COLORS.discord} />,
  },
];

export function GamesScreenMock({
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
            Inside the
            <br />
            games
          </>
        }
        subtitle={
          <>
            4 games connected —
            <br />
            zero blind spots.
          </>
        }
        iconNode={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M7 6a5 5 0 0 0-5 5v2a5 5 0 0 0 5 5 3 3 0 0 0 3-3h4a3 3 0 0 0 3 3 5 5 0 0 0 5-5v-2a5 5 0 0 0-5-5H7zm-1 4h2v2h2v2H8v2H6v-2H4v-2h2v-2zm10 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-3 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
          </svg>
        }
      />

      <div className="px-3 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 px-3 py-3 flex items-center justify-around">
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.text, fontSize: "20px" }}>
              4
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Games
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.high, fontSize: "20px" }}>
              1
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Flagged
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none flex items-center justify-center gap-1" style={{ color: COLORS.low, fontSize: "20px" }}>
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: COLORS.low }} />
              Live
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Real-time
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900" style={{ fontSize: "13px" }}>
          Connected games
        </h3>
        <span className="font-semibold" style={{ color: COLORS.textMuted, fontSize: "11px" }}>
          Today
        </span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {GAMES.map((g) => (
          <div
            key={g.name}
            className="bg-white rounded-xl border border-gray-100 p-2.5 flex items-center gap-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {g.icon}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: "11px" }}>
                {g.name}
              </p>
              <p className="text-gray-500 leading-snug mt-0.5" style={{ fontSize: "9px" }}>
                {g.detail}
              </p>
            </div>
            {g.flag ? (
              <span
                className="inline-flex items-center gap-1 font-bold rounded-full px-2"
                style={{ background: COLORS.high, color: "white", fontSize: "9px", height: "18px" }}
              >
                <span className="block w-1.5 h-1.5 rounded-full bg-white" />
                {g.flag} flag
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1 font-semibold rounded-full px-2"
                style={{ background: "#EFF6FF", color: COLORS.redDeep, fontSize: "9px", height: "18px" }}
              >
                <span className="block w-1.5 h-1.5 rounded-full" style={{ background: COLORS.low }} />
                Watching
              </span>
            )}
          </div>
        ))}
      </div>

      <p
        className="text-center mt-3 px-4 font-semibold leading-snug"
        style={{ color: COLORS.textMuted, fontSize: "10px" }}
      >
        We see what your child sees — in real time.
      </p>

      <BottomNav activeTab="Activity" />
    </PhoneFrame>
  );
}
