"use client";

import { useState } from "react";

/**
 * Inline waitlist capture for the hero.
 *
 * Layout: a single rounded-pill input wrapper containing the email field
 * and the submit button — the button sits flush inside the right edge of
 * the field. The whole form fills the width of its parent container.
 *
 * Hook `onSubmit` to your CRM / mailing-list provider when ready.
 */
export function HeroWaitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    // TODO: POST to /api/waitlist or your mailing-list provider
  }

  if (submitted) {
    return (
      <div className="w-full rounded-2xl bg-green-50 border border-green-200 text-green-900 px-5 py-4">
        ✓ You&rsquo;re on the list. We&rsquo;ll email the moment a spot opens.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex items-center bg-white border border-gray-300 rounded-full pl-5 pr-1 py-1 focus-within:ring-2 focus-within:ring-black/10 transition-shadow"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="flex-1 min-w-0 bg-transparent border-none outline-none text-base py-2 placeholder-gray-400"
      />
      <button
        type="submit"
        className="shrink-0 bg-black text-white rounded-full px-5 py-2.5 font-semibold whitespace-nowrap hover:bg-gray-900 transition-colors"
      >
        Get Started
      </button>
    </form>
  );
}
