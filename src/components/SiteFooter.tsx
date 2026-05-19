import Link from "next/link";
import {
  CalAILogo,
  AppStoreBadge,
  LinkedInIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="pt-7 mt-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <CalAILogo width={120} height={34} />
          <p className="mt-4 text-base font-normal">Download Cal AI</p>
          <div className="flex items-center gap-3 mt-3">
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

        <div>
          <h3 className="font-semibold text-base mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-black/80">
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/tos" className="hover:underline">
                Terms of use
              </Link>
            </li>
            <li>
              <Link href="/sweepstakes" className="hover:underline">
                Sweepstakes Rules
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="hover:underline text-left"
              >
                Manage Cookie Preferences
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-black/80">
            <li>
              <Link href="mailto:support@calai.app" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-2 py-2 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4">
        <p className="text-xs text-gray-600">© Copyright 2026, All rights reserved</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.linkedin.com/company/cal-ai-app/"
            aria-label="LinkedIn"
            className="text-black hover:opacity-70"
          >
            <LinkedInIcon className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.instagram.com/calai.app/"
            aria-label="Instagram"
            className="text-black hover:opacity-70"
          >
            <InstagramIcon className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.tiktok.com/@getcalai"
            aria-label="TikTok"
            className="text-black hover:opacity-70"
          >
            <TikTokIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
