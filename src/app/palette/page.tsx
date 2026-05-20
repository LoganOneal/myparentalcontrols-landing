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
    id: "steady-navy",
    name: "1 · Steady Navy",
    tagline: "Banking · institutional · evidence-based",
    description:
      "Deep navy with a measured medium-blue accent and emerald for positive signals. The palette parents associate with their bank, their insurer, and their kids' pediatric portal — calm authority, not playful.",
    swatches: [
      { label: "Primary", hex: "#0B2A6B", textOnIt: "light" },
      { label: "Primary dark", hex: "#061640", textOnIt: "light" },
      { label: "Accent blue", hex: "#2563EB", textOnIt: "light" },
      { label: "Soft tint", hex: "#EFF4FB", textOnIt: "dark" },
      { label: "Success", hex: "#059669", textOnIt: "light" },
      { label: "Border", hex: "#E2E8F0", textOnIt: "dark" },
      { label: "Text", hex: "#0F172A", textOnIt: "light" },
      { label: "Muted text", hex: "#64748B", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#F8FAFC",
      cardBg: "#FFFFFF",
      border: "#E2E8F0",
      primary: "#0B2A6B",
      primaryHover: "#061640",
      primaryFg: "#FFFFFF",
      accent: "#2563EB",
      accentSoft: "#EFF4FB",
      accentSoftText: "#0B2A6B",
      textPrimary: "#0F172A",
      textMuted: "#64748B",
    },
  },
  {
    id: "calm-teal",
    name: "2 · Calm Teal (current)",
    tagline: "Healthcare · clinical calm · clean tech",
    description:
      "What's currently on the site. Teal as a single chromatic accent on a white canvas, with neutral grays for hierarchy. Feels like a modern health app — reassuring without being heavy.",
    swatches: [
      { label: "Primary", hex: "#14B8A6", textOnIt: "light" },
      { label: "Primary dark", hex: "#0D9488", textOnIt: "light" },
      { label: "Soft tint", hex: "#F0FDFA", textOnIt: "dark" },
      { label: "Background", hex: "#FFFFFF", textOnIt: "dark" },
      { label: "Border", hex: "#E5E7EB", textOnIt: "dark" },
      { label: "Text", hex: "#111827", textOnIt: "light" },
      { label: "Muted text", hex: "#6B7280", textOnIt: "light" },
      { label: "Alert red", hex: "#EF4444", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "#E5E7EB",
      primary: "#14B8A6",
      primaryHover: "#0D9488",
      primaryFg: "#FFFFFF",
      accent: "#14B8A6",
      accentSoft: "#F0FDFA",
      accentSoftText: "#0D9488",
      textPrimary: "#111827",
      textMuted: "#6B7280",
    },
  },
  {
    id: "warm-sage",
    name: "3 · Warm Sage",
    tagline: "Organic · family-first · earthy calm",
    description:
      "Deep sage primary on a warm cream canvas, with a champagne-amber accent. The palette of a thoughtful family brand — closer to a wellness or homeschool product than a security tool. Soft, not sterile.",
    swatches: [
      { label: "Primary", hex: "#4A7C59", textOnIt: "light" },
      { label: "Primary dark", hex: "#2F4F3A", textOnIt: "light" },
      { label: "Soft tint", hex: "#EAF0E8", textOnIt: "dark" },
      { label: "Background", hex: "#FBFAF6", textOnIt: "dark" },
      { label: "Accent amber", hex: "#D9A05B", textOnIt: "dark" },
      { label: "Border", hex: "#E5E1D5", textOnIt: "dark" },
      { label: "Text", hex: "#1F2D24", textOnIt: "light" },
      { label: "Muted text", hex: "#6B6357", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FBFAF6",
      cardBg: "#FFFFFF",
      border: "#E5E1D5",
      primary: "#4A7C59",
      primaryHover: "#2F4F3A",
      primaryFg: "#FFFFFF",
      accent: "#D9A05B",
      accentSoft: "#EAF0E8",
      accentSoftText: "#2F4F3A",
      textPrimary: "#1F2D24",
      textMuted: "#6B6357",
    },
  },
  {
    id: "premium-plum",
    name: "4 · Premium Plum & Gold",
    tagline: "Premium service · exclusive · confidential",
    description:
      "Deep plum as the dominant card color with champagne gold as the accent. Reads as a high-end subscription — the visual register of a private security firm or a concierge service. Most distinct from the parental-control category.",
    swatches: [
      { label: "Primary", hex: "#2D0021", textOnIt: "light" },
      { label: "Primary dark", hex: "#1A0014", textOnIt: "light" },
      { label: "Accent gold", hex: "#C19A5B", textOnIt: "dark" },
      { label: "Soft cream", hex: "#F8F3E8", textOnIt: "dark" },
      { label: "Background", hex: "#FFFFFF", textOnIt: "dark" },
      { label: "Border", hex: "#EDE6D7", textOnIt: "dark" },
      { label: "Text", hex: "#1F1820", textOnIt: "light" },
      { label: "Muted text", hex: "#6B5F70", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "#EDE6D7",
      primary: "#2D0021",
      primaryHover: "#1A0014",
      primaryFg: "#F8F3E8",
      accent: "#C19A5B",
      accentSoft: "#F8F3E8",
      accentSoftText: "#2D0021",
      textPrimary: "#1F1820",
      textMuted: "#6B5F70",
    },
  },
  {
    id: "modern-indigo",
    name: "5 · Modern Indigo",
    tagline: "Tech-forward · approachable · 2026",
    description:
      "Indigo primary with a warm amber accent and crisp neutrals. The palette of a modern SaaS — Linear, Vercel, Stripe — but warmed slightly to feel friendly rather than corporate. Confident without being severe.",
    swatches: [
      { label: "Primary", hex: "#4338CA", textOnIt: "light" },
      { label: "Primary dark", hex: "#312E81", textOnIt: "light" },
      { label: "Accent amber", hex: "#F59E0B", textOnIt: "dark" },
      { label: "Soft tint", hex: "#EEF2FF", textOnIt: "dark" },
      { label: "Background", hex: "#FAFAFA", textOnIt: "dark" },
      { label: "Border", hex: "#E5E7EB", textOnIt: "dark" },
      { label: "Text", hex: "#1F2937", textOnIt: "light" },
      { label: "Muted text", hex: "#6B7280", textOnIt: "light" },
    ],
    preview: {
      pageBg: "#FAFAFA",
      cardBg: "#FFFFFF",
      border: "#E5E7EB",
      primary: "#4338CA",
      primaryHover: "#312E81",
      primaryFg: "#FFFFFF",
      accent: "#F59E0B",
      accentSoft: "#EEF2FF",
      accentSoftText: "#312E81",
      textPrimary: "#1F2937",
      textMuted: "#6B7280",
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
          Protect my child now
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
            Five color schemes for trust
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "#4B5563" }}
          >
            Each option below shows the same MyParentalControls alert card
            re-skinned in a different palette. The point isn&rsquo;t to pick
            colors in the abstract — it&rsquo;s to see which set of colors
            actually feels right when a parent is reading &ldquo;your child
            may be at risk online.&rdquo;
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
