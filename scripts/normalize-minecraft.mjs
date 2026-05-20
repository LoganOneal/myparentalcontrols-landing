#!/usr/bin/env node
/**
 * Renders public/images/platforms/minecraft.svg in headless Chromium,
 * measures the actual content bounding box with getBBox(), and writes a
 * version with a tightly-cropped viewBox to wordmarks-clean/minecraft.svg.
 *
 * The simple-icons flat silhouette is the right shape for our
 * brightness/invert filter, but the source ships with a square 24x24
 * viewBox that contains lots of vertical padding around the wordmark
 * itself — uniform-height rendering then makes Minecraft look tiny.
 */
import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SRC = join(ROOT, "public/images/platforms/minecraft.svg");
const OUT = join(ROOT, "public/images/platforms/wordmarks-clean/minecraft.svg");

const raw = await readFile(SRC, "utf8");
const stripped = raw
  .replace(/(<svg[^>]*?)\swidth="[^"]*"/i, "$1")
  .replace(/(<svg[^>]*?)\sheight="[^"]*"/i, "$1")
  .replace(/<svg/, '<svg id="m" style="width:1000px;height:auto" ');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setContent(
  `<!doctype html><html><body style="margin:0;padding:0">${stripped}</body></html>`,
  { waitUntil: "domcontentloaded" }
);
await page.waitForTimeout(50);

const bbox = await page.evaluate(() => {
  const svg = document.querySelector("svg");
  const g = svg.querySelector("path");
  const r = g.getBBox();
  // Also read the original viewBox so we can map back if needed.
  const vb = svg.getAttribute("viewBox");
  return { x: r.x, y: r.y, w: r.width, h: r.height, vb };
});

console.log("measured bbox:", bbox);

await browser.close();

const pad = 0.05; // tiny margin so anti-aliased edges don't get clipped
const x = bbox.x - pad;
const y = bbox.y - pad;
const w = bbox.w + pad * 2;
const h = bbox.h + pad * 2;

const tightVb = `${x.toFixed(4)} ${y.toFixed(4)} ${w.toFixed(4)} ${h.toFixed(4)}`;
console.log("tight viewBox:", tightVb);

const out = raw
  .replace(/viewBox="[^"]*"/, `viewBox="${tightVb}"`)
  .replace(/role="img"/, "");

await writeFile(OUT, out);
console.log("wrote", OUT, `(${out.length} bytes)`);
