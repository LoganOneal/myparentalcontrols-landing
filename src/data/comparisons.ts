export type ComparisonFeature = {
  feature: string;
  koda: string;
  competitor: string;
};

export type ComparisonGroup = {
  title: string;
  features: ComparisonFeature[];
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Comparison = {
  slug: string;
  competitorName: string;
  title: string;
  description: string;
  verdict: string;
  competitorStrengths: string[];
  kodaStrengths: string[];
  chooseKodaIf: string[];
  chooseCompetitorIf: string[];
  featureGroups: ComparisonGroup[];
  faqs: FAQ[];
};

export const COMPARISONS: Comparison[] = [
  {
    slug: "bark",
    competitorName: "Bark",
    title: "Koda vs Bark: Best Parental Controls for Gaming [2026]",
    description:
      "Compare Koda Gaming Parental Controls and Bark for gaming parental controls. See which app is better for Roblox, Discord, Fortnite, Minecraft voice chat, and PC game monitoring.",
    verdict:
      "Koda is the better fit for families whose primary concern is PC gaming, voice chat, and in-game conversations. Bark is stronger for broad phone and social media monitoring across many platforms.",
    competitorStrengths: [
      "Monitors 30+ social media and messaging platforms on mobile.",
      "Web filtering and screen time management built in.",
      "Location tracking and check-in features.",
      "Mature product with large user community and proven track record.",
      "Affordable pricing for broad feature set.",
    ],
    kodaStrengths: [
      "Reads inside PC game voice and text chat — Roblox, Fortnite, Minecraft, Discord, and more.",
      "Real-time alerts with transcript, clip, and timestamp evidence.",
      "Gaming-specific AI trained on grooming, bullying, threats, and sextortion in gaming contexts.",
      "Invisible to the child and tamper-resistant on gaming PCs.",
      "Covers voice chat, not just text — catches risks Bark cannot see.",
    ],
    chooseKodaIf: [
      "Your child spends significant time in PC games with voice chat.",
      "You need visibility into what is said inside Roblox, Fortnite, Minecraft, or Discord.",
      "Your main concern is grooming, bullying, or threats during live gaming sessions.",
      "You want evidence (clips and transcripts) you can act on, not vague alerts.",
      "Your child games on a Windows PC or Mac.",
    ],
    chooseCompetitorIf: [
      "Your child primarily uses a phone and social media apps.",
      "You need web filtering, screen time limits, and location tracking in one tool.",
      "Gaming is not the primary risk area for your family.",
      "You want coverage for email, SMS, and traditional messaging apps.",
    ],
    featureGroups: [
      {
        title: "Gaming & voice chat",
        features: [
          {
            feature: "Monitors Roblox in-game voice + chat",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Monitors Fortnite voice + party chat",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Monitors Minecraft in-game chat",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Monitors Discord voice channels",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Covers all PC games (not just named titles)",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Voice chat transcription and analysis",
            koda: "Yes",
            competitor: "No",
          },
        ],
      },
      {
        title: "Alert quality",
        features: [
          {
            feature: "Grooming language detection",
            koda: "Yes — gaming-trained AI",
            competitor: "Partial — text only",
          },
          {
            feature: "Bullying and threat alerts",
            koda: "Yes",
            competitor: "Yes",
          },
          {
            feature: "Alert includes clip + transcript + timestamp",
            koda: "Yes",
            competitor: "No — text excerpt only",
          },
          {
            feature: "Real-time parent notification",
            koda: "Yes",
            competitor: "Delayed (batch processing)",
          },
        ],
      },
      {
        title: "Platform coverage",
        features: [
          {
            feature: "Windows PC",
            koda: "Yes",
            competitor: "Yes",
          },
          {
            feature: "macOS",
            koda: "Yes",
            competitor: "Yes",
          },
          {
            feature: "iOS / Android phone monitoring",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Social media (Instagram, TikTok, Snapchat)",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Web filtering",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Screen time management",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Location tracking",
            koda: "No",
            competitor: "Yes",
          },
        ],
      },
      {
        title: "Setup & privacy",
        features: [
          {
            feature: "Invisible to child / tamper-resistant",
            koda: "Yes",
            competitor: "Partial",
          },
          {
            feature: "Works without buying a new device",
            koda: "Yes",
            competitor: "Yes",
          },
          {
            feature: "Family plan covers multiple kids",
            koda: "Yes",
            competitor: "Yes",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Koda better than Bark for gaming?",
        answer:
          "Yes — Koda is specifically built for gaming safety. It monitors voice chat, in-game text, and conversations inside PC games like Roblox, Fortnite, Minecraft, and Discord. Bark does not monitor inside games or voice channels.",
      },
      {
        question: "Can I use Koda and Bark together?",
        answer:
          "Yes. Many families use Bark for phone and social media monitoring alongside Koda for PC gaming safety. The products cover different risk surfaces and do not conflict.",
      },
      {
        question: "Does Bark monitor Roblox voice chat?",
        answer:
          "No. Bark monitors some social media text content but does not have access to in-game voice or text chat within Roblox, Fortnite, Minecraft, or other PC games. Koda was built specifically for this gap.",
      },
      {
        question: "What is the best Bark alternative for gaming?",
        answer:
          "Koda Gaming Parental Controls is the leading Bark alternative for families focused on gaming risks. While Bark monitors phones and social media, Koda monitors the voice and text conversations that happen inside PC games where most gaming risks occur.",
      },
    ],
  },
  {
    slug: "qustodio",
    competitorName: "Qustodio",
    title: "Koda vs Qustodio: Gaming Parental Controls Compared [2026]",
    description:
      "Compare Koda Gaming Parental Controls and Qustodio for parental controls. See which is better for gaming safety, voice chat monitoring, and protecting kids in Roblox, Discord, and Fortnite.",
    verdict:
      "Koda is the better choice for families focused on gaming safety and voice chat. Qustodio is stronger for device-wide content filtering, screen time management, and cross-platform device controls.",
    competitorStrengths: [
      "Comprehensive web content filtering with granular category controls.",
      "Screen time scheduling and daily time limits across all devices.",
      "Cross-platform support including Windows, Mac, iOS, Android, Kindle.",
      "YouTube monitoring and search tracking.",
      "Detailed activity reports with app usage timelines.",
    ],
    kodaStrengths: [
      "Monitors voice and text inside PC games — Roblox, Fortnite, Minecraft, Discord.",
      "Real-time alerts with evidence (clips, transcripts, timestamps).",
      "Gaming-specific AI detection for grooming, bullying, and threats.",
      "Catches risks in voice chat that content filters cannot detect.",
      "Designed for the specific way kids communicate while gaming.",
    ],
    chooseKodaIf: [
      "Your child spends hours in PC games with voice chat and multiplayer.",
      "You need to know what is being said inside game conversations.",
      "Grooming, bullying, and predator contact during gaming are your main concerns.",
      "You already have device-level controls but lack visibility into game chat.",
      "Your child uses Discord alongside gaming.",
    ],
    chooseCompetitorIf: [
      "You need web filtering and content blocking across all devices.",
      "Screen time management is your primary concern.",
      "You want one tool to manage phones, tablets, and computers together.",
      "Your child does not heavily use PC gaming or voice chat.",
      "You need detailed browsing history and app usage reports.",
    ],
    featureGroups: [
      {
        title: "Gaming & voice chat",
        features: [
          {
            feature: "Monitors in-game voice chat",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Monitors in-game text chat",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Discord voice + text monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Covers Roblox, Fortnite, Minecraft",
            koda: "Yes",
            competitor: "No",
          },
        ],
      },
      {
        title: "Device controls",
        features: [
          {
            feature: "Web content filtering",
            koda: "No",
            competitor: "Yes — 30+ categories",
          },
          {
            feature: "Screen time limits",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "App blocking",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "YouTube monitoring",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Search history tracking",
            koda: "No",
            competitor: "Yes",
          },
        ],
      },
      {
        title: "Alert intelligence",
        features: [
          {
            feature: "Grooming detection in voice conversations",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Real-time alerts with evidence",
            koda: "Yes — clip + transcript",
            competitor: "No",
          },
          {
            feature: "Activity reports",
            koda: "Alert-focused",
            competitor: "Yes — detailed timeline",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Koda better than Qustodio for gaming?",
        answer:
          "Yes. Qustodio is a device-control tool focused on web filtering and screen time. It cannot monitor what happens inside PC games or voice chat. Koda is built specifically for gaming conversation safety.",
      },
      {
        question: "Does Qustodio monitor Roblox or Discord?",
        answer:
          "Qustodio can track time spent in apps and block access, but it cannot read or analyze conversations inside Roblox, Discord, Fortnite, or other gaming platforms. Koda provides that conversation-level visibility.",
      },
      {
        question: "Can I use Koda and Qustodio together?",
        answer:
          "Yes. Qustodio handles device controls (web filtering, screen time, app blocking) while Koda handles gaming conversation safety. They complement each other well for families with gaming kids.",
      },
      {
        question: "What is the best Qustodio alternative for gaming families?",
        answer:
          "Koda Gaming Parental Controls is the best alternative if your main concern is what happens inside PC games. For device-wide controls, Qustodio remains strong — but it has a blind spot in gaming conversations that Koda fills.",
      },
    ],
  },
  {
    slug: "aura",
    competitorName: "Aura",
    title: "Koda vs Aura: Parental Controls for Gaming Safety [2026]",
    description:
      "Compare Koda Gaming Parental Controls and Aura parental controls for families. See which is better for gaming safety, voice chat monitoring, and online child protection.",
    verdict:
      "Koda is purpose-built for gaming safety and voice chat. Aura is a broader digital safety suite combining identity protection with basic parental controls. Choose based on whether gaming risk or identity/device risk is your main concern.",
    competitorStrengths: [
      "Identity theft protection for the whole family.",
      "VPN, antivirus, and password manager included.",
      "Dark web monitoring for personal information.",
      "Broad digital safety suite in one subscription.",
      "Financial fraud alerts and credit monitoring.",
    ],
    kodaStrengths: [
      "Deep gaming conversation monitoring — voice, text, in-game chat.",
      "AI trained specifically for gaming-context threats (grooming, bullying, sextortion).",
      "Real-time alerts with clips and transcripts as evidence.",
      "Covers Roblox, Fortnite, Minecraft, Discord, and all PC games.",
      "Focused product that does one thing exceptionally well.",
    ],
    chooseKodaIf: [
      "Your child games on PC with voice chat regularly.",
      "Online predators, grooming, and bullying during gaming are your top concerns.",
      "You want evidence-based alerts from inside game conversations.",
      "You already have identity protection and need gaming-specific safety.",
    ],
    chooseCompetitorIf: [
      "Identity theft and financial fraud are your primary family concerns.",
      "You want one subscription for VPN, antivirus, and parental controls.",
      "Your child does not heavily use PC gaming.",
      "You need dark web monitoring for family data.",
    ],
    featureGroups: [
      {
        title: "Gaming safety",
        features: [
          {
            feature: "In-game voice chat monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "In-game text chat monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Discord monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Gaming-specific threat detection",
            koda: "Yes",
            competitor: "No",
          },
        ],
      },
      {
        title: "Digital safety",
        features: [
          {
            feature: "Identity theft protection",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "VPN included",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Antivirus included",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Dark web monitoring",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Credit monitoring",
            koda: "No",
            competitor: "Yes (adults)",
          },
        ],
      },
      {
        title: "Parental controls",
        features: [
          {
            feature: "Content filtering",
            koda: "No",
            competitor: "Basic",
          },
          {
            feature: "Screen time limits",
            koda: "No",
            competitor: "Basic",
          },
          {
            feature: "Real-time conversation alerts",
            koda: "Yes — with evidence",
            competitor: "No",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Koda better than Aura for gaming safety?",
        answer:
          "Yes. Aura is a digital safety suite focused on identity protection, VPN, and antivirus. Its parental controls are basic and do not monitor inside games or voice chat. Koda is built specifically for gaming conversation safety.",
      },
      {
        question: "Does Aura monitor game chat or voice calls?",
        answer:
          "No. Aura does not monitor in-game conversations, voice chat, or gaming platforms like Roblox, Discord, or Fortnite. Koda was designed specifically for this purpose.",
      },
      {
        question: "What is the best Aura alternative for families with gamers?",
        answer:
          "Koda Gaming Parental Controls is the best alternative for gaming families. Keep Aura for identity protection if you need it, and add Koda for visibility into what happens inside your child's gaming conversations.",
      },
    ],
  },
  {
    slug: "net-nanny",
    competitorName: "Net Nanny",
    title: "Koda vs Net Nanny: Best Parental Controls for Gaming [2026]",
    description:
      "Compare Koda Gaming Parental Controls and Net Nanny for parental controls. See which protects kids better in gaming, voice chat, Roblox, Discord, and online multiplayer environments.",
    verdict:
      "Koda is the right choice for gaming-specific risks. Net Nanny is the right choice for web filtering and content blocking. They solve different problems and can work together.",
    competitorStrengths: [
      "Industry-leading web content filtering with real-time page analysis.",
      "Pornography blocking that works across browsers and apps.",
      "Screen time management and scheduling.",
      "Cross-platform support (Windows, Mac, iOS, Android).",
      "Long-established brand with decades of web safety expertise.",
    ],
    kodaStrengths: [
      "Monitors voice and text inside PC games and Discord.",
      "Real-time alerts with evidence for grooming, bullying, and threats.",
      "Covers the gaming conversation layer that web filters cannot reach.",
      "Voice chat analysis — catches verbal threats and grooming in real time.",
      "Purpose-built for the way kids actually communicate while gaming.",
    ],
    chooseKodaIf: [
      "Your child's primary online activity is PC gaming with voice chat.",
      "Grooming, bullying, and predator conversations are your main concern.",
      "You need visibility into what is said inside games, not just what websites are visited.",
      "Web filtering alone is not enough for your family's risk profile.",
    ],
    chooseCompetitorIf: [
      "Web content filtering and porn blocking are your primary needs.",
      "Your child primarily browses the web and does not game heavily.",
      "You need screen time scheduling across multiple device types.",
      "You want to restrict access to specific website categories.",
    ],
    featureGroups: [
      {
        title: "Gaming safety",
        features: [
          {
            feature: "In-game voice monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "In-game text monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Discord / gaming platform coverage",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Grooming detection in conversations",
            koda: "Yes",
            competitor: "No",
          },
        ],
      },
      {
        title: "Web & content filtering",
        features: [
          {
            feature: "Website content filtering",
            koda: "No",
            competitor: "Yes — real-time AI analysis",
          },
          {
            feature: "Pornography blocking",
            koda: "No",
            competitor: "Yes — industry leading",
          },
          {
            feature: "App blocking",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Screen time limits",
            koda: "No",
            competitor: "Yes",
          },
        ],
      },
      {
        title: "Alerts & reporting",
        features: [
          {
            feature: "Real-time conversation alerts",
            koda: "Yes — with clip + transcript",
            competitor: "No",
          },
          {
            feature: "Web activity reports",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Blocked content notifications",
            koda: "No",
            competitor: "Yes",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Koda better than Net Nanny for gaming?",
        answer:
          "Yes. Net Nanny is a web filtering tool that blocks inappropriate websites and content. It cannot monitor conversations inside PC games or voice chat. Koda is built specifically for gaming safety.",
      },
      {
        question: "Does Net Nanny monitor Discord or Roblox chat?",
        answer:
          "No. Net Nanny can block access to websites and apps, but it does not monitor what is said inside Discord servers, Roblox games, Fortnite voice chat, or other gaming platforms.",
      },
      {
        question: "What is the best Net Nanny alternative for gaming families?",
        answer:
          "Koda Gaming Parental Controls fills the gap that Net Nanny cannot cover — what happens inside PC game conversations. Many families use both: Net Nanny for web filtering and Koda for gaming conversation safety.",
      },
    ],
  },
  {
    slug: "life360",
    competitorName: "Life360",
    title: "Koda vs Life360: Parental Controls for Gaming [2026]",
    description:
      "Compare Koda Gaming Parental Controls and Life360 for family safety. See which is better for gaming risks, voice chat monitoring, and protecting kids online.",
    verdict:
      "These products solve entirely different problems. Life360 is a location and driving safety app. Koda is a gaming conversation safety app. If gaming is your concern, Koda is the answer.",
    competitorStrengths: [
      "Real-time family location sharing and history.",
      "Driving safety reports and crash detection.",
      "Place alerts (school arrival, leaving home).",
      "Emergency SOS and roadside assistance.",
      "Large user base with free tier available.",
    ],
    kodaStrengths: [
      "Monitors what your child says and hears in PC games.",
      "Voice chat and text chat analysis across gaming platforms.",
      "Alerts for grooming, bullying, threats, and dangerous conversations.",
      "Evidence-based alerts with clips and transcripts.",
      "Covers the online social space where kids actually face risk.",
    ],
    chooseKodaIf: [
      "Your concern is what happens online during gaming, not physical location.",
      "Your child faces risks from strangers in voice chat and game servers.",
      "You need to monitor conversations, not coordinates.",
      "Gaming and Discord are where your child spends social time.",
    ],
    chooseCompetitorIf: [
      "Physical location and driving safety are your primary concerns.",
      "You need to know where your teen is, not what they are saying online.",
      "Your child drives and you want crash detection and speed alerts.",
      "You want place-based notifications (arrived at school, left practice).",
    ],
    featureGroups: [
      {
        title: "Gaming & online safety",
        features: [
          {
            feature: "In-game voice monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Game chat analysis",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Discord monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Online predator detection",
            koda: "Yes",
            competitor: "No",
          },
        ],
      },
      {
        title: "Location & physical safety",
        features: [
          {
            feature: "Real-time location sharing",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Driving safety reports",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Crash detection",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Place alerts (geofencing)",
            koda: "No",
            competitor: "Yes",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Koda a Life360 alternative?",
        answer:
          "Not exactly. They solve different problems. Life360 tracks physical location and driving. Koda monitors gaming conversations for safety risks. Many families use both for complete coverage.",
      },
      {
        question: "Does Life360 monitor gaming or voice chat?",
        answer:
          "No. Life360 is a location-sharing app. It does not monitor conversations, game chat, voice calls, or online activity of any kind.",
      },
      {
        question:
          "What should I use for gaming safety if I already have Life360?",
        answer:
          "Add Koda Gaming Parental Controls for gaming conversation monitoring. Life360 tells you where your child is physically. Koda tells you what is happening in their online gaming conversations.",
      },
    ],
  },
  {
    slug: "canopy",
    competitorName: "Canopy",
    title: "Koda vs Canopy: Best Parental Controls for Gamers [2026]",
    description:
      "Compare Koda Gaming Parental Controls and Canopy parental controls. See which is better for gaming, voice chat monitoring, and protecting kids from online predators.",
    verdict:
      "Koda is stronger for gaming conversation safety. Canopy is stronger for visual content filtering and sexting prevention on phones. The right choice depends on where your child's risk is highest.",
    competitorStrengths: [
      "AI-powered image and video filtering (blocks nudity in real time).",
      "Sexting detection and prevention.",
      "Works across apps by filtering at the device level.",
      "Screen time management.",
      "Focus on visual content threats (photos, videos).",
    ],
    kodaStrengths: [
      "Monitors what is said in voice and text during PC gaming.",
      "Gaming-specific threat detection for grooming, bullying, sextortion.",
      "Covers Roblox, Fortnite, Minecraft, Discord conversations.",
      "Real-time alerts with evidence — not just content blocking.",
      "Catches verbal threats and manipulation in voice channels.",
    ],
    chooseKodaIf: [
      "Your child's main risk area is PC gaming with voice chat.",
      "You need to monitor conversations, not just images.",
      "Grooming and predator language during gaming are your top concerns.",
      "You want alerts with evidence rather than silent blocking.",
    ],
    chooseCompetitorIf: [
      "Sexting and inappropriate images are your primary concern.",
      "Your child primarily uses a phone and exchanges photos.",
      "You need visual content filtering at the device level.",
      "Your child does not heavily use PC gaming.",
    ],
    featureGroups: [
      {
        title: "Gaming safety",
        features: [
          {
            feature: "In-game voice monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "In-game text monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Discord monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Gaming conversation AI",
            koda: "Yes",
            competitor: "No",
          },
        ],
      },
      {
        title: "Visual content safety",
        features: [
          {
            feature: "Nudity / sexting image blocking",
            koda: "No",
            competitor: "Yes — AI-powered",
          },
          {
            feature: "Video content filtering",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Works across all apps (device-level)",
            koda: "No",
            competitor: "Yes",
          },
        ],
      },
      {
        title: "Alerts",
        features: [
          {
            feature: "Conversation-based alerts with evidence",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Image-based alerts",
            koda: "No",
            competitor: "Yes",
          },
          {
            feature: "Real-time notification",
            koda: "Yes",
            competitor: "Yes",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Koda better than Canopy for gaming?",
        answer:
          "Yes. Canopy focuses on visual content filtering (blocking inappropriate images and videos). It does not monitor gaming conversations or voice chat. Koda is built specifically for gaming safety.",
      },
      {
        question: "Does Canopy monitor game chat or voice?",
        answer:
          "No. Canopy works at the device level to filter visual content (images and videos). It does not analyze conversations inside PC games, Discord, or voice channels.",
      },
      {
        question: "Can I use Koda and Canopy together?",
        answer:
          "Yes. Canopy handles visual content threats (sexting, nudity) while Koda handles conversation threats (grooming, bullying, predators) in gaming. They cover different risk vectors.",
      },
    ],
  },
  {
    slug: "family-link",
    competitorName: "Google Family Link",
    title: "Koda vs Google Family Link: Gaming Parental Controls [2026]",
    description:
      "Compare Koda Gaming Parental Controls and Google Family Link. See which is better for gaming safety, voice chat monitoring, and protecting kids from online predators in PC games.",
    verdict:
      "Google Family Link is a free, basic device management tool for Android. Koda is a specialized gaming safety tool that monitors conversations. They solve completely different problems and work well together.",
    competitorStrengths: [
      "Free — included with every Google/Android account.",
      "Screen time limits and bedtime scheduling.",
      "App approval and blocking on Android devices.",
      "Location sharing for Android phones.",
      "Content filtering in Google services (Search, YouTube).",
    ],
    kodaStrengths: [
      "Monitors voice and text inside PC games.",
      "Alerts for grooming, bullying, threats in gaming conversations.",
      "Covers Roblox, Fortnite, Minecraft, Discord voice and chat.",
      "Evidence-based alerts with clips and transcripts.",
      "Works on gaming PCs where Family Link has no reach.",
    ],
    chooseKodaIf: [
      "Your child games on a PC and you need conversation monitoring.",
      "Family Link does not cover the gaming platforms your child uses.",
      "Grooming and predator risks in voice chat are your concern.",
      "You already use Family Link but still feel blind to gaming risks.",
    ],
    chooseCompetitorIf: [
      "You just need basic Android device controls for free.",
      "Screen time and app approval on a phone are your only needs.",
      "Your child does not use a gaming PC.",
      "You want a simple, no-cost starting point for parental controls.",
    ],
    featureGroups: [
      {
        title: "Gaming safety",
        features: [
          {
            feature: "In-game voice monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "In-game text monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Discord monitoring",
            koda: "Yes",
            competitor: "No",
          },
          {
            feature: "Works on gaming PCs",
            koda: "Yes",
            competitor: "No — Android only",
          },
        ],
      },
      {
        title: "Device management",
        features: [
          {
            feature: "Screen time limits",
            koda: "No",
            competitor: "Yes (Android)",
          },
          {
            feature: "App approval / blocking",
            koda: "No",
            competitor: "Yes (Android)",
          },
          {
            feature: "Location sharing",
            koda: "No",
            competitor: "Yes (Android)",
          },
          {
            feature: "Google Search filtering",
            koda: "No",
            competitor: "Yes",
          },
        ],
      },
      {
        title: "Cost",
        features: [
          {
            feature: "Price",
            koda: "Paid subscription",
            competitor: "Free",
          },
          {
            feature: "Gaming conversation protection",
            koda: "Included",
            competitor: "Not available at any price",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Google Family Link enough for gaming safety?",
        answer:
          "No. Family Link manages Android devices (screen time, app blocking, location). It cannot see inside PC games, monitor voice chat, or detect grooming in gaming conversations. Koda fills that gap.",
      },
      {
        question: "Does Family Link work on gaming PCs?",
        answer:
          "No. Google Family Link is Android-only. It has no presence on Windows or Mac gaming computers. Koda is built for PC gaming environments.",
      },
      {
        question:
          "What should I add to Family Link for gaming protection?",
        answer:
          "Add Koda Gaming Parental Controls to cover the gaming conversation layer. Family Link handles your child's phone. Koda handles what happens inside their PC gaming sessions.",
      },
    ],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
