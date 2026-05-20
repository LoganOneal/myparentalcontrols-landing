/**
 * Clone of bark.us "Change parental controls and settings with just one tap"
 * section.
 *
 * Reference: https://www.bark.us/bark-app/
 *
 * Layout: rounded-corner card with 15px outer gutter. Top half is a
 * full-width lifestyle photo (hands holding a phone). Bottom half is a deep
 * plum panel (#2D0021) with a centered white headline + subtitle.
 *
 * Extracted spec (desktop):
 *   - Outer card: border-radius 8px, margin 15px, overflow hidden
 *   - Photo block: 525px tall, object-cover
 *   - Purple panel: bg #2D0021, ~92px top space, 40px bottom padding
 *   - H2: Moderat-Black 46px / 55.2px line-height, weight 400, white,
 *         max-w 840px, centered
 *   - Subtitle: 24px / 33.6px line-height, white, max-w 800px, centered,
 *               28px top margin
 */
export function BarkAssistant() {
  return (
    <section className="px-[15px] mt-[15px]">
      {/* No max-width cap — card always spans viewport - 30px, matching
          bark.us behavior on wide monitors (1920px → 1875px wide). */}
      <div className="rounded-lg overflow-hidden">
        {/* Lifestyle photo — picture element for desktop/mobile variants */}
        <div className="relative bg-[#1E1E1E]">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/images/bark-assistant/photo-desktop.webp"
            />
            <img
              src="/images/bark-assistant/photo-mobile.webp"
              alt=""
              aria-hidden
              className="w-full h-[280px] sm:h-[420px] lg:h-[525px] object-cover"
            />
          </picture>
        </div>

        {/* Dark plum text panel */}
        <div className="bg-[#2D0021] text-white pt-12 pb-10 sm:pt-16 lg:pt-[92px] lg:pb-10 px-4 sm:px-[60px]">
          <h2
            className="text-center text-[30px] sm:text-4xl lg:text-[46px] mx-auto max-w-[840px]"
            style={{
              fontFamily: "Moderat-Black, sans-serif",
              fontStyle: "normal",
              fontWeight: 400,
              color: "#FFFFFF",
              lineHeight: 1.2,
            }}
          >
            Change parental controls and settings with just one tap
          </h2>

          <p
            className="mt-7 mx-auto max-w-[800px] text-center text-base sm:text-xl lg:text-[24px] px-5"
            style={{ color: "#FFFFFF", lineHeight: 1.4 }}
          >
            Ask about screen time, block apps, or get insights — the Bark
            Assistant helps you manage everything in one place.
          </p>
        </div>
      </div>
    </section>
  );
}
