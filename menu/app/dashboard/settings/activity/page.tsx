"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, UserCircle, Clock } from "lucide-react";

export default function ActivitySettingsPage() {
  return (
    <div className="p-8" dir="rtl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">سجل الأنشطة</h1>
        <p className="text-slate-600">سجل الأحداث حسب الفرع والتاريخ والمستخدمين</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            آخر الأنشطة
          </CardTitle>
          <CardDescription>سجل العمليات الأخيرة في النظام</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <UserCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">تم إضافة منتج جديد</p>
                <p className="text-sm text-slate-500">أحمد محمد - الفرع الرئيسي</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-500">منذ 5 دقائق</span>
                </div>
              </div>
              <Badge variant="secondary">منتجات</Badge>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <UserCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">تم إتمام طلب جديد</p>
                <p className="text-sm text-slate-500">سعد العتيبي - الفرع الرئيسي</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-500">منذ 15 دقيقة</span>
                </div>
              </div>
              <Badge variant="secondary">طلبات</Badge>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-yellow-100 rounded-full">
                <UserCircle className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">تم تعديل إعدادات الفاتورة</p>
                <p className="text-sm text-slate-500">أحمد محمد - الإعدادات</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-500">منذ ساعة</span>
                </div>
              </div>
              <Badge variant="secondary">إعدادات</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
