"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SettingsTabProps {
  onNext?: () => void;
}

interface ServiceOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function SettingsTab({ onNext }: SettingsTabProps) {
  const [services, setServices] = useState<ServiceOption[]>([
    {
      id: "table-service",
      label: "طاولة بالمحل",
      description: "خدمة الطاولات داخل المطعم",
      enabled: false,
    },
    {
      id: "delivery",
      label: "ديليفري",
      description: "خدمة التوصيل للمنازل",
      enabled: false,
    },
    {
      id: "takeaway",
      label: "تيك أواي",
      description: "الطلب والاستلام من المطعم",
      enabled: false,
    },
    {
      id: "drive-thru",
      label: "درايف ثرو",
      description: "خدمة السيارات",
      enabled: false,
    },
    {
      id: "reservations",
      label: "حجوزات",
      description: "حجز الطاولات مسبقاً",
      enabled: false,
    },
    {
      id: "catering",
      label: "إدارة الطلبات",
      description: "إدارة وتتبع الطلبات",
      enabled: false,
    },
  ]);

  const { toast } = useToast();

  const colors = {
    darkBlue: "#1A3263",
    mediumBlue: "#547792",
    gold: "#FAB95B",
    cream: "#E8E2DB",
  };

  const handleToggle = (id: string) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, enabled: !service.enabled } : service
      )
    );
  };

  const handleSubmit = () => {
    const enabledServices = services.filter((s) => s.enabled);
    
    toast({
      title: "✓ تم بنجاح",
      description: `تم تفعيل ${enabledServices.length} خدمة`,
      duration: 2000,
    });

    setTimeout(() => {
      onNext?.();
    }, 500);
  };

  return (
    <div className="w-full" dir="rtl">
      {/* Header */}
      <div className="mb-8 text-right">
        <h2 style={{ color: colors.darkBlue }} className="text-2xl font-bold mb-2">
          الإعدادات
        </h2>
        <p style={{ color: colors.mediumBlue }} className="text-sm">
          فعّل الخدمات والإعدادات التي تناسب مطعمك
        </p>
      </div>

      <div className="space-y-6">
        {/* Services List */}
        <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-4 rounded-lg transition-all hover:bg-gray-50"
              style={{
                backgroundColor: service.enabled ? colors.cream + "40" : "transparent",
              }}
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggle(service.id)}
                  className="relative w-14 h-8 rounded-full transition-all flex-shrink-0"
                  style={{
                    backgroundColor: service.enabled ? colors.gold : "#d1d5db",
                  }}
                >
                  <div
                    className="absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md"
                    style={{
                      left: service.enabled ? "4px" : "28px",
                    }}
                  />
                </button>

                {/* Service Info */}
                <div className="text-right flex-1">
                  <p
                    style={{ color: colors.darkBlue }}
                    className="font-semibold text-base"
                  >
                    {service.label}
                  </p>
                  <p
                    style={{ color: colors.mediumBlue }}
                    className="text-xs mt-1"
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div
          className="p-4 rounded-lg border-2 text-right"
          style={{
            backgroundColor: colors.gold + "10",
            borderColor: colors.gold,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: colors.darkBlue }} className="text-sm font-semibold">
                الخدمات المفعلة
              </p>
              <p style={{ color: colors.mediumBlue }} className="text-xs mt-1">
                يمكنك تغيير هذه الإعدادات لاحقاً
              </p>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
              style={{
                backgroundColor: colors.gold,
                color: colors.darkBlue,
              }}
            >
              {services.filter((s) => s.enabled).length}
            </div>
          </div>
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
            💡 نصيحة: فعّل الخدمات التي تقدمها فعلياً
          </p>
          <p style={{ color: colors.mediumBlue }} className="text-xs mt-2">
            يمكنك تفعيل أو إيقاف أي خدمة في أي وقت من لوحة التحكم
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
