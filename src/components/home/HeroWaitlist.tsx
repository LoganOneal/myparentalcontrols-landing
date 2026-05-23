"use client";

import { useState } from "react";
import { joinWaitlist } from "@/lib/waitlist-client";

/**
 * Inline waitlist capture for the hero.
 *
 * Layout: a single rounded-pill input wrapper containing the email field
 * and the submit button — the button sits flush inside the right edge of
 * the field. The whole form fills the width of its parent container.
 *
 * Submits through the waitlist API so Airtable and Supabase stay in sync.
 */
export function HeroWaitlist() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const result = await joinWaitlist(trimmedEmail);
      setPosition(result.position);
    } catch {
      setError("We couldn't save your email. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (position !== null) {
    return (
      <div
        className="w-full rounded-2xl bg-green-50 border border-green-200 text-green-900 px-5 py-4"
        role="status"
      >
        You&rsquo;re on the list at #{position}. We&rsquo;ll email the moment a
        spot opens.
      </div>
    );
  }

  return (
    <div className="w-full">
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
          disabled={submitting || !email.trim()}
          className="shrink-0 bg-black text-white rounded-full px-5 py-2.5 font-semibold whitespace-nowrap hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-black/50 transition-colors"
        >
          {submitting ? "Saving..." : "Get Started"}
        </button>
      </form>
      {error ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
