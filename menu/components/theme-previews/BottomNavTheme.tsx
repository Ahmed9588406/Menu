"use client";

import { Theme } from "@/lib/theme-data";
import { MenuItem, MenuCategory } from "@/lib/menu-data";
import { Home, Search, ShoppingCart, User } from "lucide-react";

interface BottomNavThemeProps {
  theme: Theme;
  categories: MenuCategory[];
  items: MenuItem[];
}

export default function BottomNavTheme({ theme, categories, items }: BottomNavThemeProps) {
  return (
    <div
      className="w-full h-full overflow-auto pb-20"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {/* Header */}
      <div
        className="w-full py-4 px-4"
        style={{ background: theme.gradient }}
      >
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">SNAPEX</h1>
          <p className="text-sm">مطعم وكافيه</p>
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="px-4 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" dir="rtl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex flex-col items-center gap-1 min-w-[80px] p-3 rounded-xl transition-all hover:scale-105"
              style={{
                backgroundColor: theme.primaryColor + "20",
                border: `2px solid ${theme.primaryColor}`,
              }}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span
                className="text-xs font-semibold whitespace-nowrap"
                style={{ color: theme.textColor }}
              >
                {cat.nameAr}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-2">
        <div className="relative">
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            size={18}
            style={{ color: theme.secondaryColor }}
          />
          <input
            type="text"
            placeholder="ابحث..."
            className="w-full pr-10 pl-4 py-2 rounded-full border-2"
            style={{
              borderColor: theme.primaryColor,
              color: theme.textColor,
            }}
            dir="rtl"
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-4">
        <h2
          className="text-xl font-bold mb-4 text-right"
          style={{ color: theme.textColor }}
        >
          عروض خاصة
        </h2>
        <div className="space-y-4" dir="rtl">
          {items.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex hover:shadow-lg transition-all"
            >
              {/* Item Image */}
              <div
                className="w-28 h-28 flex items-center justify-center text-4xl flex-shrink-0"
                style={{ backgroundColor: theme.backgroundColor }}
              >
                {item.image}
                {item.isOnSale && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {item.salePercentage}%
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="flex-1 p-3 text-right">
                <p
                  className="font-bold text-base mb-1"
                  style={{ color: theme.textColor }}
                >
                  {item.nameAr}
                </p>
                <p className="text-xs text-gray-500 mb-2">{item.descriptionAr}</p>
                <div className="flex justify-between items-center">
                  <button
                    className="px-4 py-1 rounded-full text-white text-sm font-bold"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    +
                  </button>
                  <p
                    className="font-bold text-lg"
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

      {/* Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 shadow-lg"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <div className="flex justify-around items-center py-3">
          <button className="flex flex-col items-center gap-1 text-white">
            <Home size={24} />
            <span className="text-xs">الرئيسية</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white opacity-60">
            <Search size={24} />
            <span className="text-xs">بحث</span>
          </button>
          <button
            className="flex flex-col items-center gap-1 -mt-6 p-4 rounded-full"
            style={{ backgroundColor: theme.accentColor }}
          >
            <ShoppingCart size={28} className="text-white" />
          </button>
          <button className="flex flex-col items-center gap-1 text-white opacity-60">
            <User size={24} />
            <span className="text-xs">حسابي</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white opacity-60">
            <span className="text-2xl">☰</span>
            <span className="text-xs">قائمة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
