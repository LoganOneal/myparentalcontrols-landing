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
  FooterPill,
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
  return (
    <PhoneFrame className={className} style={style} bare={bare}>
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

      <div className="px-3 mt-3 relative z-10">
        <div
          className="bg-white rounded-2xl px-3 py-3 flex items-center justify-around ring-1 ring-black/5"
          style={{
            boxShadow:
              "0 1px 0 rgba(0,0,0,0.02), 0 8px 24px rgba(15,23,42,0.08)",
          }}
        >
          <div className="text-center">
            <div
              className="font-bold leading-none tabular-nums"
              style={{ color: COLORS.text, fontSize: "20px" }}
            >
              3
            </div>
            <div className="text-gray-500 mt-1 font-medium" style={{ fontSize: "10px" }}>
              Devices
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div
              className="font-bold leading-none tabular-nums"
              style={{ color: COLORS.redDeep, fontSize: "20px" }}
            >
              12.4K
            </div>
            <div className="text-gray-500 mt-1 font-medium" style={{ fontSize: "10px" }}>
              Events / wk
            </div>
          </div>
          <span className="w-px h-7 bg-gray-200" />
          <div className="text-center">
            <div
              className="font-bold leading-none tabular-nums"
              style={{ color: COLORS.low, fontSize: "20px" }}
            >
              0
            </div>
            <div className="text-gray-500 mt-1 font-medium" style={{ fontSize: "10px" }}>
              Gaps
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900" style={{ fontSize: "13px" }}>
          Devices
        </h3>
        <span
          className="inline-flex items-center gap-1 font-semibold"
          style={{ color: COLORS.low, fontSize: "11px" }}
        >
          <span
            aria-hidden
            className="block w-1.5 h-1.5 rounded-full mock-anim-breathe"
            style={{ background: COLORS.low }}
          />
          All synced
        </span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {DEVICES.map((d) => (
          <div
            key={d.name}
            className="relative bg-white rounded-xl border border-gray-100 p-2.5 flex items-center gap-2.5"
            style={{
              boxShadow:
                "0 1px 0 rgba(0,0,0,0.02), 0 2px 6px rgba(15,23,42,0.04)",
            }}
          >
            {d.icon}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: "11px" }}>
                {d.name}
              </p>
              <p
                className="text-gray-500 leading-snug mt-0.5 tabular-nums"
                style={{ fontSize: "9px" }}
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

      <FooterPill text="0 gaps · 0 blind spots" />

      <BottomNav activeTab="Children" />
    </PhoneFrame>
  );
}
