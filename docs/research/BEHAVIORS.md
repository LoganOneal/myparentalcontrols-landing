# Cal AI — Behaviors

## Scroll behaviors
- No Lenis / Locomotive scroll detected (only native browser scroll)
- No scroll-snap on body or main
- Header is `sticky top-0` with `backdrop-blur-xl bg-white/20`. It does NOT change size or background on scroll — it's permanently translucent with blur.
- No IntersectionObserver-driven tab switching or sidebar highlighting

## Click behaviors
- Feature tabs in "What does Cal AI include?" — clicking a dot button or a list item switches the visible feature image and highlights the active entry. State managed via JS (data-astro-cid scoped script).
- Download buttons open a modal (`modal-card`) with download instructions / QR.
- All internal links are standard page nav (`<a href>`).

## Hover behaviors
- Nav links: standard underline-on-hover (`hover:underline`)
- Blog post cards: `hover:underline` on entire `<li>`
- Download badge links: standard image links, no hover transform
- Influencer cards (links to Instagram reels): wrap an image, no special hover state observed

## Animations / Transitions
- Modal: fade in with backdrop blur (`backdrop-blur-sm`)
- No entrance animations on scroll
- No Lottie / canvas animations
- Phone images are static PNG/WEBP

## Fonts (CRITICAL FINDING)
- Page declares `font-family: Inter, "Bricolage Grotesque Variable", "Inter Variable", Inter, ...`
- BUT only `bricolage-grotesque-latin-wght-normal.SiLHXWCe.woff2` is actually loaded
- Inter Variable is registered but FAILS to load (status: error)
- **Actual rendered font = Bricolage Grotesque Variable** (variable font, weights 200–800)
- Clone should use Bricolage Grotesque from Google Fonts

## Colors (from inspection)
- Body background: `linear-gradient(rgb(255,255,255), rgb(255,255,240), rgb(240,248,255), rgb(255,255,240))`
- Default text: `rgb(0, 0, 0)`
- Dark section bg: `#1E1A24` (testimonials block)
- Phone-mockup secondary text: `#262626`
- Card bg (download modal): `bg-gray-100`
- White cards / form backgrounds on light pages: pure white with subtle shadow

## Responsive notes (1440 vs 390)
- Hero: 2-col on `lg` (1024+), stacked on smaller
- Influencer grid: 3-col on `lg`, single column stack on mobile, middle column offset by `-translate-y-20` on `md+`
- "What does Cal AI include?": 2-col on `lg`, stacked on mobile
- "Why choose Cal AI?": 3-col on `lg`, 2-col on `md`, 1-col on mobile
- Dark mode banner: 2-col on `lg`, stacked on mobile
- Testimonials dark section: 3 col on lg, 2 col on md, 1 col on sm
- Final CTA: maintains centered layout, badges stack on mobile
- Footer: 3-col on `md`, stacked on mobile
