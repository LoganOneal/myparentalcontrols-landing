import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PressForm } from "./form";

export const metadata = {
  title: "Press | Cal AI",
  description:
    "Get in touch with our press team for media inquiries, interviews, and press releases.",
};

export default function PressPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-4 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-black text-center">
          Press
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-700 text-center max-w-2xl mx-auto">
          Get in touch with our press team for media inquiries, interviews, and
          press releases.
        </p>
        <PressForm />
      </main>
      <SiteFooter />
    </>
  );
}
