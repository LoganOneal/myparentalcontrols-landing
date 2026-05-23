/**
 * Platform catalog — every app/game/site Koda monitors,
 * with the risk profile and parent-facing guidance for each.
 *
 * Data shape is intentionally flat so the detail page template can render
 * any platform with the same component without per-platform branching.
 */

export type RiskLevel = "low" | "medium" | "high";

export type RiskRow = {
  /** Category label shown in the risk-summary grid. */
  label: string;
  level: RiskLevel;
};

export type RiskCallout = {
  title: string;
  body: string;
};

export type AgeRating = {
  /** Apple App Store age rating, e.g. "12+". */
  apple?: string;
  /** Google Play age rating, e.g. "Teen". */
  google?: string;
  /** Common Sense Media recommended age, e.g. "13+". */
  common?: string;
};

export type LogoSpec =
  | {
      /** Simple Icons slug — rendered white-on-brand-color chip. */
      kind: "simple-icons";
      slug: string;
    }
  | {
      /** Custom inline SVG markup (paths only, single color, viewBox 0 0 24 24). */
      kind: "custom";
      path: string;
    }
  | {
      /** Letter monogram fallback for apps without a clean brand mark. */
      kind: "monogram";
      letters: string;
    };

export type Platform = {
  slug: string;
  name: string;
  /** One-line description used on the listing page tile. */
  blurb: string;
  category: PlatformCategory;
  /** Brand color used as chip background. */
  brandColor: string;
  /** Whether the brand color is dark enough that white logo reads well. */
  logoOnDark?: boolean;
  logo: LogoSpec;
  age: AgeRating;
  risks: RiskRow[];
  whatIs: string;
  howItWorks: string;
  parentsNeedToKnow: string[];
  topConcerns: RiskCallout[];
  parentalControls: string;
  mpcCoverage: string;
  /** Bottom-line recommendation. */
  recommendation: string;
  /** SEO: FAQ entries rendered on the page and included as JSON-LD. */
  faqs?: { question: string; answer: string }[];
  /** SEO: Step-by-step parental controls setup guide. */
  parentalControlsSteps?: string[];
  /** SEO: Related blog post slugs for cross-linking. */
  relatedBlogSlugs?: string[];
};

export type PlatformCategory = "Games" | "Chat & social" | "Video & streaming";

const STANDARD_RISKS: RiskRow[] = [
  { label: "Predator contact", level: "high" },
  { label: "Sex / nudity", level: "high" },
  { label: "Privacy", level: "high" },
  { label: "Language", level: "high" },
  { label: "Violence", level: "high" },
];

/* eslint-disable max-len */
export const PLATFORMS: Platform[] = [
  {
    slug: "among-us",
    name: "Among Us",
    blurb: "Multiplayer party game with public lobbies and open text chat.",
    category: "Games",
    brandColor: "#C51111",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "A" },
    age: { apple: "9+", google: "Everyone 10+", common: "10+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Among Us is a free social-deduction game where players work together on a spaceship or station while one or more hidden \"impostors\" try to sabotage and kill them. Lobbies are public by default and matchmaking puts your child into rooms with strangers of all ages.",
    howItWorks:
      "Players join or host a lobby — public, private, or by code. Communication happens in two ways: an in-game text chat during \"meetings,\" and free-text usernames that players set themselves. There is no voice chat built in, but many kids open Discord on the side, which is where the actual risk lives.",
    parentsNeedToKnow: [
      "Default matchmaking drops kids into rooms with anonymous strangers.",
      "Chat is unmoderated and filter-bypassing slang is common.",
      "Players routinely move conversations to Discord or Snapchat mid-game.",
      "Usernames can be anything — predators use sexual or grooming-style handles.",
    ],
    topConcerns: [
      {
        title: "Unmoderated stranger chat",
        body: "Meeting chat is real-time text between random players. Filters are minimal and bypassed constantly with l33t-speak.",
      },
      {
        title: "Pipeline to Discord",
        body: "Friendly players often invite kids to a Discord server \"to play together.\" That's where most of the real risk begins.",
      },
      {
        title: "Sexualized usernames and lobbies",
        body: "Players name rooms and themselves anything they want. Sexually suggestive or grooming-style names appear regularly.",
      },
    ],
    parentalControls:
      "Among Us has no built-in parental controls beyond a global chat censor (which is easily defeated). The only real protection is restricting play to private lobbies with known friends.",
    mpcCoverage:
      "Koda watches Among Us chat in real time and alerts you when a stranger steers your child toward another platform, sends sexual content, or uses grooming-style language.",
    recommendation:
      "Middle school and up, and only in private lobbies with known friends. Assume any public lobby will route to Discord.",
  },
  {
    slug: "discord",
    name: "Discord",
    blurb: "Voice + text + video chat across servers and DMs — every gamer is here.",
    category: "Chat & social",
    brandColor: "#5865F2",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "discord" },
    age: { apple: "17+", google: "Mature", common: "13+" },
    risks: STANDARD_RISKS,
    whatIs:
      "Discord is a free voice, video, and text chat platform organized around \"servers\" (group chats) and 1:1 DMs. It started as a gaming tool and is now where almost every online community lives.",
    howItWorks:
      "Create an account, join servers via invite link, DM anyone whose user ID you have. Servers can be public or private, with text channels, voice channels, and screen-sharing. Friend requests can come from anyone who knows your username.",
    parentsNeedToKnow: [
      "Default privacy settings allow DMs from server members.",
      "NSFW channels are common on public servers; the gating is just a checkbox.",
      "Voice channels and DMs leave little forensic trail for parents.",
      "Grooming routinely starts in a public gaming server and moves to DMs.",
    ],
    topConcerns: [
      {
        title: "Predator contact and grooming",
        body: "Discord has been at the center of dozens of documented child-grooming cases, including extensive NBC reporting on platform-wide patterns.",
      },
      {
        title: "Pornographic content",
        body: "NSFW servers and channels are widespread. Age gating is a single self-attested checkbox.",
      },
      {
        title: "Disappearing voice chats",
        body: "Voice channels and DM voice calls leave almost no record. Most parent monitoring tools see nothing here.",
      },
    ],
    parentalControls:
      "Discord's Family Center (2023) shows parents a high-level view: who their teen messages and who they friended, but not content. \"Teen by Default\" settings tightened DM filters in 2026.",
    mpcCoverage:
      "Koda watches Discord DMs, server chats, and screen-shared content in real time on your child's PC. You get alerts the moment grooming language, sexual content, or doxxing attempts appear — not a weekly summary.",
    recommendation:
      "High school and up. Even then, monitor DMs and disable server-member DMs by default.",
    faqs: [
      { question: "Is Discord safe for kids?", answer: "Discord is rated 17+ on the App Store for a reason. It allows direct messaging with strangers, has minimal age verification, and hosts widespread NSFW content behind a single checkbox. With proper settings — DMs restricted to friends only, explicit content filter enabled, and active parental monitoring — Discord can be used more safely by teens." },
      { question: "What are Discord parental controls?", answer: "Discord's built-in options are limited. Family Center gives parents a high-level view of who their teen messages and which servers they join — but not message content. Parents should manually disable 'Allow direct messages from server members' and enable the explicit content filter under Privacy & Safety." },
      { question: "How do predators groom children on Discord?", answer: "Predators join gaming servers that children use, build trust in public channels, then send friend requests and move the conversation to DMs or private voice calls. Voice channels are especially dangerous because they leave no text record for moderation." },
      { question: "How does Koda Safety monitor Discord?", answer: "Koda Safety monitors all Discord activity on your child's PC in real time — DMs, server text channels, and voice channels. It transcribes voice conversations and uses AI to detect grooming patterns, sexual content, threats, and attempts to move your child off-platform." },
    ],
    parentalControlsSteps: [
      "Open Discord Settings > Privacy & Safety.",
      "Set 'Safe Direct Messaging' to 'Keep me safe'.",
      "Disable 'Allow direct messages from server members'.",
      "Set 'Who can add you as a friend' to 'Friends of Friends' only.",
      "Enable 'Explicit Image & Video Filter'.",
      "Set up Discord Family Center by linking your account to your child's.",
      "Install Koda Safety for content-level monitoring of DMs, servers, and voice channels.",
    ],
    relatedBlogSlugs: ["koda-safety-for-discord", "discord-grooming"],
  },
  {
    slug: "fortnite",
    name: "Fortnite",
    blurb: "Battle-royale shooter — voice/text chat with strangers in every match.",
    category: "Games",
    brandColor: "#2A3F8F",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "fortnite" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
      { label: "Spending / loot", level: "high" },
    ],
    whatIs:
      "Fortnite is Epic's free-to-play battle royale where 100 players land on an island and fight to be last standing. Free-form modes (Creative, Party Royale, UEFN) extend it into a metaverse-style platform.",
    howItWorks:
      "Drop into a match, build, fight. Voice chat is on by default in squads; text chat is in lobbies. V-Bucks (premium currency) drive constant cosmetic purchases. UEFN means user-created maps with their own chat rules.",
    parentsNeedToKnow: [
      "Squad voice chat with strangers is on by default.",
      "Cosmetics and Battle Passes are engineered to drive ongoing spending.",
      "UEFN custom maps host their own chat and discord-invite flows.",
      "Cross-platform play means console kids hear PC players' voice chat.",
    ],
    topConcerns: [
      {
        title: "Voice chat with strangers",
        body: "Random squad matchmaking puts kids on voice with anyone. Predator contact via voice leaves no chat record.",
      },
      {
        title: "Predator pipeline to Discord",
        body: "Friendly players regularly invite kids to off-platform chat after good matches.",
      },
      {
        title: "Engineered spending",
        body: "Limited-time cosmetics, FOMO drops, and Battle Pass mechanics drive consistent V-Bucks purchases.",
      },
    ],
    parentalControls:
      "Epic Cabined Accounts (under-13) restrict chat to friends, lock spending, and require parent-email approval. Older teens can switch to full accounts via parent consent.",
    mpcCoverage:
      "Koda monitors Fortnite text chat and squad voice chat on your child's PC — alerts you the second a stranger pushes the conversation toward Discord, sexual content, or grooming.",
    recommendation:
      "Middle school and up with Cabined Account, voice chat off, and friends-only matchmaking.",
    faqs: [
      { question: "Is Fortnite safe for kids?", answer: "Fortnite can be age-appropriate for teens with proper settings, but carries real risks for younger children. The biggest concern is not the cartoon violence — it is the live voice chat with strangers. Default squad matchmaking puts your child on voice with random players of all ages. With Epic's Cabined Account and voice chat restricted to friends only, the risk drops significantly." },
      { question: "What are Fortnite parental controls?", answer: "Epic Games offers Cabined Accounts for under-13 players: chat restricted to friends, spending locked, and parent email required for changes. For older teens, parents can disable voice chat, restrict friend requests, hide online status, and set spending limits via Epic account settings." },
      { question: "How do I turn off Fortnite voice chat?", answer: "In Fortnite, go to Settings > Audio > Voice Chat and set it to Off, or restrict it to Party/Friends only. For Cabined Accounts (under 13), voice chat with non-friends is disabled by default." },
      { question: "Can predators contact my child through Fortnite?", answer: "Yes. Default squad voice chat puts your child on an open voice call with random players. Predators use this to build rapport during matches, then invite children to Discord for private conversations." },
      { question: "How does Koda Safety monitor Fortnite?", answer: "Koda monitors both Fortnite text chat and voice chat on your child's PC. It transcribes voice conversations in real time and uses AI to detect grooming language, bullying, threats, and attempts to move your child to other platforms." },
    ],
    parentalControlsSteps: [
      "Log in to your child's Epic Games account at epicgames.com.",
      "Navigate to Account > Parental Controls.",
      "For under-13: Set up a Cabined Account which restricts chat and spending by default.",
      "Set Voice Chat to 'Friends Only' or 'Off' under Audio settings in-game.",
      "Disable 'Auto-join Voice Chat'.",
      "Set 'Allow Friend Requests' to 'Off' or review requests together.",
      "Enable spending limits or require parent approval for V-Bucks purchases.",
      "Install Koda Safety on the gaming PC for voice and text monitoring.",
    ],
    relatedBlogSlugs: ["koda-safety-for-fortnite"],
  },
  {
    slug: "minecraft",
    name: "Minecraft",
    blurb: "Block-building sandbox with multiplayer servers and Realms chat.",
    category: "Games",
    brandColor: "#5BA63B",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "minecraft" },
    age: { apple: "9+", google: "Everyone 10+", common: "8+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Minecraft is Mojang/Microsoft's block-building game. Solo creative is wholesome — but public servers and Realms are where most kids actually play, and that's where the risk lives.",
    howItWorks:
      "Single-player creative, local LAN, public servers (Hypixel, Hive, etc.), or paid Realms. Chat is in-game text; many servers also push players to Discord.",
    parentsNeedToKnow: [
      "Public servers are unsupervised stranger chat at scale.",
      "Server admins often direct players to off-game Discord servers.",
      "Mods and resource packs can introduce inappropriate content.",
      "Bedrock vs Java edition behave differently — chat filters live in different places.",
    ],
    topConcerns: [
      {
        title: "Public-server stranger chat",
        body: "Top servers have tens of thousands of concurrent users. Chat moderation is best-effort, and predators target younger players actively.",
      },
      {
        title: "Discord pipeline",
        body: "After a few games together, a friendly player invites your child to \"our Discord\" — where the protections of the in-game chat are gone.",
      },
      {
        title: "Inappropriate mods",
        body: "User-made mods and texture packs can add sexual content, gore, or unauthorized chat hooks.",
      },
    ],
    parentalControls:
      "Microsoft Family Safety controls Minecraft chat, multiplayer, and Realms membership at the Xbox-account level. Java needs server-by-server admin checks.",
    mpcCoverage:
      "Koda watches Minecraft server chat, Realms messaging, and any Discord-invite links pushed during play. Alerts the second a stranger starts grooming or routing your child off-platform.",
    recommendation:
      "Elementary and up for single-player or whitelist servers. Public servers — middle school and up with monitoring.",
    faqs: [
      { question: "Is Minecraft safe for kids?", answer: "Minecraft in single-player or private worlds with known friends is one of the safest gaming options. The risk increases significantly with public multiplayer servers, where kids chat with strangers, encounter inappropriate mods, and get invited to Discord servers. With Microsoft Family Safety settings and Koda Safety monitoring, multiplayer Minecraft can be managed safely." },
      { question: "What are Minecraft parental controls?", answer: "Minecraft parental controls are managed through Microsoft Family Safety at the Xbox account level. Parents can restrict multiplayer to friends only, disable chat, control Realms membership, and set play time limits. Java Edition has fewer built-in controls — parents need to manage server access manually." },
      { question: "Are there predators on Minecraft?", answer: "Yes. Public Minecraft servers with thousands of concurrent players are known targets for predators. The pattern: a friendly older player helps a child in-game, builds trust, then invites them to a private Discord server where there is no moderation." },
      { question: "How does Koda Safety monitor Minecraft?", answer: "Koda monitors Minecraft server chat and Realms messaging in real time on your child's PC. It flags grooming language, bullying, sexual content, and attempts to move your child to Discord or other off-platform channels." },
    ],
    parentalControlsSteps: [
      "Sign in to Microsoft Family Safety at family.microsoft.com.",
      "Add your child's Xbox/Microsoft account to your family group.",
      "Under Content Restrictions, set multiplayer to 'Friends only' or 'Blocked.'",
      "Disable 'Communication with other players' or restrict to Friends only.",
      "For Bedrock Edition: check in-game Settings > Profile > Privacy settings.",
      "For Java Edition: prefer whitelisted servers and review the server list together.",
      "Install Koda Safety on the gaming PC for real-time chat monitoring.",
    ],
    relatedBlogSlugs: ["koda-safety-for-minecraft"],
  },
  {
    slug: "roblox",
    name: "Roblox",
    blurb: "Massive UGC game platform — millions of mini-games, all with chat.",
    category: "Games",
    brandColor: "#E2231A",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "roblox" },
    age: { apple: "12+", google: "Everyone 10+", common: "10+" },
    risks: STANDARD_RISKS,
    whatIs:
      "Roblox is a platform of millions of user-made games. Avatars, in-game currency (Robux), social hangouts, and a built-in chat system.",
    howItWorks:
      "Create a Roblox account, browse experiences, play. Most games include text chat; many include voice chat. Friend requests are open by default.",
    parentsNeedToKnow: [
      "User-generated games include \"condo\" and sex-themed games that slip moderation regularly.",
      "Robux scams (\"free Robux for your password\") are constant.",
      "Voice chat is rolling out broadly; age verification is weak.",
      "Direct messaging between users is enabled by default.",
    ],
    topConcerns: [
      {
        title: "Sexual experiences (\"condo games\")",
        body: "Hidden adult Roblox experiences with sexual avatars and behavior surface continuously despite moderation.",
      },
      {
        title: "Grooming via friend chat",
        body: "Roblox has been at the center of multiple high-profile child-grooming cases — predators love the platform's age demographic.",
      },
      {
        title: "Scams and account theft",
        body: "Robux phishing is an everyday occurrence in chat and via fake \"generator\" sites.",
      },
    ],
    parentalControls:
      "Roblox Account Restrictions lock chat, age-gate experiences, require a parent PIN for settings, and let parents see screen time. Voice chat requires age verification.",
    mpcCoverage:
      "Koda watches Roblox chat in real time, flags sexual content, grooming language, and phishing scams, and alerts you when your child visits experiences flagged as condo games.",
    recommendation:
      "Elementary kids on Account Restriction mode with chat off; middle school+ with chat enabled and active monitoring.",
    faqs: [
      { question: "Is Roblox safe for kids?", answer: "Roblox can be safe with proper settings, but it carries real risks. The platform has over 70 million daily users, mostly children, and features user-generated games with text and voice chat. Without Account Restrictions enabled, children can chat with strangers, encounter sexually-themed 'condo' games, and receive friend requests from anyone. With strict parental controls, monitored chat, and tools like Koda Safety, Roblox can be used more safely." },
      { question: "What are Roblox parental controls?", answer: "Roblox offers Account Restrictions (locks chat, restricts experiences to curated list), a parent PIN (prevents settings changes), screen time limits, experience age ratings, and optional voice chat (requires age verification). Parents can also control who can message their child and who can follow/friend them." },
      { question: "How do predators use Roblox to target children?", answer: "Predators join popular Roblox games, identify children through chat behavior, build trust with compliments and virtual gifts (Robux), then move the conversation to private servers or Discord where there is no moderation. The grooming process can take days or weeks before dangerous requests are made." },
      { question: "What are Roblox condo games?", answer: "Condo games are user-created Roblox experiences with sexual content — explicit avatars, simulated sexual acts, and adult themes. They violate Roblox's rules but re-appear constantly under new names. They are often shared via Discord links or word of mouth." },
      { question: "How does Koda Safety monitor Roblox?", answer: "Koda Safety monitors Roblox text chat and voice conversations in real time. It uses AI trained on gaming-specific threats to detect grooming language, sexual content, bullying, phishing attempts, and attempts to move your child off-platform. Parents receive an immediate alert with the full conversation context." },
    ],
    parentalControlsSteps: [
      "Log in to your child's Roblox account and go to Settings > Security.",
      "Enable Account Restrictions to limit chat and filter experiences.",
      "Set a parent PIN under Settings > Security > Account PIN.",
      "Go to Settings > Privacy and restrict 'Who can message me' to Friends or No one.",
      "Set 'Who can invite me to private servers' to No one or Friends.",
      "Review experience age ratings under Settings > Parental Controls.",
      "Install Koda Safety on the gaming device for conversation-level monitoring.",
    ],
    relatedBlogSlugs: ["koda-safety-for-roblox", "predators-on-roblox"],
  },
  {
    slug: "steam",
    name: "Steam",
    blurb: "Valve's PC gaming store with chat, community, and mature catalog.",
    category: "Games",
    brandColor: "#1B2838",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "steam" },
    age: { apple: "—", google: "Mature 17+", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
      { label: "Spending", level: "high" },
    ],
    whatIs:
      "Steam is Valve's PC gaming store and social platform. Friends list, voice chat, group chats, community pages, and a catalog including AO-rated and adult titles.",
    howItWorks:
      "Account-based, with library, wishlist, friends, chat (text and voice), groups, and community forums. Mature content (sexual games included) is gated by a content-preferences toggle.",
    parentsNeedToKnow: [
      "Steam carries explicit adult-only games. The gate is a date-of-birth checkbox.",
      "Voice chat and friend DMs are open by default.",
      "Community pages can include sexual or extremist material.",
      "Spending is engineered around sales and tradable items.",
    ],
    topConcerns: [
      {
        title: "Adult-only catalog",
        body: "Steam hosts explicitly sexual games. The age gate is bypassable in minutes.",
      },
      {
        title: "Stranger DMs",
        body: "Friend requests can come from anyone with your Steam ID, and DMs/voice are open by default.",
      },
    ],
    parentalControls:
      "Steam Family View lets parents PIN-lock the library, store, friends, and chat. Steam Family Sharing has separate restrictions.",
    mpcCoverage:
      "Koda monitors Steam chat, friend DMs, and Community page visits — including detection of NSFW community content.",
    recommendation:
      "Middle school+ with Family View locked down; high school+ for unrestricted Steam.",
  },
  {
    slug: "twitch",
    name: "Twitch",
    blurb: "Live game streaming with stream chat and DMs (whispers).",
    category: "Video & streaming",
    brandColor: "#9146FF",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "twitch" },
    age: { apple: "13+", google: "Teen", common: "15+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "Twitch is Amazon's live-streaming platform — predominantly gaming, but also \"Just Chatting,\" \"IRL,\" and \"Hot Tub\" categories.",
    howItWorks:
      "Watch streams, chat in real time, subscribe to channels, DM (whisper) other users. Streamers monetize via subs, bits, and donations.",
    parentsNeedToKnow: [
      "\"Hot Tub\" and \"ASMR\" streams routinely host sexually suggestive content.",
      "Stream chat moves fast and contains slurs, harassment, and links to adult content.",
      "Whispers are 1:1 DMs that go relatively undetected.",
      "Donation/tip mechanics push impulse spending.",
    ],
    topConcerns: [
      {
        title: "Sexualized stream categories",
        body: "Hot Tub, ASMR, and IRL categories regularly host content that approaches softcore.",
      },
      {
        title: "Stream chat as predator vector",
        body: "Streamer + DM (\"whisper\") flow is a documented grooming pattern.",
      },
    ],
    parentalControls:
      "Twitch has limited parental controls. Disable whispers from non-friends, hide mature content via account preferences.",
    mpcCoverage:
      "Koda monitors Twitch stream chat and whispers on your child's device, flagging predator-style DMs and sexual category browsing.",
    recommendation:
      "High school and up with whispers locked to friends.",
  },
  {
    slug: "valorant",
    name: "Valorant",
    blurb: "Tactical 5v5 shooter with voice comms — Riot's answer to CS:GO.",
    category: "Games",
    brandColor: "#FF4655",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "V" },
    age: { apple: "—", google: "Teen", common: "16+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "Valorant is Riot Games' free-to-play tactical shooter. Teams of 5 compete in rounds with abilities and gunplay. Voice chat is central to strategy and is on by default in competitive matches.",
    howItWorks:
      "Queue for a match, get placed with 4 teammates and 5 opponents. All communication is via team voice chat (open mic by default), text chat, and pings. Matches last 30-45 minutes with mandatory voice coordination.",
    parentsNeedToKnow: [
      "Voice chat is essentially required for competitive play — muting puts you at a disadvantage.",
      "Toxic behavior, slurs, and verbal harassment are extremely common.",
      "Matches last 30-45 minutes — walking away mid-match penalizes the player.",
      "Ranked matchmaking can pair your child with adults of any age.",
    ],
    topConcerns: [
      {
        title: "Extreme voice chat toxicity",
        body: "Valorant's competitive environment breeds verbal abuse. Slurs, death threats, and harassment are regular occurrences in ranked matches.",
      },
      {
        title: "Adult teammates in ranked",
        body: "No age segregation. A 12-year-old can be on voice with adults in any match.",
      },
    ],
    parentalControls:
      "Valorant has no built-in parental controls beyond a text-chat filter. Voice chat can be muted per-match but not restricted by a parent. Riot's Parental Controls page allows disabling social features and chat on the Riot account level.",
    mpcCoverage:
      "Koda monitors Valorant voice and text chat on your child's PC — detecting toxic language, threats, bullying, and adult conversations directed at your child during matches.",
    recommendation:
      "High school and up. The voice chat environment is not appropriate for younger teens without active monitoring.",
    faqs: [
      { question: "Is Valorant safe for kids?", answer: "Valorant is rated Teen but the voice chat environment is often more appropriate for older teens (16+). The game requires voice communication for competitive play, which exposes players to unfiltered language from random adult teammates. Verbal harassment, slurs, and toxicity are common." },
      { question: "What are Valorant parental controls?", answer: "Valorant has minimal built-in parental controls. Parents can manage the Riot Games account to restrict social features and chat, but there is no way to permanently disable voice chat without muting manually each match. The text profanity filter can be enabled in settings." },
    ],
  },
  {
    slug: "league-of-legends",
    name: "League of Legends",
    blurb: "MOBA with intense team play, toxic chat culture, and long matches.",
    category: "Games",
    brandColor: "#C89B3C",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "LoL" },
    age: { apple: "—", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "League of Legends is Riot's flagship MOBA (multiplayer online battle arena). Two teams of 5 compete in strategy-heavy matches lasting 25-45 minutes. Known for an extremely toxic text chat culture.",
    howItWorks:
      "Queue solo or with friends, get matched into a 5v5 game. Communication via text chat (team and all-chat) and optional voice chat with premade groups. Ranked mode adds competitive pressure.",
    parentsNeedToKnow: [
      "Text chat toxicity is legendary — LoL's community is one of the most infamously hostile in gaming.",
      "Matches last 25-45 minutes and cannot be left without penalty.",
      "Ranked play adds extreme competitive pressure that amplifies toxic behavior.",
      "Kids often move to Discord for voice chat with strangers met in-game.",
    ],
    topConcerns: [
      {
        title: "Extreme chat toxicity",
        body: "LoL is infamous for in-game chat abuse. Teammates frequently harass underperforming players with slurs, death threats, and personal attacks.",
      },
      {
        title: "Addictive ranked ladder",
        body: "The ranked system creates compulsive play patterns. Kids may play for hours chasing rank, while being exposed to toxic teammates throughout.",
      },
    ],
    parentalControls:
      "League of Legends has limited parental controls. Parents can manage the Riot account to restrict social features. In-game, players can mute all chat, disable all-chat, or mute individual players. There is no parent-managed restriction system.",
    mpcCoverage:
      "Koda monitors League of Legends text chat on your child's PC, flagging bullying, threats, and verbal abuse directed at or from your child during matches.",
    recommendation:
      "High school and up with /mute all as a default habit. The chat environment is hostile by design.",
    faqs: [
      { question: "Is League of Legends safe for kids?", answer: "League of Legends has one of the most toxic chat cultures in gaming. While the game content itself is relatively tame (fantasy violence), the player interactions include frequent slurs, death threats, and aggressive harassment. It is best suited for older teens who can handle competitive toxicity." },
      { question: "What are League of Legends parental controls?", answer: "LoL has no dedicated parental controls interface. Parents can manage the Riot account to disable social features. In-game, the /mute all command silences all chat. Parents should ensure their child knows how to mute players and report harassment." },
    ],
  },
  {
    slug: "call-of-duty",
    name: "Call of Duty",
    blurb: "FPS franchise with voice-heavy multiplayer and mature war content.",
    category: "Games",
    brandColor: "#000000",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "CoD" },
    age: { apple: "17+", google: "Mature 17+", common: "17+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "Call of Duty is Activision's first-person shooter franchise. Modern entries include Warzone (free battle royale), multiplayer, and campaign modes. Voice chat is central to team play.",
    howItWorks:
      "Queue into multiplayer or Warzone matches with voice chat on by default. Proximity chat in Warzone means anyone nearby can hear and talk to your child. Text chat runs alongside.",
    parentsNeedToKnow: [
      "Rated M (17+) for graphic violence, strong language, and mature themes.",
      "Voice chat with random adults is on by default.",
      "Warzone proximity chat lets strangers talk directly to your child mid-game.",
      "Extremely popular with younger teens despite the M rating.",
    ],
    topConcerns: [
      {
        title: "Open voice chat with adults",
        body: "Voice lobbies and Warzone proximity chat expose kids to unfiltered adult language, slurs, and harassment with no age separation.",
      },
      {
        title: "Graphic violence and mature themes",
        body: "Campaign modes include torture, civilian casualties, and graphic war imagery not appropriate for children.",
      },
    ],
    parentalControls:
      "Activision account settings allow disabling voice chat, text chat, and friend requests. Console parental controls (Xbox Family Settings, PS5 Parental Controls) can restrict M-rated game access. On PC, no platform-level age restriction exists.",
    mpcCoverage:
      "Koda monitors Call of Duty voice and text chat on your child's PC, alerting you to verbal harassment, threats, and inappropriate conversations during matches.",
    recommendation:
      "High school (16+) only. The M rating exists for good reasons. If allowing younger teens, voice chat should be restricted to party/friends only.",
    faqs: [
      { question: "Is Call of Duty safe for kids?", answer: "No. Call of Duty is rated M (17+) for graphic violence, gore, and mature themes. Beyond the content, voice chat lobbies expose players to unfiltered adult language and harassment. It is not appropriate for children under 16, and even older teens benefit from voice chat restrictions and monitoring." },
      { question: "What are Call of Duty parental controls?", answer: "On PC: Activision account settings allow disabling voice chat, text chat, and crossplay. On console: Xbox Family Settings and PS5 Parental Controls can block M-rated games entirely. Voice chat can be set to 'Friends Only' or disabled in the game's audio settings." },
    ],
  },
  {
    slug: "overwatch",
    name: "Overwatch 2",
    blurb: "Team-based hero shooter with voice comms and competitive toxicity.",
    category: "Games",
    brandColor: "#F99E1A",
    logoOnDark: false,
    logo: { kind: "monogram", letters: "OW" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Overwatch 2 is Blizzard's free-to-play team shooter. 5v5 matches with hero abilities, voice chat coordination, and a competitive ranked mode. Popular with teens and young adults.",
    howItWorks:
      "Pick a hero, queue for a match, coordinate with teammates via voice and text. Competitive mode requires teamwork and voice communication. Matches last 10-20 minutes.",
    parentsNeedToKnow: [
      "Voice chat toxicity is common, especially when losing.",
      "Competitive ranked play creates pressure and frustration.",
      "Female and younger-sounding players face targeted harassment.",
      "Battle Pass and cosmetic spending pressure exists.",
    ],
    topConcerns: [
      {
        title: "Voice chat harassment",
        body: "Players who sound young or female face targeted verbal abuse. Competitive pressure amplifies toxic behavior.",
      },
      {
        title: "Competitive addiction",
        body: "Ranked mode creates compulsive play loops with emotional highs and lows that can affect mood and behavior.",
      },
    ],
    parentalControls:
      "Overwatch 2 has a text chat filter and the ability to mute voice. Battle.net parental controls can limit play time and restrict social features at the account level.",
    mpcCoverage:
      "Koda monitors Overwatch 2 voice and text chat on your child's PC, detecting harassment, threats, and toxic language directed at your child.",
    recommendation:
      "Middle school and up with awareness of voice chat toxicity. Encourage use of the mute button.",
    faqs: [
      { question: "Is Overwatch 2 safe for kids?", answer: "Overwatch 2 is appropriate for teens 13+ in terms of game content (cartoon violence), but voice chat toxicity is a significant concern. Players who sound young often face targeted harassment. With voice chat limited to group/friends and text filters enabled, it can be a reasonable option for older middle schoolers." },
      { question: "What are Overwatch 2 parental controls?", answer: "Battle.net parental controls (managed at account.blizzard.com) allow parents to restrict play time, disable social features, and limit communication. In-game, players can mute voice, hide text chat, and enable profanity filters." },
    ],
  },
  {
    slug: "vrchat",
    name: "VRChat",
    blurb: "Social VR platform with voice chat, user worlds, and no age verification.",
    category: "Games",
    brandColor: "#1FB7D4",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "VR" },
    age: { apple: "—", google: "Teen", common: "13+" },
    risks: STANDARD_RISKS,
    whatIs:
      "VRChat is a free social platform where players create avatars and explore user-made worlds. While designed for VR headsets, it also runs on PC. Voice chat is the primary communication method — there is no text alternative in most worlds.",
    howItWorks:
      "Create an account, pick an avatar, join public or private worlds. All communication is spatial voice chat — you hear people nearby. Worlds range from hangout spaces to games, and many have no moderation.",
    parentsNeedToKnow: [
      "Voice-only communication with zero text record.",
      "No meaningful age verification — many users are under 13.",
      "Public worlds are completely unmoderated.",
      "Sexually explicit avatars and worlds exist and are accessible.",
      "Adults and children interact freely with no separation.",
    ],
    topConcerns: [
      {
        title: "Adults and children on open voice",
        body: "VRChat has no age separation. A 10-year-old can join a world and immediately be on voice with adults. Predator contact is trivially easy.",
      },
      {
        title: "Sexually explicit content",
        body: "User-created avatars and worlds include explicit sexual content. No moderation or age-gating prevents access.",
      },
      {
        title: "No communication record",
        body: "All interaction is live voice. Nothing is logged, recorded, or moderatable after the fact.",
      },
    ],
    parentalControls:
      "VRChat has essentially no parental controls. Players can block individuals and adjust personal bubble settings, but there is no parent-managed restriction system.",
    mpcCoverage:
      "Koda monitors VRChat voice conversations on your child's PC, transcribing and analyzing for grooming, sexual content, bullying, and predator behavior — providing the record that VRChat itself does not create.",
    recommendation:
      "Not recommended under 16. The voice-only, unmoderated environment is extremely high-risk for children.",
    faqs: [
      { question: "Is VRChat safe for kids?", answer: "No. VRChat has no age verification, no parental controls, and no separation between children and adults. All communication is live voice with no record. Sexually explicit avatars and worlds are freely accessible. It is one of the highest-risk social gaming platforms for children." },
      { question: "What are VRChat parental controls?", answer: "VRChat has no parental controls. The only safety features are personal block lists and a 'personal space' bubble setting. Parents cannot restrict who their child talks to, which worlds they visit, or what content they see." },
    ],
  },
];
/* eslint-enable max-len */

export function getPlatform(slug: string): Platform | undefined {
  return PLATFORMS.find((p) => p.slug === slug);
}

export function getAllPlatformSlugs(): string[] {
  return PLATFORMS.map((p) => p.slug);
}

export function getPlatformsByCategory() {
  const grouped: Record<PlatformCategory, Platform[]> = {
    Games: [],
    "Chat & social": [],
    "Video & streaming": [],
  };
  for (const p of PLATFORMS) {
    grouped[p.category].push(p);
  }
  return grouped;
}
