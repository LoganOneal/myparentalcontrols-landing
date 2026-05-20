import Link from "next/link";

/**
 * Press mentions / "In the News" feed for the Press page.
 *
 * Layout is modeled after bark.us/blog: one large featured article on top,
 * then a single-column list where each row has a left-side thumbnail and
 * right-side metadata (source tag, headline, date). Tap target is the whole
 * card. Drop screenshots into public/images/news/<filename>.png and set
 * `screenshot` on the entry to swap them in.
 */

type NewsItem = {
  source: string;
  sourceColor?: string;
  headline: string;
  date: string;
  href: string;
  screenshot?: string;
  excerpt?: string;
};

const ITEMS: NewsItem[] = [
  {
    source: "BBC News",
    sourceColor: "#BB1919",
    headline:
      "Texas sues Roblox, alleging it put 'paedophiles and profits' over safety",
    date: "Nov 2025",
    href: "https://www.bbc.co.uk/news/articles/cy0kd4kk0kqo",
    screenshot: "bbc-texas.png",
    excerpt:
      "Texas Attorney General Ken Paxton accused Roblox of facilitating the exploitation of children and prioritizing profit over user safety.",
  },
  {
    source: "CBS News",
    sourceColor: "#0033A0",
    headline:
      "Oklahoma becomes latest state to sue Roblox over child safety concerns",
    date: "2024",
    href: "https://www.cbsnews.com/news/oklahoma-becomes-latest-state-to-sue-roblox-over-child-safety-concerns/",
    screenshot: "cbs-oklahoma.png",
    excerpt:
      "Oklahoma joins a growing list of states accusing the gaming platform of failing to protect young users from predators.",
  },
  {
    source: "Associated Press",
    sourceColor: "#FF322E",
    headline:
      "Roblox reaches $12M settlement with Nevada to expand youth protections",
    date: "2025",
    href: "https://apnews.com/article/roblox-nevada-settlement-28b3d7d7a483dc28462a7504b67c9bbc",
    screenshot: "ap-nevada.png",
    excerpt:
      "The settlement requires Roblox to roll out new safeguards and reporting tools aimed at protecting underage users.",
  },
  {
    source: "NPR",
    sourceColor: "#E70033",
    headline:
      "Roblox bets on facial scanning to keep its youngest users safe",
    date: "Nov 2025",
    href: "https://www.npr.org/2025/11/21/nx-s1-5614161/roblox-bets-on-facial-scanning-to-keep-its-youngest-users-safe",
    screenshot: "npr-facial-scanning.png",
    excerpt:
      "The platform is rolling out age-estimation technology as scrutiny over child safety on its service intensifies.",
  },
  {
    source: "NBC News",
    sourceColor: "#0A6EBD",
    headline:
      "Nebraska becomes the latest state to sue Roblox over child safety failures",
    date: "2025",
    href: "https://www.nbcnews.com/tech/tech-news/roblox-lawsuit-nebraska-attorney-general-what-to-know-rcna261733",
    screenshot: "nbc-nebraska.png",
    excerpt:
      "Nebraska's Attorney General argues Roblox knowingly exposes children to grooming, sextortion, and explicit content.",
  },
  {
    source: "CNN",
    sourceColor: "#CC0000",
    headline:
      "Louisiana sues Roblox, alleging the gaming site fails to protect children",
    date: "Aug 2025",
    href: "https://www.cnn.com/2025/08/15/us/louisiana-roblox-lawsuit-child-protection-hnk",
    screenshot: "cnn-louisiana.png",
    excerpt:
      "Louisiana's lawsuit alleges Roblox has become a hunting ground for predators targeting children on the platform.",
  },
];

function SourceTag({ item }: { item: NewsItem }) {
  return (
    <span
      className="inline-block text-white text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
      style={{ background: item.sourceColor ?? "#1E1A24" }}
    >
      {item.source}
    </span>
  );
}

function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={item.href}
      aria-label={`${item.source}: ${item.headline}`}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group block rounded-3xl overflow-hidden bg-white border border-gray-200/80 hover:border-gray-300 transition-colors"
    >
      <div className="aspect-[16/9] bg-gray-50 relative border-b border-gray-200/80 overflow-hidden">
        {item.screenshot ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`/images/news/${item.screenshot}`}
            alt={item.headline}
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <SourceTag item={item} />
          </div>
        )}
      </div>
      <div className="p-6 sm:p-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <SourceTag item={item} />
          <span className="text-gray-500 text-xs uppercase tracking-[0.12em] font-medium">
            {item.date}
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-black transition-colors">
          {item.headline}
        </h3>
        {item.excerpt ? (
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {item.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

function ListRow({ item }: { item: NewsItem }) {
  return (
    <Link
      href={item.href}
      aria-label={`${item.source}: ${item.headline}`}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group block py-8 first:pt-0 border-b border-gray-200/80 last:border-b-0"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-6 sm:gap-8">
        <div className="aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200/80 relative">
          {item.screenshot ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={`/images/news/${item.screenshot}`}
              alt={item.headline}
              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <SourceTag item={item} />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center gap-3">
          <div className="flex items-center gap-3">
            <SourceTag item={item} />
            <span className="text-gray-500 text-xs uppercase tracking-[0.12em] font-medium">
              {item.date}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug group-hover:text-black transition-colors">
            {item.headline}
          </h3>
          {item.excerpt ? (
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2">
              {item.excerpt}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function PressMentions() {
  const [featured, ...rest] = ITEMS;

  return (
    <section className="mt-16 sm:mt-20">
      <div className="text-center max-w-3xl mx-auto">
        <h2
          className="text-3xl sm:text-[42px] leading-tight"
          style={{
            fontFamily: "Moderat-Black, sans-serif",
            fontWeight: 700,
          }}
        >
          In the news 📰
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-700">
          State attorneys general, regulators, and families are filing lawsuits
          against the platforms where predators target your children. Here&rsquo;s
          what reporters are covering.
        </p>
      </div>

      <div className="mt-10 sm:mt-14">
        <FeaturedCard item={featured} />
      </div>

      <div className="mt-12 sm:mt-16">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.16em] mb-6">
          More coverage
        </h3>
        <div className="flex flex-col">
          {rest.map((item) => (
            <ListRow key={item.headline} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
