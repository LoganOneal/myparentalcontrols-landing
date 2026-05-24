/**
 * Feature 2 mockup — "One dashboard. Every device your child uses." Shows
 * two desktop computers + one iPhone, all in "Synced" status.
 */

import * as React from "react";
import {
  COLORS,
  PhoneFrame,
  LaptopBox,
  PhoneBox,
} from "@/components/home/PhoneMockShared";

type Device = {
  name: string;
  os: string;
  syncedAgo: string;
  events: string;
  syncing?: boolean;
  icon: React.ReactNode;
};

const DEVICES: Device[] = [
  {
    name: "Lily's PC",
    os: "Windows 11",
    syncedAgo: "Just now",
    events: "4,820 events",
    syncing: true,
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
  {
    name: "School iPad",
    os: "iPadOS 17",
    syncedAgo: "3m ago",
    events: "920 events",
    icon: <PhoneBox bg="#334155" />,
  },
  {
    name: "Gaming laptop",
    os: "Windows 11",
    syncedAgo: "8m ago",
    events: "1,260 events",
    icon: <LaptopBox bg="#312E81" />,
  },
];

/** Spinning arrow ring — drops next to "Just now" on the device that's
 *  actively re-syncing right now. Pure CSS rotation, no JS. */
function SyncSpinner() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke={COLORS.low}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mock-anim-spin"
      aria-hidden
    >
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <polyline points="21 4 21 9 16 9" />
    </svg>
  );
}

export function DevicesScreenMock({
  className = "",
  style,
  bare = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  bare?: boolean;
}) {
  const compact = bare;

  return (
    <PhoneFrame className={className} style={style} bare={bare}>
      <div
        className={`flex items-center justify-between ${
          compact ? "px-3 pt-3" : "px-4 pt-10"
        }`}
      >
        <h3
          className="font-bold leading-tight text-gray-950"
          style={{ fontSize: compact ? "12px" : "15px" }}
        >
          Devices
        </h3>
        <span
          className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 font-semibold ring-1 ring-black/[0.06]"
          style={{ color: COLORS.low, fontSize: compact ? "9px" : "11px" }}
        >
          <span
            aria-hidden
            className="block w-1.5 h-1.5 rounded-full mock-anim-breathe"
            style={{ background: COLORS.low }}
          />
          All synced
        </span>
      </div>

      <div className={compact ? "px-3 mt-2 space-y-1.5" : "px-4 mt-3 space-y-2"}>
        {DEVICES.map((d) => (
          <div
            key={d.name}
            className={`relative flex items-center gap-2.5 rounded-[16px] border border-black/[0.06] bg-white px-2.5 ${
              compact ? "min-h-[42px] py-1.5" : "min-h-[52px] py-2"
            }`}
            style={{
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.90), 0 3px 10px rgba(15,23,42,0.04)",
            }}
          >
            {d.icon}
            <div className="flex-1 min-w-0">
              <p
                className="font-bold leading-tight text-gray-950"
                style={{ fontSize: compact ? "10.5px" : "11px" }}
              >
                {d.name}
              </p>
              <p
                className="text-gray-500 leading-snug mt-0.5 tabular-nums"
                style={{ fontSize: compact ? "8.5px" : "9px" }}
              >
                {d.os} · {d.events}
              </p>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span
                className="inline-flex items-center gap-1 font-bold rounded-full px-2"
                style={{
                  background: "#ECFDF5",
                  color: "#047857",
                  fontSize: "9px",
                  height: "18px",
                }}
              >
                <span
                  className="block w-1.5 h-1.5 rounded-full"
                  style={{ background: COLORS.low }}
                />
                Synced
              </span>
              <span
                className="inline-flex items-center gap-1 font-semibold tabular-nums"
                style={{ color: COLORS.textMuted, fontSize: "9px" }}
              >
                {d.syncing && <SyncSpinner />}
                {d.syncedAgo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}
