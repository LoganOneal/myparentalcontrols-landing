import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { MetaPixel } from "@/components/MetaPixel";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageView } from "@/components/PostHogPageView";
import {
  KODA_PRODUCT_DESCRIPTION,
  SITE_ALTERNATE_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
} from "@/lib/site";
import "./globals.css";

// Free open-license fallback for Moderat-Black. The hero applies a font stack
// of "Moderat-Black, sans-serif" — Archivo Black renders if the licensed
// Moderat-Black.woff2 file is missing from public/fonts/.
const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Koda Safety | Parental Security for PC Games",
  description: KODA_PRODUCT_DESCRIPTION,
  keywords: [
    "Koda Safety",
    "Koda parental controls",
    "PC gaming parental controls",
    "game chat monitoring",
    "voice chat monitoring for parents",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/seo/logo.png",
  },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  openGraph: {
    title: "Koda Safety | Parental Security for PC Games",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/seo/opengraph.jpg",
        alt: `${SITE_ALTERNATE_NAME} parental security for PC games`,
      },
    ],
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Koda Safety | Parental Security for PC Games",
    description: SITE_DESCRIPTION,
    images: ["/seo/opengraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} antialiased`}>
      {/* overflow-x-clip prevents horizontal overflow without turning the
          body into a scroll container — keeps position:sticky working in
          descendants. overflow-x-hidden would break scroll-lock sections. */}
      <body className="overflow-x-clip">
        <PostHogProvider>
          <PostHogPageView />
          <JsonLd data={organizationJsonLd} />
          {children}
        </PostHogProvider>
        <MetaPixel />
        <Analytics />
      </body>
      <GoogleAnalytics
        measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
      />
    </html>
  );
}
