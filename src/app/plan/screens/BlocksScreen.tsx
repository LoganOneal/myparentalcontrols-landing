"use client";

import { IOSStatusBar, IOSTabBar, IOSGroupedCard, IOSListCell, IOSToggle } from "./shared";

function BlockIcon({ emoji, bg }: { emoji: string; bg: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] text-[22px]" style={{ background: bg }}>
      {emoji}
    </span>
  );
}

export function BlocksScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f2f2f7]">
      <IOSStatusBar />
      <div className="shrink-0 px-5 pb-3 pt-1">
        <h2 className="text-[34px] font-bold leading-[1.05] tracking-tight text-[#000]" style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}>
          Quick Blocks
        </h2>
        <p className="mt-1 text-[15px] text-[#8e8e93]">Tap to toggle &middot; applies to all devices</p>
      </div>

      <div className="flex-1 overflow-hidden px-4 space-y-4 pb-2">
        <IOSGroupedCard>
          <IOSListCell
            icon={<BlockIcon emoji="🎮" bg="#34c75915" />}
            title="All games"
            subtitle="Roblox · Minecraft · Fortnite"
            trailing={<IOSToggle on={true} />}
          />
          <IOSListCell
            icon={<BlockIcon emoji="💬" bg="#5865f215" />}
            title="Discord"
            subtitle="DMs · servers · voice"
            trailing={<IOSToggle on={false} />}
          />
          <IOSListCell
            icon={<BlockIcon emoji="🎵" bg="#00000015" />}
            title="TikTok"
            subtitle="Feed and DMs"
            trailing={<IOSToggle on={true} />}
          />
          <IOSListCell
            icon={<BlockIcon emoji="🛡️" bg="#1f293715" />}
            title="Adult sites"
            subtitle="Network-level filter"
            trailing={<IOSToggle on={true} />}
          />
          <IOSListCell
            icon={<BlockIcon emoji="🎬" bg="#e5091415" />}
            title="Netflix"
            subtitle="Streaming after bedtime"
            trailing={<IOSToggle on={false} />}
            border={false}
          />
        </IOSGroupedCard>

        {/* Schedule card */}
        <div className="rounded-[13px] bg-white p-4">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-[#8e8e93] mb-3">Schedules Active</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] font-medium text-[#000]">School Hours</p>
                <p className="text-[13px] text-[#8e8e93]">Mon–Fri, 8 AM – 3 PM</p>
              </div>
              <span className="rounded-full bg-[#34c759]/10 px-2.5 py-1 text-[12px] font-semibold text-[#34c759]">On</span>
            </div>
            <div className="h-px bg-[#f2f2f7]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] font-medium text-[#000]">Bedtime</p>
                <p className="text-[13px] text-[#8e8e93]">Every day, 9 PM – 7 AM</p>
              </div>
              <span className="rounded-full bg-[#34c759]/10 px-2.5 py-1 text-[12px] font-semibold text-[#34c759]">On</span>
            </div>
          </div>
        </div>
      </div>

      <IOSTabBar active="Block" />
    </div>
  );
}
