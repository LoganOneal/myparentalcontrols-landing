import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
    <html lang="en" className={`${bricolage.variable} antialiased`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
