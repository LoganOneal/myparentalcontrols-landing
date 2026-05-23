import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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
  metadataBase: new URL("https://myparentalcontrols.com"),
  title: "Koda | Parental Security for PC Games",
  description:
    "Koda monitors voice and chat across the PC games kids actually play, with real-time alerts when something dangerous appears.",
  icons: {
    icon: "/seo/logo.svg",
  },
  openGraph: {
    title: "Koda | Parental Security for PC Games",
    description:
      "Voice and chat monitoring across 3,000+ PC games with real-time alerts for parents.",
    images: [{ url: "/seo/opengraph.jpg" }],
    type: "website",
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
        {children}
        <Analytics />
      </body>
      <GoogleAnalytics
        measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
      />
    </html>
  );
}
