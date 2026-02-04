"use client";

import { Theme } from "@/lib/theme-data";
import { MenuItem, MenuCategory } from "@/lib/menu-data";
import { ShoppingCart, Search, Globe, MapPin } from "lucide-react";

interface TopNavThemeProps {
  theme: Theme;
  categories: MenuCategory[];
  items: MenuItem[];
}

export default function TopNavTheme({ theme, categories, items }: TopNavThemeProps) {
  return (
    <div
      className="w-full h-full overflow-auto"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {/* Top Navigation */}
      <div
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
                style={{
                  backgroundColor: theme.accentColor,
                  color: "white",
                }}
              >
                S
              </div>
              <span className="text-white font-bold text-lg">SNAPEX</span>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="text-white hover:opacity-80">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <button className="text-white hover:opacity-80">
                <Globe size={20} />
              </button>
              <button className="text-white hover:opacity-80">
                <MapPin size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div
        className="w-full h-32 flex items-center justify-center text-white text-2xl font-bold"
        style={{ background: theme.gradient }}
      >
        <div className="text-center">
          <p className="text-3xl">SPECIAL OFFER</p>
          <p className="text-xl">GET 30% OFF</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-4">
        <div className="relative">
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            size={20}
            style={{ color: theme.secondaryColor }}
          />
          <input
            type="text"
            placeholder="ابحث في القائمة..."
            className="w-full pr-10 pl-4 py-3 rounded-lg border-2"
            style={{
              borderColor: theme.primaryColor,
              color: theme.textColor,
            }}
            dir="rtl"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" dir="rtl">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              className="px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: theme.accentColor,
                color: "white",
              }}
            >
              {cat.icon} {cat.nameAr}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" dir="rtl">
          {items.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Sale Badge */}
              {item.isOnSale && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  خصم
                </div>
              )}

              {/* Item Image */}
              <div
                className="h-32 flex items-center justify-center text-5xl"
                style={{ backgroundColor: theme.backgroundColor }}
              >
                {item.image}
              </div>

              {/* Item Details */}
              <div className="p-3 text-right">
                <p
                  className="font-bold text-sm mb-1"
                  style={{ color: theme.textColor }}
                >
                  {item.nameAr}
                </p>
                <p className="text-xs text-gray-500 mb-2">{item.descriptionAr}</p>
                <div className="flex justify-between items-center">
                  <button
                    className="px-3 py-1 rounded-lg text-white text-sm font-bold"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    أضف للسلة
                  </button>
                  <p
                    className="font-bold"
                    style={{ color: theme.primaryColor }}
                  >
                    {item.price} ج.م
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
