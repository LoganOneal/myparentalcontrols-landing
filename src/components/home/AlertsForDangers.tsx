/**
 * Clone of bark.us "Get alerts for dangers" section.
 *
 * Reference: https://www.bark.us/bark-app/
 *
 * Layout: full-bleed white card with 15px gutter and 8px corners, 1280px
 * inner container with 60px horizontal padding on desktop, centered headline
 * + subtitle, 60px spacer (desktop only), centered phone mockup.
 *
 * Exact source values used:
 *   - H2: Moderat-Black 46px/55.2px desktop, 30px/36px mobile, color #1E1E1E
 *   - Subtitle: 18px/27px desktop, 16px/24px mobile, color #444, max-w 800px
 *   - Phone: 350x633 desktop, 305x551 mobile
 *
 * Phone visual uses our own MPC alerts mockup (public/images/features/alerts.svg)
 * rather than bark's app screenshot.
 */
export function AlertsForDangers() {
  return (
    <section className="px-[15px] mt-[15px]">
      <div className="bg-white rounded-lg py-10 mx-auto max-w-[1395px]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-[60px]">
          <h2
            className="text-center text-[30px] sm:text-4xl lg:text-[46px]"
            style={{
              fontFamily:
                '"Moderat-Black", var(--font-bricolage), sans-serif',
              fontWeight: 400,
              color: "rgb(30, 30, 30)",
              lineHeight: 1.2,
            }}
          >
            Get alerts for dangers — online and in real life
          </h2>

          <div className="mt-7 text-center">
            <p
              className="mx-auto max-w-[800px] px-5 text-base sm:text-lg"
              style={{
                color: "rgb(68, 68, 68)",
                lineHeight: "1.5",
              }}
            >
              Our award-winning parental control app scans for dangers like
              predators, suicidal ideation, violence, and more. You&rsquo;ll
              get notified if there&rsquo;s something wrong.
            </p>
          </div>

          {/* Desktop-only 60px spacer matching bark's wp-block-spacer.mobile-hidden */}
          <div aria-hidden className="hidden sm:block h-[60px]" />

          <div className="mt-10 sm:mt-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/features/alerts.svg"
              alt="MyParentalControls alerts screen — real-time danger detection"
              width={350}
              height={720}
              className="w-[305px] sm:w-[350px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
