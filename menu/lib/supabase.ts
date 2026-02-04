import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// Helper function to get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

// Helper function to check if slug is available
export async function checkSlugAvailability(slug: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();
  
  if (error) throw error;
  return data === null; // Available if no restaurant found
}

// Helper function to upload file to storage
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return publicUrl;
}

// Helper function to delete file from storage
export async function deleteFile(bucket: string, path: string): Promise<void> {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  
  if (error) throw error;
}
