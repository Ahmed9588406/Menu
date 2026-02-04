-- =====================================================
-- SUPABASE SCHEMA FOR RESTAURANT MANAGEMENT SYSTEM
-- =====================================================
-- This schema includes:
-- 1. Authentication integration with Supabase Auth
-- 2. User profiles and restaurant data
-- 3. All 7 onboarding tabs data storage
-- 4. Image storage references
-- 5. RLS (Row Level Security) policies
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. USERS & AUTHENTICATION
-- =====================================================
-- This table extends Supabase Auth users
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    onboarding_step INTEGER DEFAULT 0
);

-- =====================================================
-- 2. RESTAURANT INFO (Tab 1: RestaurantInfoTab)
-- =====================================================
CREATE TABLE public.restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- restaurant, cafe, bakery, fast-food, dessert, juice, pizza, shawarma
    logo_url TEXT, -- Reference to storage bucket
    slug TEXT UNIQUE, -- For custom domain (from ReviewTab)
    credit_balance DECIMAL(10, 2) DEFAULT 350.00, -- Initial credit from MenuCategoriesTab
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id) -- One restaurant per user
);

-- =====================================================
-- 3. CONTACT INFO (Tab 2: ContactInfoTab)
-- =====================================================
CREATE TABLE public.restaurant_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    facebook TEXT,
    instagram TEXT,
    tiktok TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(restaurant_id)
);

-- =====================================================
-- 4. BRANDING & THEME (Tab 3: BrandingTab)
-- =====================================================
CREATE TABLE public.restaurant_themes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    theme_id TEXT NOT NULL, -- royal, apex, nobel, classic, prime, grand
    theme_name TEXT NOT NULL,
    theme_name_ar TEXT NOT NULL,
    nav_position TEXT NOT NULL, -- top, bottom, sidebar
    gradient TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_free BOOLEAN DEFAULT FALSE,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(restaurant_id)
);

-- =====================================================
-- 5. BRANCHES (Tab 5: PaymentTab - Branches Section)
-- =====================================================
CREATE TABLE public.branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    is_main BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. SERVICES & SETTINGS (Tab 6: SettingsTab)
-- =====================================================
CREATE TABLE public.restaurant_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    table_service BOOLEAN DEFAULT FALSE, -- طاولة بالمحل
    delivery BOOLEAN DEFAULT FALSE, -- ديليفري
    takeaway BOOLEAN DEFAULT FALSE, -- تيك أواي
    drive_thru BOOLEAN DEFAULT FALSE, -- درايف ثرو
    reservations BOOLEAN DEFAULT FALSE, -- حجوزات
    order_management BOOLEAN DEFAULT FALSE, -- إدارة الطلبات
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(restaurant_id)
);

-- =====================================================
-- 7. MENU CATEGORIES
-- =====================================================
CREATE TABLE public.menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name_ar TEXT NOT NULL,
    name_en TEXT,
    icon TEXT, -- Icon name or emoji
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 8. MENU ITEMS (Products)
-- =====================================================
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.menu_categories(id) ON DELETE SET NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT,
    description_ar TEXT,
    description_en TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT, -- Reference to storage bucket
    is_available BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. ONBOARDING PROGRESS TRACKING
-- =====================================================
CREATE TABLE public.onboarding_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    restaurant_info_completed BOOLEAN DEFAULT FALSE,
    contact_info_completed BOOLEAN DEFAULT FALSE,
    branding_completed BOOLEAN DEFAULT FALSE,
    menu_categories_completed BOOLEAN DEFAULT FALSE,
    branches_completed BOOLEAN DEFAULT FALSE,
    settings_completed BOOLEAN DEFAULT FALSE,
    review_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- =====================================================
-- 10. CREDIT TRANSACTIONS
-- =====================================================
CREATE TABLE public.credit_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type TEXT NOT NULL, -- credit, debit, purchase, refund
    description TEXT,
    balance_after DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 11. STORAGE BUCKETS SETUP
-- =====================================================
-- Note: Run these commands in Supabase Dashboard or via API
-- Bucket for restaurant logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('restaurant-logos', 'restaurant-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket for menu item images
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-items', 'menu-items', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Restaurants Policies
CREATE POLICY "Users can view own restaurant"
    ON public.restaurants FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own restaurant"
    ON public.restaurants FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own restaurant"
    ON public.restaurants FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Public can view restaurants by slug"
    ON public.restaurants FOR SELECT
    USING (slug IS NOT NULL);

-- Restaurant Contacts Policies
CREATE POLICY "Users can manage own restaurant contacts"
    ON public.restaurant_contacts FOR ALL
    USING (
        restaurant_id IN (
            SELECT id FROM public.restaurants WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view restaurant contacts"
    ON public.restaurant_contacts FOR SELECT
    USING (true);

-- Restaurant Themes Policies
CREATE POLICY "Users can manage own restaurant themes"
    ON public.restaurant_themes FOR ALL
    USING (
        restaurant_id IN (
            SELECT id FROM public.restaurants WHERE user_id = auth.uid()
        )
    );

-- Branches Policies
CREATE POLICY "Users can manage own branches"
    ON public.branches FOR ALL
    USING (
        restaurant_id IN (
            SELECT id FROM public.restaurants WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view branches"
    ON public.branches FOR SELECT
    USING (true);

-- Restaurant Services Policies
CREATE POLICY "Users can manage own restaurant services"
    ON public.restaurant_services FOR ALL
    USING (
        restaurant_id IN (
            SELECT id FROM public.restaurants WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view restaurant services"
    ON public.restaurant_services FOR SELECT
    USING (true);

-- Menu Categories Policies
CREATE POLICY "Users can manage own menu categories"
    ON public.menu_categories FOR ALL
    USING (
        restaurant_id IN (
            SELECT id FROM public.restaurants WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view active menu categories"
    ON public.menu_categories FOR SELECT
    USING (is_active = true);

-- Menu Items Policies
CREATE POLICY "Users can manage own menu items"
    ON public.menu_items FOR ALL
    USING (
        restaurant_id IN (
            SELECT id FROM public.restaurants WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view available menu items"
    ON public.menu_items FOR SELECT
    USING (is_available = true);

-- Onboarding Progress Policies
CREATE POLICY "Users can manage own onboarding progress"
    ON public.onboarding_progress FOR ALL
    USING (auth.uid() = user_id);

-- Credit Transactions Policies
CREATE POLICY "Users can view own credit transactions"
    ON public.credit_transactions FOR SELECT
    USING (
        restaurant_id IN (
            SELECT id FROM public.restaurants WHERE user_id = auth.uid()
        )
    );

-- =====================================================
-- 13. STORAGE POLICIES
-- =====================================================

-- Restaurant Logos Storage Policies
CREATE POLICY "Users can upload own restaurant logos"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'restaurant-logos' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update own restaurant logos"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'restaurant-logos' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete own restaurant logos"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'restaurant-logos' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Public can view restaurant logos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'restaurant-logos');

-- Menu Items Storage Policies
CREATE POLICY "Users can upload own menu item images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'menu-items' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update own menu item images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'menu-items' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete own menu item images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'menu-items' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Public can view menu item images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'menu-items');

-- =====================================================
-- 14. FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurants_updated_at
    BEFORE UPDATE ON public.restaurants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurant_contacts_updated_at
    BEFORE UPDATE ON public.restaurant_contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurant_themes_updated_at
    BEFORE UPDATE ON public.restaurant_themes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_branches_updated_at
    BEFORE UPDATE ON public.branches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurant_services_updated_at
    BEFORE UPDATE ON public.restaurant_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_categories_updated_at
    BEFORE UPDATE ON public.menu_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON public.menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_onboarding_progress_updated_at
    BEFORE UPDATE ON public.onboarding_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, phone)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'phone'
    );
    
    -- Create onboarding progress record
    INSERT INTO public.onboarding_progress (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to track credit transactions
CREATE OR REPLACE FUNCTION public.record_credit_transaction()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.credit_balance != OLD.credit_balance THEN
        INSERT INTO public.credit_transactions (
            restaurant_id,
            amount,
            transaction_type,
            description,
            balance_after
        )
        VALUES (
            NEW.id,
            NEW.credit_balance - OLD.credit_balance,
            CASE 
                WHEN NEW.credit_balance > OLD.credit_balance THEN 'credit'
                ELSE 'debit'
            END,
            'Balance updated',
            NEW.credit_balance
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to record credit transactions
CREATE TRIGGER track_credit_changes
    AFTER UPDATE ON public.restaurants
    FOR EACH ROW
    WHEN (OLD.credit_balance IS DISTINCT FROM NEW.credit_balance)
    EXECUTE FUNCTION public.record_credit_transaction();

-- =====================================================
-- 15. INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_restaurants_user_id ON public.restaurants(user_id);
CREATE INDEX idx_restaurants_slug ON public.restaurants(slug);
CREATE INDEX idx_restaurant_contacts_restaurant_id ON public.restaurant_contacts(restaurant_id);
CREATE INDEX idx_restaurant_themes_restaurant_id ON public.restaurant_themes(restaurant_id);
CREATE INDEX idx_branches_restaurant_id ON public.branches(restaurant_id);
CREATE INDEX idx_restaurant_services_restaurant_id ON public.restaurant_services(restaurant_id);
CREATE INDEX idx_menu_categories_restaurant_id ON public.menu_categories(restaurant_id);
CREATE INDEX idx_menu_items_restaurant_id ON public.menu_items(restaurant_id);
CREATE INDEX idx_menu_items_category_id ON public.menu_items(category_id);
CREATE INDEX idx_onboarding_progress_user_id ON public.onboarding_progress(user_id);
CREATE INDEX idx_credit_transactions_restaurant_id ON public.credit_transactions(restaurant_id);

-- =====================================================
-- 16. INITIAL DATA / SEED DATA (Optional)
-- =====================================================

-- You can add seed data here if needed
-- Example: Default menu categories, themes, etc.

-- =====================================================
-- END OF SCHEMA
-- =====================================================
