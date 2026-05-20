#!/usr/bin/env node
/**
 * Pulls competitor wordmark logos by visiting each company's homepage with
 * Playwright and screenshotting the bounding rect of the header logo
 * element. Saves transparent-trimmed PNGs to public/images/competitors/.
 *
 * If targeted selectors fail, falls back to a top-left region screenshot.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public/images/competitors");
await mkdir(OUT_DIR, { recursive: true });

const SITES = [
  {
    name: "bark",
    url: "https://www.bark.us/",
    selectors: ["header img[alt*='ark']", "header a img", ".site-logo img", "header img"],
  },
  {
    name: "gabb",
    url: "https://gabb.com/",
    // Gabb's logo is usually svg, alt contains "Gabb"
    selectors: ["header img[alt*='abb']", "header a img", "header svg", "header img"],
  },
  {
    name: "aura",
    url: "https://www.aura.com/",
    selectors: ["header img[alt*='ura']", "header a img", "header img"],
  },
  {
    name: "qustodio",
    url: "https://www.qustodio.com/en/",
    selectors: ["header img[alt*='ustodio']", "header a img", "header img"],
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
  console.log(`\n[${site.name}] visiting ${site.url}`);
  try {
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2500);

    // Dismiss common cookie banners
    for (const sel of [
      "button:has-text('Accept')",
      "button:has-text('Accept all')",
      "button:has-text('Accept All')",
      "button:has-text('Agree')",
      "button:has-text('I agree')",
      "button:has-text('Got it')",
      "#onetrust-accept-btn-handler",
    ]) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 500 })) {
          await btn.click({ timeout: 1500 }).catch(() => {});
          await page.waitForTimeout(600);
          break;
        }
      } catch {}
    }

    let saved = false;
    for (const selector of site.selectors) {
      try {
        const loc = page.locator(selector).first();
        const count = await loc.count();
        if (count === 0) continue;
        const box = await loc.boundingBox();
        if (!box) continue;
        if (box.width < 20 || box.height < 10) continue;
        // Some logos have generous transparent padding; expand slightly
        const padX = 4;
        const padY = 2;
        await page.screenshot({
          path: join(OUT_DIR, `${site.name}.png`),
          omitBackground: true,
          clip: {
            x: Math.max(0, box.x - padX),
            y: Math.max(0, box.y - padY),
            width: Math.min(800, box.width + padX * 2),
            height: Math.min(120, box.height + padY * 2),
          },
        });
        console.log(
          `[${site.name}] OK via ${selector}  ${Math.round(box.width)}x${Math.round(box.height)}`
        );
        saved = true;
        break;
      } catch (e) {
        // try next selector
      }
    }

    if (!saved) {
      // Fallback — top-left 300x80 region of the page
      await page.screenshot({
        path: join(OUT_DIR, `${site.name}.png`),
        omitBackground: true,
        clip: { x: 0, y: 0, width: 320, height: 90 },
      });
      console.log(`[${site.name}] saved fallback top-left region`);
    }
  } catch (e) {
    console.log(`[${site.name}] FAIL: ${e.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("\nDone.");
