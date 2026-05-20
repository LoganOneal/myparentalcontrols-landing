/**
 * Feature 4 mockup — "Receipts. So you know exactly what happened." A stats
 * strip + today's evidence timeline (screen recordings, voice transcripts,
 * captured-before-vanish snippets).
 */

import * as React from "react";
import {
  COLORS,
  PhoneFrame,
  HeroHeader,
  BottomNav,
  PlatformBox,
} from "@/components/home/PhoneMockShared";

type EvidenceRow = {
  time: string;
  source: string;
  detail: string;
  badge: "record" | "voice" | "capture";
  icon: React.ReactNode;
};

const EVIDENCE: EvidenceRow[] = [
  {
    time: "10:14 AM",
    source: "Roblox",
    detail: "Stranger asked Lily for Discord",
    badge: "record",
    icon: <PlatformBox src="/images/platforms/roblox.svg" bg={COLORS.roblox} size={7} />,
  },
  {
    time: "11:02 AM",
    source: "Discord voice",
    detail: 'Voice call · 14m · "you good?"',
    badge: "voice",
    icon: <PlatformBox src="/images/platforms/discord.svg" bg={COLORS.discord} size={7} />,
  },
  {
    time: "3:31 PM",
    source: "Snapchat",
    detail: "Vanishing message recovered",
    badge: "capture",
    icon: <PlatformBox src="/images/platforms/snapchat.svg" bg={COLORS.snapchat} size={7} />,
  },
];

function BadgeIcon({ kind }: { kind: EvidenceRow["badge"] }) {
  if (kind === "record") {
    return (
      <span
        className="inline-flex items-center gap-1 font-bold rounded-full px-2"
        style={{ background: "#FEE2E2", color: "#B91C1C", fontSize: "9px", height: "18px" }}
      >
        <span className="block w-1.5 h-1.5 rounded-full bg-red-600" />
        REC
      </span>
    );
  }
  if (kind === "voice") {
    return (
      <span
        className="inline-flex items-center gap-1 font-bold rounded-full px-2"
        style={{ background: "#EFF6FF", color: COLORS.redDeep, fontSize: "9px", height: "18px" }}
      >
        Voice
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 font-bold rounded-full px-2"
      style={{ background: "#F3E8FF", color: "#6B21A8", fontSize: "9px", height: "18px" }}
    >
      Saved
    </span>
  );
}

export function EvidenceScreenMock({
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
            capture
          </>
        }
        subtitle={
          <>
            Every chat. Every call.
            <br />
            Every flag.
          </>
        }
        iconNode={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M17 10.5V6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-4.5l4 4v-11l-4 4z" />
          </svg>
        }
      />

      <div className="px-3 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 px-3 py-3 grid grid-cols-4 gap-1 items-center">
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.text, fontSize: "17px" }}>
              147h
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "9px" }}>
              Played
            </div>
          </div>
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.text, fontSize: "17px" }}>
              12.4K
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "9px" }}>
              Chats
            </div>
          </div>
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.text, fontSize: "17px" }}>
              8h
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "9px" }}>
              Voice
            </div>
          </div>
          <div className="text-center">
            <div className="font-bold leading-none flex items-center justify-center gap-0.5" style={{ color: "#B91C1C", fontSize: "17px" }}>
              <span className="block w-1.5 h-1.5 rounded-full bg-red-600" />
              3
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "9px" }}>
              Recordings
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900" style={{ fontSize: "13px" }}>
          Today&rsquo;s timeline
        </h3>
        <span className="font-semibold" style={{ color: COLORS.textMuted, fontSize: "11px" }}>
          Mar 15
        </span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {EVIDENCE.map((e, i) => (
          <div
            key={e.source + i}
            className="bg-white rounded-xl border border-gray-100 p-2.5 flex items-center gap-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {e.icon}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 leading-tight flex items-center gap-1.5" style={{ fontSize: "11px" }}>
                <span className="font-mono font-bold" style={{ color: COLORS.textMuted, fontSize: "9px" }}>
                  {e.time}
                </span>
                {e.source}
              </p>
              <p className="text-gray-500 leading-snug mt-0.5" style={{ fontSize: "9px" }}>
                {e.detail}
              </p>
            </div>
            <BadgeIcon kind={e.badge} />
          </div>
        ))}
      </div>

      <p
        className="text-center mt-3 px-4 font-semibold leading-snug"
        style={{ color: COLORS.textMuted, fontSize: "10px" }}
      >
        When you sit down to talk, you&rsquo;ve got the timeline.
      </p>

      <BottomNav activeTab="Activity" />
    </PhoneFrame>
  );
}
