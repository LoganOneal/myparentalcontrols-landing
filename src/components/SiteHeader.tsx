"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { KodaLogo } from "@/components/icons";

/**
 * Navbar design adapted from bark.us: a quiet 68px white bar, centered
 * 1280px container, system-font links, subtle chevrons, and a simple
 * logo/menu mobile treatment. Links stay pointed at this site's pages.
 */

type NavLink = {
  href: string;
  label: string;
  description?: string;
};

type NavGroup = {
  label: string;
  links: NavLink[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Products",
    links: [
      {
        href: "/",
        label: "Parental Controls",
        description: "Parental controls for PC games, voice chat, and online risk.",
      },
      {
        href: "/how-it-works",
        label: "How Koda Works",
        description: "How setup, monitoring, and parent alerts work.",
      },
      {
        href: "/pricing",
        label: "Pricing",
        description: "Voice and chat alerts with clear pricing.",
      },
    ],
  },
];

const NAV_LINKS: NavLink[] = [
  { href: "/game-safety", label: "Game Safety" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/compare/bark", label: "Comparisons" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press" },
];

const navLinkClass =
  "inline-flex h-full items-center text-[16px] leading-6 text-[var(--bark-text)] transition-colors hover:text-[var(--bark-blue)] focus-visible:outline-none focus-visible:text-[var(--bark-blue)]";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50 w-full border-b border-[var(--bark-border)] bg-white font-[var(--bark-sans)]">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center px-5 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Koda home"
          onClick={() => setMobileOpen(false)}
        >
          <KodaLogo height={34} markSize={44} textFirst />
        </Link>

        <nav
          aria-label="Primary"
          className="ml-9 hidden h-full items-center gap-7 xl:flex"
        >
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="group relative flex h-full items-center">
              <button
                type="button"
                className={`${navLinkClass} gap-1.5`}
                aria-haspopup="true"
              >
                <span>{group.label}</span>
                <ChevronDown
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  strokeWidth={2.2}
                />
              </button>
              <div className="pointer-events-none absolute left-[-18px] top-full w-[310px] pt-3 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                <div className="rounded-[10px] border border-[var(--bark-border)] bg-white p-2 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-md px-3 py-2.5 transition-colors hover:bg-[#F4F5F7] focus-visible:bg-[#F4F5F7] focus-visible:outline-none"
                    >
                      <span className="block text-[15px] font-bold leading-5 text-[var(--bark-text)]">
                        {link.label}
                      </span>
                      {link.description ? (
                        <span className="mt-0.5 block text-[13px] leading-[18px] text-[var(--bark-muted)]">
                          {link.description}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {NAV_LINKS.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={navLinkClass}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-5 xl:flex">
          <Link
            href="/login"
            className="text-[16px] leading-6 text-[var(--bark-text)] transition-colors hover:text-[var(--bark-blue)]"
          >
            Log in
          </Link>
          <Link
            href="/get-started"
            className="inline-flex h-9 items-center justify-center rounded-full bg-[var(--bark-blue)] px-5 text-[16px] font-bold leading-none text-white transition-colors hover:bg-[var(--bark-blue-hover)]"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto flex h-11 w-11 items-center justify-center text-[var(--bark-text)] transition-colors hover:text-[var(--bark-blue)] xl:hidden"
        >
          {mobileOpen ? (
            <X aria-hidden className="h-7 w-7" strokeWidth={2.2} />
          ) : (
            <Menu aria-hidden className="h-8 w-8" strokeWidth={2.2} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--bark-border)] bg-white xl:hidden">
          <nav
            aria-label="Mobile primary"
            className="mx-auto flex max-w-[1280px] flex-col px-5 py-4 text-[var(--bark-text)]"
          >
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="border-b border-[var(--bark-border)] py-3">
                <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--bark-muted)]">
                  {group.label}
                </div>
                <div className="grid gap-1">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md py-2 text-[18px] font-bold leading-6 transition-colors hover:text-[var(--bark-blue)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {NAV_LINKS.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-[var(--bark-border)] py-3 text-[18px] font-bold leading-6 transition-colors hover:text-[var(--bark-blue)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="border-b border-[var(--bark-border)] py-3 text-[18px] font-bold leading-6 transition-colors hover:text-[var(--bark-blue)]"
            >
              Log in
            </Link>
            <Link
              href="/get-started"
              onClick={() => setMobileOpen(false)}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[var(--bark-blue)] px-5 text-[16px] font-bold leading-none text-white transition-colors hover:bg-[var(--bark-blue-hover)]"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
