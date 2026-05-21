import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createWaitlistRecord,
  findWaitlistByEmail,
} from "@/lib/airtable";
import {
  claimNextWaitlistPosition,
  upsertWaitlistEmail,
} from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/resend";

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

    let record;
    let position: number;
    if (existing) {
      record = existing;
      position = existing.fields.Position ?? 0;
    } else {
      // Claim the atomic counter from Supabase BEFORE writing to either DB
      // so both rows end up with the same display number.
      position = await claimNextWaitlistPosition();
      record = await createWaitlistRecord({ email, position });
    }

    // Mirror to Supabase. Don't block the request on a Supabase outage —
    // Airtable is already the source of truth for the wizard's recordId.
    upsertWaitlistEmail({
      email,
      position,
      airtableRecordId: record.id,
    }).catch((e) => console.error("supabase upsert failed", e));

    if (!existing) {
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
