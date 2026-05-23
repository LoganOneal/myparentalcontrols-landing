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

// High-risk video games for children based on commonly flagged concerns:
// predator grooming, toxic voice/text chat, M-rated content, gambling-style
// mechanics, and addictive design. Sources: Common Sense Media, NCMEC,
// FBI cyber-safety advisories, parental-safety industry reports.
// Discord stays in the list as the primary chat platform tied to gaming.
const PLATFORMS: Platform[] = [
  { name: "Roblox", src: "/images/platforms/wordmarks-clean/roblox.svg" },
  { name: "Fortnite", src: "/images/platforms/wordmarks/fortnite.png" },
  { name: "Minecraft", src: "/images/platforms/wordmarks-clean/minecraft.svg" },
  { name: "Call of Duty", src: "/images/platforms/games/call-of-duty.svg" },
  { name: "Valorant", src: "/images/platforms/games/valorant.svg" },
  { name: "League of Legends", src: "/images/platforms/games/league-of-legends.svg" },
  { name: "VRChat", src: "/images/platforms/games/vrchat.svg" },
  { name: "Counter-Strike", src: "/images/platforms/games/counter-strike.svg" },
  { name: "Among Us", src: "/images/platforms/games/among-us.svg" },
  { name: "Apex Legends", src: "/images/platforms/games/apex-legends.svg" },
  { name: "Discord", src: "/images/platforms/wordmarks-clean/discord.svg" },
  { name: "Steam", src: "/images/platforms/wordmarks-clean/steam.svg" },
];

function Logo({ name, src }: Platform) {
  // On the dark #121212 banner we flatten each logo to a single light tone
  // where possible. Fixed slots keep very wide wordmarks and compact emblem
  // logos visually balanced without distorting the source art.
  return (
    <div className="flex h-12 w-[148px] shrink-0 items-center justify-center sm:h-14 sm:w-[168px] lg:h-16 lg:w-[190px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="block h-full w-full object-contain"
        style={{ filter: "brightness(0) invert(1) opacity(0.78)" }}
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
    <section className="border-t border-white/10 pt-5 lg:pt-6 pb-6 lg:pb-8 overflow-hidden" style={{ backgroundColor: "#121212" }}>
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 mb-8 sm:mb-10 text-center">
        <h2
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "20px",
            color: "rgb(255, 255, 255)",
            textTransform: "uppercase",
          }}
        >
          Protect your child from <Highlight>predators</Highlight>,{" "}
          <Highlight>cyberbullies</Highlight>, and{" "}
          <Highlight>scammers</Highlight>
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
