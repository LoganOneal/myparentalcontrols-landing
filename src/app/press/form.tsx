"use client";

export function PressForm() {
  return (
    <form
      className="flex flex-col gap-5 rounded-lg border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-8"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label
          htmlFor="email"
          className="text-sm font-semibold text-black mb-2 block"
        >
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="your.email@example.com"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base placeholder-gray-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="text-sm font-semibold text-black mb-2 block"
        >
          Subject *
        </label>
        <input
          id="subject"
          type="text"
          required
          placeholder="Media inquiry subject"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base placeholder-gray-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="text-sm font-semibold text-black mb-2 block"
        >
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          required
          placeholder="Please provide details about your media inquiry, including deadline, outlet information, and specific questions you would like answered..."
          className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-base placeholder-gray-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#2563EB] px-6 font-bold text-white transition hover:bg-[#1D4ED8]"
      >
        Send Press Inquiry
      </button>
    </form>
  );
}
