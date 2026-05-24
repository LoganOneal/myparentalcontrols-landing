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
function RecordingCard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="relative overflow-hidden rounded-[22px] border border-black/[0.06] bg-white"
      style={{
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.90), 0 10px 26px rgba(15,23,42,0.08)",
      }}
    >
      {/* Looping clip. `bg-black` is the fallback while the video loads
          so we never flash a white rectangle. */}
      <div
        className="relative bg-black"
        style={{ aspectRatio: compact ? "16 / 7.05" : "16 / 8" }}
      >
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
        <div className="absolute left-2 top-2 flex items-center gap-1">
          <span
            className="inline-flex items-center gap-1 rounded-full px-1.5 font-bold"
            style={{
              background: "rgba(220,38,38,0.92)",
              color: "white",
              fontSize: compact ? "7.5px" : "8px",
              height: compact ? "13px" : "14px",
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
              fontSize: compact ? "7.5px" : "8px",
              height: compact ? "13px" : "14px",
              lineHeight: compact ? "13px" : "14px",
            }}
          >
            10:14 AM
          </span>
        </div>

        {/* Top-right duration counter. */}
        <span
          className="absolute right-2 top-2 rounded-full px-1.5 font-mono font-bold tabular-nums"
          style={{
            background: "rgba(0,0,0,0.55)",
            color: "white",
            fontSize: compact ? "7.5px" : "8px",
            height: compact ? "13px" : "14px",
            lineHeight: compact ? "13px" : "14px",
          }}
        >
          0:47
        </span>

      </div>

      {/* Waveform + transcript section — visually attached to the clip,
          like closed captions / audio review. */}
      {compact ? (
        <div className="px-2.5 py-1.5">
          <div className="flex items-center justify-between gap-2">
            <span
              className="font-bold uppercase"
              style={{ color: COLORS.textMuted, fontSize: "7px" }}
            >
              Flagged sequence
            </span>
            <span
              className="rounded-full bg-[#FFF1F1] px-1.5 py-0.5 font-bold"
              style={{ color: "#B91C1C", fontSize: "7px" }}
            >
              Age + off-platform
            </span>
          </div>
          <div className="mt-1 space-y-[1px]">
            <TranscriptLine
              sender="Stranger_77"
              senderColor={COLORS.high}
              text="how old r u?"
              compact
            />
            <TranscriptLine
              sender="Lily"
              senderColor={COLORS.redDeep}
              text="11"
              compact
            />
            <TranscriptLine
              sender="Stranger_77"
              senderColor={COLORS.high}
              text="cool, dm me on discord"
              compact
              flagged
            />
          </div>
        </div>
      ) : (
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <Waveform />
            <span
              className="rounded-full bg-[#FFF1F1] px-2 py-0.5 font-bold"
              style={{ color: "#B91C1C", fontSize: "8px" }}
            >
              Potentially problematic
            </span>
          </div>

          <div className="mt-1.5 space-y-[3px]">
            <TranscriptLine
              sender="Stranger_77"
              senderColor={COLORS.high}
              text="how old r u?"
            />
            <TranscriptLine sender="Lily" senderColor={COLORS.redDeep} text="11" />
            <TranscriptLine
              sender="Stranger_77"
              senderColor={COLORS.high}
              text="cool, dm me on discord"
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
      )}
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
  compact = false,
}: {
  sender: string;
  senderColor: string;
  text: string;
  flagged?: boolean;
  compact?: boolean;
}) {
  return (
    <p
      className="leading-snug flex items-start gap-1.5"
      style={{ fontSize: compact ? "8px" : "10px" }}
    >
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
            width: compact ? 10 : 12,
            height: compact ? 10 : 12,
            fontSize: compact ? "7px" : "8px",
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
  const compact = bare;

  return (
    <PhoneFrame className={className} style={style} bare={bare}>
      <div
        className={`flex items-center justify-between ${
          compact ? "px-3 pt-3" : "px-4 pt-10"
        }`}
      >
        <div className="min-w-0">
          <p
            className="font-semibold uppercase"
            style={{
              color: COLORS.textMuted,
              fontSize: compact ? "7.5px" : "9px",
            }}
          >
            Evidence review
          </p>
          <h3
            className="font-bold leading-tight text-gray-950"
            style={{ fontSize: compact ? "12px" : "15px" }}
          >
            Minecraft chat flagged
          </h3>
        </div>
        <span
          className="rounded-full bg-white px-2 py-1 font-semibold tabular-nums ring-1 ring-black/[0.06]"
          style={{ color: COLORS.textMuted, fontSize: compact ? "9px" : "11px" }}
        >
          Mar 15
        </span>
      </div>

      <div className={compact ? "px-3 mt-1.5" : "px-4 mt-3"}>
        <RecordingCard compact={compact} />
      </div>

      {compact ? (
        <div className="px-3 mt-1.5">
          <div
            className="rounded-[18px] border p-2.5"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,247,247,0.96))",
              borderColor: "rgba(220,38,38,0.20)",
              boxShadow: "0 8px 22px rgba(153,27,27,0.08)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="shrink-0 rounded-full px-2 py-0.5 font-bold"
                style={{
                  background: "#DC2626",
                  color: "white",
                  fontSize: "7.5px",
                }}
              >
                High risk
              </span>
              <span
                className="font-mono font-bold tabular-nums"
                style={{ color: "#991B1B", fontSize: "7.5px" }}
              >
                10:14 AM · auto-saved
              </span>
            </div>
            <p
              className="mt-1 font-bold leading-snug"
              style={{ color: "#991B1B", fontSize: "9px" }}
            >
              Grooming pattern detected
            </p>
            <p
              className="mt-0.5 leading-snug"
              style={{ color: "#B91C1C", fontSize: "8px" }}
            >
              Stranger asked her age, learned she was 11, then tried to move the
              conversation to private Discord.
            </p>
          </div>
        </div>
      ) : (
        <div className="px-4 mt-3">
          <div
            className="flex items-start gap-2.5 rounded-[18px] border p-3"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,247,247,0.96))",
              borderColor: "rgba(220,38,38,0.20)",
              boxShadow: "0 8px 22px rgba(153,27,27,0.08)",
            }}
          >
            <span
              className="shrink-0 inline-flex items-center justify-center rounded-full mt-0.5"
              style={{
                width: 24,
                height: 24,
                background: "#DC2626",
                boxShadow: "0 4px 12px rgba(220,38,38,0.22)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="font-bold leading-tight"
                style={{ fontSize: "12px", color: "#991B1B" }}
              >
                Grooming pattern detected
              </p>
              <p
                className="leading-snug mt-0.5"
                style={{ fontSize: "10px", color: "#B91C1C" }}
              >
                Adult stranger asking child&apos;s age, then requesting private contact on another platform.
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
      )}
    </PhoneFrame>
  );
}
