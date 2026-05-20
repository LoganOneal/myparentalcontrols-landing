import Link from "next/link";

/**
 * News & lawsuits coverage about Roblox / Discord child-safety issues.
 *
 * Each card carries a `screenshot` slot — drop a PNG of the article header
 * into `public/images/news/<filename>.png` and set the filename here. Until
 * a screenshot is set, the card renders a tasteful source-color placeholder.
 *
 * Headlines below reference real publicly-reported lawsuits and coverage —
 * verify the URLs and replace before launch.
 */

type NewsItem = {
  source: string;
  sourceColor?: string;
  headline: string;
  date: string;
  href: string;
  screenshot?: string;
};

const COLUMN_1: NewsItem[] = [
  {
    source: "CBS News",
    sourceColor: "#0033A0",
    headline:
      "Oklahoma becomes latest state to sue Roblox over child safety concerns",
    date: "2024",
    href: "https://www.cbsnews.com/news/oklahoma-becomes-latest-state-to-sue-roblox-over-child-safety-concerns/",
    screenshot: "cbs-oklahoma.png",
  },
  {
    source: "Associated Press",
    sourceColor: "#FF322E",
    headline:
      "Roblox reaches $12M settlement with Nevada to expand youth protections",
    date: "2025",
    href: "https://apnews.com/article/roblox-nevada-settlement-28b3d7d7a483dc28462a7504b67c9bbc",
    screenshot: "ap-nevada.png",
  },
];

const COLUMN_2: NewsItem[] = [
  {
    source: "BBC News",
    sourceColor: "#BB1919",
    headline:
      "Texas sues Roblox, alleging it put 'paedophiles and profits' over safety",
    date: "Nov 2025",
    href: "https://www.bbc.co.uk/news/articles/cy0kd4kk0kqo",
    screenshot: "bbc-texas.png",
  },
  {
    source: "NPR",
    sourceColor: "#E70033",
    headline:
      "Roblox bets on facial scanning to keep its youngest users safe",
    date: "Nov 2025",
    href: "https://www.npr.org/2025/11/21/nx-s1-5614161/roblox-bets-on-facial-scanning-to-keep-its-youngest-users-safe",
    screenshot: "npr-facial-scanning.png",
  },
];

const COLUMN_3: NewsItem[] = [
  {
    source: "NBC News",
    sourceColor: "#0A6EBD",
    headline:
      "Nebraska becomes the latest state to sue Roblox over child safety failures",
    date: "2025",
    href: "https://www.nbcnews.com/tech/tech-news/roblox-lawsuit-nebraska-attorney-general-what-to-know-rcna261733",
    screenshot: "nbc-nebraska.png",
  },
  {
    source: "CNN",
    sourceColor: "#CC0000",
    headline:
      "Louisiana sues Roblox, alleging the gaming site fails to protect children",
    date: "Aug 2025",
    href: "https://www.cnn.com/2025/08/15/us/louisiana-roblox-lawsuit-child-protection-hnk",
    screenshot: "cnn-louisiana.png",
  },
];

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={item.href}
      aria-label={`${item.source}: ${item.headline}`}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="relative rounded-3xl overflow-hidden shadow-lg group block bg-white"
    >
      {/* Screenshot slot */}
      <div className="aspect-[373/280] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 relative">
        {item.screenshot ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`/images/news/${item.screenshot}`}
            alt={item.headline}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-center">
              <div
                className="inline-block text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
                style={{ background: item.sourceColor ?? "#1E1A24" }}
              >
                {item.source}
              </div>
              <p className="mt-3 text-gray-500 text-xs">
                Article screenshot
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span
            className="font-semibold uppercase tracking-wide"
            style={{ color: item.sourceColor ?? "#1E1A24" }}
          >
            {item.source}
          </span>
          <span className="text-gray-500">{item.date}</span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
          {item.headline}
        </h3>
        <span className="text-sm text-gray-700 group-hover:underline mt-1">
          Read coverage →
        </span>
      </div>
    </Link>
  );
}

export function NewsGrid() {
  return (
    <>
      <div className="text-center sm:mt-52 mt-24 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-[48px] font-medium leading-tight">
          Why parents are taking{" "}
          <span className="font-bold">Roblox to court</span> 📰
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-700">
          State attorneys general, regulators, and families are filing
          lawsuits against the platforms where predators target kids.
          Don&rsquo;t wait for the next headline to be about your family.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[21px] mt-16 sm:mt-24 px-4 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-[21px]">
          {COLUMN_1.map((i) => (
            <NewsCard key={i.headline} item={i} />
          ))}
        </div>
        <div className="md:-translate-y-20 translate-y-0 flex flex-col gap-[21px]">
          {COLUMN_2.map((i) => (
            <NewsCard key={i.headline} item={i} />
          ))}
        </div>
        <div className="flex flex-col gap-[21px]">
          {COLUMN_3.map((i) => (
            <NewsCard key={i.headline} item={i} />
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center mt-10 max-w-2xl mx-auto px-4">
        Drop your own article screenshots into{" "}
        <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">
          public/images/news/
        </code>{" "}
        and set the filename on each card to replace the placeholders.
      </p>
    </>
  );
}
