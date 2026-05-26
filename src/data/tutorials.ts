export type TutorialStep = {
  instruction: string;
  detail?: string;
};

export type Tutorial = {
  slug: string;
  title: string;
  description: string;
  platform: string;
  platformSlug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeMinutes: number;
  steps: TutorialStep[];
  whyItMatters: string;
  kodaTip: string;
};

export const TUTORIALS: Tutorial[] = [
  {
    slug: "turn-off-fortnite-voice-chat",
    title: "How to Turn Off Fortnite Voice Chat",
    description:
      "Step-by-step guide to disable or restrict Fortnite voice chat so your child cannot hear or talk to strangers during matches.",
    platform: "Fortnite",
    platformSlug: "fortnite",
    difficulty: "Easy",
    timeMinutes: 2,
    steps: [
      {
        instruction: "Open Fortnite and go to the main menu.",
        detail: "Press Escape (PC) or the menu button to open settings.",
      },
      {
        instruction: "Click the gear icon to open Settings.",
      },
      {
        instruction: "Navigate to the Audio tab (speaker icon).",
      },
      {
        instruction: "Find 'Voice Chat' and set it to OFF.",
        detail:
          "Alternatively, set 'Voice Chat Method' to 'Push to Talk' so your child must hold a button to speak, or set 'Voice Channel' to 'Party' so they only hear friends they invited.",
      },
      {
        instruction: "Set 'Voice Chat Volume' to 0% as a backup.",
        detail: "This ensures no audio comes through even if the setting reverts.",
      },
      {
        instruction: "Click Apply to save changes.",
      },
      {
        instruction: "For younger kids: Also restrict via Epic parental controls.",
        detail:
          "Log in to epicgames.com > Account > Parental Controls > set 'Voice Chat' to 'Friends Only' or 'Nobody'. This applies account-wide and cannot be changed without the parent PIN.",
      },
    ],
    whyItMatters:
      "Fortnite voice chat puts your child on an open mic with random players of all ages. This is where predators make first contact and where bullying happens live. Disabling or restricting voice chat to friends is the single most impactful safety change parents can make.",
    kodaTip:
      "Even with voice chat set to Friends Only, Koda Gaming Parental Controls monitors what is said in those conversations. You will receive alerts if a 'friend' starts grooming, bullying, or pressuring your child — because not every friend is safe.",
  },
  {
    slug: "turn-off-roblox-chat",
    title: "How to Turn Off Roblox Chat",
    description:
      "Step-by-step guide to disable or restrict Roblox text chat and voice chat so strangers cannot message your child.",
    platform: "Roblox",
    platformSlug: "roblox",
    difficulty: "Easy",
    timeMinutes: 3,
    steps: [
      {
        instruction: "Log in to your child's Roblox account on a browser.",
        detail: "Go to roblox.com and sign in with their credentials.",
      },
      {
        instruction: "Click the gear icon > Settings > Privacy.",
      },
      {
        instruction: "Under 'Who can message me', select 'No one' or 'Friends'.",
        detail:
          "This controls direct messages. 'No one' is safest; 'Friends' allows messages only from accepted friends.",
      },
      {
        instruction: "Under 'Who can chat with me in app', select 'No one' or 'Friends'.",
        detail: "This controls in-game text chat during experiences.",
      },
      {
        instruction: "Under 'Who can chat with me in experiences', select 'No one'.",
        detail: "This disables the chat bubble that appears during gameplay.",
      },
      {
        instruction: "Enable Account Restrictions for maximum safety.",
        detail:
          "Go to Settings > Security > Account Restrictions > toggle ON. This locks chat, limits experiences to a curated safe list, and prevents settings changes without a parent PIN.",
      },
      {
        instruction: "Set a parent PIN under Settings > Security > Account PIN.",
        detail: "This prevents your child from changing these settings back.",
      },
    ],
    whyItMatters:
      "Roblox chat is the primary way predators contact children on the platform. Grooming starts in chat — with compliments, gift offers, and requests to 'play privately.' Restricting chat is the most effective way to reduce predator contact risk.",
    kodaTip:
      "If you allow limited chat (Friends only), Koda Gaming Parental Controls monitors those conversations in real time and alerts you when grooming language, sexual content, or off-platform invitation attempts appear — even from accepted friends.",
  },
  {
    slug: "turn-off-roblox-voice-chat",
    title: "How to Turn Off Roblox Voice Chat",
    description:
      "Step-by-step guide to disable Roblox spatial voice chat and prevent your child from voice chatting with other players.",
    platform: "Roblox",
    platformSlug: "roblox",
    difficulty: "Easy",
    timeMinutes: 2,
    steps: [
      {
        instruction: "Log in to your child's Roblox account on roblox.com.",
      },
      {
        instruction: "Go to Settings > Privacy.",
      },
      {
        instruction: "Look for 'Enable Voice Chat' and ensure it is OFF.",
        detail:
          "Voice chat requires age verification (ID scan) for users 13+. If your child is under 13, voice chat should already be unavailable. If they verified with a fake ID, you need to disable it here.",
      },
      {
        instruction: "Set a parent PIN to prevent re-enabling.",
        detail: "Settings > Security > Account PIN. Without this, your child can turn voice chat back on.",
      },
      {
        instruction: "Check the Parental Controls section.",
        detail:
          "Roblox Parental Controls (Settings > Parental Controls) give you additional control over voice and chat features. Enable all restrictions that fit your child's age.",
      },
    ],
    whyItMatters:
      "Roblox voice chat (spatial voice) lets players talk freely with anyone in the same game world. Unlike text chat, voice leaves no record and cannot be moderated by Roblox. This makes it a high-risk channel for predator contact and bullying.",
    kodaTip:
      "Koda Gaming Parental Controls monitors Roblox voice conversations even when they are enabled. If you choose to allow voice chat for older teens, Koda transcribes and analyzes conversations in real time, alerting you to grooming, threats, or dangerous content.",
  },
  {
    slug: "turn-off-discord-dms",
    title: "How to Turn Off Discord DMs from Strangers",
    description:
      "Step-by-step guide to disable direct messages from server members and strangers on Discord so only friends can message your child.",
    platform: "Discord",
    platformSlug: "discord",
    difficulty: "Easy",
    timeMinutes: 2,
    steps: [
      {
        instruction: "Open Discord and click the gear icon (User Settings).",
        detail: "It is at the bottom-left of the Discord window, next to your username.",
      },
      {
        instruction: "Go to Privacy & Safety.",
      },
      {
        instruction: "Disable 'Allow direct messages from server members'.",
        detail:
          "This is the most important setting. When OFF, only people on your child's friends list can send them DMs. Server members cannot initiate private conversations.",
      },
      {
        instruction: "Set 'Safe Direct Messaging' to 'Keep me safe'.",
        detail: "This scans all incoming DMs for explicit content and blocks it automatically.",
      },
      {
        instruction: "Under 'Who can add you as a friend', restrict options.",
        detail:
          "Uncheck 'Everyone' and 'Server Members'. Leave only 'Friends of Friends' checked, or uncheck all to prevent any new friend requests.",
      },
      {
        instruction: "Review per-server settings.",
        detail:
          "Right-click any server > Privacy Settings > disable 'Allow direct messages from server members' for that specific server. This is a per-server override.",
      },
    ],
    whyItMatters:
      "Discord DMs are the highest-risk area on the platform. Grooming almost always moves to DMs after initial contact in a server. By disabling DMs from server members, you eliminate the primary path predators use to isolate children for private conversations.",
    kodaTip:
      "Even with DMs restricted to friends, Koda Gaming Parental Controls monitors all Discord conversations on your child's PC — including DMs from accepted friends, server messages, and voice channels. You receive alerts the moment dangerous content appears.",
  },
  {
    slug: "turn-off-minecraft-chat",
    title: "How to Turn Off Minecraft Chat",
    description:
      "Step-by-step guide to disable or restrict Minecraft multiplayer chat so strangers on servers cannot message your child.",
    platform: "Minecraft",
    platformSlug: "minecraft",
    difficulty: "Medium",
    timeMinutes: 5,
    steps: [
      {
        instruction: "For Bedrock Edition: Use Microsoft Family Safety.",
        detail:
          "Go to family.microsoft.com > your child's account > Content Restrictions > Communication. Set 'Others can communicate with voice, text, or invites' to 'Friends only' or 'Blocked'.",
      },
      {
        instruction: "For Bedrock Edition: In-game settings.",
        detail:
          "Open Minecraft > Settings > Profile > under 'Multiplayer', check privacy settings. Restrict chat and multiplayer invites to friends only.",
      },
      {
        instruction: "For Java Edition: Hide chat in-game.",
        detail:
          "Press Escape > Options > Chat Settings > set 'Chat' to 'Hidden'. This hides all chat messages. Note: this is client-side only and can be changed back easily.",
      },
      {
        instruction: "For Java Edition: Server-level control.",
        detail:
          "Choose servers with robust moderation (Hypixel, Hive) that filter chat automatically. For private servers, configure server-side chat plugins. Java has no account-level chat restriction.",
      },
      {
        instruction: "Restrict multiplayer access entirely (most secure).",
        detail:
          "In Microsoft Family Safety, you can disable multiplayer entirely, limiting your child to single-player or LAN worlds with family members only.",
      },
    ],
    whyItMatters:
      "Minecraft public server chat is unmoderated stranger chat at scale. Top servers have tens of thousands of concurrent users. Predators target younger players in chat, build trust, then invite them to Discord. Restricting or monitoring chat is essential for safe multiplayer.",
    kodaTip:
      "Koda Gaming Parental Controls monitors Minecraft server chat and Realms messaging in real time. If you allow chat for social play, Koda alerts you when grooming language, bullying, Discord invite links, or dangerous requests appear in your child's conversations.",
  },
  {
    slug: "restrict-games-on-windows",
    title: "How to Restrict Games on Windows",
    description:
      "Step-by-step guide to use Microsoft Family Safety to control which PC games your child can play, set time limits, and restrict mature content on Windows.",
    platform: "Windows",
    platformSlug: "minecraft",
    difficulty: "Medium",
    timeMinutes: 10,
    steps: [
      {
        instruction: "Set up a Microsoft Family group.",
        detail:
          "Go to family.microsoft.com and sign in with your Microsoft account. Add your child as a family member (they need their own Microsoft account).",
      },
      {
        instruction: "Ensure your child uses their own Windows account.",
        detail:
          "On the gaming PC, create a separate Windows user for your child linked to their Microsoft account. Family Safety only works on child accounts, not your admin account.",
      },
      {
        instruction: "Set content restrictions for apps and games.",
        detail:
          "In Family Safety > your child > Content Restrictions > Apps and Games, set the age rating limit. Games rated above this level will be blocked from launching.",
      },
      {
        instruction: "Block specific games if needed.",
        detail:
          "Under 'Always blocked', you can add specific games or apps by name that should never run on your child's account, regardless of rating.",
      },
      {
        instruction: "Set screen time limits.",
        detail:
          "Family Safety > Screen Time > set daily time limits and allowed hours. You can set different limits for weekdays vs weekends.",
      },
      {
        instruction: "Enable activity reporting.",
        detail:
          "Turn on activity reporting to receive weekly emails showing which games your child played, for how long, and when.",
      },
      {
        instruction: "Lock the admin account.",
        detail:
          "Set a strong password on the admin Windows account. Without this, your child can simply switch users to bypass all restrictions.",
      },
    ],
    whyItMatters:
      "Windows has no built-in age gate for launching games. Without Family Safety, your child can install and play any game from Steam, Epic, or the web — including M-rated titles with graphic violence and voice chat with strangers. Restricting at the OS level is the only way to enforce age-appropriate gaming on PC.",
    kodaTip:
      "Microsoft Family Safety controls which games can run, but it does not monitor what happens inside those games. Koda Gaming Parental Controls fills this gap — monitoring voice and text chat within allowed games and alerting you when conversations become dangerous.",
  },
  {
    slug: "monitor-kids-gaming-activity",
    title: "How to Monitor Kids Gaming Activity Without Spying",
    description:
      "A practical guide for parents who want visibility into their child's gaming conversations without destroying trust or micromanaging every session.",
    platform: "All PC Games",
    platformSlug: "fortnite",
    difficulty: "Easy",
    timeMinutes: 5,
    steps: [
      {
        instruction: "Start with a conversation, not surveillance.",
        detail:
          "Tell your child you are setting up safety monitoring. Explain that you will not read every message — only be alerted when something genuinely dangerous appears. Frame it as a seatbelt, not a spy camera.",
      },
      {
        instruction: "Install Koda Gaming Parental Controls on the gaming PC.",
        detail:
          "Koda runs silently and monitors voice and text chat across all PC games. It only alerts you when AI detects genuine risk signals — grooming, threats, bullying, sexual content — not normal kid conversations.",
      },
      {
        instruction: "Configure alert sensitivity.",
        detail:
          "Set which risk categories matter most to your family. You can prioritize grooming and predator alerts while reducing noise from mild language.",
      },
      {
        instruction: "Set up platform-level parental controls as a first layer.",
        detail:
          "Use Roblox Account Restrictions, Epic Cabined Accounts, Discord Privacy Settings, and Microsoft Family Safety. These reduce risk. Koda monitors what gets through.",
      },
      {
        instruction: "Review alerts with curiosity, not punishment.",
        detail:
          "When an alert arrives, read the full context before reacting. Many alerts are teachable moments, not emergencies. Respond with questions, not consequences.",
      },
      {
        instruction: "Check in periodically without hovering.",
        detail:
          "Ask about their gaming week casually. Who are they playing with? Any new friends? Anything weird happen? Normal check-ins build trust and make kids more likely to come to you with real concerns.",
      },
    ],
    whyItMatters:
      "Kids who feel spied on hide their activity. Kids who feel protected talk to their parents. The goal is not to read every message — it is to catch the dangerous moments (grooming, sextortion, serious bullying) that your child may not recognize or report on their own.",
    kodaTip:
      "Koda Gaming Parental Controls is designed for this philosophy. It does not dump a feed of every conversation. It uses AI to surface only high-risk moments with full context, so parents can respond calmly and effectively without needing to monitor a dashboard constantly.",
  },
];

export function getTutorial(slug: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.slug === slug);
}
