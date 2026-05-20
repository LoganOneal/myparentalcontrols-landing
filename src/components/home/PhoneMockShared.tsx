/**
 * Shared building blocks for the AlertsForDangers feature mockups. Every
 * mock screen uses the same phone shell + red MPC hero header so the
 * mockups feel like screens of one real app.
 */

import * as React from "react";

export const COLORS = {
  red: "#FF3838",
  redDeep: "#E62929",
  redDark: "#C81515",
  high: "#FF3838",
  medium: "#F59E0B",
  low: "#22C55E",
  pinkBg: "#FFEDED",
  discord: "#5865F2",
  roblox: "#E2231A",
  snapchat: "#FFFC00",
  tiktok: "#000000",
  instagram: "#E1306C",
  text: "#111827",
  textMuted: "#6B7280",
};

export function PhoneFrame({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bg-white rounded-[36px] overflow-hidden shadow-2xl ring-1 ring-black/5 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function StatusBarRow() {
  return (
    <div
      className="flex items-center justify-between text-white px-1"
      style={{ fontSize: "10px" }}
    >
      <span className="font-semibold">9:41</span>
      <span className="flex items-center gap-1 opacity-90" aria-hidden>
        <svg width="12" height="8" viewBox="0 0 12 8">
          <rect x="0" y="5" width="2" height="3" fill="white" />
          <rect x="3" y="3" width="2" height="5" fill="white" />
          <rect x="6" y="1" width="2" height="7" fill="white" />
          <rect x="9" y="0" width="2" height="8" fill="white" />
        </svg>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="white">
          <path d="M6 0C3.5 0 1.3 1 0 2.5L1.5 4C2.6 2.9 4.2 2.2 6 2.2c1.8 0 3.4.7 4.5 1.8L12 2.5C10.7 1 8.5 0 6 0z" />
        </svg>
        <svg width="16" height="8" viewBox="0 0 16 8">
          <rect
            x="0"
            y="0"
            width="14"
            height="8"
            rx="2"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <rect x="2" y="2" width="9" height="4" fill="white" />
        </svg>
      </span>
    </div>
  );
}

export function Avatar({
  from,
  to,
  className = "",
}: {
  from: string;
  to: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        boxShadow: "0 0 0 2px white",
      }}
      aria-hidden
    />
  );
}

/**
 * Red gradient header — branded MPC hero on every mock. iconNode is the
 * large white icon shown in the rounded badge; title/subtitle are the
 * main headline + supporting line.
 */
export function HeroHeader({
  title,
  subtitle,
  iconNode,
  badgeCount,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  iconNode: React.ReactNode;
  badgeCount?: number;
}) {
  return (
    <div
      className="relative px-4 pt-3 pb-10"
      style={{
        background: `linear-gradient(180deg, ${COLORS.red} 0%, ${COLORS.redDeep} 100%)`,
      }}
    >
      <StatusBarRow />
      <div className="flex items-center justify-between mt-3">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-full"
          style={{
            background: "rgba(255,255,255,0.18)",
            boxShadow: "0 0 0 2px white",
          }}
          aria-hidden
        >
          <Avatar from="#FFD58A" to="#FF8AA1" className="w-7 h-7" />
        </span>
        <div className="relative">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={COLORS.text}
              aria-hidden
            >
              <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zM18 16v-5a6 6 0 0 0-5-5.91V4a1 1 0 1 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </span>
          {badgeCount !== undefined && badgeCount > 0 && (
            <span
              className="absolute -top-1 -right-1 font-bold text-white rounded-full flex items-center justify-center"
              style={{
                background: COLORS.redDark,
                fontSize: "9px",
                minWidth: 16,
                height: 16,
                padding: "0 4px",
              }}
            >
              {badgeCount}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <span
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.15)",
            boxShadow: "0 0 0 2px rgba(255,255,255,0.85)",
          }}
        >
          {iconNode}
        </span>
      </div>
      <h2
        className="text-center text-white font-bold leading-[1.1] mt-3"
        style={{ fontSize: "20px" }}
      >
        {title}
      </h2>
      <p
        className="text-center text-white/90 mt-2"
        style={{ fontSize: "11px", lineHeight: "1.4" }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export function BottomNav({
  activeTab = "Alerts",
}: {
  activeTab?: "Alerts" | "Activity" | "Children" | "Settings";
}) {
  const tabs: Array<{
    icon: string;
    label: "Alerts" | "Activity" | "Children" | "Settings";
  }> = [
    { icon: "🚨", label: "Alerts" },
    { icon: "📊", label: "Activity" },
    { icon: "👨‍👩‍👧", label: "Children" },
    { icon: "⚙", label: "Settings" },
  ];
  return (
    <>
      <div className="mt-4 border-t border-gray-100 grid grid-cols-4 px-3 pt-2 pb-3">
        {tabs.map((t) => {
          const active = t.label === activeTab;
          return (
            <div
              key={t.label}
              className="flex flex-col items-center gap-0.5"
              style={{ color: active ? COLORS.red : COLORS.textMuted }}
            >
              <span style={{ fontSize: "14px" }}>{t.icon}</span>
              <span
                className="font-semibold leading-none"
                style={{ fontSize: "9px" }}
              >
                {t.label}
              </span>
              {active && (
                <span
                  className="block w-6 h-[3px] rounded-full mt-0.5"
                  style={{ background: COLORS.red }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="h-1 flex justify-center pb-2">
        <span className="block w-24 h-1 rounded-full bg-gray-300" />
      </div>
    </>
  );
}

export function PlatformBox({
  src,
  bg,
  size = 9,
}: {
  src: string;
  bg: string;
  size?: number;
}) {
  const dim = `${size * 4}px`;
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg shrink-0"
      style={{ backgroundColor: bg, width: dim, height: dim }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        style={{
          width: `${size * 1.8}px`,
          height: `${size * 1.8}px`,
          filter: "brightness(0) invert(1)",
        }}
      />
    </span>
  );
}

export function GrassBlockBox({ size = 9 }: { size?: number }) {
  const dim = `${size * 4}px`;
  return (
    <span
      aria-hidden
      className="inline-flex rounded-lg overflow-hidden shrink-0 ring-1 ring-black/5"
      style={{ width: dim, height: dim }}
    >
      <svg viewBox="0 0 8 8" className="w-full h-full" shapeRendering="crispEdges">
        <rect width="8" height="8" fill="#8B5A2B" />
        <rect x="1" y="4" width="1" height="1" fill="#704721" />
        <rect x="5" y="5" width="1" height="1" fill="#704721" />
        <rect x="3" y="6" width="1" height="1" fill="#704721" />
        <rect x="6" y="3" width="1" height="1" fill="#704721" />
        <rect x="2" y="6" width="1" height="1" fill="#A67244" />
        <rect x="4" y="4" width="1" height="1" fill="#A67244" />
        <rect x="0" y="0" width="8" height="3" fill="#5BA63B" />
        <rect x="0" y="2" width="8" height="1" fill="#4D8F31" />
        <rect x="1" y="1" width="1" height="1" fill="#6EBF49" />
        <rect x="3" y="0" width="1" height="1" fill="#6EBF49" />
        <rect x="6" y="1" width="1" height="1" fill="#6EBF49" />
        <rect x="5" y="0" width="1" height="1" fill="#4D8F31" />
      </svg>
    </span>
  );
}
