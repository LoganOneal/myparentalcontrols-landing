const PARENTS = [
  { kind: "momOne", label: "Smiling mom profile" },
  { kind: "dad", label: "Smiling dad profile" },
  { kind: "momTwo", label: "Smiling mom profile" },
] as const;

type ParentKind = (typeof PARENTS)[number]["kind"];

function ParentAvatar({ kind, label }: { kind: ParentKind; label: string }) {
  const profile = {
    momOne: {
      bg: "#EFF6FF",
      hair: "#6B3F2A",
      shirt: "#2563EB",
      skin: "#F2C7A5",
      accent: "#BFDBFE",
      hairPath: "M23 49c0-19 11-32 27-32 17 0 28 12 28 31v17H23V49z",
    },
    dad: {
      bg: "#FFF7ED",
      hair: "#273142",
      shirt: "#F97316",
      skin: "#C98B62",
      accent: "#FED7AA",
      hairPath: "M25 44c2-16 13-26 28-26 14 0 24 9 27 25-12-7-34-8-55 1z",
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
        opacity={kind === "dad" ? 0.92 : 1}
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
      {kind === "dad" ? (
        <path
          d="M43 55c5 3 15 3 20 0v4c-6 4-15 4-20 0v-4z"
          fill={profile.hair}
          opacity="0.5"
        />
      ) : null}
    </svg>
  );
}

export function ParentProof() {
  return (
    <section className="px-[15px] pt-[15px]">
      <div className="rounded-lg bg-white">
        <div className="mx-auto flex max-w-[980px] flex-col items-center px-5 py-12 text-center sm:py-16 lg:py-20">
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
                <ParentAvatar kind={parent.kind} label={parent.label} />
              </div>
            ))}
          </div>

          <h2 className="mt-9 max-w-[860px] text-[30px] font-normal leading-[1.28] tracking-tight text-[rgb(30,30,30)] sm:text-4xl lg:text-[46px]">
            Join{" "}
            <span className="font-extrabold">more than 23,000 parents</span>{" "}
            protecting their kids from in-game risks.
          </h2>
        </div>
      </div>
    </section>
  );
}
