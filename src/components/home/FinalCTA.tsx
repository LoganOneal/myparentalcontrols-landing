import Link from "next/link";
import { AppStoreBadge, StarIcon } from "@/components/icons";

export function FinalCTA() {
  return (
    <section className="py-16 lg:py-44 px-4 relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dark-gradient.png"
        alt="Background gradient"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center relative z-10">
        <div className="flex items-center justify-center gap-8 sm:gap-16 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wreath.svg"
            alt="Laurel wreath"
            width={42}
            height={120}
          />
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 mb-3 text-xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} aria-hidden>⭐</span>
              ))}
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-[48px] leading-tight text-black"
              style={{
                fontFamily: "Moderat-Black, sans-serif",
                fontWeight: 700,
              }}
            >
              Over 100k 5-star ratings
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-800">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5" />
                <span>4.8/5</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5" />
                <span>4.7/5</span>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wreath.svg"
            alt="Laurel wreath"
            width={42}
            height={120}
            className="scale-x-[-1]"
          />
        </div>
        <div className="flex sm:flex-row flex-col gap-4 mt-10">
          <Link
            href="https://apps.apple.com/us/app/cal-ai-calorie-tracker/id6480417616?ppid=0fdd527c-4a8a-4b3f-9db0-ee844938c041"
            aria-label="Download on the App Store"
          >
            <AppStoreBadge width={162} height={49.2} />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.viraldevelopment.calai"
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
    </section>
  );
}
