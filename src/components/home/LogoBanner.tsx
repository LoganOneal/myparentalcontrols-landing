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
  // Skip the brightness/invert filter for assets that already read as
  // white-on-dark (e.g. the official GTA V PNG has a baked-in black
  // background; inverting it produces a solid white block).
  rawColor?: boolean;
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

function Logo({ name, src, rawColor }: Platform) {
  // On the dark #121212 banner we flatten each logo to a single light tone
  // so they read uniformly as a desaturated press strip. brightness(0)
  // collapses all color to black, invert(1) flips it to white, and the
  // opacity softens it just enough to avoid harsh contrast.
  //
  // For PNGs that already ship with a black background baked in (e.g. the
  // official GTA V wordmark), we skip the inversion and let `mix-blend-mode:
  // screen` knock the black out against the dark banner — only the white
  // letterforms remain visible. We also let those assets render at double
  // height since stacked square logos read poorly at row height.
  return (
    <div
      className={`flex items-center shrink-0 ${
        rawColor ? "h-16 sm:h-20 lg:h-24" : "h-9 sm:h-10 lg:h-11"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="h-full w-auto block"
        style={
          rawColor
            ? { mixBlendMode: "screen", opacity: 0.9 }
            : { filter: "brightness(0) invert(1) opacity(0.75)" }
        }
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
    <section className="border-t border-white/10 pt-5 lg:pt-6 pb-12 lg:pb-16 overflow-hidden" style={{ backgroundColor: "#121212" }}>
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 mb-10 sm:mb-12 text-center">
        <h2
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "17px",
            color: "rgb(170, 170, 170)",
            textTransform: "uppercase",
          }}
        >
          Watching the games where <Highlight>predators</Highlight>,{" "}
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
