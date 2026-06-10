"use client";

import {
  BellRing,
  ChevronRight,
  Eye,
  Gamepad2,
  Heart,
  LockKeyhole,
  MessageCircle,
  MonitorPlay,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FunnelAnswers, FunnelStep } from "@/types/funnel";

const BRAND_BLUE = "#2563EB";
const WARM_ORANGE = "#F97316";

function getLabelsForStep(stepId: string, steps: FunnelStep[], answers: FunnelAnswers): string[] {
  const step = steps.find((item) => item.id === stepId);
  const selected = answers[stepId] ?? [];
  if (!step?.options) return selected;

  return selected
    .map((id) => step.options!.find((option) => option.id === id)?.label ?? id)
    .filter(Boolean);
}

function formatList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function communicationLabel(label: string): string {
  const labels: Record<string, string> = {
    "Voice chat": "voice chat",
    "Text chat": "text chat",
    "Direct messages": "direct messages",
    "Group chats": "group chats",
    "Video or screen sharing": "video and screen sharing",
  };

  return labels[label] ?? label.toLowerCase();
}

function getSelectedGameLabels(steps: FunnelStep[], answers: FunnelAnswers): string[] {
  const selected = answers["online-spaces"] ?? [];
  const specificSelections = selected.filter((id) => id !== "not-sure");
  if (specificSelections.length === 0) return [];

  const labels = getLabelsForStep("online-spaces", steps, answers)
    .filter((label) => label !== "I'm not sure")
    .map((label) => (label === "Other PC games" ? "all PC games" : label));

  return Array.from(new Set(labels));
}

function getSelectedCommunicationLabels(steps: FunnelStep[], answers: FunnelAnswers): string[] {
  const selected = answers.communication ?? [];
  const specificSelections = selected.filter(
    (id) => id !== "not-sure" && id !== "mostly-alone",
  );
  if (specificSelections.length === 0) return [];

  const labels = getLabelsForStep("communication", steps, answers)
    .filter((label) => label !== "I'm not sure" && label !== "They mostly play alone")
    .map(communicationLabel);

  return Array.from(new Set(labels));
}

function getBlindSpotLabel(communicationLabels: string[], mostlyAlone: boolean): string {
  if (mostlyAlone && communicationLabels.length === 0) return "Blind spots during solo play";
  if (communicationLabels.length === 0) return "Blind spots in gameplay";
  if (communicationLabels.includes("voice chat") && communicationLabels.length > 1) {
    return "Blind spots in chats and voice";
  }
  return `Blind spots in ${formatList(communicationLabels)}`;
}

type MonitorContext = {
  monitorSummary: string;
  monitorBody: string;
  blindSpotLabel: string;
  MonitorIcon: LucideIcon;
};

function getMonitorContext(steps: FunnelStep[], answers: FunnelAnswers): MonitorContext {
  const gameLabels = getSelectedGameLabels(steps, answers);
  const communicationLabels = getSelectedCommunicationLabels(steps, answers);
  const communication = answers.communication ?? [];
  const spaces = answers["online-spaces"] ?? [];
  const specificSpaces = spaces.filter((id) => id !== "not-sure");
  const specificCommunication = communication.filter(
    (id) => id !== "not-sure" && id !== "mostly-alone",
  );
  const mostlyAlone = communication.includes("mostly-alone");
  const notSure =
    specificSpaces.length === 0 &&
    specificCommunication.length === 0 &&
    !mostlyAlone;
  const selectedOtherPcGames = spaces.includes("other-pc-games");

  if (notSure) {
    return {
      monitorSummary: "PC gameplay, voice chat, text chat, direct messages, and group chats",
      monitorBody: "Because you are not sure where risk shows up yet, Koda covers the common PC gaming and communication surfaces parents worry about.",
      blindSpotLabel: "Blind spots across games and chats",
      MonitorIcon: Gamepad2,
    };
  }

  const monitorItems = [
    ...gameLabels,
    ...communicationLabels,
    ...(mostlyAlone ? ["gameplay context"] : []),
  ];

  const monitorSummary =
    monitorItems.length > 0
      ? formatList(monitorItems)
      : "PC gameplay and gaming communication";
  let monitorBody = "Based on your child's apps and activity.";

  if (mostlyAlone && communicationLabels.length === 0) {
    monitorBody =
      "Koda can monitor gameplay itself, not just chats, so you still get visibility when your child mostly plays solo.";
  } else if (selectedOtherPcGames) {
    monitorBody =
      "Koda supports any app or game on PC and Mac, plus the communication channels you selected.";
  } else if (mostlyAlone) {
    monitorBody =
      "Koda can watch the gameplay context around the communication channels you selected.";
  }

  return {
    monitorSummary,
    monitorBody,
    blindSpotLabel: getBlindSpotLabel(communicationLabels, mostlyAlone),
    MonitorIcon: mostlyAlone && communicationLabels.length === 0 ? MonitorPlay : Gamepad2,
  };
}

type AlertChip = {
  id: string;
  label: string;
  Icon: LucideIcon;
};

const ALERT_CHIPS: Record<string, AlertChip> = {
  strangers: { id: "strangers", label: "Predators", Icon: Users },
  "sexual-messages": { id: "sexual-messages", label: "Sexual content", Icon: ShieldAlert },
  bullying: { id: "bullying", label: "Bullying", Icon: MessageCircle },
  "harmful-language": { id: "harmful-language", label: "Threats", Icon: BellRing },
  "hidden-conversations": { id: "hidden-conversations", label: "Hidden chats", Icon: Eye },
  "screen-time": { id: "screen-time", label: "Risky sessions", Icon: MonitorPlay },
  visibility: { id: "visibility", label: "Risk signals", Icon: ShieldCheck },
  "not-sure": { id: "not-sure", label: "Risky behavior", Icon: ShieldAlert },
};

function getAlertChips(answers: FunnelAnswers): AlertChip[] {
  const selected = answers.concerns ?? [];
  const chips = selected
    .map((id) => ALERT_CHIPS[id])
    .filter((chip): chip is AlertChip => Boolean(chip));

  if (chips.length > 0) return chips.slice(0, 3);

  return [
    ALERT_CHIPS.strangers,
    ALERT_CHIPS.bullying,
    ALERT_CHIPS["sexual-messages"],
  ];
}

function PlanCurveGraphic({ context }: { context: MonitorContext }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_22px_54px_-42px_rgba(37,99,235,0.85)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="rounded-full bg-red-50 px-4 py-1.5 text-[12px] font-black text-red-600 ring-1 ring-red-100">
          Today
        </div>
        <div className="rounded-full bg-blue-50 px-4 py-1.5 text-[12px] font-black text-blue-700 ring-1 ring-blue-100">
          With Koda
        </div>
      </div>

      <div className="relative h-[260px]">
        <svg
          viewBox="0 0 430 260"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Koda increases parent visibility from blind spots today to earlier alerts with Koda."
        >
          <defs>
            <linearGradient id="kodaPlanLine" x1="44" y1="196" x2="382" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor={WARM_ORANGE} />
              <stop offset="0.48" stopColor="#A855F7" />
              <stop offset="1" stopColor={BRAND_BLUE} />
            </linearGradient>
            <filter id="kodaPlanGlow" x="-10%" y="-20%" width="120%" height="160%">
              <feDropShadow dx="0" dy="12" stdDeviation="11" floodColor="#2563EB" floodOpacity="0.18" />
            </filter>
          </defs>

          {[42, 82, 122, 162, 202].map((y) => (
            <line
              key={y}
              x1="16"
              x2="414"
              y1={y}
              y2={y}
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
          ))}
          <line x1="16" x2="414" y1="224" y2="224" stroke="#CBD5E1" strokeWidth="2" />

          <line
            x1="54"
            x2="54"
            y1="190"
            y2="224"
            stroke="#FB923C"
            strokeWidth="3"
            strokeDasharray="7 8"
            strokeLinecap="round"
          />
          <line
            x1="382"
            x2="382"
            y1="64"
            y2="224"
            stroke="#93C5FD"
            strokeWidth="3"
            strokeDasharray="7 8"
            strokeLinecap="round"
          />

          <path
            d="M54 190 C112 190 129 178 167 158 C207 137 210 132 248 128 C297 123 288 94 327 86 C356 80 366 82 382 52"
            fill="none"
            stroke="url(#kodaPlanLine)"
            strokeWidth="11"
            strokeLinecap="round"
            filter="url(#kodaPlanGlow)"
          />

          <circle cx="54" cy="190" r="13" fill="white" stroke={WARM_ORANGE} strokeWidth="7" />
          <circle cx="382" cy="52" r="14" fill="white" stroke={BRAND_BLUE} strokeWidth="7" />
        </svg>

        <div className="absolute left-1 top-[46%] max-w-[148px] rounded-xl border border-orange-200 bg-white px-3 py-2 text-center text-[13px] font-black leading-tight text-red-700 shadow-sm">
          {context.blindSpotLabel}
          <span className="absolute -bottom-2 left-4 h-4 w-4 rotate-45 border-b border-r border-orange-200 bg-white" />
        </div>

        <div className="absolute right-1 top-[12%] max-w-[174px] rounded-xl border border-blue-500 bg-white px-3 py-2 text-center text-[13px] font-black leading-tight text-blue-950 shadow-sm">
          Early warnings so you can step in sooner
          <span className="absolute right-[-9px] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-blue-500 bg-white" />
        </div>

        <div className="absolute bottom-0 left-1 max-w-[150px] text-[13px] font-black leading-tight text-red-600">
          What parents can&apos;t see today
        </div>
        <div className="absolute bottom-0 right-1 max-w-[170px] text-right text-[13px] font-black leading-tight text-blue-700">
          More visibility and peace of mind
        </div>
      </div>
    </div>
  );
}

function MonitorCard({ context }: { context: MonitorContext }) {
  return (
    <div className="rounded-[24px] border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4 shadow-[0_18px_42px_-36px_rgba(37,99,235,0.7)]">
      <div className="flex gap-3">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_12px_26px_-16px_rgba(37,99,235,0.9)]">
          <context.MonitorIcon className="h-7 w-7" aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="text-[15px] font-black leading-snug text-blue-950">
            Koda will monitor
          </div>
          <div className="mt-1 text-[18px] font-black leading-snug text-gray-950">
            {context.monitorSummary}
          </div>
          <div className="mt-3 text-[13px] font-semibold leading-snug text-slate-500">
            {context.monitorBody}
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertCard({ chips }: { chips: AlertChip[] }) {
  return (
    <div className="rounded-[24px] border border-red-200 bg-gradient-to-br from-red-50 to-white p-4 shadow-[0_18px_42px_-36px_rgba(239,68,68,0.7)]">
      <div className="flex gap-3">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-400 to-red-600 text-white shadow-[0_12px_26px_-16px_rgba(239,68,68,0.9)]">
          <BellRing className="h-7 w-7" aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="text-[15px] font-black leading-snug text-blue-950">
            Koda will alert you to
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-[12px] font-black text-red-700 ring-1 ring-red-100"
              >
                <chip.Icon className="h-3.5 w-3.5" aria-hidden />
                {chip.label}
              </span>
            ))}
          </div>
          <div className="mt-3 text-[13px] font-semibold leading-snug text-slate-500">
            Tailored to your family&apos;s risk profile
          </div>
        </div>
      </div>
    </div>
  );
}

export function StepSummary({
  title,
  subtitle,
  answers,
  steps,
  brandColor,
  onGetStarted,
  submitting,
}: {
  title: string;
  subtitle?: string;
  answers: FunnelAnswers;
  steps: FunnelStep[];
  brandColor: string;
  onGetStarted: () => void;
  submitting: boolean;
}) {
  const monitorContext = getMonitorContext(steps, answers);
  const alertChips = getAlertChips(answers);

  return (
    <div className="flex flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="mb-4 text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[13px] font-black text-blue-700 shadow-[0_12px_28px_-24px_rgba(37,99,235,0.9)]">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          Recommended for your family
        </div>
        <h1 className="mx-auto max-w-[430px] text-[30px] font-black leading-[1.08] tracking-tight text-gray-950 sm:text-[40px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-[420px] text-[15px] font-medium leading-snug text-slate-500 sm:text-[16px] sm:leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="sticky bottom-0 z-10 bg-[#FAFBFC] pt-2 pb-[calc(env(safe-area-inset-bottom)+0.25rem)]">
        <button
          type="button"
          onClick={onGetStarted}
          disabled={submitting}
          className="flex h-[58px] w-full items-center justify-center gap-3 rounded-2xl text-[17px] font-black text-white shadow-[0_18px_42px_-28px_rgba(37,99,235,0.95)] transition-all duration-200 disabled:opacity-40 sm:h-[60px]"
          style={{ backgroundColor: brandColor }}
        >
          <Heart className="h-6 w-6" aria-hidden />
          <span>{submitting ? "Setting up..." : "Continue to protect my child"}</span>
          {!submitting && <ChevronRight className="h-6 w-6" aria-hidden />}
        </button>
        <div className="mt-2 flex items-center justify-center gap-2 text-[12px] font-semibold text-slate-500 sm:mt-3">
          <LockKeyhole className="h-4 w-4" aria-hidden />
          <span>Secure checkout</span>
          <span aria-hidden>•</span>
          <span>Cancel anytime</span>
        </div>
      </div>

      <PlanCurveGraphic context={monitorContext} />

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <MonitorCard context={monitorContext} />
        <AlertCard chips={alertChips} />
      </div>

      <div className="mt-4 rounded-[24px] border border-blue-200 bg-blue-50 p-4 shadow-[0_18px_42px_-36px_rgba(37,99,235,0.65)]">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100 text-blue-700">
            <ShieldCheck className="h-9 w-9" aria-hidden />
          </div>
          <div className="text-[17px] leading-snug text-blue-950">
            <span className="font-medium">You can&apos;t watch every moment. </span>
            <span className="font-black">
              Koda helps you catch the ones that matter most before a bad situation gets worse.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
