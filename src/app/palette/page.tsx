import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color palette options · MyParentalControls",
  description:
    "Five trust-evoking color schemes for the MyParentalControls product. Compare and choose.",
};

type Palette = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Ordered swatches: most-used to least-used. */
  swatches: { label: string; hex: string; textOnIt?: "light" | "dark" }[];
  /** Resolved tokens used by the preview card. */
  preview: {
    pageBg: string;
    cardBg: string;
    border: string;
    primary: string;
    primaryHover: string;
    primaryFg: string;
    accent: string;
    accentSoft: string;
    accentSoftText: string;
    textPrimary: string;
    textMuted: string;
  };
};

const PALETTES: Palette[] = [
  {
    id: "cobalt-blue",
    name: "1 · Cobalt Blue",
    tagline: "Stripe · Robinhood · vivid financial trust",
    description:
      "Pure vivid royal blue (#2563EB) on a crisp white canvas, with a warm amber accent for energy. This is the modern fintech trust palette — bright enough to feel current, saturated enough to feel like infrastructure.",
    swatches: [
      { label: "Primary", hex: "#2563EB", textOnIt: "light" },
      { label: "Primary dark", hex: "#1D4ED8", textOnIt: "light" },
      { label: "Soft tint", hex: "#EFF6FF", textOnIt: "dark" },
      { label: "Accent amber", hex: "#F59E0B", textOnIt: "dark" },
      { label: "Background", hex: "#FFFFFF", textOnIt: "dark" },
      { label: "Border", hex: "#E5E7EB", textOnIt: "dark" },
      { label: "Text", hex: "#0F172A", textOnIt: "light" },
      { label: "Muted text", hex: "#64748B", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "#E5E7EB",
      primary: "#2563EB",
      primaryHover: "#1D4ED8",
      primaryFg: "#FFFFFF",
      accent: "#F59E0B",
      accentSoft: "#EFF6FF",
      accentSoftText: "#1D4ED8",
      textPrimary: "#0F172A",
      textMuted: "#64748B",
    },
  },
  {
    id: "royal-indigo",
    name: "2 · Royal Indigo",
    tagline: "Deeper, regal · premium SaaS",
    description:
      "A step deeper toward purple — same vivid energy as cobalt but with more authority. Pairs with a cyan accent for an unexpectedly fresh secondary color. Confident without being severe.",
    swatches: [
      { label: "Primary", hex: "#4338CA", textOnIt: "light" },
      { label: "Primary dark", hex: "#3730A3", textOnIt: "light" },
      { label: "Soft tint", hex: "#EEF2FF", textOnIt: "dark" },
      { label: "Accent cyan", hex: "#06B6D4", textOnIt: "light" },
      { label: "Background", hex: "#FFFFFF", textOnIt: "dark" },
      { label: "Border", hex: "#E5E7EB", textOnIt: "dark" },
      { label: "Text", hex: "#111827", textOnIt: "light" },
      { label: "Muted text", hex: "#6B7280", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "#E5E7EB",
      primary: "#4338CA",
      primaryHover: "#3730A3",
      primaryFg: "#FFFFFF",
      accent: "#06B6D4",
      accentSoft: "#EEF2FF",
      accentSoftText: "#3730A3",
      textPrimary: "#111827",
      textMuted: "#6B7280",
    },
  },
  {
    id: "stripe-purple",
    name: "3 · Stripe Purple",
    tagline: "Flagship SaaS · trusted-by-default",
    description:
      "The exact bright-violet wavelength Stripe uses (#635BFF). Reads instantly as a premium API-style product. Pairs with coral for unexpected warmth. The least \"category-like\" of the bunch.",
    swatches: [
      { label: "Primary", hex: "#635BFF", textOnIt: "light" },
      { label: "Primary dark", hex: "#4F46E5", textOnIt: "light" },
      { label: "Soft tint", hex: "#F1F0FF", textOnIt: "dark" },
      { label: "Accent coral", hex: "#FB7185", textOnIt: "light" },
      { label: "Background", hex: "#FFFFFF", textOnIt: "dark" },
      { label: "Border", hex: "#E5E7EB", textOnIt: "dark" },
      { label: "Text", hex: "#0A2540", textOnIt: "light" },
      { label: "Muted text", hex: "#425466", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "#E5E7EB",
      primary: "#635BFF",
      primaryHover: "#4F46E5",
      primaryFg: "#FFFFFF",
      accent: "#FB7185",
      accentSoft: "#F1F0FF",
      accentSoftText: "#4F46E5",
      textPrimary: "#0A2540",
      textMuted: "#425466",
    },
  },
  {
    id: "vivid-violet",
    name: "4 · Vivid Violet",
    tagline: "Linear · Loom · modern creative tech",
    description:
      "Saturated violet (#7C3AED) with a soft pink accent. Same family as Stripe Purple but pulled toward magenta — louder, more memorable. Best if you want the brand to feel distinctly NOT another security app.",
    swatches: [
      { label: "Primary", hex: "#7C3AED", textOnIt: "light" },
      { label: "Primary dark", hex: "#6D28D9", textOnIt: "light" },
      { label: "Soft tint", hex: "#F5F3FF", textOnIt: "dark" },
      { label: "Accent pink", hex: "#EC4899", textOnIt: "light" },
      { label: "Background", hex: "#FFFFFF", textOnIt: "dark" },
      { label: "Border", hex: "#E5E7EB", textOnIt: "dark" },
      { label: "Text", hex: "#18181B", textOnIt: "light" },
      { label: "Muted text", hex: "#71717A", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "#E5E7EB",
      primary: "#7C3AED",
      primaryHover: "#6D28D9",
      primaryFg: "#FFFFFF",
      accent: "#EC4899",
      accentSoft: "#F5F3FF",
      accentSoftText: "#6D28D9",
      textPrimary: "#18181B",
      textMuted: "#71717A",
    },
  },
  {
    id: "open-sky",
    name: "5 · Open Sky",
    tagline: "Optimistic · open · friendly trust",
    description:
      "Brighter, lighter blue (#0EA5E9) with a punchy orange accent. Feels less heavy than cobalt — more \"we're on your side\" than \"we're the institution.\" Great if the messaging leans warmer.",
    swatches: [
      { label: "Primary", hex: "#0EA5E9", textOnIt: "light" },
      { label: "Primary dark", hex: "#0284C7", textOnIt: "light" },
      { label: "Soft tint", hex: "#F0F9FF", textOnIt: "dark" },
      { label: "Accent orange", hex: "#FB923C", textOnIt: "dark" },
      { label: "Background", hex: "#FFFFFF", textOnIt: "dark" },
      { label: "Border", hex: "#E2E8F0", textOnIt: "dark" },
      { label: "Text", hex: "#0C4A6E", textOnIt: "light" },
      { label: "Muted text", hex: "#64748B", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "#E2E8F0",
      primary: "#0EA5E9",
      primaryHover: "#0284C7",
      primaryFg: "#FFFFFF",
      accent: "#FB923C",
      accentSoft: "#F0F9FF",
      accentSoftText: "#0284C7",
      textPrimary: "#0C4A6E",
      textMuted: "#64748B",
    },
  },
  {
    id: "emerald-fintech",
    name: "6 · Emerald + Blue",
    tagline: "Vercel · Spotify · positive-action energy",
    description:
      "Bright emerald primary (#10B981) with cobalt blue (#2563EB) as the secondary accent. Green carries \"safe, all-clear\" semantics — useful when the product's job is reassurance, not alarm.",
    swatches: [
      { label: "Primary", hex: "#10B981", textOnIt: "light" },
      { label: "Primary dark", hex: "#059669", textOnIt: "light" },
      { label: "Soft tint", hex: "#ECFDF5", textOnIt: "dark" },
      { label: "Accent blue", hex: "#2563EB", textOnIt: "light" },
      { label: "Background", hex: "#FFFFFF", textOnIt: "dark" },
      { label: "Border", hex: "#E5E7EB", textOnIt: "dark" },
      { label: "Text", hex: "#064E3B", textOnIt: "light" },
      { label: "Muted text", hex: "#6B7280", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "#E5E7EB",
      primary: "#10B981",
      primaryHover: "#059669",
      primaryFg: "#FFFFFF",
      accent: "#2563EB",
      accentSoft: "#ECFDF5",
      accentSoftText: "#059669",
      textPrimary: "#064E3B",
      textMuted: "#6B7280",
    },
  },
  {
    id: "electric-cyan",
    name: "7 · Electric Cyan",
    tagline: "Adobe · Twilio · fresh & technical",
    description:
      "Vivid cyan (#06B6D4) that sits between sky and teal. Distinct enough to not blur with everything-blue competitors, bright enough to feel current. Pairs with magenta for high-contrast accents.",
    swatches: [
      { label: "Primary", hex: "#06B6D4", textOnIt: "light" },
      { label: "Primary dark", hex: "#0891B2", textOnIt: "light" },
      { label: "Soft tint", hex: "#ECFEFF", textOnIt: "dark" },
      { label: "Accent magenta", hex: "#D946EF", textOnIt: "light" },
      { label: "Background", hex: "#FFFFFF", textOnIt: "dark" },
      { label: "Border", hex: "#E5E7EB", textOnIt: "dark" },
      { label: "Text", hex: "#0E2A33", textOnIt: "light" },
      { label: "Muted text", hex: "#64748B", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "#E5E7EB",
      primary: "#06B6D4",
      primaryHover: "#0891B2",
      primaryFg: "#FFFFFF",
      accent: "#D946EF",
      accentSoft: "#ECFEFF",
      accentSoftText: "#0891B2",
      textPrimary: "#0E2A33",
      textMuted: "#64748B",
    },
  },
  {
    id: "twilight-blue",
    name: "8 · Twilight Blue",
    tagline: "Bright cobalt on dark · cinematic",
    description:
      "Same cobalt blue as #1, but on a near-black page bg. Reads as a premium night-mode product (Linear's marketing site, Cursor, Arc). Bright accent pops harder against the dark. Use if the brand should feel powerful.",
    swatches: [
      { label: "Primary", hex: "#3B82F6", textOnIt: "light" },
      { label: "Primary dark", hex: "#2563EB", textOnIt: "light" },
      { label: "Soft tint", hex: "#1E293B", textOnIt: "light" },
      { label: "Accent amber", hex: "#FBBF24", textOnIt: "dark" },
      { label: "Page bg", hex: "#0B1220", textOnIt: "light" },
      { label: "Card bg", hex: "#111A2E", textOnIt: "light" },
      { label: "Text", hex: "#F1F5F9", textOnIt: "dark" },
      { label: "Muted text", hex: "#94A3B8", textOnIt: "dark" },
    ],
    preview: {
      pageBg: "#0B1220",
      cardBg: "#111A2E",
      border: "#1F2A44",
      primary: "#3B82F6",
      primaryHover: "#2563EB",
      primaryFg: "#FFFFFF",
      accent: "#FBBF24",
      accentSoft: "#1E293B",
      accentSoftText: "#93C5FD",
      textPrimary: "#F1F5F9",
      textMuted: "#94A3B8",
    },
  },
];

function Swatch({
  label,
  hex,
  textOnIt,
}: {
  label: string;
  hex: string;
  textOnIt?: "light" | "dark";
}) {
  const textColor = textOnIt === "light" ? "#FFFFFF" : "#1F2937";
  return (
    <div className="flex flex-col">
      <div
        className="rounded-lg h-20 sm:h-24 flex items-end p-3 border"
        style={{ background: hex, color: textColor, borderColor: "#E5E7EB" }}
      >
        <div className="text-xs font-mono opacity-90">{hex.toUpperCase()}</div>
      </div>
      <div className="mt-1.5 text-xs text-gray-700">{label}</div>
    </div>
  );
}

/**
 * Mini MPC-style preview card using the palette's tokens. Same skeleton for
 * every palette so the eye can compare the chrome, not the layout.
 */
function PreviewCard({ p }: { p: Palette["preview"] }) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        background: p.pageBg,
        border: `1px solid ${p.border}`,
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
          style={{ background: p.primary, color: p.primaryFg }}
        >
          M
        </div>
        <div>
          <div
            className="text-sm font-semibold"
            style={{ color: p.textPrimary }}
          >
            MyParentalControls
          </div>
          <div className="text-xs" style={{ color: p.textMuted }}>
            3 new alerts this morning
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span
            className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-full"
            style={{ background: p.accentSoft, color: p.accentSoftText }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* Featured alert card */}
      <div
        className="rounded-xl p-4 mb-3"
        style={{
          background: p.cardBg,
          border: `1px solid ${p.border}`,
          borderLeft: `4px solid ${p.primary}`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-full"
            style={{ background: "#1f2937", color: "#FFFFFF" }}
          >
            ROBLOX
          </span>
          <span
            className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-full"
            style={{ background: p.accentSoft, color: p.accentSoftText }}
          >
            PREDATOR CONTACT
          </span>
          <span
            className="ml-auto text-[11px]"
            style={{ color: p.textMuted }}
          >
            2m ago
          </span>
        </div>
        <div
          className="text-sm font-semibold leading-snug"
          style={{ color: p.textPrimary }}
        >
          Stranger asked Lily to move the chat to Discord
        </div>
        <div className="text-xs mt-1.5" style={{ color: p.textMuted }}>
          &ldquo;hey lol, my mic is broken on here. add me on disc?&rdquo;
        </div>
      </div>

      {/* Secondary alert */}
      <div
        className="rounded-xl p-3 flex items-center gap-3 mb-5"
        style={{ background: p.cardBg, border: `1px solid ${p.border}` }}
      >
        <div
          className="w-8 h-8 rounded-lg flex-shrink-0"
          style={{ background: p.accentSoft }}
        />
        <div className="flex-1 min-w-0">
          <div
            className="text-xs font-semibold"
            style={{ color: p.textPrimary }}
          >
            All clear · Minecraft, Fortnite
          </div>
          <div className="text-[11px]" style={{ color: p.textMuted }}>
            12 chats reviewed, nothing flagged
          </div>
        </div>
      </div>

      {/* CTA + link */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="px-4 py-2.5 rounded-full text-sm font-semibold"
          style={{ background: p.primary, color: p.primaryFg }}
        >
          Get Started
        </button>
        <a
          href="#"
          className="text-sm font-semibold"
          style={{ color: p.accent }}
        >
          See full report &rarr;
        </a>
      </div>
    </div>
  );
}

export default function PalettePage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <header className="mb-12 sm:mb-16 max-w-2xl">
          <div
            className="text-[11px] font-bold tracking-[1.4px] uppercase mb-3"
            style={{ color: "#6B7280" }}
          >
            Design exploration
          </div>
          <h1
            className="text-[36px] sm:text-[48px] leading-[1.15] mb-4"
            style={{
              fontFamily: "Moderat-Black, sans-serif",
              fontWeight: 400,
              color: "rgb(30, 30, 30)",
            }}
          >
            Bright color schemes for trust
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "#4B5563" }}
          >
            Eight options anchored around vivid hues like{" "}
            <span
              className="font-mono px-1.5 py-0.5 rounded"
              style={{ background: "#EFF6FF", color: "#1D4ED8" }}
            >
              #2563EB
            </span>
            . Each row shows the same MyParentalControls alert card re-skinned
            in a different palette — judge the chrome, not the layout.
          </p>
        </header>

        <div className="space-y-16 sm:space-y-20">
          {PALETTES.map((palette) => (
            <section
              key={palette.id}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-start"
            >
              {/* Left: name, description, swatches */}
              <div>
                <h2
                  className="text-[24px] sm:text-[28px] leading-tight mb-2"
                  style={{
                    fontFamily: "Moderat-Black, sans-serif",
                    fontWeight: 400,
                    color: "rgb(30, 30, 30)",
                  }}
                >
                  {palette.name}
                </h2>
                <div
                  className="text-xs font-semibold tracking-wide uppercase mb-3"
                  style={{ color: "#6B7280" }}
                >
                  {palette.tagline}
                </div>
                <p
                  className="text-sm sm:text-base mb-6 leading-relaxed"
                  style={{ color: "#4B5563" }}
                >
                  {palette.description}
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {palette.swatches.map((s) => (
                    <Swatch
                      key={s.label}
                      label={s.label}
                      hex={s.hex}
                      textOnIt={s.textOnIt}
                    />
                  ))}
                </div>
              </div>

              {/* Right: live preview */}
              <PreviewCard p={palette.preview} />
            </section>
          ))}
        </div>

        <footer
          className="mt-20 pt-8 border-t text-sm"
          style={{ color: "#6B7280", borderColor: "#E5E7EB" }}
        >
          Once you pick one, the chosen palette can replace the current teal
          tokens in <code>globals.css</code> and propagate across every
          section.
        </footer>
      </div>
    </main>
  );
}
