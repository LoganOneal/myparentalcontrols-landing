/**
 * Feature 4 mockup — "Sees encrypted and disappearing messages on the device".
 * Shows a "Captured messages" screen with snippets of vanished/E2E-encrypted
 * messages that have been preserved by the on-device agent.
 */

import * as React from "react";
import {
  COLORS,
  PhoneFrame,
  HeroHeader,
  BottomNav,
  PlatformBox,
} from "@/components/home/PhoneMockShared";

type Captured = {
  platform: string;
  platformNode: React.ReactNode;
  status: string;
  statusBg: string;
  statusFg: string;
  snippet: string;
  redacted: boolean;
  time: string;
  level: "High" | "Medium" | "Low";
};

const CAPTURED: Captured[] = [
  {
    platform: "Snapchat",
    platformNode: <PlatformBox src="/images/platforms/snapchat.svg" bg="#FFFC00" size={9} />,
    status: "Vanished 2 min ago",
    statusBg: "#FFF7C8",
    statusFg: "#8A6E00",
    snippet:
      "send me a pic — i won’t screenshot promise",
    redacted: false,
    time: "10:24 AM",
    level: "High",
  },
  {
    platform: "Instagram",
    platformNode: <PlatformBox src="/images/platforms/instagram.svg" bg="#E1306C" size={9} />,
    status: "Disappearing DM",
    statusBg: "#FFE0F0",
    statusFg: "#B91C5C",
    snippet:
      "lets keep this on snap — my parents check this app",
    redacted: false,
    time: "9:55 AM",
    level: "High",
  },
  {
    platform: "WhatsApp",
    platformNode: <PlatformBox src="/images/platforms/whatsapp.svg" bg="#25D366" size={9} />,
    status: "End-to-end encrypted",
    statusBg: "#E3F8E9",
    statusFg: "#16803C",
    snippet: "im 14 how old r u",
    redacted: false,
    time: "9:30 AM",
    level: "Medium",
  },
  {
    platform: "Discord",
    platformNode: <PlatformBox src="/images/platforms/discord.svg" bg={COLORS.discord} size={9} />,
    status: "Self-deleted by sender",
    statusBg: "#E7E5FF",
    statusFg: COLORS.discord,
    snippet:
      "[image withheld — flagged sexual content]",
    redacted: true,
    time: "Yesterday",
    level: "High",
  },
];

function SeverityPill({ level }: { level: Captured["level"] }) {
  const bg =
    level === "High" ? COLORS.high : level === "Medium" ? COLORS.medium : COLORS.low;
  return (
    <span
      className="inline-flex items-center text-white font-semibold rounded-full px-2 py-[2px]"
      style={{ backgroundColor: bg, fontSize: "9px" }}
    >
      {level}
    </span>
  );
}

export function CapturedScreenMock({
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
            Captured before
            <br />
            they disappeared.
          </>
        }
        subtitle={
          <>
            Encrypted, vanishing, and
            <br />
            deleted messages — preserved.
          </>
        }
        iconNode={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M12 17a2 2 0 0 0 2-2v-3a2 2 0 1 0-4 0v3a2 2 0 0 0 2 2zm6-9h-1V6a5 5 0 0 0-10 0v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6a3.1 3.1 0 1 1 6.2 0v2H8.9V6z" />
          </svg>
        }
      />

      <div className="px-3 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 px-3 py-3 flex items-center justify-around">
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.red, fontSize: "20px" }}>
              24
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Captured today
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.text, fontSize: "20px" }}>
              7
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              E2E encrypted
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.text, fontSize: "20px" }}>
              12
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Vanishing
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900" style={{ fontSize: "13px" }}>
          Recovered messages
        </h3>
        <span
          className="font-semibold flex items-center gap-0.5"
          style={{ color: COLORS.red, fontSize: "11px" }}
        >
          View all <span aria-hidden>›</span>
        </span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {CAPTURED.map((c, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 p-2.5 flex items-start gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {c.platformNode}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className="font-bold text-gray-900 leading-tight"
                  style={{ fontSize: "11px" }}
                >
                  {c.platform}
                </span>
                <span
                  className="inline-flex items-center rounded-full px-2 py-[1px] font-semibold leading-none"
                  style={{
                    backgroundColor: c.statusBg,
                    color: c.statusFg,
                    fontSize: "9px",
                  }}
                >
                  {c.status}
                </span>
              </div>
              <p
                className={`leading-snug mt-1 ${
                  c.redacted ? "italic" : ""
                }`}
                style={{ fontSize: "10px", color: c.redacted ? COLORS.textMuted : COLORS.text }}
              >
                &ldquo;{c.snippet}&rdquo;
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-gray-400" style={{ fontSize: "9px" }}>
                {c.time}
              </span>
              <SeverityPill level={c.level} />
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab="Alerts" />
    </PhoneFrame>
  );
}
