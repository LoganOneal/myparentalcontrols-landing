const WAITLIST_BASE = Number(process.env.WAITLIST_BASE_OFFSET ?? 4233);
const PREMIUM_BASE = Number(process.env.PREMIUM_BASE_OFFSET ?? 7);

export function formatWaitlistPosition(autonumber: number): number {
  return WAITLIST_BASE + autonumber;
}

export function formatPremiumPosition(paidCount: number): number {
  return PREMIUM_BASE + paidCount;
}
