"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { joinWaitlist } from "@/lib/waitlist-client";

type SubmitState = "idle" | "submitting" | "success";

export function FooterNewsletterForm() {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || state === "submitting") return;

    setState("submitting");
    setError(null);
    try {
      await joinWaitlist(trimmedEmail);
      setState("success");
      setEmail("");
    } catch {
      setState("idle");
      setError("We couldn't save your email. Please try again.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 sm:gap-3 lg:flex-1 lg:items-end"
    >
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:justify-end">
        <label htmlFor={emailId} className="text-white text-base m-0">
          Sign up for our newsletter:
        </label>
        <div
          className="relative flex h-12 w-full items-center rounded-full border border-[rgb(225,228,232)] sm:max-w-[420px]"
        >
          <input
            id={emailId}
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            aria-label="Sign up for our newsletter"
            aria-describedby={error ? `${emailId}-message` : undefined}
            disabled={state === "submitting" || state === "success"}
            className="h-full min-w-0 flex-1 rounded-full bg-transparent pl-4 pr-12 text-base text-white outline-none placeholder:text-[rgb(153,153,153)] disabled:cursor-not-allowed disabled:opacity-70"
          />
          <button
            type="submit"
            aria-label={state === "submitting" ? "Submitting" : "Submit"}
            title={state === "submitting" ? "Submitting" : "Submit"}
            disabled={state === "submitting" || state === "success" || !email.trim()}
            className="absolute right-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
      <p
        id={`${emailId}-message`}
        className={`min-h-5 text-sm ${
          error ? "text-red-200" : "text-white/70"
        }`}
        role={error ? "alert" : "status"}
        aria-live="polite"
      >
        {state === "success"
          ? "You're signed up. We'll email you when there is news."
          : state === "submitting"
            ? "Saving..."
            : error ?? ""}
      </p>
    </form>
  );
}
