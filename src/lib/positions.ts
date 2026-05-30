// Waitlist position is now assigned directly by a Postgres sequence
// (see scripts/supabase-waitlist-counter.sql) starting at 4234, so no
// offset is applied — the stored value IS the display value.

const PREMIUM_BASE = Number(process.env.PREMIUM_BASE_OFFSET ?? 7);

export function formatPremiumPosition(paidCount: number): number {
  return PREMIUM_BASE + paidCount;
}

const WAITLIST_QUEUE_BASE = 37892;

export function formatWaitlistQueuePosition(paidCount: number): number {
  return WAITLIST_QUEUE_BASE + paidCount;
}
