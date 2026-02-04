"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileDown, FileSpreadsheet, ShoppingBag } from "lucide-react";

export default function SummaryPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  return (
    <div className="p-8" dir="rtl">
      {/* Top Filter Bar */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              اليوم
            </Button>
            <Button variant="ghost" size="sm">
              الأسبوع
            </Button>
            <Button variant="ghost" size="sm">
              الشهر
            </Button>
            <Button variant="ghost" size="sm">
              السنة
            </Button>
            <Button variant="ghost" size="sm">
              مخصص
            </Button>

            <div className="h-6 w-px bg-slate-200 mx-2" />

            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="الفرع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الفروع</SelectItem>
                <SelectItem value="main">الفرع الرئيسي</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="نوع الطلب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="dine-in">داخلي</SelectItem>
                <SelectItem value="takeaway">خارجي</SelectItem>
                <SelectItem value="delivery">توصيل</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              تحديث
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              تقرير Excel
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <FileDown className="h-4 w-4" />
              تقرير PDF
            </Button>
          </div>
        </div>
      </Card>

      {/* Statistics Cards - Row 1 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">COGS (تقدير)</p>
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
          <p className="text-sm text-slate-600 mb-2">فروق درج الكاش</p>
          <p className="text-3xl font-bold">10,000.00 ج.م</p>
        </Card>
      </div>

      {/* Statistics Cards - Row 2 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">إجمالي الطلبات</p>
          <p className="text-3xl font-bold">0</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">المسلم</p>
          <p className="text-3xl font-bold">0</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">الملغي</p>
          <p className="text-3xl font-bold">0</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">متوسط قيمة الطلب</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>
      </div>

      {/* Statistics Cards - Row 3 */}
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
          <p className="text-sm text-slate-600 mb-2">الصافي</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">إجمالي الخدمات</p>
          <p className="text-3xl font-bold">0</p>
        </Card>
      </div>

      {/* Statistics Cards - Row 4 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
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

      {/* By Day Table */}
      <Card className="mb-6">
        <div className="p-4 border-b">
          <h3 className="font-semibold">حسب اليوم</h3>
        </div>
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">الطلبات</TableHead>
                <TableHead className="text-right">المسلم</TableHead>
                <TableHead className="text-right">الملغي</TableHead>
                <TableHead className="text-right">العناصر</TableHead>
                <TableHead className="text-right">الإجمالي</TableHead>
                <TableHead className="text-right">الصافي</TableHead>
                <TableHead className="text-right">COGS فعلي</TableHead>
                <TableHead className="text-right">متوسط</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={9} className="text-center text-slate-500 py-8">
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left - Most Ordered Dishes */}
        <Card>
          <div className="p-4 border-b">
            <h3 className="font-semibold">الأطباق الأكثر طلباً</h3>
          </div>
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المنتج</TableHead>
                  <TableHead className="text-right">عدد</TableHead>
                  <TableHead className="text-right">الإيراد</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-slate-500 py-8">
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

        {/* Right - Best Employees */}
        <Card>
          <div className="p-4 border-b">
            <h3 className="font-semibold">أفضل العملاء</h3>
          </div>
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">العميل</TableHead>
                  <TableHead className="text-right">الطلبات</TableHead>
                  <TableHead className="text-right">الإيراد</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-slate-500 py-8">
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
      </div>
    </div>
  );
}
