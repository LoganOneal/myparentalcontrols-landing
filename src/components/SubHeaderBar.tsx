import Link from "next/link";

/**
 * Sub-header bar that sits directly below the main SiteHeader. Pattern
 * inspired by bark.us — the page name + pricing strip on the left, primary
 * CTA pill on the right. Keeps the main navbar text-only.
 */
export function SubHeaderBar() {
  return (
    <div className="bg-white border-b border-gray-200 w-full sticky top-0 z-40">
      <div className="max-w-[1280px] mx-auto h-[68px] px-5 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex flex-col leading-tight">
          <span
            className="text-[16px] font-bold"
            style={{ color: "rgb(30, 30, 30)" }}
          >
            Parental Controls
          </span>
          <span className="text-[14px] text-gray-600">
            From $14.99/mo
          </span>
        </div>
        <Link
          href="/signup"
          className="bg-[#2563EB] rounded-full px-5 py-2.5 whitespace-nowrap hover:bg-[#1D4ED8] transition-colors"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "14px",
            color: "rgb(255, 255, 255)",
          }}
        >
          Try for Free
        </Link>
      </div>
    </div>
  );
}
