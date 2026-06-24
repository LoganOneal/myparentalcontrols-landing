import Link from "next/link";
import {
  LinkedInIcon,
  InstagramIcon,
  KodaLogo,
  TikTokIcon,
} from "@/components/icons";
import { FooterNewsletterForm } from "@/components/FooterNewsletterForm";

const FOOTER_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif';

const NAV_TITLE_COLOR = "rgb(153, 153, 153)";
const FIGMA_COMMUNITY_FILE_URL =
  "https://www.figma.com/community/file/1651705913598943234";

type NavLink = { label: string; href: string };

type NavColumn = { title: string; links: NavLink[] };

const NAV_COLUMNS: NavColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Parental Controls", href: "/" },
      { label: "How Koda Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Game Safety", href: "/game-safety" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "mailto:support@kodasafety.com" },
      { label: "Login", href: "/login" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Koda Parental Controls Guide", href: "/blog/what-is-koda-safety" },
      { label: "Safety & Privacy", href: "/safety-privacy" },
      { label: "Game Safety", href: "/game-safety" },
      { label: "Figma Community File", href: FIGMA_COMMUNITY_FILE_URL },
      { label: "Manage Subscription", href: "/manage-subscription" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/tos" },
    ],
  },
];

const QUICK_LINKS: NavLink[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/tos" },
  { label: "Safety & Privacy", href: "/safety-privacy" },
  { label: "Privacy Rights (CA)", href: "/privacy#ca_privacy_rights" },
];

function FooterLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="Koda home">
      <KodaLogo height={42} markSrc="/seo/logo-no-bg.svg" />
    </Link>
  );
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function FooterTextLink({
  link,
  className,
}: {
  link: NavLink;
  className: string;
}) {
  if (isExternalHref(link.href)) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
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
          <FooterNewsletterForm />
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
                    <FooterTextLink
                      link={link}
                      className="text-white text-base no-underline hover:underline"
                    />
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
              Get Koda
            </p>
            <div className="mt-[18px] flex flex-col gap-3 items-start">
              <Link
                href="/get-started"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--bark-blue)] px-5 text-[16px] font-bold leading-none text-white transition-colors hover:bg-[var(--bark-blue-hover)]"
              >
                Get Started
              </Link>
              <p className="m-0 max-w-[190px] text-sm leading-5 text-white/70">
                Join the early-access waitlist for family monitoring.
              </p>
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
                  <FooterTextLink
                    link={link}
                    className="text-[11px] text-white no-underline hover:underline"
                  />
                </li>
              ))}
            </ul>
            <p
              className="text-[12px] m-0"
              style={{ color: NAV_TITLE_COLOR }}
            >
              © 2026 Koda
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
              href="https://www.linkedin.com/company/kodasafety/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-70 transition-opacity"
            >
              <LinkedInIcon className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="https://www.instagram.com/kodasafety/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-70 transition-opacity"
            >
              <InstagramIcon className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="https://www.tiktok.com/@kodasafety"
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
