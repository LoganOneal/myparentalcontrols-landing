import { NextResponse } from "next/server";
import { z } from "zod";
import { getWaitlistRecord } from "@/lib/airtable";
import { createSkipLineCheckoutSession } from "@/lib/stripe";

export const runtime = "nodejs";

const BodySchema = z.object({ recordId: z.string().min(1) });

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return new NextResponse("Invalid body", { status: 400 });
  }

  try {
    const record = await getWaitlistRecord(parsed.recordId);
    const email = record.fields.Email;
    if (!email) {
      return new NextResponse("Record missing email", { status: 400 });
    }
    const session = await createSkipLineCheckoutSession({
      recordId: record.id,
      email,
    });
    return NextResponse.json(session);
  } catch (err) {
    console.error("checkout failed", err);
    return new NextResponse("Could not start checkout", { status: 500 });
  }
}
