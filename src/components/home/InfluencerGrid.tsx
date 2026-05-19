import Link from "next/link";

type Influencer = {
  name: string;
  image: string;
  quote: string;
  href: string;
};

const COLUMN_1: Influencer[] = [
  {
    name: "Jeremiah Jones",
    image: "/images/humans/jeremiah.jpg",
    quote:
      "Make a healthier choice for your latenight snack and use the Cal AI app to track your calories",
    href: "https://www.instagram.com/reel/DI4l3TiPJUQ/",
  },
  {
    name: "Kadin Kerns",
    image: "/images/humans/jacked2.png",
    quote: "Looking good as usual and my calories are too with Cal AI 🔥",
    href: "https://www.instagram.com/reel/DGrQlrhOXjy/",
  },
];

const COLUMN_2: Influencer[] = [
  {
    name: "Dawson Gibbs",
    image: "/images/humans/dawson.png",
    quote:
      "Track with Cal AI app, if you're not tracking your calories while going for your goals then you're doing it all wrong.",
    href: "https://www.instagram.com/reel/DDNnKQGSLe4/",
  },
  {
    name: "Brian Wallack",
    image: "/images/humans/jacked3.png",
    quote: "Cal AI can literally track anything 🤯",
    href: "#",
  },
];

const COLUMN_3: Influencer[] = [
  {
    name: "Hussein Farhat",
    image: "/images/humans/jacked1.png",
    quote:
      "If you're tracking your calories and macros correctly with Cal AI, you can get away with eating almost anything and still get in shape as long as it matches your daily goals.",
    href: "https://www.instagram.com/reel/DIojs7AszIX/",
  },
  {
    name: "Alex Eubank",
    image: "/images/humans/jacked4.png",
    quote:
      "Cal AI is literally the best calorie tracker. Fastest and most accurate I've ever used.",
    href: "https://www.instagram.com/reel/DHPBOhAJZ5C/",
  },
];

function InfluencerCard({ inf }: { inf: Influencer }) {
  return (
    <Link
      href={inf.href}
      aria-label={`View ${inf.name} testimonial video`}
      className="relative rounded-3xl overflow-hidden shadow-lg group block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={inf.image}
        alt={`${inf.name} testimonial`}
        className="w-full h-auto object-cover aspect-[373/530] group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end">
        <p className="text-4xl text-white/80 leading-none mb-2">&ldquo;</p>
        <h3 className="text-white text-xl font-semibold mb-2">{inf.name}</h3>
        <p className="text-white/90 text-sm leading-snug">{inf.quote}</p>
      </div>
    </Link>
  );
}

export function InfluencerGrid() {
  return (
    <>
      <h2 className="text-center text-3xl sm:text-[48px] font-medium sm:mt-52 mt-24 px-4">
        Used by your favorite fitness influencers <span aria-hidden>👀</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[21px] mt-40 px-4 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-[21px]">
          {COLUMN_1.map((i) => (
            <InfluencerCard key={i.name} inf={i} />
          ))}
        </div>
        <div className="md:-translate-y-20 translate-y-0 flex flex-col gap-[21px]">
          {COLUMN_2.map((i) => (
            <InfluencerCard key={i.name} inf={i} />
          ))}
        </div>
        <div className="flex flex-col gap-[21px]">
          {COLUMN_3.map((i) => (
            <InfluencerCard key={i.name} inf={i} />
          ))}
        </div>
      </div>
    </>
  );
}
