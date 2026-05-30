export type KodaPlanId = "monthly" | "quarterly" | "annual";

export type KodaPlan = {
  id: KodaPlanId;
  name: string;
  eyebrow?: string;
  description: string;
  priceLabel: string;
  originalLabel?: string;
  amountCents: number;
  billingLabel: string;
  perMonthLabel: string;
  perDayLabel: string;
  originalPerDayLabel?: string;
  badge?: string;
  checkoutLabel: string;
};

export const KODA_PLANS: KodaPlan[] = [
  {
    id: "monthly",
    name: "1-Month Plan",
    description: "Flexible protection for one child profile.",
    priceLabel: "$1.00",
    originalLabel: "$24.99",
    amountCents: 100,
    billingLabel: "Billed monthly",
    perMonthLabel: "$12.49/mo",
    perDayLabel: "$0.42",
    originalPerDayLabel: "$0.83",
    checkoutLabel: "1-month Koda plan",
  },
  {
    id: "quarterly",
    name: "3-Month Plan",
    eyebrow: "MOST POPULAR",
    description: "A calmer way to cover the next season of gaming.",
    priceLabel: "$29.97",
    originalLabel: "$59.97",
    amountCents: 2997,
    billingLabel: "Billed every 3 months",
    perMonthLabel: "$9.99/mo",
    perDayLabel: "$0.33",
    originalPerDayLabel: "$0.67",
    badge: "Save 20%",
    checkoutLabel: "3-month Koda plan",
  },
  {
    id: "annual",
    name: "1-Year Plan",
    eyebrow: "BEST VALUE",
    description: "The lowest daily price for year-round protection.",
    priceLabel: "$74.94",
    originalLabel: "$149.88",
    amountCents: 7494,
    billingLabel: "Billed yearly",
    perMonthLabel: "$6.25/mo",
    perDayLabel: "$0.21",
    originalPerDayLabel: "$0.41",
    badge: "Save 50%",
    checkoutLabel: "1-year Koda plan",
  },
];

export const DEFAULT_KODA_PLAN_ID: KodaPlanId = "quarterly";

export function getKodaPlan(planId: string | null | undefined): KodaPlan {
  return (
    KODA_PLANS.find((plan) => plan.id === planId) ??
    KODA_PLANS.find((plan) => plan.id === DEFAULT_KODA_PLAN_ID)!
  );
}
