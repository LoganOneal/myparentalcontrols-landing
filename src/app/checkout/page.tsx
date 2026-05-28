import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Secure Checkout | Koda",
  description: "Complete your Koda plan purchase using secure Stripe checkout.",
  alternates: {
    canonical: "/checkout",
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
