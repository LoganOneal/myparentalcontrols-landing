import { SiteHeader } from "@/components/SiteHeader";
import { SubHeaderBar } from "@/components/SubHeaderBar";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { LogoBanner } from "@/components/home/LogoBanner";
import { AlertsForDangers } from "@/components/home/AlertsForDangers";
import { NewsGrid } from "@/components/home/NewsGrid";
import { FeatureSwitcher } from "@/components/home/FeatureSwitcher";
import { WhyChoose } from "@/components/home/WhyChoose";
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
      <NewsGrid />
      <FeatureSwitcher />
      <WhyChoose />
      <UserTestimonials />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}
