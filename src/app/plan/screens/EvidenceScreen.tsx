"use client";

/**
 * Evidence Screen — "Receipts. So you know exactly what happened."
 *
 * Pixel-accurate iOS 17 detail view. No box-shadows on cards (white on
 * #f2f2f7 provides all separation). Hairline separators at 0.33px with
 * proper leading inset. Correct SF Pro type scale. Messages-style bubbles
 * with SVG tails and 65% max-width. Inset grouped table for metadata.
 */

import { IOSStatusBar, HomeIndicator } from "./shared";

/* ─── iOS Status + Dynamic Island spacing ─── */

function NavBar() {
  return (
    <div className="shrink-0 bg-[#f2f2f7]">
      <div className="flex items-center h-[44px] px-[16px]">
        <div className="flex items-center gap-[3px]">
          <svg width="13" height="21" viewBox="0 0 13 21" fill="none">
            <path d="M11 2L2.5 10.5L11 19" stroke="#007aff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[17px] text-[#007aff]">Alerts</span>
        </div>
      </div>
      <div className="px-[16px] pb-[8px]">
        <h1 className="text-[17px] font-semibold text-[#000]">Evidence Review</h1>
      </div>
    </div>
  );
}

/* ─── Video Attachment (iOS Photos/Share style) ─── */

function VideoAttachment() {
  return (
    <div className="rounded-[10px] overflow-hidden">
      <div className="relative" style={{ aspectRatio: "16 / 9" }}>
        <video
          src="/videos/minecraft-gameplay.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Top scrim */}
        <div className="absolute inset-x-0 top-0 h-[40px] bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        {/* Bottom scrim */}
        <div className="absolute inset-x-0 bottom-0 h-[50px] bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* REC indicator — top left */}
        <div className="absolute top-[8px] left-[8px] flex items-center gap-[6px]">
          <span className="inline-flex items-center gap-[4px] h-[20px] rounded-[4px] bg-[#ff3b30]/90 px-[5px]">
            <span className="h-[5px] w-[5px] rounded-full bg-white mock-anim-breathe" />
            <span className="text-[10px] font-bold text-white leading-none">REC</span>
          </span>
        </div>

        {/* Duration — top right */}
        <span className="absolute top-[8px] right-[8px] h-[20px] inline-flex items-center rounded-[4px] bg-black/50 px-[6px] text-[11px] font-medium text-white tabular-nums">
          0:47
        </span>

        {/* Play button — center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[44px] w-[44px] rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>

        {/* Source info — bottom left */}
        <div className="absolute bottom-[8px] left-[8px]">
          <p className="text-[11px] font-medium text-white/90 leading-tight">Minecraft · Hypixel</p>
          <p className="text-[10px] text-white/60 tabular-nums">Mar 15, 10:14 AM</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Messages-style Bubbles ─── */

function IncomingBubble({ text, showName = false }: { text: string; showName?: boolean }) {
  return (
    <div className="flex items-end gap-[6px] max-w-[75%]">
      {showName ? (
        <span className="shrink-0 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#8e8e93] text-[11px] font-semibold text-white mb-[1px]">S</span>
      ) : (
        <span className="w-[24px] shrink-0" />
      )}
      <div>
        {showName && <p className="text-[11px] text-[#8e8e93] mb-[2px] ml-[12px]">Stranger_77</p>}
        <div className="relative">
          <div className="rounded-[18px] rounded-bl-[4px] bg-[#e5e5ea] px-[12px] py-[8px]">
            <p className="text-[17px] text-[#000] leading-[22px]">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutgoingBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end max-w-[75%] ml-auto">
      <div className="rounded-[18px] rounded-br-[4px] bg-[#007aff] px-[12px] py-[8px]">
        <p className="text-[17px] text-white leading-[22px]">{text}</p>
      </div>
    </div>
  );
}

function FlaggedIncomingBubble({ text }: { text: string }) {
  return (
    <div className="flex items-end gap-[6px] max-w-[75%]">
      <span className="shrink-0 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#8e8e93] text-[11px] font-semibold text-white mb-[1px]">S</span>
      <div className="relative">
        <div className="rounded-[18px] rounded-bl-[4px] bg-[#e5e5ea] px-[12px] py-[8px] ring-2 ring-[#ff3b30]">
          <p className="text-[17px] text-[#000] leading-[22px]">{text}</p>
        </div>
        <span className="absolute -top-[6px] -right-[6px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#ff3b30]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 2L1 21h22L12 2zm0 15h.01M12 9v4" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" /></svg>
        </span>
      </div>
    </div>
  );
}

/* ─── Inset Grouped Table (iOS Settings style) ─── */

function GroupedTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[10px] bg-white overflow-hidden">
      {children}
    </div>
  );
}

function TableRow({ label, value, valueColor, last = false }: { label: string; value: string; valueColor?: string; last?: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between min-h-[44px] px-[16px] py-[11px]">
        <span className="text-[17px] text-[#000]">{label}</span>
        <span className="text-[17px] text-right" style={{ color: valueColor || "#8e8e93" }}>{value}</span>
      </div>
      {!last && <div className="h-px bg-[#c6c6c8]/40 ml-[16px]" />}
    </>
  );
}

/* ─── Section Header (iOS grouped table header) ─── */

function SectionHeader({ text }: { text: string }) {
  return (
    <p className="text-[13px] font-normal uppercase text-[#6c6c70] px-[20px] pb-[6px] pt-[18px] tracking-[-0.08px]">{text}</p>
  );
}

/* ─── Tab Bar ─── */

function TabBar() {
  return (
    <div className="shrink-0 bg-[#f9f9f9]/80 backdrop-blur-2xl border-t" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
      <div className="flex items-center justify-around pt-[5px] pb-[2px]">
        <TabItem label="Activity" active={false} icon={<><path d="M4 11a9 9 0 0118 0" strokeWidth="1.5" /><path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 22v-4M19.07 19.07l-2.83-2.83M22 12h-4M19.07 4.93l-2.83 2.83" strokeWidth="1.5" /></>} />
        <TabItem label="Games" active={false} icon={<><rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.5" /><path d="M8 12h2M13 12h2M9 14v2M14 14v2" strokeWidth="1.5" /></>} />
        <TabItem label="Alerts" active={true} icon={<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeWidth="1.5" />} filled />
        <TabItem label="Settings" active={false} icon={<><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" strokeWidth="1.5" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="1.5" /></>} />
      </div>
      <HomeIndicator />
    </div>
  );
}

function TabItem({ label, active, icon, filled }: { label: string; active: boolean; icon: React.ReactNode; filled?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-[1px] pt-[2px]">
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill={filled && active ? "#007aff" : "none"}
        fillOpacity={filled && active ? 0.15 : 0}
        stroke={active ? "#007aff" : "#8e8e93"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
      <span className="text-[10px]" style={{ color: active ? "#007aff" : "#8e8e93", fontWeight: active ? 600 : 400 }}>{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
 * Main Screen
 * ═══════════════════════════════════════════════════════════════════════════════ */

export function EvidenceScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f2f2f7]">
      <IOSStatusBar />
      <NavBar />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Video attachment */}
        <div className="px-[16px]">
          <VideoAttachment />
        </div>

        {/* Flagged conversation */}
        <SectionHeader text="Flagged conversation" />
        <div className="px-[16px]">
          <div className="rounded-[10px] bg-white px-[12px] py-[10px] space-y-[6px]">
            <IncomingBubble text="how old r u?" showName />
            <OutgoingBubble text="11" />
            <FlaggedIncomingBubble text="cool, dm me on discord" />
          </div>
        </div>

        {/* AI Analysis */}
        <SectionHeader text="AI Analysis" />
        <div className="px-[16px]">
          {/* Severity banner */}
          <div className="rounded-[10px] bg-white overflow-hidden mb-[8px]">
            <div className="flex items-center gap-[12px] px-[16px] py-[12px]">
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#ff3b30]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L1 21h22L12 2zM12 9v4M12 17h.01" /></svg>
              </div>
              <div className="flex-1">
                <p className="text-[17px] font-semibold text-[#000] leading-tight">Grooming Pattern</p>
                <p className="text-[13px] text-[#8e8e93]">High severity · AI confidence 96%</p>
              </div>
            </div>
          </div>

          {/* Detail rows */}
          <GroupedTable>
            <TableRow label="Pattern" value="Age → Platform shift" />
            <TableRow label="Risk" value="High" valueColor="#ff3b30" />
            <TableRow label="Action" value="Recorded" />
            <TableRow label="Time" value="10:14 AM" last />
          </GroupedTable>
        </div>

        {/* Actions */}
        <div className="px-[16px] pt-[20px] pb-[16px]">
          <button className="w-full h-[50px] rounded-[12px] bg-[#007aff] text-[17px] font-semibold text-white">
            Review Full Conversation
          </button>
          <button className="w-full h-[50px] mt-[8px] rounded-[12px] bg-white text-[17px] font-normal text-[#007aff]">
            Share with Co-Parent
          </button>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
