/**
 * Feature 4 mockup — "Receipts. So you know exactly what happened."
 *
 * The centerpiece is a real Minecraft gameplay clip framed as a captured
 * screen-recording, with an animated audio waveform and a chat transcript
 * showing the kind of grooming exchange the product flags. Underneath sits
 * a short timeline of supporting evidence (Discord voice, Snapchat saved).
 *
 * The video is a CC-BY clip from Wikimedia Commons (see
 * public/videos/CREDITS.md for attribution).
 */

import * as React from "react";
import {
  COLORS,
  PhoneFrame,
} from "@/components/home/PhoneMockShared";


/** Animated waveform — 18 vertical bars at staggered animation delays so
 *  the wave reads as travelling left→right. Reuses the global
 *  `.animate-hero-wave-bar` keyframe from globals.css. */
function Waveform() {
  // Deterministic pseudo-random heights so the wave looks organic but the
  // SSR + client renders match.
  const heights = [
    6, 9, 4, 11, 7, 12, 5, 8, 10, 6, 4, 11, 8, 5, 9, 7, 10, 4,
  ];
  return (
    <div
      className="flex items-center justify-center gap-[2px] h-4 px-1"
      aria-hidden
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className="animate-hero-wave-bar block w-[2px] rounded-full"
          style={{
            height: `${h}px`,
            background: COLORS.redDeep,
            animationDelay: `${i * 0.06}s`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Featured screen-recording card — the centerpiece of the Evidence screen.
 *
 * Top: looping Minecraft gameplay video, overlaid with REC pill +
 * duration + faint play-affordance glyph. Auto-plays muted on every
 * device the browser allows (mobile included thanks to `playsInline`).
 *
 * Middle: animated audio waveform + chat transcript shown like closed
 * captions on the captured clip. The exchange is short on purpose — three
 * lines that mirror the grooming pattern the product is designed to
 * surface (age fishing → off-platform pivot).
 *
 * Bottom: tiny source/duration line, monospace timestamp.
 */
function RecordingCard() {
  return (
    <div
      className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden"
      style={{
        boxShadow:
          "0 1px 0 rgba(0,0,0,0.02), 0 6px 18px rgba(15,23,42,0.10)",
      }}
    >
      {/* Looping clip. `bg-black` is the fallback while the video loads
          so we never flash a white rectangle. */}
      <div className="relative bg-black" style={{ aspectRatio: "16 / 8" }}>
        <video
          src="/videos/minecraft-gameplay.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Captured Minecraft gameplay clip"
        />
        {/* Top + bottom gradient overlays so the overlay chips stay
            readable regardless of the underlying frame. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
        />

        {/* Top-left REC chip — pulsing red dot + monospace timestamp. */}
        <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
          <span
            className="inline-flex items-center gap-1 font-bold rounded-full px-1.5"
            style={{
              background: "rgba(220,38,38,0.95)",
              color: "white",
              fontSize: "8px",
              height: "14px",
              letterSpacing: "0.06em",
            }}
          >
            <span className="block w-1 h-1 rounded-full bg-white mock-anim-breathe" />
            REC
          </span>
          <span
            className="font-mono font-bold tabular-nums rounded-full px-1.5"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "white",
              fontSize: "8px",
              height: "14px",
              lineHeight: "14px",
            }}
          >
            10:14 AM
          </span>
        </div>

        {/* Top-right duration counter. */}
        <span
          className="absolute top-1.5 right-1.5 font-mono font-bold tabular-nums rounded-full px-1.5"
          style={{
            background: "rgba(0,0,0,0.55)",
            color: "white",
            fontSize: "8px",
            height: "14px",
            lineHeight: "14px",
          }}
        >
          0:47
        </span>

        {/* Bottom-left source chip. */}
        <span
          className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 font-semibold rounded-full px-1.5"
          style={{
            background: "rgba(255,255,255,0.92)",
            color: COLORS.text,
            fontSize: "8px",
            height: "14px",
          }}
        >
          <span
            className="block w-2 h-2 rounded-[3px]"
            style={{ background: "#5BA63B" }}
            aria-hidden
          />
          Minecraft
        </span>

        {/* Center play-affordance — subtle, suggests "tap to replay". */}
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full"
          style={{
            width: 32,
            height: 32,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(4px)",
            border: "1.5px solid rgba(255,255,255,0.85)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>

      {/* Waveform + transcript section — visually attached to the clip,
          like closed captions / audio review. */}
      <div className="px-2.5 py-1.5">
        <Waveform />

        <div className="mt-1 space-y-[2px]">
          <TranscriptLine
            sender="Stranger_77"
            senderColor={COLORS.high}
            text="how old r u?"
          />
          <TranscriptLine sender="Lily" senderColor={COLORS.redDeep} text="11" />
          <TranscriptLine
            sender="Stranger_77"
            senderColor={COLORS.high}
            text="cool, dm me on discord 👀"
            flagged
          />
        </div>

        <div
          className="mt-2 flex items-center justify-between font-semibold tabular-nums"
          style={{ color: COLORS.textMuted, fontSize: "8.5px" }}
        >
          <span>Minecraft · Hypixel server-chat</span>
          <span>47s clip · auto-saved</span>
        </div>
      </div>
    </div>
  );
}

/** Single line in the transcript — sender label + message. `flagged`
 *  shows a small ⚠ glyph at the end to mirror what the dashboard would
 *  highlight as the actionable line. */
function TranscriptLine({
  sender,
  senderColor,
  text,
  flagged,
}: {
  sender: string;
  senderColor: string;
  text: string;
  flagged?: boolean;
}) {
  return (
    <p className="leading-snug flex items-start gap-1.5" style={{ fontSize: "10px" }}>
      <span className="font-bold shrink-0" style={{ color: senderColor }}>
        {sender}:
      </span>
      <span className="flex-1 text-gray-800">{text}</span>
      {flagged && (
        <span
          className="inline-flex items-center justify-center rounded-full shrink-0"
          style={{
            background: COLORS.high,
            color: "white",
            width: 12,
            height: 12,
            fontSize: "8px",
            lineHeight: 1,
          }}
          title="Flagged by AI"
        >
          !
        </span>
      )}
    </p>
  );
}

export function EvidenceScreenMock({
  className = "",
  style,
  bare = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  bare?: boolean;
}) {
  return (
    <PhoneFrame className={className} style={style} bare={bare}>
      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900" style={{ fontSize: "13px" }}>
          Today&rsquo;s timeline
        </h3>
        <span
          className="font-semibold tabular-nums"
          style={{ color: COLORS.textMuted, fontSize: "11px" }}
        >
          Mar 15
        </span>
      </div>

      <div className="px-4 mt-2">
        <RecordingCard />
      </div>

      {/* Threat detected alert */}
      <div className="px-4 mt-3">
        <div
          className="rounded-xl border p-2.5 flex items-start gap-2.5"
          style={{
            background: "#FEF2F2",
            borderColor: "#FECACA",
          }}
        >
          <span
            className="shrink-0 inline-flex items-center justify-center rounded-full mt-0.5"
            style={{
              width: 22,
              height: 22,
              background: "#DC2626",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <p
              className="font-bold leading-tight"
              style={{ fontSize: "11px", color: "#991B1B" }}
            >
              Grooming pattern detected
            </p>
            <p
              className="leading-snug mt-0.5"
              style={{ fontSize: "9.5px", color: "#B91C1C" }}
            >
              Adult stranger asking child&rsquo;s age, then requesting private contact on another platform.
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span
                className="inline-flex items-center font-bold rounded-full px-2"
                style={{
                  background: "#DC2626",
                  color: "white",
                  fontSize: "8.5px",
                  height: "16px",
                }}
              >
                High risk
              </span>
              <span
                className="font-mono font-semibold tabular-nums"
                style={{ color: "#991B1B", fontSize: "9px" }}
              >
                10:14 AM · Auto-recorded
              </span>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
