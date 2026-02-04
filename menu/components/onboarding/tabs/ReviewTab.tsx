"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Copy, RefreshCw, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReviewTabProps {
  onNext?: () => void;
}

export default function ReviewTab({ onNext }: ReviewTabProps) {
  const [slug, setSlug] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const { toast } = useToast();

  const colors = {
    darkBlue: "#1A3263",
    mediumBlue: "#547792",
    gold: "#FAB95B",
    cream: "#E8E2DB",
  };

  const APP_DOMAIN = "snapexmenu.com";

  const items = [
    "✓ تم إعداد بيانات المطعم",
    "✓ تم إضافة معلومات التواصل",
    "✓ تم استلام الكريديت المجاني",
    "✓ تم اختيار قالب القائمة",
    "✓ تم إضافة الفروع",
    "✓ تم تفعيل الخدمات",
  ];

  // Generate slug from restaurant name (you can get this from context/props)
  useEffect(() => {
    // This would come from your restaurant data
    const restaurantName = "مطعم سنابكس"; // Example
    const generatedSlug = generateSlug(restaurantName);
    setSlug(generatedSlug);
    setCustomSlug(generatedSlug);
  }, []);

  const generateSlug = (name: string): string => {
    // Convert Arabic to English transliteration or use a simple approach
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
      || `restaurant-${Date.now()}`;
  };

  const handleSlugChange = (value: string) => {
    // Clean the slug
    const cleanedSlug = value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
    
    setCustomSlug(cleanedSlug);
    setIsSlugAvailable(null);
  };

  const checkSlugAvailability = async () => {
    if (!customSlug.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رابط صحيح",
        duration: 2000,
      });
      return;
    }

    setIsCheckingSlug(true);
    
    // Simulate API call to check slug availability
    setTimeout(() => {
      // In production, this would be an actual API call
      const isAvailable = Math.random() > 0.3; // 70% chance available
      setIsSlugAvailable(isAvailable);
      setIsCheckingSlug(false);

      if (isAvailable) {
        setSlug(customSlug);
        toast({
          title: "✓ الرابط متاح",
          description: "يمكنك استخدام هذا الرابط",
          duration: 2000,
        });
      } else {
        toast({
          title: "⚠ الرابط غير متاح",
          description: "هذا الرابط مستخدم بالفعل، جرب رابط آخر",
          duration: 2000,
        });
      }
    }, 1000);
  };

  const generateRandomSlug = () => {
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const newSlug = `restaurant-${randomSuffix}`;
    setCustomSlug(newSlug);
    setSlug(newSlug);
    setIsSlugAvailable(true);
  };

  const copyToClipboard = () => {
    const fullUrl = `https://${slug}.${APP_DOMAIN}`;
    navigator.clipboard.writeText(fullUrl);
    toast({
      title: "✓ تم النسخ",
      description: "تم نسخ الرابط إلى الحافظة",
      duration: 2000,
    });
  };

  const handleComplete = () => {
    if (!slug) {
      toast({
        title: "خطأ",
        description: "يرجى تحديد رابط للقائمة",
        duration: 2000,
      });
      return;
    }

    toast({
      title: "🎉 مبروك!",
      description: "تم إعداد حسابك بنجاح",
      duration: 2000,
    });

    setTimeout(() => {
      onNext?.();
    }, 500);
  };

  const fullUrl = `https://${slug || "your-menu"}.${APP_DOMAIN}`;

  return (
    <div className="w-full" dir="rtl">
      {/* Header */}
      <div className="mb-8 text-right">
        <h2 style={{ color: colors.darkBlue }} className="text-2xl font-bold mb-2">
          رابط المنيو الخاص بك
        </h2>
        <p style={{ color: colors.mediumBlue }} className="text-sm">
          هذه الروابط التي يتوفر في مشروعك البحث، ويمكن استخدامه لإنشاء QR أو عملائك
        </p>
      </div>

      <div className="space-y-6">
        {/* Slug Input Section */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <label
            style={{ color: colors.darkBlue }}
            className="block text-sm font-semibold mb-3 text-right"
          >
            اسم الدومين
          </label>

          {/* URL Builder */}
          <div className="flex items-center gap-2 mb-4" dir="ltr">
            <span
              style={{ color: colors.mediumBlue }}
              className="text-sm font-medium whitespace-nowrap"
            >
              https://
            </span>
            <input
              type="text"
              value={customSlug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="اسم-مطعمك"
              className="flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none transition-all text-left"
              style={{
                borderColor: isSlugAvailable === false ? "#ef4444" : colors.mediumBlue,
                color: colors.darkBlue,
              }}
              onFocus={(e) => {
                if (isSlugAvailable !== false) {
                  e.target.style.borderColor = colors.gold;
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = isSlugAvailable === false ? "#ef4444" : colors.mediumBlue;
              }}
            />
            <span
              style={{ color: colors.mediumBlue }}
              className="text-sm font-medium whitespace-nowrap"
            >
              .{APP_DOMAIN}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-4 flex-row-reverse">
            <button
              onClick={checkSlugAvailability}
              disabled={isCheckingSlug || !customSlug.trim()}
              className="px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              style={{
                backgroundColor: colors.gold,
                color: colors.darkBlue,
              }}
            >
              {isCheckingSlug ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  جاري الفحص...
                </>
              ) : (
                <>
                  <RefreshCw size={16} />
                  تحقق
                </>
              )}
            </button>

            <button
              onClick={generateRandomSlug}
              className="px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-md flex items-center gap-2"
              style={{
                backgroundColor: colors.cream,
                color: colors.darkBlue,
                border: `2px solid ${colors.mediumBlue}`,
              }}
            >
              <RefreshCw size={16} />
              إنشاء عشوائي
            </button>
          </div>

          {/* Availability Status */}
          {isSlugAvailable !== null && (
            <div
              className="p-3 rounded-lg text-right text-sm"
              style={{
                backgroundColor: isSlugAvailable ? colors.gold + "20" : "#fee2e2",
                color: isSlugAvailable ? colors.darkBlue : "#dc2626",
              }}
            >
              {isSlugAvailable ? "✓ الرابط متاح للاستخدام" : "✗ الرابط غير متاح، جرب رابط آخر"}
            </div>
          )}

          {/* Full URL Display */}
          {slug && (
            <div className="mt-4">
              <div
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: colors.cream }}
              >
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg hover:bg-white transition-all"
                    title="نسخ الرابط"
                  >
                    <Copy size={18} style={{ color: colors.darkBlue }} />
                  </button>
                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-white transition-all"
                    title="فتح الرابط"
                  >
                    <ExternalLink size={18} style={{ color: colors.darkBlue }} />
                  </a>
                </div>
                <p
                  style={{ color: colors.darkBlue }}
                  className="font-mono text-sm break-all text-right"
                  dir="ltr"
                >
                  {fullUrl}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Completion Checklist */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3
            style={{ color: colors.darkBlue }}
            className="text-lg font-bold mb-4 text-right"
          >
            ملخص الإعداد
          </h3>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg flex-row-reverse"
                style={{ backgroundColor: colors.cream }}
              >
                <CheckCircle2 size={20} style={{ color: colors.gold }} />
                <span style={{ color: colors.darkBlue }} className="font-medium text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        <div
          className="p-6 rounded-lg text-center"
          style={{
            backgroundColor: colors.gold + "20",
            border: `2px solid ${colors.gold}`,
          }}
        >
          <p style={{ color: colors.darkBlue }} className="font-bold text-xl mb-2">
            🎉 تم إعداد حسابك بنجاح!
          </p>
          <p style={{ color: colors.mediumBlue }} className="text-sm">
            يمكنك الآن البدء في إضافة الأطباق والمشروبات إلى قائمتك
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleComplete}
          className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg text-lg"
          style={{
            backgroundColor: colors.gold,
            color: colors.darkBlue,
          }}
        >
          إنهاء الإعداد والبدء
        </button>
      </div>
    </div>
  );
}
