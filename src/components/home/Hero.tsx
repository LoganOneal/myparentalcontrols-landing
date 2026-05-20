import { HeroWaitlist } from "@/components/home/HeroWaitlist";

function BrandChip({
  name,
  src,
  bg,
  whiteLogo = false,
}: {
  name: string;
  src: string;
  bg: string;
  whiteLogo?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 align-middle whitespace-nowrap">
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-7 h-7 rounded-md shadow-sm ring-1 ring-black/10"
        style={{ background: bg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden
          className="w-[18px] h-[18px]"
          style={whiteLogo ? { filter: "brightness(0) invert(1)" } : undefined}
        />
      </span>
      <span className="font-semibold">{name}</span>
    </span>
  );
}

function GrassBlockChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 align-middle whitespace-nowrap">
      <span
        aria-hidden
        className="inline-block w-7 h-7 rounded-md overflow-hidden shadow-sm ring-1 ring-black/10"
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
      <span className="font-semibold">{name}</span>
    </span>
  );
}

/**
 * Hero — grey background, two-column on desktop (text left, phone right).
 * Stacks to single column on mobile (text first, phone below). The phone
 * still "peeks" past the section bottom via translate-y + overflow-hidden.
 */
export function Hero() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#F1F2F4" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 pt-12 lg:pt-20 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-center">
        {/* Left column — text + CTA */}
        <div className="flex flex-col items-start text-left gap-6 pb-8 lg:pb-20">
          {/* Eyebrow trust pill */}
          <div className="flex items-center h-[42.5px] border border-[#c6c6c68f] rounded-full p-1.5 pr-3 text-xs gap-2 w-fit bg-white/80">
            <div className="flex -space-x-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/used-by-1.png"
                alt=""
                aria-hidden
                className="w-[30px] h-[30px] rounded-full border-2 border-white"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/used-by-2.png"
                alt=""
                aria-hidden
                className="w-[30px] h-[30px] rounded-full border-2 border-white"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/used-by-3.png"
                alt=""
                aria-hidden
                className="w-[30px] h-[30px] rounded-full border-2 border-white"
              />
            </div>
            <div className="font-medium sm:text-sm text-xs">
              12,000+ parents already protected
            </div>
          </div>

          {/* H1 — threat-first */}
          <h1
            className="text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.1] tracking-tight"
            style={{
              fontFamily:
                '"Moderat-Black", var(--font-bricolage), sans-serif',
              fontWeight: 700,
              color: "rgb(30, 30, 30)",
            }}
          >
            Stop online predators before they reach your child.
          </h1>

          {/* Sub paragraph */}
          <p className="text-base sm:text-lg font-normal leading-relaxed text-gray-700 max-w-[560px]">
            MyParentalControls runs quietly on your child&rsquo;s PC and alerts
            your phone the moment someone targets them in{" "}
            <BrandChip
              name="Roblox"
              src="/images/games/roblox.svg"
              bg="#E2231A"
              whiteLogo
            />
            ,{" "}
            <BrandChip
              name="Discord"
              src="/images/games/discord.svg"
              bg="#5865F2"
              whiteLogo
            />
            ,{" "}
            <GrassBlockChip name="Minecraft" />, or{" "}
            <BrandChip
              name="Fortnite"
              src="/images/games/fortnite.svg"
              bg="#2A3F8F"
              whiteLogo
            />
            . You&rsquo;ll know before they do harm.
          </p>

          {/* Waitlist CTA */}
          <div className="w-full max-w-[480px]">
            <HeroWaitlist />
          </div>
        </div>

        {/* Right column — phone screenshot, peeks past section bottom */}
        <div className="flex justify-center lg:justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mpc-app-preview.png"
            alt="MyParentalControls app — alerts dashboard"
            width={1857}
            height={3096}
            className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px] h-auto translate-y-[14%] sm:translate-y-[12%] lg:translate-y-[10%]"
          />
        </div>
      </div>
    </section>
  );
}
