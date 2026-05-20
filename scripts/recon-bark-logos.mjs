#!/usr/bin/env node
/**
 * Capture a full-page screenshot of bark.us/bark-app/ so we can see the
 * platform-logo banner (typically sits below the hero). Also extracts
 * `img` elements that look like platform logos.
 */
import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const URL_TARGET = "https://www.bark.us/bark-app/";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});
const page = await ctx.newPage();
await page.goto(URL_TARGET, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2000);

// dismiss cookie banner
for (const sel of [
  "button:has-text('Accept')",
  "button:has-text('Accept All')",
  "button:has-text('Agree')",
  "button:has-text('Got it')",
]) {
  try {
    const b = page.locator(sel).first();
    if (await b.isVisible({ timeout: 400 })) {
      await b.click({ timeout: 1000 }).catch(() => {});
      await page.waitForTimeout(400);
      break;
    }
  } catch {}
}

await mkdir(join(ROOT, "docs/design-references/bark"), { recursive: true });
await mkdir(join(ROOT, "docs/research/bark"), { recursive: true });

await page.screenshot({
  path: join(ROOT, "docs/design-references/bark/full-page.png"),
  fullPage: true,
});

const imgs = await page.evaluate(() => {
  return [...document.querySelectorAll("img")].map((i) => ({
    src: i.getAttribute("src") || i.currentSrc,
    alt: i.alt,
    width: i.naturalWidth,
    height: i.naturalHeight,
    parentClasses: i.parentElement?.className?.toString().slice(0, 100),
  }));
});
await writeFile(
  join(ROOT, "docs/research/bark/all-images.json"),
  JSON.stringify(imgs, null, 2)
);

console.log("done");
await browser.close();
