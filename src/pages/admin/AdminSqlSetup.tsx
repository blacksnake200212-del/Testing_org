import React, { useState } from 'react';
import { AdminHeader } from '../../components/common/AdminHeader';
import { useOrg } from '../../context/OrgContext';
import { getSupabaseConfig, updateSupabaseConfig } from '../../lib/supabase';
import { 
  Database, Copy, Check, ExternalLink, 
  ShieldCheck, AlertCircle, Save, Sparkles, Terminal 
} from 'lucide-react';

export const AdminSqlSetup: React.FC = () => {
  const { showToast } = useOrg();
  const config = getSupabaseConfig();

  const [supabaseUrl, setSupabaseUrl] = useState(config.url);
  const [supabaseKey, setSupabaseKey] = useState('');
  const [copied, setCopied] = useState(false);

  const sqlCode = `-- ====================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR ORGANIZATION PORTAL & CMS
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

-- 3. PROFILES TABLE
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

-- 8. INDEXES
create index if not exists idx_news_status_published on public.news (status, published_at desc);
create index if not exists idx_news_slug on public.news (slug);
create index if not exists idx_directors_order on public.directors (is_active, display_order asc);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.news enable row level security;
alter table public.directors enable row level security;
alter table public.org_settings enable row level security;
alter table public.audit_logs enable row level security;

-- Public can read published news & active directors
create policy "Public can read published news"
  on public.news for select to anon, authenticated
  using (status = 'published');

create policy "Staff can manage all news"
  on public.news for all to authenticated
  using (true) with check (true);

create policy "Public can read active directors"
  on public.directors for select to anon, authenticated
  using (is_active = true);

create policy "Staff can manage all directors"
  on public.directors for all to authenticated
  using (true) with check (true);

create policy "Public read org settings"
  on public.org_settings for select to anon, authenticated
  using (true);

create policy "Staff manage org settings"
  on public.org_settings for all to authenticated
  using (true) with check (true);

create policy "Staff manage audit logs"
  on public.audit_logs for all to authenticated
  using (true) with check (true);

-- 10. STORAGE BUCKETS
insert into storage.buckets (id, name, public) values ('news-images', 'news-images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('director-photos', 'director-photos', true) on conflict (id) do nothing;
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    showToast('SQL schema copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl || !supabaseKey) {
      showToast('Please enter both Supabase URL and Anon Key', 'error');
      return;
    }
    updateSupabaseConfig(supabaseUrl, supabaseKey);
    showToast('Supabase configuration saved! Reloading...', 'success');
  };

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto pb-24">
      <AdminHeader
        title="Supabase Database & Storage Setup"
        subtitle="Step-by-step instructions and SQL migration scripts for connecting your real Supabase PostgreSQL project."
      />

      {/* Connection Status Box */}
      <div className={`p-6 rounded-2xl border ${
        config.isConfigured 
          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
          : 'bg-amber-50/80 border-amber-200 text-amber-950'
      }`}>
        <div className="flex items-start gap-4">
          <Database className={`w-6 h-6 flex-shrink-0 mt-0.5 ${config.isConfigured ? 'text-emerald-600' : 'text-amber-600'}`} />
          <div className="space-y-2 flex-1">
            <h3 className="font-extrabold text-base font-heading">
              {config.isConfigured ? 'Connected to Live Supabase Project' : 'Running in Local Persistent Demo Mode'}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              {config.isConfigured
                ? `Active URL: ${config.url}. All news articles, directors, and photos are saved directly to your Supabase PostgreSQL and Storage buckets with Row Level Security.`
                : 'The system is currently utilizing persistent local storage. You can test all features (uploading photos, editing directors, publishing news) immediately, or connect your Supabase project below whenever ready!'}
            </p>
          </div>
        </div>
      </div>

      {/* Supabase Credentials Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex items-center justify-between">
          <span>Connect Your Supabase Project</span>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
          >
            <span>Open Supabase Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </h3>

        <form onSubmit={handleSaveCredentials} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Project URL (VITE_SUPABASE_URL)
              </label>
              <input
                type="url"
                placeholder="https://xyzcompany.supabase.co"
                value={supabaseUrl}
                onChange={e => setSupabaseUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Anon / Public Key (VITE_SUPABASE_ANON_KEY)
              </label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                value={supabaseKey}
                onChange={e => setSupabaseKey(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              Settings persist in browser or via <code>.env</code> file.
            </span>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save & Connect</span>
            </button>
          </div>
        </form>
      </div>

      {/* SQL Migration Script Box */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden space-y-0">
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-400" />
            <span className="font-mono text-xs font-bold text-white">
              supabase/schema.sql (Copy & Run in Supabase SQL Editor)
            </span>
          </div>

          <button
            onClick={handleCopySql}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
          </button>
        </div>

        <div className="p-4 max-h-[400px] overflow-y-auto">
          <pre className="font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto">
            {sqlCode}
          </pre>
        </div>
      </div>
    </div>
  );
};
