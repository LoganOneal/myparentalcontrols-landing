import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------
 * Hero decorations
 *
 * Floating platform badges + an audio "recording" pill that surround
 * the kid in the hero photo. Each piece bobs on its own animation
 * (see globals.css `.animate-hero-float-*`) so the page feels alive.
 * Icons are inlined SVG so we don't ship raster brand-marks.
 * ------------------------------------------------------------------ */

const BADGE_SIZE: Record<"sm" | "md" | "lg", string> = {
  sm: "w-12 h-12 sm:w-14 sm:h-14",
  md: "w-16 h-16 sm:w-[72px] sm:h-[72px] lg:w-20 lg:h-20",
  lg: "w-20 h-20 sm:w-[88px] sm:h-[88px] lg:w-[104px] lg:h-[104px]",
};
const BADGE_ICON: Record<"sm" | "md" | "lg", string> = {
  sm: "w-5 h-5 sm:w-6 sm:h-6",
  md: "w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9",
  lg: "w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12",
};

function FloatingBadge({
  children,
  size,
  className,
  label,
}: {
  children: ReactNode;
  size: "sm" | "md" | "lg";
  className: string;
  label: string;
}) {
  return (
    <div
      className={`absolute rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(37,99,235,0.45)] ring-1 ring-inset ring-white/10 ${BADGE_SIZE[size]} ${className}`}
      role="img"
      aria-label={label}
    >
      <span className={`${BADGE_ICON[size]} flex items-center justify-center`}>
        {children}
      </span>
    </div>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.51 12.51 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function RobloxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden>
      <path d="M18.96 24 0 18.96 5.04 0 24 5.04 18.96 24Zm-9.17-13.38-1.16 4.34 4.34 1.16 1.16-4.34-4.34-1.16Z" />
    </svg>
  );
}

function MinecraftIcon() {
  // Isometric grass block — Minecraft's signature visual. Solid top face
  // = grass, translucent side faces = dirt, so the block reads even at
  // small sizes on a single-color background.
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden>
      {/* Top face (grass) */}
      <path d="M12 2 L22 7 L12 12 L2 7 Z" />
      {/* Left face (dirt) */}
      <path d="M2 7 L2 17 L12 22 L12 12 Z" opacity="0.6" />
      {/* Right face (dirt) */}
      <path d="M22 7 L22 17 L12 22 L12 12 Z" opacity="0.38" />
    </svg>
  );
}

function FortniteIcon() {
  // Bold, geometric capital F — Fortnite's brand mark in monochrome.
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden>
      <path d="M6 3 H18 V7 H11 V10 H17 V14 H11 V21 H6 Z" />
    </svg>
  );
}

/** Audio waveform pill — sits over the bottom of the hero figure to convey
 *  that the app is actively listening to in-game voice + chat. The bar
 *  heights are deliberately irregular and the bars animate with a staggered
 *  delay so the wave reads as moving sound, not a loading spinner. */
const WAVE_HEIGHTS = [
  35, 60, 45, 75, 90, 55, 70, 50, 95, 65, 80, 40, 85, 55, 70, 45, 90, 60, 75, 50,
];

function RecordingPill() {
  return (
    <div className="bg-white rounded-full pl-1.5 pr-3 sm:pl-2 sm:pr-4 py-1.5 sm:py-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.20),0_4px_12px_-4px_rgba(0,0,0,0.10)] flex items-center gap-2 sm:gap-3 border border-gray-100">
      {/* Play button */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-[1px]"
          aria-hidden
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Waveform bars */}
      <div className="flex items-center gap-[2px] sm:gap-[3px] h-5 sm:h-6">
        {WAVE_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className="block w-[2px] sm:w-[3px] rounded-full bg-[#2563EB] animate-hero-wave-bar"
            style={{
              height: `${h}%`,
              animationDelay: `${(i % 10) * 0.07}s`,
            }}
          />
        ))}
      </div>

      {/* REC indicator */}
      <div className="flex items-center gap-1.5 shrink-0 pl-0.5">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EF4444] animate-hero-rec-pulse" />
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
          REC
        </span>
      </div>
    </div>
  );
}

/**
 * Hero — grey background, two-column on desktop (text left, phone right).
 * Stacks to single column on mobile (text first, phone below).
 */
export function Hero() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#F1F2F4" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 pt-10 lg:pt-16 pb-10 lg:pb-16 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-12 items-center">
        {/* Left column — text + CTA. No bottom padding: the grid's
            items-center then vertically centers this column against the
            right-column imagery (which is the taller of the two). */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6">
          {/* H1 — threat-first. Desktop spec from design: Moderat-Black,
              56px / 67px line-height, rendered bold. Mobile/tablet scale
              down proportionally. */}
          <h1
            className="text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.1] lg:leading-[67px] tracking-tight"
            style={{
              fontFamily: "Moderat-Black, sans-serif",
              fontStyle: "normal",
              fontWeight: 700,
              color: "rgb(30, 30, 30)",
            }}
          >
            #1 parental security for the PC games your child plays.
          </h1>

          {/* Sub paragraph */}
          <p className="text-base sm:text-lg font-normal leading-relaxed text-gray-700 max-w-[560px]">
            Voice and chat monitoring across 3,000+ PC games &mdash; with
            real-time alerts the second something dangerous appears.
          </p>

          {/* Primary CTA — single low-friction "Try for Free" button.
              Centered on mobile, left-aligned on desktop along with the
              rest of the text column. */}
          <Link
            href="/signup"
            className="mt-2 inline-flex items-center justify-center bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8 py-4 transition-colors shadow-sm"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "18px",
              color: "rgb(255, 255, 255)",
            }}
          >
            Try for Free
          </Link>
        </div>

        {/* Right column — hero figure, bottom-flush with the grey hero
            background, surrounded by floating platform badges and an
            audio "recording" pill that show what MPC is watching
            in-game. Negative bottom margin cancels the inner pb so the
            figure's feet sit exactly on the section's bottom edge. */}
        <div className="flex justify-center lg:justify-end items-end self-end -mb-10 lg:-mb-16">
          <div className="relative w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[640px]">
            {/* Decorative tinted circles + soft halo behind the figure —
                pure visual texture, no semantic meaning. Layered z-0 so
                they sit behind both the photo (z-10) and the badges. */}
            {/* Soft cobalt halo directly behind the kid */}
            <div
              aria-hidden
              className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[78%] h-[68%] rounded-full bg-[#DBEAFE]/65 blur-2xl z-0"
            />
            {/* Large circle upper-right (behind head) */}
            <div
              aria-hidden
              className="absolute top-[6%] right-[2%] w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-[#BFDBFE]/70 z-0"
            />
            {/* Medium circle upper-left */}
            <div
              aria-hidden
              className="absolute top-[20%] -left-[2%] w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-[#DBEAFE] z-0"
            />
            {/* Medium circle mid-right */}
            <div
              aria-hidden
              className="absolute top-[50%] right-[14%] w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-[#BFDBFE]/55 z-0"
            />
            {/* Small circle lower-left */}
            <div
              aria-hidden
              className="absolute bottom-[22%] left-[10%] w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-[#DBEAFE]/85 z-0"
            />
            {/* Small accent circle bottom-right */}
            <div
              aria-hidden
              className="absolute bottom-[14%] right-[6%] w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#BFDBFE]/50 z-0"
            />
            {/* Tiny floating dots — extra spark, animated */}
            <div
              aria-hidden
              className="absolute top-[30%] right-[28%] w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#60A5FA] z-0 animate-hero-float-c"
            />
            <div
              aria-hidden
              className="absolute top-[58%] left-[20%] w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#3B82F6] z-0 animate-hero-float-d"
            />
            <div
              aria-hidden
              className="absolute bottom-[34%] right-[24%] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#93C5FD] z-0 animate-hero-float-a"
            />

            {/* Hero figure */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-figure.png"
              alt="Child gaming on a PC, monitored by MyParentalControls"
              width={1080}
              height={983}
              className="relative z-10 w-full h-auto block"
            />

            {/* Floating platform badges — each on its own bob animation
                so they don't move in unison. Positioned around the
                child's head/shoulders to read as the apps he's using. */}
            <FloatingBadge
              size="md"
              label="Discord"
              className="top-[8%] -left-1 sm:-left-2 lg:-left-4 z-20 animate-hero-float-a"
            >
              <DiscordIcon />
            </FloatingBadge>

            <FloatingBadge
              size="lg"
              label="Roblox"
              className="top-[1%] right-[4%] sm:right-[2%] z-20 animate-hero-float-b"
            >
              <RobloxIcon />
            </FloatingBadge>

            <FloatingBadge
              size="md"
              label="Minecraft"
              className="top-[44%] -right-1 sm:-right-2 lg:-right-3 z-20 animate-hero-float-c"
            >
              <MinecraftIcon />
            </FloatingBadge>

            <FloatingBadge
              size="md"
              label="Fortnite"
              className="top-[34%] -left-2 sm:-left-3 z-20 animate-hero-float-d"
            >
              <FortniteIcon />
            </FloatingBadge>

            {/* Audio "recording" pill — bottom of figure, slight left
                bleed. Conveys MPC listening to in-game voice/chat. */}
            <div className="absolute bottom-[10%] -left-2 sm:-left-5 lg:left-[-8%] z-30 animate-hero-float-c">
              <RecordingPill />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
