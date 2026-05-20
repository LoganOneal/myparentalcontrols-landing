/**
 * Stylized phone mockup for the "Real-time alerts" feature card in
 * AlertsForDangers. Built entirely in JSX so it can use real platform
 * icons from public/images/platforms/ and stays editable (no need to
 * regenerate a PNG when copy or branding changes).
 *
 * Designed to fit ~305–350px width. Pair with `opacity` from the parent
 * for fade transitions.
 */

import * as React from "react";

const COLORS = {
  red: "#FF3838",
  redDeep: "#E62929",
  redDark: "#C81515",
  high: "#FF3838",
  medium: "#F59E0B",
  pinkBg: "#FFEDED",
  discord: "#5865F2",
  roblox: "#E2231A",
  text: "#111827",
  textMuted: "#6B7280",
};

/** Tiny rounded "child avatar" stub. The reference uses real photos; we
 *  use a soft gradient disc so we don't need to source faces. */
function Avatar({
  from,
  to,
  ring = "white",
  className = "",
}: {
  from: string;
  to: string;
  ring?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full ring-2 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        boxShadow: `0 0 0 2px ${ring}`,
      }}
      aria-hidden
    />
  );
}

function SeverityPill({ level }: { level: "High" | "Medium" }) {
  const bg = level === "High" ? COLORS.high : COLORS.medium;
  return (
    <span
      className="inline-flex items-center text-white font-semibold rounded-full px-2 py-[2px]"
      style={{ backgroundColor: bg, fontSize: "9px" }}
    >
      {level}
    </span>
  );
}

function AppChip({
  label,
  bg,
  fg,
}: {
  label: string;
  bg: string;
  fg: string;
}) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-[1px] font-semibold leading-none"
      style={{ backgroundColor: bg, color: fg, fontSize: "9px" }}
    >
      {label}
    </span>
  );
}

function StatTile({
  count,
  label,
  iconNode,
  iconBg,
}: {
  count: number;
  label: string;
  iconNode: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="flex items-center gap-1.5">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-md"
          style={{ backgroundColor: iconBg }}
        >
          {iconNode}
        </span>
        <span
          className="font-bold leading-none"
          style={{ color: COLORS.red, fontSize: "18px" }}
        >
          {count}
        </span>
      </div>
      <span
        className="font-semibold leading-none text-gray-800"
        style={{ fontSize: "10px" }}
      >
        {label}
      </span>
    </div>
  );
}

function PlatformBox({
  src,
  bg,
}: {
  src: string;
  bg: string;
}) {
  return (
    <span
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
      style={{ backgroundColor: bg }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="w-4 h-4"
        style={{ filter: "brightness(0) invert(1)" }}
      />
    </span>
  );
}

function GrassBlockBox() {
  return (
    <span
      aria-hidden
      className="inline-flex w-9 h-9 rounded-lg overflow-hidden shrink-0 ring-1 ring-black/5"
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

function AlertRow({
  platformNode,
  avatar,
  title,
  appLabel,
  appLabelBg,
  appLabelFg,
  description,
  time,
  level,
}: {
  platformNode: React.ReactNode;
  avatar: React.ReactNode;
  title: string;
  appLabel: string;
  appLabelBg: string;
  appLabelFg: string;
  description: string;
  time: string;
  level: "High" | "Medium";
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-2.5 flex items-start gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-center -space-x-2 shrink-0">
        {platformNode}
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p
            className="font-bold leading-tight text-gray-900"
            style={{ fontSize: "11px" }}
          >
            {title}
          </p>
          <AppChip label={appLabel} bg={appLabelBg} fg={appLabelFg} />
        </div>
        <p
          className="text-gray-500 leading-snug mt-1"
          style={{ fontSize: "9px" }}
        >
          {description}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-gray-400" style={{ fontSize: "9px" }}>
          {time}
        </span>
        <SeverityPill level={level} />
      </div>
      <span className="text-gray-300 self-center -ml-1" aria-hidden>
        ›
      </span>
    </div>
  );
}

export function AlertsScreenMock({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bg-white rounded-[36px] overflow-hidden shadow-2xl ring-1 ring-black/5 ${className}`}
      style={style}
    >
      {/* Red gradient hero */}
      <div
        className="relative px-4 pt-3 pb-10"
        style={{
          background: `linear-gradient(180deg, ${COLORS.red} 0%, ${COLORS.redDeep} 100%)`,
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between text-white px-1" style={{ fontSize: "10px" }}>
          <span className="font-semibold">9:41</span>
          <span className="flex items-center gap-1 opacity-90" aria-hidden>
            <svg width="12" height="8" viewBox="0 0 12 8"><rect x="0" y="5" width="2" height="3" fill="white"/><rect x="3" y="3" width="2" height="5" fill="white"/><rect x="6" y="1" width="2" height="7" fill="white"/><rect x="9" y="0" width="2" height="8" fill="white"/></svg>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="white"><path d="M6 0C3.5 0 1.3 1 0 2.5L1.5 4C2.6 2.9 4.2 2.2 6 2.2c1.8 0 3.4.7 4.5 1.8L12 2.5C10.7 1 8.5 0 6 0z"/></svg>
            <svg width="16" height="8" viewBox="0 0 16 8"><rect x="0" y="0" width="14" height="8" rx="2" fill="none" stroke="white" strokeWidth="1"/><rect x="2" y="2" width="9" height="4" fill="white"/></svg>
          </span>
        </div>

        {/* Top row: avatar + bell */}
        <div className="flex items-center justify-between mt-3">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: "rgba(255,255,255,0.18)", boxShadow: "0 0 0 2px white" }}
            aria-hidden
          >
            <Avatar from="#FFD58A" to="#FF8AA1" className="w-7 h-7" ring="transparent" />
          </span>

          <div className="relative">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.text} aria-hidden>
                <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zM18 16v-5a6 6 0 0 0-5-5.91V4a1 1 0 1 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
            </span>
            <span
              className="absolute -top-1 -right-1 font-bold text-white rounded-full flex items-center justify-center"
              style={{ background: COLORS.redDark, fontSize: "9px", minWidth: 16, height: 16, padding: "0 4px" }}
            >
              5
            </span>
          </div>
        </div>

        {/* Warning triangle icon */}
        <div className="flex justify-center mt-3">
          <span
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.15)", boxShadow: "0 0 0 2px rgba(255,255,255,0.85)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M12 2 1 21h22L12 2zm-1 7h2v6h-2V9zm0 8h2v2h-2v-2z" />
            </svg>
          </span>
        </div>

        <h2
          className="text-center text-white font-bold leading-[1.1] mt-3"
          style={{ fontSize: "20px" }}
        >
          Your child may be
          <br />
          at risk online
        </h2>
        <p
          className="text-center text-white/90 mt-2"
          style={{ fontSize: "11px", lineHeight: "1.4" }}
        >
          Real-time alerts across the
          <br />
          apps they use most.
        </p>
      </div>

      {/* Stats card overlapping the hero */}
      <div className="px-3 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 px-2 py-3 grid grid-cols-4 gap-1">
          <StatTile
            count={5}
            label="Total Alerts"
            iconBg="#FFE5E5"
            iconNode={
              <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.red} aria-hidden>
                <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3zm0 6h2v6h-2V8zm0 8h2v2h-2v-2z" />
              </svg>
            }
          />
          <StatTile
            count={2}
            label="Roblox"
            iconBg={COLORS.roblox}
            iconNode={
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/images/platforms/roblox.svg"
                alt=""
                aria-hidden
                width={14}
                height={14}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            }
          />
          <StatTile
            count={2}
            label="Minecraft"
            iconBg="#5BA63B"
            iconNode={
              <svg viewBox="0 0 8 8" width="14" height="14" shapeRendering="crispEdges" aria-hidden>
                <rect width="8" height="8" fill="#8B5A2B" />
                <rect x="0" y="0" width="8" height="3" fill="#5BA63B" />
                <rect x="0" y="2" width="8" height="1" fill="#4D8F31" />
              </svg>
            }
          />
          <StatTile
            count={1}
            label="Discord"
            iconBg={COLORS.discord}
            iconNode={
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/images/platforms/discord.svg"
                alt=""
                aria-hidden
                width={14}
                height={14}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            }
          />
        </div>
      </div>

      {/* Recent alerts header */}
      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900" style={{ fontSize: "13px" }}>
          Recent Alerts
        </h3>
        <span className="font-semibold flex items-center gap-0.5" style={{ color: COLORS.red, fontSize: "11px" }}>
          View all <span aria-hidden>›</span>
        </span>
      </div>

      {/* Alert cards */}
      <div className="px-4 mt-2 space-y-2">
        <AlertRow
          platformNode={<PlatformBox src="/images/platforms/discord.svg" bg={COLORS.discord} />}
          avatar={<Avatar from="#9DD7FF" to="#7CC0F6" className="w-7 h-7" />}
          title="Harmful Language Detected"
          appLabel="Discord"
          appLabelBg="#E7E5FF"
          appLabelFg={COLORS.discord}
          description="Inappropriate language flagged in Discord chat."
          time="10:24 AM"
          level="High"
        />
        <AlertRow
          platformNode={<PlatformBox src="/images/platforms/roblox.svg" bg={COLORS.roblox} />}
          avatar={<Avatar from="#FFC9D9" to="#FF8AA1" className="w-7 h-7" />}
          title="Suspicious Chat Activity"
          appLabel="Roblox"
          appLabelBg="#FFE0DE"
          appLabelFg={COLORS.roblox}
          description="Potentially suspicious conversation detected in Roblox."
          time="9:15 AM"
          level="Medium"
        />
        <AlertRow
          platformNode={<GrassBlockBox />}
          avatar={<Avatar from="#C8F0B2" to="#83D45F" className="w-7 h-7" />}
          title="Unsafe Conversation Detected"
          appLabel="Minecraft"
          appLabelBg="#E0F5D5"
          appLabelFg="#3F7322"
          description="Harassment or bullying behavior flagged in Minecraft chat."
          time="8:02 AM"
          level="Medium"
        />
      </div>

      {/* Bottom info banner */}
      <div className="px-3 mt-4">
        <div
          className="rounded-2xl flex items-center gap-2.5 p-2.5"
          style={{ background: COLORS.pinkBg }}
        >
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-full shrink-0"
            style={{ background: "rgba(255, 56, 56, 0.15)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={COLORS.red} aria-hidden>
              <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3zm0 6h2v6h-2V8zm0 8h2v2h-2v-2z" />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: "11px" }}>
              We&rsquo;re here to keep them safe
            </p>
            <p className="text-gray-700 leading-snug" style={{ fontSize: "9px" }}>
              We monitor conversations across apps in real time and alert
              you instantly.
            </p>
          </div>
          <span
            className="text-white font-semibold rounded-full px-3 py-1.5 shrink-0"
            style={{ background: COLORS.red, fontSize: "10px" }}
          >
            Learn More
          </span>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="mt-4 border-t border-gray-100 grid grid-cols-4 px-3 pt-2 pb-3">
        {[
          { icon: "🚨", label: "Alerts", active: true },
          { icon: "📊", label: "Activity", active: false },
          { icon: "👨‍👩‍👧", label: "Children", active: false },
          { icon: "⚙", label: "Settings", active: false },
        ].map((tab) => (
          <div
            key={tab.label}
            className="flex flex-col items-center gap-0.5"
            style={{ color: tab.active ? COLORS.red : COLORS.textMuted }}
          >
            <span style={{ fontSize: "14px" }}>{tab.icon}</span>
            <span
              className="font-semibold leading-none"
              style={{ fontSize: "9px" }}
            >
              {tab.label}
            </span>
            {tab.active && (
              <span
                className="block w-6 h-[3px] rounded-full mt-0.5"
                style={{ background: COLORS.red }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Home indicator bar */}
      <div className="h-1 flex justify-center pb-2">
        <span className="block w-24 h-1 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}
