#!/usr/bin/env node
/**
 * Reads every wordmark SVG, renders it in a headless browser, measures
 * the actual content bounding box via getBBox(), and writes a new SVG
 * with a tightly-cropped viewBox. Result: every output SVG has zero
 * internal padding, so rendering them at the same pixel height yields
 * consistent visual weight across logos.
 *
 * Output: public/images/platforms/wordmarks-clean/*.svg
 */

import { chromium } from "playwright";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const INPUTS = [
  // 10 ar21 wordmarks from vectorlogo.zone
  ...(await readdir(join(ROOT, "public/images/platforms/wordmarks-v2/"))).map(
    (f) => ({
      src: join(ROOT, "public/images/platforms/wordmarks-v2/", f),
      name: f,
    })
  ),
  // Roblox wordmark from Wikimedia (legacy folder)
  {
    src: join(ROOT, "public/images/platforms/wordmarks/roblox.svg"),
    name: "roblox.svg",
  },
];

const OUT_DIR = join(ROOT, "public/images/platforms/wordmarks-clean/");
await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 800 } });
const page = await ctx.newPage();

for (const { src, name } of INPUTS) {
  if (!name.endsWith(".svg")) continue;
  let svg = await readFile(src, "utf8");

  // Render the SVG sized to a known width; measure bbox in viewBox units.
  // We strip explicit width/height attrs on the root so the browser
  // computes them from the viewBox.
  const measureSvg = svg
    .replace(/(<svg[^>]*?)\swidth="[^"]*"/i, "$1")
    .replace(/(<svg[^>]*?)\sheight="[^"]*"/i, "$1")
    .replace(/<svg/, '<svg id="m" style="width:1000px;height:auto" ');

  await page.setContent(
    `<!doctype html><html><body style="margin:0;padding:0">${measureSvg}</body></html>`,
    { waitUntil: "domcontentloaded" }
  );
  // Wait a frame for layout
  await page.waitForTimeout(50);

  const bbox = await page.evaluate(() => {
    const el = document.getElementById("m");
    if (!el) return null;
    try {
      // getBBox returns content bounds in viewBox units
      const b = el.getBBox();
      return { x: b.x, y: b.y, width: b.width, height: b.height };
    } catch {
      return null;
    }
  });

  if (!bbox || bbox.width === 0 || bbox.height === 0) {
    console.log("[skip] no bbox:", name);
    continue;
  }

  // Pad 2% on each side so the logo doesn't touch the very edge.
  const padX = bbox.width * 0.02;
  const padY = bbox.height * 0.02;
  const vbX = bbox.x - padX;
  const vbY = bbox.y - padY;
  const vbW = bbox.width + padX * 2;
  const vbH = bbox.height + padY * 2;
  const newVB = `${vbX.toFixed(3)} ${vbY.toFixed(3)} ${vbW.toFixed(3)} ${vbH.toFixed(3)}`;

  // Update or insert viewBox; strip explicit width/height so the SVG
  // scales freely with CSS.
  let cleaned = svg
    .replace(/(<svg[^>]*?)\swidth="[^"]*"/i, "$1")
    .replace(/(<svg[^>]*?)\sheight="[^"]*"/i, "$1");
  if (/viewBox="[^"]+"/i.test(cleaned)) {
    cleaned = cleaned.replace(/viewBox="[^"]+"/i, `viewBox="${newVB}"`);
  } else {
    cleaned = cleaned.replace(/<svg/, `<svg viewBox="${newVB}"`);
  }

  await writeFile(join(OUT_DIR, name), cleaned);
  console.log(
    `[ok] ${name}  bbox=${bbox.width.toFixed(1)}x${bbox.height.toFixed(1)}  vb=${newVB}`
  );
}

await browser.close();
console.log("\nDone.");
