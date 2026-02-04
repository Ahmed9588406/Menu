"use client";

import { Theme } from "@/lib/theme-data";
import { MenuItem, MenuCategory } from "@/lib/menu-data";
import { ShoppingCart, Search, Globe } from "lucide-react";

interface SidebarThemeProps {
  theme: Theme;
  categories: MenuCategory[];
  items: MenuItem[];
}

export default function SidebarTheme({ theme, categories, items }: SidebarThemeProps) {
  return (
    <div className="w-full h-full flex" dir="rtl">
      {/* Sidebar */}
      <div
        className="w-20 flex-shrink-0 shadow-lg"
        style={{ background: theme.gradient }}
      >
        <div className="flex flex-col items-center py-4 gap-4">
          {/* Logo */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: theme.accentColor }}
          >
            S
          </div>

          {/* Category Icons */}
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl hover:scale-110 transition-all"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
              title={cat.nameAr}
            >
              {cat.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 overflow-auto"
        style={{ backgroundColor: theme.backgroundColor }}
      >
        {/* Top Bar */}
        <div className="bg-white shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="hover:opacity-80">
                <ShoppingCart size={24} style={{ color: theme.primaryColor }} />
              </button>
              <button className="hover:opacity-80">
                <Globe size={24} style={{ color: theme.primaryColor }} />
              </button>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  size={18}
                  style={{ color: theme.secondaryColor }}
                />
                <input
                  type="text"
                  placeholder="ابحث في القائمة..."
                  className="w-full pr-10 pl-4 py-2 rounded-lg border-2"
                  style={{
                    borderColor: theme.primaryColor,
                    color: theme.textColor,
                  }}
                  dir="rtl"
                />
              </div>
            </div>

            <div className="text-right">
              <p
                className="font-bold text-xl"
                style={{ color: theme.primaryColor }}
              >
                SNAPEX
              </p>
              <p className="text-sm text-gray-500">مطعم وكافيه</p>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div
          className="mx-6 mt-6 rounded-2xl h-40 flex items-center justify-center text-white"
          style={{ background: theme.gradient }}
        >
          <div className="text-center">
            <p className="text-3xl font-bold">SPECIAL OFFER</p>
            <p className="text-xl">GET 30% OFF</p>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: theme.primaryColor,
                  color: "white",
                }}
              >
                {cat.icon} {cat.nameAr}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="px-6 py-4">
          <h2
            className="text-2xl font-bold mb-4 text-right"
            style={{ color: theme.textColor }}
          >
            القائمة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.slice(0, 9).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Sale Badge */}
                {item.isOnSale && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    خصم {item.salePercentage}%
                  </div>
                )}

                {/* Item Image */}
                <div
                  className="h-40 flex items-center justify-center text-6xl relative"
                  style={{ backgroundColor: theme.backgroundColor }}
                >
                  {item.image}
                </div>

                {/* Item Details */}
                <div className="p-4 text-right">
                  <p
                    className="font-bold text-lg mb-2"
                    style={{ color: theme.textColor }}
                  >
                    {item.nameAr}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">{item.descriptionAr}</p>
                  <div className="flex justify-between items-center">
                    <button
                      className="px-4 py-2 rounded-lg text-white font-bold transition-all hover:scale-105"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      أضف للسلة
                    </button>
                    <p
                      className="font-bold text-xl"
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
    </div>
  );
}
