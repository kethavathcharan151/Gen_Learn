import { useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User, StudentProfile, FacultyProfile } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const userRole = supabaseUser.user_metadata?.role || 'student';
      
      let profile: StudentProfile | FacultyProfile | null = null;
      
      if (userRole === 'student') {
        const { data } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();
        profile = data;
      } else {
        const { data } = await supabase
          .from('faculty_profiles')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();
        profile = data;
      }

      const user: User = {
        id: supabaseUser.id,
        name: profile?.name || '',
        email: supabaseUser.email || '',
        role: userRole,
        avatar: supabaseUser.email?.charAt(0).toUpperCase() || 'U',
        profile
      };

      setUser(user);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: 'student' | 'faculty') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role
          }
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (profile: StudentProfile | FacultyProfile) => {
    if (!user) return;

    try {
      if (user.role === 'student') {
        const { error } = await supabase
          .from('student_profiles')
          .upsert({
            id: user.id,
            ...profile as StudentProfile
          });
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('faculty_profiles')
          .upsert({
            id: user.id,
            ...profile as FacultyProfile
          });
        
        if (error) throw error;
      }

      // Update local user state
      setUser({
        ...user,
        name: profile.name,
        profile
      });

      return { error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };
}