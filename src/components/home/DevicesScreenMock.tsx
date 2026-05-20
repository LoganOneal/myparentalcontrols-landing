/**
 * Feature 2 mockup — "One dashboard. Every device your child uses." Shows
 * two desktop computers + one iPhone, all in "Synced" status.
 */

import * as React from "react";
import {
  COLORS,
  PhoneFrame,
  HeroHeader,
  BottomNav,
  LaptopBox,
  PhoneBox,
} from "@/components/home/PhoneMockShared";

type Device = {
  name: string;
  os: string;
  syncedAgo: string;
  events: string;
  icon: React.ReactNode;
};

const DEVICES: Device[] = [
  {
    name: "Lily's PC",
    os: "Windows 11",
    syncedAgo: "2m ago",
    events: "4,820 events",
    icon: <LaptopBox bg="#1F2937" />,
  },
  {
    name: "Family iMac",
    os: "macOS 14",
    syncedAgo: "5m ago",
    events: "3,140 events",
    icon: <LaptopBox bg="#475569" />,
  },
  {
    name: "Lily's iPhone 14",
    os: "iOS 17",
    syncedAgo: "1m ago",
    events: "4,460 events",
    icon: <PhoneBox bg="#0F172A" />,
  },
];

export function DevicesScreenMock({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <PhoneFrame className={className} style={style}>
      <HeroHeader
        title={
          <>
            Connected
            <br />
            devices
          </>
        }
        subtitle={
          <>
            One dashboard. Every device
            <br />
            your child touches.
          </>
        }
        iconNode={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2H4V6zm0 4h16v6a2 2 0 0 1-2 2h-5v2h3v2H8v-2h3v-2H6a2 2 0 0 1-2-2v-6zm5 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>
        }
      />

      <div className="px-3 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 px-3 py-3 flex items-center justify-around">
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.text, fontSize: "20px" }}>
              3
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Devices
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.redDeep, fontSize: "20px" }}>
              12.4K
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Events / wk
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div className="font-bold leading-none" style={{ color: COLORS.low, fontSize: "20px" }}>
              0
            </div>
            <div className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
              Gaps
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900" style={{ fontSize: "13px" }}>
          Devices
        </h3>
        <span className="font-semibold" style={{ color: COLORS.low, fontSize: "11px" }}>
          All synced
        </span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {DEVICES.map((d) => (
          <div
            key={d.name}
            className="bg-white rounded-xl border border-gray-100 p-2.5 flex items-center gap-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {d.icon}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: "11px" }}>
                {d.name}
              </p>
              <p className="text-gray-500 leading-snug mt-0.5" style={{ fontSize: "9px" }}>
                {d.os} · {d.events}
              </p>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span
                className="inline-flex items-center gap-1 font-bold rounded-full px-2"
                style={{ background: "#ECFDF5", color: "#047857", fontSize: "9px", height: "18px" }}
              >
                <span className="block w-1.5 h-1.5 rounded-full" style={{ background: COLORS.low }} />
                Synced
              </span>
              <span className="font-semibold" style={{ color: COLORS.textMuted, fontSize: "9px" }}>
                {d.syncedAgo}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p
        className="text-center mt-3 px-4 font-semibold leading-snug"
        style={{ color: COLORS.textMuted, fontSize: "10px" }}
      >
        No app to switch between. No device we can&rsquo;t see.
      </p>

      <BottomNav activeTab="Children" />
    </PhoneFrame>
  );
}
