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
    image.src = src;
  }, [src]);

  return loaded ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={label} className="h-full w-full object-cover" />
  ) : (
    <div className="h-full w-full bg-gray-100" />
  );
}

export function FunnelReviews() {
  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <div className="flex items-center justify-center">
        {PARENTS.map((parent, index) => (
          <div
            key={parent.src}
            className="relative h-11 w-11 overflow-hidden rounded-full border-[3px] border-white bg-gray-100 shadow-[0_4px_12px_-4px_rgba(15,23,42,0.4)]"
            style={{ marginLeft: index === 0 ? 0 : "-10px", zIndex: PARENTS.length - index }}
          >
            <ParentAvatar label={parent.label} src={parent.src} />
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[15px] leading-snug text-gray-800">
        Join <span className="font-extrabold">more than 23,000 parents</span> protecting their kids from in-game risks.
      </p>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="w-4 h-4 text-[var(--koda-bear-blue)]" fill="currentColor" />
          ))}
        </div>
        <span className="text-[13px] font-bold text-[var(--koda-bear-blue)]">4.8 stars from parents</span>
      </div>
    </div>
  );
}
