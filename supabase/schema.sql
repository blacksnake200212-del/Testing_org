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
create policy "Allow authenticated users to read profiles"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Allow users to update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- News:
create policy "Public can read published news"
  on public.news for select
  to anon, authenticated
  using (status = 'published');

create policy "Staff can manage all news"
  on public.news for all
  to authenticated
  using (true)
  with check (true);

-- Directors:
create policy "Public can read active directors"
  on public.directors for select
  to anon, authenticated
  using (is_active = true);

create policy "Staff can manage all directors"
  on public.directors for all
  to authenticated
  using (true)
  with check (true);

-- Org Settings:
create policy "Public read org settings"
  on public.org_settings for select
  to anon, authenticated
  using (true);

create policy "Staff manage org settings"
  on public.org_settings for all
  to authenticated
  using (true)
  with check (true);

-- Audit Logs:
create policy "Staff manage audit logs"
  on public.audit_logs for all
  to authenticated
  using (true)
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

-- 11. INITIAL SEED DATA (Directors, News & Organization Settings)
insert into public.directors (name, position, biography, photo_url, display_order, is_active, email, committee, term_start)
values
(
  'Dr. Senaka Wickramasinghe',
  'Chairman of the Board',
  'Dr. Wickramasinghe is a senior public economist and corporate strategist with over 28 years of institutional advisory experience across South Asia. Former Senior Economic Advisor to multilateral development agencies and fellow of the Institute of Directors.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
  1,
  true,
  'chairman@organization.lk',
  'Executive Board',
  '2021-01'
),
(
  'Prof. Anoma Jayasuriya',
  'Vice Chairperson',
  'Distinguished Professor of Environmental Policy and Sustainability. Has authored 40+ peer-reviewed treatises on climate resilience, participatory governance, and community infrastructure planning.',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
  2,
  true,
  'vicechair@organization.lk',
  'Executive Board',
  '2022-03'
),
(
  'Deshamanya Rohan Fernando, PC',
  'Director of Governance & Legal Affairs',
  'President’s Counsel with four decades of legal standing in constitutional law, administrative justice, and statutory compliance. Chairs the Audit and Risk Governance Subcommittee.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
  3,
  true,
  'legal@organization.lk',
  'Audit & Governance',
  '2019-06'
),
(
  'Ms. Tharushi Samarasinghe, FCA',
  'Director of Finance & Operations',
  'Fellow Chartered Accountant and veteran chief financial executive. Spearheads financial transparency, donor project compliance, and modern ERP transitions for international development projects.',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
  4,
  true,
  'finance@organization.lk',
  'Finance & Remuneration',
  '2020-08'
),
(
  'Eng. Kusal Gunaratne',
  'Director of Digital Strategy & Innovation',
  'Tech pioneer and systems architect who previously led national digital transformation roadmaps and civic tech data platforms. Oversees data governance and digital capacity programs.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
  5,
  true,
  'digital@organization.lk',
  'Innovation & Technology',
  '2023-01'
),
(
  'Mr. Sarath Mendis',
  'Former Director of Strategy (Emeritus)',
  'Served as Board Member and Strategic Planning Advisor between 2014 and 2021. Successfully laid the foundation for the organization’s current 10-year development charter.',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
  10,
  false,
  'emeritus@organization.lk',
  'Advisory Council',
  '2014-01'
)
on conflict do nothing;

insert into public.news (title, slug, excerpt, content, cover_image, category, author, status, featured)
values
(
  'Annual Leadership Summit 2026: Accelerating Sustainable Development Goals',
  'annual-leadership-summit-2026-accelerating-sustainable-development-goals',
  'Over 400 national leaders, institutional directors, and civic innovators gathered in Colombo to ratify the National Sustainable Governance Charter for 2026-2030.',
  '### Historic Gathering at Apex Convention Centre

The National Foundation for Development & Governance successfully concluded its flagship Annual Leadership Summit today. With representatives from all 9 provinces, regional development chambers, and multilateral partner bodies, the summit focused on key pillars:

- **Institutional Integrity & Transparency:** Enhancing public accountability mechanisms through digital oversight and citizen dashboards.
- **Climate Resilient Infrastructure:** Aligning regional projects with carbon-neutral standards and water conservation guidelines.
- **Youth Leadership & Civic Engagement:** Launching the 2026 National Youth Fellowship with 100 subsidized positions.

> "Our strength lies in collective civic determination. True leadership is not about maintaining authority, but about equipping communities to solve their own challenges with dignity and transparency."  
> — *Dr. Senaka Wickramasinghe, Chairman of the Board*

Delegates unanimously signed the Colombo Accord on Transparent Governance.',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
  'Event',
  'Communications Office',
  'published',
  true
),
(
  'Board of Directors Announces Expansion of Rural Technology Hubs',
  'board-of-directors-announces-expansion-of-rural-technology-hubs',
  'Phase III of the National Digital Empowerment Initiative will install 15 solar-powered learning and technology centers across regional districts.',
  'Following the Board of Directors quarterly review meeting, the Foundation has approved a capital allocation of LKR 180 Million dedicated to establishing 15 state-of-the-art Technology and Learning Hubs in underserved regional communities.

Each hub will feature high-speed satellite broadband, solar microgrids, and training laboratories for modern software development.',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
  'Announcement',
  'Board Secretariat',
  'published',
  true
)
on conflict do nothing;

insert into public.org_settings (id, settings)
values (
  'primary',
  '{
    "name": "National Foundation for Development & Governance",
    "short_name": "NFDG Sri Lanka",
    "tagline": "Fostering Transparency, Empowering Communities, Advancing Progress",
    "description": "An independent national apex organization dedicated to sustainable institutional development, public policy research, leadership excellence, and community advancement.",
    "mission": "To empower institutions and civil society through ethical leadership, sustainable resource governance, and participatory research initiatives that improve societal well-being.",
    "vision": "A transparent, resilient, and prosperous society steered by forward-looking leadership and equitable opportunities for all.",
    "founded_year": 2008,
    "email": "info@organization.lk",
    "phone": "+94 11 289 4500",
    "hotline": "+94 77 123 4567",
    "address": "Level 14, Apex Tower, 45 Galle Road",
    "city": "Colombo 03",
    "country": "Sri Lanka",
    "registration_no": "GA-2008-8841"
  }'::jsonb
)
on conflict (id) do nothing;
