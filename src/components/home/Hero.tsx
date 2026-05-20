import { HeroWaitlist } from "@/components/home/HeroWaitlist";

/**
 * Small brand chip — colored badge containing the real platform logo + the
 * platform name. Inline-flow so it sits naturally in body text.
 */
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
          style={
            whiteLogo
              ? { filter: "brightness(0) invert(1)" }
              : undefined
          }
        />
      </span>
      <span className="font-semibold">{name}</span>
    </span>
  );
}

/**
 * Inline pixel grass-block chip — generic stacked green-grass / brown-dirt
 * tile with a few pixel highlights. Universally recognized as the visual
 * shorthand for block-based games; uses generic colors only.
 */
function GrassBlockChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 align-middle whitespace-nowrap">
      <span
        aria-hidden
        className="inline-block w-7 h-7 rounded-md overflow-hidden shadow-sm ring-1 ring-black/10"
      >
        <svg viewBox="0 0 8 8" className="w-full h-full" shapeRendering="crispEdges">
          {/* dirt base */}
          <rect width="8" height="8" fill="#8B5A2B" />
          {/* dirt darker pixels */}
          <rect x="1" y="4" width="1" height="1" fill="#704721" />
          <rect x="5" y="5" width="1" height="1" fill="#704721" />
          <rect x="3" y="6" width="1" height="1" fill="#704721" />
          <rect x="6" y="3" width="1" height="1" fill="#704721" />
          {/* dirt lighter pixels */}
          <rect x="2" y="6" width="1" height="1" fill="#A67244" />
          <rect x="4" y="4" width="1" height="1" fill="#A67244" />
          {/* grass top */}
          <rect x="0" y="0" width="8" height="3" fill="#5BA63B" />
          {/* grass shading */}
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

export function Hero() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 mt-10 items-center max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-4 w-fit mx-auto p-5 sm:p-0 -mt-10">
        {/* Eyebrow — trust signal */}
        <div className="flex items-center h-[42.5px] border border-[#c6c6c68f] rounded-full p-1.5 pr-3 text-xs gap-2 w-fit bg-white/60">
          <div className="flex sm:-space-x-3 -space-x-5">
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
        <h1 className="text-[40px] sm:text-[52px] font-bold leading-tight max-w-[560px]">
          Stop online predators
          <br />
          <span className="font-medium">before they reach your child.</span>
        </h1>

        <p className="opacity-80 text-base sm:text-lg font-normal max-w-[560px] leading-relaxed">
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
          , or{" "}
          <GrassBlockChip name="Minecraft" />
          . You&rsquo;ll know before they do harm.
        </p>

        {/* CTAs: primary email submit + secondary text link + micro-copy */}
        <HeroWaitlist />
      </div>

      <div className="overflow-visible pb-20 sm:pb-0 w-full flex justify-center lg:justify-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mpc-app-preview.png"
          alt="MyParentalControls app — alerts dashboard"
          width={1857}
          height={3096}
          className="h-auto w-full max-w-[420px] sm:max-w-[480px] object-contain lg:ml-auto lg:mr-0"
        />
      </div>
    </main>
  );
}
