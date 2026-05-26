import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SubHeaderBar } from "@/components/SubHeaderBar";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { LogoBanner } from "@/components/home/LogoBanner";
import { ParentProof } from "@/components/home/ParentProof";
import { DidYouKnow } from "@/components/home/DidYouKnow";
import { ParentTestimonial } from "@/components/home/ParentTestimonial";
import { DigitalWellbeing } from "@/components/home/DigitalWellbeing";
import { ResearchBacked } from "@/components/home/ResearchBacked";
import { CompetitorComparison } from "@/components/home/CompetitorComparison";
import { Pricing } from "@/components/home/Pricing";
import {
  KODA_PRODUCT_DESCRIPTION,
  SITE_ALTERNATE_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  kodaSafetySoftwareJsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Koda Gaming Parental Controls | PC Game Safety Alerts",
  description: KODA_PRODUCT_DESCRIPTION,
  keywords: [
    "Koda Gaming Parental Controls",
    "Koda parental controls",
    "PC gaming parental controls",
    "game chat monitoring",
    "voice chat monitoring for parents",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Koda Gaming Parental Controls | PC Game Safety Alerts",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/seo/opengraph.jpg",
        alt: `${SITE_ALTERNATE_NAME} parental controls for PC games`,
      },
    ],
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Koda Gaming Parental Controls | PC Game Safety Alerts",
    description: SITE_DESCRIPTION,
    images: ["/seo/opengraph.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <JsonLd data={kodaSafetySoftwareJsonLd} />
      <SubHeaderBar />
      <Hero />
      <LogoBanner />
      <ParentProof />
      <DigitalWellbeing />
      <ResearchBacked />
      <DidYouKnow />
      <ParentTestimonial />
      <CompetitorComparison />
      <Pricing />
      <SiteFooter />
    </>
  );
}
