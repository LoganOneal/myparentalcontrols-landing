import * as React from "react";

export function IOSStatusBar({ light = false }: { light?: boolean }) {
  const c = light ? "#fff" : "#000";
  return (
    <div className="flex shrink-0 items-center justify-between px-8 pb-1" style={{ paddingTop: 16, height: 50 }}>
      <span className="text-[17px] font-semibold tabular-nums" style={{ color: c, letterSpacing: "-0.4px" }}>9:41</span>
      <div className="flex items-center gap-[5px]">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0.5" y="4" width="3" height="7.5" rx="1" fill={c} opacity="0.3" />
          <rect x="4.5" y="3" width="3" height="8.5" rx="1" fill={c} opacity="0.5" />
          <rect x="8.5" y="1.5" width="3" height="10" rx="1" fill={c} opacity="0.7" />
          <rect x="12.5" y="0.5" width="3" height="11" rx="1" fill={c} />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.5a7 7 0 00-5 2l1.2 1.2a5.2 5.2 0 017.6 0L13 4.5a7 7 0 00-5-2z" fill={c} opacity="0.5" />
          <path d="M8 5.5a4 4 0 00-2.8 1.2L6.4 7.9a2.2 2.2 0 013.2 0l1.2-1.2A4 4 0 008 5.5z" fill={c} opacity="0.7" />
          <circle cx="8" cy="10" r="1.4" fill={c} />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke={c} strokeWidth="1" opacity="0.3" />
          <rect x="23.5" y="3.5" width="2" height="5" rx="1" fill={c} opacity="0.3" />
          <rect x="2" y="2" width="18" height="8" rx="2.5" fill={c} />
        </svg>
      </div>
    </div>
  );
}

export function HomeIndicator({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex shrink-0 justify-center pb-2 pt-2">
      <div className="h-[5px] w-[134px] rounded-full" style={{ background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }} />
    </div>
  );
}

export function IOSNavBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="shrink-0 px-5 pb-3 pt-1">
      <h2 className="text-[34px] font-bold leading-[1.05] tracking-tight text-[#000]" style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}>
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-[15px] text-[#8e8e93]">{subtitle}</p>}
    </div>
  );
}

export function IOSTabBar({ active }: { active: string }) {
  const tabs = [
    { label: "Home", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "Games", d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Alerts", d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    { label: "Block", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  ];
  return (
    <div className="shrink-0 border-t border-black/[0.04] bg-[#f8f8f8]/95 backdrop-blur-xl">
      <div className="flex items-end justify-around px-2 pt-2 pb-0.5">
        {tabs.map((tab) => {
          const isActive = tab.label === active;
          return (
            <div key={tab.label} className="flex flex-col items-center gap-[2px] w-16">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke={isActive ? "#007aff" : "#8e8e93"}>
                <path d={tab.d} />
              </svg>
              <span className="text-[10px]" style={{ color: isActive ? "#007aff" : "#8e8e93", fontWeight: isActive ? 600 : 500 }}>{tab.label}</span>
            </div>
          );
        })}
      </div>
      <HomeIndicator />
    </div>
  );
}

export function IOSListCell({
  icon,
  title,
  subtitle,
  trailing,
  showChevron = false,
  border = true,
  highlighted = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  showChevron?: boolean;
  border?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3.5 px-4 py-3 ${border ? "border-b border-[#f2f2f7]" : ""} ${highlighted ? "bg-[#ff3b30]/[0.03]" : ""}`}>
      {icon}
      <div className="flex-1 min-w-0">
        <p className="text-[17px] font-normal text-[#000] leading-snug">{title}</p>
        {subtitle && <p className="text-[14px] text-[#8e8e93] leading-snug mt-0.5">{subtitle}</p>}
      </div>
      {trailing}
      {showChevron && (
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )}
    </div>
  );
}

export function IOSToggle({ on }: { on: boolean }) {
  return (
    <div className="relative h-[31px] w-[51px] shrink-0 rounded-full" style={{ background: on ? "#34c759" : "#e9e9eb" }}>
      <div
        className="absolute top-[2px] h-[27px] w-[27px] rounded-full bg-white"
        style={{
          left: on ? "22px" : "2px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
        }}
      />
    </div>
  );
}

export function IOSGroupedCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[13px] bg-white">
      {children}
    </div>
  );
}

export function IOSBadge({ text, color }: { text: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: `${color}14` }}>
      <span className="h-[7px] w-[7px] rounded-full mock-anim-breathe" style={{ background: color }} />
      <span className="text-[13px] font-semibold" style={{ color }}>{text}</span>
    </span>
  );
}
