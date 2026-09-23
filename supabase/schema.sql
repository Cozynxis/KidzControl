-- KidzControl V2 database schema
create extension if not exists pgcrypto;

create table if not exists public.families (
 id uuid primary key default gen_random_uuid(),
 name text not null default 'Mijn gezin',
 owner_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
create table if not exists public.family_members (
 family_id uuid not null references public.families(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 role text not null check(role in ('parent','child')),
 created_at timestamptz not null default now(),
 primary key(family_id,user_id)
);
create table if not exists public.child_profiles (
 id uuid primary key default gen_random_uuid(),
 family_id uuid not null references public.families(id) on delete cascade,
 user_id uuid references auth.users(id) on delete set null,
 display_name text not null,
 age_group text not null default '10-12',
 avatar text not null default 'K',
 created_at timestamptz not null default now()
);
create table if not exists public.rules (
 id uuid primary key default gen_random_uuid(),
 child_id uuid unique not null references public.child_profiles(id) on delete cascade,
 daily_limit integer not null default 180 check(daily_limit between 0 and 1440),
 extra_minutes integer not null default 0 check(extra_minutes between 0 and 1440),
 paused boolean not null default false,
 bedtime_enabled boolean not null default true,
 bedtime_start time not null default '21:30',
 bedtime_end time not null default '07:00',
 school_enabled boolean not null default true,
 school_start time not null default '08:30',
 school_end time not null default '15:00',
 safe_search boolean not null default true,
 block_adult boolean not null default true,
 updated_at timestamptz not null default now()
);
create table if not exists public.blocked_items (
 id uuid primary key default gen_random_uuid(),
 child_id uuid not null references public.child_profiles(id) on delete cascade,
 kind text not null check(kind in ('site','app','category')),
 value text not null,
 mode text not null default 'blocked' check(mode in ('blocked','allowed')),
 created_at timestamptz not null default now(),
 unique(child_id,kind,value)
);
create table if not exists public.requests (
 id uuid primary key default gen_random_uuid(),
 child_id uuid not null references public.child_profiles(id) on delete cascade,
 type text not null check(type in ('time','access','exception')),
 title text not null,
 details text,
 status text not null default 'open' check(status in ('open','approved','denied','cancelled')),
 created_at timestamptz not null default now(),
 resolved_at timestamptz
);
create table if not exists public.activity_events (
 id bigint generated always as identity primary key,
 child_id uuid not null references public.child_profiles(id) on delete cascade,
 event_type text not null,
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
create table if not exists public.daily_usage (
 child_id uuid not null references public.child_profiles(id) on delete cascade,
 usage_date date not null default current_date,
 minutes integer not null default 0 check(minutes>=0),
 primary key(child_id,usage_date)
);
create table if not exists public.notifications (
 id uuid primary key default gen_random_uuid(),
 family_id uuid not null references public.families(id) on delete cascade,
 recipient_id uuid references auth.users(id) on delete cascade,
 title text not null,
 body text not null,
 read boolean not null default false,
 created_at timestamptz not null default now()
);

alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.child_profiles enable row level security;
alter table public.rules enable row level security;
alter table public.blocked_items enable row level security;
alter table public.requests enable row level security;
alter table public.activity_events enable row level security;
alter table public.daily_usage enable row level security;
alter table public.notifications enable row level security;

create or replace function public.is_family_member(fid uuid)
returns boolean language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.family_members fm where fm.family_id=fid and fm.user_id=auth.uid());
$$;
create or replace function public.can_access_child(cid uuid)
returns boolean language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.child_profiles cp join public.family_members fm on fm.family_id=cp.family_id where cp.id=cid and fm.user_id=auth.uid());
$$;

drop policy if exists "family read" on public.families;
create policy "family read" on public.families for select using(public.is_family_member(id) or owner_id=auth.uid());
drop policy if exists "family create" on public.families;
create policy "family create" on public.families for insert with check(owner_id=auth.uid());
drop policy if exists "family update owner" on public.families;
create policy "family update owner" on public.families for update using(owner_id=auth.uid());
drop policy if exists "members read" on public.family_members;
create policy "members read" on public.family_members for select using(public.is_family_member(family_id) or user_id=auth.uid());
drop policy if exists "profiles family" on public.child_profiles;
create policy "profiles family" on public.child_profiles for all using(public.is_family_member(family_id)) with check(public.is_family_member(family_id));
drop policy if exists "rules child" on public.rules;
create policy "rules child" on public.rules for all using(public.can_access_child(child_id)) with check(public.can_access_child(child_id));
drop policy if exists "blocked child" on public.blocked_items;
create policy "blocked child" on public.blocked_items for all using(public.can_access_child(child_id)) with check(public.can_access_child(child_id));
drop policy if exists "requests child" on public.requests;
create policy "requests child" on public.requests for all using(public.can_access_child(child_id)) with check(public.can_access_child(child_id));
drop policy if exists "events child" on public.activity_events;
create policy "events child" on public.activity_events for all using(public.can_access_child(child_id)) with check(public.can_access_child(child_id));
drop policy if exists "usage child" on public.daily_usage;
create policy "usage child" on public.daily_usage for all using(public.can_access_child(child_id)) with check(public.can_access_child(child_id));
drop policy if exists "notifications family" on public.notifications;
create policy "notifications family" on public.notifications for all using(public.is_family_member(family_id)) with check(public.is_family_member(family_id));

create or replace function public.bootstrap_family(display_name text default 'Mijn gezin')
returns uuid language plpgsql security definer set search_path=public as $$
declare fid uuid;
begin
 if auth.uid() is null then raise exception 'Not authenticated'; end if;
 select family_id into fid from public.family_members where user_id=auth.uid() limit 1;
 if fid is not null then return fid; end if;
 insert into public.families(name,owner_id) values(display_name,auth.uid()) returning id into fid;
 insert into public.family_members(family_id,user_id,role) values(fid,auth.uid(),'parent');
 return fid;
end $$;
grant execute on function public.bootstrap_family(text) to authenticated;

do $$ begin
 alter publication supabase_realtime add table public.rules;
exception when duplicate_object then null; end $$;
do $$ begin
 alter publication supabase_realtime add table public.requests;
exception when duplicate_object then null; end $$;