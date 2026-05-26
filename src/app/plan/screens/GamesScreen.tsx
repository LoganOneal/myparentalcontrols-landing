"use client";

import { IOSStatusBar, IOSTabBar, IOSGroupedCard, IOSListCell, IOSBadge } from "./shared";

function EqBars() {
  return (
    <span className="inline-flex items-end gap-[2px] h-4" aria-hidden>
      {[0, 0.12, 0.25, 0.08].map((delay, i) => (
        <span
          key={i}
          className="mock-anim-eq-bar block w-[3px] rounded-full bg-[#34c759]"
          style={{ height: "12px", animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

function GameIcon({ emoji, bg }: { emoji: string; bg: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] text-[22px]" style={{ background: bg }}>
      {emoji}
    </span>
  );
}

export function GamesScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f2f2f7]">
      <IOSStatusBar />
      <div className="shrink-0 px-5 pb-3 pt-1">
        <h2 className="text-[34px] font-bold leading-[1.05] tracking-tight text-[#000]" style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}>
          Connected Games
        </h2>
        <p className="mt-1 text-[15px] text-[#8e8e93]">5 games &middot; all monitored</p>
      </div>

      <div className="flex-1 overflow-hidden px-4 space-y-4 pb-2">
        <IOSGroupedCard>
          <IOSListCell
            icon={<GameIcon emoji="🟥" bg="#ff453a15" />}
            title="Roblox"
            subtitle="47 chats today"
            trailing={<IOSBadge text="Active" color="#007aff" />}
            showChevron
          />
          <IOSListCell
            icon={<GameIcon emoji="⛏️" bg="#34c75915" />}
            title="Minecraft"
            subtitle="12 chats today"
            trailing={<IOSBadge text="Active" color="#007aff" />}
            showChevron
          />
          <IOSListCell
            icon={<GameIcon emoji="🎯" bg="#5856d615" />}
            title="Fortnite"
            subtitle="3 voice calls"
            trailing={
              <span className="flex items-center gap-1.5">
                <EqBars />
                <IOSBadge text="Live" color="#34c759" />
              </span>
            }
            showChevron
          />
          <IOSListCell
            icon={<GameIcon emoji="💬" bg="#5865f215" />}
            title="Discord"
            subtitle="8 channels watched"
            trailing={<IOSBadge text="1 Flag" color="#ff3b30" />}
            showChevron
            highlighted
          />
          <IOSListCell
            icon={<GameIcon emoji="⚔️" bg="#ff950015" />}
            title="League of Legends"
            subtitle="2 party chats"
            trailing={<IOSBadge text="Active" color="#007aff" />}
            showChevron
            border={false}
          />
        </IOSGroupedCard>

        {/* Summary strip */}
        <div className="rounded-[13px] bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#8e8e93]">Today&apos;s coverage</p>
              <p className="mt-1 text-[22px] font-bold text-[#000]">72 chats</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#8e8e93]">Voice calls</p>
              <p className="mt-1 text-[22px] font-bold text-[#000]">3 live</p>
            </div>
          </div>
        </div>
      </div>

      <IOSTabBar active="Games" />
    </div>
  );
}
