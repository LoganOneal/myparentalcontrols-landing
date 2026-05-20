#!/usr/bin/env node
/**
 * Reconnaissance script for bark.us's hero section. Captures the area
 * directly below the header at desktop + mobile widths, and extracts the
 * computed styles + DOM structure of the first major content section.
 *
 * Output:
 *   docs/design-references/bark/hero-desktop.png
 *   docs/design-references/bark/hero-mobile.png
 *   docs/research/bark/hero-styles.json
 *   docs/research/bark/hero-html.html
 *   docs/research/bark/hero-text.json
 */

import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const URL_TARGET = "https://www.bark.us/bark-app/";

const EXTRACT_PROPS = [
  "fontSize", "fontWeight", "fontFamily", "lineHeight", "letterSpacing",
  "color", "textTransform", "textDecoration", "textAlign",
  "backgroundColor", "background",
  "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
  "margin", "marginTop", "marginRight", "marginBottom", "marginLeft",
  "width", "height", "maxWidth", "minWidth",
  "display", "flexDirection", "justifyContent", "alignItems", "gap",
  "gridTemplateColumns",
  "borderRadius", "border", "borderBottom",
  "boxShadow", "overflow",
  "position", "top", "right", "bottom", "left", "zIndex",
  "opacity", "transform", "transition", "cursor",
];

async function extractStyles(page, selector) {
  return page.evaluate(
    ({ selector, props }) => {
      const el = document.querySelector(selector);
      if (!el) return { error: "not found" };
      function pick(node, depth) {
        if (depth > 4) return null;
        const cs = getComputedStyle(node);
        const styles = {};
        for (const p of props) {
          const v = cs[p];
          if (
            v &&
            v !== "none" &&
            v !== "normal" &&
            v !== "auto" &&
            v !== "0px" &&
            v !== "rgba(0, 0, 0, 0)"
          ) {
            styles[p] = v;
          }
        }
        return {
          tag: node.tagName.toLowerCase(),
          classes: (node.className?.toString() ?? "").slice(0, 200),
          text:
            node.children.length === 0
              ? node.textContent?.trim().slice(0, 200) ?? null
              : null,
          styles,
          attrs: {
            href: node.getAttribute?.("href") ?? undefined,
            src: node.getAttribute?.("src") ?? undefined,
            alt: node.getAttribute?.("alt") ?? undefined,
          },
          children: [...node.children]
            .slice(0, 30)
            .map((c) => pick(c, depth + 1))
            .filter(Boolean),
        };
      }
      return pick(el, 0);
    },
    { selector, props: EXTRACT_PROPS }
  );
}

async function findHeroSelector(page) {
  // Try a few common patterns; fall back to "the first <section> or <div>
  // right after <header> that has enough content"
  const candidates = [
    "main > section:first-of-type",
    "main > div:first-of-type",
    "section.hero",
    "[class*='Hero']",
    "[class*='hero']",
    "main",
  ];
  for (const sel of candidates) {
    const el = page.locator(sel).first();
    if ((await el.count()) > 0) {
      const box = await el.boundingBox();
      if (box && box.height > 200) {
        return sel;
      }
    }
  }
  return "body";
}

async function main() {
  await mkdir(join(ROOT, "docs/design-references/bark"), { recursive: true });
  await mkdir(join(ROOT, "docs/research/bark"), { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const [label, viewport] of [
    ["desktop", { width: 1440, height: 900 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const ctx = await browser.newContext({
      viewport,
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
    });
    const page = await ctx.newPage();
    console.log(`[${label}] visiting ${URL_TARGET}`);
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

    // Capture top 1200px of the page (covers header + full hero on most sites)
    const clipHeight = label === "desktop" ? 1100 : 1300;
    await page.screenshot({
      path: join(ROOT, `docs/design-references/bark/hero-${label}.png`),
      clip: { x: 0, y: 0, width: viewport.width, height: clipHeight },
    });
    console.log(`[${label}] screenshot saved`);

    if (label === "desktop") {
      const heroSel = await findHeroSelector(page);
      console.log(`[desktop] hero selector: ${heroSel}`);
      const styles = await extractStyles(page, heroSel);
      await writeFile(
        join(ROOT, "docs/research/bark/hero-styles.json"),
        JSON.stringify(styles, null, 2)
      );
      const html = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        return el?.outerHTML?.slice(0, 80000) ?? "";
      }, heroSel);
      await writeFile(join(ROOT, "docs/research/bark/hero-html.html"), html);

      // Extract just the text content + image sources in the hero
      const text = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const top = el.cloneNode(true);
        // remove scripts/styles
        top.querySelectorAll("script,style").forEach((n) => n.remove());
        const headings = [...top.querySelectorAll("h1,h2,h3,h4")].map((h) => ({
          tag: h.tagName.toLowerCase(),
          text: h.textContent?.trim() ?? "",
        }));
        const paragraphs = [...top.querySelectorAll("p")].map((p) =>
          (p.textContent ?? "").trim()
        ).filter((s) => s.length > 0);
        const buttons = [...top.querySelectorAll("a,button")]
          .slice(0, 12)
          .map((b) => ({
            text: (b.textContent ?? "").trim(),
            href: b.getAttribute("href") ?? null,
          }))
          .filter((b) => b.text.length > 0 && b.text.length < 60);
        const imgs = [...top.querySelectorAll("img")].slice(0, 12).map((i) => ({
          src: i.getAttribute("src") || i.currentSrc,
          alt: i.alt,
          width: i.naturalWidth,
          height: i.naturalHeight,
        }));
        return { headings, paragraphs: paragraphs.slice(0, 12), buttons, imgs };
      }, heroSel);
      await writeFile(
        join(ROOT, "docs/research/bark/hero-text.json"),
        JSON.stringify(text, null, 2)
      );
    }

    await ctx.close();
  }

  await browser.close();
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
