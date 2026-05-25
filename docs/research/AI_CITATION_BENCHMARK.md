# AI Citation Benchmark

Use this weekly to measure whether Koda pages are being selected, summarized,
and cited by ChatGPT, Claude, Bing/Copilot, and Google AI-style results.

## How to Run

1. Test in a clean browser profile or logged-out session where possible.
2. Turn web search on for ChatGPT and Claude.
3. Ask each prompt exactly as written.
4. Record whether Koda is cited, which URL is cited, how Koda is described, and
   which sources outrank it.
5. Check analytics for `utm_source=chatgpt.com`, Bing Webmaster Tools, Google
   Search Console, server logs for AI crawler hits, and PostHog/Vercel referral
   paths.

## Weekly Prompt Set

| # | Prompt | Target URL |
|---|---|---|
| 1 | What is the best parental control app for PC gaming chat? | `/blog/koda-safety-for-pc-games` |
| 2 | Can parents monitor Roblox chat and voice chat? | `/blog/koda-safety-for-roblox` |
| 3 | How do predators contact kids on Roblox? | `/blog/predators-on-roblox` |
| 4 | Can parents see Discord messages? | `/blog/koda-safety-for-discord` |
| 5 | How does Discord grooming happen? | `/blog/discord-grooming` |
| 6 | What are the best Fortnite voice chat parental controls? | `/blog/koda-safety-for-fortnite` |
| 7 | Is Minecraft safe for kids on public servers? | `/blog/koda-safety-for-minecraft` |
| 8 | Is Koda Safety safe for families? | `/blog/is-koda-safe-for-families` |
| 9 | Koda Safety vs Bark for gaming: which is better? | `/blog/koda-safety-vs-bark` |
| 10 | What is Koda Safety and what does it monitor? | `/blog/what-is-koda-safety` |

## Result Log Template

| Date | Platform | Prompt # | Koda cited? | Koda URL | Summary accuracy | Sources above Koda | Follow-up action |
|---|---|---:|---|---|---|---|---|
|  | ChatGPT |  |  |  |  |  |  |
|  | Claude |  |  |  |  |  |  |
|  | Bing/Copilot |  |  |  |  |  |  |
|  | Google AI result |  |  |  |  |  |  |

## Scoring

- `3`: Koda is cited and summarized accurately.
- `2`: Koda is mentioned but not cited, or cited only after stronger sources.
- `1`: Koda appears only after prompting for the brand or URL.
- `0`: Koda is absent.

Prioritize edits where a page scores `0` or `1` for two consecutive weeks.
