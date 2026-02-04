# Database Schema for Menu System

## Tables Structure

### 1. Restaurants Table
```sql
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  logo_url TEXT,
  phone VARCHAR(50),
  whatsapp VARCHAR(50),
  facebook_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  selected_theme_id VARCHAR(50),
  credits_balance DECIMAL(10, 2) DEFAULT 350.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Themes Table
```sql
CREATE TABLE themes (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  is_free BOOLEAN DEFAULT FALSE,
  nav_position VARCHAR(20) CHECK (nav_position IN ('top', 'bottom', 'sidebar')),
  gradient TEXT,
  primary_color VARCHAR(7),
  secondary_color VARCHAR(7),
  accent_color VARCHAR(7),
  background_color VARCHAR(7),
  text_color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Menu Categories Table
```sql
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name_ar VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  icon VARCHAR(10),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Menu Items Table
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_on_sale BOOLEAN DEFAULT FALSE,
  sale_percentage INTEGER,
  is_available BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Menu Item Ingredients Table
```sql
CREATE TABLE menu_item_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  ingredient_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Theme Purchases Table
```sql
CREATE TABLE theme_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  theme_id VARCHAR(50) REFERENCES themes(id),
  purchase_price DECIMAL(10, 2) NOT NULL,
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(restaurant_id, theme_id)
);
```

### 7. Credit Transactions Table
```sql
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  transaction_type VARCHAR(50) CHECK (transaction_type IN ('credit', 'debit', 'purchase', 'refund')),
  description TEXT,
  balance_after DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Indexes for Performance

```sql
-- Restaurant indexes
CREATE INDEX idx_restaurants_theme ON restaurants(selected_theme_id);

-- Menu categories indexes
CREATE INDEX idx_categories_restaurant ON menu_categories(restaurant_id);
CREATE INDEX idx_categories_order ON menu_categories(display_order);

-- Menu items indexes
CREATE INDEX idx_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_items_category ON menu_items(category_id);
CREATE INDEX idx_items_sale ON menu_items(is_on_sale);
CREATE INDEX idx_items_order ON menu_items(display_order);

-- Ingredients indexes
CREATE INDEX idx_ingredients_item ON menu_item_ingredients(menu_item_id);

-- Purchases indexes
CREATE INDEX idx_purchases_restaurant ON theme_purchases(restaurant_id);
CREATE INDEX idx_purchases_theme ON theme_purchases(theme_id);

-- Transactions indexes
CREATE INDEX idx_transactions_restaurant ON credit_transactions(restaurant_id);
CREATE INDEX idx_transactions_type ON credit_transactions(transaction_type);
```

## Sample Data Insertion

### Insert Default Themes
```sql
INSERT INTO themes (id, name, name_ar, price, is_free, nav_position, gradient, primary_color, secondary_color, accent_color, background_color, text_color) VALUES
('royal', 'Royal Theme', 'قالب رويال', 95.00, FALSE, 'top', 'linear-gradient(135deg, #1e3a20 0%, #2d5a2d 100%)', '#2d5a2d', '#1e3a20', '#d4af37', '#f5f5f0', '#1a1a1a'),
('apex', 'Apex Theme', 'قالب أبكس', 150.00, FALSE, 'bottom', 'linear-gradient(135deg, #3d2817 0%, #5a3d1f 100%)', '#5a3d1f', '#3d2817', '#ff6b35', '#faf8f5', '#2c2c2c'),
('nobel', 'Nobel Theme', 'قالب نوبل', 200.00, TRUE, 'sidebar', 'linear-gradient(135deg, #1a1a3e 0%, #2d2d5f 100%)', '#2d2d5f', '#1a1a3e', '#4a90e2', '#f8f9fa', '#212529'),
('classic', 'Classic Theme', 'قالب كلاسيك', 120.00, FALSE, 'top', 'linear-gradient(135deg, #2d1810 0%, #4a2818 100%)', '#4a2818', '#2d1810', '#c9a961', '#fff8f0', '#3e2723'),
('prime', 'Prime Theme', 'قالب برايم', 180.00, FALSE, 'bottom', 'linear-gradient(135deg, #1a1a3e 0%, #2d2d5f 100%)', '#2d2d5f', '#1a1a3e', '#9b59b6', '#f4f4f8', '#1a1a1a'),
('grand', 'Grand Theme', 'قالب جراند', 250.00, FALSE, 'sidebar', 'linear-gradient(135deg, #2d1a2d 0%, #4a2d4a 100%)', '#4a2d4a', '#2d1a2d', '#e91e63', '#fef5f8', '#2c2c2c');
```

### Insert Restaurant Example
```sql
INSERT INTO restaurants (name, name_ar, type, phone, whatsapp, selected_theme_id, credits_balance)
VALUES ('SNAPEX Restaurant', 'مطعم سنابكس', 'restaurant', '201012345678', '201012345678', 'nobel', 350.00);
```

## API Endpoints Structure

### Restaurant Endpoints
- `POST /api/restaurants` - Create restaurant
- `GET /api/restaurants/:id` - Get restaurant details
- `PUT /api/restaurants/:id` - Update restaurant
- `DELETE /api/restaurants/:id` - Delete restaurant

### Theme Endpoints
- `GET /api/themes` - List all themes
- `GET /api/themes/:id` - Get theme details
- `POST /api/themes/purchase` - Purchase a theme
- `GET /api/restaurants/:id/themes` - Get purchased themes

### Menu Endpoints
- `GET /api/restaurants/:id/categories` - List categories
- `POST /api/restaurants/:id/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

- `GET /api/restaurants/:id/items` - List menu items
- `POST /api/restaurants/:id/items` - Create menu item
- `PUT /api/items/:id` - Update menu item
- `DELETE /api/items/:id` - Delete menu item

### Credit Endpoints
- `GET /api/restaurants/:id/credits` - Get credit balance
- `POST /api/restaurants/:id/credits/add` - Add credits
- `GET /api/restaurants/:id/transactions` - Get transaction history

## TypeScript Interfaces for API

```typescript
// Restaurant
export interface Restaurant {
  id: string;
  name: string;
  nameAr: string;
  type: string;
  logoUrl?: string;
  phone: string;
  whatsapp: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  selectedThemeId?: string;
  creditsBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

// Theme
export interface Theme {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  isFree: boolean;
  navPosition: 'top' | 'bottom' | 'sidebar';
  gradient: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

// Menu Category
export interface MenuCategory {
  id: string;
  restaurantId: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Menu Item
export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  imageUrl?: string;
  isOnSale: boolean;
  salePercentage?: number;
  isAvailable: boolean;
  displayOrder: number;
  ingredients: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Credit Transaction
export interface CreditTransaction {
  id: string;
  restaurantId: string;
  amount: number;
  transactionType: 'credit' | 'debit' | 'purchase' | 'refund';
  description: string;
  balanceAfter: number;
  createdAt: Date;
}
```
