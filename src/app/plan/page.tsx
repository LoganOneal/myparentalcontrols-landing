import type { Metadata } from "next";
import { EvidenceScreen } from "./screens/EvidenceScreen";
import { GamesScreen } from "./screens/GamesScreen";
import { DevicesScreen } from "./screens/DevicesScreen";
import { AIScannerScreen } from "./screens/AIScannerScreen";
import { BlocksScreen } from "./screens/BlocksScreen";

export const metadata: Metadata = {
  title: "Plan — iOS Screen Designs",
  robots: { index: false, follow: false },
};

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-[#1c1c1e] p-6 sm:p-10">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mb-8 text-[24px] font-bold text-white/80">iOS Screen Mockups — Testing</h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <ScreenFrame label="Receipts">
            <EvidenceScreen />
          </ScreenFrame>
          <ScreenFrame label="Inside Games">
            <GamesScreen />
          </ScreenFrame>
          <ScreenFrame label="All Devices">
            <DevicesScreen />
          </ScreenFrame>
          <ScreenFrame label="AI Scanner">
            <AIScannerScreen />
          </ScreenFrame>
          <ScreenFrame label="Block Controls">
            <BlocksScreen />
          </ScreenFrame>
        </div>
      </div>
    </div>
  );
}

function ScreenFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-white/40">{label}</p>
      <div className="relative w-full overflow-hidden rounded-[40px] bg-black shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]" style={{ aspectRatio: "393 / 852" }}>
        {children}
      </div>
    </div>
  );
}
