import { Resend } from "resend";
import { renderWelcomeEmail } from "@/emails/WelcomeEmail";
import { renderPremiumQueueEmail } from "@/emails/PremiumQueueEmail";

let cached: Resend | null = null;

function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY env var");
  cached = new Resend(key);
  return cached;
}

function fromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL ?? "Koda <hello@myparentalcontrols.com>"
  );
}

export async function sendWelcomeEmail(args: {
  to: string;
  waitlistPosition: number;
}): Promise<void> {
  const resend = getResend();
  const { subject, html } = renderWelcomeEmail({
    waitlistPosition: args.waitlistPosition,
  });
  await resend.emails.send({
    from: fromAddress(),
    to: args.to,
    subject,
    html,
  });
}

export async function sendPremiumQueueEmail(args: {
  to: string;
  premiumPosition: number;
}): Promise<void> {
  const resend = getResend();
  const { subject, html } = renderPremiumQueueEmail({
    premiumPosition: args.premiumPosition,
  });
  await resend.emails.send({
    from: fromAddress(),
    to: args.to,
    subject,
    html,
  });
}
