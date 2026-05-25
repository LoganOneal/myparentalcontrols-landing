import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog-posts";
import { COMPARISONS } from "@/data/comparisons";
import { PLATFORMS } from "@/data/platforms";
import { TUTORIALS } from "@/data/tutorials";
import { SITE_URL } from "@/lib/site";

function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

function parseDate(value: string) {
  const [month, day, year] = value.split("/").map(Number);
  if (!month || !day || !year) return new Date();
  return new Date(Date.UTC(year, month - 1, day));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/how-it-works"),
      changeFrequency: "monthly",
      priority: 0.94,
    },
    {
      url: absoluteUrl("/pricing"),
      changeFrequency: "monthly",
      priority: 0.93,
    },
    {
      url: absoluteUrl("/get-started"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/safety-privacy"),
      changeFrequency: "monthly",
      priority: 0.82,
    },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.9 },
    {
      url: absoluteUrl("/game-safety"),
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: absoluteUrl("/tutorials"),
      changeFrequency: "weekly",
      priority: 0.88,
    },
    { url: absoluteUrl("/press"), changeFrequency: "monthly", priority: 0.68 },
    { url: absoluteUrl("/login"), changeFrequency: "yearly", priority: 0.45 },
    {
      url: absoluteUrl("/privacy"),
      changeFrequency: "yearly",
      priority: 0.55,
    },
    { url: absoluteUrl("/tos"), changeFrequency: "yearly", priority: 0.5 },
    {
      url: absoluteUrl("/sweepstakes"),
      changeFrequency: "yearly",
      priority: 0.45,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: parseDate(post.dateModified),
    changeFrequency: "monthly",
    priority: post.slug.includes("koda-safety") ? 0.86 : 0.78,
  }));

  const platformRoutes: MetadataRoute.Sitemap = PLATFORMS.map((platform) => ({
    url: absoluteUrl(`/platforms/${platform.slug}`),
    changeFrequency: "monthly",
    priority: ["roblox", "discord", "fortnite", "minecraft"].includes(
      platform.slug
    )
      ? 0.84
      : 0.72,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = COMPARISONS.map(
    (comparison) => ({
      url: absoluteUrl(`/compare/${comparison.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })
  );

  const tutorialRoutes: MetadataRoute.Sitemap = TUTORIALS.map((tutorial) => ({
    url: absoluteUrl(`/tutorials/${tutorial.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...platformRoutes,
    ...comparisonRoutes,
    ...tutorialRoutes,
  ];
}
