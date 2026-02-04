"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  FileDown,
  FileSpreadsheet,
  Calendar as CalendarIcon,
  Search,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function OrdersReportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [topFilter, setTopFilter] = useState("20");

  const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Sample data
  const shifts = [
    {
      date: "2026-02-03",
      day: "Tuesday",
      status: "مفتوح",
      startTime: "17:14",
      endTime: "—",
      startAmount: "10000 ج.م",
      endAmount: "— إغلاق الدرج —",
    },
    {
      date: "2026-02-02",
      day: "Monday",
      status: "مغلق",
      startTime: "17:10",
      endTime: "22:07",
      startAmount: "20000 ج.م",
      endAmount: "10000 ج.م",
    },
  ];

  return (
    <div className="p-8" dir="rtl">
      {/* Header with Filters */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
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

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="h-4 w-4 ml-2" />
                  تاريخ
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

            <Input placeholder="tt" className="w-24" />

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

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              تحديث
            </Button>
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

        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="بحث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
      </Card>

      {/* Shifts Section */}
      <Card className="mb-6">
        <div className="p-4 border-b">
          <h3 className="font-semibold">شفتات (آخر 14 يوماً)</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {shifts.map((shift, index) => (
              <Card key={index} className="p-4 border-2">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold">{shift.date}</span>
                      <Badge
                        variant={shift.status === "مفتوح" ? "default" : "secondary"}
                        className={
                          shift.status === "مفتوح"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }
                      >
                        {shift.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-slate-600">{shift.day}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">بداية:</span>
                    <span>{shift.startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">نهاية:</span>
                    <span>{shift.endTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">رصيد البدء:</span>
                    <span>{shift.startAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">إغلاق الدرج:</span>
                    <span>{shift.endAmount}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">إجمالي الطلبات</p>
          <p className="text-3xl font-bold">0</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">المنتهية</p>
          <p className="text-3xl font-bold">0</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">الملغاة</p>
          <p className="text-3xl font-bold">0</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">الصافي</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">إجمالي المبيعة</p>
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

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">إجمالي الطاولات</p>
          <p className="text-3xl font-bold">0</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">المبردات</p>
          <p className="text-3xl font-bold">0</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">الملغاة</p>
          <p className="text-3xl font-bold">0</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-600 mb-2">الماضي</p>
          <p className="text-3xl font-bold">0.00 ج.م</p>
        </Card>
      </div>

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

      {/* Most Used Tables Section */}
      <Card className="mb-6">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">الطاولات الأكثر استخداماً</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              تحديث
            </Button>
            <Select value={topFilter} onValueChange={setTopFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Top 10</SelectItem>
                <SelectItem value="20">Top 20</SelectItem>
                <SelectItem value="50">Top 50</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm">
              متناظمة + مدينة
            </Button>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="المنطقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="المدينة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم</TableHead>
                <TableHead className="text-right">الوقت</TableHead>
                <TableHead className="text-right">الفرع</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجمالي</TableHead>
                <TableHead className="text-right">الخصم</TableHead>
                <TableHead className="text-right">الربح (صافي)</TableHead>
                <TableHead className="text-right">الانتظار (د)</TableHead>
                <TableHead className="text-right">العناصر</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={10} className="text-center text-slate-500 py-8">
                  <div className="flex flex-col items-center gap-2">
                    <ShoppingBag className="h-8 w-8 text-slate-300" />
                    <span>لا توجد بيانات</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-600">
              الإجماليات: 0.00 ج.م | 0.00 ج.م | 0.00 ج.م
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Top Delivery Regions */}
      <Card>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">مناطق التوصيل الأعلى</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              تحديث
            </Button>
            <Select value={topFilter} onValueChange={setTopFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Top 10</SelectItem>
                <SelectItem value="20">Top 20</SelectItem>
                <SelectItem value="50">Top 50</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm">
              متناظمة + مدينة
            </Button>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="المنطقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="المدينة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="p-4">
          <div className="text-center text-slate-500 py-8">
            <ShoppingBag className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <span>لا توجد بيانات</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
