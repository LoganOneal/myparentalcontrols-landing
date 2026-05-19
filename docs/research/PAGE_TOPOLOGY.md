# Cal AI — Page Topology

## Global layout (all pages)

- **`html`**: transparent
- **`body`**: `background: linear-gradient(rgb(255,255,255), rgb(255,255,240), rgb(240,248,255), rgb(255,255,240))` — 4-stop vertical gradient (white → ivory → alice-blue → ivory). `color: rgb(0,0,0)`. `overflow-x-hidden`.
- **Header**: sticky top-0, backdrop-blur-xl, bg-white/20, z-50
- **Footer**: bottom of every page

## Pages

### 1. `/` — Home
1. Header (sticky)
2. Hero (`<main>`): 2-column on lg, hero text left + phone screenshot right
   - "Loved by 5M users" social proof row (3 stacked avatars + text)
   - H1 "Meet Cal AI / Track your calories with just a picture"
   - Paragraph
   - App Store + Google Play badges
   - Right column: phone hero image
3. H2 "Used by your favorite fitness influencers 👀"
4. Influencer testimonial grid — 3 columns × 2 rows of video card thumbnails with quotes (middle column offset by -translate-y-20 on desktop)
5. "What does Cal AI include?" feature switcher
   - Phone preview image (large)
   - Vertical tab list with 4 features (Track Food / Search Database / Progress Tracking / Water+Exercise)
   - Tab buttons (dots) below image, tab content list on the right
6. H2 "Why choose Cal AI?" — 3-card feature grid (icon + heading + description)
7. Dark Mode banner section (white-ivory area) — 2 col: heading + paragraph left, dark phone preview right. "New feature" badge.
8. "Thousands of users talk about us" — dark bg `#1E1A24`, white text, testimonial cards in grid
9. Final CTA — "Over 100k 5-star ratings" with laurel SVGs, star row, rating chips (4.8/5 + 4.7/5), download badges, full-bleed gradient background image
10. Footer (logo + Download buttons + Legal links + Company links + copyright + social)

**Persistent overlay**: Download modal (only on click of a download CTA — fixed inset-0 backdrop-blur)

### 2. `/blog` — Blog index
- Header
- H1 "Our Blog"
- `<ul>` of blog post cards: each has H2 (post title) and date `<p>`. `grid gap-8 max-w-4xl mx-auto`
- Footer

### 3. `/blog/[slug]` — Blog post
- Header
- Article: title h1, date, prose content (rendered markdown — headings, paragraphs, lists, images)
- Footer

### 4. `/press` — Press contact form
- Header
- H1 "Press" centered
- Paragraph: "Get in touch with our press team for media inquiries, interviews, and press releases."
- Card containing form: Email Address*, Subject*, Message* (textarea), "Send Press Inquiry" black button
- Footer

### 5. `/manage-subscription`
- Header
- H2 "Manage Subscription" centered (smaller heading)
- Paragraph: "If you purchased your subscription on the web, please enter the email address you subscribed with in order to change your subscription."
- Email input + black "Send" button
- Footer

### 6. `/login`
- Header
- H1 "Welcome back" centered
- Subtitle: "Sign in to your Cal AI account"
- Card: "Continue with Google" (white button with G icon) + "Continue with Apple" (black button with Apple icon)
- Footer

### 7. `/privacy`, `/tos`, `/sweepstakes` — Legal documents
- Header
- H1 (page title)
- Prose content (long-form text, list, headings)
- Footer

## Interaction model

- **Header**: sticky with backdrop blur. No size-change on scroll detected.
- **Features tabs** (`What does Cal AI include?`): click-driven. Clicking a dot button or list item swaps the preview image and highlights the active feature. (Will verify in extraction.)
- **Download modal**: click-driven. Clicking a download CTA opens a fullscreen modal with QR + store links.
- **No scroll-snap detected** on body.
- **No Lenis/smooth-scroll library** detected.
- **No scroll-driven animations** on initial pass (verify per section).

## Z-index

- header `z-50`
- modal `z-50`
- final CTA `z-10` (above its background image)

## Breakpoints (Tailwind v3 defaults — confirmed by site source classes)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

`max-w-screen-xl` = 1280px is the primary content max-width.
