import Link from "next/link";
import { MyParentalControlsLogo, AppStoreBadge } from "@/components/icons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "mailto:apply@calai.app", label: "Jobs" },
  { href: "/press", label: "Press" },
  { href: "/manage-subscription", label: "Manage Subscription" },
  { href: "/login", label: "Login" },
];

export function SiteHeader() {
  return (
    <header className="backdrop-blur-xl bg-white/20 sticky top-0 z-50 px-5 xl:px-0 py-4">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="text-lg flex w-full lg:w-auto items-center justify-between gap-2">
          <Link href="/" className="flex items-center">
            <MyParentalControlsLogo height={32} />
          </Link>
          <div className="hidden lg:flex items-center gap-6 ml-10">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[18px] font-normal text-black hover:underline"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="https://apps.apple.com/us/app/cal-ai-calorie-tracker/id6480417616?ppid=0fdd527c-4a8a-4b3f-9db0-ee844938c041"
            aria-label="Download on the App Store"
          >
            <AppStoreBadge />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.viraldevelopment.calai"
            aria-label="Get it on Google Play"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/googleplay.png"
              alt="Get it on Google Play"
              width={135}
              height={41}
              className="h-[41px] w-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
