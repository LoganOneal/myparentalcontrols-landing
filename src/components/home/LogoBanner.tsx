/**
 * Infinite-marquee logo banner — wide-form wordmark logos.
 *
 * Most platforms use a 2:1 "ar21" wordmark sourced from vectorlogo.zone,
 * which gives uniform aspect ratios across the row. Roblox and Fortnite
 * aren't published in that format, so we use their cleanest public wordmark
 * file and let `object-fit: contain` in a 2:1 slot equalize the visual size.
 *
 * Each logo lives in a fixed-size slot with the same max-height so the
 * marquee rhythm and the per-logo visual weight stay consistent.
 */

import * as React from "react";

type Platform = {
  name: string;
  src: string;
  /** Optional per-logo vertical-fill multiplier (0–1) when the source SVG
   *  has unusually much (or little) internal padding. 1 = fills slot. */
  fill?: number;
};

const PLATFORMS: Platform[] = [
  { name: "Roblox", src: "/images/platforms/wordmarks/roblox.svg", fill: 0.75 },
  { name: "Discord", src: "/images/platforms/wordmarks-v2/discord.svg", fill: 0.85 },
  { name: "Minecraft", src: "/images/platforms/wordmarks-v2/minecraft.svg", fill: 0.85 },
  { name: "Fortnite", src: "/images/platforms/wordmarks/fortnite.png", fill: 0.75 },
  { name: "Snapchat", src: "/images/platforms/wordmarks-v2/snapchat.svg", fill: 0.95 },
  { name: "TikTok", src: "/images/platforms/wordmarks-v2/tiktok.svg", fill: 0.95 },
  { name: "Instagram", src: "/images/platforms/wordmarks-v2/instagram.svg", fill: 0.95 },
  { name: "YouTube", src: "/images/platforms/wordmarks-v2/youtube.svg", fill: 0.9 },
  { name: "WhatsApp", src: "/images/platforms/wordmarks-v2/whatsapp.svg", fill: 0.85 },
  { name: "Twitch", src: "/images/platforms/wordmarks-v2/twitch.svg", fill: 0.95 },
  { name: "Reddit", src: "/images/platforms/wordmarks-v2/reddit.svg", fill: 0.95 },
  { name: "Steam", src: "/images/platforms/wordmarks-v2/steam.svg", fill: 0.95 },
];

function Slot({
  name,
  src,
  fill = 1,
}: Platform) {
  // Fixed-aspect 2:1 box. Width drives the layout; height is derived from
  // padding-bottom: 50% trick so the slot stays a perfect 2:1 even when
  // children shrink.
  return (
    <div className="shrink-0 w-[170px] sm:w-[200px] lg:w-[230px] flex items-center justify-center px-2">
      <div
        className="relative w-full"
        style={{ aspectRatio: "2 / 1" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          className="absolute inset-0 m-auto object-contain"
          style={{
            maxHeight: `${fill * 100}%`,
            maxWidth: "100%",
          }}
        />
      </div>
    </div>
  );
}

/** Inline accent for threat words in the section heading. */
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-extrabold whitespace-nowrap"
      style={{ color: "#FF3838" }}
    >
      {children}
    </span>
  );
}

export function LogoBanner() {
  // Duplicate so the marquee can loop seamlessly.
  const track = [...PLATFORMS, ...PLATFORMS];

  return (
    <section className="bg-white border-y border-gray-200 pt-5 lg:pt-6 pb-12 lg:pb-16 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 mb-10 sm:mb-12 text-center">
        <h2
          className="leading-tight sm:leading-none sm:whitespace-nowrap"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "clamp(16px, 2.2vw, 28px)",
            color: "rgb(153, 153, 153)",
          }}
        >
          Watching the apps where <Highlight>predators</Highlight>,{" "}
          <Highlight>cyber bullies</Highlight>, and{" "}
          <Highlight>scammers</Highlight> target kids
        </h2>
      </div>

      <div className="relative marquee-fade-edges">
        <div className="flex w-max items-center animate-marquee">
          {track.map((p, i) => (
            <Slot
              key={`${p.name}-${i}`}
              name={p.name}
              src={p.src}
              fill={p.fill}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
