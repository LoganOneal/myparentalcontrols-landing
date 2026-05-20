#!/usr/bin/env node
/**
 * Reconnaissance script for bark.us's header design. Visits the page,
 * captures header screenshots at desktop and mobile widths, then extracts
 * the computed styles of the navbar and its children.
 *
 * Output:
 *   docs/design-references/bark/header-desktop.png
 *   docs/design-references/bark/header-mobile.png
 *   docs/research/bark/header-styles.json
 *   docs/research/bark/header-html.html
 */

import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const URL_TARGET = "https://www.bark.us/bark-app/";

const HEADER_SELECTORS = [
  "header",
  "nav[role='navigation']",
  "[class*='header'][class*='nav']",
  "[class*='Header']",
  "[class*='Navigation']",
  "[id*='header']",
];

async function findHeader(page) {
  for (const sel of HEADER_SELECTORS) {
    const el = await page.locator(sel).first();
    if ((await el.count()) > 0) {
      const box = await el.boundingBox();
      if (box && box.height > 30 && box.height < 200) {
        return { selector: sel, box };
      }
    }
  }
  return null;
}

const EXTRACT_PROPS = [
  "fontSize", "fontWeight", "fontFamily", "lineHeight", "letterSpacing",
  "color", "textTransform", "textDecoration",
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
  "backdropFilter",
];

async function extractStyles(page, selector) {
  return page.evaluate(
    ({ selector, props }) => {
      const el = document.querySelector(selector);
      if (!el) return { error: "not found" };
      function pick(node, depth) {
        if (depth > 3) return null;
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
              ? node.textContent?.trim().slice(0, 120) ?? null
              : null,
          styles,
          children: [...node.children]
            .slice(0, 25)
            .map((c) => pick(c, depth + 1))
            .filter(Boolean),
        };
      }
      return pick(el, 0);
    },
    { selector, props: EXTRACT_PROPS }
  );
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
    await page.goto(URL_TARGET, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2000);

    // try dismissing cookie banner
    for (const sel of [
      "button:has-text('Accept')",
      "button:has-text('Accept All')",
      "button:has-text('Agree')",
      "button:has-text('Got it')",
      "[id*='accept']",
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

    const header = await findHeader(page);
    if (!header) {
      console.log(`[${label}] header not found, screenshotting full viewport`);
      await page.screenshot({
        path: join(ROOT, `docs/design-references/bark/header-${label}.png`),
        clip: { x: 0, y: 0, width: viewport.width, height: 200 },
      });
    } else {
      console.log(`[${label}] header found at`, header.selector, header.box);
      // Screenshot header with some breathing room
      const padding = 8;
      await page.screenshot({
        path: join(ROOT, `docs/design-references/bark/header-${label}.png`),
        clip: {
          x: Math.max(0, header.box.x - padding),
          y: Math.max(0, header.box.y - padding),
          width: Math.min(viewport.width, header.box.width + padding * 2),
          height: Math.min(220, header.box.height + padding * 2),
        },
      });
      if (label === "desktop") {
        const styles = await extractStyles(page, header.selector);
        await writeFile(
          join(ROOT, "docs/research/bark/header-styles.json"),
          JSON.stringify(styles, null, 2)
        );
        const html = await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          return el?.outerHTML?.slice(0, 60000) ?? "";
        }, header.selector);
        await writeFile(
          join(ROOT, "docs/research/bark/header-html.html"),
          html
        );
      }
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
