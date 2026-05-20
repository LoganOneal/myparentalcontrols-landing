#!/usr/bin/env node
/**
 * Retry pass for Aura and Qustodio. Uses broader selectors + bounding-box
 * search for any SVG/IMG in the header that looks logo-shaped (wider than
 * tall, plausibly small enough to be a brand mark).
 */
import { chromium } from "playwright";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public/images/competitors");

const SITES = [
  {
    name: "aura",
    url: "https://www.aura.com/",
    // Search broadly: any svg or img inside the top 120px that has alt or
    // title matching aura, OR has logo-like dimensions
    matcher: "aura",
  },
  {
    name: "qustodio",
    url: "https://www.qustodio.com/en/",
    matcher: "qustodio",
  },
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

for (const site of SITES) {
  const page = await ctx.newPage();
  console.log(`[${site.name}] visiting ${site.url}`);
  try {
    await page.goto(site.url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(3000);

    // Dismiss cookie banner aggressively
    for (const sel of [
      "button:has-text('Accept')",
      "button:has-text('Accept all')",
      "button:has-text('Accept All')",
      "button:has-text('I Accept')",
      "button:has-text('Agree')",
      "button:has-text('Got it')",
      "#onetrust-accept-btn-handler",
      "[id*='cookie'] button[id*='accept']",
    ]) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 400 })) {
          await btn.click({ timeout: 1500 }).catch(() => {});
          await page.waitForTimeout(600);
          break;
        }
      } catch {}
    }
    await page.waitForTimeout(800);

    // Search every img and svg in the top of the page for the best-looking
    // logo candidate
    const bbox = await page.evaluate((matcher) => {
      const candidates = [...document.querySelectorAll("img, svg")];
      const inViewport = candidates.filter((el) => {
        const r = el.getBoundingClientRect();
        return r.top >= 0 && r.top < 200 && r.width > 30 && r.height > 12;
      });
      // score: prefer elements with alt/aria-label matching the brand
      function score(el) {
        const r = el.getBoundingClientRect();
        const alt = (el.getAttribute("alt") || "").toLowerCase();
        const aria = (el.getAttribute("aria-label") || "").toLowerCase();
        const title = (el.getAttribute("title") || "").toLowerCase();
        let s = 0;
        if (alt.includes(matcher) || aria.includes(matcher) || title.includes(matcher))
          s += 100;
        // logos are wider than tall and small-ish
        if (r.width / r.height > 1.5 && r.width / r.height < 8) s += 20;
        if (r.width >= 80 && r.width <= 260) s += 10;
        if (r.height >= 20 && r.height <= 60) s += 10;
        // prefer those closest to top-left
        s += 60 - Math.min(60, r.top);
        s += 30 - Math.min(30, r.left / 10);
        return s;
      }
      const ranked = inViewport
        .map((el) => ({ el, s: score(el), rect: el.getBoundingClientRect() }))
        .sort((a, b) => b.s - a.s);
      if (!ranked.length) return null;
      const winner = ranked[0];
      return {
        x: winner.rect.x,
        y: winner.rect.y,
        width: winner.rect.width,
        height: winner.rect.height,
        tag: winner.el.tagName.toLowerCase(),
        alt: winner.el.getAttribute("alt") || winner.el.getAttribute("aria-label") || "",
      };
    }, site.matcher);

    if (!bbox) {
      console.log(`[${site.name}] no candidate logo found in top 200px`);
      continue;
    }

    console.log(
      `[${site.name}] candidate ${bbox.tag} (${Math.round(bbox.width)}x${Math.round(bbox.height)})  alt="${bbox.alt}"`
    );

    const pad = 4;
    await page.screenshot({
      path: join(OUT_DIR, `${site.name}.png`),
      omitBackground: true,
      clip: {
        x: Math.max(0, bbox.x - pad),
        y: Math.max(0, bbox.y - pad),
        width: Math.min(400, bbox.width + pad * 2),
        height: Math.min(120, bbox.height + pad * 2),
      },
    });
    console.log(`[${site.name}] saved logo`);
  } catch (e) {
    console.log(`[${site.name}] FAIL: ${e.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("\nDone.");
