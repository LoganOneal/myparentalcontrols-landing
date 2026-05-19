"use client";

export function PressForm() {
  return (
    <form
      className="bg-white rounded-3xl shadow-xl mt-12 p-6 sm:p-10 max-w-2xl mx-auto flex flex-col gap-5"
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
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10"
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
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10"
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
          placeholder="Please provide details about your media inquiry, including deadline, outlet information, and specific questions you'd like answered..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 resize-vertical"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white rounded-xl py-4 font-bold hover:bg-gray-900 transition-colors"
      >
        Send Press Inquiry
      </button>
    </form>
  );
}
