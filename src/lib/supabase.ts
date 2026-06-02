import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var",
    );
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

const TABLE = "waitlist";

export type WaitlistPatch = {
  kids_count?: number;
  kids_ages?: number[];
  games?: string[];
  concerns?: string[];
  paid_skip?: boolean;
  premium_position?: number;
  stripe_session_id?: string;
  quiz_answers?: Record<string, string[]>;
};

export async function upsertWaitlistEmail(args: {
  email: string;
  position: number;
  airtableRecordId: string;
}): Promise<void> {
  const supabase = getSupabase();
  // Upsert on email — re-submissions of the same email update the same row
  // rather than creating duplicates. Keeps Airtable + Supabase in lockstep.
  const { error } = await supabase
    .from(TABLE)
    .upsert(
      {
        email: args.email.toLowerCase(),
        position: args.position,
        airtable_record_id: args.airtableRecordId,
      },
      { onConflict: "email" },
    );
  if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
}

export async function patchWaitlistByAirtableId(
  airtableRecordId: string,
  fields: WaitlistPatch,
): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from(TABLE)
    .update(fields)
    .eq("airtable_record_id", airtableRecordId);
  if (error) throw new Error(`Supabase patch failed: ${error.message}`);
}

// Atomic counter. Returns the next waitlist position from a Postgres
// sequence (concurrent-safe). The starting value is configured in the
// migration (currently 4234) and persisted in waitlist_settings.
export async function claimNextWaitlistPosition(): Promise<number> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("claim_waitlist_position");
  if (error) {
    throw new Error(`Supabase position claim failed: ${error.message}`);
  }
  if (typeof data !== "number") {
    throw new Error(`Supabase position claim returned non-number: ${data}`);
  }
  return data;
}
