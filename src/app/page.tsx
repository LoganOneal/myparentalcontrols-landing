import { SiteHeader } from "@/components/SiteHeader";
import { SubHeaderBar } from "@/components/SubHeaderBar";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { LogoBanner } from "@/components/home/LogoBanner";
import { AlertsForDangers } from "@/components/home/AlertsForDangers";
import { BarkAssistant } from "@/components/home/BarkAssistant";
import { NewsGrid } from "@/components/home/NewsGrid";
import { Pricing } from "@/components/home/Pricing";
import { UserTestimonials } from "@/components/home/UserTestimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <SubHeaderBar />
      <Hero />
      <LogoBanner />
      <AlertsForDangers />
      <BarkAssistant />
      <NewsGrid />
      <Pricing />
      <UserTestimonials />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}
