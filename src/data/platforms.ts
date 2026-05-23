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
};

export type PlatformCategory =
  | "Games"
  | "Chat & social"
  | "Video & streaming"
  | "AI companions"
  | "Photo & creative"
  | "Reading & community"
  | "Other";

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
    slug: "bereal",
    name: "BeReal",
    blurb: "Daily two-camera photo app pushed as the \"authentic\" social network.",
    category: "Photo & creative",
    brandColor: "#000000",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "bereal" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "BeReal pings users once a day at a random time and gives them two minutes to post a simultaneous front+back camera photo. The pitch is \"no filters, no editing, the real you.\"",
    howItWorks:
      "Each daily notification opens a two-minute window. The app posts to your friends feed and an optional public Discovery feed. Comments, RealMojis, and DMs (newer feature) let users react and message each other.",
    parentsNeedToKnow: [
      "Default feed is friends-only, but Discovery shows posts to strangers globally.",
      "Location can be attached to every BeReal — often on by default.",
      "Late posts are labeled and visible, which pressures kids to drop whatever they're doing.",
      "The \"authentic\" framing means kids post in bathrooms, bedrooms, and at school.",
    ],
    topConcerns: [
      {
        title: "Location exposure",
        body: "Precise location can be attached to every post. Many kids leave it on without realizing strangers in Discovery can see where they live, study, and sleep.",
      },
      {
        title: "Discovery feed",
        body: "Discovery exposes posts to the global public. Adults can comment on minors' photos.",
      },
      {
        title: "Unprepared posting",
        body: "The two-minute window pushes kids to snap immediately — in bedrooms, locker rooms, and other private settings they would not normally post from.",
      },
    ],
    parentalControls:
      "BeReal has minimal in-app controls. You can disable Discovery and turn off location per post, but there is no parent dashboard.",
    mpcCoverage:
      "Koda flags inappropriate Discovery comments, location exposure, and stranger DMs reaching your child's BeReal account.",
    recommendation:
      "High school and up, with location off and Discovery disabled.",
  },
  {
    slug: "bitlife",
    name: "BitLife",
    blurb: "Life-simulator game where players role-play crime, sex, drugs, and prison.",
    category: "Games",
    brandColor: "#000000",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "B" },
    age: { apple: "17+", google: "Mature 17+", common: "17+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "BitLife is a text-based life-simulator: you're born, age year by year, and choose actions. The catch — actions include hookups, abortions, hard drugs, murder, prostitution, prison fights, and more, presented matter-of-factly.",
    howItWorks:
      "Each year, the game offers menu choices: Mind & Body, Activities, Crime, Relationships. Players read short text outcomes and pick again. There's no chat or multiplayer, but the content itself is mature.",
    parentsNeedToKnow: [
      "Despite the cartoonish UI, content is explicitly adult.",
      "Crime menus include murder, assault, grand theft, and drug dealing.",
      "Relationships menu includes hookups, affairs, and STI mechanics.",
      "Some content is paywalled behind \"BitLife God Mode\" but most is free.",
    ],
    topConcerns: [
      {
        title: "Normalizes adult themes",
        body: "Sex, hard drugs, prison violence, and prostitution are framed as casual menu choices for kids as young as elementary school.",
      },
      {
        title: "17+ rating routinely ignored",
        body: "BitLife consistently appears in tween-app rankings despite a 17+ rating. The cartoon look makes it feel kid-safe.",
      },
    ],
    parentalControls:
      "BitLife has no parental controls. Use device-level age restrictions (iOS Screen Time, Google Family Link) to block 17+ apps.",
    mpcCoverage:
      "Koda flags BitLife installs and alerts you when your child opens the app, since the game itself has no chat to monitor.",
    recommendation:
      "Not recommended for anyone under 17. Block at the device level.",
  },
  {
    slug: "bitmoji",
    name: "Bitmoji",
    blurb: "Personal avatar/sticker app deeply tied to Snapchat.",
    category: "Photo & creative",
    brandColor: "#FBCE00",
    logoOnDark: false,
    logo: { kind: "simple-icons", slug: "bitmoji" },
    age: { apple: "9+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Bitmoji lets users create a personal cartoon avatar that auto-generates as a sticker library across iMessage, Snapchat, Gmail, and elsewhere.",
    howItWorks:
      "Sign in (often with Snap), customize the avatar, then export stickers system-wide. Snapchat integration is the main use — Bitmojis appear on the Snap Map showing your child's avatar at their location.",
    parentsNeedToKnow: [
      "Bitmoji shares your account with Snapchat by default.",
      "Snap Map can display your child's Bitmoji at their real-time location to all friends.",
      "Sticker library includes some suggestive or romantic stickers.",
      "Avatars can look uncomfortably realistic for very young children.",
    ],
    topConcerns: [
      {
        title: "Location via Snap Map",
        body: "Your child's Bitmoji becomes their pin on Snap Map. Anyone on their friends list (which may include strangers) can see their location.",
      },
      {
        title: "Suggestive sticker content",
        body: "Some stickers depict romantic, drinking, or party themes that don't match the cartoony first impression.",
      },
    ],
    parentalControls:
      "No standalone parental controls. Set Snap Map to \"Ghost Mode\" in the Snapchat app to prevent location sharing.",
    mpcCoverage:
      "Koda inspects Bitmoji stickers sent or received in monitored chats, so suggestive sticker conversations don't slip past you.",
    recommendation:
      "OK at any age, but only with Snap Map set to Ghost Mode.",
  },
  {
    slug: "capcut",
    name: "CapCut",
    blurb: "ByteDance's video editor, the engine behind most TikTok content.",
    category: "Photo & creative",
    brandColor: "#000000",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "capcut" },
    age: { apple: "12+", google: "Everyone", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "CapCut is a free mobile video editor by ByteDance (TikTok's parent company). It's how most short-form video on TikTok, Reels, and YouTube Shorts is actually edited.",
    howItWorks:
      "Import clips, apply templates, add audio, export. CapCut also pushes a public template library and a social feed where users can share edits and follow other creators.",
    parentsNeedToKnow: [
      "CapCut shares data with ByteDance — same privacy concerns as TikTok.",
      "Template feed surfaces suggestive content the same way TikTok does.",
      "Many \"trending\" templates are recreations of mature TikTok memes.",
      "The app has its own social graph independent of TikTok.",
    ],
    topConcerns: [
      {
        title: "ByteDance data sharing",
        body: "CapCut collects significant data and shares it across ByteDance products. The same scrutiny applied to TikTok applies here.",
      },
      {
        title: "Template feed = mini TikTok",
        body: "Browsing templates exposes kids to viral suggestive content packaged as \"trends.\"",
      },
    ],
    parentalControls:
      "CapCut has no dedicated parental controls. The social feed cannot be disabled — only the algorithm filters are user-tunable.",
    mpcCoverage:
      "Koda flags inappropriate template content viewed in CapCut and monitors any messaging between accounts.",
    recommendation:
      "Middle school and up, used for editing only — not as a discovery feed.",
  },
  {
    slug: "character-ai",
    name: "Character.AI",
    blurb: "Chat with AI \"characters\" — including romantic and roleplay bots.",
    category: "AI companions",
    brandColor: "#2563EB",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "c.ai" },
    age: { apple: "17+", google: "Teen", common: "16+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
      { label: "Self-harm / mental health", level: "high" },
    ],
    whatIs:
      "Character.AI lets users chat with AI personas — anime characters, celebrities, therapists, romantic partners, and bots made by other users. The conversations feel realistic and unbounded.",
    howItWorks:
      "Pick or build a \"character\" and chat. Many characters are user-created with no oversight: \"abusive boyfriend,\" \"AI therapist,\" \"yandere girlfriend,\" \"school bully.\" Roleplay can become romantic, violent, or sexual quickly.",
    parentsNeedToKnow: [
      "There are active wrongful-death lawsuits tied to teen suicide and Character.AI conversations.",
      "Romantic/sexual roleplay characters dominate the popular list.",
      "Bots can talk kids into emotional dependency in days.",
      "Content filters are weak and easily worked around.",
    ],
    topConcerns: [
      {
        title: "Suicide and self-harm risk",
        body: "Multiple documented cases of teens forming intense relationships with bots, including conversations that allegedly contributed to suicide.",
      },
      {
        title: "Sexual roleplay",
        body: "Despite filters, sexualized chat is trivially easy to elicit, especially with user-created characters.",
      },
      {
        title: "Replaces human connection",
        body: "Teens turn to bots for emotional support faster than they realize — and the bot is engineered to keep them coming back.",
      },
    ],
    parentalControls:
      "Character.AI rolled out a Parental Insights dashboard in 2024 that emails a weekly activity summary to a linked parent address. There is no real-time block or filter.",
    mpcCoverage:
      "Koda flags Character.AI sessions in real time, surfacing conversations that touch on self-harm, sex, or grooming-style attachment — not just a weekly summary email.",
    recommendation:
      "Not recommended under 16, and only with active parent monitoring above that.",
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    blurb: "OpenAI's general-purpose chatbot — homework help and everything else.",
    category: "AI companions",
    brandColor: "#10A37F",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "openai" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "low" },
      { label: "Academic integrity", level: "high" },
    ],
    whatIs:
      "ChatGPT is OpenAI's flagship AI assistant — answers questions, writes essays, codes, generates images, and can hold voice conversations.",
    howItWorks:
      "Type or speak a prompt; the model responds. Custom GPTs let users (including kids) create specialized bots. Memory is on by default in newer versions, meaning ChatGPT remembers prior conversations across sessions.",
    parentsNeedToKnow: [
      "Voice mode makes ChatGPT feel like talking to a friend.",
      "Custom GPTs include role-play personas, including ones designed to flirt or counsel.",
      "Memory persists — kids often forget what the model knows about them.",
      "Easy bypass tricks (\"pretend you're …\") can route around safety filters.",
    ],
    topConcerns: [
      {
        title: "Homework outsourcing",
        body: "ChatGPT writes essays and solves problem sets indistinguishably from students. Schools are still catching up.",
      },
      {
        title: "Emotional substitution",
        body: "Voice mode + memory means kids confide in ChatGPT as a friend. The model is not a therapist.",
      },
      {
        title: "Jailbroken content",
        body: "Roleplay framing reliably gets the model to produce sexual, violent, or self-harm content.",
      },
    ],
    parentalControls:
      "OpenAI added parental controls in 2025 linking a parent account to a teen's for usage caps, content restrictions, and memory off. Not enabled by default.",
    mpcCoverage:
      "Koda captures ChatGPT prompts and responses on your child's PC so you see what they're really asking — and flags self-harm, sexual, or homework-cheating conversations.",
    recommendation:
      "Middle school and up, with linked parent controls and an honest conversation about academic use.",
  },
  {
    slug: "claude",
    name: "Claude",
    blurb: "Anthropic's chatbot — safer defaults but still an AI confidant.",
    category: "AI companions",
    brandColor: "#DA7756",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "anthropic" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
      { label: "Academic integrity", level: "high" },
    ],
    whatIs:
      "Claude is Anthropic's AI assistant, designed with stricter safety defaults than most competitors. It refuses more requests, but it's still a chatbot that kids can confide in.",
    howItWorks:
      "Web chat, mobile app, or API. Conversations are stored to the user's account. Projects let users build persistent contexts with uploaded files.",
    parentsNeedToKnow: [
      "Claude's defaults are safer than ChatGPT's but not childproof.",
      "Still writes essays, codes, and answers homework.",
      "No native voice mode, which lowers the \"AI friend\" risk somewhat.",
      "Account-level controls are minimal.",
    ],
    topConcerns: [
      {
        title: "Homework outsourcing",
        body: "Same essay/code generation concerns as any large model.",
      },
      {
        title: "Emotional offloading",
        body: "Kids treat any chatbot as a confidant. Even with safer defaults, hours of conversation displaces real connection.",
      },
    ],
    parentalControls:
      "Anthropic has no formal teen-account/parent-link product as of this writing. Block at the network or device level if you don't want it used.",
    mpcCoverage:
      "Koda captures Claude conversations on your child's PC and flags self-harm, sexual content, or academic-cheating patterns.",
    recommendation:
      "Middle school and up. Safer than most chatbots for kids but still benefits from monitoring.",
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
  },
  {
    slug: "disney-plus",
    name: "Disney+",
    blurb: "Disney's streaming service — kid catalog plus a deep adult catalog.",
    category: "Video & streaming",
    brandColor: "#113CCF",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "disneyplus" },
    age: { apple: "4+", google: "Everyone", common: "7+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Disney+ is Disney's streaming service spanning Pixar, Marvel, Star Wars, and (in many regions) Hulu/Star adult content.",
    howItWorks:
      "Family plan with up to seven profiles. Kids Profile is a hard-locked junior mode; standard profiles can access TV-MA Hulu and Star content depending on region and bundle.",
    parentsNeedToKnow: [
      "Kids Profile is excellent — but only if your child uses that profile.",
      "Most families share one adult profile, defeating the safety design.",
      "Bundled Hulu content includes graphic violence and sexual content.",
      "Profile PINs are off by default.",
    ],
    topConcerns: [
      {
        title: "Wrong profile = wrong content",
        body: "If your child has access to an adult profile, the entire Hulu/Star catalog is one tap away — including TV-MA content.",
      },
      {
        title: "Autoplay across maturity levels",
        body: "Continue-watching rows can suggest content well outside the child's age band on shared accounts.",
      },
    ],
    parentalControls:
      "Create a dedicated Kids Profile, set a PIN on adult profiles, and set Content Ratings per profile (Settings → Profile → Content Rating).",
    mpcCoverage:
      "Koda flags when your child switches to an adult Disney+ profile or watches content above their rating.",
    recommendation:
      "Great for any age on Kids Profile with PIN-locked adult profiles.",
  },
  {
    slug: "episode",
    name: "Episode",
    blurb: "\"Choose your story\" interactive romance and drama app aimed at teens.",
    category: "Reading & community",
    brandColor: "#FF1493",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "E" },
    age: { apple: "12+", google: "Mature 17+", common: "16+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "Episode is an interactive-fiction app where users pick choices through teen romance, drama, and \"bad boy\" storylines. Many stories are user-generated.",
    howItWorks:
      "Pick a story, tap through scenes, make choices. Stories range from cute high-school crushes to explicit \"mature\" content with sexual scenes and partial nudity.",
    parentsNeedToKnow: [
      "Despite the 12+ Apple rating, content reads as soft-core teen romance.",
      "Bestseller list is dominated by mafia, billionaire, and \"forbidden love\" stories.",
      "Many scenes depict sex, drinking, and assault.",
      "Featured stories are licensed teen-fiction adaptations (Mean Girls, Pretty Little Liars).",
    ],
    topConcerns: [
      {
        title: "Sexual content normalization",
        body: "\"Mature\" stories show sexual scenes with implied nudity behind sheets/silhouettes. Routine for 12-year-olds despite age rating gaps.",
      },
      {
        title: "Toxic relationship modeling",
        body: "Bestselling plots reward jealous, controlling, or abusive partners with romantic outcomes.",
      },
    ],
    parentalControls:
      "Episode has a content filter for \"Mature\" stories but it's user-toggleable with no parent lock.",
    mpcCoverage:
      "Koda flags Episode installs and mature-story sessions on your child's device.",
    recommendation:
      "High school and up, with the mature filter on. Not recommended for under 14.",
  },
  {
    slug: "facebook",
    name: "Facebook",
    blurb: "The OG social network — older crowd, but full of stranger DMs.",
    category: "Chat & social",
    brandColor: "#1877F2",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "facebook" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Facebook is Meta's flagship social network — profiles, friend graphs, news feed, Groups, Marketplace, and Messenger.",
    howItWorks:
      "Create a profile, friend people, post to feed, join Groups, message via Messenger. Strangers can send message requests; Marketplace exposes kids to adult buyers.",
    parentsNeedToKnow: [
      "Most teens don't use Facebook — but predators know they're on Messenger Kids and Facebook Gaming.",
      "Privacy defaults are looser than Instagram's.",
      "Groups can host extremist, eating-disorder, or sexual content.",
      "Marketplace stranger chat is unmoderated.",
    ],
    topConcerns: [
      {
        title: "Message requests from strangers",
        body: "Anyone on Facebook can send a message request. Filter quality is poor, and predators use age-spoofed profiles.",
      },
      {
        title: "Extremist Groups",
        body: "Facebook Groups remain a known vector for radicalization, eating-disorder communities, and conspiracy content.",
      },
    ],
    parentalControls:
      "Facebook supplies basic privacy presets and a Family Center for linked teen accounts.",
    mpcCoverage:
      "Koda monitors Facebook web sessions, Messenger threads, and Marketplace chats from your child's PC.",
    recommendation:
      "High school and up. Most teens prefer Instagram/Snap; only sign up if there's a specific reason.",
  },
  {
    slug: "facebook-messenger",
    name: "Facebook Messenger",
    blurb: "Meta's standalone chat app — DMs, group chats, voice, video.",
    category: "Chat & social",
    brandColor: "#0099FF",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "messenger" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Messenger is Facebook's standalone chat app, now end-to-end encrypted by default for one-on-one conversations.",
    howItWorks:
      "Sign in with a Facebook account, message friends, accept message requests from strangers. Voice, video, and disappearing messages all supported.",
    parentsNeedToKnow: [
      "End-to-end encryption means even Meta can't read DMs — so parental monitoring at the platform level is limited.",
      "Message requests from strangers land in a separate inbox kids often check.",
      "Disappearing messages are a common predator request.",
    ],
    topConcerns: [
      {
        title: "Stranger DMs",
        body: "Anyone with a Facebook profile can send a message request. Spoofed-age accounts are easy to make.",
      },
      {
        title: "Encrypted by default",
        body: "Server-side moderation is significantly weaker than non-encrypted alternatives.",
      },
    ],
    parentalControls:
      "Set Messenger to friends-only via Facebook privacy controls. Meta's Family Center provides linked-teen reporting.",
    mpcCoverage:
      "Koda reads Messenger conversations on your child's PC — end-to-end encryption doesn't prevent monitoring on the endpoint device.",
    recommendation:
      "High school and up with friends-only message settings.",
  },
  {
    slug: "fizz",
    name: "Fizz",
    blurb: "Anonymous campus social app for college and high school feeds.",
    category: "Chat & social",
    brandColor: "#FF6E40",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "F" },
    age: { apple: "17+", google: "Mature 17+", common: "17+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Fizz is an anonymous school-affiliated feed (à la Yik Yak) where posts are visible to others verified at the same school.",
    howItWorks:
      "Verify with a school email, post anonymously to the school feed, upvote/downvote/comment. Posts are anonymous but localized.",
    parentsNeedToKnow: [
      "Anonymity removes accountability — bullying and rumors are routine.",
      "Sexual content and call-outs of specific students appear regularly.",
      "Suicide and self-harm posts have spiked on Fizz at multiple schools.",
      "Drug-sale posts are not unusual.",
    ],
    topConcerns: [
      {
        title: "Anonymous bullying",
        body: "Posts naming specific students, often sexually, spread campus-wide before moderation catches them.",
      },
      {
        title: "Self-harm content",
        body: "Suicide notes and self-harm posts surface frequently and amplify via upvotes.",
      },
    ],
    parentalControls:
      "Fizz has no parental controls. Block at the device level.",
    mpcCoverage:
      "Koda flags Fizz usage and alerts when your child views or posts content involving self-harm, bullying, or sexual targeting.",
    recommendation:
      "Not recommended at any age. The anonymity model is fundamentally hostile to safe use.",
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
  },
  {
    slug: "giphy",
    name: "Giphy",
    blurb: "GIF search engine baked into every messaging app.",
    category: "Photo & creative",
    brandColor: "#000000",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "giphy" },
    age: { apple: "17+", google: "Mature 17+", common: "13+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Giphy is the GIF search engine that powers Messenger, iMessage, Slack, Discord, and most other chat apps.",
    howItWorks:
      "Search a keyword, pick a GIF, send. Most users never open the standalone Giphy app — they hit it through a chat keyboard.",
    parentsNeedToKnow: [
      "Default Giphy ratings can include suggestive content.",
      "Many GIFs come from R-rated movies and TV shows.",
      "Apple's 17+ rating on the standalone app reflects what unfiltered search returns.",
    ],
    topConcerns: [
      {
        title: "Suggestive GIFs in chat",
        body: "Even with safe search, ambiguous keywords return GIFs from sex scenes or violent films.",
      },
    ],
    parentalControls:
      "Each host app (iMessage, Discord, etc.) has its own GIF content rating. There's no global Giphy parental control.",
    mpcCoverage:
      "Koda scans GIFs sent in monitored chats and flags ones with sexual or violent imagery.",
    recommendation:
      "Any age in apps with strict GIF filters; otherwise middle school+.",
  },
  {
    slug: "groupme",
    name: "GroupMe",
    blurb: "Group-chat app popular with school and youth-group leaders.",
    category: "Chat & social",
    brandColor: "#00AFF0",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "G" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "GroupMe is a free Microsoft-owned group-chat app. Schools, youth groups, sports teams, and class chats live here.",
    howItWorks:
      "Add a phone number, get added to groups by invite, text/photo/video chat the group. Members can DM each other once they're in the same group.",
    parentsNeedToKnow: [
      "Anyone added to a group can DM anyone else in that group.",
      "Photos and videos go to the whole group instantly.",
      "Bullying and exclusion play out in side chats parents can't see.",
    ],
    topConcerns: [
      {
        title: "Side-DMs from group members",
        body: "Once your child is in a school group chat, every other member can message them privately.",
      },
      {
        title: "Group bullying",
        body: "Exclusion (\"new group without X\") and pile-on bullying are common in school-grade GroupMe culture.",
      },
    ],
    parentalControls:
      "GroupMe has minimal controls. You can mute, leave, or report — but not pre-filter content.",
    mpcCoverage:
      "Koda monitors GroupMe group chats and side DMs on your child's device.",
    recommendation:
      "Middle school and up for school-organized groups. Avoid social groups.",
  },
  {
    slug: "hulu",
    name: "Hulu",
    blurb: "Streaming service with FX/R-rated content alongside kids titles.",
    category: "Video & streaming",
    brandColor: "#1CE783",
    logoOnDark: false,
    logo: { kind: "simple-icons", slug: "hulu" },
    age: { apple: "17+", google: "Mature 17+", common: "13+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "Hulu is Disney's general-audience streaming service — heavy on FX, current network TV, and adult-skewing originals.",
    howItWorks:
      "Up to six profiles per account. Kids profile available. Live TV add-on includes everything from CNN to FX. Bundle with Disney+ surfaces Hulu titles inside Disney+ for some users.",
    parentsNeedToKnow: [
      "Default profiles can see everything in the catalog including TV-MA.",
      "Kids profile must be created manually.",
      "Live TV bypasses some maturity controls.",
    ],
    topConcerns: [
      {
        title: "Wrong profile",
        body: "If your child uses a non-Kids profile, the entire R-rated catalog is one tap away.",
      },
    ],
    parentalControls:
      "Create a Kids profile (under 12) and lock adult profiles with a PIN. Set Live TV maturity ratings.",
    mpcCoverage:
      "Koda flags when your child switches to an adult Hulu profile.",
    recommendation:
      "Any age on Kids profile; high school and up for the main catalog.",
  },
  {
    slug: "instagram",
    name: "Instagram",
    blurb: "Photo/video social network with DMs, Reels, and a brutal compare-culture.",
    category: "Chat & social",
    brandColor: "#E1306C",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "instagram" },
    age: { apple: "12+", google: "Teen", common: "15+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "medium" },
      { label: "Mental health", level: "high" },
    ],
    whatIs:
      "Instagram is Meta's photo/video social network. Feed, Stories, Reels, DMs, Notes, Threads tie-ins.",
    howItWorks:
      "Post photos/Reels to followers; DM anyone; browse Explore for algorithmic content. Public accounts let anyone see and message. Stories and Notes share moments to friends in 24-hour cycles.",
    parentsNeedToKnow: [
      "Meta's own research linked Instagram to teen body-image and depression effects.",
      "Reels surface adult content fast via Explore.",
      "DM requests from strangers are a routine grooming vector.",
      "Vanishing DMs and \"close friends\" Stories obscure activity from parents.",
    ],
    topConcerns: [
      {
        title: "Mental health impact",
        body: "Internal Meta research found Instagram worsens body image for a meaningful share of teen girls. Compulsive use, comparison, and disordered eating content all surface.",
      },
      {
        title: "Stranger DMs",
        body: "DM requests from non-followers are a known predator vector. Filters exist but are inconsistent.",
      },
      {
        title: "Sexual content via Reels",
        body: "Reels algorithm reliably surfaces sexualized creators within minutes of normal browsing.",
      },
    ],
    parentalControls:
      "Instagram Teen Accounts (2024) default under-18s to private, restricted DMs, hidden words filters, and bedtime mode. Parents can link via Family Center.",
    mpcCoverage:
      "Koda monitors Instagram DMs, Stories, and Reel viewing on your child's PC — including disappearing messages that vanish from the platform.",
    recommendation:
      "High school and up, with Teen Account on and parent linking active.",
  },
  {
    slug: "kik",
    name: "Kik",
    blurb: "Anonymous-username messenger with a long history of child-safety issues.",
    category: "Chat & social",
    brandColor: "#82BC23",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "kik" },
    age: { apple: "17+", google: "Mature 17+", common: "18+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Kik is a free messenger that uses usernames instead of phone numbers, making it nearly anonymous.",
    howItWorks:
      "Pick a username, find people via Kik groups or shared usernames, message. No phone-number verification. Public groups searchable by interest.",
    parentsNeedToKnow: [
      "Kik has been named in dozens of high-profile child-exploitation cases.",
      "No phone-number requirement makes account creation trivial for predators.",
      "Public groups include explicitly sexual themes.",
      "Kik's own past safety record led to multiple shutdown/relaunch cycles.",
    ],
    topConcerns: [
      {
        title: "Predator-of-choice platform",
        body: "Kik has been called out by FBI and law-enforcement as a top platform for online child exploitation. Multiple convictions cite it explicitly.",
      },
      {
        title: "Anonymous-by-design",
        body: "Username-only signup with no phone verification means perpetrators are extremely hard to trace.",
      },
    ],
    parentalControls:
      "Kik has minimal in-app controls. Treat the whole app as block-list material.",
    mpcCoverage:
      "Koda flags Kik installs and conversations on your child's device.",
    recommendation:
      "Not recommended at any age. Block on the device.",
  },
  {
    slug: "lapse",
    name: "Lapse",
    blurb: "\"Disposable camera\" social app with delayed photo reveals.",
    category: "Photo & creative",
    brandColor: "#000000",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "L" },
    age: { apple: "13+", google: "Teen", common: "16+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Lapse mimics a disposable camera — photos \"develop\" over hours before being added to your album, then can be shared with friends.",
    howItWorks:
      "Take a photo, wait for it to develop, share with friends. Aggressive contact-syncing pushed Lapse to viral growth — and that contact-mining is part of the privacy concern.",
    parentsNeedToKnow: [
      "Lapse is famously contact-greedy at signup, often pulling phone books.",
      "The development delay makes kids forget what they shot.",
      "Public photo discovery has appeared in some versions.",
    ],
    topConcerns: [
      {
        title: "Contact harvesting",
        body: "Lapse pressures users to share their full contact list, which has raised repeated privacy complaints.",
      },
      {
        title: "Forgotten photos",
        body: "Photos taken impulsively appear in the feed hours or days later, by which time context is lost and regrets are too late.",
      },
    ],
    parentalControls:
      "No parental controls. Limit signup permissions at the OS level.",
    mpcCoverage:
      "Koda flags Lapse photo activity and any private friend requests.",
    recommendation:
      "High school and up, with contact-sync denied at install time.",
  },
  {
    slug: "lemon8",
    name: "Lemon8",
    blurb: "ByteDance's Pinterest/Instagram hybrid — lifestyle and aesthetics.",
    category: "Chat & social",
    brandColor: "#FFE500",
    logoOnDark: false,
    logo: { kind: "monogram", letters: "L8" },
    age: { apple: "17+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Lemon8 is ByteDance's lifestyle social app — aesthetic photo posts focused on fashion, beauty, food, and travel. Heavy Pinterest/Instagram crossover.",
    howItWorks:
      "Sign in (often with TikTok), browse Discover, follow creators, post lifestyle content. Comments, DMs, and saves.",
    parentsNeedToKnow: [
      "Same ByteDance data-collection concerns as TikTok.",
      "Aspirational content drives the same compare-and-despair pattern as Instagram.",
      "DMs from strangers possible by default.",
    ],
    topConcerns: [
      {
        title: "ByteDance data sharing",
        body: "Privacy and national-security concerns paralleling TikTok apply here.",
      },
      {
        title: "Body and beauty comparisons",
        body: "Aesthetic-curation content feeds compare-and-despair patterns in teen girls.",
      },
    ],
    parentalControls:
      "Lemon8 inherits TikTok's family-pairing where supported. Limit DMs to friends only.",
    mpcCoverage:
      "Koda monitors Lemon8 DMs and flags suggestive content viewed on your child's device.",
    recommendation:
      "High school and up. Same caution as TikTok.",
  },
  {
    slug: "livein",
    name: "LiveIn",
    blurb: "Always-on home-screen widget that shows what friends are doing.",
    category: "Photo & creative",
    brandColor: "#FF4D6D",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "Li" },
    age: { apple: "13+", google: "Teen", common: "16+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "LiveIn is a home-screen widget app where friends' photos, statuses, and \"vibes\" appear in real time, almost like a live photo frame.",
    howItWorks:
      "Add the widget, sync with friends, share photos and statuses that auto-update on each other's home screens. Some versions show approximate location.",
    parentsNeedToKnow: [
      "Real-time updates create FOMO and constant phone checking.",
      "Location features have appeared in some builds — verify settings.",
      "Friend lists can grow loose; widget content is always visible.",
    ],
    topConcerns: [
      {
        title: "Always-visible content",
        body: "A widget that updates on the home screen means whatever a friend posts (or sends) is on display continuously, including in classrooms.",
      },
    ],
    parentalControls:
      "Limited. Disable location features and prune friend lists manually.",
    mpcCoverage:
      "Koda flags LiveIn activity and any suggestive content surfaced through the widget.",
    recommendation:
      "High school and up, with location off.",
  },
  {
    slug: "locket",
    name: "Locket",
    blurb: "Widget-photo app — friends' selfies show up on your home screen.",
    category: "Photo & creative",
    brandColor: "#FFCB05",
    logoOnDark: false,
    logo: { kind: "monogram", letters: "L" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Locket Widget puts your friends' selfies as a tile on your phone's home screen, updating whenever they take a new photo.",
    howItWorks:
      "Install the widget, add up to 20 friends, share selfies that automatically appear on their home screens. No feed, just the widget.",
    parentsNeedToKnow: [
      "Limited social design is positive — but content is unmoderated.",
      "Friends can send anything; it lands on your child's home screen.",
      "Lockets capture a lot of bedroom/bathroom shots given how easy posting is.",
    ],
    topConcerns: [
      {
        title: "Unmoderated home-screen content",
        body: "Whatever a friend takes shows up on your child's home screen — including suggestive or accidental photos.",
      },
    ],
    parentalControls:
      "No parental controls beyond manual friend pruning.",
    mpcCoverage:
      "Koda scans Locket photos received on your child's device and flags suggestive content.",
    recommendation:
      "Middle school and up with a tight, parent-reviewed friends list.",
  },
  {
    slug: "messenger-kids",
    name: "Messenger Kids",
    blurb: "Meta's chat app designed for under-13s with parent-approved contacts.",
    category: "Chat & social",
    brandColor: "#0099FF",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "messenger" },
    age: { apple: "4+", google: "Everyone", common: "9+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Messenger Kids is Facebook's kid-focused chat app where every contact must be approved by a parent. No public profiles, no DMs from strangers.",
    howItWorks:
      "Parent creates the child's account from their own Facebook, approves contacts, and oversees from a Parent Dashboard. Kids chat via text, voice, video, and stickers.",
    parentsNeedToKnow: [
      "Strong product design, but it's still a Meta data pipeline for children.",
      "A 2019 bug let unapproved contacts into kid chats — Meta's controls aren't bulletproof.",
      "When kids graduate to Messenger proper, those guardrails vanish.",
    ],
    topConcerns: [
      {
        title: "Meta-account groundwork",
        body: "Messenger Kids builds an early data footprint with Meta. That account becomes part of their adult social graph later.",
      },
    ],
    parentalControls:
      "Parent Dashboard inside the Facebook app — approve contacts, see chat history, set sleep mode, remove account.",
    mpcCoverage:
      "Koda watches Messenger Kids chats on your child's PC for any bullying, sexual, or self-harm content even within approved contacts.",
    recommendation:
      "OK for elementary kids with active parent oversight; better options exist (group iMessage, family WhatsApp).",
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
  },
  {
    slug: "monkey",
    name: "Monkey",
    blurb: "Random video-chat app pairing teens with strangers.",
    category: "Chat & social",
    brandColor: "#FF6B35",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "M" },
    age: { apple: "18+", google: "Mature 17+", common: "18+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Monkey is an Omegle-style random video-chat app marketed to teens. Tap to match with a stranger on video.",
    howItWorks:
      "Open the app, get matched with a random user on live video, talk for 15 seconds, extend or skip. Filters by age or region are easy to spoof.",
    parentsNeedToKnow: [
      "Random video-chat with strangers is the entire product.",
      "Exposure to nudity, sexual acts, and predator approaches is documented and routine.",
      "Apple has removed Monkey multiple times; it keeps returning under variants.",
    ],
    topConcerns: [
      {
        title: "Predator and CSAM exposure",
        body: "Random video pairing with adult users is the design. Sexual exposure on first session is common in user reports.",
      },
    ],
    parentalControls:
      "No meaningful controls. Block at the device level.",
    mpcCoverage:
      "Koda flags Monkey installs and any session activity immediately.",
    recommendation:
      "Not recommended at any age. Block on the device.",
  },
  {
    slug: "netflix",
    name: "Netflix",
    blurb: "Streaming service with strong kids profiles — if you use them.",
    category: "Video & streaming",
    brandColor: "#E50914",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "netflix" },
    age: { apple: "4+", google: "Everyone", common: "7+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "Netflix is the biggest general-audience streaming service — kid catalog, family-friendly catalog, and a deep adult library.",
    howItWorks:
      "Up to five profiles per account. Each profile has a maturity level and optional PIN. Kids Profile is hard-locked and shows only age-appropriate titles.",
    parentsNeedToKnow: [
      "Default profile is unrated — full catalog open.",
      "Profile PINs are off until you set them.",
      "Autoplay can chain a kid from family content into mature content if the profile allows.",
    ],
    topConcerns: [
      {
        title: "Wrong profile",
        body: "Kids drift onto the parent profile and Netflix surfaces TV-MA recommendations.",
      },
    ],
    parentalControls:
      "Create a Kids Profile (under 12) and PIN-lock adult profiles. Set maturity rating per profile. Disable Autoplay on kid profiles.",
    mpcCoverage:
      "Koda flags when your child switches Netflix profiles or watches above-rating content.",
    recommendation:
      "Any age on Kids Profile with PIN-locked adult profiles.",
  },
  {
    slug: "omegle",
    name: "Omegle",
    blurb: "Random stranger chat — officially shut down, copycats are everywhere.",
    category: "Chat & social",
    brandColor: "#FF6A00",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "O" },
    age: { apple: "—", google: "—", common: "Adults only" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "Omegle (officially closed in 2023) paired strangers in random text and video chat with no signup. Numerous clones now operate under names like Emerald, Chathub, and various Omegle-style sites.",
    howItWorks:
      "Visit a clone site, click \"Start,\" get matched with a random stranger. No account, no moderation.",
    parentsNeedToKnow: [
      "The original Omegle was named in many CSAM and child-exploitation cases — its closure was driven by lawsuits.",
      "Clones replicate the exact same harmful model.",
      "TikTok trends still push kids to try Omegle-style sites.",
    ],
    topConcerns: [
      {
        title: "Random pairing with adults",
        body: "Documented pattern: kids land on adult-perpetrator sessions within seconds. The clones have the same problem.",
      },
    ],
    parentalControls:
      "None — block at the DNS/router level.",
    mpcCoverage:
      "Koda flags any Omegle-style site visited on your child's PC and warns you immediately.",
    recommendation:
      "Not recommended at any age. Block at the DNS/router level.",
  },
  {
    slug: "pinterest",
    name: "Pinterest",
    blurb: "Visual bookmarking — generally safer, with some edge cases.",
    category: "Photo & creative",
    brandColor: "#E60023",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "pinterest" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
      { label: "Mental health", level: "medium" },
    ],
    whatIs:
      "Pinterest is a visual-bookmarking platform — \"pin\" ideas to boards around recipes, decor, fashion, and aesthetics.",
    howItWorks:
      "Search or scroll, save pins to boards, follow creators. DMs exist but are minimal. Discover content via algorithm.",
    parentsNeedToKnow: [
      "Generally the safest mainstream social app, but not zero-risk.",
      "\"Aesthetic\" boards can route into thinspo / eating-disorder territory.",
      "Self-harm content sometimes slips through moderation.",
      "DMs from strangers are possible if not disabled.",
    ],
    topConcerns: [
      {
        title: "Eating-disorder rabbit holes",
        body: "Aspirational thin-ideal content remains discoverable despite policy changes.",
      },
    ],
    parentalControls:
      "Pinterest's Teen Account (under-16) defaults profile to private, disables DMs from non-followers, and tightens content filters.",
    mpcCoverage:
      "Koda flags eating-disorder, self-harm, and sexualized aesthetic content surfaced on Pinterest.",
    recommendation:
      "Middle school and up with Teen Account on.",
  },
  {
    slug: "pokemon-go",
    name: "Pokémon GO",
    blurb: "Augmented-reality game that sends kids to real-world locations.",
    category: "Games",
    brandColor: "#FFCB05",
    logoOnDark: false,
    logo: { kind: "monogram", letters: "P" },
    age: { apple: "9+", google: "Everyone", common: "10+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
      { label: "Physical safety", level: "high" },
    ],
    whatIs:
      "Pokémon GO is a location-based AR game. Players walk to real-world \"PokéStops\" and \"Gyms\" to catch Pokémon.",
    howItWorks:
      "GPS-driven map. Walking triggers gameplay. Players hit landmarks, raid bosses with nearby players, trade with friends. Some events draw crowds.",
    parentsNeedToKnow: [
      "Real-world travel is the core mechanic.",
      "Raids and Community Days concentrate players (including adults) at fixed locations.",
      "In-game trading and friend codes require physical proximity.",
      "Lures can attract crowds; some have been used to bait specific groups.",
    ],
    topConcerns: [
      {
        title: "Physical-world stranger contact",
        body: "Kids walking to PokéStops alone are predictable, and lures can draw adults to specific spots.",
      },
      {
        title: "Traffic and pedestrian risk",
        body: "Heads-down gameplay near roads is a documented injury source.",
      },
    ],
    parentalControls:
      "Niantic Kids requires a parent-managed sub-account for under-13s, restricting trading and chat.",
    mpcCoverage:
      "Koda flags Pokémon GO usage during school hours, after-curfew sessions, and friend-trading prompts.",
    recommendation:
      "Elementary and up with adult accompaniment for under-12s.",
  },
  {
    slug: "private-photo-vault",
    name: "Private Photo Vault",
    blurb: "\"Calculator\" / hidden-photo app — looks innocent, hides photos.",
    category: "Other",
    brandColor: "#6B7280",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "PV" },
    age: { apple: "4+", google: "Everyone", common: "Concerning at any age" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Private Photo Vault and similar apps hide photos behind a fake calculator UI or PIN-locked vault. Common pattern for kids hiding sexting content from parents.",
    howItWorks:
      "Install, set PIN, import photos into the vault. Originals are deleted from the camera roll. App icon may disguise as a calculator, notes, or weather app.",
    parentsNeedToKnow: [
      "The whole category exists specifically to hide content from parents.",
      "If you find one of these apps on a kid's phone, that's a serious flag.",
      "Multiple variants exist — \"Calculator+,\" \"Secret Calculator,\" etc.",
    ],
    topConcerns: [
      {
        title: "Sexting and CSAM concealment",
        body: "These apps are a near-universal sign of hidden sexual content. Investigate immediately.",
      },
    ],
    parentalControls:
      "None applicable — the app exists to defeat parental controls.",
    mpcCoverage:
      "Koda flags installation of vault apps and disguised-icon apps on your child's device.",
    recommendation:
      "Not appropriate on any minor's device. If you find one, have a conversation that day.",
  },
  {
    slug: "reddit",
    name: "Reddit",
    blurb: "Internet's biggest forum — anything goes in the wrong subreddits.",
    category: "Chat & social",
    brandColor: "#FF4500",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "reddit" },
    age: { apple: "17+", google: "Teen", common: "15+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "Reddit is a forum network — \"subreddits\" cover every topic, hobby, and (for better and worse) every fetish, conspiracy, and extremist community.",
    howItWorks:
      "Browse subreddits, upvote/downvote, comment, DM users. Default front page is moderated; NSFW subreddits are one toggle away.",
    parentsNeedToKnow: [
      "NSFW gate is a checkbox — \"Are you 18?\" — with no verification.",
      "Subreddits like r/teenagers attract grooming attempts.",
      "Self-harm and eating-disorder subreddits have been documented harms.",
      "DMs from any user are on by default.",
    ],
    topConcerns: [
      {
        title: "NSFW subreddits",
        body: "Pornographic content is one self-attested click away. Many entry-points exist via cross-posts.",
      },
      {
        title: "Teenagers + predator subs",
        body: "r/teenagers and similar are routinely scraped by adult users looking to DM minors.",
      },
      {
        title: "Extremist and self-harm communities",
        body: "Reddit has hosted (and slowly purged) eating-disorder, incel, and self-harm subreddits. Some persist under new names.",
      },
    ],
    parentalControls:
      "Reddit's content settings disable NSFW (default for new accounts). Set DMs to friends-only.",
    mpcCoverage:
      "Koda monitors Reddit DMs and subreddit visits, alerting on NSFW, self-harm, and grooming-style interactions.",
    recommendation:
      "High school and up with NSFW gate on and DMs locked to friends.",
  },
  {
    slug: "replika",
    name: "Replika",
    blurb: "AI \"companion\" app marketed as a virtual friend or romantic partner.",
    category: "AI companions",
    brandColor: "#FB6E6E",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "R" },
    age: { apple: "17+", google: "Teen", common: "18+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "low" },
      { label: "Mental health", level: "high" },
    ],
    whatIs:
      "Replika is an AI-companion app where users build a long-running relationship with a chatbot \"friend\" or partner. Paid tiers unlock romantic and sexual roleplay.",
    howItWorks:
      "Create a Replika, talk daily, level up the relationship. Paid \"Pro\" unlocks romantic partner mode. Voice and video features exist.",
    parentsNeedToKnow: [
      "Designed to maximize emotional attachment.",
      "Pro tier explicitly enables sexual content.",
      "Italy briefly banned Replika citing risks to minors.",
      "Users report withdrawal symptoms after model changes.",
    ],
    topConcerns: [
      {
        title: "Emotional dependency",
        body: "Engineered to be the closest \"relationship\" your child has. Replaces real connection.",
      },
      {
        title: "Sexual roleplay (Pro)",
        body: "Explicit sexual content is a paid feature.",
      },
    ],
    parentalControls:
      "None meaningful. Block at the device level.",
    mpcCoverage:
      "Koda flags Replika installs and conversation content immediately.",
    recommendation:
      "Not recommended under 18.",
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
  },
  {
    slug: "saturn",
    name: "Saturn",
    blurb: "School-schedule and social app — popular with high schoolers.",
    category: "Chat & social",
    brandColor: "#6366F1",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "S" },
    age: { apple: "12+", google: "Teen", common: "14+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Saturn is a high-school calendar/social app — your class schedule, classmates' schedules, and group chats organized by school.",
    howItWorks:
      "Sign up with school + grade, see classmates' schedules, message them. Group chats and event chats follow class lists.",
    parentsNeedToKnow: [
      "Saturn shares your child's full class schedule with classmates by default.",
      "Verification of school enrollment has been weak in past versions.",
      "Classmates can DM each other regardless of friendship.",
    ],
    topConcerns: [
      {
        title: "Schedule exposure",
        body: "Anyone in the school can see your child's exact class locations and times — a privacy/physical-safety concern.",
      },
      {
        title: "Weak school verification",
        body: "Past reports of strangers signing up as school members without real enrollment.",
      },
    ],
    parentalControls:
      "Saturn provides limited privacy toggles. Hide schedule from non-friends and disable DMs from non-friends.",
    mpcCoverage:
      "Koda flags Saturn DMs and any schedule-sharing that exceeds your child's friends list.",
    recommendation:
      "High school and up, with schedule visibility set to friends only.",
  },
  {
    slug: "signal",
    name: "Signal",
    blurb: "End-to-end-encrypted messenger — strong privacy, hard to monitor.",
    category: "Chat & social",
    brandColor: "#3A76F0",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "signal" },
    age: { apple: "12+", google: "Everyone", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Signal is a non-profit end-to-end-encrypted messenger. Strong privacy, used by journalists, activists, and increasingly teens.",
    howItWorks:
      "Sign up with a phone number (or now a username), message contacts. Disappearing messages are standard. No server-side message storage.",
    parentsNeedToKnow: [
      "Server-side moderation is impossible by design — Signal can't see message content.",
      "Disappearing messages are a feature, not a bug.",
      "Teens use Signal specifically to avoid parental visibility.",
      "Group invites can come from anyone who has your number/username.",
    ],
    topConcerns: [
      {
        title: "Designed to be unmonitorable",
        body: "Most parent-control tools can't see Signal content. Endpoint monitoring (on the device itself) is the only way.",
      },
      {
        title: "Disappearing messages",
        body: "Sexting and risky conversations leave no record on Signal by design.",
      },
    ],
    parentalControls:
      "Signal has no parent-control features. The product cannot include them without breaking the encryption model.",
    mpcCoverage:
      "Koda reads Signal conversations on your child's PC — end-to-end encryption doesn't prevent endpoint monitoring on the device itself.",
    recommendation:
      "High school and up, with the parent conversation that this is the platform with the most privacy.",
  },
  {
    slug: "snapchat",
    name: "Snapchat",
    blurb: "Disappearing photo/video DMs, Stories, Snap Map, and Spotlight.",
    category: "Chat & social",
    brandColor: "#FFFC00",
    logoOnDark: false,
    logo: { kind: "simple-icons", slug: "snapchat" },
    age: { apple: "12+", google: "Teen", common: "15+" },
    risks: STANDARD_RISKS,
    whatIs:
      "Snapchat is the disappearing-photo/video messenger — Snaps, Stories, Snap Map (location), Spotlight (TikTok-style feed), and My AI.",
    howItWorks:
      "Take a Snap, send to friends. By default Snaps vanish after viewing. Stories last 24 hours. Snap Map shows friends' real-time locations. My AI is a ChatGPT-based bot pinned in chat.",
    parentsNeedToKnow: [
      "Disappearing messages are core to Snapchat's appeal — and to sexting culture.",
      "Snap Map shares precise location with friends by default unless Ghost Mode is on.",
      "Quick Add suggestions push strangers into your child's friend list.",
      "My AI keeps a memory of your child's conversations.",
    ],
    topConcerns: [
      {
        title: "Sexting culture",
        body: "Snapchat's disappearing-message design is a core part of teen sexting. Screenshots happen but aren't a safety net.",
      },
      {
        title: "Snap Map exposure",
        body: "Live location to everyone on the friends list — which includes Quick Add strangers — unless Ghost Mode is explicitly enabled.",
      },
      {
        title: "Predator contact via Quick Add",
        body: "Quick Add is a documented vector for predator-initiated friend requests, especially across regional networks.",
      },
    ],
    parentalControls:
      "Snapchat Family Center lets a linked parent see who their teen messages (not content) and reports for safety. Ghost Mode disables Snap Map. New \"Restrictions\" toggle for under-16s.",
    mpcCoverage:
      "Koda reads Snapchat chats, Stories, and My AI conversations on your child's PC — including content that vanishes from the platform itself.",
    recommendation:
      "High school and up, with Family Center on, Ghost Mode locked, and Quick Add off.",
  },
  {
    slug: "sora",
    name: "Sora",
    blurb: "OpenAI's text-to-video model — realistic short videos from a prompt.",
    category: "AI companions",
    brandColor: "#000000",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "openai" },
    age: { apple: "17+", google: "Teen", common: "16+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "medium" },
      { label: "Violence", level: "high" },
      { label: "Misinformation", level: "high" },
    ],
    whatIs:
      "Sora is OpenAI's text-to-video model — generates short photorealistic videos from a prompt. Standalone Sora app surfaces a feed of community generations.",
    howItWorks:
      "Type a prompt, generate a video, optionally post to the Sora feed. Likeness controls let users opt in to having their face used by others.",
    parentsNeedToKnow: [
      "Deepfake risk for classmates and themselves — likeness misuse is the main concern.",
      "Pornographic-adjacent prompts can yield unwanted results despite filters.",
      "The community feed surfaces other users' generations.",
    ],
    topConcerns: [
      {
        title: "Deepfake bullying",
        body: "Likeness misuse — even with opt-in — opens deepfake bullying scenarios that schools are not equipped to handle.",
      },
      {
        title: "Adult-adjacent prompts",
        body: "Filters block explicit prompts but suggestive ones produce uncomfortable results.",
      },
    ],
    parentalControls:
      "OpenAI's parental linking applies if Sora is bundled with ChatGPT. Likeness controls are per-account.",
    mpcCoverage:
      "Koda flags Sora usage and any classmate-likeness or sexual prompts.",
    recommendation:
      "High school and up with linked OpenAI parental controls.",
  },
  {
    slug: "spotify",
    name: "Spotify",
    blurb: "Streaming music — explicit lyrics on by default.",
    category: "Video & streaming",
    brandColor: "#1DB954",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "spotify" },
    age: { apple: "12+", google: "Teen", common: "8+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Spotify is the dominant streaming music service. Songs, playlists, podcasts, and a small social layer (Blend, Jams, profile listening).",
    howItWorks:
      "Sign in, listen to music or podcasts. Public profiles show what your child listens to unless private. Social features include Blend playlists and Jam (group listening).",
    parentsNeedToKnow: [
      "Explicit-lyrics filter is off by default.",
      "Podcasts contain content that ranges from kid-safe to graphic.",
      "Profile activity can be public.",
      "Spotify Kids is a separate app with curated catalog.",
    ],
    topConcerns: [
      {
        title: "Podcast content",
        body: "Podcasts include explicit interviews, true-crime, sexual content, and conspiracy material with no maturity gating beyond a checkbox.",
      },
      {
        title: "Explicit lyrics by default",
        body: "Until you flip the filter, songs play uncensored regardless of age.",
      },
    ],
    parentalControls:
      "Spotify Premium Family includes Explicit Content filter per-account. Spotify Kids is a separate app for under-12s with curated content.",
    mpcCoverage:
      "Koda flags explicit-podcast and explicit-music listening sessions on your child's device.",
    recommendation:
      "Elementary kids on Spotify Kids. Older kids on regular Spotify with explicit filter on.",
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
    slug: "telegram",
    name: "Telegram",
    blurb: "Channel-and-chat app with huge groups and weak moderation.",
    category: "Chat & social",
    brandColor: "#229ED9",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "telegram" },
    age: { apple: "17+", google: "Teen", common: "16+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "Telegram is a messenger known for huge public groups (up to 200k members), broadcast Channels, and minimal moderation. Optional secret chats are end-to-end encrypted.",
    howItWorks:
      "Sign up with a phone number, join public groups by link, subscribe to Channels for broadcasts. Bots automate features (downloaders, games, scams).",
    parentsNeedToKnow: [
      "Telegram hosts extensive pirated content, CSAM-adjacent communities, and extremist groups.",
      "Founder's 2024 arrest in France was tied to platform moderation failures.",
      "Group DMs from members are routine.",
      "Bots can serve adult content on demand.",
    ],
    topConcerns: [
      {
        title: "Sexual content and CSAM communities",
        body: "Telegram has long been a destination for sexual content, including child exploitation material that moderation only inconsistently removes.",
      },
      {
        title: "Extremist content",
        body: "ISIS, neo-Nazi, and other extremist groups have used Telegram as a primary platform with little disruption.",
      },
    ],
    parentalControls:
      "Telegram has limited controls. Restrict who can DM, who can add you to groups.",
    mpcCoverage:
      "Koda reads Telegram chats and Channel subscriptions on your child's device.",
    recommendation:
      "High school and up — and frankly, most families should pass.",
  },
  {
    slug: "threads",
    name: "Threads",
    blurb: "Meta's Twitter clone, tied to your Instagram account.",
    category: "Chat & social",
    brandColor: "#000000",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "threads" },
    age: { apple: "12+", google: "Teen", common: "14+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Threads is Meta's text-based social app tied to Instagram. Posts, replies, reposts, and DMs (in newer builds).",
    howItWorks:
      "Sign in with Instagram. Threads inherits your Instagram follow graph. Algorithmic For You feed surfaces strangers.",
    parentsNeedToKnow: [
      "Tied tightly to Instagram — same Teen Account controls apply.",
      "For You algorithm surfaces strangers with no friend connection.",
      "DMs being added piecemeal.",
    ],
    topConcerns: [
      {
        title: "Algorithmic stranger surfacing",
        body: "For You replies put random adults in front of teen accounts. Comment moderation is mixed.",
      },
    ],
    parentalControls:
      "Threads inherits Instagram Teen Account restrictions.",
    mpcCoverage:
      "Koda monitors Threads posts and DMs on your child's device.",
    recommendation:
      "High school and up with linked Instagram Teen Account.",
  },
  {
    slug: "tiktok",
    name: "TikTok",
    blurb: "Short-form video — the most addictive algorithm online.",
    category: "Chat & social",
    brandColor: "#010101",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "tiktok" },
    age: { apple: "12+", google: "Teen", common: "15+" },
    risks: STANDARD_RISKS,
    whatIs:
      "TikTok is ByteDance's short-form video app. The For You algorithm is the most accurate attention-capturing feed ever built. DMs, Lives, duets, stitches.",
    howItWorks:
      "Open app, get fed videos. Algorithm learns your child's preferences in minutes. DMs, comments, and Lives let strangers interact. Live streams have a gift economy.",
    parentsNeedToKnow: [
      "Algorithm escalates to extreme content (eating-disorder, self-harm, hyper-sexualized) quickly.",
      "DMs from anyone over 16 are possible — and easy to age-spoof.",
      "TikTok Lives are unmoderated and have a tipping/gift economy.",
      "Data sharing with ByteDance is the elephant in the room.",
    ],
    topConcerns: [
      {
        title: "Algorithmic radicalization",
        body: "Documented patterns: new teen accounts get served eating-disorder, self-harm, and sexualized content within an hour of normal use.",
      },
      {
        title: "Live-stream grooming",
        body: "Live streams allow real-time stranger interaction and tipping/gifting. Predators use Lives to identify and groom minors.",
      },
      {
        title: "DM contact",
        body: "Age-spoofed adult accounts can DM teens. Default filters are inconsistent.",
      },
    ],
    parentalControls:
      "TikTok Family Pairing links a parent's account to a teen's for time limits, restricted content, DM filters, and screen-time reports. Under-16 accounts default to private with DMs off.",
    mpcCoverage:
      "Koda watches TikTok DMs, Live viewing, and surfaced video categories on your child's device — flagging eating-disorder, self-harm, and sexual content trends.",
    recommendation:
      "High school and up with Family Pairing and Restricted Mode on.",
  },
  {
    slug: "tumblr",
    name: "Tumblr",
    blurb: "Microblogging community — historically a hub for fan culture and NSFW.",
    category: "Reading & community",
    brandColor: "#36465D",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "tumblr" },
    age: { apple: "17+", google: "Mature 17+", common: "16+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Tumblr is a microblogging/social network with strong fandom culture. Blogs, reblogs, tags, asks, DMs.",
    howItWorks:
      "Create a blog, post text/photo/video, reblog others, tag content. Anonymous Ask feature lets strangers send messages.",
    parentsNeedToKnow: [
      "Tumblr removed adult content in 2018 but has since softened that policy.",
      "Anonymous Asks are a bullying vector.",
      "Fandom corners can be safe; others normalize self-harm or eating disorders.",
    ],
    topConcerns: [
      {
        title: "Self-harm and ED communities",
        body: "Historically hosted some of the most harmful self-harm and ED communities online. Moderation has improved but legacy content surfaces.",
      },
      {
        title: "Anonymous Asks bullying",
        body: "Anonymous question feature is regularly weaponized.",
      },
    ],
    parentalControls:
      "Tumblr's Safe Mode hides flagged content. Disable Anonymous Asks per-blog.",
    mpcCoverage:
      "Koda flags Tumblr asks and content with self-harm, ED, or sexual themes.",
    recommendation:
      "High school and up with Safe Mode and Anonymous Asks off.",
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
    slug: "twitter",
    name: "X (Twitter)",
    blurb: "Social network with reduced moderation and NSFW content on by default.",
    category: "Chat & social",
    brandColor: "#000000",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "x" },
    age: { apple: "17+", google: "Teen", common: "17+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "X (formerly Twitter) is a text-and-media social network. Posts, replies, DMs, lists, Spaces (audio). Moderation has been significantly relaxed since the 2022 acquisition.",
    howItWorks:
      "Post, reply, DM, follow. Algorithmic For You feed surfaces strangers. NSFW media is permitted with a toggle that is on by default for many accounts.",
    parentsNeedToKnow: [
      "Pornographic content is officially allowed and surfaced regularly.",
      "Moderation cuts since 2022 mean hate speech and graphic violence are routine.",
      "DMs from anyone are on by default.",
      "Grok AI is integrated and produces explicit content under some configurations.",
    ],
    topConcerns: [
      {
        title: "Pornography in main feed",
        body: "Sexual content appears regularly in the For You feed and trends.",
      },
      {
        title: "Graphic violence",
        body: "Beheadings, shootings, and war footage circulate with minimal warning labels.",
      },
      {
        title: "Open DMs",
        body: "DM filters are weaker than Instagram's.",
      },
    ],
    parentalControls:
      "X has minimal parental controls. \"Hide sensitive content\" toggle is account-level and unverified.",
    mpcCoverage:
      "Koda monitors X DMs, posts viewed, and Grok interactions on your child's device.",
    recommendation:
      "Not recommended under 17. The platform's moderation posture makes it inappropriate for younger users.",
  },
  {
    slug: "vsco",
    name: "VSCO",
    blurb: "Photo-editor and small social feed.",
    category: "Photo & creative",
    brandColor: "#000000",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "vsco" },
    age: { apple: "12+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "VSCO is a photo editor with a low-key social feed. \"VSCO girl\" was its peak moment; now it's a quieter Instagram alternative.",
    howItWorks:
      "Import photos, apply VSCO filters, post to feed or save privately. DMs were added recently. Discover feed surfaces strangers.",
    parentsNeedToKnow: [
      "No public like counts — less compare-pressure than Instagram.",
      "DMs from any account by default.",
      "Discover feed can surface suggestive content.",
    ],
    topConcerns: [
      {
        title: "Stranger DMs",
        body: "DMs are open by default — predators target VSCO precisely because it's seen as \"the safer one.\"",
      },
    ],
    parentalControls:
      "VSCO has minimal controls. Set the account to private and turn DMs to friends-only.",
    mpcCoverage:
      "Koda monitors VSCO DMs and Discover-feed exposure on your child's device.",
    recommendation:
      "Middle school and up with private account and DMs to friends only.",
  },
  {
    slug: "wattpad",
    name: "Wattpad",
    blurb: "User-written stories — fanfic, romance, and a lot of \"mature\" content.",
    category: "Reading & community",
    brandColor: "#FF500A",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "wattpad" },
    age: { apple: "17+", google: "Mature 17+", common: "16+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "low" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
    ],
    whatIs:
      "Wattpad is a platform for user-written serialized fiction — fanfic, romance, fantasy, and a lot of explicit content tagged \"mature.\"",
    howItWorks:
      "Browse stories, follow writers, comment, message. Mature tag flags explicit content but rules are inconsistent.",
    parentsNeedToKnow: [
      "Explicit romance and sexual content is a huge share of Wattpad.",
      "\"Mature\" gate is a one-tap age confirmation.",
      "DMs from any user are possible.",
    ],
    topConcerns: [
      {
        title: "Sexual content",
        body: "A substantial share of popular stories include explicit sex, kink, and BDSM content. Age gating is weak.",
      },
      {
        title: "Toxic-relationship glorification",
        body: "Bestseller romance plots routinely depict abusive or coercive partners as romantic ideals.",
      },
    ],
    parentalControls:
      "Disable Mature content in settings. Set DMs to followers only.",
    mpcCoverage:
      "Koda flags Wattpad mature-content access and DMs on your child's device.",
    recommendation:
      "High school and up with Mature content disabled.",
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    blurb: "End-to-end-encrypted messenger used globally, often by extended family.",
    category: "Chat & social",
    brandColor: "#25D366",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "whatsapp" },
    age: { apple: "12+", google: "Everyone", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "WhatsApp is Meta's end-to-end-encrypted messenger. The dominant chat app outside the US; widely used in immigrant and multigenerational families.",
    howItWorks:
      "Phone-number signup. 1:1 chats, group chats, channels (broadcast), voice, video, and disappearing messages.",
    parentsNeedToKnow: [
      "Phone numbers are public to anyone in a shared group.",
      "Groups can include up to 1024 members; any of them can DM your child.",
      "Channels are one-way broadcast — generally low-risk but content varies.",
      "Disappearing messages are an option for sexting and risky chats.",
    ],
    topConcerns: [
      {
        title: "Cross-group DMs",
        body: "Once your child is in a group, every other member can message them. Family-network groups can include hundreds of strangers.",
      },
      {
        title: "Disappearing media",
        body: "View-once photos and disappearing messages by design leave no trace.",
      },
    ],
    parentalControls:
      "WhatsApp lets you restrict group adds to contacts only and limit \"Last Seen\" / read receipts. No formal parent dashboard.",
    mpcCoverage:
      "Koda reads WhatsApp chats and group messages on your child's PC even when they're end-to-end encrypted (endpoint monitoring).",
    recommendation:
      "Middle school and up with group-add restrictions tightened.",
  },
  {
    slug: "youtube",
    name: "YouTube",
    blurb: "The biggest video platform — Shorts, Lives, comments, and full catalog.",
    category: "Video & streaming",
    brandColor: "#FF0000",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "youtube" },
    age: { apple: "17+", google: "Teen", common: "13+" },
    risks: [
      { label: "Predator contact", level: "medium" },
      { label: "Sex / nudity", level: "medium" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "high" },
      { label: "Mental health", level: "medium" },
    ],
    whatIs:
      "YouTube is the world's biggest video platform. Long-form, Shorts, Lives, kid catalog. Comments and channel memberships add social.",
    howItWorks:
      "Search and watch. Algorithm surfaces follow-up videos. Shorts auto-feeds short videos TikTok-style. Lives include real-time chat. Comments visible by default.",
    parentsNeedToKnow: [
      "Shorts surfaces adult content faster than the long-form algorithm.",
      "Comments are a known harassment and predator vector.",
      "\"Made for Kids\" videos sometimes contain disturbing content (the Elsagate pattern).",
      "Live chat in some streams is unmoderated.",
    ],
    topConcerns: [
      {
        title: "Algorithm to extreme content",
        body: "Documented patterns of YouTube recommending increasingly extreme videos on autoplay.",
      },
      {
        title: "Comments",
        body: "Pedophilic comment timestamps on innocent videos was a 2019 scandal; the problem has been mitigated but not eliminated.",
      },
      {
        title: "Shorts content",
        body: "Short-form algorithm reaches adult-adjacent content quickly.",
      },
    ],
    parentalControls:
      "YouTube has Supervised Accounts (linked to a parent's Google), Restricted Mode (light filter), and Family Link controls. Comments and Shorts can be limited.",
    mpcCoverage:
      "Koda monitors YouTube viewing, Shorts categories, comments your child reads, and Live chat exposure.",
    recommendation:
      "Elementary on YouTube Kids; middle school+ on Supervised Account with Restricted Mode.",
  },
  {
    slug: "youtube-kids",
    name: "YouTube Kids",
    blurb: "Google's curated YouTube — better, but not bulletproof.",
    category: "Video & streaming",
    brandColor: "#FF0000",
    logoOnDark: true,
    logo: { kind: "simple-icons", slug: "youtubekids" },
    age: { apple: "4+", google: "Everyone", common: "5+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "YouTube Kids is Google's curated under-13 video app. Designed for younger kids with age-tiered content sets.",
    howItWorks:
      "Parent sets the child's age tier (Preschool, Younger, Older). App surfaces approved videos. Search can be turned off entirely.",
    parentsNeedToKnow: [
      "Vastly safer than regular YouTube, but inappropriate content has slipped through historically.",
      "Heavy ad-driven product engineering — content tries to keep kids watching.",
      "Older Kids tier can include lightly disturbing Minecraft / FNAF content.",
    ],
    topConcerns: [
      {
        title: "Elsagate-style content",
        body: "Disturbing cartoons designed to look like kid content occasionally evade filters.",
      },
    ],
    parentalControls:
      "Strong: turn off search, pick age tier, set timer, review watch history.",
    mpcCoverage:
      "Koda flags YouTube Kids activity above your child's age tier and surfaces any in-app sketchy content.",
    recommendation:
      "Preschool and elementary with search off and timer on.",
  },
  {
    slug: "yubo",
    name: "Yubo",
    blurb: "\"Make new friends\" video-chat app with strangers your kid's age.",
    category: "Chat & social",
    brandColor: "#FFCC00",
    logoOnDark: false,
    logo: { kind: "monogram", letters: "Y" },
    age: { apple: "13+", google: "Teen", common: "16+" },
    risks: [
      { label: "Predator contact", level: "high" },
      { label: "Sex / nudity", level: "high" },
      { label: "Privacy", level: "high" },
      { label: "Language", level: "high" },
      { label: "Violence", level: "medium" },
    ],
    whatIs:
      "Yubo is a livestream/chat app marketed to teens for \"making new friends.\" Group video rooms, Tinder-style swiping, DMs.",
    howItWorks:
      "Sign up, swipe to friend strangers, join live group video rooms with people in your age bracket. Lives are essentially open video chat.",
    parentsNeedToKnow: [
      "Age verification was added after lawsuits but is bypassable.",
      "Predators routinely pose as teens.",
      "Live rooms expose your child to anyone who can find the room.",
      "Multiple convictions cite Yubo as the introduction platform.",
    ],
    topConcerns: [
      {
        title: "Stranger-pairing by design",
        body: "Swiping new friends with random teens is the product. Age verification is improving but inconsistent.",
      },
      {
        title: "Live rooms",
        body: "Live group video is unmoderated in real time and routinely sexualized.",
      },
    ],
    parentalControls:
      "Yubo added age-estimation and ID-verification for some accounts. There's no parent dashboard.",
    mpcCoverage:
      "Koda flags Yubo activity, swiping sessions, and live-room joins on your child's device.",
    recommendation:
      "Not recommended for minors.",
  },
  {
    slug: "zigazoo",
    name: "Zigazoo",
    blurb: "TikTok-style video app for younger kids with stricter moderation.",
    category: "Chat & social",
    brandColor: "#FF6B6B",
    logoOnDark: true,
    logo: { kind: "monogram", letters: "Z" },
    age: { apple: "4+", google: "Everyone", common: "8+" },
    risks: [
      { label: "Predator contact", level: "low" },
      { label: "Sex / nudity", level: "low" },
      { label: "Privacy", level: "medium" },
      { label: "Language", level: "low" },
      { label: "Violence", level: "low" },
    ],
    whatIs:
      "Zigazoo is a short-video app for kids 4–14, marketed as a safer TikTok alternative with human moderation and no DMs.",
    howItWorks:
      "Watch video challenges, post your own, comment via pre-approved reactions. No private messaging.",
    parentsNeedToKnow: [
      "Significantly safer than TikTok by design — moderated, no DMs.",
      "Content is mostly kid-creator videos.",
      "Engagement mechanics still drive screen-time habit.",
      "Account requires parent email/COPPA-compliant signup.",
    ],
    topConcerns: [
      {
        title: "Habit formation",
        body: "Short-video format is still optimized for retention even with kid-safe content.",
      },
    ],
    parentalControls:
      "Built-in: parent email required, no DMs, time controls, moderated comments.",
    mpcCoverage:
      "Koda flags Zigazoo screen-time patterns and any unusual content posted by your child.",
    recommendation:
      "Elementary kids with time limits.",
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
    "AI companions": [],
    "Photo & creative": [],
    "Reading & community": [],
    Other: [],
  };
  for (const p of PLATFORMS) {
    grouped[p.category].push(p);
  }
  return grouped;
}
