export function DarkModeBanner() {
  return (
    <section className="py-32 lg:py-64 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-block bg-gray-100 text-xs uppercase tracking-wide text-gray-700 px-3 py-1.5 rounded-full font-medium mb-4">
            New feature
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-tight">
            <span className="font-bold">Dark Mode</span>
            <br />
            <span>for a sleek tracking</span>
            <br />
            <span>experience! 🌙✨</span>
          </h2>
          <p className="text-base text-gray-700 mt-6">New features weekly :)</p>
        </div>
        <div className="relative mx-auto lg:mx-0 lg:justify-self-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dark-iphone-preview.png"
            alt="Cal AI Dark Mode Preview"
            width={981}
            height={2001}
            className="w-full max-w-[400px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
