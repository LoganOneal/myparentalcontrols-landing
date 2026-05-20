#!/usr/bin/env node
/**
 * Extracts Aura's header-logo SVG directly (not as a screenshot) so we get
 * a transparent SVG instead of the dark navbar band baked into the PNG.
 *
 * Saves to public/images/competitors/aura.svg — the ColumnHeader's
 * `<img src="/images/competitors/aura.svg">` will pick it up first because
 * the component requests .svg by default.
 */
import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});
const page = await ctx.newPage();
console.log("visiting aura.com");
await page.goto("https://www.aura.com/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2500);

// Find the logo svg using the same heuristic as the retry script
const result = await page.evaluate(() => {
  const candidates = [...document.querySelectorAll("svg")];
  const ranked = candidates
    .map((el) => {
      const r = el.getBoundingClientRect();
      let s = 0;
      if (r.top >= 0 && r.top < 200 && r.width > 30 && r.height > 12) {
        if (r.width / r.height > 1.5 && r.width / r.height < 8) s += 20;
        if (r.width >= 60 && r.width <= 260) s += 10;
        s += 60 - Math.min(60, r.top);
      }
      return { el, s, rect: r };
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  if (!ranked.length) return null;
  const svg = ranked[0].el;
  // Force the text/path fills to a brand color (Aura's brand is black; their
  // header version uses white because the bar is dark). We want the wordmark
  // to render dark on light comparison-table cells.
  svg.querySelectorAll("[fill='white'], [fill='#fff'], [fill='#FFFFFF']").forEach((e) => {
    e.setAttribute("fill", "#1F1F1F");
  });
  // Set explicit width/height so it renders without dependent CSS
  if (!svg.hasAttribute("viewBox")) {
    svg.setAttribute(
      "viewBox",
      `0 0 ${ranked[0].rect.width} ${ranked[0].rect.height}`
    );
  }
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  return svg.outerHTML;
});

if (!result) {
  console.log("no svg candidate");
  process.exit(1);
}

await writeFile(join(ROOT, "public/images/competitors/aura.svg"), result);
console.log("saved aura.svg", result.length, "bytes");
await browser.close();
