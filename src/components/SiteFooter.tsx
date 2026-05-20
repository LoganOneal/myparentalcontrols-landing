import Link from "next/link";
import Image from "next/image";
import {
  AppStoreBadge,
  LinkedInIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/icons";

const FOOTER_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif';

const NAV_TITLE_COLOR = "rgb(153, 153, 153)";

type NavLink = { label: string; href: string };

type NavColumn = { title: string; links: NavLink[] };

const NAV_COLUMNS: NavColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Platforms", href: "/platforms" },
      { label: "App Reviews", href: "/app-reviews" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "mailto:support@myparentalcontrols.com" },
      { label: "Login", href: "/login" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "App Reviews", href: "/app-reviews" },
      { label: "Manage Subscription", href: "/manage-subscription" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/tos" },
      { label: "Sweepstakes Rules", href: "/sweepstakes" },
    ],
  },
];

const QUICK_LINKS: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/tos" },
  { label: "Privacy Rights (CA)", href: "/privacy#ca_privacy_rights" },
  { label: "Sweepstakes", href: "/sweepstakes" },
];

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1={5} y1={12} x2={19} y2={12} />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function FooterLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="MyParentalControls home">
      <Image
        src="/images/mpc-logo-icon.svg"
        alt=""
        aria-hidden
        width={36}
        height={36}
        className="shrink-0"
      />
      <span
        className="font-bold tracking-tight whitespace-nowrap text-white text-[22px] leading-none"
        style={{ fontFamily: FOOTER_FONT_STACK }}
      >
        MyParentalControls
      </span>
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="text-white"
      style={{
        backgroundColor: "rgb(32, 32, 32)",
        fontFamily: FOOTER_FONT_STACK,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 pt-10">
        {/* Top row: logo + newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
          <div className="shrink-0">
            <FooterLogo />
          </div>
          <form
            action="mailto:support@myparentalcontrols.com"
            method="post"
            encType="text/plain"
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:flex-1 lg:justify-end"
          >
            <p className="text-white text-base m-0">Sign up for our newsletter:</p>
            <div
              className="relative flex items-center w-full sm:max-w-[420px]"
              style={{
                border: "1px solid rgb(225, 228, 232)",
                borderRadius: 25,
                height: 48,
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Email address"
                aria-label="Sign up for our newsletter"
                className="flex-1 h-full bg-transparent outline-none pl-4 pr-12 text-base placeholder:text-[rgb(153,153,153)] text-white rounded-full"
              />
              <button
                type="submit"
                aria-label="Submit"
                title="Submit"
                className="absolute right-3 inline-flex items-center justify-center text-white hover:opacity-70 transition-opacity"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </form>
        </div>

        {/* Nav columns + Download */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <p
                className="text-[20px] font-normal m-0"
                style={{ color: NAV_TITLE_COLOR }}
              >
                {col.title}
              </p>
              <ul className="mt-[18px] space-y-3 list-none p-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white text-base no-underline hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p
              className="text-[20px] font-normal m-0"
              style={{ color: NAV_TITLE_COLOR }}
            >
              Download MyParentalControls
            </p>
            <div className="mt-[18px] flex flex-col gap-3 items-start">
              <Link
                href="https://apps.apple.com/us/app/cal-ai-calorie-tracker/id6480417616?ppid=0fdd527c-4a8a-4b3f-9db0-ee844938c041"
                aria-label="Download on the App Store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppStoreBadge />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.viraldevelopment.calai"
                aria-label="Get it on Google Play"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/googleplay.png"
                  alt="Get it on Google Play"
                  width={135}
                  height={41}
                  className="h-[41px] w-auto"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="h-[60px]" />
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: "rgb(0, 0, 0)" }}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-5 flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 list-none p-0 m-0">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-white no-underline hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p
              className="text-[12px] m-0"
              style={{ color: NAV_TITLE_COLOR }}
            >
              © 2026 MyParentalControls
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="text-[12px]"
              style={{ color: NAV_TITLE_COLOR }}
            >
              Follow us:
            </span>
            <Link
              href="https://www.linkedin.com/company/cal-ai-app/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-70 transition-opacity"
            >
              <LinkedInIcon className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="https://www.instagram.com/calai.app/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-70 transition-opacity"
            >
              <InstagramIcon className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="https://www.tiktok.com/@getcalai"
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-70 transition-opacity"
            >
              <TikTokIcon className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
