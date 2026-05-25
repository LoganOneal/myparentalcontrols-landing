"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

const posthogProjectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!posthogProjectToken) return;

    posthog.init(posthogProjectToken, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      ui_host: "https://us.posthog.com",
      defaults: "2026-01-30",
      capture_pageview: false, // handled manually via SuspendedPostHogPageView
      capture_pageleave: true,
    });
  }, []);

  if (!posthogProjectToken) return <>{children}</>;

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
