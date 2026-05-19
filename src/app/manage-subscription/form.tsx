"use client";

export function ManageSubForm() {
  return (
    <form
      className="mt-8 text-left flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label
          htmlFor="email"
          className="text-sm font-semibold text-black mb-2 block"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white rounded-xl py-4 font-bold hover:bg-gray-900 transition-colors"
      >
        Send
      </button>
    </form>
  );
}
