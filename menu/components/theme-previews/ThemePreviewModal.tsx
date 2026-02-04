"use client";

import { X } from "lucide-react";
import { Theme } from "@/lib/theme-data";
import { menuCategories, menuItems } from "@/lib/menu-data";
import TopNavTheme from "./TopNavTheme";
import BottomNavTheme from "./BottomNavTheme";
import SidebarTheme from "./SidebarTheme";

interface ThemePreviewModalProps {
  theme: Theme;
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemePreviewModal({ theme, isOpen, onClose }: ThemePreviewModalProps) {
  if (!isOpen) return null;

  const renderThemePreview = () => {
    switch (theme.navPosition) {
      case "top":
        return <TopNavTheme theme={theme} categories={menuCategories} items={menuItems} />;
      case "bottom":
        return <BottomNavTheme theme={theme} categories={menuCategories} items={menuItems} />;
      case "sidebar":
        return <SidebarTheme theme={theme} categories={menuCategories} items={menuItems} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X size={24} />
          </button>
          <div className="text-right">
            <h2 className="text-xl font-bold">{theme.nameAr}</h2>
            <p className="text-sm text-gray-500">{theme.name}</p>
          </div>
        </div>

        {/* Modal Content - Theme Preview */}
        <div className="flex-1 overflow-hidden">
          <div className="w-full h-full">
            {renderThemePreview()}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t flex justify-between items-center" dir="rtl">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-semibold transition-all hover:bg-gray-100"
            style={{
              backgroundColor: "#f0f0f0",
              color: "#1A3263",
            }}
          >
            إغلاق
          </button>
          <div className="text-right">
            <p className="text-sm text-gray-500">السعر</p>
            <p className="text-2xl font-bold" style={{ color: theme.primaryColor }}>
              {theme.isFree ? "مجاناً" : `${theme.price} SP`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
