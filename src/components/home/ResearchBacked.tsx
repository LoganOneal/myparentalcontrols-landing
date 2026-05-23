function Laurel({ side }: { side: "left" | "right" }) {
  const mirrored = side === "right";

  return (
    <svg
      viewBox="0 0 120 220"
      aria-hidden="true"
      className={`pointer-events-none absolute top-10 h-28 w-16 text-[var(--bark-blue)] sm:top-1/2 sm:h-36 sm:w-20 sm:-translate-y-1/2 lg:h-44 lg:w-24 ${
        mirrored
          ? "right-2 -scale-x-100 sm:right-8 lg:right-10"
          : "left-2 sm:left-8 lg:left-10"
      }`}
    >
      <g fill="currentColor">
        {[
          { x: 82, y: 23, r: -39 },
          { x: 66, y: 43, r: -47 },
          { x: 52, y: 66, r: -55 },
          { x: 42, y: 92, r: -64 },
          { x: 37, y: 120, r: -73 },
          { x: 40, y: 148, r: -84 },
          { x: 50, y: 174, r: -96 },
        ].map((leaf) => (
          <ellipse
            key={`${leaf.x}-${leaf.y}`}
            cx={leaf.x}
            cy={leaf.y}
            rx="9"
            ry="24"
            transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
          />
        ))}
      </g>
      <path
        d="M93 14C42 65 27 128 56 202"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="7"
      />
    </svg>
  );
}

export function ResearchBacked() {
  return (
    <section className="px-[15px] pt-[15px]">
      <div className="rounded-lg bg-white">
        <div className="relative mx-auto max-w-[1080px] px-5 py-12 text-center sm:px-20 sm:py-16 lg:px-28 lg:py-20">
          <Laurel side="left" />

          <div className="relative z-10 mx-auto max-w-[760px]">
            <p
              className="text-[26px] font-black uppercase leading-[1.22] tracking-[0.14em] text-[rgb(30,30,30)] sm:text-[38px] sm:tracking-[0.16em] lg:text-[48px]"
              style={{
                fontFamily: "var(--bark-heading)",
              }}
            >
              Research-backed
            </p>
            <p className="mx-auto mt-7 max-w-[760px] text-[24px] font-normal leading-[1.38] tracking-normal text-[rgb(30,30,30)] sm:text-[32px] lg:text-[40px]">
              Built around documented grooming warning signs, including
              secrecy, private chat requests, age questions, and attempts to
              move conversations off-platform.
            </p>
          </div>

          <Laurel side="right" />
        </div>
      </div>
    </section>
  );
}
