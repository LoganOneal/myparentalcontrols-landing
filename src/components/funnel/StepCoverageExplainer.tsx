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
const ALL_PC_GAMES_ID = "other-pc-games";
const NOT_SURE_ID = "not-sure";
const MOSTLY_ALONE_ID = "mostly-alone";

type CoverageDetail = {
  id: string;
  title: string;
  phrase: string;
  body: string;
  Icon: LucideIcon;
};

type SourceNode = {
  id: string;
  label: string;
  Icon?: LucideIcon;
};

const COMMUNICATION_DETAILS: Record<string, CoverageDetail> = {
  "voice-chat": {
    id: "voice-chat",
    title: "Voice chat",
    phrase: "voice chat",
    body: "Koda can review voice chat for risky language, grooming patterns, threats, or pressure.",
    Icon: Mic,
  },
  "text-chat": {
    id: "text-chat",
    title: "Text chat",
    phrase: "text chat",
    body: "Koda can review chat messages for unsafe requests, harassment, or explicit content.",
    Icon: Keyboard,
  },
  "direct-messages": {
    id: "direct-messages",
    title: "Direct messages",
    phrase: "direct messages",
    body: "Koda can check direct messages for stranger contact, pressure, or attempts to move conversations elsewhere.",
    Icon: Mail,
  },
  "group-chats": {
    id: "group-chats",
    title: "Group chats",
    phrase: "group chats",
    body: "Koda can review group conversations so harmful behavior is less likely to get missed.",
    Icon: Users,
  },
  "video-screen": {
    id: "video-screen",
    title: "Video and screen sharing",
    phrase: "video and screen sharing",
    body: "Koda can check shared screens and video moments for unsafe content, pressure, or suspicious behavior.",
    Icon: Video,
  },
};

const ALL_COMMUNICATION_DETAILS = Object.values(COMMUNICATION_DETAILS);

const GAMEPLAY_CONTEXT_DETAIL: CoverageDetail = {
  id: "gameplay-context",
  title: "Gameplay context",
  phrase: "gameplay context",
  body: "Koda reviews what was happening around the session, so alerts are based on context, not just isolated words.",
  Icon: MonitorPlay,
};

function formatList(items: string[], fallback: string) {
  const cleanItems = items.filter(Boolean);
  if (cleanItems.length === 0) return fallback;
  if (cleanItems.length === 1) return cleanItems[0];
  if (cleanItems.length === 2) return `${cleanItems[0]} and ${cleanItems[1]}`;
  return `${cleanItems.slice(0, -1).join(", ")}, and ${cleanItems[cleanItems.length - 1]}`;
}

function formatCommunicationList(items: string[], fallback: string) {
  const expandedItems = items.flatMap((item) =>
    item === "video and screen sharing" ? ["video", "screen sharing"] : [item]
  );
  return formatList(expandedItems, fallback);
}

function getAllPcGamesOption(options: FunnelOption[]): FunnelOption {
  return (
    options.find((option) => option.id === ALL_PC_GAMES_ID) ?? {
      id: ALL_PC_GAMES_ID,
      label: "Other PC games",
      fallbackIcon: "gamepad",
    }
  );
}

function normalizeGameOption(option: FunnelOption): FunnelOption {
  if (option.id === ALL_PC_GAMES_ID) {
    return { ...option, label: "All PC games" };
  }
  return option;
}

function getSelectedGameOptions({
  gameIds,
  gameOptions,
  isGeneric,
}: {
  gameIds: string[];
  gameOptions: FunnelOption[];
  isGeneric: boolean;
}) {
  if (isGeneric) {
    return [normalizeGameOption(getAllPcGamesOption(gameOptions))];
  }

  const selectedOptions = gameIds
    .filter((id) => id !== NOT_SURE_ID)
    .map((id) => gameOptions.find((option) => option.id === id))
    .filter((option): option is FunnelOption => Boolean(option))
    .map(normalizeGameOption);

  return selectedOptions.length > 0
    ? selectedOptions
    : [normalizeGameOption(getAllPcGamesOption(gameOptions))];
}

function getCommunicationDetails({
  communicationIds,
  isGeneric,
}: {
  communicationIds: string[];
  isGeneric: boolean;
}) {
  if (isGeneric) return ALL_COMMUNICATION_DETAILS;

  return communicationIds
    .filter((id) => id !== MOSTLY_ALONE_ID && id !== NOT_SURE_ID)
    .map((id) => COMMUNICATION_DETAILS[id])
    .filter((detail): detail is CoverageDetail => Boolean(detail));
}

function getHeadline({
  isGeneric,
  supportsAllPcGames,
  gameLabels,
}: {
  isGeneric: boolean;
  supportsAllPcGames: boolean;
  gameLabels: string[];
}) {
  if (isGeneric) {
    return "Koda works with PC games and communication channels.";
  }

  if (supportsAllPcGames) {
    return "Koda supports your child's PC gaming setup.";
  }

  if (gameLabels.length === 1) {
    return `Koda supports your child's ${gameLabels[0]} setup.`;
  }

  return "Koda supports the games your child selected.";
}

function getSubheadline({
  isGeneric,
  supportsAllPcGames,
  gameLabels,
  communicationDetails,
  mostlyAlone,
}: {
  isGeneric: boolean;
  supportsAllPcGames: boolean;
  gameLabels: string[];
  communicationDetails: CoverageDetail[];
  mostlyAlone: boolean;
}) {
  if (isGeneric) {
    return "Koda can help watch for risky moments across PC gameplay, voice chat, text chat, direct messages, group chats, and screen sharing, then alert you when something needs your attention.";
  }

  const sentenceGameLabels = gameLabels.map((label) =>
    label === "All PC games" ? "all PC games" : label
  );
  const gameActivity = supportsAllPcGames
    ? "PC game activity"
    : `${formatList(sentenceGameLabels, "game activity")} activity`;
  const coveredModes = [
    ...(mostlyAlone ? [GAMEPLAY_CONTEXT_DETAIL.phrase] : []),
    ...communicationDetails.map((detail) => detail.phrase),
  ];
  const onlyGameplayContext =
    coveredModes.length === 1 &&
    coveredModes[0] === GAMEPLAY_CONTEXT_DETAIL.phrase;

  if (coveredModes.length === 0 || onlyGameplayContext) {
    return `Based on your answers, Koda can help monitor ${gameActivity} and alert you when something may need your attention.`;
  }

  return `Based on your answers, Koda can help monitor ${gameActivity}, including ${formatCommunicationList(coveredModes, "the channels your child uses")}, and alert you when something may need your attention.`;
}

function GameSourceNode({ option }: { option: FunnelOption }) {
  const iconMap: Record<string, LucideIcon> = {
    question: CircleQuestionMark,
    gamepad: Gamepad2,
    mic: Mic,
    "message-square": Keyboard,
    mail: Mail,
    users: Users,
    video: Video,
    "help-circle": CircleQuestionMark,
  };
  const FallbackIcon = iconMap[option.fallbackIcon ?? ""] ?? Gamepad2;

  return (
    <SourceNodeFrame label={option.label}>
      {option.icon ? (
        <Image
          src={option.icon}
          alt=""
          aria-hidden="true"
          width={30}
          height={30}
          className="max-h-8 w-auto max-w-8 object-contain"
        />
      ) : (
        <FallbackIcon className="h-6 w-6" aria-hidden />
      )}
    </SourceNodeFrame>
  );
}

function IconSourceNode({
  node,
}: {
  node: SourceNode;
}) {
  const Icon = node.Icon ?? Gamepad2;

  return (
    <SourceNodeFrame label={node.label}>
      <Icon className="h-6 w-6" aria-hidden />
    </SourceNodeFrame>
  );
}

function SourceNodeFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-[76px] flex-col items-center gap-1.5 text-center">
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[var(--koda-bear-blue)] shadow-[0_12px_28px_-22px_rgba(37,99,235,0.9)] ring-1 ring-blue-100/80">
        {children}
      </div>
      <div className="text-[11px] font-bold leading-tight text-gray-700">
        {label}
      </div>
    </div>
  );
}

function FlowArrow({ brandColor }: { brandColor: string }) {
  return (
    <svg
      width="38"
      height="30"
      viewBox="0 0 38 30"
      fill="none"
      aria-hidden
      className="mx-auto"
    >
      <path
        d="M19 3V24"
        stroke={brandColor}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.22"
      />
      <path
        d="M13 18L19 24L25 18"
        stroke={brandColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
    </svg>
  );
}

function FlowStep({
  label,
  body,
  Icon,
  brandColor,
  isPrimary = false,
}: {
  label: string;
  body?: string;
  Icon: LucideIcon;
  brandColor: string;
  isPrimary?: boolean;
}) {
  return (
    <div className="mx-auto flex max-w-[250px] flex-col items-center text-center">
      <div
        className={`flex items-center justify-center rounded-full shadow-[0_16px_32px_-22px_rgba(37,99,235,0.95)] ${
          isPrimary ? "h-16 w-16 text-white" : "h-14 w-14 bg-white"
        }`}
        style={{
          backgroundColor: isPrimary ? brandColor : "white",
          color: isPrimary ? "white" : brandColor,
        }}
      >
        <Icon className={isPrimary ? "h-7 w-7" : "h-6 w-6"} aria-hidden />
      </div>
      <div className="mt-2 text-[14px] font-extrabold leading-tight text-gray-900">
        {label}
      </div>
      {body && (
        <div className="mt-1 text-[12px] font-medium leading-snug text-gray-500">
          {body}
        </div>
      )}
    </div>
  );
}

function CoverageInfographic({
  gameOptions,
  communicationDetails,
  mostlyAlone,
  brandColor,
}: {
  gameOptions: FunnelOption[];
  communicationDetails: CoverageDetail[];
  mostlyAlone: boolean;
  brandColor: string;
}) {
  const communicationNodes: SourceNode[] = [
    ...(mostlyAlone
      ? [
          {
            id: "gameplay-context",
            label: "Gameplay context",
            Icon: MonitorPlay,
          },
        ]
      : []),
    ...communicationDetails.map((detail) => ({
      id: detail.id,
      label: detail.title,
      Icon: detail.Icon,
    })),
  ];
  const contextBody = communicationDetails.length > 0
    ? "Game activity and selected channels are reviewed together."
    : "Gameplay context is reviewed before a parent alert.";

  return (
    <div className="my-5 rounded-[32px] bg-[linear-gradient(145deg,#eff6ff_0%,#ffffff_52%,#edf5ff_100%)] px-4 py-5 shadow-[0_20px_48px_-36px_rgba(37,99,235,0.75)]">
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-4">
        {gameOptions.map((option) => (
          <GameSourceNode key={option.id} option={option} />
        ))}
        {communicationNodes.map((node) => (
          <IconSourceNode key={node.id} node={node} />
        ))}
      </div>

      <FlowArrow brandColor={brandColor} />

      <FlowStep
        label="Koda checks context"
        body={contextBody}
        Icon={ScanSearch}
        brandColor={brandColor}
        isPrimary
      />

      <FlowArrow brandColor={brandColor} />

      <FlowStep
        label="Parent alert"
        body="You get a clear alert when something may need attention."
        Icon={BellRing}
        brandColor={brandColor}
      />
    </div>
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
    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3.5 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)]">
      <div className="mb-2 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${brandColor}12`, color: brandColor }}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="text-[14px] font-extrabold leading-snug text-gray-900">
          {detail.title}
        </h3>
      </div>
      <p className="text-[13px] leading-relaxed text-gray-500">
        {detail.body}
      </p>
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
    gameIds.includes(NOT_SURE_ID) ||
    communicationIds.includes(NOT_SURE_ID) ||
    gameIds.length === 0 ||
    communicationIds.length === 0;
  const supportsAllPcGames =
    isGeneric || gameIds.includes(ALL_PC_GAMES_ID);
  const mostlyAlone =
    !isGeneric && communicationIds.includes(MOSTLY_ALONE_ID);
  const selectedGameOptions = getSelectedGameOptions({
    gameIds,
    gameOptions,
    isGeneric,
  });
  const selectedCommunicationDetails = getCommunicationDetails({
    communicationIds,
    isGeneric,
  });
  const gameLabels = selectedGameOptions.map((option) => option.label);
  const headline = getHeadline({
    isGeneric,
    supportsAllPcGames,
    gameLabels,
  });
  const subheadline = getSubheadline({
    isGeneric,
    supportsAllPcGames,
    gameLabels,
    communicationDetails: selectedCommunicationDetails,
    mostlyAlone,
  });
  const coverageCards = [
    GAMEPLAY_CONTEXT_DETAIL,
    ...selectedCommunicationDetails,
  ];

  return (
    <div className="flex flex-1 flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-4 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[12px] font-extrabold text-[var(--koda-bear-blue)] ring-1 ring-blue-100">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          Personalized coverage
        </div>
        <h1 className="text-[25px] font-bold leading-[1.18] tracking-tight text-gray-900 sm:text-[29px]">
          {headline}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
          {subheadline}
        </p>
      </div>

      <CoverageInfographic
        gameOptions={selectedGameOptions}
        communicationDetails={selectedCommunicationDetails}
        mostlyAlone={mostlyAlone}
        brandColor={brandColor}
      />

      {(supportsAllPcGames || mostlyAlone) && (
        <div className="mb-4 rounded-2xl bg-blue-50/80 px-4 py-3 text-[13px] font-semibold leading-relaxed text-gray-700 ring-1 ring-blue-100">
          {supportsAllPcGames && (
            <div className="flex items-start gap-2">
              <Gamepad2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--koda-bear-blue)]" aria-hidden />
              <span>Koda supports any app or game on PC and Mac.</span>
            </div>
          )}
          {mostlyAlone && (
            <div className={supportsAllPcGames ? "mt-2 flex items-start gap-2" : "flex items-start gap-2"}>
              <MonitorPlay className="mt-0.5 h-4 w-4 shrink-0 text-[var(--koda-bear-blue)]" aria-hidden />
              <span>Because your child mostly plays alone, Koda also focuses on gameplay context.</span>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {coverageCards.map((detail) => (
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
