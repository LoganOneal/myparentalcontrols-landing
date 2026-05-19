import {
  WhyChooseTimeIcon,
  WhyChooseIntegrateIcon,
  WhyChooseWeightIcon,
} from "@/components/icons";

const CARDS = [
  {
    Icon: WhyChooseTimeIcon,
    title: "Free up your time",
    body: "Cal AI automatically calculates your calories, protein, carbs, and fat. You can also add your own foods and recipes. So no need to calculate calories manually.",
  },
  {
    Icon: WhyChooseIntegrateIcon,
    title: "Integrate with your favorite fitness products",
    body: "Cal AI integrates with your favorite fitness products. So you can track your calories, protein, carbs, fat AND exercises.",
  },
  {
    Icon: WhyChooseWeightIcon,
    title: "Lose weight effortlessly",
    body: "Snap a photo with Cal AI, and your phone's depth sensor calculates food volume. Our AI then analyzes and breaks down your meal to determine calories, protein, carbs, and fat.",
  },
];

export function WhyChoose() {
  return (
    <>
      <h2 className="text-center text-3xl sm:text-[48px] font-medium mt-40 px-4">
        Why choose Cal AI?
      </h2>
      <div>
        <p className="text-center text-lg text-[#262626] font-normal mb-20 mt-4">
          Cal AI is the most advanced calorie tracker.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
          {CARDS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col p-8 bg-white"
              style={{
                borderRadius: 30,
                background: "#FFF",
                boxShadow: "0px 1px 20px 1px rgba(228, 229, 233, 0.50)",
              }}
            >
              <div className="bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <Icon className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold mb-4">{title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
