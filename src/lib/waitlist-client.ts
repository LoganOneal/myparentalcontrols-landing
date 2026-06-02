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

export async function saveQuizAnswers(
  recordId: string,
  quizAnswers: Record<string, string[]>,
): Promise<void> {
  const res = await fetch(`/api/waitlist/${recordId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quizAnswers }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
}
