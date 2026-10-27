-- ====================================================================
-- ORGANIZATION PORTAL & CMS DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ====================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. ENUMS
do $$ begin
  create type news_status as enum ('draft', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type user_role as enum ('super_admin', 'editor', 'viewer');
exception
  when duplicate_object then null;
end $$;

-- 3. PROFILES TABLE (Linked with Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text not null,
  role user_role default 'editor'::user_role,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. NEWS TABLE
create table if not exists public.news (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text not null,
  cover_image text not null,
  category text not null default 'Announcement',
  author text not null default 'Communications Office',
  author_role text default 'Staff Editor',
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status news_status default 'published'::news_status not null,
  views integer default 0,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. DIRECTORS TABLE
create table if not exists public.directors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  position text not null,
  biography text not null,
  photo_url text not null,
  display_order integer default 10 not null,
  is_active boolean default true not null,
  email text,
  linkedin_url text,
  committee text default 'Executive Board',
  term_start text,
  term_end text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. ORG SETTINGS TABLE
create table if not exists public.org_settings (
  id text primary key default 'primary',
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. AUDIT LOGS TABLE
create table if not exists public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_email text not null,
  action text not null,
  entity_type text not null,
  entity_name text not null,
  details text,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. INDEXES FOR HIGH-PERFORMANCE PUBLIC QUERIES
create index if not exists idx_news_status_published on public.news (status, published_at desc);
create index if not exists idx_news_slug on public.news (slug);
create index if not exists idx_directors_order on public.directors (is_active, display_order asc);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.news enable row level security;
alter table public.directors enable row level security;
alter table public.org_settings enable row level security;
alter table public.audit_logs enable row level security;

-- Profiles:
-- Any authenticated user can view profiles; users can update their own profile; admins can manage all
create policy "Allow authenticated users to read profiles"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Allow users to update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- News:
-- Public can read published news
create policy "Public can read published news"
  on public.news for select
  to anon, authenticated
  using (status = 'published');

-- Authenticated staff can see all news (including drafts)
create policy "Staff can read all news"
  on public.news for select
  to authenticated
  using (true);

-- Authenticated staff can insert/update/delete news
create policy "Staff can insert news"
  on public.news for insert
  to authenticated
  with check (true);

create policy "Staff can update news"
  on public.news for update
  to authenticated
  using (true);

create policy "Staff can delete news"
  on public.news for delete
  to authenticated
  using (true);

-- Directors:
-- Public can read active directors
create policy "Public can read active directors"
  on public.directors for select
  to anon, authenticated
  using (is_active = true);

-- Staff can read all directors (including inactive/emeritus)
create policy "Staff can read all directors"
  on public.directors for select
  to authenticated
  using (true);

-- Staff can insert/update/delete directors
create policy "Staff can insert directors"
  on public.directors for insert
  to authenticated
  with check (true);

create policy "Staff can update directors"
  on public.directors for update
  to authenticated
  using (true);

create policy "Staff can delete directors"
  on public.directors for delete
  to authenticated
  using (true);

-- Org Settings:
-- Public read access
create policy "Public read org settings"
  on public.org_settings for select
  to anon, authenticated
  using (true);

-- Staff can update org settings
create policy "Staff update org settings"
  on public.org_settings for all
  to authenticated
  using (true);

-- Audit Logs:
-- Staff read and insert
create policy "Staff read audit logs"
  on public.audit_logs for select
  to authenticated
  using (true);

create policy "Staff insert audit logs"
  on public.audit_logs for insert
  to authenticated
  with check (true);

-- 10. STORAGE BUCKETS SETUP
insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('director-photos', 'director-photos', true)
on conflict (id) do nothing;

-- Storage RLS: Public read, authenticated upload
create policy "Public read news-images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'news-images');

create policy "Public read director-photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'director-photos');

create policy "Authenticated upload news-images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'news-images');

create policy "Authenticated upload director-photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'director-photos');

create policy "Authenticated update and delete news-images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'news-images');

create policy "Authenticated update and delete director-photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'director-photos');
