import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createWaitlistRecord,
  findWaitlistByEmail,
} from "@/lib/airtable";
import { sendWelcomeEmail } from "@/lib/resend";
import { formatWaitlistPosition } from "@/lib/positions";

export const runtime = "nodejs";

const BodySchema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return new NextResponse("Invalid email", { status: 400 });
  }
  const { email } = parsed;

  try {
    const existing = await findWaitlistByEmail(email);
    const record = existing ?? (await createWaitlistRecord({ email }));
    const autonumber = record.fields.Position ?? 1;
    const position = formatWaitlistPosition(autonumber);

    if (!existing) {
      // Fire and forget — don't block UX on email delivery.
      sendWelcomeEmail({ to: email, waitlistPosition: position }).catch(
        (e) => console.error("welcome email failed", e),
      );
    }

    return NextResponse.json({ recordId: record.id, position });
  } catch (err) {
    console.error("waitlist POST failed", err);
    return new NextResponse("Could not save waitlist record", { status: 500 });
  }
}
