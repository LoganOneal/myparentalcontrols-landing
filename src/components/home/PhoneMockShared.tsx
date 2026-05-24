/**
 * Shared building blocks for the AlertsForDangers feature mockups. Every
 * mock screen renders inside an iPhone X-style bezel so the mockups read as
 * screens of one real app on one real device.
 */

import * as React from "react";

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

export const BARE_PHONE_HEIGHT = 316;

/**
 * iPhone X bezel + screen wrapper (or a plain rounded card when `bare`).
 *
 * - **`bare = false` (default)** — renders a local iPhone X-style bezel.
 *   Used on desktop where there's room for the full meta-bezel framing.
 *
 * - **`bare = true`** — renders just the screen content in a rounded white
 *   card with a 9:19.5 aspect ratio (the iPhone aspect, minus the bezel).
 *   Used on mobile where the user is already on a phone and the bezel reads
 *   as redundant.
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
        className={`relative h-[316px] w-full overflow-hidden rounded-[32px] bg-[#F5F5F7] shadow-[0_16px_42px_rgba(15,23,42,0.14)] ring-1 ring-black/5 ${className}`}
        style={{
          ...style,
          height: style?.height ?? BARE_PHONE_HEIGHT,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/80"
        />
        <div className="flex h-full w-full flex-col overflow-hidden pb-2">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`relative w-[405px] max-w-full rounded-[58px] bg-[#111318] p-[15px] shadow-[0_28px_80px_rgba(15,23,42,0.22),inset_0_0_0_1px_rgba(255,255,255,0.12)] ${className}`}
      style={style}
      aria-label="Phone app preview"
    >
      <div
        aria-hidden
        className="absolute left-[-3px] top-[120px] h-16 w-[3px] rounded-l-full bg-[#111318]"
      />
      <div
        aria-hidden
        className="absolute right-[-3px] top-[160px] h-24 w-[3px] rounded-r-full bg-[#111318]"
      />
      <div className="relative aspect-[375/812] overflow-hidden rounded-[44px] bg-[#F5F5F7] ring-1 ring-white/10">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 z-20 h-7 w-36 -translate-x-1/2 rounded-b-[22px] bg-[#111318]"
        />
        <div className="flex h-full w-full flex-col overflow-hidden bg-[#F5F5F7]">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * iOS-style status bar — refined glyphs (4 stepped signal dots, two-arc wifi,
 * battery with cap nub and 78% fill). Keeps the 10px scale of the rest of
 * the phone but reads as a real device, not a mock.
 */
export function StatusBarRow() {
  return (
    <div
      className="flex items-center justify-between text-white px-1"
      style={{ fontSize: "10px", letterSpacing: "0.02em" }}
    >
      <span className="font-semibold tabular-nums">9:41</span>
      <span className="flex items-center gap-[5px]" aria-hidden>
        {/* Signal — 4 rounded bars stepping up. */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="white">
          <rect x="0" y="7" width="2.4" height="3" rx="0.6" />
          <rect x="3.4" y="5" width="2.4" height="5" rx="0.6" />
          <rect x="6.8" y="3" width="2.4" height="7" rx="0.6" />
          <rect x="10.2" y="1" width="2.4" height="9" rx="0.6" />
        </svg>
        {/* WiFi — three nested arcs + dot. */}
        <svg width="13" height="10" viewBox="0 0 13 10" fill="white">
          <path d="M6.5 0a10 10 0 0 0-6.5 2.4l1 1.1a8.5 8.5 0 0 1 11 0l1-1.1A10 10 0 0 0 6.5 0z" />
          <path d="M6.5 3.2a6.5 6.5 0 0 0-4.2 1.5l1 1.1a5 5 0 0 1 6.4 0l1-1.1a6.5 6.5 0 0 0-4.2-1.5z" />
          <circle cx="6.5" cy="8.4" r="1.3" />
        </svg>
        {/* Battery — body, cap nub, ~78% fill. */}
        <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden>
          <rect
            x="0.5"
            y="0.5"
            width="18"
            height="9"
            rx="2.2"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.85"
          />
          <rect x="19.5" y="3.2" width="1.6" height="3.6" rx="0.5" fill="white" opacity="0.85" />
          <rect x="2" y="2" width="14" height="6" rx="1.3" fill="white" />
        </svg>
      </span>
    </div>
  );
}

/**
 * Round avatar — gradient circle with optional monogram letter centered on
 * top. The monogram (e.g. "L" for Lily) is what reads as "real user", not
 * a placeholder. The white ring is rendered as an inline border so the
 * monogram inherits it correctly when the parent applies shadow.
 */
export function Avatar({
  from,
  to,
  initial,
  className = "",
}: {
  from: string;
  to: string;
  initial?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full text-white font-bold ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        boxShadow: "0 0 0 2px white",
        fontSize: "11px",
        letterSpacing: "0.02em",
        textShadow: "0 1px 0 rgba(0,0,0,0.12)",
      }}
      aria-hidden
    >
      {initial}
    </span>
  );
}

/** Inline SVG dot-pattern URL used as a low-opacity texture in HeroHeader.
 *  Single source of truth so every mock's hero gets the same texture. */
const DOT_PATTERN_BG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='1.2' cy='1.2' r='1.2' fill='white' fill-opacity='0.07'/></svg>\")";

/**
 * Blue gradient header — branded MPC hero on every mock.
 *
 * Layered backgrounds (top → bottom):
 *   1. Radial highlight at top-center for premium "lit from above" feel
 *   2. Low-opacity dot pattern for texture (vs a flat gradient)
 *   3. 3-stop linear gradient base
 *
 * `iconNode` is the large white icon in the rounded badge; `title`/`subtitle`
 * are the main headline + supporting line. `avatarInitial` defaults to "L"
 * (Lily, the canonical example child) so every mock looks like the same
 * family in one app.
 */
export function HeroHeader({
  title,
  subtitle,
  iconNode,
  badgeCount,
  avatarInitial = "L",
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  iconNode: React.ReactNode;
  badgeCount?: number;
  avatarInitial?: string;
}) {
  return (
    <div
      className="relative shrink-0 px-4 pt-3 pb-8 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 50% -10%, rgba(255,255,255,0.25), transparent 70%),
          linear-gradient(180deg, ${COLORS.red} 0%, ${COLORS.redDeep} 55%, ${COLORS.redDark} 100%)
        `,
      }}
    >
      {/* Texture overlay — sits above the gradient, below all interactive
          children. Pointer-events-none so it doesn't intercept anything. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: DOT_PATTERN_BG }}
      />

      {/* Content wrapper sits above the texture. */}
      <div className="relative">
        <StatusBarRow />
        <div className="flex items-center justify-between mt-3">
          <Avatar
            from="#FFD58A"
            to="#FF8AA1"
            initial={avatarInitial}
            className="w-9 h-9"
          />
          <div className="relative">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
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
                className="absolute -top-1 -right-1 font-bold text-white rounded-full flex items-center justify-center ring-2 ring-white/80"
                style={{
                  background: COLORS.high,
                  fontSize: "9px",
                  minWidth: 16,
                  height: 16,
                  padding: "0 4px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                }}
              >
                {badgeCount}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <span
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.18)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.35), 0 0 0 1.5px rgba(255,255,255,0.85), 0 8px 20px rgba(0,0,0,0.18)",
            }}
          >
            {iconNode}
          </span>
        </div>
        <h2
          className="text-center text-white font-bold leading-[1.05] mt-4 tracking-tight"
          style={{
            fontSize: "21px",
            textShadow: "0 1px 0 rgba(0,0,0,0.10)",
          }}
        >
          {title}
        </h2>
        <p
          className="text-center text-white/85 mt-4"
          style={{ fontSize: "11px", lineHeight: "1.55" }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/**
 * Compact pill used for footer-style status moments. The leading dot can be
 * turned off (`dot=false`) for variants that don't need a live-status feel.
 * `tone` swaps the dot color for context.
 */
export function FooterPill({
  text,
  dot = true,
  tone = "live",
}: {
  text: string;
  dot?: boolean;
  tone?: "live" | "alert" | "neutral";
}) {
  const dotColor =
    tone === "alert" ? COLORS.high : tone === "neutral" ? COLORS.textMuted : COLORS.low;
  return (
    <div className="mt-3 mb-2 flex justify-center px-4">
      <span
        className="inline-flex items-center gap-1.5 font-semibold rounded-full px-2.5 py-1"
        style={{
          background: "#F1F5F9",
          color: COLORS.text,
          fontSize: "9px",
          letterSpacing: "0.04em",
        }}
      >
        {dot && (
          <span
            aria-hidden
            className="block w-1.5 h-1.5 rounded-full mock-anim-breathe"
            style={{ background: dotColor }}
          />
        )}
        {text}
      </span>
    </div>
  );
}

export function PlatformBox({
  src,
  bg,
  size = 8,
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
export function LaptopBox({ size = 8, bg = "#0F172A" }: { size?: number; bg?: string }) {
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
export function PhoneBox({ size = 8, bg = "#0F172A" }: { size?: number; bg?: string }) {
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

export function GrassBlockBox({ size = 8 }: { size?: number }) {
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
