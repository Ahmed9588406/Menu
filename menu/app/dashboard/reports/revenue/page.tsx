"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TrendingUp,
  Calendar as CalendarIcon,
  FileDown,
  FileSpreadsheet,
  ShoppingBag,
} from "lucide-react";

export default function RevenuePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState("all");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("revenue");

  const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Sample data - replace with actual data
  const revenueData = {
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  };

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">تقرير الإيرادات</h1>
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

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">اليوم</SelectItem>
              <SelectItem value="yesterday">أمس</SelectItem>
              <SelectItem value="week">هذا الأسبوع</SelectItem>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="year">هذا العام</SelectItem>
              <SelectItem value="custom">فترة مخصصة</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="كل الفروع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الفروع</SelectItem>
              <SelectItem value="main">الفرع الرئيسي</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {startDate ? formatDate(startDate) : <span>الفترة</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={selectedPayment} onValueChange={setSelectedPayment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="طريقة الدفع (اختياري)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل طرق الدفع</SelectItem>
              <SelectItem value="cash">نقدي</SelectItem>
              <SelectItem value="card">بطاقة</SelectItem>
              <SelectItem value="online">أونلاين</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Revenue Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">إيراد اليوم</span>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">0.00 ج.م</span>
          </div>
          <Badge variant="secondary" className="mt-2">
            AOV: 0.00 ج.م
          </Badge>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">إيراد الأسبوع</span>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">0.00 ج.م</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">إيراد الشهر</span>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">0.00 ج.م</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">إيراد السنة</span>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">0.00 ج.م</span>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Side - Best Days Table */}
        <Card className="col-span-1">
          <div className="p-4 border-b">
            <h3 className="font-semibold">أفضل الأيام (الأسبوع)</h3>
          </div>
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اليوم</TableHead>
                  <TableHead className="text-right">الإيراد</TableHead>
                  <TableHead className="text-right">الطلبات</TableHead>
                  <TableHead className="text-right">AOV</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-500 py-8">
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

        {/* Right Side - Chart Area */}
        <Card className="col-span-2">
          <div className="p-4 border-b">
            <h3 className="font-semibold">نمط إيراد الفترة</h3>
          </div>
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="revenue">اليوم</TabsTrigger>
                <TabsTrigger value="week">الأسبوع</TabsTrigger>
                <TabsTrigger value="month">الشهر</TabsTrigger>
                <TabsTrigger value="year">السنة</TabsTrigger>
              </TabsList>

              <TabsContent value="revenue" className="h-64">
                <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-slate-400">الرسم البياني سيظهر هنا</p>
                </div>
              </TabsContent>

              <TabsContent value="week" className="h-64">
                <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-slate-400">الرسم البياني سيظهر هنا</p>
                </div>
              </TabsContent>

              <TabsContent value="month" className="h-64">
                <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-slate-400">الرسم البياني سيظهر هنا</p>
                </div>
              </TabsContent>

              <TabsContent value="year" className="h-64">
                <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-slate-400">الرسم البياني سيظهر هنا</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>

      {/* Best Products Section */}
      <Card className="mt-6">
        <div className="p-4 border-b">
          <h3 className="font-semibold">أفضل المنتجات</h3>
        </div>
        <div className="p-4">
          <Tabs defaultValue="revenue">
            <TabsList className="mb-4">
              <TabsTrigger value="revenue">حسب الإيراد</TabsTrigger>
              <TabsTrigger value="orders">حسب الطلبات</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الترتيب</TableHead>
                    <TableHead className="text-right">المنتج</TableHead>
                    <TableHead className="text-right">الإيراد</TableHead>
                    <TableHead className="text-right">الطلبات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                      <div className="flex flex-col items-center gap-2">
                        <ShoppingBag className="h-8 w-8 text-slate-300" />
                        <span>لا توجد بيانات</span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="orders">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الترتيب</TableHead>
                    <TableHead className="text-right">المنتج</TableHead>
                    <TableHead className="text-right">الإيراد</TableHead>
                    <TableHead className="text-right">الطلبات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                      <div className="flex flex-col items-center gap-2">
                        <ShoppingBag className="h-8 w-8 text-slate-300" />
                        <span>لا توجد بيانات</span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
