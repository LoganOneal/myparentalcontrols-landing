import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { NewsGrid } from "@/components/home/NewsGrid";
import { FeatureSwitcher } from "@/components/home/FeatureSwitcher";
import { WhyChoose } from "@/components/home/WhyChoose";
import { UserTestimonials } from "@/components/home/UserTestimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <NewsGrid />
      <FeatureSwitcher />
      <WhyChoose />
      <UserTestimonials />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}
