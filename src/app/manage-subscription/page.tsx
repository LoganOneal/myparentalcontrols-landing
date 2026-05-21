import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ManageSubForm } from "./form";

export const metadata = {
  title: "MyParentalControls | Manage Subscription",
  description:
    "Manage your MyParentalControls subscription by entering the email address you subscribed with.",
};

export default function ManageSubscriptionPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-4 py-20 min-h-[60vh]">
        <div className="max-w-md mx-auto text-center pt-20">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Manage Subscription
          </h1>
          <p className="mt-4 text-base text-gray-600">
            If you purchased your subscription on the web, please enter the
            email address you subscribed with in order to change your
            subscription.
          </p>

          <ManageSubForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
