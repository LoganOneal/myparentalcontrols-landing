/**
 * Feature 2 mockup — "Coverage across 40+ apps, games, and chat platforms".
 * Shows a grid of monitored platforms with their connection status, mirroring
 * a "Connected apps" / "Monitored apps" screen in the parent app.
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

type Platform = {
  name: string;
  node: React.ReactNode;
  status: "Active" | "Idle";
  lastFlag?: string;
};

const PLATFORMS: Platform[] = [
  { name: "Roblox", node: <PlatformBox src="/images/platforms/roblox.svg" bg={COLORS.roblox} size={9} />, status: "Active", lastFlag: "10:24 AM" },
  { name: "Discord", node: <PlatformBox src="/images/platforms/discord.svg" bg={COLORS.discord} size={9} />, status: "Active", lastFlag: "9:15 AM" },
  { name: "Minecraft", node: <GrassBlockBox size={9} />, status: "Active", lastFlag: "8:02 AM" },
  { name: "Fortnite", node: <PlatformBox src="/images/platforms/fortnite.svg" bg="#2A3F8F" size={9} />, status: "Active" },
  { name: "Snapchat", node: <PlatformBox src="/images/platforms/snapchat.svg" bg="#FFFC00" size={9} />, status: "Idle" },
  { name: "TikTok", node: <PlatformBox src="/images/platforms/tiktok.svg" bg="#000000" size={9} />, status: "Active" },
  { name: "Instagram", node: <PlatformBox src="/images/platforms/instagram.svg" bg="#E1306C" size={9} />, status: "Idle" },
  { name: "YouTube", node: <PlatformBox src="/images/platforms/youtube.svg" bg="#FF0000" size={9} />, status: "Active" },
];

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className="block w-2 h-2 rounded-full"
      style={{ background: active ? COLORS.low : "#D1D5DB" }}
      aria-hidden
    />
  );
}

export function PlatformsScreenMock({
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
            Every app your kid
            <br />
            uses, watched.
          </>
        }
        subtitle={
          <>
            40+ platforms monitored in
            <br />
            real time on this device.
          </>
        }
        iconNode={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        }
      />

      {/* Stats card overlapping the hero */}
      <div className="px-3 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 px-3 py-3 flex items-center justify-around">
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.red, fontSize: "20px" }}>
              40+
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Total apps
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none flex items-center gap-1 justify-center" style={{ color: COLORS.low, fontSize: "20px" }}>
              12
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Active now
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.medium, fontSize: "20px" }}>
              3
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Flags today
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900" style={{ fontSize: "13px" }}>
          Connected apps
        </h3>
        <span
          className="font-semibold flex items-center gap-0.5"
          style={{ color: COLORS.red, fontSize: "11px" }}
        >
          View all <span aria-hidden>›</span>
        </span>
      </div>

      <div className="px-4 mt-2 grid grid-cols-2 gap-2">
        {PLATFORMS.map((p) => (
          <div
            key={p.name}
            className="bg-white rounded-xl border border-gray-100 p-2 flex items-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {p.node}
            <div className="flex-1 min-w-0">
              <p
                className="font-bold leading-tight text-gray-900 truncate"
                style={{ fontSize: "11px" }}
              >
                {p.name}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <StatusDot active={p.status === "Active"} />
                <span
                  className="text-gray-500 font-medium"
                  style={{ fontSize: "9px" }}
                >
                  {p.status}
                  {p.lastFlag ? ` · ${p.lastFlag}` : ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab="Activity" />
    </PhoneFrame>
  );
}
