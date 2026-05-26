"use client";

import { IOSStatusBar, IOSTabBar, IOSGroupedCard, IOSListCell } from "./shared";

function DeviceIcon({ type, bg }: { type: "laptop" | "phone" | "tablet"; bg: string }) {
  const paths = {
    laptop: "M4 5a1 1 0 011-1h14a1 1 0 011 1v10H4V5zm-2 11h20v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1z",
    phone: "M7 2a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H7zm5 18a1 1 0 100-2 1 1 0 000 2z",
    tablet: "M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H6zm6 18a1 1 0 100-2 1 1 0 000 2z",
  };
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]" style={{ background: bg }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d={paths[type]} /></svg>
    </span>
  );
}

function SyncBadge({ syncing, time }: { syncing?: boolean; time: string }) {
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#34c759]/10 px-2.5 py-1">
        <span className="h-[6px] w-[6px] rounded-full bg-[#34c759]" />
        <span className="text-[12px] font-semibold text-[#34c759]">Synced</span>
      </span>
      <span className="inline-flex items-center gap-1 text-[12px] text-[#8e8e93] tabular-nums">
        {syncing && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mock-anim-spin">
            <path d="M21 12a9 9 0 11-3-6.7" /><polyline points="21 4 21 9 16 9" />
          </svg>
        )}
        {time}
      </span>
    </div>
  );
}

export function DevicesScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f2f2f7]">
      <IOSStatusBar />
      <div className="shrink-0 px-5 pb-3 pt-1">
        <h2 className="text-[34px] font-bold leading-[1.05] tracking-tight text-[#000]" style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}>
          Devices
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#34c759] mock-anim-breathe" />
            <span className="text-[13px] font-semibold text-[#34c759]">All synced</span>
          </span>
          <span className="text-[13px] text-[#8e8e93]">5 devices</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-2">
        <IOSGroupedCard>
          <IOSListCell
            icon={<DeviceIcon type="laptop" bg="#1f2937" />}
            title="Lily's PC"
            subtitle="Windows 11 · 4,820 events"
            trailing={<SyncBadge syncing time="Just now" />}
          />
          <IOSListCell
            icon={<DeviceIcon type="laptop" bg="#475569" />}
            title="Family iMac"
            subtitle="macOS 14 · 3,140 events"
            trailing={<SyncBadge time="5m ago" />}
          />
          <IOSListCell
            icon={<DeviceIcon type="phone" bg="#0f172a" />}
            title="Lily's iPhone 14"
            subtitle="iOS 17 · 4,460 events"
            trailing={<SyncBadge time="1m ago" />}
          />
          <IOSListCell
            icon={<DeviceIcon type="tablet" bg="#334155" />}
            title="School iPad"
            subtitle="iPadOS 17 · 920 events"
            trailing={<SyncBadge time="3m ago" />}
          />
          <IOSListCell
            icon={<DeviceIcon type="laptop" bg="#312e81" />}
            title="Gaming Laptop"
            subtitle="Windows 11 · 1,260 events"
            trailing={<SyncBadge time="8m ago" />}
            border={false}
          />
        </IOSGroupedCard>
      </div>

      <IOSTabBar active="Home" />
    </div>
  );
}
