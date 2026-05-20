import Link from "next/link";

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
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 pt-10 lg:pt-16 pb-10 lg:pb-16 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-12 items-center">
        {/* Left column — text + CTA */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 pb-2 lg:pb-20">
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
            #1 parental security for the PC games your child plays.
          </h1>

          {/* Sub paragraph */}
          <p className="text-base sm:text-lg font-normal leading-relaxed text-gray-700 max-w-[560px]">
            Voice and chat monitoring across 3,000+ PC games &mdash; with
            real-time alerts the second something dangerous appears.
          </p>

          {/* Primary CTA — single low-friction "Try for Free" button.
              Centered on mobile, left-aligned on desktop along with the
              rest of the text column. */}
          <Link
            href="/signup"
            className="mt-2 inline-flex items-center justify-center bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8 py-4 transition-colors shadow-sm"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "18px",
              color: "rgb(255, 255, 255)",
            }}
          >
            Try for Free
          </Link>
        </div>

        {/* Right column — transparent-PNG hero cutout, free-floating
            against the hero's grey background. No frame, no glow. */}
        <div className="flex justify-center lg:justify-end items-center self-center">
          <div className="w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[560px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-kid-gaming.png"
              alt="Kid wearing headphones gaming on a desktop computer"
              width={1280}
              height={830}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
