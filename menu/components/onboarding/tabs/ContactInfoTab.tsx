"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ContactInfoTabProps {
  onNext?: () => void;
}

export default function ContactInfoTab({ onNext }: ContactInfoTabProps) {
  const [formData, setFormData] = useState({
    phone: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    tiktok: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const colors = {
    darkBlue: "#1A3263",
    mediumBlue: "#547792",
    gold: "#FAB95B",
    cream: "#E8E2DB",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "رقم الهاتف يجب أن يكون 10 أرقام على الأقل";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "رقم واتساب مطلوب";
    } else if (!/^\d{10,}$/.test(formData.whatsapp.replace(/\D/g, ""))) {
      newErrors.whatsapp = "رقم واتساب يجب أن يكون 10 أرقام على الأقل";
    }

    if (formData.facebook.trim() && !formData.facebook.includes("facebook.com")) {
      newErrors.facebook = "رابط فيسبوك غير صحيح";
    }

    if (formData.instagram.trim() && !formData.instagram.includes("instagram.com")) {
      newErrors.instagram = "رابط إنستجرام غير صحيح";
    }

    if (formData.tiktok.trim() && !formData.tiktok.includes("tiktok.com")) {
      newErrors.tiktok = "رابط تيك توك غير صحيح";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      toast({
        title: "✓ تم بنجاح",
        description: "تم حفظ معلومات التواصل",
        duration: 2000,
      });

      setTimeout(() => {
        onNext?.();
      }, 500);
    }
  };

  const inputField = (
    label: string,
    name: keyof typeof formData,
    placeholder: string,
    required: boolean = false
  ) => (
    <div className="text-right">
      <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-2 text-right">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all placeholder-gray-400 text-right"
        style={{
          borderColor: errors[name] ? "#ef4444" : colors.mediumBlue,
          color: colors.darkBlue,
          direction: "rtl",
        }}
        onFocus={(e) => {
          if (!errors[name]) {
            e.target.style.borderColor = colors.gold;
          }
        }}
        onBlur={(e) => {
          e.target.style.borderColor = errors[name] ? "#ef4444" : colors.mediumBlue;
        }}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1 text-right">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="w-full" dir="rtl">
      {/* Header */}
      <div className="mb-8 text-right">
        <h2 style={{ color: colors.darkBlue }} className="text-2xl font-bold mb-2">
          معلومات التواصل
        </h2>
        <p style={{ color: colors.mediumBlue }} className="text-sm">
          أضف طرق التواصل الخاصة بمطعمك
        </p>
      </div>

      <div className="space-y-6">
        {/* Phone and WhatsApp - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:order-2">
            {inputField("رقم واتساب", "whatsapp", "مثال: 2010xxxxxx", true)}
          </div>
          <div className="md:order-1">
            {inputField("رقم الهاتف", "phone", "مثال: 2010xxxxxx", true)}
          </div>
        </div>

        {/* Facebook and Instagram - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:order-2">
            {inputField("إنستجرام", "instagram", "https://instagram.com/...", false)}
          </div>
          <div className="md:order-1">
            {inputField("فيسبوك", "facebook", "https://facebook.com/...", false)}
          </div>
        </div>

        {/* TikTok - Full Width */}
        <div className="text-right">
          {inputField("تيك توك", "tiktok", "https://tiktok.com/...", false)}
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
            💡 نصيحة: تأكد من صحة بيانات التواصل
          </p>
          <p style={{ color: colors.mediumBlue }} className="text-xs mt-2">
            سيستخدمها العملاء للتواصل معك مباشرة. الحقول المشار إليها بـ * مطلوبة
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
