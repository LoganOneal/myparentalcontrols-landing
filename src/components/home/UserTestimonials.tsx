type Review = {
  name: string;
  image?: string;
  initial?: string;
  quote: string;
};

const REVIEWS: Review[] = [
  {
    name: "pree.palmer",
    image: "/images/review1.jpeg",
    quote:
      "im ngl I've lost 17 lbs with it doesn't need to be exact it's pretty decent",
  },
  {
    name: "Ordinary Tony",
    image: "/images/review2.jpg",
    quote: "IVE BEEN BULKING FOR A YEAR STRAIGHT W APP FR 👏👏👏",
  },
  {
    name: "2025weightlossa...",
    image: "/images/review3.jpeg",
    quote:
      "I love your app it helps me keep track of my food without overthinking everything and gives me a visual of my portions plus it's so aesthetic 💓",
  },
  {
    name: "Mathias",
    image: "/images/review4.jpeg",
    quote: "I started to use it yesterday and im already giving it 5⭐️",
  },
  {
    name: "Ms Nsofor",
    initial: "D",
    quote:
      "For people that want to control their calories @calai.app is the app for you 🙌🔥",
  },
];

export function UserTestimonials() {
  return (
    <section className="py-16 lg:py-40 px-4 bg-[#1E1A24] text-white">
      <div>
        <h2 className="text-center text-3xl sm:text-[48px] font-medium mb-12">
          Thousands of users talk about us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="bg-[#2D2934] rounded-3xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                {r.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={r.image}
                    alt={`${r.name} testimonial`}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg font-semibold">
                    {r.initial}
                  </div>
                )}
                <p className="font-medium text-white">{r.name}</p>
              </div>
              <p className="text-white/85 leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
