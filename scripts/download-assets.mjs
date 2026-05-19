#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const ASSETS = [
  // logos / favicons
  ['https://calai.app/logo.png', 'seo/logo.png'],
  ['https://www.calai.app/opengraph.jpg', 'seo/opengraph.jpg'],
  ['https://calai.app/_astro/calai_logo.Cuu6jy3D.svg', 'images/calai_logo.svg'],

  // store badges
  ['https://calai.app/googleplay.png', 'images/googleplay.png'],

  // hero
  ['https://calai.app/hero-image.webp', 'images/hero-image.webp'],
  ['https://calai.app/used-by-1.png', 'images/used-by-1.png'],
  ['https://calai.app/used-by-2.png', 'images/used-by-2.png'],
  ['https://calai.app/used-by-3.png', 'images/used-by-3.png'],

  // influencer testimonials
  ['https://calai.app/humans/jeremiah.jpg', 'images/humans/jeremiah.jpg'],
  ['https://calai.app/humans/jacked1.png', 'images/humans/jacked1.png'],
  ['https://calai.app/humans/jacked2.png', 'images/humans/jacked2.png'],
  ['https://calai.app/humans/jacked3.png', 'images/humans/jacked3.png'],
  ['https://calai.app/humans/jacked4.png', 'images/humans/jacked4.png'],
  ['https://calai.app/humans/dawson.png', 'images/humans/dawson.png'],

  // features section
  ['https://calai.app/analyzed.png', 'images/analyzed.png'],
  ['https://calai.app/search.png', 'images/search.png'],
  ['https://calai.app/progress.png', 'images/progress.png'],
  ['https://calai.app/water.png', 'images/water.png'],

  // dark mode banner
  ['https://calai.app/dark-iphone-preview.png', 'images/dark-iphone-preview.png'],

  // review chips
  ['https://calai.app/review1.jpeg', 'images/review1.jpeg'],
  ['https://calai.app/review2.jpg', 'images/review2.jpg'],
  ['https://calai.app/review3.jpeg', 'images/review3.jpeg'],
  ['https://calai.app/review4.jpeg', 'images/review4.jpeg'],

  // final CTA
  ['https://calai.app/dark-gradient.png', 'images/dark-gradient.png'],
  ['https://calai.app/wreath.svg', 'images/wreath.svg'],

  // fonts
  ['https://calai.app/_astro/bricolage-grotesque-latin-wght-normal.SiLHXWCe.woff2', 'fonts/bricolage-grotesque-latin-wght-normal.woff2'],
];

async function download(url, relativePath) {
  const fullPath = join(PUBLIC, relativePath);
  await mkdir(dirname(fullPath), { recursive: true });
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) {
      console.error(`[FAIL ${res.status}] ${url}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(fullPath, buf);
    console.log(`[OK ${buf.length}b] ${relativePath}`);
    return true;
  } catch (e) {
    console.error(`[ERR] ${url}: ${e.message}`);
    return false;
  }
}

const batchSize = 4;
async function run() {
  for (let i = 0; i < ASSETS.length; i += batchSize) {
    const batch = ASSETS.slice(i, i + batchSize);
    await Promise.all(batch.map(([url, p]) => download(url, p)));
  }
}
run().catch(e => { console.error(e); process.exit(1); });
