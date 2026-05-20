import { HeroWaitlist } from "@/components/home/HeroWaitlist";

/**
 * Hero — grey background, two-column on desktop (text left, phone right).
 * Stacks to single column on mobile (text first, phone below).
 */
export function Hero() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#F1F2F4" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 pt-4 lg:pt-6 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-center">
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

          {/* H1 — threat-first. Desktop spec from design: Moderat-Black,
              56px / 67px line-height, rendered bold. Mobile/tablet scale
              down proportionally. */}
          <h1
            className="text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.1] lg:leading-[67px] tracking-tight"
            style={{
              fontFamily: "Moderat-Black, sans-serif",
              fontStyle: "normal",
              fontWeight: 700,
              color: "rgb(30, 30, 30)",
            }}
          >
            The parental control that protects your kid where it matters most.
          </h1>

          {/* Sub paragraph */}
          <p className="text-base sm:text-lg font-normal leading-relaxed text-gray-700 max-w-[560px]">
            Other parental controls block your kid&rsquo;s apps. We don&rsquo;t.
            We read inside the games and apps and alert caretakers the second something looks off.
          </p>

          {/* Waitlist CTA — matches the 560px width of the subheader above */}
          <div className="w-full max-w-[560px]">
            <HeroWaitlist />
          </div>
        </div>

        {/* Right column — phone screenshot. Right-aligned on lg+ so the
            phone's right edge sits at the container right edge (visually
            lined up with the "Sign in" / waitlist navbar text above).
            Hidden on mobile/tablet — the AlertsForDangers section below
            already shows mockups; doubling them up on a small screen just
            steals attention from the headline + CTA. */}
        <div className="hidden lg:flex lg:justify-end items-start self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mpc-app-preview.png"
            alt="MyParentalControls app — alerts dashboard"
            width={1857}
            height={3096}
            className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
