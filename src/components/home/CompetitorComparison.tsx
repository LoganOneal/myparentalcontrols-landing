"use client";

import * as React from "react";
import {
  COLUMNS,
  GROUPS,
  COMPARISON_AS_OF,
  type Cell,
  type Column,
} from "@/data/competitors";

/**
 * Side-by-side comparison table — MPC vs Bark, Gabb, Aura, Qustodio.
 *
 * Layout: classic feature table. MPC column is highlighted (blue tint +
 * cobalt checks). On mobile the table horizontally scrolls within its
 * section because stacking 5 columns × 17 rows = unreadable.
 *
 * Data lives in src/data/competitors.ts so cells can be edited without
 * touching this component.
 *
 * Logos: each column's header looks for an SVG/PNG at
 *   /images/competitors/<column.key>.{svg,png}
 * If neither exists the header falls back to a styled text wordmark.
 */

const MPC_KEY = "mpc";

/**
 * Three contrast cards rendered below the comparison table. Each pairs an
 * MPC strength with a specific competitor's gap, picked to span the
 * archetypes (Bark = social monitoring, Aura = all-in-one safety,
 * Gabb = locked hardware).
 */
const CONTRAST_CARDS: Array<{
  competitor: string;
  mpcLine: string;
  competitorLine: string;
}> = [
  {
    competitor: "Bark",
    mpcLine: "Reads inside Roblox, Minecraft, and Fortnite chat.",
    competitorLine:
      "Bark stops at social apps and texts — in-game chats slip through.",
  },
  {
    competitor: "Aura",
    mpcLine: "Every chat watched in real time, right on the device.",
    competitorLine:
      "Aura's own disclaimer: its service doesn't monitor all content in real time.",
  },
  {
    competitor: "Gabb",
    mpcLine: "Works on the PC your kid already uses.",
    competitorLine:
      "Gabb requires buying a new phone or watch — and only their hardware.",
  },
];

function CellIcon({ cell }: { cell: Cell }) {
  if (cell.value === "yes") {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 ring-1 ring-emerald-200/70"
        aria-label="Yes"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-emerald-600"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 12l4.5 4.5L19 7"
            stroke="currentColor"
            strokeWidth={3.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (cell.value === "no") {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 ring-1 ring-gray-200/80"
        aria-label="No"
      >
        <span className="block w-3 h-[2px] bg-gray-400 rounded-full" aria-hidden />
      </span>
    );
  }
  if (cell.value === "partial") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 ring-1 ring-amber-200/80 px-2 py-1 text-amber-700">
        <span className="block w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden />
        <span className="text-[11px] font-semibold tracking-tight">Partial</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 ring-1 ring-amber-200/80 px-2 py-1 text-[11px] font-semibold tracking-tight text-amber-700">
      {cell.label}
    </span>
  );
}

/** MPC's cell uses a solid cobalt check on a tinted halo to draw the eye. */
function MpcCellIcon({ cell }: { cell: Cell }) {
  if (cell.value === "yes") {
    return (
      <span
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#2563EB] shadow-[0_4px_14px_-4px_rgba(37,99,235,0.55)] ring-2 ring-white"
        aria-label="Yes"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-white"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 12l4.5 4.5L19 7"
            stroke="currentColor"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return <CellIcon cell={cell} />;
}

function ColumnHeader({
  column,
  highlighted,
}: {
  column: Column;
  highlighted: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center gap-2 px-2 pt-10 pb-4">
      {highlighted ? (
        <span
          className="absolute top-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-[#2563EB] text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] shadow-[0_6px_16px_-4px_rgba(37,99,235,0.55)] ring-2 ring-white whitespace-nowrap"
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor" aria-hidden>
            <path d="M12 2l2.39 6.96H22l-6.18 4.49 2.36 7.05L12 16.9l-6.18 3.6 2.36-7.05L2 8.96h7.61z" />
          </svg>
          Best for kids
        </span>
      ) : null}
      {column.logo ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={column.logo}
            alt={column.name}
            className="h-7 w-auto max-w-[140px] object-contain"
            onError={(e) => {
              // Fall back to text wordmark if the file fails to load
              const img = e.currentTarget;
              img.style.display = "none";
              const fb = img.nextElementSibling as HTMLElement | null;
              if (fb) fb.style.display = "inline-block";
            }}
          />
          <span
            className="font-bold text-base sm:text-lg"
            style={{ color: column.fallbackColor, display: "none" }}
          >
            {column.name}
          </span>
        </>
      ) : (
        <span
          className="font-extrabold text-base sm:text-lg tracking-tight"
          style={{ color: column.fallbackColor }}
        >
          {column.name}
        </span>
      )}
      {column.tagline ? (
        <span
          className={`text-[11px] text-center leading-tight ${
            highlighted ? "text-[#2563EB] font-semibold" : "text-gray-500"
          }`}
        >
          {column.tagline}
        </span>
      ) : null}
    </div>
  );
}

export function CompetitorComparison() {
  // Collect all unique footnotes referenced by cells, numbered in order.
  const footnotes: string[] = [];
  function footnoteFor(note: string | undefined): number | null {
    if (!note) return null;
    const existing = footnotes.indexOf(note);
    if (existing !== -1) return existing + 1;
    footnotes.push(note);
    return footnotes.length;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 mb-20">
      <div className="max-w-[1280px] mx-auto">
        <header className="text-center max-w-3xl mx-auto mb-10">
          <h2
            className="text-3xl sm:text-4xl lg:text-[46px] leading-tight"
            style={{
              fontFamily: '"Moderat-Black", var(--font-bricolage), sans-serif',
              fontWeight: 700,
              color: "rgb(30, 30, 30)",
            }}
          >
            How MyParentalControls compares
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700">
            Other apps watch the surface — texts, browser activity, screen time.
            We read inside the games where predators, bullies, and scammers
            actually target kids.
          </p>
        </header>

        {/* Scroll wrapper so the table can be wider than mobile viewports */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="min-w-[760px] sm:min-w-0">
            <div
              className="grid rounded-3xl overflow-hidden bg-white border border-gray-300 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(15,23,42,0.18)]"
              style={{
                gridTemplateColumns: `minmax(220px, 1.4fr) repeat(${COLUMNS.length}, minmax(110px, 1fr))`,
              }}
            >
              {/* Header row */}
              <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200" />
              {COLUMNS.map((c) => (
                <div
                  key={c.key}
                  className={`border-b ${
                    c.key === MPC_KEY
                      ? "bg-gradient-to-b from-[#DBEAFE] to-[#EFF6FF] border-[#2563EB]/20 border-x border-x-[#2563EB]/15"
                      : "bg-gradient-to-b from-gray-50 to-white border-gray-200"
                  }`}
                >
                  <ColumnHeader column={c} highlighted={c.key === MPC_KEY} />
                </div>
              ))}

              {/* Body — groups + rows */}
              {GROUPS.map((group, gi) => (
                <React.Fragment key={group.title}>
                  {/* Group title spans all columns */}
                  <div
                    className={`col-span-full px-5 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-gray-600 bg-gray-50/80 border-b border-gray-200 ${
                      gi > 0 ? "border-t" : ""
                    }`}
                    style={{
                      gridColumn: `1 / span ${COLUMNS.length + 1}`,
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className="block w-1 h-3.5 rounded-sm bg-gradient-to-b from-[#2563EB] to-[#1D4ED8]"
                      />
                      {group.title}
                    </span>
                  </div>

                  {group.rows.map((row, ri) => (
                    <React.Fragment key={row.feature}>
                      <div
                        className={`px-5 py-3.5 text-sm text-gray-800 ${
                          ri > 0 ? "border-t border-gray-200/70" : ""
                        }`}
                      >
                        <div className="font-semibold text-gray-900">
                          {row.feature}
                        </div>
                        {row.hint ? (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {row.hint}
                          </div>
                        ) : null}
                      </div>
                      {COLUMNS.map((c) => {
                        const cell = row.cells[c.key];
                        const note =
                          cell.value === "partial" || cell.value === "custom"
                            ? cell.note
                            : undefined;
                        const fn = footnoteFor(note);
                        const isMpc = c.key === MPC_KEY;
                        return (
                          <div
                            key={c.key}
                            className={`flex items-center justify-center px-3 py-3.5 ${
                              ri > 0
                                ? isMpc
                                  ? "border-t border-[#2563EB]/10"
                                  : "border-t border-gray-200/70"
                                : ""
                            } ${
                              isMpc
                                ? "bg-[#EFF6FF]/70 border-x border-x-[#2563EB]/15"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-1">
                              {isMpc ? <MpcCellIcon cell={cell} /> : <CellIcon cell={cell} />}
                              {fn ? (
                                <sup className="text-[10px] text-gray-500 font-semibold ml-0.5">
                                  {fn}
                                </sup>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Footnotes */}
        {footnotes.length > 0 ? (
          <ol className="mt-6 max-w-3xl mx-auto text-xs text-gray-500 space-y-1 list-decimal pl-5">
            {footnotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ol>
        ) : null}

        <p className="mt-6 text-center text-xs text-gray-400">
          Comparison sourced from each provider&rsquo;s published feature pages
          as of {COMPARISON_AS_OF}. Information current at time of publishing —
          competitors update features regularly.
        </p>

        {/* MPC-vs-them contrast cards — three punchy callouts that
            summarize the table for readers who don't want to read every
            row. Each pairs an MPC strength with a specific competitor's
            gap. */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {CONTRAST_CARDS.map((card) => (
            <article
              key={card.competitor}
              className="rounded-2xl ring-1 ring-black/10 bg-white overflow-hidden flex flex-col shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_32px_-20px_rgba(15,23,42,0.18)]"
            >
              {/* MPC side — top, highlighted cobalt */}
              <div className="px-5 py-5 bg-gradient-to-b from-[#DBEAFE] to-[#EFF6FF] border-b border-[#2563EB]/15">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="font-bold uppercase tracking-[0.14em]"
                    style={{ fontSize: "11px", color: "#2563EB" }}
                  >
                    MyParentalControls
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 12l4.5 4.5L19 7"
                      stroke="#2563EB"
                      strokeWidth={3.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                    {card.mpcLine}
                  </p>
                </div>
              </div>

              {/* Competitor side — bottom, muted */}
              <div className="px-5 py-5 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="font-bold uppercase tracking-[0.14em] text-gray-400"
                    style={{ fontSize: "11px" }}
                  >
                    {card.competitor}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="#9CA3AF"
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-sm sm:text-base text-gray-600 leading-snug">
                    {card.competitorLine}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
