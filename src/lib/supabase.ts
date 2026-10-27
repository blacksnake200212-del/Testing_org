import { createClient } from '@supabase/supabase-js';

// Environment variables can be configured via .env file or local storage
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('supabase_url') || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('supabase_anon_key') || '';

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
