import type { WaitlistRecord } from "@/types/wizard";

const API_ROOT = "https://api.airtable.com/v0";

function env(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} env var`);
  }
  return value;
}

function tableUrl(): string {
  const base = env("AIRTABLE_BASE_ID");
  const table = env("AIRTABLE_TABLE_NAME");
  return `${API_ROOT}/${base}/${encodeURIComponent(table)}`;
}

function authHeader(): Record<string, string> {
  return {
    Authorization: `Bearer ${env("AIRTABLE_PAT")}`,
    "Content-Type": "application/json",
  };
}

function formulaString(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export async function createWaitlistRecord(fields: {
  email: string;
  position: number;
}): Promise<WaitlistRecord> {
  // Position is claimed from the Supabase sequence (atomic) before we get
  // here so both DBs end up storing the same display number.
  const res = await fetch(tableUrl(), {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      fields: { Email: fields.email, Position: fields.position },
      typecast: true,
    }),
  });
  if (!res.ok) {
    throw new Error(`Airtable create failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as WaitlistRecord;
}

export async function patchWaitlistRecord(
  id: string,
  fields: Partial<WaitlistRecord["fields"]>,
): Promise<WaitlistRecord> {
  const res = await fetch(`${tableUrl()}/${id}`, {
    method: "PATCH",
    headers: authHeader(),
    body: JSON.stringify({ fields, typecast: true }),
  });
  if (!res.ok) {
    throw new Error(`Airtable patch failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as WaitlistRecord;
}

export async function getWaitlistRecord(id: string): Promise<WaitlistRecord> {
  const res = await fetch(`${tableUrl()}/${id}`, {
    method: "GET",
    headers: authHeader(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Airtable get failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as WaitlistRecord;
}

export async function findWaitlistByEmail(
  email: string,
): Promise<WaitlistRecord | null> {
  const formula = encodeURIComponent(
    `LOWER({Email}) = ${formulaString(email.toLowerCase())}`,
  );
  const url = `${tableUrl()}?filterByFormula=${formula}&maxRecords=1`;
  const res = await fetch(url, {
    method: "GET",
    headers: authHeader(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(
      `Airtable lookup failed: ${res.status} ${await res.text()}`,
    );
  }
  const data = (await res.json()) as { records: WaitlistRecord[] };
  return data.records[0] ?? null;
}

export async function countPaidRecords(): Promise<number> {
  const formula = encodeURIComponent(`{Paid Skip} = TRUE()`);
  let offset: string | undefined;
  let total = 0;
  do {
    const url = new URL(tableUrl());
    url.searchParams.set("filterByFormula", decodeURIComponent(formula));
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: authHeader(),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(
        `Airtable paid count failed: ${res.status} ${await res.text()}`,
      );
    }
    const data = (await res.json()) as {
      records: WaitlistRecord[];
      offset?: string;
    };
    total += data.records.length;
    offset = data.offset;
  } while (offset);
  return total;
}
