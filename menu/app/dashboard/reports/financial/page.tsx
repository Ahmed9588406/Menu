"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileDown, FileSpreadsheet, ShoppingBag } from "lucide-react";

export default function FinancialPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("today");

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">المالية</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <FileDown className="h-4 w-4" />
            تقرير PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            تقرير Excel
          </Button>
        </div>
      </div>

      {/* Period Tabs */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === "today" ? "default" : "ghost"}
            onClick={() => setActiveTab("today")}
            size="sm"
          >
            اليوم
          </Button>
          <Button
            variant={activeTab === "week" ? "default" : "ghost"}
            onClick={() => setActiveTab("week")}
            size="sm"
          >
            الأسبوع
          </Button>
          <Button
            variant={activeTab === "month" ? "default" : "ghost"}
            onClick={() => setActiveTab("month")}
            size="sm"
          >
            الشهر
          </Button>
          <Button
            variant={activeTab === "year" ? "default" : "ghost"}
            onClick={() => setActiveTab("year")}
            size="sm"
          >
            السنة
          </Button>
          <Button
            variant={activeTab === "custom" ? "default" : "ghost"}
            onClick={() => setActiveTab("custom")}
            size="sm"
          >
            مخصص
          </Button>
          <Input placeholder="tt" className="w-24 mr-auto" />
        </div>
      </Card>

      {/* Statistics Cards - Row 1 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">إيراد إجمالي</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">الخصومات</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">صافي الإيراد</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">COGS (تقدير)</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>
      </div>

      {/* Statistics Cards - Row 2 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">COGS (مباشر)</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">المشتريات</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">الهالك</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">الفرق (مباشر-تقدير)</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>
      </div>

      {/* Statistics Cards - Row 3 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">إجمالي الخدمة</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">إجمالي بدون الخدمة</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">إجمالي التوصيل</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>
      </div>

      {/* Reservations and Gross Profit */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">الحجوزات</p>
          <p className="text-2xl font-bold mb-2">إجمالي 0 = ملغي 0 + %0</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">فروق درج الكاش</p>
          <p className="text-3xl font-bold">10,000.00 ج.م</p>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left - By Day */}
        <Card>
          <div className="p-4 border-b">
            <h3 className="font-semibold">حسب اليوم</h3>
          </div>
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">الإيراد</TableHead>
                  <TableHead className="text-right">الصافي</TableHead>
                  <TableHead className="text-right">COGS (تقدير)</TableHead>
                  <TableHead className="text-right">COGS (فعلي)</TableHead>
                  <TableHead className="text-right">الفرق</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingBag className="h-8 w-8 text-slate-300" />
                      <span>لا توجد بيانات</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Right - By Product */}
        <Card>
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold">حسب المنتج</h3>
            <Input
              placeholder="ابحث عن منتج"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48"
            />
          </div>
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المنتج</TableHead>
                  <TableHead className="text-right">الإيراد</TableHead>
                  <TableHead className="text-right">الخصم</TableHead>
                  <TableHead className="text-right">الصافي</TableHead>
                  <TableHead className="text-right">تكلفة (تقدير)</TableHead>
                  <TableHead className="text-right">% COGS</TableHead>
                  <TableHead className="text-right">الربح</TableHead>
                  <TableHead className="text-right">الهامش %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-slate-500 py-8">
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingBag className="h-8 w-8 text-slate-300" />
                      <span>لا توجد بيانات</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Totals Row */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">الإجمالي</span>
                <div className="flex gap-8">
                  <span>0.00 ج.م</span>
                  <span>0.00 ج.م</span>
                  <span>0.00 ج.م</span>
                  <span>0.00 ج.م</span>
                  <span>0%</span>
                  <span>0.00 ج.م</span>
                  <span>0%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Purchase Indicators */}
      <Card className="mt-6">
        <div className="p-4 border-b">
          <h3 className="font-semibold">مؤشرات اشتباه</h3>
        </div>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700">
              فروق درج كاش سلبية، مطابقة بالإيراد!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
