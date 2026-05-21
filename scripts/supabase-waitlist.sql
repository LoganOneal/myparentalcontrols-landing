-- Waitlist schema for MyParentalControls. Mirrors the Airtable Waitlist table.
-- Idempotent: safe to re-run.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  kids_count integer,
  kids_ages integer[],
  games text[],
  concerns text[],
  position integer,
  paid_skip boolean not null default false,
  premium_position integer,
  stripe_session_id text,
  airtable_record_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists waitlist_set_updated_at on public.waitlist;
create trigger waitlist_set_updated_at
  before update on public.waitlist
  for each row execute function public.set_updated_at();

-- Lock the table down — only the service role (server) can read/write.
alter table public.waitlist enable row level security;
