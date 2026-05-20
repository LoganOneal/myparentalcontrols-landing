"use client";

import Link from "next/link";
import { useState } from "react";
import { MyParentalControlsLogo, HamburgerIcon, CloseIcon } from "@/components/icons";

/**
 * Navbar design inspired by bark.us — 68px tall, white background, plain
 * text nav, light bottom border, max-width 1280px container, static (not
 * sticky). Mobile collapses everything except the logo + a hamburger.
 */

const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/app-reviews", label: "App reviews" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 w-full relative z-50">
      <div className="max-w-[1280px] mx-auto h-[68px] px-5 lg:px-8 flex items-center">
        <Link
          href="/"
          className="flex items-center shrink-0"
          aria-label="MyParentalControls home"
          onClick={() => setMobileOpen(false)}
        >
          <MyParentalControlsLogo height={26} />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-8 ml-10 text-[18px] leading-[27px] font-normal"
          style={{ color: "rgb(30, 30, 30)" }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:opacity-70 transition-opacity"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Sign-in link on the right — primary CTA lives in the
            sub-header bar below, matching the bark.us pattern. */}
        <div className="hidden lg:flex items-center gap-5 ml-auto">
          <Link
            href="/login"
            className="text-[18px] leading-[27px] hover:opacity-70 transition-opacity"
            style={{ color: "rgb(30, 30, 30)" }}
          >
            Sign in
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden ml-auto w-10 h-10 flex items-center justify-center"
          style={{ color: "rgb(30, 30, 30)" }}
        >
          {mobileOpen ? (
            <CloseIcon className="w-6 h-6" />
          ) : (
            <HamburgerIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav
            aria-label="Mobile primary"
            className="max-w-[1280px] mx-auto px-5 py-4 flex flex-col gap-1 text-[18px]"
            style={{ color: "rgb(30, 30, 30)" }}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 border-b border-gray-100 last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="py-3 border-b border-gray-100"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="mt-3 bg-[#2563EB] text-white rounded-full px-5 py-3 font-semibold text-center hover:bg-[#1D4ED8] transition-colors"
            >
              Try for Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
