export const COMPARISON_AS_OF = "2026-05-23";

export type Cell =
  | { value: "yes" }
  | { value: "no" }
  | { value: "partial" }
  | { value: "custom"; label: string };

export type Column = {
  key: "mpc" | "bark" | "qustodio" | "aura" | "apple";
  name: string;
  logo?: string;
  fallbackColor: string;
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
  hint?: string;
  cells: Record<Column["key"], Cell>;
};

export type Group = {
  title: string;
  rows: Row[];
};

const YES: Cell = { value: "yes" };
const NO: Cell = { value: "no" };
const PARTIAL: Cell = { value: "partial" };
const custom = (label: string): Cell => ({ value: "custom", label });

export const GROUPS: Group[] = [
  {
    title: "PC game voice + chat monitoring",
    rows: [
      {
        feature: "Reads Roblox in-game voice + chat",
        cells: { mpc: YES, bark: NO, qustodio: NO, aura: NO, apple: NO },
      },
      {
        feature: "Reads Minecraft in-game chat",
        cells: { mpc: YES, bark: NO, qustodio: NO, aura: NO, apple: NO },
      },
      {
        feature: "Reads Fortnite voice + party chat",
        cells: { mpc: YES, bark: NO, qustodio: NO, aura: NO, apple: NO },
      },
      {
        feature: "Covers all PC games (not just named titles)",
        hint: "Works even when new games launch",
        cells: { mpc: YES, bark: NO, qustodio: NO, aura: NO, apple: NO },
      },
    ],
  },
  {
    title: "What it flags",
    rows: [
      {
        feature: "Grooming risk detection",
        hint: "Age-gap pressure, isolation tactics, gift offers",
        cells: { mpc: YES, bark: PARTIAL, qustodio: NO, aura: PARTIAL, apple: NO },
      },
      {
        feature: "Bullying + threat alerts",
        cells: { mpc: YES, bark: YES, qustodio: PARTIAL, aura: YES, apple: NO },
      },
      {
        feature: "Clip, transcript, and timestamp",
        hint: "Evidence you can act on — not just a vague alert",
        cells: { mpc: YES, bark: NO, qustodio: NO, aura: NO, apple: NO },
      },
      {
        feature: "Real-time parent alerts",
        hint: "Notified when it happens, not days later",
        cells: { mpc: YES, bark: PARTIAL, qustodio: PARTIAL, aura: PARTIAL, apple: NO },
      },
      {
        feature: "Lets kids keep playing safely",
        hint: "Monitors without pausing or blocking the game",
        cells: {
          mpc: YES,
          bark: YES,
          qustodio: PARTIAL,
          aura: YES,
          apple: custom("Block only"),
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
        cells: { mpc: YES, bark: PARTIAL, qustodio: PARTIAL, aura: PARTIAL, apple: PARTIAL },
      },
      {
        feature: "Works without buying a new device",
        cells: {
          mpc: YES,
          bark: YES,
          qustodio: YES,
          aura: YES,
          apple: custom("Apple only"),
        },
      },
      {
        feature: "Family plan covers multiple kids",
        cells: { mpc: YES, bark: YES, qustodio: YES, aura: YES, apple: YES },
      },
    ],
  },
];
