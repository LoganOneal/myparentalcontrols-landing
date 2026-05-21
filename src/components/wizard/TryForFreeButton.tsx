import Link from "next/link";

type Variant = "hero" | "subheader" | "pricing";

const VARIANTS: Record<Variant, string> = {
  hero:
    "mt-2 inline-flex items-center justify-center bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8 py-4 transition-colors shadow-sm",
  subheader:
    "inline-flex h-9 min-w-fit items-center justify-center rounded-full bg-[var(--bark-blue)] px-5 text-[16px] font-bold leading-none text-white transition-colors hover:bg-[var(--bark-blue-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bark-blue)] focus-visible:ring-offset-2",
  pricing:
    "mt-8 lg:mt-10 inline-flex items-center justify-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full px-8 py-4 font-semibold text-base sm:text-lg transition-colors",
};

const HERO_STYLE: React.CSSProperties = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "18px",
  color: "rgb(255, 255, 255)",
};

export function TryForFreeButton({
  variant,
  label = "Try for Free",
}: {
  variant: Variant;
  label?: string;
}) {
  const style = variant === "hero" ? HERO_STYLE : undefined;
  return (
    <Link
      href="/get-started"
      prefetch
      className={VARIANTS[variant]}
      style={style}
    >
      {label}
    </Link>
  );
}
