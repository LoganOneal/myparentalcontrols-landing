/**
 * Competitor comparison data for CompetitorComparison.tsx.
 *
 * Values per cell:
 *   - "yes"      → green check
 *   - "no"       → gray dash
 *   - "partial"  → amber dot + "Partial" label, with optional footnote
 *   - string     → literal label (e.g. "iOS only") shown in amber
 *
 * Sources (per cell with `note`): bark.us, aura.com, qustodio.com,
 * support.apple.com, apple.com/child-safety
 * feature pages — current as of the date in COMPARISON_AS_OF.
 *
 * If any value is wrong, update here. The component reads this file.
 */

export const COMPARISON_AS_OF = "2026-05-23";

export type Cell =
  | { value: "yes" }
  | { value: "no" }
  | { value: "partial"; note?: string }
  | { value: "custom"; label: string; note?: string };

export type Column = {
  key: "mpc" | "bark" | "qustodio" | "aura" | "apple";
  name: string;
  /** Explicit path to the wordmark file inside /public. If omitted, the
   *  header renders a styled text wordmark in `fallbackColor`. */
  logo?: string;
  /** Brand color used for the text wordmark fallback. */
  fallbackColor: string;
  /** Optional one-line tagline shown under the header. */
  tagline?: string;
};

export const COLUMNS: Column[] = [
  {
    key: "mpc",
    name: "Koda",
    fallbackColor: "#2563EB",
    tagline: "Reads inside the games",
  },
  {
    key: "bark",
    name: "Bark",
    logo: "/images/competitors/bark.png",
    fallbackColor: "#2659E5",
    tagline: "Social + text monitoring",
  },
  {
    key: "qustodio",
    name: "Qustodio",
    logo: "/images/competitors/qustodio.png",
    fallbackColor: "#F37021",
    tagline: "Screen time + filters",
  },
  {
    key: "aura",
    name: "Aura",
    logo: "/images/competitors/aura.svg",
    fallbackColor: "#3B2E8C",
    tagline: "Identity + family safety",
  },
  {
    key: "apple",
    name: "Apple Screen Time",
    fallbackColor: "#111827",
    tagline: "Built-in Apple controls",
  },
];

export type Row = {
  feature: string;
  /** Subtle helper text under the row label. */
  hint?: string;
  /** Keyed by Column.key. */
  cells: Record<Column["key"], Cell>;
};

export type Group = {
  title: string;
  rows: Row[];
};

const YES: Cell = { value: "yes" };
const NO: Cell = { value: "no" };
const partial = (note?: string): Cell => ({ value: "partial", note });
const custom = (label: string, note?: string): Cell => ({
  value: "custom",
  label,
  note,
});
const APPLE_TIME_ONLY_NOTE =
  "Apple Screen Time can set app limits and show activity, but it does not read the content of third-party chats.";
const APPLE_MEDIA_ONLY_NOTE =
  "Apple Communication Safety focuses on sensitive photos and videos; Apple says parents are not proactively notified and message contents are not shared.";
const APPLE_PLATFORM_NOTE =
  "Screen Time parental controls are built into iPhone, iPad, and Mac and require Apple family/device setup.";

export const GROUPS: Group[] = [
  {
    title: "In-game chat (where predators actually live)",
    rows: [
      {
        feature: "Reads Roblox in-game chat",
        cells: {
          mpc: YES,
          bark: NO,
          aura: partial(),
          qustodio: NO,
          apple: NO,
        },
      },
      {
        feature: "Reads Minecraft in-game chat",
        cells: {
          mpc: YES,
          bark: NO,
          aura: partial(),
          qustodio: NO,
          apple: NO,
        },
      },
      {
        feature: "Reads Fortnite text + voice",
        cells: {
          mpc: YES,
          bark: NO,
          aura: partial(),
          qustodio: NO,
          apple: NO,
        },
      },
      {
        feature: "Reads game party / DM channels",
        cells: {
          mpc: YES,
          bark: NO,
          qustodio: NO,
          aura: partial(),
          apple: NO,
        },
      },
    ],
  },
  {
    title: "Social + chat apps",
    rows: [
      {
        feature: "Discord DMs",
        cells: { mpc: YES, bark: YES, qustodio: NO, aura: NO, apple: NO },
      },
      {
        feature: "Snapchat (vanishing messages)",
        cells: {
          mpc: YES,
          bark: partial(),
          qustodio: custom("Time only"),
          aura: custom("Time only"),
          apple: custom("Time only", APPLE_TIME_ONLY_NOTE),
        },
      },
      {
        feature: "Instagram DMs",
        cells: {
          mpc: YES,
          bark: YES,
          qustodio: custom("iOS only"),
          aura: NO,
          apple: custom("Time only", APPLE_TIME_ONLY_NOTE),
        },
      },
      {
        feature: "TikTok messages",
        cells: {
          mpc: YES,
          bark: YES,
          qustodio: partial(),
          aura: NO,
          apple: custom("Time only", APPLE_TIME_ONLY_NOTE),
        },
      },
      {
        feature: "WhatsApp (E2E encrypted)",
        cells: {
          mpc: YES,
          bark: YES,
          qustodio: partial(),
          aura: NO,
          apple: custom("Time only", APPLE_TIME_ONLY_NOTE),
        },
      },
    ],
  },
  {
    title: "What it flags",
    rows: [
      {
        feature: "Grooming patterns",
        cells: {
          mpc: YES,
          bark: YES,
          qustodio: partial(),
          aura: partial(),
          apple: custom("Media only", APPLE_MEDIA_ONLY_NOTE),
        },
      },
      {
        feature: "Cyberbullying",
        cells: {
          mpc: YES,
          bark: YES,
          qustodio: partial(),
          aura: YES,
          apple: NO,
        },
      },
      {
        feature: "Self-harm / suicide signals",
        cells: {
          mpc: YES,
          bark: YES,
          qustodio: partial(),
          aura: NO,
          apple: NO,
        },
      },
      {
        feature: "Real-time alerts (not weekly digest)",
        cells: {
          mpc: YES,
          bark: YES,
          qustodio: partial(),
          aura: partial(),
          apple: NO,
        },
      },
    ],
  },
  {
    title: "Platform & friction",
    rows: [
      {
        feature: "Windows desktop",
        cells: { mpc: YES, bark: YES, qustodio: YES, aura: YES, apple: NO },
      },
      {
        feature: "macOS",
        cells: { mpc: YES, bark: YES, qustodio: YES, aura: YES, apple: YES },
      },
      {
        feature: "Invisible to child / tamper-resistant",
        cells: {
          mpc: YES,
          bark: partial(),
          qustodio: partial(),
          aura: partial(),
          apple: partial(APPLE_PLATFORM_NOTE),
        },
      },
      {
        feature: "Works without buying a new phone",
        cells: {
          mpc: YES,
          bark: YES,
          qustodio: YES,
          aura: YES,
          apple: custom("Apple only", APPLE_PLATFORM_NOTE),
        },
      },
      {
        feature: "Family plan covers multiple kids",
        cells: { mpc: YES, bark: YES, qustodio: YES, aura: YES, apple: YES },
      },
    ],
  },
];
