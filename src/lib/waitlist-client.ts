import type { CreateWaitlistResponse } from "@/types/wizard";

export async function joinWaitlist(
  email: string,
): Promise<CreateWaitlistResponse> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as CreateWaitlistResponse;
}
