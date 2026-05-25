"use client";

import { useRouter } from "next/navigation";
import { Funnel } from "@/components/funnel/Funnel";
import { funnelConfig } from "@/data/funnel-config";
import type { FunnelAnswers } from "@/types/funnel";

export default function GetStartedPage() {
  const router = useRouter();

  const handleComplete = (answers: FunnelAnswers, email: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "koda:funnel:result",
        JSON.stringify({ answers, email, completedAt: new Date().toISOString() })
      );
    }
    router.push("/welcome");
  };

  return <Funnel config={funnelConfig} onComplete={handleComplete} />;
}
