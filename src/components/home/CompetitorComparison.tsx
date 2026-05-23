"use client";

import * as React from "react";
import {
  COLUMNS,
  GROUPS,
  COMPARISON_AS_OF,
  type Cell,
  type Column,
} from "@/data/competitors";

const KODA_KEY = "mpc";
type CompetitorKey = Exclude<Column["key"], typeof KODA_KEY>;

const COMPETITOR_KEYS = [
  "bark",
  "qustodio",
  "aura",
  "apple",
] as const satisfies readonly CompetitorKey[];

function getColumn(key: Column["key"]) {
  const column = COLUMNS.find((candidate) => candidate.key === key);
  if (!column) {
    throw new Error(`Missing competitor column: ${key}`);
  }
  return column;
}

function competitorShortName(column: Column) {
  if (column.key === "apple") return "Apple";
  return column.name;
}

function useFootnoteCollector() {
  const footnotes: string[] = [];

  function footnoteFor(note: string | undefined): number | null {
    if (!note) return null;
    const existing = footnotes.indexOf(note);
    if (existing !== -1) return existing + 1;
    footnotes.push(note);
    return footnotes.length;
  }

  return { footnotes, footnoteFor };
}

function CheckIcon({
  highlighted,
  compact,
}: {
  highlighted?: boolean;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${
        compact ? "h-6 w-6" : "h-7 w-7"
      } ${
        highlighted
          ? "bg-[var(--bark-blue)] text-white shadow-[0_6px_16px_-6px_rgba(25,66,216,0.65)]"
          : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/70"
      }`}
      aria-label="Yes"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
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

function NoIcon({ compact }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-200/80 ${
        compact ? "h-6 w-6" : "h-7 w-7"
      }`}
      aria-label="No"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M7 7l10 10M17 7L7 17"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
    </span>
  );
}

function LimitedIcon({ compact }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-200/90 ${
        compact ? "h-6 w-6" : "h-7 w-7"
      }`}
      aria-label="Limited"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M12 7v5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <circle cx="12" cy="16.5" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}

function CellStatus({
  cell,
  highlighted,
  compact,
}: {
  cell: Cell;
  highlighted?: boolean;
  compact?: boolean;
}) {
  if (cell.value === "yes") {
    return <CheckIcon compact={compact} highlighted={highlighted} />;
  }

  if (cell.value === "no") {
    return <NoIcon compact={compact} />;
  }

  if (cell.value === "partial" || cell.value === "custom") {
    return <LimitedIcon compact={compact} />;
  }

  return <LimitedIcon compact={compact} />;
}

function noteForCell(cell: Cell) {
  if (cell.value !== "partial" && cell.value !== "custom") return undefined;
  return cell.note;
}

function ColumnHeader({
  column,
  highlighted,
}: {
  column: Column;
  highlighted?: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center gap-2 px-2 pt-10 pb-4">
      {highlighted ? (
        <span className="absolute top-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-[var(--bark-blue)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_6px_16px_-4px_rgba(25,66,216,0.55)] ring-2 ring-white">
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3"
            fill="currentColor"
            aria-hidden
          >
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
            onError={(event) => {
              const image = event.currentTarget;
              image.style.display = "none";
              const fallback = image.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "inline-block";
            }}
          />
          <span
            className="hidden text-base font-bold sm:text-lg"
            style={{ color: column.fallbackColor }}
          >
            {column.name}
          </span>
        </>
      ) : (
        <span
          className="text-center text-base font-extrabold tracking-tight sm:text-lg"
          style={{ color: column.fallbackColor }}
        >
          {column.name}
        </span>
      )}
      {column.tagline ? (
        <span
          className={`text-center text-[11px] leading-tight ${
            highlighted ? "font-semibold text-[var(--bark-blue)]" : "text-gray-500"
          }`}
        >
          {column.tagline}
        </span>
      ) : null}
    </div>
  );
}

function DesktopComparison() {
  const { footnotes, footnoteFor } = useFootnoteCollector();

  return (
    <div className="mt-10 hidden lg:block">
      <div className="overflow-x-auto">
        <div
          className="grid overflow-hidden rounded-[28px] border border-gray-300 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(15,23,42,0.18)]"
          style={{
            gridTemplateColumns: `minmax(220px, 1.35fr) repeat(${COLUMNS.length}, minmax(112px, 1fr))`,
          }}
        >
          <div className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white" />
          {COLUMNS.map((column) => {
            const highlighted = column.key === KODA_KEY;
            return (
              <div
                key={column.key}
                className={`border-b ${
                  highlighted
                    ? "border-x border-x-[var(--bark-blue)]/15 border-[var(--bark-blue)]/20 bg-gradient-to-b from-[#DBEAFE] to-[#EFF6FF]"
                    : "border-gray-200 bg-gradient-to-b from-gray-50 to-white"
                }`}
              >
                <ColumnHeader column={column} highlighted={highlighted} />
              </div>
            );
          })}

          {GROUPS.map((group, groupIndex) => (
            <React.Fragment key={group.title}>
              <div
                className={`col-span-full border-b border-gray-200 bg-gray-50/80 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-600 ${
                  groupIndex > 0 ? "border-t" : ""
                }`}
                style={{
                  gridColumn: `1 / span ${COLUMNS.length + 1}`,
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="block h-3.5 w-1 rounded-sm bg-[var(--bark-blue)]"
                  />
                  {group.title}
                </span>
              </div>

              {group.rows.map((row, rowIndex) => (
                <React.Fragment key={row.feature}>
                  <div
                    className={`px-5 py-3.5 text-sm text-gray-800 ${
                      rowIndex > 0 ? "border-t border-gray-200/70" : ""
                    }`}
                  >
                    <div className="font-semibold text-gray-900">
                      {row.feature}
                    </div>
                    {row.hint ? (
                      <div className="mt-0.5 text-xs text-gray-500">
                        {row.hint}
                      </div>
                    ) : null}
                  </div>

                  {COLUMNS.map((column) => {
                    const cell = row.cells[column.key];
                    const highlighted = column.key === KODA_KEY;
                    const footnote = footnoteFor(noteForCell(cell));

                    return (
                      <div
                        key={column.key}
                        className={`flex items-center justify-center px-3 py-3.5 ${
                          rowIndex > 0
                            ? highlighted
                              ? "border-t border-[var(--bark-blue)]/10"
                              : "border-t border-gray-200/70"
                            : ""
                        } ${
                          highlighted
                            ? "border-x border-x-[var(--bark-blue)]/15 bg-[#EFF6FF]/70"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <CellStatus cell={cell} highlighted={highlighted} />
                          {footnote ? (
                            <sup className="ml-0.5 text-[10px] font-semibold text-gray-500">
                              {footnote}
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

      <Footnotes notes={footnotes} />
      <SourceNote />
    </div>
  );
}

function MobileComparison({
  selectedKey,
  onSelectedKeyChange,
}: {
  selectedKey: CompetitorKey;
  onSelectedKeyChange: (key: CompetitorKey) => void;
}) {
  const { footnotes, footnoteFor } = useFootnoteCollector();
  const kodaColumn = getColumn(KODA_KEY);
  const selectedColumn = getColumn(selectedKey);
  const competitorColumns = COMPETITOR_KEYS.map(getColumn);

  return (
    <div className="mt-8 lg:hidden">
      <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-24px_rgba(15,23,42,0.2)]">
        <div className="px-4 pt-5 pb-4">
          <label
            htmlFor="mobile-competitor"
            className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--bark-blue)]"
          >
            Compare Koda with
          </label>
          <div className="relative mt-1 border-b border-gray-200">
            <select
              id="mobile-competitor"
              value={selectedKey}
              onChange={(event) =>
                onSelectedKeyChange(event.target.value as CompetitorKey)
              }
              className="w-full appearance-none bg-transparent py-2 pr-9 text-[28px] font-extrabold leading-tight tracking-tight text-[rgb(30,30,30)] outline-none"
            >
              {competitorColumns.map((column) => (
                <option key={column.key} value={column.key}>
                  {column.name}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>

        <div className="px-4 pb-5">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="grid grid-cols-[minmax(0,1fr)_64px_92px] border-b border-gray-200 bg-gray-50">
              <div className="px-3 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-gray-400">
                Feature
              </div>
              <div className="flex items-center justify-center bg-[#EFF6FF] px-2 py-3 text-xs font-extrabold text-[var(--bark-blue)]">
                {kodaColumn.name}
              </div>
              <div className="flex items-center justify-center px-2 py-3 text-center text-xs font-extrabold leading-tight text-gray-700">
                {competitorShortName(selectedColumn)}
              </div>
            </div>

            {GROUPS.map((group) => (
              <div key={group.title}>
                <div className="border-b border-gray-200 bg-white px-3 py-3">
                  <p className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-gray-500">
                    <span
                      aria-hidden
                      className="block h-3 w-1 rounded-sm bg-[var(--bark-blue)]"
                    />
                    {group.title}
                  </p>
                </div>

                {group.rows.map((row) => {
                  const kodaCell = row.cells[KODA_KEY];
                  const competitorCell = row.cells[selectedKey];
                  const kodaFootnote = footnoteFor(noteForCell(kodaCell));
                  const competitorFootnote = footnoteFor(
                    noteForCell(competitorCell),
                  );

                  return (
                    <div
                      key={row.feature}
                      className="grid min-h-[76px] grid-cols-[minmax(0,1fr)_64px_92px] border-b border-gray-200/80 last:border-b-0"
                    >
                      <div className="px-3 py-4">
                        <p className="text-sm font-bold leading-snug text-gray-950">
                          {row.feature}
                        </p>
                        {row.hint ? (
                          <p className="mt-1 text-xs leading-snug text-gray-500">
                            {row.hint}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex items-center justify-center border-l border-[var(--bark-blue)]/10 bg-[#EFF6FF]/80 px-1">
                        <div className="flex items-center gap-1">
                          <CellStatus compact cell={kodaCell} highlighted />
                          {kodaFootnote ? (
                            <sup className="text-[9px] font-semibold text-gray-500">
                              {kodaFootnote}
                            </sup>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex items-center justify-center border-l border-gray-200 px-1.5">
                        <div className="flex items-center gap-1">
                          <CellStatus compact cell={competitorCell} />
                          {competitorFootnote ? (
                            <sup className="text-[9px] font-semibold text-gray-500">
                              {competitorFootnote}
                            </sup>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footnotes notes={footnotes} />
      <SourceNote />
    </div>
  );
}

function Footnotes({ notes }: { notes: string[] }) {
  if (notes.length === 0) return null;

  return (
    <ol className="mx-auto mt-6 max-w-3xl list-decimal space-y-1 pl-5 text-xs text-gray-500">
      {notes.map((note) => (
        <li key={note}>{note}</li>
      ))}
    </ol>
  );
}

function SourceNote() {
  return (
    <p className="mt-6 text-center text-xs text-gray-400">
      Comparison sourced from each provider&rsquo;s published feature pages as
      of {COMPARISON_AS_OF}. Information current at time of publishing;
      competitors update features regularly.
    </p>
  );
}

export function CompetitorComparison() {
  const [selectedKey, setSelectedKey] =
    React.useState<CompetitorKey>("bark");

  return (
    <section className="px-[15px] pt-[15px] pb-20">
      <div className="rounded-lg bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-16 lg:px-[60px] lg:py-20">
          <header className="mx-auto max-w-3xl text-center">
            <h2
              className="text-[30px] leading-tight sm:text-4xl lg:text-[46px]"
              style={{
                fontFamily: "var(--bark-heading)",
                fontWeight: 700,
                color: "rgb(30, 30, 30)",
              }}
            >
              How <span className="text-[var(--bark-blue)]">Koda</span>{" "}
              compares
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              Other tools are built to manage screen time or restrict apps.
              Koda monitors the live chats, game DMs, and voice calls where
              abuse actually starts.
            </p>
          </header>

          <MobileComparison
            selectedKey={selectedKey}
            onSelectedKeyChange={setSelectedKey}
          />
          <DesktopComparison />
        </div>
      </div>
    </section>
  );
}
