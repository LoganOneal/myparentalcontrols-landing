"use client";

import Image from "next/image";
import {
  BellRing,
  CircleQuestionMark,
  Gamepad2,
  Keyboard,
  Mail,
  Mic,
  MonitorPlay,
  ScanSearch,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FunnelAnswers, FunnelOption } from "@/types/funnel";

const GAME_STEP_ID = "online-spaces";
const COMMUNICATION_STEP_ID = "communication";
const GENERIC_GAME_IDS = [
  "roblox",
  "minecraft",
  "fortnite",
  "discord",
  "steam",
  "other-pc-games",
];

type CoverageDetail = {
  id: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

const COMMUNICATION_DETAILS: Record<string, CoverageDetail> = {
  "voice-chat": {
    id: "voice-chat",
    title: "Voice chat",
    body: "Voice conversations can be transcribed and checked for grooming, threats, bullying, and sexual content.",
    Icon: Mic,
  },
  "text-chat": {
    id: "text-chat",
    title: "Text chat",
    body: "In-game text is reviewed for unsafe messages, harassment, explicit language, and risky requests.",
    Icon: Keyboard,
  },
  "direct-messages": {
    id: "direct-messages",
    title: "Direct messages",
    body: "Private messages are monitored for strangers pushing conversations into unsafe territory.",
    Icon: Mail,
  },
  "group-chats": {
    id: "group-chats",
    title: "Group chats",
    body: "Group conversations are scanned so harmful behavior does not hide in busy chat threads.",
    Icon: Users,
  },
  "video-screen": {
    id: "video-screen",
    title: "Video and screen sharing",
    body: "Screen-sharing moments can be checked for unsafe content, pressure, or suspicious behavior.",
    Icon: Video,
  },
};

const ALL_COMMUNICATION_DETAILS = Object.values(COMMUNICATION_DETAILS);

function formatList(items: string[], fallback: string) {
  if (items.length === 0) return fallback;
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function getGameOption(id: string, options: FunnelOption[]) {
  const option = options.find((item) => item.id === id);
  if (!option) return null;
  if (id === "other-pc-games") {
    return { ...option, label: "All PC games" };
  }
  return option;
}

function getGameBadges({
  gameIds,
  gameOptions,
  isGeneric,
}: {
  gameIds: string[];
  gameOptions: FunnelOption[];
  isGeneric: boolean;
}) {
  const ids = isGeneric ? GENERIC_GAME_IDS : gameIds;
  return ids
    .map((id) => getGameOption(id, gameOptions))
    .filter((option): option is FunnelOption => Boolean(option));
}

function GameBadge({ option }: { option: FunnelOption }) {
  const FallbackIcon =
    option.fallbackIcon === "question" ? CircleQuestionMark : Gamepad2;

  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-blue-100 bg-white px-2.5 py-1.5 shadow-[0_8px_18px_-16px_rgba(37,99,235,0.75)]">
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50"
        style={{ backgroundColor: option.iconBackground ?? "#eff6ff" }}
      >
        {option.icon ? (
          <Image
            src={option.icon}
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
            className="max-h-5 w-auto max-w-5 object-contain"
          />
        ) : (
          <FallbackIcon className="h-3.5 w-3.5 text-[var(--koda-bear-blue)]" aria-hidden />
        )}
      </span>
      <span className="truncate text-[12px] font-bold text-gray-800">
        {option.label}
      </span>
    </span>
  );
}

function CoverageCard({
  detail,
  brandColor,
}: {
  detail: CoverageDetail;
  brandColor: string;
}) {
  const Icon = detail.Icon;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-3.5 py-3 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)]">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${brandColor}12`, color: brandColor }}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="text-[13px] font-extrabold leading-snug text-gray-900">
          {detail.title}
        </h3>
      </div>
      <p className="text-[12px] leading-relaxed text-gray-500">
        {detail.body}
      </p>
    </div>
  );
}

function CoverageGraphic({
  gameBadges,
  brandColor,
}: {
  gameBadges: FunnelOption[];
  brandColor: string;
}) {
  const visibleBadges = gameBadges.slice(0, 5);
  const hiddenCount = Math.max(gameBadges.length - visibleBadges.length, 0);

  return (
    <div className="rounded-[28px] border border-blue-100 bg-blue-50/70 px-4 py-4 shadow-[0_18px_46px_-34px_rgba(37,99,235,0.85)]">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {visibleBadges.map((option) => (
          <GameBadge key={option.id} option={option} />
        ))}
        {hiddenCount > 0 && (
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[12px] font-bold text-gray-700">
            +{hiddenCount} more
          </span>
        )}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--koda-bear-blue)] shadow-sm">
            <MonitorPlay className="h-6 w-6" aria-hidden />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-500">
            Play
          </span>
        </div>

        <div className="h-px w-5 bg-blue-200" aria-hidden />

        <div className="flex flex-col items-center gap-1.5 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_14px_30px_-16px_rgba(37,99,235,0.85)]"
            style={{ backgroundColor: brandColor }}
          >
            <ScanSearch className="h-6 w-6" aria-hidden />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-500">
            Detect
          </span>
        </div>

        <div className="h-px w-5 bg-blue-200" aria-hidden />

        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--koda-bear-blue)] shadow-sm">
            <BellRing className="h-6 w-6" aria-hidden />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-500">
            Alert
          </span>
        </div>
      </div>
    </div>
  );
}

export function StepCoverageExplainer({
  answers,
  gameOptions,
  brandColor,
  onNext,
}: {
  answers: FunnelAnswers;
  gameOptions: FunnelOption[];
  brandColor: string;
  onNext: () => void;
}) {
  const gameIds = answers[GAME_STEP_ID] ?? [];
  const communicationIds = answers[COMMUNICATION_STEP_ID] ?? [];
  const isGeneric =
    gameIds.includes("not-sure") ||
    communicationIds.includes("not-sure") ||
    gameIds.length === 0 ||
    communicationIds.length === 0;
  const includesAllPcGames = isGeneric || gameIds.includes("other-pc-games");
  const mostlyAlone = !isGeneric && communicationIds.includes("mostly-alone");
  const gameBadges = getGameBadges({ gameIds, gameOptions, isGeneric });
  const gameNames = gameBadges.map((option) => option.label);
  const selectedCommunicationDetails = isGeneric
    ? ALL_COMMUNICATION_DETAILS
    : communicationIds
        .filter((id) => id !== "mostly-alone")
        .map((id) => COMMUNICATION_DETAILS[id])
        .filter((detail): detail is CoverageDetail => Boolean(detail));
  const gameplayDetail: CoverageDetail = {
    id: "gameplay",
    title: mostlyAlone ? "Gameplay itself" : "Gameplay context",
    body: mostlyAlone
      ? "Even when your child mostly plays alone, Koda monitors gameplay itself so you can know if something unsafe is happening."
      : "Koda watches the gameplay context around your child's sessions, not just a disconnected chat log.",
    Icon: MonitorPlay,
  };
  const coverageDetails = [gameplayDetail, ...selectedCommunicationDetails];
  const communicationNames = mostlyAlone
    ? ["gameplay itself", ...selectedCommunicationDetails.map((detail) => detail.title.toLowerCase())]
    : selectedCommunicationDetails.map((detail) => detail.title.toLowerCase());
  const gameNamesForSentence = gameNames.map((name) =>
    name === "All PC games" ? "all PC games" : name
  );
  const onlyGameplay = mostlyAlone && selectedCommunicationDetails.length === 0;
  const subtitle = isGeneric
    ? "Even if you are not sure yet, Koda is built for PC gameplay, voice chat, text chat, direct messages, group chats, and screen sharing."
    : onlyGameplay
      ? `Based on your answers, Koda will monitor ${formatList(gameNamesForSentence, "their PC games")} and gameplay itself for dangerous moments.`
      : `Based on your answers, Koda will monitor ${formatList(gameNamesForSentence, "their PC games")}. It will also cover ${formatList(communicationNames, "their communication")} for dangerous moments.`;

  return (
    <div className="flex flex-1 flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-5 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[var(--koda-bear-blue)]">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          Personalized coverage
        </div>
        <h1 className="text-[25px] font-bold leading-[1.18] tracking-tight text-gray-900 sm:text-[29px]">
          {isGeneric
            ? "Koda covers gaming safety across PC games and chats."
            : onlyGameplay
              ? "Koda will monitor the games your child plays."
              : "Koda will monitor the games and communication you selected."}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
          {subtitle}
        </p>
      </div>

      <CoverageGraphic gameBadges={gameBadges} brandColor={brandColor} />

      {(includesAllPcGames || mostlyAlone) && (
        <div className="mt-4 rounded-2xl border border-blue-100 bg-white px-4 py-3 text-[13px] font-semibold leading-relaxed text-gray-700 shadow-[0_12px_30px_-26px_rgba(37,99,235,0.75)]">
          {includesAllPcGames && (
            <div className="flex items-start gap-2">
              <Gamepad2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--koda-bear-blue)]" aria-hidden />
              <span>Koda supports all PC games, including the ones that are not listed here.</span>
            </div>
          )}
          {mostlyAlone && (
            <div className={includesAllPcGames ? "mt-2 flex items-start gap-2" : "flex items-start gap-2"}>
              <MonitorPlay className="mt-0.5 h-4 w-4 shrink-0 text-[var(--koda-bear-blue)]" aria-hidden />
              <span>Because your child mostly plays alone, Koda focuses on gameplay itself, not just communication.</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {coverageDetails.map((detail) => (
          <CoverageCard
            key={detail.id}
            detail={detail}
            brandColor={brandColor}
          />
        ))}
      </div>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={onNext}
          className="h-14 w-full rounded-full text-[17px] font-bold text-white transition-all duration-200"
          style={{ backgroundColor: brandColor }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
