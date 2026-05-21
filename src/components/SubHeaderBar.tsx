import { TryForFreeButton } from "@/components/wizard/TryForFreeButton";

/**
 * Sub-header bar that sits directly below the main SiteHeader. Pattern
 * inspired by bark.us — the page name + pricing strip on the left, primary
 * CTA pill on the right. Keeps the main navbar text-only.
 */
export function SubHeaderBar() {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-[var(--bark-border)] bg-white font-[var(--bark-sans)]">
      <div className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between gap-4 px-5 lg:px-8">
        <div className="flex flex-col justify-center leading-none">
          <span className="text-[16px] font-bold text-[var(--bark-text)]">
            Parental Controls
          </span>
          <span className="mt-1 text-[14px] leading-5 text-[var(--bark-muted)]">
            From $14.99/mo
          </span>
        </div>
        <div className="flex min-w-fit items-center gap-4 sm:gap-6">
          <span className="hidden text-[14px] leading-5 text-[var(--bark-muted)] sm:inline">
            Starts at <span className="text-[var(--bark-text)]">$14.99/mo</span>
          </span>
          <SubHeaderTryButton />
        </div>
      </div>
    </div>
  );
}

function SubHeaderTryButton() {
  return (
    <TryForFreeButton variant="subheader" label="Try for free" />
  );
}
