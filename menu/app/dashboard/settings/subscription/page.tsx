"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Info } from "lucide-react";

export default function SubscriptionSettingsPage() {
  const plans = [
    {
      name: "الباقة المجانية",
      nameEn: "Free Plan",
      price: "مجاني",
      priceAmount: 0,
      period: "",
      description: "للتجربة والتعرف على النظام",
      color: "bg-gray-50",
      borderColor: "border-gray-200",
      buttonText: "الخطة الحالية",
      buttonVariant: "outline" as const,
      buttonDisabled: true,
      features: [
        { text: "350+ قريب شهري", included: true, info: true },
        { text: "لوحة تحكم احترافية", included: true },
        { text: "منيو محدود 5 قنوات بحد 250", included: true },
        { text: "منيو محدود", included: true },
        { text: "تجربة تجريبية محدودة (لا خدمات)", included: true },
        { text: "المخزون، منتج بحدود بسيطة", included: true },
        { text: "طاولات محدودة 5 طاولات", included: true }
      ]
    },
    {
      name: "الباقة الأساسية",
      nameEn: "Basic Plan",
      price: "٢٠٠٠٠",
      priceAmount: 20000,
      period: "ر.س / سنة",
      oldPrice: "٣٠٠٠٠",
      discount: "300+ قريب شهري",
      description: "مناسبة للمشروعات الصغيرة والمتوسطة",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      buttonText: "التواصل للاشتراك في الباقة الأساسية",
      buttonVariant: "default" as const,
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      features: [
        { text: "300+ قريب شهري", included: true, info: true },
        { text: "القنوات والمنصات مفتوحة بالكامل", included: true },
        { text: "الخدمات كاملة", included: true },
        { text: "الفروض، مشاريع فقط", included: true },
        { text: "لوحة تحكم + موقع + تطبيق جوال", included: true },
        { text: "إعدادات عامة، مناسبة الأجهزة قابلة للتعديل", included: true }
      ]
    },
    {
      name: "الباقة الاحترافية",
      nameEn: "Professional Plan",
      price: "٤٠٠٠٠",
      priceAmount: 40000,
      period: "ر.س / سنة",
      oldPrice: "٥٠٠٠٠",
      discount: "350+ قريب شهري",
      description: "تحكم احترافي ومزايا متقدمة للمكان",
      color: "bg-cyan-50",
      borderColor: "border-cyan-300",
      buttonText: "التواصل للاشتراك في الباقة الاحترافية",
      buttonVariant: "default" as const,
      buttonColor: "bg-cyan-600 hover:bg-cyan-700",
      recommended: true,
      features: [
        { text: "350+ قريب شهري", included: true, info: true },
        { text: "كل مزايا الباقة الأساسية", included: true },
        { text: "الطاولات محدودة", included: true },
        { text: "المخزون، تكامل", included: true },
        { text: "الطاولات، حد من 30 طاولة", included: true },
        { text: "الحجوزات حتى 100 حجز", included: true }
      ]
    },
    {
      name: "الباقة المتقدمة",
      nameEn: "Advanced Plan",
      price: "٦٠٠٠٠",
      priceAmount: 60000,
      period: "ر.س / سنة",
      oldPrice: "٨٠٠٠٠",
      discount: "400+ قريب شهري",
      description: "أكبر مستوى من التحكم والإمكانيات",
      color: "bg-orange-50",
      borderColor: "border-orange-200",
      buttonText: "التواصل للاشتراك في الباقة المتقدمة",
      buttonVariant: "default" as const,
      buttonColor: "bg-orange-600 hover:bg-orange-700",
      badge: "الأكثر شعبية والأفضل",
      badgeColor: "bg-orange-500",
      features: [
        { text: "400+ قريب شهري", included: true, info: true },
        { text: "كل مزايا الباقة الاحترافية", included: true },
        { text: "الطاولات والحجوزات، كاملة بدون حدود", included: true },
        { text: "المخزون بالكامل", included: true },
        { text: "الحجوزات بدون حدود", included: true },
        { text: "إدارة الفروع", included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">الاشتراك</h1>
            <p className="text-slate-600">
              اختر الخطة التي تناسب احتياجاتك واستمتع بالمزيد من المزايا
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">test</Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            تجربة 7 أيام
          </Button>
          <Button variant="outline" size="sm">
            الخطة الحالية: الخطة المجانية
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            مشترك؟ 0 يوم
          </Button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`${plan.color} ${plan.borderColor} border-2 relative overflow-hidden`}
          >
            {plan.badge && (
              <div className={`absolute top-0 right-0 ${plan.badgeColor} text-white text-xs px-3 py-1 rounded-bl-lg`}>
                {plan.badge}
              </div>
            )}
            {plan.recommended && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-600">الأكثر شعبية والأفضل</Badge>
              </div>
            )}
            
            <CardHeader className="pb-4">
              <div className="space-y-2">
                {plan.discount && (
                  <Badge variant="secondary" className="mb-2">
                    {plan.discount}
                  </Badge>
                )}
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-slate-600">{plan.period}</span>}
                </div>
                {plan.oldPrice && (
                  <div className="text-slate-400 line-through text-sm">{plan.oldPrice}</div>
                )}
              </div>

              {/* CTA Button */}
              <Button 
                variant={plan.buttonVariant}
                className={`w-full ${plan.buttonColor || ''}`}
                disabled={plan.buttonDisabled}
              >
                {plan.buttonText}
              </Button>

              {/* Features */}
              <div className="space-y-3 pt-4 border-t">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm flex-1">{feature.text}</span>
                    {feature.info && (
                      <Info className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for Monthly/Yearly */}
      <div className="mt-8 flex justify-center gap-2">
        <Button variant="outline" size="sm">شهري</Button>
        <Button variant="outline" size="sm">سنوي</Button>
      </div>
    </div>
  );
}
