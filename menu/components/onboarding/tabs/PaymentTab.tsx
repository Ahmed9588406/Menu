"use client";

import { useState } from "react";
import { Plus, Trash2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";

// Dynamically import LocationPicker to avoid SSR issues
const LocationPicker = dynamic(() => import("@/components/map/LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">جاري تحميل الخريطة...</p>
    </div>
  ),
});

interface PaymentTabProps {
  onNext?: () => void;
}

interface Branch {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
  showMap: boolean;
}

export default function PaymentTab({ onNext }: PaymentTabProps) {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: "1",
      name: "",
      phone: "",
      address: "",
      latitude: "",
      longitude: "",
      showMap: false,
    },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const colors = {
    darkBlue: "#1A3263",
    mediumBlue: "#547792",
    gold: "#FAB95B",
    cream: "#E8E2DB",
  };

  const handleBranchChange = (id: string, field: keyof Branch, value: string | boolean) => {
    setBranches(
      branches.map((branch) =>
        branch.id === id ? { ...branch, [field]: value } : branch
      )
    );
    // Clear errors for this field
    if (typeof value === "string" && errors[`${id}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${id}-${field}`];
      setErrors(newErrors);
    }
  };

  const handleLocationSelect = (
    branchId: string,
    data: { address: string; latitude: number; longitude: number }
  ) => {
    setBranches(
      branches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              address: data.address,
              latitude: data.latitude.toFixed(6),
              longitude: data.longitude.toFixed(6),
            }
          : branch
      )
    );
  };

  const toggleMap = (branchId: string) => {
    setBranches(
      branches.map((branch) =>
        branch.id === branchId ? { ...branch, showMap: !branch.showMap } : branch
      )
    );
  };

  const addBranch = () => {
    const newBranch: Branch = {
      id: Date.now().toString(),
      name: "",
      phone: "",
      address: "",
      latitude: "",
      longitude: "",
      showMap: false,
    };
    setBranches([...branches, newBranch]);
  };

  const removeBranch = (id: string) => {
    if (branches.length > 1) {
      setBranches(branches.filter((branch) => branch.id !== id));
      // Clear errors for this branch
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`${id}-`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    branches.forEach((branch, index) => {
      if (!branch.name.trim()) {
        newErrors[`${branch.id}-name`] = "اسم الفرع مطلوب";
      }

      if (!branch.phone.trim()) {
        newErrors[`${branch.id}-phone`] = "رقم الهاتف مطلوب";
      } else if (!/^\d{10,}$/.test(branch.phone.replace(/\D/g, ""))) {
        newErrors[`${branch.id}-phone`] = "رقم الهاتف غير صحيح";
      }

      if (!branch.address.trim()) {
        newErrors[`${branch.id}-address`] = "العنوان مطلوب";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      toast({
        title: "✓ تم بنجاح",
        description: `تم حفظ ${branches.length} فرع`,
        duration: 2000,
      });

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
          الفروع
        </h2>
        <p style={{ color: colors.mediumBlue }} className="text-sm">
          أضف فروع المطعم أو المقهى أو أي فرع آخر
        </p>
      </div>

      <div className="space-y-6">
        {/* Branches List */}
        {branches.map((branch, index) => (
          <div
            key={branch.id}
            className="bg-white rounded-xl p-6 shadow-md border-2"
            style={{ borderColor: colors.cream }}
          >
            {/* Branch Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: colors.mediumBlue }}
                >
                  {index + 1}
                </div>
                <h3 style={{ color: colors.darkBlue }} className="font-bold text-lg">
                  الفرع {index + 1}
                </h3>
              </div>
              {branches.length > 1 && (
                <button
                  onClick={() => removeBranch(branch.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-all"
                  style={{ color: "#ef4444" }}
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>

            {/* Branch Form */}
            <div className="space-y-4">
              {/* Branch Name */}
              <div className="text-right">
                <label
                  style={{ color: colors.darkBlue }}
                  className="block text-sm font-semibold mb-2 text-right"
                >
                  اسم الفرع
                </label>
                <input
                  type="text"
                  value={branch.name}
                  onChange={(e) =>
                    handleBranchChange(branch.id, "name", e.target.value)
                  }
                  placeholder="الفرع الرئيسي"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all placeholder-gray-400 text-right"
                  style={{
                    borderColor: errors[`${branch.id}-name`]
                      ? "#ef4444"
                      : colors.mediumBlue,
                    color: colors.darkBlue,
                    direction: "rtl",
                  }}
                  onFocus={(e) => {
                    if (!errors[`${branch.id}-name`]) {
                      e.target.style.borderColor = colors.gold;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors[`${branch.id}-name`]
                      ? "#ef4444"
                      : colors.mediumBlue;
                  }}
                />
                {errors[`${branch.id}-name`] && (
                  <p className="text-red-500 text-sm mt-1 text-right">
                    {errors[`${branch.id}-name`]}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="text-right">
                <label
                  style={{ color: colors.darkBlue }}
                  className="block text-sm font-semibold mb-2 text-right"
                >
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  value={branch.phone}
                  onChange={(e) =>
                    handleBranchChange(branch.id, "phone", e.target.value)
                  }
                  placeholder="01012345678"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all placeholder-gray-400 text-right"
                  style={{
                    borderColor: errors[`${branch.id}-phone`]
                      ? "#ef4444"
                      : colors.mediumBlue,
                    color: colors.darkBlue,
                    direction: "rtl",
                  }}
                  onFocus={(e) => {
                    if (!errors[`${branch.id}-phone`]) {
                      e.target.style.borderColor = colors.gold;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors[`${branch.id}-phone`]
                      ? "#ef4444"
                      : colors.mediumBlue;
                  }}
                />
                {errors[`${branch.id}-phone`] && (
                  <p className="text-red-500 text-sm mt-1 text-right">
                    {errors[`${branch.id}-phone`]}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="text-right">
                <label
                  style={{ color: colors.darkBlue }}
                  className="block text-sm font-semibold mb-2 text-right"
                >
                  العنوان
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    size={20}
                    style={{ color: colors.mediumBlue }}
                  />
                  <input
                    type="text"
                    value={branch.address}
                    onChange={(e) =>
                      handleBranchChange(branch.id, "address", e.target.value)
                    }
                    placeholder="أدخل عنوان الفرع"
                    className="w-full px-4 py-3 pl-12 rounded-lg border-2 focus:outline-none transition-all placeholder-gray-400 text-right"
                    style={{
                      borderColor: errors[`${branch.id}-address`]
                        ? "#ef4444"
                        : colors.mediumBlue,
                      color: colors.darkBlue,
                      direction: "rtl",
                    }}
                    onFocus={(e) => {
                      if (!errors[`${branch.id}-address`]) {
                        e.target.style.borderColor = colors.gold;
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors[`${branch.id}-address`]
                        ? "#ef4444"
                        : colors.mediumBlue;
                    }}
                  />
                </div>
                {errors[`${branch.id}-address`] && (
                  <p className="text-red-500 text-sm mt-1 text-right">
                    {errors[`${branch.id}-address`]}
                  </p>
                )}

                {/* Map Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleMap(branch.id)}
                  className="mt-2 px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-md flex items-center gap-2 flex-row-reverse"
                  style={{
                    backgroundColor: branch.showMap ? colors.gold : colors.cream,
                    color: colors.darkBlue,
                  }}
                >
                  <MapPin size={18} />
                  {branch.showMap ? "إخفاء الخريطة" : "اختر من الخريطة"}
                </button>

                {/* Interactive Map */}
                {branch.showMap && (
                  <div className="mt-4">
                    <LocationPicker
                      onLocationSelect={(data) => handleLocationSelect(branch.id, data)}
                      initialLat={
                        branch.latitude ? parseFloat(branch.latitude) : 30.0444
                      }
                      initialLng={
                        branch.longitude ? parseFloat(branch.longitude) : 31.2357
                      }
                    />
                  </div>
                )}
              </div>

              {/* Coordinates Section */}
              <div className="text-right">
                <label
                  style={{ color: colors.darkBlue }}
                  className="block text-sm font-semibold mb-2 text-right"
                >
                  نطاق التوصيل
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Latitude */}
                  <div>
                    <label
                      style={{ color: colors.mediumBlue }}
                      className="block text-xs mb-1 text-right"
                    >
                      الإحداثيات
                    </label>
                    <input
                      type="text"
                      value={branch.latitude}
                      onChange={(e) =>
                        handleBranchChange(branch.id, "latitude", e.target.value)
                      }
                      placeholder="Latitude"
                      className="w-full px-3 py-2 rounded-lg border-2 focus:outline-none transition-all placeholder-gray-400 text-right text-sm"
                      style={{
                        borderColor: colors.mediumBlue,
                        color: colors.darkBlue,
                      }}
                      onFocus={(e) => (e.target.style.borderColor = colors.gold)}
                      onBlur={(e) => (e.target.style.borderColor = colors.mediumBlue)}
                    />
                  </div>

                  {/* Longitude */}
                  <div>
                    <label
                      style={{ color: colors.mediumBlue }}
                      className="block text-xs mb-1 text-right"
                    >
                      المحافظات
                    </label>
                    <input
                      type="text"
                      value={branch.longitude}
                      onChange={(e) =>
                        handleBranchChange(branch.id, "longitude", e.target.value)
                      }
                      placeholder="Longitude"
                      className="w-full px-3 py-2 rounded-lg border-2 focus:outline-none transition-all placeholder-gray-400 text-right text-sm"
                      style={{
                        borderColor: colors.mediumBlue,
                        color: colors.darkBlue,
                      }}
                      onFocus={(e) => (e.target.style.borderColor = colors.gold)}
                      onBlur={(e) => (e.target.style.borderColor = colors.mediumBlue)}
                    />
                  </div>
                </div>
                <p
                  style={{ color: colors.mediumBlue }}
                  className="text-xs mt-2 text-right"
                >
                  اختياري - لتحديد نطاق التوصيل على الخريطة
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Add Branch Button */}
        <button
          onClick={addBranch}
          className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2 flex-row-reverse"
          style={{
            backgroundColor: colors.cream,
            color: colors.darkBlue,
            border: `2px solid ${colors.mediumBlue}`,
          }}
        >
          <Plus size={20} />
          إضافة فرع جديد
        </button>

        {/* Info Box */}
        <div
          className="p-4 rounded-lg border-r-4 text-right"
          style={{
            backgroundColor: colors.gold + "15",
            borderColor: colors.gold,
          }}
        >
          <p style={{ color: colors.darkBlue }} className="text-sm font-semibold">
            💡 نصيحة: أضف جميع فروعك لتسهيل إدارتها
          </p>
          <p style={{ color: colors.mediumBlue }} className="text-xs mt-2">
            يمكنك إضافة أو تعديل الفروع لاحقاً من لوحة التحكم
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
