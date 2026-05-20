/**
 * Infinite-marquee logo banner — wide-form wordmark logos rendered at a
 * uniform pixel height. Every source SVG was pre-processed by
 * `scripts/normalize-wordmark-svgs.mjs` so its viewBox is tightly cropped
 * to actual content bounds — that means rendering them all at the same
 * height gives consistent visual scale without any per-logo tweaks.
 *
 * Fortnite uses its native PNG (already a tightly-cropped wordmark).
 */

import * as React from "react";

type Platform = {
  name: string;
  src: string;
};

const PLATFORMS: Platform[] = [
  { name: "Roblox", src: "/images/platforms/wordmarks-clean/roblox.svg" },
  { name: "Discord", src: "/images/platforms/wordmarks-clean/discord.svg" },
  { name: "Minecraft", src: "/images/platforms/wordmarks-clean/minecraft.svg" },
  { name: "Fortnite", src: "/images/platforms/wordmarks/fortnite.png" },
  { name: "Snapchat", src: "/images/platforms/wordmarks-clean/snapchat.svg" },
  { name: "TikTok", src: "/images/platforms/wordmarks-clean/tiktok.svg" },
  { name: "Instagram", src: "/images/platforms/wordmarks-clean/instagram.svg" },
  { name: "YouTube", src: "/images/platforms/wordmarks-clean/youtube.svg" },
  { name: "WhatsApp", src: "/images/platforms/wordmarks-clean/whatsapp.svg" },
  { name: "Twitch", src: "/images/platforms/wordmarks-clean/twitch.svg" },
  { name: "Reddit", src: "/images/platforms/wordmarks-clean/reddit.svg" },
  { name: "Steam", src: "/images/platforms/wordmarks-clean/steam.svg" },
];

function Logo({ name, src }: Platform) {
  // Apply grayscale + opacity as a CSS filter on the original image
  // instead of masking the silhouette to a flat color. This preserves
  // internal shading (Minecraft 3D blocks, YouTube's play-button contrast
  // vs. text, Steam's gear, etc.) so each logo stays recognizable while
  // the row still reads as a desaturated press strip.
  return (
    <div className="flex items-center shrink-0 h-9 sm:h-10 lg:h-11">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="h-full w-auto block"
        style={{ filter: "grayscale(1) opacity(0.7)" }}
      />
    </div>
  );
}

/** Inline accent for threat words in the section heading. */
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-extrabold whitespace-nowrap"
      style={{ color: "#2563EB" }}
    >
      {children}
    </span>
  );
}

export function LogoBanner() {
  // Duplicate so the marquee can loop seamlessly.
  const track = [...PLATFORMS, ...PLATFORMS];

  return (
    <section className="bg-white border-t border-gray-200 pt-5 lg:pt-6 pb-12 lg:pb-16 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 mb-10 sm:mb-12 text-center">
        <h2
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "17px",
            color: "rgb(153, 153, 153)",
            textTransform: "uppercase",
          }}
        >
          Watching the apps where <Highlight>predators</Highlight>,{" "}
          <Highlight>cyber bullies</Highlight>, and{" "}
          <Highlight>scammers</Highlight> target your children
        </h2>
      </div>

      <div className="relative marquee-fade-edges">
        <div className="flex w-max items-center gap-10 sm:gap-14 lg:gap-16 animate-marquee">
          {track.map((p, i) => (
            <Logo key={`${p.name}-${i}`} name={p.name} src={p.src} />
          ))}
        </div>
      </div>
    </section>
  );
}
