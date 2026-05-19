"use client";

import { useEffect, useRef, useState } from "react";

type Feature = {
  title: string;
  description: string;
  image: string;
};

const FEATURES: Feature[] = [
  {
    title: "Track Your Food With Just a Picture",
    description:
      "Snap a photo with Cal AI, and your phone's depth sensor calculates food volume. Our AI then analyzes and breaks down your meal to determine calories, protein, carbs, and fat.",
    image: "/images/analyzed.png",
  },
  {
    title: "Search Our Database of over 1 million foods",
    description:
      "Quickly find and log foods from our extensive database. Search by name, brand, or scan barcodes for instant nutritional information.",
    image: "/images/search-food-db.png",
  },
  {
    title: "Complete Progress Tracking and AI suggestions",
    description:
      "Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.",
    image: "/images/food-db.png",
  },
  {
    title: "Keep track of your water and daily exercise",
    description:
      "Log your water intake and daily exercise effortlessly. Cal AI helps you stay hydrated and active, integrating seamlessly with your fitness routine.",
    image: "/images/water.png",
  },
];

export function FeatureSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function selectFeature(index: number) {
    setImgOpacity(0);
    setTimeout(() => {
      setActiveIndex(index);
      setImgOpacity(1);
    }, 150);
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setImgOpacity(0);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % FEATURES.length);
        setImgOpacity(1);
      }, 150);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function resetInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setImgOpacity(0);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % FEATURES.length);
        setImgOpacity(1);
      }, 150);
    }, 5000);
  }

  return (
    <section className="py-16 lg:py-24 px-4">
      <h2 className="text-center text-3xl sm:text-4xl lg:text-[48px] font-medium mb-12 lg:mb-16 mt-36">
        What does Cal AI include?
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
        <div className="relative mx-auto lg:mx-0 flex flex-col items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FEATURES[activeIndex].image}
            alt={`${FEATURES[activeIndex].title} preview`}
            className="w-[300px] lg:w-[350px] h-auto transition-opacity duration-300 ease-in-out mx-auto"
            style={{ opacity: imgOpacity }}
          />
          <div className="flex items-center justify-center gap-2 mt-4">
            {FEATURES.map((f, i) => (
              <button
                key={f.title}
                type="button"
                aria-label={`Go to feature: ${f.title}`}
                onClick={() => {
                  selectFeature(i);
                  resetInterval();
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {FEATURES.map((f, i) => {
            const active = i === activeIndex;
            return (
              <div
                key={f.title}
                onClick={() => {
                  selectFeature(i);
                  resetInterval();
                }}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                  active
                    ? "scale-105 border-black bg-gray-100"
                    : "border-gray-200 bg-white"
                }`}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
