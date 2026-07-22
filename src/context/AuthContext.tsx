'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, fullName: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const determineRole = (email: string, metadataRole?: string): 'admin' | 'customer' => {
    if (metadataRole === 'admin') return 'admin';
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail.includes('admin') || cleanEmail === 'chebetreal@gmail.com') {
      return 'admin';
    }
    return 'customer';
  };

  useEffect(() => {
    // 1. Try local storage restored user
    const savedUser = localStorage.getItem('wajose_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Ensure role is recalculated correctly if email is admin/chebetreal
        parsed.role = determineRole(parsed.email, parsed.role);
        setUser(parsed);
      } catch (e) {
        console.error('Failed to parse saved user state', e);
      }
    }

    // 2. Try Supabase session if configured
    if (supabase) {
      supabase.auth.getSession().then(async (res: any) => {
        const session = res?.data?.session;
        if (session?.user) {
          let role: 'admin' | 'customer' = determineRole(session.user.email || '');

          // Check DB profile for explicit role
          try {
            const { data: dbProfile } = await supabase
              .from('profiles')
              .select('role, full_name, phone')
              .eq('id', session.user.id)
              .maybeSingle();

            if (dbProfile?.role) {
              role = dbProfile.role as 'admin' | 'customer';
            }
          } catch (err) {
            console.warn('Could not fetch DB profile role', err);
          }

          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            phone: session.user.user_metadata?.phone || '',
            role,
            createdAt: session.user.created_at,
          };
          setUser(profile);
          localStorage.setItem('wajose_user', JSON.stringify(profile));
        }
        setIsLoading(false);
      }).catch(() => setIsLoading(false));

      const { data: authListener } = supabase.auth.onAuthStateChange(async (_event: string, session: any) => {
        if (session?.user) {
          let role: 'admin' | 'customer' = determineRole(session.user.email || '');

          try {
            const { data: dbProfile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .maybeSingle();

            if (dbProfile?.role) {
              role = dbProfile.role as 'admin' | 'customer';
            }
          } catch (err) {
            console.warn('Could not fetch DB profile role', err);
          }

          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            phone: session.user.user_metadata?.phone || '',
            role,
            createdAt: session.user.created_at,
          };
          setUser(profile);
          localStorage.setItem('wajose_user', JSON.stringify(profile));
        } else {
          setUser(null);
          localStorage.removeItem('wajose_user');
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        if (data.user) {
          const role = determineRole(data.user.email || email);
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            role,
            createdAt: new Date().toISOString(),
          };
          setUser(profile);
          localStorage.setItem('wajose_user', JSON.stringify(profile));
          setIsLoading(false);
          return { success: true };
        }
      }

      // Local authentication
      const role = determineRole(email);
      const profile: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        fullName: email.split('@')[0].replace('.', ' '),
        role,
        createdAt: new Date().toISOString(),
      };
      setUser(profile);
      localStorage.setItem('wajose_user', JSON.stringify(profile));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed. Please try again.' };
    }
  };

  const signup = async (email: string, pass: string, fullName: string, phone?: string) => {
    setIsLoading(true);
    try {
      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: { data: { full_name: fullName, phone } }
        });
        if (error) throw error;
        if (data.user) {
          const role = determineRole(email);
          const profile: UserProfile = {
            id: data.user.id,
            email,
            fullName,
            phone,
            role,
            createdAt: new Date().toISOString(),
          };
          setUser(profile);
          localStorage.setItem('wajose_user', JSON.stringify(profile));
          setIsLoading(false);
          return { success: true };
        }
      }

      // Local signup
      const role = determineRole(email);
      const profile: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        fullName,
        phone,
        role,
        createdAt: new Date().toISOString(),
      };
      setUser(profile);
      localStorage.setItem('wajose_user', JSON.stringify(profile));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed. Please try again.' };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    if (supabase) {
      await supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
    localStorage.removeItem('wajose_user');
    setIsLoading(false);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('wajose_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
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
