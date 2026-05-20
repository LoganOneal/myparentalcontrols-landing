#!/usr/bin/env node
/**
 * Visits localhost:3000 and measures each logo's rendered bounding rect
 * inside the LogoBanner marquee. Prints a table and saves a screenshot
 * of the section so we can verify consistent sizing.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
await mkdir(join(ROOT, "docs/design-references"), { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
console.log("visiting localhost:3000 ...");
await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);

// Pause the marquee so it doesn't move during measurement
await page.evaluate(() => {
  for (const el of document.querySelectorAll(".animate-marquee")) {
    el.style.animationPlayState = "paused";
    el.style.transform = "translateX(0)";
  }
});
await page.waitForTimeout(200);

// Find all logo slots in the marquee track
const measurements = await page.evaluate(() => {
  const track = document.querySelector(".animate-marquee");
  if (!track) return { error: "no marquee found" };
  const slots = [...track.children];
  return slots.slice(0, 12).map((slot) => {
    const slotRect = slot.getBoundingClientRect();
    const img = slot.querySelector("img");
    const imgRect = img ? img.getBoundingClientRect() : null;
    return {
      name: img?.getAttribute("alt") ?? "?",
      slot: { w: Math.round(slotRect.width), h: Math.round(slotRect.height) },
      img: imgRect
        ? { w: Math.round(imgRect.width), h: Math.round(imgRect.height) }
        : null,
    };
  });
});

console.log("\nLogo measurements (slot vs rendered image):");
console.log("Name           Slot W×H       Image W×H");
console.log("-".repeat(50));
for (const m of measurements) {
  console.log(
    `${m.name.padEnd(15)}${`${m.slot.w}×${m.slot.h}`.padEnd(15)}${
      m.img ? `${m.img.w}×${m.img.h}` : "-"
    }`
  );
}

// Locate the section and screenshot it
const sectionHandle = await page.evaluateHandle(() => {
  const m = document.querySelector(".animate-marquee");
  return m?.closest("section") ?? null;
});
const el = sectionHandle.asElement();
if (el) {
  const box = await el.boundingBox();
  if (box) {
    await page.screenshot({
      path: join(ROOT, "docs/design-references/logo-banner-current.png"),
      clip: {
        x: 0,
        y: Math.max(0, box.y - 10),
        width: 1440,
        height: Math.min(box.height + 20, 400),
      },
    });
    console.log("\nScreenshot saved -> docs/design-references/logo-banner-current.png");
  }
}

await browser.close();
