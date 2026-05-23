import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Mail,
  Mic,
  Newspaper,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PressMentions } from "@/components/press/PressMentions";
import { PressForm } from "./form";

export const metadata = {
  title: "Press | Koda",
  description:
    "Press coverage, lawsuits, and reporting on the platforms where predators, cyber bullies, and scammers target children — plus how to reach our press team.",
};

type PressTopic = {
  icon: LucideIcon;
  label: string;
  description: string;
};

const PRESS_TOPICS: PressTopic[] = [
  {
    icon: Newspaper,
    label: "Coverage",
    description: "Recent reporting on child safety, gaming, and platform risk.",
  },
  {
    icon: BookOpen,
    label: "Research",
    description: "Plain-language context for parents, reporters, and editors.",
  },
  {
    icon: Mic,
    label: "Interviews",
    description: "Founder quotes and expert commentary for active stories.",
  },
  {
    icon: Mail,
    label: "Contact",
    description: "A direct media inquiry form for deadlines and follow-ups.",
  },
];

function PressTopicBadge({ topic }: { topic: PressTopic }) {
  const Icon = topic.icon;

  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span>
        <span className="block text-sm font-bold text-white">{topic.label}</span>
        <span className="mt-1 block text-sm leading-relaxed text-white/65">
          {topic.description}
        </span>
      </span>
    </div>
  );
}

export default function PressPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-[#F1F2F4]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#2563EB] shadow-sm ring-1 ring-black/5">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Press &amp; Media
              </div>
              <h1 className="mt-5 text-[38px] font-bold leading-[1.06] tracking-tight text-[#1E1E1E] sm:text-[48px] lg:text-[56px]">
                Press resources for safer online play.
              </h1>
              <p className="mt-5 max-w-[620px] text-base leading-relaxed text-black/70 sm:text-lg">
                Reporting, lawsuits, and investigations covering the platforms
                where predators, cyber bullies, and scammers target children.
                Find recent coverage, story context, and a direct line to our
                press team.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#media-inquiries"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 font-bold text-white transition hover:bg-[#1D4ED8]"
                >
                  Media inquiries
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href="#coverage"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 font-bold text-black transition hover:bg-black/[0.04]"
                >
                  View coverage
                </a>
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[#DBEAFE] shadow-[0_26px_70px_-44px_rgba(0,0,0,0.75)] sm:min-h-[440px]">
              <Image
                src="/images/hero-mom-monitoring.png"
                alt="Parent reviewing a child safety dashboard"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]"
              />
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                <div className="rounded-full bg-white/92 px-3 py-1.5 text-sm font-bold text-[#1E1E1E] shadow-sm">
                  Press brief
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg">
                  <Newspaper className="h-5 w-5" aria-hidden />
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/94 p-4 shadow-[0_18px_38px_-24px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                    <ShieldAlert className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-black">
                      Reporter resources available
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-black/60">
                      Coverage links, safety context, and media follow-up in
                      one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#121212] py-8 text-white">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-5 lg:grid-cols-4 lg:px-8">
            {PRESS_TOPICS.map((topic) => (
              <PressTopicBadge key={topic.label} topic={topic} />
            ))}
          </div>
        </section>

        <section id="coverage" className="scroll-mt-24 bg-[#F8F9FB] py-14 sm:py-18">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                  In the news
                </p>
                <h2 className="mt-2 text-[32px] font-bold leading-tight text-black sm:text-[42px]">
                  Reporting on the platforms parents are worried about.
                </h2>
              </div>
              <p className="max-w-[440px] text-base leading-relaxed text-black/60">
                A curated set of reporting, lawsuits, and investigations about
                the child safety issues shaping online gaming.
              </p>
            </div>

            <PressMentions hideHeader />
          </div>
        </section>

        <section
          id="media-inquiries"
          className="scroll-mt-24 bg-white px-5 py-14 sm:py-18 lg:px-8"
        >
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 rounded-lg bg-[#F1F2F4] p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                Media inquiries
              </p>
              <h2 className="mt-2 text-2xl font-bold text-black sm:text-3xl">
                Working on a story about online safety?
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-black/65">
                Contact our press team for interviews, expert commentary,
                product context, and press releases.
              </p>
            </div>
            <PressForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
