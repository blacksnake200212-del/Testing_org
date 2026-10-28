import { createClient } from '@supabase/supabase-js';

// Default to live Supabase project so Netlify works automatically even before setting environment variables in Netlify UI
const DEFAULT_SUPABASE_URL = 'https://rklzfympcexkdahuacgg.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_kE2bD-w4PQ9hITyvxWEA6g_yQJQB1YZ';

const supabaseUrl = 
  (import.meta.env.VITE_SUPABASE_URL as string) || 
  localStorage.getItem('supabase_url') || 
  DEFAULT_SUPABASE_URL;

const supabaseAnonKey = 
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 
  localStorage.getItem('supabase_anon_key') || 
  DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const getSupabaseConfig = () => ({
  url: supabaseUrl,
  hasKey: Boolean(supabaseAnonKey),
  isConfigured: isSupabaseConfigured
});

export const updateSupabaseConfig = (url: string, key: string) => {
  if (url) localStorage.setItem('supabase_url', url);
  else localStorage.removeItem('supabase_url');

  if (key) localStorage.setItem('supabase_anon_key', key);
  else localStorage.removeItem('supabase_anon_key');

  window.location.reload();
};
