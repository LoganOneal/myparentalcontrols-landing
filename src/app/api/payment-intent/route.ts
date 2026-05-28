import { NextResponse } from "next/server";
import { z } from "zod";
import { getWaitlistRecord } from "@/lib/airtable";
import { KODA_PLANS, type KodaPlanId } from "@/lib/plans";
import { createKodaPlanPaymentIntent } from "@/lib/stripe";

export const runtime = "nodejs";

const planIds = KODA_PLANS.map((plan) => plan.id) as [KodaPlanId, ...KodaPlanId[]];

const BodySchema = z.object({
  recordId: z.string().min(1),
  planId: z.enum(planIds),
});

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

    const intent = await createKodaPlanPaymentIntent({
      recordId: record.id,
      email,
      planId: parsed.planId,
    });

    return NextResponse.json(intent);
  } catch (err) {
    console.error("payment intent failed", err);
    return new NextResponse("Could not start payment", { status: 500 });
  }
}
