import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types/database';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: (role?: 'super_admin' | 'editor') => void;
  logout: () => Promise<void>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_STORAGE_KEY = 'nfdg_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || 'staff@organization.lk',
              full_name: session.user.user_metadata?.full_name || 'Staff Administrator',
              role: (session.user.user_metadata?.role as any) || 'super_admin',
              avatar_url: session.user.user_metadata?.avatar_url
            });
            setIsDemoMode(false);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Supabase auth check failed:', e);
        }
      }

      // Check local demo session
      const stored = localStorage.getItem(DEMO_USER_STORAGE_KEY);
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem(DEMO_USER_STORAGE_KEY);
        }
      }
      setIsLoading(false);
    };

    initAuth();

    if (isSupabaseConfigured && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'staff@organization.lk',
            full_name: session.user.user_metadata?.full_name || 'Staff Administrator',
            role: (session.user.user_metadata?.role as any) || 'super_admin',
            avatar_url: session.user.user_metadata?.avatar_url
          });
          setIsDemoMode(false);
        } else {
          // If logged out from Supabase, check if demo stored
          const stored = localStorage.getItem(DEMO_USER_STORAGE_KEY);
          if (stored) {
            setUser(JSON.parse(stored));
          } else {
            setUser(null);
          }
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const userProfile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            full_name: data.user.user_metadata?.full_name || 'Organization Administrator',
            role: (data.user.user_metadata?.role as any) || 'super_admin'
          };
          setUser(userProfile);
          setIsDemoMode(false);
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err.message || 'Login failed' };
      }
    }

    // Demo / Local storage authentication fallback
    const role: UserProfile['role'] = email.includes('editor') ? 'editor' : 'super_admin';
    const demoUser: UserProfile = {
      id: 'demo-user-1',
      email,
      full_name: email.includes('editor') ? 'Communications Editor' : 'Chief Operating Administrator',
      role,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    };
    setUser(demoUser);
    localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
    localStorage.setItem('auth_user_email', demoUser.email);
    setIsDemoMode(true);
    setIsLoading(false);
    return { success: true };
  };

  const loginAsDemo = (role: 'super_admin' | 'editor' = 'super_admin') => {
    const email = role === 'super_admin' ? 'admin@organization.lk' : 'editor@organization.lk';
    login(email);
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase logout error:', e);
      }
    }
    localStorage.removeItem(DEMO_USER_STORAGE_KEY);
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
        loginAsDemo,
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
