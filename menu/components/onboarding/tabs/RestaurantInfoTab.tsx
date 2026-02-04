"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RestaurantInfoTabProps {
  onNext?: () => void;
}

export default function RestaurantInfoTab({ onNext }: RestaurantInfoTabProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const colors = {
    darkBlue: "#1A3263",
    mediumBlue: "#547792",
    gold: "#FAB95B",
    cream: "#E8E2DB",
  };

  const restaurantTypes = [
    { value: "restaurant", label: "مطعم" },
    { value: "cafe", label: "مقهى" },
    { value: "bakery", label: "مخبزة" },
    { value: "fast-food", label: "وجبات سريعة" },
    { value: "dessert", label: "حلويات" },
    { value: "juice", label: "عصائر" },
    { value: "pizza", label: "بيتزا" },
    { value: "shawarma", label: "شاورما" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, logo: "حجم الملف يجب أن يكون أقل من 5MB" }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, logo: "يجب أن يكون الملف صورة" }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoPreview(result);
        setErrors((prev) => ({ ...prev, logo: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "اسم المطعم مطلوب";
    }

    if (!formData.type) {
      newErrors.type = "نوع المطعم مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      toast({
        title: "✓ تم بنجاح",
        description: `تم حفظ بيانات ${formData.name}`,
        duration: 2000,
      });

      // Navigate to next tab after a short delay
      setTimeout(() => {
        onNext?.();
      }, 500);
    }
  };

  return (
    <div className="w-full" dir="rtl">
      {/* Header */}
      <div className="mb-8 text-right">
        <h2 style={{ color: colors.darkBlue }} className="text-2xl font-bold mb-2">
          بيانات المطعم الأساسية
        </h2>
        <p style={{ color: colors.mediumBlue }} className="text-sm">
          أدخل المعلومات الأساسية عن مطعمك
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Two Column Layout - Name and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Restaurant Type - Right Column */}
          <div className="md:order-2 text-right">
            <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-3 text-right">
              نوع المطعم
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all appearance-none cursor-pointer text-right"
              style={{
                borderColor: errors.type ? "#ef4444" : colors.mediumBlue,
                color: formData.type ? colors.darkBlue : "#999",
                direction: "rtl",
              }}
              onFocus={(e) => {
                if (!errors.type) {
                  e.target.style.borderColor = colors.gold;
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.type ? "#ef4444" : colors.mediumBlue;
              }}
            >
              <option value="">اختر نوع المطعم</option>
              {restaurantTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1 text-right">{errors.type}</p>
            )}
          </div>

          {/* Restaurant Name - Left Column */}
          <div className="md:order-1 text-right">
            <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-3 text-right">
              اسم المطعم
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="أكتب اسم المطعم"
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all placeholder-gray-400 text-right"
              style={{
                borderColor: errors.name ? "#ef4444" : colors.mediumBlue,
                color: colors.darkBlue,
                direction: "rtl",
              }}
              onFocus={(e) => {
                if (!errors.name) {
                  e.target.style.borderColor = colors.gold;
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.name ? "#ef4444" : colors.mediumBlue;
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 text-right">{errors.name}</p>
            )}
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="text-right">
          <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-3 text-right">
            شعار المطعم (اختياري)
          </label>
          <p style={{ color: colors.mediumBlue }} className="text-xs mb-4 text-right">
            الصيغ المدعومة: PNG, JPG, GIF (الحد الأقصى 5MB)
          </p>

          {logoPreview ? (
            // Logo Preview State
            <div
              className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center"
              style={{
                borderColor: colors.mediumBlue,
                backgroundColor: colors.cream + "40",
              }}
            >
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="h-40 w-40 object-contain mb-6 rounded-lg"
              />
              <div className="flex gap-3 w-full justify-center flex-row-reverse">
                <label
                  htmlFor="logo-upload"
                  className="px-6 py-2 rounded-lg font-semibold cursor-pointer transition-all hover:shadow-md"
                  style={{
                    backgroundColor: colors.gold,
                    color: colors.darkBlue,
                  }}
                >
                  تغيير الشعار
                </label>
                <button
                  onClick={removeLogo}
                  className="px-6 py-2 rounded-lg font-semibold transition-all hover:shadow-md"
                  style={{
                    backgroundColor: "#f0f0f0",
                    color: colors.darkBlue,
                    border: `2px solid ${colors.mediumBlue}`,
                  }}
                >
                  حذف
                </button>
              </div>
            </div>
          ) : (
            // Upload State
            <label
              htmlFor="logo-upload"
              className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all hover:bg-opacity-50 block"
              style={{
                borderColor: colors.mediumBlue,
                backgroundColor: colors.cream + "40",
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <Upload size={48} style={{ color: colors.gold }} />
                <p style={{ color: colors.darkBlue }} className="font-semibold text-lg">
                  اضغط لرفع الشعار
                </p>
                <p style={{ color: colors.mediumBlue }} className="text-sm">
                  أو اسحب الملف هنا
                </p>
              </div>
            </label>
          )}

          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />

          {errors.logo && (
            <p className="text-red-500 text-sm mt-2 text-right">{errors.logo}</p>
          )}
        </div>

        {/* Info Box */}
        <div
          className="p-4 rounded-lg border-r-4 text-right"
          style={{
            backgroundColor: colors.gold + "15",
            borderColor: colors.gold,
          }}
        >
          <p style={{ color: colors.darkBlue }} className="text-sm font-semibold">
            💡 نصيحة: استخدم شعار واضح وسهل التعرف عليه
          </p>
          <p style={{ color: colors.mediumBlue }} className="text-xs mt-2">
            سيظهر شعارك في القائمة الرقمية وعلى جميع المنصات
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
