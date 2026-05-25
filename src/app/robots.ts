import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PUBLIC_DISALLOW = ["/api/", "/login", "/manage-subscription", "/welcome"];

const AI_AND_SEARCH_BOTS = [
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Bingbot",
  "Googlebot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: AI_AND_SEARCH_BOTS,
        allow: "/",
        disallow: PUBLIC_DISALLOW,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: PUBLIC_DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
