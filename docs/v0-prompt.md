# Koda Safety — iOS App Design Prompt

Paste this entire prompt into v0 or Lovable to generate the app from scratch.

---

## Prompt

Build a polished iOS app called **Koda Safety** — a parental control app that monitors children's gaming activity (in-game chats, voice calls, screen recordings) and alerts parents only when a real threat is detected (grooming, sextortion, bullying).

This should look like a **top-50 App Store app** — think Apple Fitness+ activity rings, Headspace's warmth, or Linear's clarity. NOT a plain utility app, NOT iOS Settings with grouped lists. This is a premium consumer product with branded color, data visualization, visual hierarchy, and generous spacing.

Use React with Tailwind. Mobile-first (390px viewport). Light theme only.

---

## Brand

- **Primary blue:** #2B66DA
- **Dark navy:** #0F172A  
- **Alert red:** #FF3B30
- **Safe green:** #34C759
- **Warning amber:** #FF9500
- **Background:** #F2F2F7
- **Cards:** #FFFFFF
- **Typography:** System SF Pro stack (-apple-system, BlinkMacSystemFont, sans-serif)

---

## App Structure

4-tab navigation at the bottom: Activity, Games, Alerts, Settings.

Build all 5 screens below as separate views. Include a bottom tab bar on each.

---

## Screen 1: Activity (Dashboard)

The home screen. A parent glances at this and immediately knows if their child is safe.

**Layout (top to bottom):**

1. **Header area** — Navy-to-blue subtle gradient background (very short, like 120px). Contains:
   - Child's monogram avatar ("L") in a circular gradient ring (warm pink-to-gold gradient border)
   - "Lily's Activity" as the title in white
   - A green pill badge: dot + "All Clear" (or red pill with alert count when threats exist)

2. **Stat bento grid** — 2x2 grid of cards, each card has:
   - A colored left accent bar (4px, rounded)
   - Large bold number (28pt): "2h 14m", "47", "3", "5"
   - Label below (13pt, gray): "Screen Time", "Messages Scanned", "Voice Calls", "Games Active"
   - A small trend indicator: "↓23%" in green or "↑5%" in amber
   - Cards have no shadow — white on #F2F2F7 provides separation

3. **Live Activity feed** — Section title "Recent" with a "See All" link. Then 3-4 rows:
   - Each row: colored icon square (10px radius, brand-colored) + app name + description + timestamp
   - Example: [🟥 Roblox] "47 chats monitored" — "2m ago"
   - Example: [⛏️ Minecraft] "Voice call ended" — "14m ago"  
   - Example: [💬 Discord] "8 channels active" — "1h ago"

---

## Screen 2: Connected Games

Shows what Koda monitors from inside the games themselves.

**Layout:**

1. **Header** — "Connected Games" title (large, bold). Below: "5 games · 72 chats today" subtitle. A blue pill "● Live Monitoring" on the right.

2. **Game cards** — Each game is a full-width card with generous padding (16px all sides). NOT a thin list row. Each card contains:
   - Left: Game icon in a colored rounded square (44x44, brand color background)
     - Roblox: red #E2231A
     - Minecraft: green #5BA63B  
     - Fortnite: blue #2A3F8F
     - Discord: purple #5865F2
     - League of Legends: dark #0A1428
   - Center: Game name (17pt semibold) + activity line (14pt gray, "47 chats today · 2 voice calls")
   - Right: Status chip
     - Normal: blue background chip "Active" with a small dot
     - Voice live: green chip "Live" with 3-4 tiny animated EQ bars
     - Flagged: red chip "1 Flag" with a pulsing dot
   - Flagged cards get a very subtle red-tinted background (#FFF5F5) and a 3px red left border

3. **Footer bar** — A full-width muted card: shield icon + "All conversations monitored in real time"

---

## Screen 3: Alerts

Where threats surface. The critical screen.

**Layout:**

1. **Header** — "Alerts" title with a red badge circle showing "2" next to it.

2. **Filter chips** — Horizontal row: "All", "Critical" (red dot), "Medium" (amber dot), "Resolved". Selected chip is filled dark, others are outlined/light.

3. **Alert cards** — Full-width, stacked vertically with 12px gap:

   **Critical alert:**
   - 3px red bar across the top of the card
   - Very subtle warm tint background (like #FFFBFB)
   - Row 1: Red filled circle icon (warning triangle) + "Suspicious Contact Detected" (bold) + "12m ago" (gray, trailing)
   - Row 2: Context line: "Discord DM · Unknown adult user 'xGamer99'"
   - Row 3: AI summary (14pt, gray): "Stranger asked child's age, then requested private contact on another platform."
   - Row 4: Two buttons side by side — Blue filled "View Evidence" + Gray outlined "Dismiss"

   **Medium alert:**
   - 3px amber bar across top
   - Amber icon (info circle)
   - "Inappropriate Language" + "1h ago"
   - "Profanity detected in Roblox party chat (3 instances)"
   - Single button: "Review"

   **Resolved alert:**
   - No colored bar
   - Green checkmark icon, everything in muted gray
   - "Voice call review — Resolved yesterday"
   - Collapsed to a single line, no buttons

---

## Screen 4: Evidence Detail

The "receipts" screen. Parent sees exactly what happened — captured recording, chat transcript, AI analysis.

**Navigation bar:** Back chevron + "Alerts" in blue. Title: "Evidence Review"

**Layout (scrollable):**

1. **Captured Recording** (hero element, takes up most of the width)
   - A dark card (rounded 12px, dark gray/black background)
   - Contains a 16:9 video thumbnail area showing Minecraft gameplay (use a placeholder dark image with block-like patterns or just a dark gradient for now)
   - Overlays on the video:
     - Top-left: Red "REC" pill (red background, white text, pulsing white dot)
     - Top-right: "0:47" duration in a dark pill
     - Center: Semi-transparent play button circle (white triangle inside)
   - Below the thumbnail (still inside the dark card): "Minecraft · Hypixel Server · Mar 15, 10:14 AM" in small light gray text

2. **Flagged Conversation**
   - Section header: "FLAGGED CONVERSATION" (13pt uppercase gray, iOS style)
   - White card containing chat bubbles styled like iMessage:
     - Incoming (stranger): Gray bubble (#E5E5EA), left-aligned, max-width 70%. Sender name "Stranger_77" above in small gray text.
     - Outgoing (child): Blue bubble (#007AFF), right-aligned, white text, max-width 70%.
     - Messages:
       1. Stranger_77 (gray bubble): "how old r u?"
       2. Lily (blue bubble): "11"
       3. Stranger_77 (gray bubble, with red ring border + small red ⚠ badge on corner): "cool, dm me on discord"
     - Below bubbles: "AI Confidence: 96%" in small muted text

3. **AI Analysis**
   - Section header: "AI ANALYSIS" (13pt uppercase gray)
   - White card with:
     - Top: A row with red filled circle + "Grooming Pattern Detected" (bold) + "High Severity" subtitle
     - Divider line (hairline)
     - Data rows (like iOS Settings detail rows): 
       - "Pattern" → "Age solicitation → Platform shift"
       - "Risk Level" → "High" (in red text)
       - "Action Taken" → "Recorded & parent notified"
       - "Timestamp" → "10:14 AM"
     - Each row has a hairline divider between, inset from the left

4. **Action buttons** (bottom of scroll)
   - Full-width blue filled button (50px tall, 12px radius): "Review Full Conversation"
   - Full-width white button with blue text: "Share with Co-Parent"

---

## Screen 5: Block Controls

One-tap power to block apps/games/sites across all the child's devices.

**Layout:**

1. **Header** — "Quick Blocks" title. Subtitle: "Changes apply instantly to all devices."

2. **Block cards** — Each item is a chunky card (not a thin row). 16px padding. Contains:
   - Left: App/category icon in a colored square
   - Center: Name (bold) + what gets blocked (gray subtitle)
   - Right: iOS toggle switch (green when ON, gray when OFF)
   - When ON: card gets a very subtle green tint background
   
   Items:
   - 🎮 "All Games" — "Roblox · Minecraft · Fortnite" — ON
   - 💬 "Discord" — "DMs · servers · voice" — OFF
   - 🎵 "TikTok" — "Feed and DMs" — ON
   - 🛡️ "Adult Sites" — "Network-level filter" — ON
   - 🎬 "Netflix" — "Streaming after bedtime" — OFF

3. **Schedules section** — Section header "ACTIVE SCHEDULES". Two rows:
   - Clock icon + "School Hours" + "Mon–Fri, 8 AM – 3 PM" + green "Active" chip
   - Moon icon + "Bedtime" + "Every night, 9 PM – 7 AM" + green "Active" chip

---

## Critical Design Rules

**DO:**
- Make cards substantial (16px+ padding, clear internal spacing)
- Use color meaningfully (blue = safe, green = active, red = danger, amber = warning)
- Create visual focal points on each screen (hero stat, media card, alert card)
- Use generous white space between sections (20-24px gaps)
- Make the dashboard header feel branded (gradient, avatar ring, status pill)
- Make alert cards communicate severity through color tinting and accent bars
- Make the evidence video card feel dark and cinematic
- Use real iMessage-style bubbles for the chat transcript

**DON'T:**
- Don't use box-shadows on cards (white on #F2F2F7 provides separation)
- Don't make it look like iOS Settings (no disclosure chevrons on everything, no thin gray rows)
- Don't use generic placeholder text ("Lorem ipsum")
- Don't add gradients to card backgrounds (only the dashboard header gets a subtle gradient)
- Don't make all cards the same size/weight — vary visual density
- Don't forget the bottom tab bar on every screen
- Don't use outlined/stroke icons everywhere — use filled colored circles for status indicators
