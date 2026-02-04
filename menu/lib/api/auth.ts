// Authentication API functions for Supabase
import { supabase } from '@/lib/supabase';
import type { UserProfileInsert } from '@/lib/database.types';

/**
 * Sign up a new user with email and password
 */
export async function signUp(data: {
  email: string;
  password: string;
  phone: string;
  restaurantName: string;
}) {
  try {
    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          phone: data.phone,
          restaurant_name: data.restaurantName,
        },
      },
    });

    if (authError) throw authError;

    return { data: authData, error: null };
  } catch (error: any) {
    console.error('Sign up error:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(data: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;

    return { data: authData, error: null };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { error: error.message };
  }
}

/**
 * Get the current user session
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session, error: null };
  } catch (error: any) {
    console.error('Get session error:', error);
    return { session: null, error: error.message };
  }
}

/**
 * Get the current user profile
 */
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Get user profile error:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: any) {
  try {
    const { data, error } = await (supabase
      .from('user_profiles') as any)
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Update user profile error:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Reset password request
 */
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Reset password error:', error);
    return { error: error.message };
  }
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Update password error:', error);
    return { error: error.message };
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const { session } = await getSession();
  return !!session;
}

/**
 * Get current user ID
 */
export async function getCurrentUserId() {
  const { session } = await getSession();
  return session?.user?.id || null;
}
