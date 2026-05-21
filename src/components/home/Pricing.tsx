import { TryForFreeButton } from "@/components/wizard/TryForFreeButton";

/**
 * Pricing & Details — visual layout cloned from bark.us/bark-app/. Dark
 * card on a light background, centered heading, checkmark feature list,
 * large price stack, primary blue CTA pill. Copy is MyParentalControls'
 * own.
 */

const FEATURES = [
  "Read every chat inside Roblox, Discord, Fortnite, and 12+ other apps",
  "Real-time alerts to your phone the second something looks off",
  "Catches predators, bullies, and self-harm signals automatically",
  "Invisible to your kid — won’t block their friends or slow them down",
  "Works across Windows and macOS, plus every app they use",
  "Family plan covers every device in your home — up to 5 kids",
  "5-minute setup. Cancel anytime. No contract.",
];

function Checkmark() {
  return (
    <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#2E54FF]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-4 h-4 lg:w-5 lg:h-5"
        aria-hidden
      >
        <path
          d="M5 12l4.5 4.5L19 7"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="px-5 lg:px-8 py-12 lg:py-24">
      <div
        className="max-w-[1280px] mx-auto rounded-[20px] px-6 py-10 sm:px-10 sm:py-14 lg:p-[60px] flex flex-col items-center"
        style={{ backgroundColor: "rgb(30, 30, 30)" }}
      >
        <h2
          className="text-center"
          style={{
            color: "rgb(255, 255, 255)",
            fontFamily: "Moderat-Black, sans-serif",
            fontSize: "clamp(32px, 4vw, 46px)",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Pricing &amp; Details
        </h2>

        <ul className="mt-8 lg:mt-12 max-w-[800px] w-full">
          {FEATURES.map((f, i) => (
            <li
              key={i}
              className={`flex items-start gap-4 sm:gap-5 lg:gap-6 ${
                i === 0 ? "" : "mt-5 sm:mt-7 lg:mt-9"
              }`}
            >
              <Checkmark />
              <span
                className="text-white"
                style={{
                  fontSize: "clamp(16px, 1.5vw, 24px)",
                  lineHeight: 1.4,
                }}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 lg:mt-14 flex flex-col items-center">
          <span className="text-white/70 text-sm sm:text-base">Starts at</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span
              className="text-white tracking-tight"
              style={{
                fontFamily:
                  "Moderat-Black, sans-serif",
                fontSize: "clamp(56px, 8vw, 96px)",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              $14.99
            </span>
            <span className="text-white/70 text-base sm:text-lg">/mo</span>
          </div>
          <p className="text-white/50 text-xs sm:text-sm mt-3">
            Family plan · Up to 5 kids · No setup fees
          </p>
        </div>

        <TryForFreeButton variant="pricing" />
      </div>
    </section>
  );
}
