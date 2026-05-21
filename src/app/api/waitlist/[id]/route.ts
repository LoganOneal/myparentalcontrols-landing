import { NextResponse } from "next/server";
import { z } from "zod";
import { patchWaitlistRecord } from "@/lib/airtable";

export const runtime = "nodejs";

const PatchSchema = z.object({
  kidsCount: z.number().int().min(1).max(12).optional(),
  kidsAges: z.array(z.number().int().min(0).max(25)).max(12).optional(),
  games: z.array(z.string().max(60)).max(50).optional(),
  concerns: z.array(z.string().max(140)).max(50).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body;
  try {
    body = PatchSchema.parse(await req.json());
  } catch {
    return new NextResponse("Invalid body", { status: 400 });
  }

  const fields: Record<string, unknown> = {};
  if (body.kidsCount !== undefined) fields["Kids Count"] = body.kidsCount;
  if (body.kidsAges !== undefined)
    fields["Kids Ages"] = JSON.stringify(body.kidsAges);
  if (body.games !== undefined) fields["Games"] = body.games;
  if (body.concerns !== undefined) fields["Concerns"] = body.concerns.join(", ");

  try {
    await patchWaitlistRecord(id, fields);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist PATCH failed", err);
    return new NextResponse("Could not update record", { status: 500 });
  }
}
