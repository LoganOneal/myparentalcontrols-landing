import type { Metadata } from "next";
import { GetStartedClient } from "./GetStartedClient";

export const metadata: Metadata = {
  title: "Get Started | Koda",
  description:
    "Start Koda's parent setup flow and build a safety plan for PC games, voice chat, online risk, and parental controls.",
  alternates: {
    canonical: "/get-started",
  },
};

export default function GetStartedPage() {
  return <GetStartedClient />;
}
