"use client";

import type { FunnelAnswers, FunnelStep } from "@/types/funnel";

function getLabelsForStep(step: FunnelStep, answers: FunnelAnswers): string[] {
  const selected = answers[step.id] ?? [];
  if (!step.options) return selected;
  return selected
    .map((id) => step.options!.find((o) => o.id === id)?.label ?? id)
    .filter(Boolean);
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
  const questionSteps = steps.filter(
    (s) =>
      s.type === "single-select" ||
      s.type === "multi-select" ||
      s.type === "age-select"
  );

  const riskLevel = getRiskLevel(answers);

  return (
    <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="mb-6">
        <h1 className="text-[26px] sm:text-[30px] leading-[1.2] tracking-tight text-gray-900 font-bold">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="rounded-xl border-2 p-4 mb-5" style={{ borderColor: "#e5e7eb" }}>
        <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Risk Assessment
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${riskLevel.percentage}%`,
                backgroundColor: riskLevel.color,
              }}
            />
          </div>
          <span
            className="text-[13px] font-bold w-16 text-right"
            style={{ color: riskLevel.color }}
          >
            {riskLevel.label} Risk
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-6 overflow-y-auto max-h-[260px]">
        {questionSteps.map((step) => {
          const labels = getLabelsForStep(step, answers);
          if (labels.length === 0) return null;
          return (
            <div key={step.id} className="rounded-xl bg-gray-50 px-4 py-3">
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                {step.title.replace("?", "").trim()}
              </div>
              <div className="text-[14px] text-gray-800 font-medium leading-snug">
                {labels.join(", ")}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={onGetStarted}
          disabled={submitting}
          className="w-full h-14 rounded-full text-[17px] font-bold text-white transition-all duration-200 disabled:opacity-40"
          style={{ backgroundColor: brandColor }}
        >
          {submitting ? "Setting up..." : "Join the Waitlist — It's Free"}
        </button>
        <p className="mt-3 text-center text-[12px] text-gray-400">
          You&apos;ll be first to know when Koda launches.
        </p>
      </div>
    </div>
  );
}

function getRiskLevel(answers: FunnelAnswers): {
  label: string;
  percentage: number;
  color: string;
} {
  let score = 0;

  const age = answers["child-age"]?.[0];
  if (age === "10-12" || age === "13-15") score += 3;
  else if (age === "7-9") score += 2;
  else if (age === "16-18") score += 1;

  const communication = answers["communication"] ?? [];
  if (communication.includes("voice-chat")) score += 3;
  if (communication.includes("direct-messages")) score += 2;
  if (communication.includes("group-chats")) score += 2;
  if (communication.includes("video-screen")) score += 1;

  const concerns = answers["concerns"] ?? [];
  if (concerns.includes("strangers")) score += 3;
  if (concerns.includes("sexual-messages")) score += 3;
  if (concerns.includes("hidden-conversations")) score += 2;
  score += Math.min(concerns.length, 3);

  const spaces = answers["online-spaces"] ?? [];
  const riskyPlatforms = [
    "discord",
    "roblox",
    "minecraft",
    "fortnite",
    "steam",
    "league-of-legends",
    "valorant",
    "counter-strike",
    "call-of-duty",
    "vrchat",
  ];
  score += spaces.filter((s) => riskyPlatforms.includes(s)).length * 2;

  if (score >= 12) return { label: "High", percentage: 85, color: "#dc2626" };
  if (score >= 6) return { label: "Moderate", percentage: 58, color: "#f59e0b" };
  return { label: "Low", percentage: 28, color: "#22c55e" };
}
