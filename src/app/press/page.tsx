import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PressMentions } from "@/components/press/PressMentions";
import { PressForm } from "./form";

export const metadata = {
  title: "Press | MyParentalControls",
  description:
    "Press coverage, lawsuits, and reporting on the platforms where predators, cyber bullies, and scammers target children — plus how to reach our press team.",
};

export default function PressPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <header className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Press &amp; Media
          </span>
          <h1 className="mt-3 text-4xl sm:text-6xl font-bold text-black tracking-tight">
            Press
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-700">
            Reporting, lawsuits, and investigations covering the platforms where
            predators, cyber bullies, and scammers target your children — plus how to
            reach our press team.
          </p>
        </header>

        <PressMentions />

        <section className="mt-24 sm:mt-32">
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-[42px] leading-tight"
              style={{
                fontFamily: "Moderat-Black, sans-serif",
                fontWeight: 700,
              }}
            >
              Media inquiries
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-700">
              Working on a story? Get in touch with our press team for
              interviews, expert commentary, and press releases.
            </p>
          </div>
          <PressForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
