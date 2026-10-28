import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types/database';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_STORAGE_KEY = 'nfdg_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Helper to load or resolve a user's profile and role
  const resolveProfile = async (sessionUser: any): Promise<UserProfile> => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', sessionUser.id)
          .single();
        if (!error && data) {
          return {
            id: data.id,
            email: data.email || sessionUser.email || '',
            full_name: data.full_name || sessionUser.user_metadata?.full_name || 'Staff Administrator',
            role: (data.role as any) || (sessionUser.user_metadata?.role as any) || 'super_admin',
            avatar_url: data.avatar_url || sessionUser.user_metadata?.avatar_url
          };
        }
      } catch {
        // Fall through to session metadata
      }
    }

    return {
      id: sessionUser.id,
      email: sessionUser.email || '',
      full_name: sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'Staff Administrator',
      role: (sessionUser.user_metadata?.role as any) || 'super_admin',
      avatar_url: sessionUser.user_metadata?.avatar_url
    };
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const profile = await resolveProfile(session.user);
            setUser(profile);
            setIsDemoMode(false);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Supabase auth session restore failed:', e);
        }
      }

      // Check stored session
      const stored = localStorage.getItem(AUTH_USER_STORAGE_KEY);
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem(AUTH_USER_STORAGE_KEY);
        }
      }
      setIsLoading(false);
    };

    initAuth();

    if (isSupabaseConfigured && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const profile = await resolveProfile(session.user);
          setUser(profile);
          setIsDemoMode(false);
        } else {
          localStorage.removeItem(AUTH_USER_STORAGE_KEY);
          localStorage.removeItem('auth_user_email');
          setUser(null);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      return { success: false, error: 'Please enter both your email and password.' };
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Primary: Verify with live Supabase Authentication
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message || 'Invalid email or password.' };
        }

        if (data.user) {
          const profile = await resolveProfile(data.user);
          setUser(profile);
          localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(profile));
          localStorage.setItem('auth_user_email', profile.email);
          setIsDemoMode(false);
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err.message || 'Authentication failed. Please verify credentials.' };
      }
    }

    // 2. Fallback: If Supabase credentials are not yet added to Netlify environment variables,
    // require an authorized initial administrator password (never allow blank/arbitrary access)
    const initialMasterPassword = 'Admin@Org2026!';
    if (cleanEmail === 'admin@organization.lk' && password === initialMasterPassword) {
      const adminUser: UserProfile = {
        id: 'admin-local-1',
        email: cleanEmail,
        full_name: 'Chief Operating Administrator',
        role: 'super_admin',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
      };
      setUser(adminUser);
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(adminUser));
      localStorage.setItem('auth_user_email', adminUser.email);
      setIsDemoMode(true);
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { 
      success: false, 
      error: 'Invalid credentials. Only provisioned staff in Supabase Authentication can sign in.' 
    };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase logout error:', e);
      }
    }
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    localStorage.removeItem('auth_user_email');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
        isDemoMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
