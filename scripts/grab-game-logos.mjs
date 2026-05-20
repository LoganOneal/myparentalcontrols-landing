#!/usr/bin/env node
/**
 * Downloads wordmark/logo art for the highest-risk video games we feature
 * in the LogoBanner marquee. Sources Wikimedia Commons via known file
 * URLs (verified by hand) — falls back to API search if direct URL fails.
 *
 * Output: public/images/platforms/games/<slug>.{svg|png}
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public/images/platforms/games");
await mkdir(OUT_DIR, { recursive: true });

// Per game we try a list of candidate Wikimedia Commons file titles in order
// of preference (SVG wordmarks first, then PNGs). The script resolves each
// to a direct upload URL using the action=query / imageinfo API.
const GAMES = [
  {
    slug: "gta-v",
    candidates: ["Grand Theft Auto V logo.png", "Grand Theft Auto V.svg"],
  },
  {
    slug: "call-of-duty",
    candidates: ["Call of Duty logo 2023.svg"],
  },
  {
    slug: "valorant",
    candidates: [
      "Valorant logo - pink color version.svg",
      "Valorant logo.svg",
      "Valorant_logo.svg",
    ],
  },
  {
    slug: "league-of-legends",
    candidates: [
      "League of Legends 2019 vector.svg",
      "League_of_Legends_logo.svg",
      "League of Legends.svg",
    ],
  },
  {
    slug: "counter-strike",
    candidates: [
      "Counter-Strike 2.svg",
      "Counter-Strike 2 logo.svg",
      "Counter-Strike logo.svg",
    ],
  },
  {
    slug: "apex-legends",
    candidates: ["Apex Legends logo.svg"],
  },
  {
    slug: "vrchat",
    candidates: ["VRChat Logo.svg"],
  },
  {
    slug: "among-us",
    candidates: ["Among Us Logo.svg"],
  },
];

async function resolveFileUrl(title) {
  // Use Wikimedia API to get the direct file URL for a given title
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("format", "json");
  api.searchParams.set("titles", `File:${title}`);
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "url|mime|size");
  api.searchParams.set("origin", "*");

  const res = await fetch(api, {
    headers: { "User-Agent": "mpc-landing-bot/1.0 (contact: support@myparentalcontrols.com)" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  if (!page || page.missing !== undefined) return null;
  const info = page.imageinfo?.[0];
  if (!info?.url) return null;
  return { url: info.url, mime: info.mime, w: info.width, h: info.height };
}

async function searchCommons(query) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("format", "json");
  api.searchParams.set("list", "search");
  api.searchParams.set("srnamespace", "6");
  api.searchParams.set("srsearch", `${query} logo filemime:image/svg+xml|image/png`);
  api.searchParams.set("srlimit", "5");
  api.searchParams.set("origin", "*");

  const res = await fetch(api, {
    headers: { "User-Agent": "mpc-landing-bot/1.0 (contact: support@myparentalcontrols.com)" },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data?.query?.search ?? []).map((h) =>
    h.title.replace(/^File:/, "")
  );
}

const UA =
  "Mozilla/5.0 (compatible; mpc-landing-logo-fetcher/1.0; +https://myparentalcontrols.com)";

async function downloadGame(game) {
  for (const candidate of game.candidates) {
    const resolved = await resolveFileUrl(candidate);
    if (resolved) {
      console.log(
        `[${game.slug}] ✓ ${candidate} -> ${resolved.w}x${resolved.h} ${resolved.mime}`
      );
      const ext = resolved.mime === "image/svg+xml" ? "svg" : "png";
      const out = join(OUT_DIR, `${game.slug}.${ext}`);
      const bin = await fetch(resolved.url, {
        headers: {
          "User-Agent": UA,
          Accept: "image/svg+xml,image/png,image/*;q=0.8,*/*;q=0.5",
          Referer: "https://commons.wikimedia.org/",
        },
      });
      if (!bin.ok) {
        console.log(`[${game.slug}]   HTTP ${bin.status} on binary fetch`);
        continue;
      }
      const buf = Buffer.from(await bin.arrayBuffer());
      const head = buf.subarray(0, 64).toString("utf8");
      if (head.includes("<!DOCTYPE html") || head.includes("<html")) {
        console.log(`[${game.slug}]   got HTML error page instead of image`);
        continue;
      }
      await writeFile(out, buf);
      console.log(`[${game.slug}]   saved ${out} (${buf.length} bytes)`);
      // small delay so we don't trip Wikimedia rate limiting
      await new Promise((r) => setTimeout(r, 800));
      return true;
    } else {
      console.log(`[${game.slug}] × ${candidate} (not found)`);
    }
  }
  // Fallback: search Commons
  const hits = await searchCommons(game.slug.replace(/-/g, " "));
  console.log(`[${game.slug}] search hits: ${hits.join(", ")}`);
  for (const hit of hits) {
    const resolved = await resolveFileUrl(hit);
    if (resolved) {
      console.log(
        `[${game.slug}] ✓ via search: ${hit} -> ${resolved.w}x${resolved.h} ${resolved.mime}`
      );
      const ext = resolved.mime === "image/svg+xml" ? "svg" : "png";
      const out = join(OUT_DIR, `${game.slug}.${ext}`);
      const bin = await fetch(resolved.url, {
        headers: { "User-Agent": "mpc-landing/1.0" },
      });
      const buf = Buffer.from(await bin.arrayBuffer());
      await writeFile(out, buf);
      console.log(`[${game.slug}]   saved ${out}`);
      return true;
    }
  }
  console.log(`[${game.slug}] FAIL — no logo found`);
  return false;
}

for (const game of GAMES) {
  await downloadGame(game);
}

console.log("\nDone.");
