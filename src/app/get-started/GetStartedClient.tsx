"use client";

import { useRouter } from "next/navigation";
import { Funnel } from "@/components/funnel/Funnel";
import { funnelConfig } from "@/data/funnel-config";
import type { FunnelCompletion } from "@/types/funnel";

export function GetStartedClient() {
  const router = useRouter();

  const handleComplete = (completion: FunnelCompletion) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "koda:funnel:result",
        JSON.stringify(completion)
      );
    }
    router.push("/offer");
  };

  return <Funnel config={funnelConfig} onComplete={handleComplete} />;
}
