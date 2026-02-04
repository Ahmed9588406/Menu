// TypeScript types for Supabase Database Schema
// Auto-generated types based on supabase-schema.sql

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          phone: string | null
          created_at: string
          updated_at: string
          onboarding_completed: boolean
          onboarding_step: number
        }
        Insert: {
          id: string
          email: string
          phone?: string | null
          created_at?: string
          updated_at?: string
          onboarding_completed?: boolean
          onboarding_step?: number
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          created_at?: string
          updated_at?: string
          onboarding_completed?: boolean
          onboarding_step?: number
        }
      }
      restaurants: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'restaurant' | 'cafe' | 'bakery' | 'fast-food' | 'dessert' | 'juice' | 'pizza' | 'shawarma'
          logo_url: string | null
          slug: string | null
          credit_balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'restaurant' | 'cafe' | 'bakery' | 'fast-food' | 'dessert' | 'juice' | 'pizza' | 'shawarma'
          logo_url?: string | null
          slug?: string | null
          credit_balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'restaurant' | 'cafe' | 'bakery' | 'fast-food' | 'dessert' | 'juice' | 'pizza' | 'shawarma'
          logo_url?: string | null
          slug?: string | null
          credit_balance?: number
          created_at?: string
          updated_at?: string
        }
      }
      restaurant_contacts: {
        Row: {
          id: string
          restaurant_id: string
          phone: string
          whatsapp: string
          facebook: string | null
          instagram: string | null
          tiktok: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          phone: string
          whatsapp: string
          facebook?: string | null
          instagram?: string | null
          tiktok?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          phone?: string
          whatsapp?: string
          facebook?: string | null
          instagram?: string | null
          tiktok?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      restaurant_themes: {
        Row: {
          id: string
          restaurant_id: string
          theme_id: string
          theme_name: string
          theme_name_ar: string
          nav_position: 'top' | 'bottom' | 'sidebar'
          gradient: string
          price: number
          is_free: boolean
          purchased_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          theme_id: string
          theme_name: string
          theme_name_ar: string
          nav_position: 'top' | 'bottom' | 'sidebar'
          gradient: string
          price: number
          is_free?: boolean
          purchased_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          theme_id?: string
          theme_name?: string
          theme_name_ar?: string
          nav_position?: 'top' | 'bottom' | 'sidebar'
          gradient?: string
          price?: number
          is_free?: boolean
          purchased_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      branches: {
        Row: {
          id: string
          restaurant_id: string
          name: string
          phone: string
          address: string
          latitude: number | null
          longitude: number | null
          is_main: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name: string
          phone: string
          address: string
          latitude?: number | null
          longitude?: number | null
          is_main?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          name?: string
          phone?: string
          address?: string
          latitude?: number | null
          longitude?: number | null
          is_main?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      restaurant_services: {
        Row: {
          id: string
          restaurant_id: string
          table_service: boolean
          delivery: boolean
          takeaway: boolean
          drive_thru: boolean
          reservations: boolean
          order_management: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          table_service?: boolean
          delivery?: boolean
          takeaway?: boolean
          drive_thru?: boolean
          reservations?: boolean
          order_management?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          table_service?: boolean
          delivery?: boolean
          takeaway?: boolean
          drive_thru?: boolean
          reservations?: boolean
          order_management?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      menu_categories: {
        Row: {
          id: string
          restaurant_id: string
          name_ar: string
          name_en: string | null
          icon: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name_ar: string
          name_en?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          name_ar?: string
          name_en?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          restaurant_id: string
          category_id: string | null
          name_ar: string
          name_en: string | null
          description_ar: string | null
          description_en: string | null
          price: number
          image_url: string | null
          is_available: boolean
          is_featured: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          category_id?: string | null
          name_ar: string
          name_en?: string | null
          description_ar?: string | null
          description_en?: string | null
          price: number
          image_url?: string | null
          is_available?: boolean
          is_featured?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          category_id?: string | null
          name_ar?: string
          name_en?: string | null
          description_ar?: string | null
          description_en?: string | null
          price?: number
          image_url?: string | null
          is_available?: boolean
          is_featured?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      onboarding_progress: {
        Row: {
          id: string
          user_id: string
          restaurant_info_completed: boolean
          contact_info_completed: boolean
          branding_completed: boolean
          menu_categories_completed: boolean
          branches_completed: boolean
          settings_completed: boolean
          review_completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          restaurant_info_completed?: boolean
          contact_info_completed?: boolean
          branding_completed?: boolean
          menu_categories_completed?: boolean
          branches_completed?: boolean
          settings_completed?: boolean
          review_completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          restaurant_info_completed?: boolean
          contact_info_completed?: boolean
          branding_completed?: boolean
          menu_categories_completed?: boolean
          branches_completed?: boolean
          settings_completed?: boolean
          review_completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      credit_transactions: {
        Row: {
          id: string
          restaurant_id: string
          amount: number
          transaction_type: 'credit' | 'debit' | 'purchase' | 'refund'
          description: string | null
          balance_after: number
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          amount: number
          transaction_type: 'credit' | 'debit' | 'purchase' | 'refund'
          description?: string | null
          balance_after: number
          created_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          amount?: number
          transaction_type?: 'credit' | 'debit' | 'purchase' | 'refund'
          description?: string | null
          balance_after?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type Restaurant = Database['public']['Tables']['restaurants']['Row']
export type RestaurantContact = Database['public']['Tables']['restaurant_contacts']['Row']
export type RestaurantTheme = Database['public']['Tables']['restaurant_themes']['Row']
export type Branch = Database['public']['Tables']['branches']['Row']
export type RestaurantServices = Database['public']['Tables']['restaurant_services']['Row']
export type MenuCategory = Database['public']['Tables']['menu_categories']['Row']
export type MenuItem = Database['public']['Tables']['menu_items']['Row']
export type OnboardingProgress = Database['public']['Tables']['onboarding_progress']['Row']
export type CreditTransaction = Database['public']['Tables']['credit_transactions']['Row']

// Insert types
export type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert']
export type RestaurantInsert = Database['public']['Tables']['restaurants']['Insert']
export type RestaurantContactInsert = Database['public']['Tables']['restaurant_contacts']['Insert']
export type RestaurantThemeInsert = Database['public']['Tables']['restaurant_themes']['Insert']
export type BranchInsert = Database['public']['Tables']['branches']['Insert']
export type RestaurantServicesInsert = Database['public']['Tables']['restaurant_services']['Insert']
export type MenuCategoryInsert = Database['public']['Tables']['menu_categories']['Insert']
export type MenuItemInsert = Database['public']['Tables']['menu_items']['Insert']
export type OnboardingProgressInsert = Database['public']['Tables']['onboarding_progress']['Insert']
export type CreditTransactionInsert = Database['public']['Tables']['credit_transactions']['Insert']

// Update types
export type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update']
export type RestaurantUpdate = Database['public']['Tables']['restaurants']['Update']
export type RestaurantContactUpdate = Database['public']['Tables']['restaurant_contacts']['Update']
export type RestaurantThemeUpdate = Database['public']['Tables']['restaurant_themes']['Update']
export type BranchUpdate = Database['public']['Tables']['branches']['Update']
export type RestaurantServicesUpdate = Database['public']['Tables']['restaurant_services']['Update']
export type MenuCategoryUpdate = Database['public']['Tables']['menu_categories']['Update']
export type MenuItemUpdate = Database['public']['Tables']['menu_items']['Update']
export type OnboardingProgressUpdate = Database['public']['Tables']['onboarding_progress']['Update']
export type CreditTransactionUpdate = Database['public']['Tables']['credit_transactions']['Update']
