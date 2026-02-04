"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddIngredientDialog } from "@/components/dashboard/inventory/AddIngredientDialog";
import {
  Package,
  AlertTriangle,
  AlertCircle,
  DollarSign,
  Search,
  Plus,
} from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  costPerUnit: number;
  branch: string;
  lastUpdated: Date;
}

export default function InventoryPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleAddIngredient = (ingredient: Omit<Ingredient, "id" | "lastUpdated">) => {
    const newIngredient: Ingredient = {
      ...ingredient,
      id: Date.now().toString(),
      lastUpdated: new Date(),
    };
    setIngredients([...ingredients, newIngredient]);
    setShowAddDialog(false);
  };

  // Calculate statistics
  const totalComponents = ingredients.length;
  const nearExpiry = ingredients.filter(
    (i) => i.quantity <= i.minQuantity && i.quantity > 0
  ).length;
  const outOfStock = ingredients.filter((i) => i.quantity === 0).length;
  const totalValue = ingredients.reduce(
    (sum, i) => sum + i.quantity * i.costPerUnit,
    0
  );

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8" />
          <h1 className="text-3xl font-bold">إدارة المخزون الذكية</h1>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة مكون جديد
        </Button>
      </div>

      <p className="text-slate-600 mb-6">
        نظام متكامل لإدارة المشتريات والمواد الخام
      </p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">إجمالي المكونات</p>
              <p className="text-2xl font-bold">{totalComponents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">مواد قرب النفاذ</p>
              <p className="text-2xl font-bold">{nearExpiry} / 0</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">مواد نفذت</p>
              <p className="text-2xl font-bold">{outOfStock} / 0</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">قيمة المخزون الإجمالية</p>
              <p className="text-2xl font-bold">
                {totalValue.toFixed(2)}{" "}
                <span className="text-sm text-green-600">جنيه</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            tt
          </Button>
          <Button variant="ghost" size="sm">
            جدول
          </Button>
          <Button variant="ghost" size="sm">
            بطاقات
          </Button>

          <div className="h-6 w-px bg-slate-200 mx-2" />

          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>
      </Card>

      {/* Empty State or Table */}
      {ingredients.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">لا يوجد مواد في المخزون</h3>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="p-4 border-b">
            <h3 className="font-semibold">آخر الحركات المسجلة</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">المكون</TableHead>
                <TableHead className="text-right">الفرع</TableHead>
                <TableHead className="text-right">الكمية</TableHead>
                <TableHead className="text-right">ملاحظة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients
                .filter((ingredient) =>
                  ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((ingredient) => (
                  <TableRow key={ingredient.id}>
                    <TableCell>
                      <Badge variant="secondary">مكون</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{ingredient.name}</TableCell>
                    <TableCell>{ingredient.branch}</TableCell>
                    <TableCell>
                      {ingredient.quantity} {ingredient.unit}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      {ingredient.lastUpdated.toLocaleDateString("ar-SA")}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <AddIngredientDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddIngredient}
      />
    </div>
  );
}
