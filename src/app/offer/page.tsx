import type { Metadata } from "next";
import { OfferClient } from "./OfferClient";

export const metadata: Metadata = {
  title: "Your Koda Plan | Koda",
  description: "Choose your Koda plan and continue to secure checkout.",
  alternates: {
    canonical: "/offer",
  },
};

export default function OfferPage() {
  return <OfferClient />;
}
