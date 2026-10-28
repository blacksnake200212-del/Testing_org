import { createClient } from '@supabase/supabase-js';

// Sensitive keys are read strictly from environment variables (.env / hosting provider) or user settings.
// Never hardcoded in source control.
const supabaseUrl = 
  (import.meta.env.VITE_SUPABASE_URL as string) || 
  localStorage.getItem('supabase_url') || 
  '';

const supabaseAnonKey = 
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 
  localStorage.getItem('supabase_anon_key') || 
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your-supabase-anon-key' &&
  supabaseUrl.startsWith('https://')
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
