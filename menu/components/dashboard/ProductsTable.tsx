"use client";

import { useState } from "react";
import { Plus, Search, Settings2, RotateCcw, ChevronDown, Edit2, Trash2, Eye, Image as ImageIcon } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  nameAr: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  price: number;
  category: string;
  status: "active" | "inactive";
  image?: string;
  order: number;
}

interface ProductsTableProps {
  products: Product[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  isLoading?: boolean;
}

export function ProductsTable({
  products,
  onAdd,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}: ProductsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.nameEn && product.nameEn.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={onAdd}
          className="gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4" />
          إضافة منتج
        </Button>

        <div className="relative flex-1 min-w-64">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="بحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-10 bg-white border-slate-200"
          />
        </div>

        <Button variant="outline" size="icon" className="border-slate-200">
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" className="border-slate-200">
          <Settings2 className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 border-slate-200">
              الكل (المنيو العام)
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>الكل (المنيو العام)</DropdownMenuItem>
            <DropdownMenuItem>المنيو الإلكتروني</DropdownMenuItem>
            <DropdownMenuItem>المنيو الخاص</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-slate-800">قائمة المنتجات</CardTitle>
            <button className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1">
              <span>اختر الصفوف لإعادة الترتيب</span>
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredProducts.length === 0 ? (
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-base font-semibold text-slate-700 mb-1">لا توجد منتجات</p>
              <p className="text-sm text-slate-500 mb-6">ابدأ بإضافة منتج جديد لمنيوك</p>
              <Button
                onClick={onAdd}
                className="gap-2 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="h-4 w-4" />
                إضافة أول منتج
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 bg-slate-50/50 hover:bg-slate-50/50">
                    <TableHead className="text-right text-slate-600 font-semibold">المنتج</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">الفئة</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">السعر</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">الحالة</TableHead>
                    <TableHead className="text-right text-slate-600 font-semibold">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow
                      key={product.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <TableCell className="font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
                            {product.image ? (
                              <img src={product.image} alt={product.nameAr} className="h-full w-full object-cover" />
                            ) : (
                              <ImageIcon className="h-6 w-6 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <div>{product.nameAr}</div>
                            {product.nameEn && (
                              <div className="text-xs text-slate-500">{product.nameEn}</div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{product.category}</TableCell>
                      <TableCell className="text-slate-900 font-semibold">{product.price} ر.س</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.status === "active" ? "default" : "secondary"}
                          className={
                            product.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-700"
                          }
                        >
                          {product.status === "active" ? "متاح" : "غير متاح"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onView(product.id)}
                            className="h-8 w-8 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(product.id)}
                            className="h-8 w-8 hover:bg-amber-50"
                          >
                            <Edit2 className="h-4 w-4 text-amber-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(product.id)}
                            className="h-8 w-8 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
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
