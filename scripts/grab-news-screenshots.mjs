#!/usr/bin/env node
/**
 * Screenshot the header/hero of a curated set of high-impact news articles
 * covering lawsuits against Roblox / Discord and online child-safety
 * regulatory action.
 *
 * Usage:
 *   npm i -D playwright
 *   npx playwright install chromium
 *   node scripts/grab-news-screenshots.mjs
 *
 * Output:
 *   public/images/news/<slug>.png  (one per article)
 *
 * Each screenshot is a viewport-width capture sized to fit the news-card
 * aspect ratio (373:280 ≈ 1.33:1). Edit `ARTICLES` to add/remove sources.
 *
 * Note: news sites often gate content with consent banners, paywalls, and
 * lazy-loaded images. The script attempts to dismiss common consent dialogs,
 * pauses for fonts/images, and falls back gracefully — but if a particular
 * site refuses to render, swap the URL or capture manually.
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "images", "news");

const ARTICLES = [
  {
    slug: "cbs-oklahoma",
    url: "https://www.cbsnews.com/news/oklahoma-becomes-latest-state-to-sue-roblox-over-child-safety-concerns/",
  },
  {
    slug: "ap-nevada",
    url: "https://apnews.com/article/roblox-nevada-settlement-28b3d7d7a483dc28462a7504b67c9bbc",
  },
  {
    slug: "bbc-texas",
    url: "https://www.bbc.co.uk/news/articles/cy0kd4kk0kqo",
  },
  {
    slug: "npr-facial-scanning",
    url: "https://www.npr.org/2025/11/21/nx-s1-5614161/roblox-bets-on-facial-scanning-to-keep-its-youngest-users-safe",
  },
  {
    slug: "nbc-nebraska",
    url: "https://www.nbcnews.com/tech/tech-news/roblox-lawsuit-nebraska-attorney-general-what-to-know-rcna261733",
  },
  {
    slug: "cnn-louisiana",
    url: "https://www.cnn.com/2025/08/15/us/louisiana-roblox-lawsuit-child-protection-hnk",
  },
];

const VIEWPORT = { width: 1200, height: 900 };
const CARD_RATIO = 373 / 280; // matches NewsCard aspect-[373/280]
const CLIP_HEIGHT = Math.round(VIEWPORT.width / CARD_RATIO); // ~ 900

/** Common consent-banner dismissers. */
const CONSENT_SELECTORS = [
  "button:has-text('Accept all')",
  "button:has-text('Accept All')",
  "button:has-text('Accept')",
  "button:has-text('I accept')",
  "button:has-text('Agree')",
  "button:has-text('I Agree')",
  "button:has-text('Got it')",
  "button:has-text('Continue')",
  "[id*='accept'][role='button']",
  "[id*='consent'] button",
  "[data-testid*='accept'] button",
  "[aria-label*='Accept']",
  "[aria-label*='accept']",
];

/**
 * Try repeatedly to dismiss a consent dialog. Some sites (CNN, others) load
 * the consent UI in an iframe or with a delay — a one-shot attempt misses it.
 */
async function dismissConsent(page, attempts = 6) {
  for (let i = 0; i < attempts; i++) {
    let clicked = false;
    for (const sel of CONSENT_SELECTORS) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 300 })) {
          await btn.click({ timeout: 1500 }).catch(() => {});
          await page.waitForTimeout(400);
          clicked = true;
          break;
        }
      } catch {
        /* try next selector */
      }
    }
    // Also try inside any iframes (many CMPs run iframed)
    for (const frame of page.frames()) {
      for (const sel of CONSENT_SELECTORS) {
        try {
          const btn = frame.locator(sel).first();
          if (await btn.isVisible({ timeout: 200 })) {
            await btn.click({ timeout: 1500 }).catch(() => {});
            await page.waitForTimeout(400);
            clicked = true;
            break;
          }
        } catch {
          /* try next */
        }
      }
      if (clicked) break;
    }
    if (!clicked) await page.waitForTimeout(700);
  }
}

/** Brute-force removal of lingering CMP / consent overlays. */
async function nukeOverlays(page) {
  await page.evaluate(() => {
    const patterns = [
      "onetrust", "consent", "cookie", "gdpr", "ccpa", "cmp-",
      "didomi", "trustarc", "qc-cmp", "privacy-banner", "modal",
    ];
    document.querySelectorAll("*").forEach((el) => {
      const id = (el.id || "").toLowerCase();
      const cls = (el.className && el.className.toString
        ? el.className.toString()
        : ""
      ).toLowerCase();
      if (patterns.some((p) => id.includes(p) || cls.includes(p))) {
        const style = getComputedStyle(el);
        if (style.position === "fixed" || style.position === "sticky") {
          el.remove();
        }
      }
    });
    // remove the body scroll-lock most CMPs apply
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
  });
}

async function captureArticle(browser, { slug, url }) {
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  });
  const page = await ctx.newPage();
  try {
    console.log(`[${slug}] visiting ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1500);
    await dismissConsent(page);
    // settle: wait for hero/headline-style element if available, fall back to timeout
    await page
      .waitForSelector("h1, article header, [class*='hero'], [class*='lede']", {
        timeout: 5000,
      })
      .catch(() => {});
    await page.waitForTimeout(1500);
    // Last-resort: if a fixed overlay is still up, strip it out via DOM
    await nukeOverlays(page).catch(() => {});
    await page.waitForTimeout(300);
    const outPath = join(OUT_DIR, `${slug}.png`);
    await page.screenshot({
      path: outPath,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: CLIP_HEIGHT },
    });
    console.log(`[${slug}] saved → ${outPath}`);
  } catch (e) {
    console.error(`[${slug}] FAILED: ${e.message}`);
  } finally {
    await ctx.close();
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const a of ARTICLES) {
      await captureArticle(browser, a);
    }
  } finally {
    await browser.close();
  }
  console.log("\nDone. Files are in public/images/news/");
  console.log(
    "Next: open src/components/home/NewsGrid.tsx and set the matching `screenshot:` field on each card."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
