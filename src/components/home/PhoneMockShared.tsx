/**
 * Shared building blocks for the AlertsForDangers feature mockups. Every
 * mock screen renders inside an iPhone X bezel (via react-device-frameset,
 * which wraps marvelapp/devices.css) so the mockups read as screens of one
 * real app on a real device.
 */

import * as React from "react";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

/**
 * `red/redDeep/redDark` are vestigially named — they hold the brand/theme
 * color used in the hero header gradient, active tab indicator, and badge
 * counter. The site theme is Cobalt Blue, so these values are blue.
 *
 * `high/medium/low` stay semantic — high severity is universally red, medium
 * amber, low green. Don't conflate the two groups.
 */
export const COLORS = {
  red: "#2563EB",
  redDeep: "#1D4ED8",
  redDark: "#1E40AF",
  high: "#FF3838",
  medium: "#F59E0B",
  low: "#22C55E",
  pinkBg: "#EFF6FF",
  discord: "#5865F2",
  roblox: "#E2231A",
  snapchat: "#FFFC00",
  tiktok: "#000000",
  instagram: "#E1306C",
  text: "#111827",
  textMuted: "#6B7280",
};

/**
 * iPhone X bezel + screen wrapper (or a plain rounded card when `bare`).
 *
 * - **`bare = false` (default)** — renders the marvelapp iPhone X bezel via
 *   `react-device-frameset`. Used on desktop where there's room for the
 *   full meta-bezel framing.
 *
 * - **`bare = true`** — renders just the screen content in a rounded white
 *   card with a 9:19.5 aspect ratio (the iPhone aspect, minus the bezel).
 *   Used on mobile where the user is already on a phone, the bezel reads
 *   as redundant, and the DeviceFrameset's content-box padding + non-
 *   layout-affecting CSS transforms produce a phone that visually overlaps
 *   sibling content.
 */
export function PhoneFrame({
  children,
  className = "",
  style,
  bare = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  bare?: boolean;
}) {
  if (bare) {
    return (
      <div
        className={`bg-white rounded-3xl overflow-hidden shadow-md ring-1 ring-black/5 flex flex-col w-full ${className}`}
        style={{ aspectRatio: "9 / 19.5", ...style }}
      >
        {children}
      </div>
    );
  }
  return (
    <div className={className} style={style}>
      <DeviceFrameset device="iPhone X" width={375} height={812}>
        <div className="flex flex-col h-full w-full bg-white overflow-hidden">
          {children}
        </div>
      </DeviceFrameset>
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
      <div className="mt-auto border-t border-gray-100 grid grid-cols-4 px-3 pt-2 pb-2">
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

/** Colored chip with an inline laptop SVG. Same sizing convention as PlatformBox. */
export function LaptopBox({ size = 9, bg = "#0F172A" }: { size?: number; bg?: string }) {
  const dim = `${size * 4}px`;
  const iconDim = `${size * 1.8}px`;
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg shrink-0"
      style={{ backgroundColor: bg, width: dim, height: dim }}
    >
      <svg
        width={iconDim}
        height={iconDim}
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden
      >
        <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10H4V5zm-2 11h20v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1z" />
      </svg>
    </span>
  );
}

/** Colored chip with an inline iPhone-style SVG. */
export function PhoneBox({ size = 9, bg = "#0F172A" }: { size?: number; bg?: string }) {
  const dim = `${size * 4}px`;
  const iconDim = `${size * 1.8}px`;
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg shrink-0"
      style={{ backgroundColor: bg, width: dim, height: dim }}
    >
      <svg
        width={iconDim}
        height={iconDim}
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden
      >
        <path d="M7 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7zm0 2h3v1h4V4h3v15H7V4zm5 16a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
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
