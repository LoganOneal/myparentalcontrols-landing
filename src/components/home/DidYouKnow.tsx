import Image from "next/image";

export function DidYouKnow() {
  return (
    <section className="px-[15px] pt-[15px]">
      <div className="rounded-lg bg-white">
        <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
          <div className="relative overflow-hidden rounded-[28px] bg-slate-900 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.45)]">
            <Image
              src="/images/did-you-know-risk-timeline.png"
              alt="Child gaming while a risk timeline alert is highlighted"
              width={1254}
              height={1254}
              className="aspect-[16/10] w-full object-cover"
              priority={false}
            />
          </div>

          <div className="mx-auto mt-9 max-w-[860px] border-l-4 border-[#2563EB] pl-6 sm:mt-12 sm:pl-10">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#2563EB] sm:text-base">
              Did you know?
            </p>
            <p className="mt-5 text-[30px] font-semibold leading-[1.22] text-[rgb(30,30,30)] sm:text-4xl lg:text-[46px]">
              Online grooming can unfold in as little as{" "}
              <span className="font-extrabold text-orange-600">
                18 minutes
              </span>
              . That means risk can develop long before a weekly screen-time
              report or blocked-site alert ever helps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
