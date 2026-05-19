import Link from "next/link";
import { AppStoreBadge } from "@/components/icons";

export function Hero() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 mt-10 items-center max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-4 w-fit mx-auto p-5 sm:p-0 -mt-10">
        <div className="flex items-center h-[42.5px] border border-[#c6c6c68f] rounded-full p-1.5 pr-3 text-xs gap-2 w-fit">
          <div className="flex sm:-space-x-3 -space-x-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/used-by-1.png" alt="used by 1" className="w-[30px] h-[30px] sm:w-[30px] sm:h-[30px] rounded-full border-2 border-white" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/used-by-2.png" alt="used by 2" className="w-[30px] h-[30px] sm:w-[30px] sm:h-[30px] rounded-full border-2 border-white" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/used-by-3.png" alt="used by 3" className="w-[30px] h-[30px] sm:w-[30px] sm:h-[30px] rounded-full border-2 border-white" />
          </div>
          <div className="font-medium sm:text-sm text-xs">
            Loved by 5M users with ⭐ 4.9 rating
          </div>
        </div>

        <h1 className="text-[40px] sm:text-[52px] font-bold leading-tight max-w-[510px]">
          Meet Cal AI <br />
          <span className="font-medium">
            Track your calories
            <br />
            with just a picture
          </span>
        </h1>

        <p className="opacity-60 text-base font-normal max-w-[510px]">
          Meet Cal AI, the AI-powered app for easy calorie tracking. Snap a
          photo, scan a barcode, or describe your meal and get instant calorie
          and nutrient info.
        </p>

        <div className="flex sm:flex-row flex-col gap-4 mt-2">
          <Link
            href="https://apps.apple.com/us/app/cal-ai-calorie-tracker/id6480417616?ppid=0fdd527c-4a8a-4b3f-9db0-ee844938c041"
            className="block"
            aria-label="Download on the App Store"
          >
            <AppStoreBadge width={162} height={49.2} />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.viraldevelopment.calai"
            className="block"
            aria-label="Get it on Google Play"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/googleplay.png"
              alt="Google Play"
              width={170}
              height={50}
              className="h-[50px] w-auto"
            />
          </Link>
        </div>
      </div>

      <div className="overflow-hidden sm:overflow-visible mx-auto pb-40 sm:pb-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-image.webp"
          alt="hero-preview"
          width={1000}
          height={900}
          className="h-full w-full max-w-[700px] object-contain"
        />
      </div>
    </main>
  );
}
