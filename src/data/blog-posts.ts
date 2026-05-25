import type { EditorialContributorId } from "./editorial";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type RelatedLink = {
  label: string;
  href: string;
};

export type BlogSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  accessed: string;
  note: string;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogTrustFields = {
  authorId: EditorialContributorId;
  reviewerId: EditorialContributorId;
  dateModified: string;
  lastReviewed: string;
  quickAnswer: string;
  researchMethod: string;
  sources: BlogSource[];
  faqs: BlogFaq[];
  about: string[];
  mentions: string[];
};

export type BaseBlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  excerpt: string;
  category: "Guide" | "Safety" | "Comparison" | "Platform" | "Threat";
  takeaways: string[];
  sections: BlogSection[];
  relatedLinks: RelatedLink[];
};

export type BlogPost = BaseBlogPost & BlogTrustFields;

const SOURCE_LIBRARY = {
  openaiSearch:
    {
      id: "openai-search",
      title: "ChatGPT Search publisher guidance",
      publisher: "OpenAI Help Center",
      url: "https://help.openai.com/en/articles/9237897-chatgpt-search",
      accessed: "5/24/2026",
      note: "Used for ChatGPT search availability, citations, and OAI-SearchBot crawl guidance.",
    },
  openaiBots:
    {
      id: "openai-bots",
      title: "Overview of OpenAI crawlers",
      publisher: "OpenAI Developers",
      url: "https://developers.openai.com/api/docs/bots",
      accessed: "5/24/2026",
      note: "Used for OAI-SearchBot, GPTBot, and ChatGPT-User crawler distinctions.",
    },
  anthropicSearch:
    {
      id: "anthropic-search",
      title: "Enabling and using web search",
      publisher: "Claude Help Center",
      url: "https://support.claude.com/en/articles/10684626-enabling-and-using-web-search",
      accessed: "5/24/2026",
      note: "Used for Claude web search citation behavior and web fetch notes.",
    },
  anthropicBots:
    {
      id: "anthropic-bots",
      title: "Anthropic crawler and robots.txt guidance",
      publisher: "Claude Help Center",
      url: "https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler",
      accessed: "5/24/2026",
      note: "Used for ClaudeBot, Claude-SearchBot, and Claude-User crawler distinctions.",
    },
  googleHelpful:
    {
      id: "google-helpful-content",
      title: "Creating helpful, reliable, people-first content",
      publisher: "Google Search Central",
      url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
      accessed: "5/24/2026",
      note: "Used for people-first content, E-E-A-T, and the Who/How/Why framework.",
    },
  googleArticleSchema:
    {
      id: "google-article-schema",
      title: "Article structured data",
      publisher: "Google Search Central",
      url: "https://developers.google.com/search/docs/appearance/structured-data/article",
      accessed: "5/24/2026",
      note: "Used for Article/BlogPosting author, image, and date structured-data recommendations.",
    },
  googleStructuredData:
    {
      id: "google-structured-data",
      title: "Structured data general guidelines",
      publisher: "Google Search Central",
      url: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies",
      accessed: "5/24/2026",
      note: "Used to keep JSON-LD aligned with visible page content.",
    },
  bingResults:
    {
      id: "bing-results",
      title: "How Bing delivers search results",
      publisher: "Microsoft Support",
      url: "https://support.microsoft.com/en-us/bing/how-bing-delivers-search-results",
      accessed: "5/24/2026",
      note: "Used for relevance, quality, credibility, freshness, and authority signals in Bing-backed search.",
    },
  geoPaper:
    {
      id: "geo-paper",
      title: "GEO: Generative Engine Optimization",
      publisher: "Princeton University / ACM SIGKDD 2024",
      url: "https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/",
      accessed: "5/24/2026",
      note: "Used for citation-ready content strategy and generative-engine visibility research.",
    },
  robloxParents:
    {
      id: "roblox-parents",
      title: "Roblox parents and safety resources",
      publisher: "Roblox",
      url: "https://corp.roblox.com/parents/",
      accessed: "5/24/2026",
      note: "Used for Roblox family safety, social features, and parent setup context.",
    },
  robloxSafety:
    {
      id: "roblox-safety",
      title: "Roblox safety and civility",
      publisher: "Roblox",
      url: "https://corp.roblox.com/safety-civility/",
      accessed: "5/24/2026",
      note: "Used for Roblox moderation, safety systems, and platform safety positioning.",
    },
  discordFamily:
    {
      id: "discord-family-center",
      title: "Family Center for parents and guardians",
      publisher: "Discord Support",
      url: "https://support.discord.com/hc/en-us/articles/14155043715735-Family-Center-for-Parents-and-Guardians",
      accessed: "5/24/2026",
      note: "Used for Discord Family Center capabilities and limitations.",
    },
  discordSafety:
    {
      id: "discord-safety-center",
      title: "Discord Safety Center",
      publisher: "Discord",
      url: "https://discord.com/safety",
      accessed: "5/24/2026",
      note: "Used for Discord safety policies, privacy controls, and teen safety framing.",
    },
  epicControls:
    {
      id: "epic-parental-controls",
      title: "Epic Games parental controls",
      publisher: "Epic Games Safety Center",
      url: "https://safety.epicgames.com/en-US/parental-controls",
      accessed: "5/24/2026",
      note: "Used for Fortnite/Epic parental control setup and cabined-account context.",
    },
  epicSafety:
    {
      id: "epic-safety-center",
      title: "Epic Games Safety Center",
      publisher: "Epic Games",
      url: "https://safety.epicgames.com/en-US/",
      accessed: "5/24/2026",
      note: "Used for Fortnite safety, voice/text settings, and family safety context.",
    },
  minecraftControls:
    {
      id: "minecraft-parental-controls",
      title: "Minecraft parental controls",
      publisher: "Minecraft",
      url: "https://www.minecraft.net/en-us/article/parental-controls",
      accessed: "5/24/2026",
      note: "Used for Minecraft account, multiplayer, and family-safety setup context.",
    },
  xboxFamily:
    {
      id: "xbox-family-safety",
      title: "Xbox family safety and privacy settings",
      publisher: "Xbox Support",
      url: "https://support.xbox.com/en-US/help/family-online-safety/online-safety/manage-app-privacy-settings-xbox-one",
      accessed: "5/24/2026",
      note: "Used for Microsoft/Xbox privacy settings that affect Minecraft and PC gaming.",
    },
  ncmec:
    {
      id: "ncmec-netsmartz",
      title: "NetSmartz online safety education",
      publisher: "National Center for Missing & Exploited Children",
      url: "https://www.missingkids.org/netsmartz/home",
      accessed: "5/24/2026",
      note: "Used for parent education around online enticement and safety conversations.",
    },
  fbi:
    {
      id: "fbi-online-safety",
      title: "Online safety guidance",
      publisher: "Federal Bureau of Investigation",
      url: "https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-scams-and-crimes/online-safety",
      accessed: "5/24/2026",
      note: "Used for online exploitation warning signs and family safety guidance.",
    },
  ftc:
    {
      id: "ftc-child-online-safety",
      title: "How to protect your child online",
      publisher: "Federal Trade Commission",
      url: "https://consumer.ftc.gov/articles/how-protect-your-child-online",
      accessed: "5/24/2026",
      note: "Used for practical parent guidance around privacy, conversations, and online safety.",
    },
  thorn:
    {
      id: "thorn-research",
      title: "Research on online child safety",
      publisher: "Thorn",
      url: "https://www.thorn.org/research/",
      accessed: "5/24/2026",
      note: "Used for broader research context around online grooming and child exploitation risks.",
    },
  barkFeatures:
    {
      id: "bark-features",
      title: "Bark parental control features",
      publisher: "Bark",
      url: "https://www.bark.us/features/",
      accessed: "5/24/2026",
      note: "Used for comparison context around broad family monitoring capabilities.",
    },
  barkHome:
    {
      id: "bark-home",
      title: "Bark parental controls",
      publisher: "Bark",
      url: "https://www.bark.us/",
      accessed: "5/24/2026",
      note: "Used for Bark positioning and feature comparison context.",
    },
} satisfies Record<string, BlogSource>;

type SourceKey = keyof typeof SOURCE_LIBRARY;

const CHILD_SAFETY_SOURCE_KEYS = [
  "ncmec",
  "fbi",
  "ftc",
  "thorn",
] satisfies SourceKey[];

const PLATFORM_SOURCE_KEYS = {
  roblox: ["robloxParents", "robloxSafety"] satisfies SourceKey[],
  discord: ["discordFamily", "discordSafety"] satisfies SourceKey[],
  fortnite: ["epicControls", "epicSafety"] satisfies SourceKey[],
  minecraft: ["minecraftControls", "xboxFamily"] satisfies SourceKey[],
  bark: ["barkFeatures", "barkHome"] satisfies SourceKey[],
};

const RAW_BLOG_POSTS: BaseBlogPost[] = [
  {
    slug: "what-is-koda-safety",
    title: "What Is Koda Safety?",
    date: "5/23/2026",
    category: "Guide",
    description:
      "Learn what Koda Safety is, how it helps parents monitor PC gaming risks, and where it fits alongside traditional parental controls.",
    excerpt:
      "Koda Safety is the gaming-first layer for parents who need clearer visibility into voice chat, game DMs, and risky online conversations.",
    takeaways: [
      "Koda Safety is built around PC games, game chat, voice risk, and parent alerts.",
      "It complements device limits and web filters instead of replacing every family rule.",
      "The goal is useful context, not vague warnings or constant screen policing.",
    ],
    relatedLinks: [
      { label: "Koda Safety overview", href: "/koda-safety" },
      { label: "Game Safety guides", href: "/game-safety" },
      { label: "Safety and privacy", href: "/safety-privacy" },
    ],
    sections: [
      {
        heading: "Koda Safety in plain English",
        paragraphs: [
          "Koda Safety is a parental control system for families whose kids spend real time in PC games and online chat. It is designed to help parents understand what is happening inside games, voice calls, DMs, and platform conversations where generic screen-time tools usually lose context.",
          "Instead of only telling a parent that a child used a device for two hours, Koda focuses on the moments that matter: grooming language, bullying, threats, self-harm signals, sexual content, and other risky conversations.",
        ],
      },
      {
        heading: "Why families search for it",
        paragraphs: [
          "Parents often discover that native parental controls can block apps or set limits, but they do not explain what was said in a Discord call, a Roblox chat, a Fortnite party, or a Minecraft server. Koda Safety is built for that visibility gap.",
        ],
        bullets: [
          "Real-time alerts when risky language appears.",
          "Context that helps parents talk calmly with their child.",
          "Coverage for gaming and chat environments, not just websites.",
        ],
      },
      {
        heading: "What makes Koda different",
        paragraphs: [
          "Koda Safety is not trying to be another broad, generic dashboard. The product starts with gaming behavior because that is where a lot of kids socialize now. If a child spends more time in Roblox, Minecraft, Fortnite, Discord, or Steam than in a browser, parents need tools built around those habits.",
        ],
      },
      {
        heading: "Where to start",
        paragraphs: [
          "Start with the Koda Safety overview, then review the platforms your child actually uses. A practical setup begins with the places where your child talks to strangers, joins servers, plays with friends, and receives messages.",
        ],
      },
    ],
  },
  {
    slug: "is-koda-safe-for-families",
    title: "Is Koda Safe for Families?",
    date: "5/23/2026",
    category: "Safety",
    description:
      "A parent-focused look at Koda Safety, family privacy, child data, alerts, and how parents should use monitoring responsibly.",
    excerpt:
      "Koda Safety is designed to help parents spot serious online risks while keeping the family conversation at the center.",
    takeaways: [
      "Koda should be used as a safety tool, not a substitute for parent-child trust.",
      "Parents should tell kids what is being monitored and why.",
      "Privacy, retention, and deletion policies should stay easy to find.",
    ],
    relatedLinks: [
      { label: "Safety and privacy", href: "/safety-privacy" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Koda Safety overview", href: "/koda-safety" },
    ],
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Koda Safety is built for family safety use cases: helping parents identify risky conversations, bullying, grooming signals, threats, and harmful language in online spaces where kids already spend time.",
          "A healthy rollout still matters. Parents should explain what Koda monitors, why it is being used, and how alerts will be handled. Monitoring works best when it supports calm conversations instead of surprise punishment.",
        ],
      },
      {
        heading: "What Koda is for",
        paragraphs: [
          "Koda is for families that need more context than screen time or web filters can provide. It is especially useful when a child plays multiplayer games, joins voice channels, uses Discord, or moves between gaming communities and social apps.",
        ],
        bullets: [
          "Spot dangerous or escalating conversations.",
          "Give parents enough context to respond quickly.",
          "Help parents keep kids connected without ignoring real risks.",
        ],
      },
      {
        heading: "What Koda is not for",
        paragraphs: [
          "Koda is not a replacement for family rules, direct conversations, or age-appropriate boundaries. It should not be used to shame kids for normal mistakes or private feelings. The strongest use case is high-signal safety risk, not micromanaging every message.",
        ],
      },
      {
        heading: "A responsible setup",
        paragraphs: [
          "Set expectations before installation. Tell your child which devices and apps are covered, what kinds of alerts matter, and what will happen when an alert appears. That transparency makes Koda Safety feel more like a seatbelt and less like a trap.",
        ],
      },
    ],
  },
  {
    slug: "koda-safety-for-pc-games",
    title: "Koda Safety for PC Games",
    date: "5/23/2026",
    category: "Guide",
    description:
      "How Koda Safety helps parents monitor PC gaming voice chat, game text chat, DMs, and risky multiplayer conversations.",
    excerpt:
      "PC gaming safety is different from phone safety because the most important conversations happen inside live games and voice channels.",
    takeaways: [
      "PC games create fast-moving risk because chat, voice, and strangers mix in real time.",
      "Koda Safety focuses on the conversation layer of gaming.",
      "Parents should pair alerts with platform controls and family rules.",
    ],
    relatedLinks: [
      { label: "Koda Safety overview", href: "/koda-safety" },
      { label: "Roblox safety guide", href: "/blog/koda-safety-for-roblox" },
      { label: "Discord safety guide", href: "/blog/koda-safety-for-discord" },
    ],
    sections: [
      {
        heading: "Why PC gaming needs its own safety layer",
        paragraphs: [
          "PC games are not just games anymore. They are hangout spaces with voice chat, party invites, server communities, direct messages, usernames, mods, and links to other platforms. That makes PC gaming safety a different problem than simple screen time.",
          "A child can be in a harmless match one minute and a risky private chat the next. Koda Safety is built to watch for those moments and alert parents when something actually needs attention.",
        ],
      },
      {
        heading: "What Koda looks for",
        paragraphs: [
          "Koda focuses on signals parents are most likely to miss during live gameplay.",
        ],
        bullets: [
          "Grooming language and isolation tactics.",
          "Bullying, harassment, slurs, and threats.",
          "Sexual content or requests for images.",
          "Self-harm signals and dangerous escalation.",
          "Attempts to move a child from a public game to a private channel.",
        ],
      },
      {
        heading: "How to use it with built-in controls",
        paragraphs: [
          "Built-in game and device controls are still useful. Use them to set age limits, restrict strangers, and manage playtime. Use Koda Safety for the part those tools rarely cover well: what was actually said and whether the conversation needs a parent.",
        ],
      },
      {
        heading: "The parent workflow",
        paragraphs: [
          "A good workflow is simple: install Koda on the gaming device, review the platforms your child uses, set expectations at home, and respond to alerts with curiosity before consequences. The product should make the conversation easier, not louder.",
        ],
      },
    ],
  },
  {
    slug: "koda-safety-vs-bark",
    title: "Koda Safety vs Bark: Which Is Better for Gaming?",
    date: "5/23/2026",
    category: "Comparison",
    description:
      "Compare Koda Safety and Bark for parents worried about PC games, Discord, Roblox, Fortnite, Minecraft, and gaming voice chat.",
    excerpt:
      "Bark is broad family monitoring. Koda Safety is specialized for PC games, gaming chat, and voice risk.",
    takeaways: [
      "Choose Koda Safety when the main concern is PC gaming chat and voice risk.",
      "Choose Bark when the main concern is broad phone, web, and social monitoring.",
      "Many families compare both because the products solve overlapping but different problems.",
    ],
    relatedLinks: [
      { label: "Koda Safety overview", href: "/koda-safety" },
      { label: "Original Bark comparison", href: "/blog/koda-vs-bark" },
      { label: "Pricing", href: "/#pricing" },
    ],
    sections: [
      {
        heading: "Quick verdict",
        paragraphs: [
          "Koda Safety is the better fit if your child spends serious time in PC games and your main worry is what happens in live chat, voice channels, Discord servers, Roblox, Fortnite, Minecraft, or similar gaming spaces.",
          "Bark is the better fit if you want broad coverage across phones, email, social media, screen time, web filtering, and location. The right choice depends on where the risk actually shows up for your child.",
        ],
      },
      {
        heading: "Where Koda Safety is strongest",
        paragraphs: [
          "Koda Safety is built around gaming-specific signals. It is strongest when parents need visibility into conversations, not just app usage.",
        ],
        bullets: [
          "PC gaming voice and text chat.",
          "Gaming platforms where strangers interact with kids.",
          "Alerts with context parents can use quickly.",
          "Families who do not want to ban every game but do want safety visibility.",
        ],
      },
      {
        heading: "Where Bark is strongest",
        paragraphs: [
          "Bark is a mature, broad parental-control option. It is strongest for families who want a general monitoring layer across phones, social platforms, email, screen time, filtering, and location-oriented features.",
        ],
      },
      {
        heading: "A practical way to choose",
        paragraphs: [
          "Look at the last three concerning moments you have had as a parent. If they happened in phone apps, browsing, or location issues, Bark may match the problem. If they happened during PC gaming, voice chat, game DMs, or Discord, Koda Safety is probably the sharper fit.",
        ],
      },
    ],
  },
  {
    slug: "koda-safety-for-roblox",
    title: "Koda Safety for Roblox",
    date: "5/23/2026",
    category: "Platform",
    description:
      "How Koda Safety helps parents think about Roblox chat, voice, DMs, servers, and stranger contact risks.",
    excerpt:
      "Roblox safety is about more than whether a game looks kid-friendly. The risk often lives in chat, voice, servers, and friend requests.",
    takeaways: [
      "Roblox combines user-generated games, chat, avatars, and social pressure.",
      "Parents should use Roblox native controls and monitor communication patterns.",
      "Koda Safety gives parents another layer of context around risky conversations.",
    ],
    relatedLinks: [
      { label: "Roblox platform page", href: "/platforms/roblox" },
      { label: "Koda Safety overview", href: "/koda-safety" },
      { label: "PC gaming safety", href: "/blog/koda-safety-for-pc-games" },
    ],
    sections: [
      {
        heading: "Why Roblox needs close attention",
        paragraphs: [
          "Roblox is a game platform, a social network, and a creator economy in one. Kids can move between games, chat with other players, receive friend requests, join private servers, and be exposed to content that does not match the friendly visual style.",
        ],
      },
      {
        heading: "Common Roblox risks",
        paragraphs: [
          "Parents should watch for patterns that happen around Roblox play, not only inside the official settings page.",
        ],
        bullets: [
          "Strangers asking a child to move to Discord or another app.",
          "Voice chat pressure from older players.",
          "Bullying, dares, and sexualized roleplay.",
          "Robux scams, gift offers, and account theft attempts.",
        ],
      },
      {
        heading: "How Koda Safety helps",
        paragraphs: [
          "Koda Safety is designed to alert parents when Roblox-related conversations become risky. That can include grooming language, bullying, threats, sexual content, or a stranger trying to move the conversation somewhere harder for parents to see.",
        ],
      },
      {
        heading: "Recommended setup",
        paragraphs: [
          "Use Roblox account restrictions and privacy settings first. Then use Koda Safety for added visibility into the communication layer, especially if your child plays on PC, uses voice chat, or has friends they only know online.",
        ],
      },
    ],
  },
  {
    slug: "koda-safety-for-discord",
    title: "Koda Safety for Discord",
    date: "5/23/2026",
    category: "Platform",
    description:
      "How Koda Safety helps parents understand Discord servers, DMs, voice channels, friend requests, and gaming chat risks.",
    excerpt:
      "Discord is where a lot of gaming conversations continue after the match ends, which makes it one of the most important platforms for parents to understand.",
    takeaways: [
      "Discord risk often lives in servers, DMs, and voice channels.",
      "A game friend can become a private DM very quickly.",
      "Koda Safety helps parents spot high-risk conversation patterns.",
    ],
    relatedLinks: [
      { label: "Discord platform page", href: "/platforms/discord" },
      { label: "Koda Safety overview", href: "/koda-safety" },
      { label: "Safety and privacy", href: "/safety-privacy" },
    ],
    sections: [
      {
        heading: "Why Discord matters",
        paragraphs: [
          "Discord is the social layer for many games. Kids use it for friend groups, servers, voice calls, memes, school chats, and gaming coordination. That flexibility is useful, but it also means risk can move from a game lobby to a private server quickly.",
        ],
      },
      {
        heading: "Discord risks parents miss",
        paragraphs: [
          "Discord is not only about public servers. The highest-risk moments often happen after a child accepts a friend request or joins a smaller voice channel.",
        ],
        bullets: [
          "Adults posing as teens in gaming servers.",
          "Private DMs that move away from public moderation.",
          "Voice channels where harassment or sexual pressure happens live.",
          "Links to explicit content, scams, malware, or off-platform chats.",
        ],
      },
      {
        heading: "How Koda Safety helps",
        paragraphs: [
          "Koda Safety helps parents see when Discord conversations include high-risk signals like grooming, threats, bullying, sexual content, or repeated attempts to isolate a child from friends and parents.",
        ],
      },
      {
        heading: "Recommended setup",
        paragraphs: [
          "Start by tightening Discord privacy settings, limiting friend requests, and reviewing servers together. Then use Koda Safety as the alert layer for the conversations that still happen inside the places your child is allowed to use.",
        ],
      },
    ],
  },
  {
    slug: "koda-safety-for-fortnite",
    title: "Koda Safety for Fortnite",
    date: "5/23/2026",
    category: "Platform",
    description:
      "How Koda Safety helps parents think about Fortnite voice chat, party chat, strangers, bullying, and live game conversations.",
    excerpt:
      "Fortnite safety centers on voice and party chat because the riskiest moments can happen during live play.",
    takeaways: [
      "Fortnite voice chat can expose kids to strangers and older players.",
      "Party chat creates live pressure that parents rarely hear.",
      "Koda Safety helps surface risky language and escalation.",
    ],
    relatedLinks: [
      { label: "Fortnite platform page", href: "/platforms/fortnite" },
      { label: "Koda Safety overview", href: "/koda-safety" },
      { label: "PC gaming safety", href: "/blog/koda-safety-for-pc-games" },
    ],
    sections: [
      {
        heading: "Why Fortnite safety is different",
        paragraphs: [
          "Fortnite is social, fast, and voice-heavy. Kids may play with school friends, online friends, friends of friends, and random teammates in the same week. The risk is not the game alone. It is the live conversation around the game.",
        ],
      },
      {
        heading: "Common Fortnite risks",
        paragraphs: [
          "Parents should pay attention to what happens in parties, squads, and voice channels.",
        ],
        bullets: [
          "Toxic language and bullying during matches.",
          "Older players pressuring kids to join private chats.",
          "Sexual comments disguised as jokes.",
          "Strangers asking for other account names or social handles.",
        ],
      },
      {
        heading: "How Koda Safety helps",
        paragraphs: [
          "Koda Safety is built to help parents understand when Fortnite conversations become risky. It can surface language patterns that deserve a parent response while still letting kids enjoy the game with healthy boundaries.",
        ],
      },
      {
        heading: "Recommended setup",
        paragraphs: [
          "Use Epic parental controls, limit voice chat to friends when appropriate, and review party settings with your child. Add Koda Safety for alert context when live game conversations move in a dangerous direction.",
        ],
      },
    ],
  },
  {
    slug: "koda-safety-for-minecraft",
    title: "Koda Safety for Minecraft",
    date: "5/23/2026",
    category: "Platform",
    description:
      "How Koda Safety helps parents understand Minecraft servers, multiplayer chat, Discord overlap, and stranger contact risks.",
    excerpt:
      "Minecraft can be calm and creative, but multiplayer servers and adjacent Discord communities create risks parents should not ignore.",
    takeaways: [
      "Minecraft risk usually comes from multiplayer servers and outside communities.",
      "Server chat can introduce strangers, links, and invitations.",
      "Koda Safety helps parents spot risky Minecraft-related conversations.",
    ],
    relatedLinks: [
      { label: "Minecraft platform page", href: "/platforms/minecraft" },
      { label: "Koda Safety overview", href: "/koda-safety" },
      { label: "Discord safety guide", href: "/blog/koda-safety-for-discord" },
    ],
    sections: [
      {
        heading: "Why Minecraft still needs safety planning",
        paragraphs: [
          "Minecraft is one of the most creative games kids can play, but multiplayer changes the risk profile. Public servers, private realms, chat, mods, and Discord communities can bring strangers into a game that parents often assume is harmless.",
        ],
      },
      {
        heading: "Minecraft risks parents miss",
        paragraphs: [
          "The safest Minecraft experience is usually a known private world. Risk increases when kids join public servers or server-linked Discord communities.",
        ],
        bullets: [
          "Public server chat with unknown players.",
          "Requests to join Discord for voice chat.",
          "Links to mods, skins, malware, or scams.",
          "Bullying, griefing, and threats between players.",
        ],
      },
      {
        heading: "How Koda Safety helps",
        paragraphs: [
          "Koda Safety helps parents see risky conversation patterns around Minecraft play, especially when chat moves across servers, Discord, and other gaming communities.",
        ],
      },
      {
        heading: "Recommended setup",
        paragraphs: [
          "Prefer private worlds with known friends, review server rules, and keep Discord connected to the safety conversation. Use Koda Safety as an added layer for alerts when chat or voice risk appears.",
        ],
      },
    ],
  },
  {
    slug: "koda-vs-bark",
    title: "Koda vs Bark: Which Parental Control Is Better for PC Gaming?",
    date: "5/21/2026",
    category: "Comparison",
    description:
      "Compare Koda and Bark for families worried about Roblox, Discord, Fortnite, Minecraft, PC gaming chat, and online safety alerts.",
    excerpt:
      "Bark is a strong broad parental-control app. Koda is built for parents who need clearer visibility into PC games, in-game chat, voice risk, and gaming-specific alerts.",
    takeaways: [
      "Bark is broad. Koda is gaming-first.",
      "Koda is strongest for PC game chat, voice risk, and alert context.",
      "The best choice depends on where your child's online risk actually happens.",
    ],
    relatedLinks: [
      { label: "Koda Safety vs Bark", href: "/blog/koda-safety-vs-bark" },
      { label: "Koda Safety overview", href: "/koda-safety" },
      { label: "Game Safety guides", href: "/game-safety" },
    ],
    sections: [
      {
        heading: "Quick verdict",
        paragraphs: [
          "Choose Bark if you want a general-purpose monitoring layer for mobile devices, social apps, web access, location, and screen time. Choose Koda if your child spends serious time on a gaming PC and you need visibility into Roblox, Discord, Fortnite, Minecraft, and other game environments where voice and chat risk can happen fast.",
        ],
      },
      {
        heading: "Where Bark is strong",
        paragraphs: [
          "Bark is a well-known parental-control product with a broad safety footprint. That makes it a sensible comparison if your main question is whether a single tool can help across mobile devices, social media, web access, and general online activity.",
        ],
      },
      {
        heading: "Where Koda is different",
        paragraphs: [
          "Koda starts from a different parent problem: games are where kids hang out, and game environments are where many parental-control tools lose visibility. Web filters can block a site. Screen-time apps can limit a device. But parents often need to know what happened inside the game.",
        ],
        bullets: [
          "PC game chat and voice visibility.",
          "Gaming-specific alerts.",
          "Context parents can use for a real conversation.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Bark and Koda solve different versions of the same parent worry. Bark is broad. Koda is specialized. If the risk you care about most happens while your child is playing PC games, Koda is the sharper fit.",
        ],
      },
    ],
  },
  {
    slug: "predators-on-roblox",
    title: "Predators on Roblox: What Parents Need to Know in 2026",
    date: "5/23/2026",
    category: "Threat",
    description:
      "Learn how online predators target children on Roblox through chat, voice, private servers, and friend requests — and what parents can do to protect their kids.",
    excerpt:
      "Roblox predators use the platform's social features to find, groom, and exploit children. Here is what every parent needs to understand about how it happens and how to stop it.",
    takeaways: [
      "Predators target kids in popular Roblox games, then move them to private channels or Discord.",
      "Grooming on Roblox often starts with gift offers, compliments, and requests to 'play privately.'",
      "Koda Safety alerts parents when grooming language patterns appear in Roblox conversations.",
    ],
    relatedLinks: [
      { label: "Roblox platform safety guide", href: "/platforms/roblox" },
      { label: "Koda Safety for Roblox", href: "/blog/koda-safety-for-roblox" },
      { label: "Online predator warning signs", href: "/blog/discord-grooming" },
    ],
    sections: [
      {
        heading: "How predators find children on Roblox",
        paragraphs: [
          "Roblox has over 70 million daily active users, most of them under 16. Predators exploit this massive young audience by joining popular games, hanging out in public lobbies, and using in-game chat to identify vulnerable children.",
          "The platform's social features — friend requests, private messaging, voice chat, and private servers — give predators multiple ways to isolate a child from public moderation once initial contact is made.",
        ],
      },
      {
        heading: "Common grooming tactics on Roblox",
        paragraphs: [
          "Grooming on Roblox follows predictable patterns that parents should learn to recognize. Predators are patient — they build trust before making dangerous requests.",
        ],
        bullets: [
          "Offering free Robux, game items, or 'exclusive' access to build trust.",
          "Flattering a child's skills or avatar to create emotional connection.",
          "Asking personal questions (age, school, location) disguised as friendly conversation.",
          "Suggesting they 'play together privately' on a private server or Discord.",
          "Gradually introducing sexual topics or requests once trust is established.",
          "Using guilt, secrecy, or threats to prevent the child from telling parents.",
        ],
      },
      {
        heading: "Where Roblox grooming happens",
        paragraphs: [
          "Most grooming does not happen in the main game lobbies where moderation is strongest. Predators move children to spaces with less oversight.",
        ],
        bullets: [
          "Private servers with no other players present.",
          "Roblox direct messages (especially when chat restrictions are off).",
          "Voice chat in games that support Roblox spatial voice.",
          "Discord servers linked from Roblox game descriptions.",
          "Third-party apps suggested by the predator (Snapchat, Instagram, WhatsApp).",
        ],
      },
      {
        heading: "Warning signs your child may be targeted",
        paragraphs: [
          "Watch for behavioral changes around Roblox play. These signs do not guarantee grooming is occurring, but they warrant a calm conversation.",
        ],
        bullets: [
          "Suddenly secretive about who they play with or what they talk about.",
          "New 'older friend' they mention frequently but you have never met.",
          "Receiving gifts (Robux, items) from someone you do not know.",
          "Switching screens or minimizing chat when a parent walks by.",
          "Emotional changes — anxiety, withdrawal, or sudden anger when asked about gaming.",
          "Staying up late to play when they think parents are asleep.",
        ],
      },
      {
        heading: "What parents can do right now",
        paragraphs: [
          "Protecting your child on Roblox requires a combination of platform settings, open conversations, and monitoring tools. No single approach is enough.",
        ],
        bullets: [
          "Enable Roblox account restrictions and set the account to under-13 mode.",
          "Disable or restrict chat and limit friend requests to known contacts.",
          "Review your child's friends list regularly — ask who each person is.",
          "Talk openly about grooming tactics without shaming or scaring your child.",
          "Use Koda Safety to monitor Roblox conversations and receive alerts when grooming language appears.",
          "Check if your child uses Discord alongside Roblox — this is the most common pipeline.",
        ],
      },
      {
        heading: "How Koda Safety protects against Roblox predators",
        paragraphs: [
          "Koda Safety monitors Roblox voice and text chat in real time, using AI specifically trained to detect grooming patterns, isolation tactics, sexual content, and dangerous escalation. When a risky conversation is detected, parents receive an immediate alert with the transcript and context needed to respond.",
          "Unlike Roblox's built-in reporting system (which is reactive), Koda alerts parents before grooming progresses — often catching the early signs that a child would not recognize as dangerous.",
        ],
      },
    ],
  },
  {
    slug: "discord-grooming",
    title: "Discord Grooming: How It Happens and How to Stop It",
    date: "5/23/2026",
    category: "Threat",
    description:
      "Learn how online predators use Discord to groom children through gaming servers, DMs, and voice channels — and how parents can detect and prevent it.",
    excerpt:
      "Discord is where many gaming friendships continue after the game ends. It is also where predators move children for private, unmonitored conversations.",
    takeaways: [
      "Discord grooming often starts in gaming servers and moves to DMs or private voice channels.",
      "Predators exploit Discord's lack of parental controls and minimal age verification.",
      "Koda Safety monitors Discord conversations and alerts parents to grooming language patterns.",
    ],
    relatedLinks: [
      { label: "Discord platform safety guide", href: "/platforms/discord" },
      { label: "Koda Safety for Discord", href: "/blog/koda-safety-for-discord" },
      { label: "Predators on Roblox", href: "/blog/predators-on-roblox" },
    ],
    sections: [
      {
        heading: "Why Discord is a grooming risk for children",
        paragraphs: [
          "Discord is the dominant chat platform for gamers. Kids use it to coordinate game sessions, join fan communities, share content, and socialize. That social infrastructure is valuable — but it also creates opportunity for predators.",
          "Discord has minimal age verification (a self-reported birthdate), limited built-in parental controls, and a culture of pseudonymous interaction. Predators can pose as teenagers, join the same gaming servers as children, and initiate private contact with very little friction.",
        ],
      },
      {
        heading: "How grooming progresses on Discord",
        paragraphs: [
          "Discord grooming follows a predictable escalation pattern. Understanding these stages helps parents recognize warning signs before harm occurs.",
        ],
        bullets: [
          "Stage 1 — Contact: Predator joins a gaming server the child uses and participates in group conversations.",
          "Stage 2 — Trust building: Offers help in games, shares memes, compliments the child, appears friendly and relatable.",
          "Stage 3 — Isolation: Sends a friend request and moves conversation to DMs, away from server moderation.",
          "Stage 4 — Desensitization: Introduces sexual jokes, shares mature content, normalizes boundary-crossing.",
          "Stage 5 — Exploitation: Requests photos, sexual content, personal information, or a meeting.",
          "Stage 6 — Control: Uses guilt, blackmail, or threats to maintain secrecy and continued compliance.",
        ],
      },
      {
        heading: "Where on Discord grooming happens",
        paragraphs: [
          "Different parts of Discord carry different risk levels. Public servers with active moderation are safer than private spaces.",
        ],
        bullets: [
          "Direct messages (DMs) — the highest-risk area with zero third-party oversight.",
          "Private voice channels — conversations leave no text record for moderation to review.",
          "Small private servers — invite-only spaces with no reporting infrastructure.",
          "Gaming server DMs — predators meet kids in public servers then move to private messages.",
          "Group DMs — create the illusion of a friend group while isolating the child.",
        ],
      },
      {
        heading: "Warning signs of Discord grooming",
        paragraphs: [
          "These behavioral patterns may indicate your child is being groomed through Discord. Each sign alone may be harmless, but multiple signs together warrant attention.",
        ],
        bullets: [
          "New online 'best friend' they met in a server but have never met in person.",
          "Receiving game gifts, Discord Nitro, or other digital items from someone unknown to you.",
          "Hiding their screen when a parent approaches.",
          "Staying in voice channels late at night, especially in private calls.",
          "Becoming defensive or emotional when asked about their Discord conversations.",
          "New accounts on other platforms (Snapchat, Instagram) they did not have before.",
          "Sudden knowledge of sexual topics inappropriate for their age.",
        ],
      },
      {
        heading: "How to protect your child on Discord",
        paragraphs: [
          "Discord does not offer robust parental controls, so parents need to combine platform settings with monitoring and open conversation.",
        ],
        bullets: [
          "Enable Discord's 'Keep me safe' explicit content filter in Privacy & Safety settings.",
          "Restrict DMs from server members (Settings > Privacy > disable 'Allow direct messages from server members').",
          "Review their server list and friend list periodically — ask about anyone you do not recognize.",
          "Discuss how grooming works using age-appropriate language. Kids who understand the tactics are harder to manipulate.",
          "Use Koda Safety to monitor Discord conversations for grooming patterns, threats, and sexual content.",
          "Consider Discord Family Center for basic activity visibility (though it has significant limitations).",
        ],
      },
      {
        heading: "How Koda Safety detects Discord grooming",
        paragraphs: [
          "Koda Safety monitors Discord text and voice conversations using AI trained on real grooming patterns. When language indicating isolation tactics, age-inappropriate sexual content, personal information requests, or escalation toward exploitation is detected, parents receive an immediate alert with full context.",
          "This is especially valuable for voice channels, where Discord's own moderation has zero visibility. Koda transcribes and analyzes voice conversations in real time, catching verbal grooming that would otherwise go completely undetected.",
        ],
      },
    ],
  },
];

type BlogTrustPreset = {
  quickAnswer: string;
  researchMethod: string;
  sourceKeys: SourceKey[];
  faqs: BlogFaq[];
  about: string[];
  mentions: string[];
};

const DEFAULT_RESEARCH_METHOD =
  "This guide was prepared by reviewing official platform help centers, public child-safety guidance, Koda product positioning, and the visible limitations of built-in parental controls. It is written for parents and reviewed for clarity, sourcing, and balanced safety language.";

const DEFAULT_AUTHOR_ID = "koda-editorial-staff" satisfies EditorialContributorId;
const DEFAULT_REVIEWER_ID =
  "koda-trust-safety-review" satisfies EditorialContributorId;
const TRUST_REFRESH_DATE = "5/24/2026";

const TRUST_PRESETS: Record<string, BlogTrustPreset> = {
  "what-is-koda-safety": {
    quickAnswer:
      "Koda Safety is a gaming-first parental safety layer for families who need context around PC game chat, voice conversations, DMs, and risky online interactions that generic screen-time tools often miss.",
    researchMethod:
      "This overview was checked against Koda product pages, platform safety resources, and current AI/search citation guidance so parents and answer engines can quickly identify what Koda does, what it does not replace, and where it fits in a family safety plan.",
    sourceKeys: [
      "googleHelpful",
      "googleArticleSchema",
      "bingResults",
      "geoPaper",
      ...CHILD_SAFETY_SOURCE_KEYS,
    ],
    faqs: [
      {
        question: "What does Koda Safety monitor?",
        answer:
          "Koda Safety focuses on PC gaming and online conversation risk, including voice chat, game DMs, Discord-adjacent conversations, grooming language, bullying, threats, sexual content, and self-harm signals.",
      },
      {
        question: "Does Koda replace built-in parental controls?",
        answer:
          "No. Built-in controls are still useful for app access, age limits, and screen time. Koda is meant to add context around what is said in gaming and chat environments.",
      },
      {
        question: "Is Koda meant to secretly spy on kids?",
        answer:
          "No. The recommended setup is transparent: parents should tell kids what is monitored, why it is used, and how alerts will be handled.",
      },
    ],
    about: ["Koda Safety", "Parental control software", "PC gaming safety"],
    mentions: ["game chat monitoring", "voice chat monitoring", "parent alerts"],
  },
  "is-koda-safe-for-families": {
    quickAnswer:
      "Koda Safety can be used safely when parents install it with legal authority, explain the monitoring to their child, keep privacy expectations clear, and use alerts for serious safety conversations instead of constant punishment.",
    researchMethod:
      "This article was reviewed against Koda privacy/legal pages, child-safety guidance, and people-first content standards to keep the advice practical, transparent, and cautious around family trust.",
    sourceKeys: [
      "googleHelpful",
      "googleStructuredData",
      ...CHILD_SAFETY_SOURCE_KEYS,
      "bingResults",
    ],
    faqs: [
      {
        question: "Should parents tell kids they are using Koda?",
        answer:
          "Yes. Koda is strongest when parents explain what is monitored, why it matters, and what will happen if an alert appears.",
      },
      {
        question: "Can Koda guarantee a child is safe online?",
        answer:
          "No tool can guarantee safety. Koda should be paired with conversations, age-appropriate rules, platform settings, and quick parent response when something serious appears.",
      },
      {
        question: "What should parents do after a serious alert?",
        answer:
          "Stay calm, preserve context, ask open questions, and escalate to school staff, platform reporting, law enforcement, or emergency services when there is immediate danger.",
      },
    ],
    about: ["Family online safety", "Child privacy", "Parental monitoring"],
    mentions: ["transparent monitoring", "privacy", "safety alerts"],
  },
  "koda-safety-for-pc-games": {
    quickAnswer:
      "Koda Safety is built for PC gaming because the riskiest moments often happen in live voice, text chat, servers, and DMs rather than in a browser or app usage report.",
    researchMethod:
      "This guide compares gaming-specific risk patterns with official platform and child-safety guidance, then explains where Koda adds context beyond device limits and web filters.",
    sourceKeys: [
      "googleHelpful",
      "bingResults",
      ...CHILD_SAFETY_SOURCE_KEYS,
      "discordSafety",
      "epicSafety",
      "minecraftControls",
    ],
    faqs: [
      {
        question: "Why are PC games harder for parents to monitor?",
        answer:
          "PC games combine live voice, strangers, DMs, servers, and links to outside platforms. A parent may see the game name but miss the actual conversation.",
      },
      {
        question: "What should parents set up first on a gaming PC?",
        answer:
          "Start with operating-system family settings, game platform privacy settings, age restrictions, known-friend rules, and then add monitoring for chat and voice risk.",
      },
      {
        question: "Does Koda block every risky game?",
        answer:
          "Koda is focused on surfacing high-risk conversation context. Parents should still use platform controls and family rules for app access and age limits.",
      },
    ],
    about: ["PC gaming safety", "Game chat", "Voice chat monitoring"],
    mentions: ["Discord", "Roblox", "Fortnite", "Minecraft", "Steam"],
  },
  "koda-safety-vs-bark": {
    quickAnswer:
      "Koda Safety is the sharper fit for PC gaming chat and voice-risk context, while Bark is broader for families that want general monitoring across phones, web, social apps, screen time, and location.",
    researchMethod:
      "This comparison uses public Bark feature pages, Koda positioning, and parent search intent around gaming-specific monitoring. It avoids claiming one product is universally best because the right answer depends on where a child's risk occurs.",
    sourceKeys: [
      ...PLATFORM_SOURCE_KEYS.bark,
      "googleHelpful",
      "googleArticleSchema",
      "bingResults",
      "geoPaper",
      ...CHILD_SAFETY_SOURCE_KEYS,
    ],
    faqs: [
      {
        question: "Is Koda better than Bark for gaming?",
        answer:
          "Koda is better aligned with gaming-specific concerns like PC game chat, voice risk, Discord overlap, and in-game conversations. Bark is broader for phone, web, location, and general social monitoring.",
      },
      {
        question: "Can families use Koda and Bark together?",
        answer:
          "Some families may choose a broad monitoring tool and a gaming-focused layer together, but parents should avoid duplicative monitoring that creates confusion or alert fatigue.",
      },
      {
        question: "What is Bark strongest at?",
        answer:
          "Bark is strongest as a mature, broad parental-control product for general device and online activity coverage, especially outside PC gaming.",
      },
    ],
    about: ["Koda Safety", "Bark", "Parental control comparison"],
    mentions: ["Bark alternatives", "PC gaming parental controls", "game chat"],
  },
  "koda-safety-for-roblox": {
    quickAnswer:
      "Koda Safety helps Roblox families by adding conversation-risk visibility around chat, voice, friend requests, servers, and off-platform movement while parents still use Roblox's native safety controls.",
    researchMethod:
      "This guide was checked against Roblox parent resources, Roblox safety pages, and child-safety guidance about grooming and online enticement.",
    sourceKeys: [
      ...PLATFORM_SOURCE_KEYS.roblox,
      ...CHILD_SAFETY_SOURCE_KEYS,
      "googleHelpful",
      "bingResults",
    ],
    faqs: [
      {
        question: "Can parents see Roblox messages?",
        answer:
          "Parents can review some account and communication settings through Roblox, but visibility depends on the child's settings, age, device, and whether conversations move to voice or outside apps.",
      },
      {
        question: "Does Roblox have parental controls?",
        answer:
          "Yes. Roblox provides parent controls and safety settings. Parents should still review friend requests, chat permissions, voice access, and whether the child also uses Discord.",
      },
      {
        question: "What Roblox risks should parents watch for?",
        answer:
          "Watch for strangers offering gifts, requests to move to Discord or private servers, sexualized roleplay, bullying, account scams, and secrecy around new online friends.",
      },
    ],
    about: ["Roblox parental controls", "Roblox safety", "Roblox chat"],
    mentions: ["Roblox voice chat", "Roblox messages", "Robux scams"],
  },
  "koda-safety-for-discord": {
    quickAnswer:
      "Koda Safety adds risk alerts around Discord servers, DMs, and voice conversations; Discord Family Center can help with activity visibility, but it does not give parents full message-level context.",
    researchMethod:
      "This guide was reviewed against Discord Family Center documentation, Discord safety resources, and child-safety guidance about private messaging and grooming risk.",
    sourceKeys: [
      ...PLATFORM_SOURCE_KEYS.discord,
      ...CHILD_SAFETY_SOURCE_KEYS,
      "googleHelpful",
      "bingResults",
    ],
    faqs: [
      {
        question: "Can parents see Discord messages?",
        answer:
          "Discord Family Center gives parents activity visibility, but it is not the same as full message monitoring. Parents should combine privacy settings, conversations, and monitoring where appropriate.",
      },
      {
        question: "What Discord settings should parents check first?",
        answer:
          "Review direct-message permissions, friend request rules, server membership, explicit media filters, Family Center, and whether private voice channels are allowed.",
      },
      {
        question: "Why do game risks move to Discord?",
        answer:
          "Discord is where many game friends continue conversations after the match, making it easy for a public game contact to become a private DM or voice call.",
      },
    ],
    about: ["Discord parental controls", "Discord Family Center", "Discord DMs"],
    mentions: ["Discord voice chat", "gaming servers", "private DMs"],
  },
  "koda-safety-for-fortnite": {
    quickAnswer:
      "Koda Safety helps Fortnite parents focus on live party chat, voice risk, stranger contact, and toxic escalation while Epic parental controls handle account-level permissions.",
    researchMethod:
      "This guide was checked against Epic Games Safety Center resources, Fortnite parental control guidance, and general child-safety sources about stranger contact and online harassment.",
    sourceKeys: [
      ...PLATFORM_SOURCE_KEYS.fortnite,
      ...CHILD_SAFETY_SOURCE_KEYS,
      "googleHelpful",
      "bingResults",
    ],
    faqs: [
      {
        question: "Does Fortnite have parental controls?",
        answer:
          "Yes. Epic provides parental controls for account permissions and communication settings. Parents should still review voice chat, party settings, and friend lists.",
      },
      {
        question: "Why is Fortnite voice chat a parent concern?",
        answer:
          "Fortnite voice chat can include school friends, friends of friends, older players, and random teammates. Risk can happen live before a parent sees a written record.",
      },
      {
        question: "Should parents turn off Fortnite voice chat?",
        answer:
          "For younger kids, limiting voice chat to known friends or turning it off can be appropriate. Older kids may need clear rules and monitoring around party chat behavior.",
      },
    ],
    about: ["Fortnite parental controls", "Fortnite voice chat", "Epic Games safety"],
    mentions: ["party chat", "Fortnite safety", "stranger contact"],
  },
  "koda-safety-for-minecraft": {
    quickAnswer:
      "Koda Safety is useful for Minecraft families when multiplayer servers, public chat, Discord communities, mods, and links bring stranger contact into an otherwise creative game.",
    researchMethod:
      "This guide was checked against Minecraft parental-control resources, Xbox family settings, and child-safety guidance about chat, links, and online communities.",
    sourceKeys: [
      ...PLATFORM_SOURCE_KEYS.minecraft,
      ...CHILD_SAFETY_SOURCE_KEYS,
      "googleHelpful",
      "bingResults",
    ],
    faqs: [
      {
        question: "Is Minecraft safe for kids?",
        answer:
          "Minecraft can be very safe in private worlds with known friends. Risk rises on public servers, server-linked Discords, unmanaged multiplayer, and mod downloads.",
      },
      {
        question: "Can parents control Minecraft multiplayer?",
        answer:
          "Parents can use Microsoft/Xbox family settings and Minecraft controls to manage multiplayer and communication permissions, depending on edition and account setup.",
      },
      {
        question: "What Minecraft risks should parents monitor?",
        answer:
          "Watch public server chat, invitations to Discord, unknown links, mod downloads, bullying, griefing, and pressure to join private communities.",
      },
    ],
    about: ["Minecraft parental controls", "Minecraft multiplayer", "Xbox family safety"],
    mentions: ["Minecraft servers", "mods", "Discord communities"],
  },
  "koda-vs-bark": {
    quickAnswer:
      "For PC gaming risk, Koda is more focused than Bark because it centers on game chat, voice conversations, and gaming-specific alerts; Bark is broader for general parental-control coverage.",
    researchMethod:
      "This comparison was reviewed against public Bark feature pages, Koda product positioning, and child-safety guidance so parents can compare use cases rather than just feature counts.",
    sourceKeys: [
      ...PLATFORM_SOURCE_KEYS.bark,
      "googleHelpful",
      "googleStructuredData",
      "bingResults",
      ...CHILD_SAFETY_SOURCE_KEYS,
    ],
    faqs: [
      {
        question: "Is Koda a Bark alternative?",
        answer:
          "Koda is a Bark alternative for families whose main concern is PC gaming chat, voice risk, Discord, Roblox, Fortnite, and Minecraft. Bark remains broader for general family monitoring.",
      },
      {
        question: "Which app is better for PC gaming parental controls?",
        answer:
          "Koda is built around PC gaming conversations and alert context, making it the better fit when the parent problem is what is happening inside games.",
      },
      {
        question: "Which app is better for phones?",
        answer:
          "Bark is likely the better-known broad option for phone, web, social, screen-time, and location coverage.",
      },
    ],
    about: ["Bark alternative", "Koda Safety", "PC gaming parental controls"],
    mentions: ["Bark competitors", "game chat monitoring", "voice chat"],
  },
  "predators-on-roblox": {
    quickAnswer:
      "Predators on Roblox usually try to build trust in public games, then move children into private servers, DMs, voice chat, Discord, or other apps where adults have less visibility.",
    researchMethod:
      "This threat guide was reviewed against Roblox safety resources, NCMEC education, FBI online-safety guidance, FTC parent guidance, and broader child-safety research.",
    sourceKeys: [
      ...PLATFORM_SOURCE_KEYS.roblox,
      ...CHILD_SAFETY_SOURCE_KEYS,
      "googleHelpful",
      "bingResults",
    ],
    faqs: [
      {
        question: "How do predators contact kids on Roblox?",
        answer:
          "They may start in popular games or public chat, offer gifts or attention, ask personal questions, and then try to move the child to private chat, voice, or another app.",
      },
      {
        question: "What are Roblox grooming warning signs?",
        answer:
          "Warning signs include secretive play, unknown older friends, gifts from strangers, private server invitations, switching screens, and anxiety when asked about Roblox conversations.",
      },
      {
        question: "What should parents do if they suspect grooming?",
        answer:
          "Stay calm, preserve messages or screenshots, report the account to Roblox, contact law enforcement or NCMEC for serious exploitation concerns, and support the child without blame.",
      },
    ],
    about: ["Roblox grooming", "Online predators", "Child safety"],
    mentions: ["Roblox private servers", "Discord grooming", "Robux scams"],
  },
  "discord-grooming": {
    quickAnswer:
      "Discord grooming often begins in gaming servers and escalates through DMs, private voice channels, gifts, secrecy, and attempts to move a child into more isolated conversations.",
    researchMethod:
      "This threat guide was reviewed against Discord safety resources, Family Center documentation, NCMEC education, FBI guidance, FTC parent guidance, and broader child-safety research.",
    sourceKeys: [
      ...PLATFORM_SOURCE_KEYS.discord,
      ...CHILD_SAFETY_SOURCE_KEYS,
      "googleHelpful",
      "bingResults",
    ],
    faqs: [
      {
        question: "How does Discord grooming start?",
        answer:
          "It often starts in a gaming server, where an adult poses as a peer, builds trust, sends a friend request, and moves the child into DMs or private voice channels.",
      },
      {
        question: "Are Discord DMs risky for kids?",
        answer:
          "Discord DMs can be high risk because they are private, fast-moving, and easy to separate from server moderation or parent visibility.",
      },
      {
        question: "What should parents do about Discord grooming?",
        answer:
          "Tighten privacy settings, review servers and friends, preserve evidence, report dangerous users, use monitoring where legally appropriate, and involve authorities for exploitation or immediate danger.",
      },
    ],
    about: ["Discord grooming", "Discord parental controls", "Online child safety"],
    mentions: ["Discord DMs", "Discord voice chat", "gaming servers"],
  },
};

function getTrustPreset(post: BaseBlogPost): BlogTrustPreset {
  const preset = TRUST_PRESETS[post.slug];
  if (preset) return preset;

  return {
    quickAnswer: post.excerpt,
    researchMethod: DEFAULT_RESEARCH_METHOD,
    sourceKeys: [
      "googleHelpful",
      "googleArticleSchema",
      "googleStructuredData",
      "bingResults",
      "geoPaper",
      ...CHILD_SAFETY_SOURCE_KEYS,
    ],
    faqs: [],
    about: [post.category, post.title],
    mentions: post.takeaways,
  };
}

function uniqueSources(sourceKeys: SourceKey[]): BlogSource[] {
  const seen = new Set<string>();
  return sourceKeys
    .map((key) => SOURCE_LIBRARY[key])
    .filter((source) => {
      if (seen.has(source.id)) return false;
      seen.add(source.id);
      return true;
    });
}

function enrichPost(post: BaseBlogPost): BlogPost {
  const preset = getTrustPreset(post);

  return {
    ...post,
    authorId: DEFAULT_AUTHOR_ID,
    reviewerId: DEFAULT_REVIEWER_ID,
    dateModified: TRUST_REFRESH_DATE,
    lastReviewed: TRUST_REFRESH_DATE,
    quickAnswer: preset.quickAnswer,
    researchMethod: preset.researchMethod || DEFAULT_RESEARCH_METHOD,
    sources: uniqueSources(preset.sourceKeys).slice(0, 8),
    faqs: preset.faqs,
    about: preset.about,
    mentions: preset.mentions,
  };
}

export const BLOG_POSTS: BlogPost[] = RAW_BLOG_POSTS.map(enrichPost);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
