-- Waitlist counter migration. Run this in Supabase → SQL Editor.
-- Idempotent: safe to re-run.

-- 1. Atomic counter. `nextval` is concurrent-safe under any load.
--    Starts at 4234 so the first signup displays as #4234.
create sequence if not exists public.waitlist_position_seq
  start with 4234
  increment by 1
  no cycle;

-- 2. Persistent settings table — records the starting position so we
--    can always compute "real signups so far" = current_position - starting.
create table if not exists public.waitlist_settings (
  key text primary key,
  value integer not null,
  updated_at timestamptz not null default now()
);

insert into public.waitlist_settings (key, value)
values ('starting_position', 4234)
on conflict (key) do nothing;

alter table public.waitlist_settings enable row level security;

-- 3. RPC the server calls to claim the next number atomically.
--    security definer so it works even if RLS is enabled.
create or replace function public.claim_waitlist_position()
returns integer
language sql
security definer
set search_path = public
as $$
  select nextval('public.waitlist_position_seq')::integer
$$;

-- Allow the service role (and authenticated clients, if you ever need it)
-- to invoke the RPC. anon stays excluded.
revoke all on function public.claim_waitlist_position() from public;
grant execute on function public.claim_waitlist_position() to service_role;
