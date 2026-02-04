"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight, Info } from "lucide-react";

export default function WalletSettingsPage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const packages = [
    {
      sp: 120,
      price: 60,
      image: "/credits-120.png",
      popular: false
    },
    {
      sp: 270,
      price: 120,
      image: "/credits-270.png",
      popular: false
    },
    {
      sp: 610,
      price: 240,
      image: "/credits-610.png",
      popular: true,
      badge: "الأكثر شعبية"
    },
    {
      sp: 1450,
      price: 600,
      image: "/credits-1450.png",
      popular: false
    },
    {
      sp: 3400,
      price: 1400,
      oldPrice: 1600,
      image: "/credits-3400.png",
      popular: false
    },
    {
      sp: 7800,
      price: 2400,
      oldPrice: 6900,
      image: "/credits-7800.png",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">محفظة الكريدت</h1>
            <p className="text-slate-600">
              اشحن رصيد الكريدت لشراء القوالب المميزة والتأثيرات الخاصة بالمناسبات
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <ShoppingCart className="ml-2 h-4 w-4" />
              العودة لواجهة المتجر
            </Button>
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
              <Badge variant="secondary" className="bg-orange-500 text-white">
                رصيد
              </Badge>
              <span className="text-2xl font-bold text-blue-600">350 SP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <Card className="mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-0 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
          }} />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-2">SNAPE X CREDITS</div>
              <h2 className="text-3xl font-bold mb-4">محفظة كريدت X SNAPE</h2>
              <p className="text-gray-300 mb-6 max-w-2xl">
                اشحن رصيد الكريدت، واشتري القوالب المميزة والتأثيرات المناسبات والمزايا المتقدمة لمكانك.
              </p>
              <div className="flex gap-3">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  عرض السلة (0)
                </Button>
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                  اشترك الآن
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-sm text-gray-300">الرصيد الحالي</span>
              <Badge className="bg-orange-500 text-white text-lg px-3 py-1">
                350 SP
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Packages Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6">اختر الباقة المناسبة لك</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {packages.map((pkg, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all hover:shadow-xl cursor-pointer ${
                pkg.popular ? 'ring-2 ring-orange-500' : ''
              } ${selectedPackage === index ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedPackage(index)}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg z-10">
                  {pkg.badge}
                </div>
              )}
              
              <CardContent className="p-4">
                {/* SP Amount */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-white mb-1">
                    {pkg.sp} SP
                  </div>
                  {pkg.oldPrice && (
                    <div className="text-xs text-gray-400 line-through">
                      {pkg.oldPrice} SP
                    </div>
                  )}
                </div>

                {/* Credits Image */}
                <div className="relative h-32 mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg" />
                  <div className="relative">
                    {/* Simulated credit coins stack */}
                    <div className="w-24 h-24 relative">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-80"
                          style={{
                            transform: `translate(${i * 8}px, ${i * -4}px)`,
                            width: `${100 - i * 10}%`,
                            height: `${100 - i * 10}%`,
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                            {i === 0 && 'S'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {pkg.price} ج.م
                  </div>
                  {pkg.oldPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      مقابل {pkg.oldPrice}
                    </div>
                  )}
                </div>

                {/* Buy Button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  شراء الآن
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            سجل المعاملات
          </CardTitle>
          <CardDescription>آخر العمليات على المحفظة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">شحن رصيد</p>
                  <p className="text-sm text-gray-500">2024-01-15 - 14:30</p>
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-green-600 text-lg">+500 SP</p>
                <p className="text-sm text-gray-500">240 ج.م</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <ArrowDownRight className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">شراء قالب مميز</p>
                  <p className="text-sm text-gray-500">2024-01-14 - 10:15</p>
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-red-600 text-lg">-150 SP</p>
                <p className="text-sm text-gray-500">قالب رمضان 2024</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">شحن رصيد</p>
                  <p className="text-sm text-gray-500">2024-01-10 - 16:45</p>
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-green-600 text-lg">+270 SP</p>
                <p className="text-sm text-gray-500">120 ج.م</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">معلومات هامة:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>الكريدت لا ينتهي صلاحيته ويمكن استخدامه في أي وقت</li>
                <li>يمكنك استخدام الكريدت لشراء القوالب والتأثيرات الخاصة</li>
                <li>العروض الخاصة متاحة لفترة محدودة</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
