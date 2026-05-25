import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AppleLogoIcon, GoogleLogoIcon } from "@/components/icons";

export const metadata = {
  title: "Login | Koda",
  description: "Sign in to your Koda account.",
  alternates: {
    canonical: "/login",
  },
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-screen-xl mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-start">
        <h1 className="text-3xl sm:text-4xl font-bold text-black text-center">
          Welcome back
        </h1>
        <p className="mt-3 text-base text-gray-600 text-center">
          Sign in to your Koda account
        </p>

        <div className="bg-white rounded-3xl shadow-xl mt-10 p-6 sm:p-8 w-full max-w-md flex flex-col gap-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3.5 font-medium text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <GoogleLogoIcon />
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-black text-white rounded-xl py-3.5 font-medium hover:bg-gray-900 transition-colors"
          >
            <AppleLogoIcon className="w-5 h-5" />
            Continue with Apple
          </button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
