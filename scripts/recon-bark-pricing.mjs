#!/usr/bin/env node
/**
 * Capture the "Pricing & Details" section on bark.us/bark-app/.
 * Outputs: docs/design-references/bark/pricing-desktop.png, pricing-mobile.png,
 *          docs/research/bark/pricing-styles.json, pricing-text.json
 */
import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const URL_TARGET = "https://www.bark.us/bark-app/";

const PROPS = [
  "fontSize","fontWeight","fontFamily","lineHeight","letterSpacing",
  "color","textTransform","textDecoration","textAlign",
  "backgroundColor","background",
  "padding","paddingTop","paddingRight","paddingBottom","paddingLeft",
  "margin","marginTop","marginRight","marginBottom","marginLeft",
  "width","height","maxWidth","minWidth",
  "display","flexDirection","justifyContent","alignItems","gap",
  "gridTemplateColumns",
  "borderRadius","border","borderTop","borderBottom",
  "boxShadow","overflow",
  "position","top","right","bottom","left","zIndex",
  "opacity","transform","transition","cursor",
];

async function pick(page, selector) {
  return page.evaluate(({ selector, props }) => {
    const el = document.querySelector(selector);
    if (!el) return { error: "not found" };
    function walk(node, depth) {
      if (depth > 4) return null;
      const cs = getComputedStyle(node);
      const styles = {};
      for (const p of props) {
        const v = cs[p];
        if (v && v !== "none" && v !== "normal" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)") styles[p] = v;
      }
      return {
        tag: node.tagName.toLowerCase(),
        classes: (node.className?.toString() ?? "").slice(0, 200),
        text: node.children.length === 0 ? node.textContent?.trim().slice(0, 200) ?? null : null,
        styles,
        children: [...node.children].slice(0, 30).map(c => walk(c, depth + 1)).filter(Boolean),
      };
    }
    return walk(el, 0);
  }, { selector, props: PROPS });
}

const browser = await chromium.launch({ headless: true });

for (const [label, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const ctx = await browser.newContext({
    viewport,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  });
  const page = await ctx.newPage();
  console.log(`[${label}] visiting`);
  await page.goto(URL_TARGET, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2000);

  for (const sel of ["button:has-text('Accept')", "button:has-text('Accept All')", "button:has-text('Agree')"]) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 400 })) { await b.click({ timeout: 1000 }).catch(()=>{}); break; } } catch {}
  }

  // Find Pricing heading then scroll into view, then screenshot
  const heading = page.locator("text=/pricing.*details/i").first();
  if (await heading.count() > 0) {
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    // Try to find the enclosing card
    const cardSel = await page.evaluate(() => {
      const h = [...document.querySelectorAll("h1,h2,h3,h4")].find(e => /pricing\s*&\s*details/i.test(e.textContent || ""));
      if (!h) return null;
      // walk up until we hit a dark-bg ancestor
      let cur = h;
      for (let i = 0; i < 8 && cur; i++) {
        const bg = getComputedStyle(cur).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && !/^rgba?\(255/.test(bg)) {
          // Found a non-white bg ancestor — most likely the card
          // Generate a unique-ish selector
          if (cur.id) return "#" + cur.id;
          const cls = cur.className?.toString().split(/\s+/).filter(Boolean).slice(0,3).join(".");
          if (cls) return cur.tagName.toLowerCase() + "." + cls;
          return null;
        }
        cur = cur.parentElement;
      }
      return null;
    });

    console.log(`[${label}] card selector:`, cardSel);

    if (cardSel) {
      const card = page.locator(cardSel).first();
      const box = await card.boundingBox();
      if (box) {
        await page.screenshot({
          path: join(ROOT, `docs/design-references/bark/pricing-${label}.png`),
          clip: {
            x: Math.max(0, box.x - 20),
            y: Math.max(0, box.y - 20),
            width: Math.min(viewport.width, box.width + 40),
            height: Math.min(box.height + 40, 1400),
          },
        });
        console.log(`[${label}] screenshot saved`);
      }

      if (label === "desktop") {
        const styles = await pick(page, cardSel);
        await mkdir(join(ROOT, "docs/research/bark"), { recursive: true });
        await writeFile(
          join(ROOT, "docs/research/bark/pricing-styles.json"),
          JSON.stringify(styles, null, 2)
        );

        const text = await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          return {
            headings: [...el.querySelectorAll("h1,h2,h3,h4")].map(h => ({ tag: h.tagName.toLowerCase(), text: h.textContent?.trim() })),
            lis: [...el.querySelectorAll("li")].map(li => li.textContent?.trim()).filter(Boolean),
            paragraphs: [...el.querySelectorAll("p")].map(p => p.textContent?.trim()).filter(Boolean),
            buttons: [...el.querySelectorAll("a,button")].map(b => ({ text: b.textContent?.trim(), href: b.getAttribute("href") })),
          };
        }, cardSel);
        await writeFile(
          join(ROOT, "docs/research/bark/pricing-text.json"),
          JSON.stringify(text, null, 2)
        );
      }
    }
  } else {
    console.log(`[${label}] no Pricing heading found`);
  }

  await ctx.close();
}

await browser.close();
console.log("done");
