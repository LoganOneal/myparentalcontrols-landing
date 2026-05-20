import Link from "next/link";

/**
 * Sub-header bar that sits directly below the main SiteHeader. Pattern
 * inspired by bark.us — the page name + pricing strip on the left, primary
 * CTA pill on the right. Keeps the main navbar text-only.
 */
export function SubHeaderBar() {
  return (
    <div className="bg-white border-b border-gray-200 w-full">
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
          href="/#waitlist"
          className="bg-black text-white rounded-full px-5 py-2.5 text-[14px] font-semibold whitespace-nowrap hover:bg-gray-900 transition-colors"
        >
          Join the waitlist
        </Link>
      </div>
    </div>
  );
}
