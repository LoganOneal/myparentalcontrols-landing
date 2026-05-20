import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
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
  title: "Cal AI | Download Today",
  description:
    "Meet Cal AI, the AI-powered app for easy calorie tracking. Snap a photo, scan a barcode, or describe your meal and get instant calorie and nutrient info.",
  icons: {
    icon: "/seo/logo.png",
  },
  openGraph: {
    title: "Cal AI | Download Today",
    description:
      "Track your calories with just a picture. The AI-powered calorie tracker.",
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
      <body className="overflow-x-clip">{children}</body>
    </html>
  );
}
