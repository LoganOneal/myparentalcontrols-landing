"use client";

import { IOSStatusBar, IOSTabBar, IOSGroupedCard, IOSListCell } from "./shared";

function PlatformIcon({ emoji, bg }: { emoji: string; bg: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] text-[22px]" style={{ background: bg }}>
      {emoji}
    </span>
  );
}

export function AIScannerScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f2f2f7]">
      <IOSStatusBar />
      <div className="shrink-0 px-5 pb-3 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="text-[34px] font-bold leading-[1.05] tracking-tight text-[#000]" style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}>
            AI Scanner
          </h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#007aff] px-3 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-white mock-anim-breathe" />
            <span className="text-[13px] font-bold text-white">Live</span>
          </span>
        </div>
        <p className="mt-1 text-[15px] text-[#8e8e93]">Scanning last 60 seconds</p>
      </div>

      <div className="flex-1 overflow-hidden px-4 space-y-4 pb-2">
        <IOSGroupedCard>
          <IOSListCell
            icon={<PlatformIcon emoji="🟥" bg="#ff453a15" />}
            title="Roblox"
            subtitle="4,200 messages scanned"
            trailing={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#34c759"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
            }
          />
          <IOSListCell
            icon={<PlatformIcon emoji="💬" bg="#5865f215" />}
            title="Discord"
            subtitle="1,800 messages scanned"
            trailing={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#34c759"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
            }
          />
          <IOSListCell
            icon={<PlatformIcon emoji="👻" bg="#fffc0030" />}
            title="Snapchat"
            subtitle={`"send me one" · escalated`}
            trailing={
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff3b30] px-2.5 py-1 shadow-[0_2px_6px_rgba(255,59,48,0.3)] mock-anim-slide-in">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>
                <span className="text-[12px] font-bold text-white">Threat</span>
              </span>
            }
            highlighted
          />
          <IOSListCell
            icon={<PlatformIcon emoji="⛏️" bg="#34c75915" />}
            title="Minecraft"
            subtitle="600 messages scanned"
            trailing={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#34c759"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
            }
          />
          <IOSListCell
            icon={<PlatformIcon emoji="💚" bg="#34c75915" />}
            title="iMessage"
            subtitle="312 messages scanned"
            trailing={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#34c759"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
            }
            border={false}
          />
        </IOSGroupedCard>

        {/* AI insight card */}
        <div className="rounded-[13px] bg-white p-4">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-[#8e8e93] mb-2">AI Insight</p>
          <p className="text-[15px] leading-relaxed text-[#000]">
            <span className="font-semibold">6,912 messages</span> processed this week.
            Only <span className="font-semibold text-[#ff3b30]">1 alert</span> sent to you.
          </p>
          <p className="mt-1.5 text-[13px] text-[#8e8e93]">Signal-to-noise ratio: 99.98%</p>
        </div>
      </div>

      <IOSTabBar active="Alerts" />
    </div>
  );
}
