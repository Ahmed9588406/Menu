// Onboarding API functions
import { supabase } from '@/lib/supabase';

/**
 * Save restaurant basic information (Tab 1)
 */
export async function saveRestaurantInfo(data: {
  userId: string;
  name: string;
  type: string;
  logoFile?: File;
}) {
  try {
    let logoUrl: string | null = null;

    // Upload logo if provided
    if (data.logoFile) {
      const fileExt = data.logoFile.name.split('.').pop();
      const fileName = `${data.userId}/logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('restaurant-logos')
        .upload(fileName, data.logoFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('restaurant-logos')
        .getPublicUrl(fileName);

      logoUrl = publicUrl;
    }

    // Insert or update restaurant
    const restaurantData: any = {
      user_id: data.userId,
      name: data.name,
      type: data.type,
      logo_url: logoUrl,
    };

    const { data: restaurant, error } = await (supabase
      .from('restaurants') as any)
      .upsert(restaurantData, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;

    return { data: restaurant, error: null };
  } catch (error: any) {
    console.error('Save restaurant info error:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Save restaurant contact information (Tab 2)
 */
export async function saveContactInfo(data: {
  restaurantId: string;
  userId: string;
  phone: string;
  whatsapp: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}) {
  try {
    const contactData: any = {
      restaurant_id: data.restaurantId,
      phone: data.phone,
      whatsapp: data.whatsapp,
      facebook: data.facebook || null,
      instagram: data.instagram || null,
      tiktok: data.tiktok || null,
    };

    const { data: contact, error } = await (supabase
      .from('restaurant_contacts') as any)
      .upsert(contactData)
      .select()
      .single();

    if (error) throw error;

    return { data: contact, error: null };
  } catch (error: any) {
    console.error('Save contact info error:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Save menu categories (Tab 3)
 */
export async function saveMenuCategories(data: {
  restaurantId: string;
  categories: Array<{ name: string; description?: string }>;
}) {
  try {
    const categoriesData = data.categories.map((cat) => ({
      restaurant_id: data.restaurantId,
      name: cat.name,
      description: cat.description || null,
    }));

    const { data: categories, error } = await (supabase
      .from('menu_categories') as any)
      .insert(categoriesData)
      .select();

    if (error) throw error;

    return { data: categories, error: null };
  } catch (error: any) {
    console.error('Save menu categories error:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Save payment methods (Tab 4)
 */
export async function savePaymentMethods(data: {
  restaurantId: string;
  methods: string[];
}) {
  try {
    const paymentData = data.methods.map((method) => ({
      restaurant_id: data.restaurantId,
      method: method,
    }));

    const { data: payments, error } = await (supabase
      .from('payment_methods') as any)
      .insert(paymentData)
      .select();

    if (error) throw error;

    return { data: payments, error: null };
  } catch (error: any) {
    console.error('Save payment methods error:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Save restaurant theme (Tab 5)
 */
export async function saveRestaurantTheme(data: {
  restaurantId: string;
  primaryColor: string;
  secondaryColor: string;
  theme: string;
}) {
  try {
    const themeData: any = {
      restaurant_id: data.restaurantId,
      primary_color: data.primaryColor,
      secondary_color: data.secondaryColor,
      theme: data.theme,
    };

    const { data: theme, error } = await (supabase
      .from('restaurant_themes') as any)
      .upsert(themeData)
      .select()
      .single();

    if (error) throw error;

    return { data: theme, error: null };
  } catch (error: any) {
    console.error('Save restaurant theme error:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Save branches (Tab 6)
 */
export async function saveBranches(data: {
  restaurantId: string;
  branches: Array<{ name: string; address: string; phone: string }>;
}) {
  try {
    const branchesData = data.branches.map((branch) => ({
      restaurant_id: data.restaurantId,
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
    }));

    const { data: branches, error } = await (supabase
      .from('branches') as any)
      .insert(branchesData)
      .select();

    if (error) throw error;

    return { data: branches, error: null };
  } catch (error: any) {
    console.error('Save branches error:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Complete onboarding
 */
export async function completeOnboarding(userId: string) {
  try {
    const { data, error } = await (supabase
      .from('user_profiles') as any)
      .update({ onboarding_completed: true })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Complete onboarding error:', error);
    return { data: null, error: error.message };
  }
}
