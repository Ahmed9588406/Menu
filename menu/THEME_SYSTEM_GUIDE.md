# Theme System Guide

## Overview
A complete theme selection system for restaurant menu displays with three different navigation layouts.

## Features Implemented

### 1. Theme Selection Page (`/dashboard/theme`)
- **Grid Layout**: Displays all available themes in responsive cards
- **Theme Cards**: Each card shows:
  - Theme name (Arabic & English)
  - Navigation type indicator (Top/Bottom/Sidebar)
  - Color palette preview
  - Price or "Free" badge
  - Preview and Select buttons
- **Interactive Preview**: Click on any theme card to see full preview
- **Selection State**: Visual feedback for selected theme

### 2. Three Navigation Layouts

#### Top Navigation Theme
- **Layout**: Fixed navbar at the top
- **Features**: Logo, cart, language selector, search bar
- **Best For**: Desktop-first restaurants, formal dining
- **Example Themes**: Royal, Classic

#### Bottom Navigation Theme
- **Layout**: Fixed navbar at the bottom (mobile-first)
- **Features**: Home, Search, Cart (elevated), Profile, Menu icons
- **Best For**: Mobile-focused, quick service restaurants
- **Example Themes**: Apex, Prime

#### Sidebar Navigation Theme
- **Layout**: Fixed sidebar with category icons
- **Features**: Vertical navigation, spacious content area
- **Best For**: Cafes, modern restaurants with extensive menus
- **Example Themes**: Nobel, Grand

### 3. Theme Data Structure

Each theme includes:
- **ID**: Unique identifier
- **Names**: Arabic and English
- **Price**: Cost in SP (or free)
- **Navigation Position**: top/bottom/sidebar
- **Color Scheme**:
  - Primary Color
  - Secondary Color
  - Accent Color
  - Background Color
  - Text Color
- **Gradient**: For banners and headers

### 4. Preview System

- **Full-Screen Modal**: Shows complete theme with real menu data
- **Test Data**: Uses sample menu items from `lib/menu-data.ts`
- **Interactive Elements**: All buttons and navigation items are styled
- **Responsive**: Adapts to different screen sizes

## Available Themes

1. **Royal Theme** (95 SP) - Top Nav - Green & Gold
2. **Apex Theme** (150 SP) - Bottom Nav - Brown & Orange
3. **Nobel Theme** (FREE) - Sidebar - Navy & Blue
4. **Classic Theme** (120 SP) - Top Nav - Brown & Gold
5. **Prime Theme** (180 SP) - Bottom Nav - Purple
6. **Grand Theme** (250 SP) - Sidebar - Purple & Pink

## How to Use

1. Navigate to `/dashboard/theme`
2. Browse available themes
3. Click "معاينة" (Preview) to see full theme
4. Click price/select button to choose theme
5. Click "تفعيل القالب" (Activate Theme) to apply

## Technical Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with inline styles for dynamic colors
- **Components**: shadcn/ui components (Card, Button, Badge, Dialog)
- **State Management**: React useState for selection and preview
- **RTL Support**: Full Arabic language support

## File Structure

```
app/dashboard/theme/page.tsx          # Main theme selection page
lib/theme-data.ts                     # Theme definitions
lib/menu-data.ts                      # Test menu data
components/theme-previews/
  ├── ThemePreviewModal.tsx           # Preview modal wrapper
  ├── TopNavTheme.tsx                 # Top navigation layout
  ├── BottomNavTheme.tsx              # Bottom navigation layout
  └── SidebarTheme.tsx                # Sidebar navigation layout
```

## Customization

To add a new theme:
1. Add theme object to `themes` array in `lib/theme-data.ts`
2. Define colors, navigation position, and pricing
3. Theme will automatically appear in the selection page

## Next Steps

- Connect theme selection to database
- Implement theme activation logic
- Add theme customization options (color picker)
- Create theme preview for customer-facing menu
- Add more theme variations
