import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock3, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TUTORIALS } from "@/data/tutorials";

export const metadata: Metadata = {
  title: "Gaming Safety Tutorials for Parents | Koda",
  description:
    "Step-by-step guides to turn off voice chat, restrict game chat, set parental controls, and keep your child safe in Roblox, Fortnite, Discord, and Minecraft.",
  keywords: [
    "how to turn off Fortnite voice chat",
    "how to turn off Roblox chat",
    "how to turn off Discord DMs",
    "how to restrict games on Windows",
    "parental controls for gaming",
    "how to monitor kids gaming activity",
  ],
};

const DIFFICULTY_STYLES = {
  Easy: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Medium: { bg: "bg-amber-50", text: "text-amber-700" },
  Hard: { bg: "bg-red-50", text: "text-red-700" },
};

export default function TutorialsPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-4 py-10 sm:py-16">
        {/* Hero */}
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {TUTORIALS.length} step-by-step guides
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-black tracking-tight leading-tight">
            Gaming Safety Tutorials
          </h1>
          <p className="mt-4 text-lg text-black/70 leading-relaxed max-w-2xl">
            Quick, practical guides to lock down the settings that matter most.
            Each tutorial targets one specific safety change you can make right
            now.
          </p>
        </header>

        {/* Tutorial grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TUTORIALS.map((tutorial) => {
            const style = DIFFICULTY_STYLES[tutorial.difficulty];
            return (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${tutorial.slug}`}
                className="group flex flex-col p-5 rounded-2xl border border-black/5 bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
                  >
                    {tutorial.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-black/50">
                    <Clock3 className="w-3 h-3" />
                    {tutorial.timeMinutes} min
                  </span>
                </div>
                <h2 className="text-base font-bold text-black group-hover:text-[#2563EB] transition">
                  {tutorial.title}
                </h2>
                <p className="mt-2 text-sm text-black/60 line-clamp-2 flex-1">
                  {tutorial.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-black/40 uppercase tracking-wider">
                    {tutorial.platform}
                  </span>
                  <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-[#2563EB] transition" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <section className="mt-16 p-8 sm:p-12 rounded-2xl bg-black text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Settings are a start. Monitoring catches what slips through.
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Parental controls reduce risk — but kids find workarounds. Koda
            Safety monitors the conversations that still happen and alerts you
            when something actually needs attention.
          </p>
          <Link
            href="/get-started"
            className="inline-flex mt-6 items-center justify-center px-8 h-12 rounded-full bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
