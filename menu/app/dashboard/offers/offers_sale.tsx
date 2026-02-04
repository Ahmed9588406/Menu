"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Calendar, ChevronDown, FileText } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  usageCount: number;
  totalDiscount: number;
  usageLimit: number;
  validFrom: string;
  validTo: string;
  status: "active" | "inactive";
}

export function OffersCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          إضافة كوبون
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="بحث بالكود"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 bg-white"
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الحالة</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              من البداية
            </Button>

            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              من النهاية
            </Button>

            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              عرض التحليلات
            </Button>

            <Select defaultValue="newest">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث أولاً</SelectItem>
                <SelectItem value="oldest">الأقدم أولاً</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              تحديث الأرقام
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-white">
          <CardTitle className="text-lg font-bold text-slate-800">إدارة الكوبونات</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {coupons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-4 h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                <svg
                  className="h-10 w-10 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <p className="text-base font-semibold text-slate-700 mb-1">لا توجد بيانات</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 bg-slate-50/50 hover:bg-slate-50/50">
                    <TableHead className="text-right text-slate-600 font-semibold">الكود</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">نوع الخصم</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">قيمة الخصم</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">نشط</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">الفئة</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">استثناء المنتجات المخفضة</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">حصة صاحب الكوبون</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">إجمالي الخصم</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">حصة صاحب الكوبون</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">ربح المكان التقديري</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">الاستخدامات</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow
                      key={coupon.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50"
                    >
                      <TableCell className="font-medium">{coupon.code}</TableCell>
                      <TableCell>{coupon.discountType === "percentage" ? "نسبة مئوية" : "مبلغ ثابت"}</TableCell>
                      <TableCell>{coupon.discountValue}</TableCell>
                      <TableCell>{coupon.status === "active" ? "نشط" : "غير نشط"}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{coupon.totalDiscount}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{coupon.usageCount}/{coupon.usageLimit}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">تعديل</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">حذف</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
