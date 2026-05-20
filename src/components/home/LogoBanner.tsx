/**
 * Infinite-marquee logo banner — a continuously-scrolling row of every
 * platform MyParentalControls monitors. Inspired by bark.us's hero strip.
 *
 * Implementation: render PLATFORMS twice inside a flex track, then animate
 * the track from translateX(0) to translateX(-50%) on a linear-infinite
 * loop. Because the second copy is identical to the first, the wrap is
 * visually seamless. Hover pauses the animation. Soft mask on the section
 * edges hides logos as they enter/leave the viewport.
 */

type Platform = { name: string; src: string };

const PLATFORMS: Platform[] = [
  { name: "Roblox", src: "/images/platforms/roblox.svg" },
  { name: "Discord", src: "/images/platforms/discord.svg" },
  { name: "Minecraft", src: "/images/platforms/minecraft.svg" },
  { name: "Fortnite", src: "/images/platforms/fortnite.svg" },
  { name: "Snapchat", src: "/images/platforms/snapchat.svg" },
  { name: "TikTok", src: "/images/platforms/tiktok.svg" },
  { name: "Instagram", src: "/images/platforms/instagram.svg" },
  { name: "YouTube", src: "/images/platforms/youtube.svg" },
  { name: "WhatsApp", src: "/images/platforms/whatsapp.svg" },
  { name: "Twitch", src: "/images/platforms/twitch.svg" },
  { name: "Reddit", src: "/images/platforms/reddit.svg" },
  { name: "Steam", src: "/images/platforms/steam.svg" },
];

function PlatformLockup({ name, src }: Platform) {
  return (
    <div className="flex items-center gap-2 text-gray-500 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        width={24}
        height={24}
        className="w-5 h-5 sm:w-6 sm:h-6"
        style={{ filter: "brightness(0) opacity(0.55)" }}
      />
      <span className="font-bold text-base sm:text-lg whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function LogoBanner() {
  // Duplicate so the marquee can loop seamlessly.
  const track = [...PLATFORMS, ...PLATFORMS];

  return (
    <section className="bg-white border-y border-gray-200 py-10 lg:py-14 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 mb-8">
        <p className="text-center text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-gray-500">
          Monitors every app your kid uses &mdash; the high-risk ones too
        </p>
      </div>

      <div className="relative marquee-fade-edges">
        <div className="flex w-max gap-10 sm:gap-12 lg:gap-14 animate-marquee">
          {track.map((p, i) => (
            <PlatformLockup
              key={`${p.name}-${i}`}
              name={p.name}
              src={p.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
