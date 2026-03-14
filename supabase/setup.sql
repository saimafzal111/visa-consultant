-- ============================================================
-- Visa Consultant - Supabase Database Setup
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. PROFILES TABLE
-- Stores extra user data (name, phone) linked to auth.users
-- ============================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  phone       text,
  email       text,
  avatar_url  text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 2. ROW LEVEL SECURITY (RLS)
-- Users can only read/edit their own profile
-- ============================================================
alter table public.profiles enable row level security;

-- Allow users to view their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Allow users to update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Allow users to insert their own profile (needed for trigger)
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 3. TRIGGER: Auto-create profile on signup
-- Fires every time a new user signs up, copies data from
-- auth.users metadata into the profiles table automatically.
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, email)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.email
  );
  return new;
end;
$$;

-- Attach trigger to auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. AUTO-UPDATE updated_at column
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_profiles_updated on public.profiles;
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- DONE. After running:
-- - Every signup auto-creates a row in public.profiles
-- - Users can only access/edit their own row (via RLS)
-- ============================================================
