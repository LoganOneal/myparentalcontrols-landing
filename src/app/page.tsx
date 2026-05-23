import { SiteHeader } from "@/components/SiteHeader";
import { SubHeaderBar } from "@/components/SubHeaderBar";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { LogoBanner } from "@/components/home/LogoBanner";
import { ParentProof } from "@/components/home/ParentProof";
import { DidYouKnow } from "@/components/home/DidYouKnow";
import { AlertsForDangers } from "@/components/home/AlertsForDangers";
import { ResearchBacked } from "@/components/home/ResearchBacked";
import { CompetitorComparison } from "@/components/home/CompetitorComparison";
import { Pricing } from "@/components/home/Pricing";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <SubHeaderBar />
      <Hero />
      <LogoBanner />
      <ParentProof />
      <AlertsForDangers />
      <ResearchBacked />
      <DidYouKnow />
      <CompetitorComparison />
      <Pricing />
      <SiteFooter />
    </>
  );
}
