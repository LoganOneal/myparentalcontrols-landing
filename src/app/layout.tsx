import type { Metadata } from "next";
import { Bricolage_Grotesque, Archivo_Black } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// Free open-license fallback for Moderat-Black. The hero applies a font stack
// of "Moderat-Black, Archivo Black, sans-serif" — Archivo Black renders until
// you drop a licensed Moderat-Black.woff2 into public/fonts/.
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
    <html lang="en" className={`${bricolage.variable} ${archivoBlack.variable} antialiased`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
