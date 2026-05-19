import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-5 pt-8 pb-16">
        <article className="prose-cal max-w-4xl mx-auto">{children}</article>
      </main>
      <SiteFooter />
    </>
  );
}
