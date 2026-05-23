"use client";

import { useEffect, useState } from "react";

import { StarIcon } from "@/components/icons";

const PARENTS = [
  {
    kind: "whiteMom",
    label: "Smiling mom profile",
    src: "/images/Girl1.jpg",
  },
  {
    kind: "momTwo",
    label: "Smiling mom profile",
    src: "/images/Girl2.jpg",
  },
  {
    kind: "blackDad",
    label: "Smiling dad profile",
    src: "/images/Guy1.jpg",
  },
] as const;

type ParentKind = (typeof PARENTS)[number]["kind"];

function ParentAvatarFallback({
  kind,
  label,
}: {
  kind: ParentKind;
  label: string;
}) {
  const profile = {
    whiteMom: {
      bg: "#EFF6FF",
      hair: "#6B3F2A",
      shirt: "#2563EB",
      skin: "#F2C7A5",
      accent: "#BFDBFE",
      hairPath: "M23 49c0-19 11-32 27-32 17 0 28 12 28 31v17H23V49z",
    },
    momTwo: {
      bg: "#F8FAFC",
      hair: "#111827",
      shirt: "#0F172A",
      skin: "#D8A077",
      accent: "#DBEAFE",
      hairPath:
        "M21 53c1-22 13-36 31-36 16 0 27 12 29 31-9-5-16-15-19-23-5 14-18 24-41 28z",
    },
    blackDad: {
      bg: "#FFF7ED",
      hair: "#273142",
      shirt: "#F97316",
      skin: "#8B5A3C",
      accent: "#FED7AA",
      hairPath: "M25 44c2-16 13-26 28-26 14 0 24 9 27 25-12-7-34-8-55 1z",
    },
  }[kind];

  return (
    <svg
      viewBox="0 0 96 96"
      role="img"
      aria-label={label}
      className="h-full w-full"
    >
      <rect width="96" height="96" fill={profile.bg} />
      <circle cx="76" cy="22" r="14" fill={profile.accent} opacity="0.72" />
      <circle cx="22" cy="76" r="18" fill="white" opacity="0.58" />
      <path d={profile.hairPath} fill={profile.hair} />
      <path
        d="M29 91c3-17 13-27 24-27s21 10 24 27H29z"
        fill={profile.shirt}
      />
      <path d="M44 59h18v17c0 5-4 9-9 9s-9-4-9-9V59z" fill={profile.skin} />
      <circle cx="53" cy="44" r="23" fill={profile.skin} />
      <path
        d="M32 39c3-15 12-23 25-23 13 0 21 8 23 23-11-10-33-12-48 0z"
        fill={profile.hair}
        opacity={kind === "blackDad" ? 0.92 : 1}
      />
      <circle cx="44" cy="47" r="2.2" fill="#111827" opacity="0.78" />
      <circle cx="62" cy="47" r="2.2" fill="#111827" opacity="0.78" />
      <path
        d="M45 58c4 5 12 5 16 0"
        fill="none"
        stroke="#7C2D12"
        strokeLinecap="round"
        strokeWidth="3"
      />
      {kind === "blackDad" ? (
        <path
          d="M43 55c5 3 15 3 20 0v4c-6 4-15 4-20 0v-4z"
          fill={profile.hair}
          opacity="0.5"
        />
      ) : null}
    </svg>
  );
}

function ParentAvatar({
  kind,
  label,
  src,
}: {
  kind: ParentKind;
  label: string;
  src: string;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setLoaded(true);
    image.onerror = () => setLoaded(false);
    image.src = src;
  }, [src]);

  if (!loaded) {
    return <ParentAvatarFallback kind={kind} label={label} />;
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="h-full w-full object-cover"
      />
    </>
  );
}

export function ParentProof() {
  return (
    <section className="px-[15px] pt-[15px]">
      <div className="rounded-lg bg-white">
        <div className="mx-auto flex max-w-[980px] flex-col items-center px-5 pt-12 pb-5 text-center sm:pt-16 sm:pb-6 lg:pt-20">
          <div className="flex items-center justify-center">
            {PARENTS.map((parent, index) => (
              <div
                key={parent.kind}
                className="relative h-16 w-16 overflow-hidden rounded-full border-[4px] border-white bg-gray-100 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.55)] sm:h-20 sm:w-20"
                style={{
                  marginLeft: index === 0 ? 0 : "-18px",
                  zIndex: PARENTS.length - index,
                }}
              >
                <ParentAvatar
                  kind={parent.kind}
                  label={parent.label}
                  src={parent.src}
                />
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
