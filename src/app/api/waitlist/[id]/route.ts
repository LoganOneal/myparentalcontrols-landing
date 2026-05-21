import { NextResponse } from "next/server";
import { z } from "zod";
import { patchWaitlistRecord } from "@/lib/airtable";
import { patchWaitlistByAirtableId, type WaitlistPatch } from "@/lib/supabase";

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

  const airtableFields: Record<string, unknown> = {};
  const supabaseFields: WaitlistPatch = {};
  if (body.kidsCount !== undefined) {
    airtableFields["Kids Count"] = body.kidsCount;
    supabaseFields.kids_count = body.kidsCount;
  }
  if (body.kidsAges !== undefined) {
    airtableFields["Kids Ages"] = JSON.stringify(body.kidsAges);
    supabaseFields.kids_ages = body.kidsAges;
  }
  if (body.games !== undefined) {
    airtableFields["Games"] = body.games;
    supabaseFields.games = body.games;
  }
  if (body.concerns !== undefined) {
    airtableFields["Concerns"] = body.concerns.join(", ");
    supabaseFields.concerns = body.concerns;
  }

  try {
    await patchWaitlistRecord(id, airtableFields);
    patchWaitlistByAirtableId(id, supabaseFields).catch((e) =>
      console.error("supabase patch failed", e),
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist PATCH failed", err);
    return new NextResponse("Could not update record", { status: 500 });
  }
}
