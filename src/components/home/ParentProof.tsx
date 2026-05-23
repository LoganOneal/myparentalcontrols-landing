"use client";

import { useEffect, useState } from "react";

import { StarIcon } from "@/components/icons";

const PARENTS = [
  { label: "Kid playing video game with parent", src: "/images/parents/parent1.jpg" },
  { label: "Boys watching video games together", src: "/images/parents/parent2.jpg" },
  { label: "Daughter with her first gaming PC", src: "/images/parents/parent3.jpg" },
  { label: "Parent and teen gaming together", src: "/images/parents/parent4.jpg" },
  { label: "Teen gaming at computer", src: "/images/parents/parent5.jpg" },
  { label: "Parent watching teen play games", src: "/images/parents/parent6.jpg" },
];

function ParentAvatar({ label, src }: { label: string; src: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setLoaded(true);
    image.onerror = () => setLoaded(false);
    image.src = src;
  }, [src]);

  return (
    <>
      {!loaded && (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-blue-200" fill="currentColor">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </div>
      )}
      {loaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} className="h-full w-full object-cover" />
      )}
    </>
  );
}

export function ParentProof() {
  return (
    <section className="px-[15px] pt-[15px]">
      <div className="rounded-lg bg-white">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center px-5 pt-12 pb-5 text-center sm:pt-16 sm:pb-6 lg:pt-20">
          <div className="flex flex-wrap items-center justify-center">
            {PARENTS.map((parent, index) => (
              <div
                key={parent.src}
                className="relative h-28 w-28 overflow-hidden rounded-full border-[4px] border-white bg-gray-100 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.55)] sm:h-36 sm:w-36 lg:h-40 lg:w-40"
                style={{
                  marginLeft: index === 0 ? 0 : "-20px",
                  zIndex: PARENTS.length - index,
                }}
              >
                <ParentAvatar label={parent.label} src={parent.src} />
              </div>
            ))}
          </div>

          <h2 className="mt-9 max-w-[860px] text-[30px] font-normal leading-[1.28] tracking-tight text-[rgb(30,30,30)] sm:text-4xl lg:text-[46px]">
            Join{" "}
            <span className="font-extrabold">more than 23,000 parents</span>{" "}
            protecting their kids from in-game risks.
          </h2>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[var(--bark-blue)]">
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className="h-5 w-5"
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="text-[15px] font-bold leading-none sm:text-base">
              4.8 stars from parents
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
