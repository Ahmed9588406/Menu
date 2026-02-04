"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, CreditCard, Bell, Users, Receipt, ShieldCheck, History, Wallet, LayoutGrid } from "lucide-react";

const settingsCategories = [
  {
    title: "إدارة الفروع",
    description: "إضافة/تعديل الفروع وصلاحياتها ومتطلبات التوصيل",
    icon: LayoutGrid,
    href: "/dashboard/settings/branches",
    color: "text-blue-600"
  },
  {
    title: "الاشتراك",
    description: "إدارة الباقات والترقية",
    icon: CreditCard,
    href: "/dashboard/settings/subscription",
    color: "text-green-600"
  },
  {
    title: "الإعدادات العامة",
    description: "إدارة إعدادات النظام والتخصيصات",
    icon: Settings,
    href: "/dashboard/settings/general",
    color: "text-purple-600"
  },
  {
    title: "رصيد الكوبونات",
    description: "شحن الرصيد واستخدامه لشراء الكوبونات والعروض",
    icon: Wallet,
    href: "/dashboard/settings/wallet",
    color: "text-orange-600"
  },
  {
    title: "الأجهزة (POS)",
    description: "ربط طابعات POS لكل فرع وتوزيع الإيصالات",
    icon: Receipt,
    href: "/dashboard/settings/pos",
    color: "text-indigo-600"
  },
  {
    title: "إعدادات الفاتورة",
    description: "ضبط ضريبة القيمة المضافة ونموذج الفاتورة (POS)",
    icon: Receipt,
    href: "/dashboard/settings/invoice",
    color: "text-cyan-600"
  },
  {
    title: "الأدوار والصلاحيات",
    description: "تنظيم الصلاحيات لكل دور للتحكم الأمثل في الحسابات",
    icon: ShieldCheck,
    href: "/dashboard/settings/roles",
    color: "text-red-600"
  },
  {
    title: "إدارة الحسابات",
    description: "عرض الحسابات وإنشاء حسابات جديدة وتحديد الأدوار والفروع",
    icon: Users,
    href: "/dashboard/settings/accounts",
    color: "text-pink-600"
  },
  {
    title: "سجل الأنشطة",
    description: "سجل الأحداث حسب الفرع والتاريخ والمستخدمين",
    icon: History,
    href: "/dashboard/settings/activity",
    color: "text-yellow-600"
  },
  {
    title: "طرق الدفع",
    description: "إدارة وإضافة طرق الدفع وترتيبها",
    icon: Wallet,
    href: "/dashboard/settings/payment",
    color: "text-teal-600"
  }
];

export default function SettingsPage() {
  return (
    <div className="p-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">الإعدادات</h1>
        <p className="text-slate-600">تحكم بجميع إعدادات نظام إدارة المطعم من مكان واحد</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.href} href={category.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-slate-100 ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
