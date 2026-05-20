"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Inline waitlist capture for the hero.
 *
 * Layout: [ email input ] [ Protect my child now ]
 *         See how it works →
 *
 * On submit, replaces the form with a success confirmation. Hook
 * `onSubmit` to your real CRM/mailing provider later.
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

  return (
    <div className="flex flex-col gap-2 max-w-[510px]">
      {submitted ? (
        <div className="rounded-2xl bg-green-50 border border-green-200 text-green-900 px-5 py-4">
          ✓ You&rsquo;re on the list. We&rsquo;ll email the moment a spot opens.
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row gap-2 w-full"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-base bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <button
            type="submit"
            className="bg-black text-white rounded-full px-6 py-3 font-semibold whitespace-nowrap hover:bg-gray-900 transition-colors"
          >
            Protect my child now
          </button>
        </form>
      )}

      <Link
        href="#how-it-works"
        className="text-sm text-gray-700 hover:text-black hover:underline font-medium w-fit"
      >
        See how it works →
      </Link>

      <p className="text-xs text-gray-600 mt-1">
        5-min setup · We&rsquo;re at capacity — join 12,000+ parents on the waitlist.
      </p>
    </div>
  );
}
