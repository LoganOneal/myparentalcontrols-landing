/**
 * Competitor comparison data for CompetitorComparison.tsx.
 *
 * Values per cell:
 *   - "yes"      → green check
 *   - "no"       → gray dash
 *   - "partial"  → amber dot + "Partial" label, with optional footnote
 *   - string     → literal label (e.g. "iOS only") shown in amber
 *
 * Sources (per cell with `note`): bark.us, gabb.com, aura.com, qustodio.com
 * feature pages — current as of the date in COMPARISON_AS_OF.
 *
 * If any value is wrong, update here. The component reads this file.
 */

export const COMPARISON_AS_OF = "2026-05-20";

export type Cell =
  | { value: "yes" }
  | { value: "no" }
  | { value: "partial"; note?: string }
  | { value: "custom"; label: string; note?: string };

export type Column = {
  key: "mpc" | "bark" | "gabb" | "aura" | "qustodio";
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
    name: "MyParentalControls",
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
    key: "gabb",
    name: "Gabb",
    logo: "/images/competitors/gabb.png",
    fallbackColor: "#E5384C",
    tagline: "Locked-down kids' devices",
  },
  {
    key: "aura",
    name: "Aura",
    logo: "/images/competitors/aura.svg",
    fallbackColor: "#3B2E8C",
    tagline: "Identity + family safety",
  },
  {
    key: "qustodio",
    name: "Qustodio",
    logo: "/images/competitors/qustodio.png",
    fallbackColor: "#F37021",
    tagline: "Screen time + filters",
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

export const GROUPS: Group[] = [
  {
    title: "In-game chat (where predators actually live)",
    rows: [
      {
        feature: "Reads Roblox in-game chat",
        cells: {
          mpc: YES,
          bark: NO,
          gabb: NO,
          aura: partial(),
          qustodio: NO,
        },
      },
      {
        feature: "Reads Minecraft in-game chat",
        cells: {
          mpc: YES,
          bark: NO,
          gabb: NO,
          aura: partial(),
          qustodio: NO,
        },
      },
      {
        feature: "Reads Fortnite text + voice",
        cells: {
          mpc: YES,
          bark: NO,
          gabb: NO,
          aura: partial(),
          qustodio: NO,
        },
      },
      {
        feature: "Reads game party / DM channels",
        cells: { mpc: YES, bark: NO, gabb: NO, aura: partial(), qustodio: NO },
      },
    ],
  },
  {
    title: "Social + chat apps",
    rows: [
      {
        feature: "Discord DMs",
        cells: { mpc: YES, bark: YES, gabb: NO, aura: NO, qustodio: NO },
      },
      {
        feature: "Snapchat (vanishing messages)",
        cells: {
          mpc: YES,
          bark: partial(),
          gabb: NO,
          aura: custom("Time only"),
          qustodio: custom("Time only"),
        },
      },
      {
        feature: "Instagram DMs",
        cells: {
          mpc: YES,
          bark: YES,
          gabb: NO,
          aura: NO,
          qustodio: custom("iOS only"),
        },
      },
      {
        feature: "TikTok messages",
        cells: { mpc: YES, bark: YES, gabb: NO, aura: NO, qustodio: partial() },
      },
      {
        feature: "WhatsApp (E2E encrypted)",
        cells: {
          mpc: YES,
          bark: YES,
          gabb: NO,
          aura: NO,
          qustodio: partial(),
        },
      },
    ],
  },
  {
    title: "What it flags",
    rows: [
      {
        feature: "Grooming patterns",
        cells: { mpc: YES, bark: YES, gabb: NO, aura: partial(), qustodio: partial() },
      },
      {
        feature: "Cyberbullying",
        cells: { mpc: YES, bark: YES, gabb: NO, aura: YES, qustodio: partial() },
      },
      {
        feature: "Self-harm / suicide signals",
        cells: { mpc: YES, bark: YES, gabb: NO, aura: NO, qustodio: partial() },
      },
      {
        feature: "Real-time alerts (not weekly digest)",
        cells: {
          mpc: YES,
          bark: YES,
          gabb: NO,
          aura: partial(),
          qustodio: partial(),
        },
      },
    ],
  },
  {
    title: "Platform & friction",
    rows: [
      {
        feature: "Windows desktop",
        cells: { mpc: YES, bark: YES, gabb: NO, aura: YES, qustodio: YES },
      },
      {
        feature: "macOS",
        cells: { mpc: YES, bark: YES, gabb: NO, aura: YES, qustodio: YES },
      },
      {
        feature: "Invisible to child / tamper-resistant",
        cells: { mpc: YES, bark: partial(), gabb: custom("Device only"), aura: partial(), qustodio: partial() },
      },
      {
        feature: "Works without buying a new phone",
        cells: { mpc: YES, bark: YES, gabb: NO, aura: YES, qustodio: YES },
      },
      {
        feature: "Family plan covers multiple kids",
        cells: { mpc: YES, bark: YES, gabb: partial(), aura: YES, qustodio: YES },
      },
    ],
  },
];
