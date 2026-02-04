"use client";

import { useState } from "react";
import { Check, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { themes, Theme } from "@/lib/theme-data";
import ThemePreviewModal from "@/components/theme-previews/ThemePreviewModal";

interface BrandingTabProps {
  onNext?: () => void;
}

export default function BrandingTab({ onNext }: BrandingTabProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const colors = {
    darkBlue: "#1A3263",
    mediumBlue: "#547792",
    gold: "#FAB95B",
    cream: "#E8E2DB",
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedTheme) {
      newErrors.theme = "يجب اختيار قالب للقائمة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const theme = themes.find((t) => t.id === selectedTheme);
      toast({
        title: "✓ تم بنجاح",
        description: `تم اختيار ${theme?.nameAr}`,
        duration: 2000,
      });

      setTimeout(() => {
        onNext?.();
      }, 500);
    }
  };

  const getNavPositionLabel = (position: string) => {
    switch (position) {
      case "top":
        return "شريط علوي";
      case "bottom":
        return "شريط سفلي";
      case "sidebar":
        return "شريط جانبي";
      default:
        return "";
    }
  };

  return (
    <div className="w-full" dir="rtl">
      {/* Theme Preview Modal */}
      {previewTheme && (
        <ThemePreviewModal
          theme={previewTheme}
          isOpen={!!previewTheme}
          onClose={() => setPreviewTheme(null)}
        />
      )}

      {/* Header */}
      <div className="mb-8 text-right">
        <h2 style={{ color: colors.darkBlue }} className="text-2xl font-bold mb-2">
          اختر قالب المنيو
        </h2>
        <p style={{ color: colors.mediumBlue }} className="text-sm mb-4">
          اختر التصميم الذي يناسب مطعمك من بين القوالب المتاحة
        </p>
        <div
          className="inline-block px-4 py-2 rounded-lg"
          style={{
            backgroundColor: colors.gold + "20",
            border: `1px solid ${colors.gold}`,
          }}
        >
          <p style={{ color: colors.darkBlue }} className="text-sm font-semibold">
            الكريديت: SP 350
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => {
                setSelectedTheme(theme.id);
                setErrors({});
              }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                selectedTheme === theme.id ? "ring-4" : "ring-2 ring-opacity-30"
              }`}
              style={{
                borderColor: selectedTheme === theme.id ? colors.gold : colors.mediumBlue,
              }}
            >
              {/* Free Badge */}
              {theme.isFree && (
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold z-10"
                  style={{
                    backgroundColor: colors.gold,
                    color: colors.darkBlue,
                  }}
                >
                  مجاناً
                </div>
              )}

              {/* Selected Badge */}
              {selectedTheme === theme.id && (
                <div
                  className="absolute top-3 right-3 p-2 rounded-full z-10"
                  style={{
                    backgroundColor: colors.gold,
                  }}
                >
                  <Check size={20} style={{ color: colors.darkBlue }} />
                </div>
              )}

              {/* Theme Preview */}
              <div
                className="h-48 flex items-center justify-center relative"
                style={{
                  background: theme.gradient,
                }}
              >
                {/* Mock Menu Preview */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Navbar Position Indicator */}
                  {theme.navPosition === "top" && (
                    <div className="absolute top-4 left-4 right-4 h-8 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm" />
                  )}
                  {theme.navPosition === "bottom" && (
                    <div className="absolute bottom-4 left-4 right-4 h-8 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm" />
                  )}
                  {theme.navPosition === "sidebar" && (
                    <div className="absolute top-4 bottom-4 right-4 w-12 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm" />
                  )}

                  {/* Menu Cards Preview */}
                  <div className="flex gap-2 items-center justify-center">
                    <div className="w-16 h-20 bg-white bg-opacity-90 rounded-lg shadow-lg flex items-center justify-center text-2xl">
                      {theme.id === "royal" && "🍽️"}
                      {theme.id === "apex" && "🍕"}
                      {theme.id === "nobel" && "🍔"}
                      {theme.id === "classic" && "☕"}
                      {theme.id === "prime" && "🍰"}
                      {theme.id === "grand" && "🍜"}
                    </div>
                    <div className="w-16 h-20 bg-white bg-opacity-70 rounded-lg shadow-lg" />
                  </div>
                </div>

                {/* Theme Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm p-3">
                  <p className="text-white font-bold text-center">{theme.name}</p>
                </div>
              </div>

              {/* Theme Details */}
              <div className="bg-white p-4 text-right">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p style={{ color: colors.darkBlue }} className="font-bold text-lg">
                      {theme.nameAr}
                    </p>
                    <p style={{ color: colors.mediumBlue }} className="text-xs">
                      {getNavPositionLabel(theme.navPosition)}
                    </p>
                  </div>
                  <div className="text-left">
                    <p style={{ color: colors.gold }} className="font-bold text-xl">
                      {theme.price} SP
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  {theme.isFree ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTheme(theme.id);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg font-semibold transition-all"
                      style={{
                        backgroundColor: selectedTheme === theme.id ? colors.gold : colors.cream,
                        color: colors.darkBlue,
                      }}
                    >
                      {selectedTheme === theme.id ? "محدد" : "تحديد"}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTheme(theme.id);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg font-semibold transition-all"
                      style={{
                        backgroundColor: selectedTheme === theme.id ? colors.gold : colors.mediumBlue,
                        color: "white",
                      }}
                    >
                      شراء (SP {theme.price})
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTheme(theme);
                    }}
                    className="px-4 py-2 rounded-lg transition-all"
                    style={{
                      backgroundColor: colors.cream,
                      color: colors.darkBlue,
                    }}
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {errors.theme && (
          <p className="text-red-500 text-sm text-right">{errors.theme}</p>
        )}

        {/* Info Box */}
        <div
          className="p-4 rounded-lg border-r-4 text-right"
          style={{
            backgroundColor: colors.gold + "15",
            borderColor: colors.gold,
          }}
        >
          <p style={{ color: colors.darkBlue }} className="text-sm font-semibold">
            💡 نصيحة: اختر القالب الذي يناسب هوية مطعمك
          </p>
          <p style={{ color: colors.mediumBlue }} className="text-xs mt-2">
            يمكنك تغيير القالب لاحقاً من لوحة التحكم. القوالب المجانية متاحة بدون رسوم
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
          style={{
            backgroundColor: colors.gold,
            color: colors.darkBlue,
          }}
        >
          حفظ والمتابعة
        </button>
      </div>
    </div>
  );
}
