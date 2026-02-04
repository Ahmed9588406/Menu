"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Check, Crown } from "lucide-react";

export default function RolesSettingsPage() {
  const features = [
    "دعم تخصيصات متقدمة",
    "تقارير ومقاييسات مفصلة",
    "إدارة المستخدمين والأدوار",
    "أداة لمزج وخيارات إضافية"
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Main Upgrade Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
          <CardContent className="p-8">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">
                  احصل على وصول كامل عبر ترقية خطتك!
                </h2>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-white">
                    الخطة الحالية: الخطة المجانية
                  </Badge>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-700 mb-6 text-center max-w-3xl mx-auto">
              تحتاج إلى ترقية الخطة الحالية للوصول إلى هذه الصفحة. تم تصميم الخطط الأعلى لتوفر أدوات متقدمة لإدارة احتياجات عملك وتدعم التوسع.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm"
                >
                  <div className="p-1 bg-green-100 rounded-full flex-shrink-0">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-slate-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white hover:bg-gray-50"
              >
                جدولة التسعير
              </Button>
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              >
                <Crown className="ml-2 h-5 w-5" />
                ترقية الخطة التجارية
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
