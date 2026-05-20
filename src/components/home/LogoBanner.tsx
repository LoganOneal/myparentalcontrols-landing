/**
 * Infinite-marquee logo banner.
 *
 * Every platform is rendered as a uniform "wide form" lockup: brand-colored
 * icon + brand-colored name, sitting in a fixed-width slot. This gives every
 * entry the same visual weight regardless of whether the official brand has a
 * wide wordmark or just an icon.
 *
 * Icon coloring uses CSS `mask-image` so the source SVG (any flat single-path
 * silhouette) renders in any brand color we want at runtime — no per-icon
 * fill edits, no SVG cloning per color.
 */

type Platform = {
  name: string;
  icon: string;
  /** Brand color used for both the icon mask and the name text. */
  color: string;
};

const PLATFORMS: Platform[] = [
  { name: "Roblox", icon: "/images/platforms/roblox.svg", color: "#E2231A" },
  { name: "Discord", icon: "/images/platforms/discord.svg", color: "#5865F2" },
  { name: "Minecraft", icon: "/images/platforms/minecraft.svg", color: "#5BA63B" },
  { name: "Fortnite", icon: "/images/platforms/fortnite.svg", color: "#1B1B1B" },
  { name: "Snapchat", icon: "/images/platforms/snapchat.svg", color: "#1B1B1B" },
  { name: "TikTok", icon: "/images/platforms/tiktok.svg", color: "#1B1B1B" },
  { name: "Instagram", icon: "/images/platforms/instagram.svg", color: "#E1306C" },
  { name: "YouTube", icon: "/images/platforms/youtube.svg", color: "#FF0000" },
  { name: "WhatsApp", icon: "/images/platforms/whatsapp.svg", color: "#25D366" },
  { name: "Twitch", icon: "/images/platforms/twitch.svg", color: "#9146FF" },
  { name: "Reddit", icon: "/images/platforms/reddit.svg", color: "#FF4500" },
  { name: "Steam", icon: "/images/platforms/steam.svg", color: "#171A21" },
];

function Lockup({ name, icon, color }: Platform) {
  return (
    <div className="flex items-center justify-center shrink-0 gap-2.5 h-10 sm:h-12 lg:h-14 w-[170px] sm:w-[200px] lg:w-[230px]">
      <span
        aria-hidden
        className="block w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 shrink-0"
        style={{
          backgroundColor: color,
          WebkitMaskImage: `url(${icon})`,
          maskImage: `url(${icon})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
      <span
        className="font-bold whitespace-nowrap leading-none"
        style={{ fontSize: "clamp(18px, 1.6vw, 22px)", color }}
      >
        {name}
      </span>
    </div>
  );
}

export function LogoBanner() {
  // Duplicate so the marquee can loop seamlessly.
  const track = [...PLATFORMS, ...PLATFORMS];

  return (
    <section className="bg-white border-y border-gray-200 pt-5 lg:pt-6 pb-12 lg:pb-16 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 mb-8 sm:mb-10 text-center">
        <h2
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "26px",
            color: "rgb(153, 153, 153)",
            textTransform: "uppercase",
          }}
        >
          Watching the apps where predators, cyber bullies, and scammers target kids
        </h2>
      </div>

      <div className="relative marquee-fade-edges">
        <div className="flex w-max items-center animate-marquee">
          {track.map((p, i) => (
            <Lockup
              key={`${p.name}-${i}`}
              name={p.name}
              icon={p.icon}
              color={p.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
