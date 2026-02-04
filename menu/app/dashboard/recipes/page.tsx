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
import { AddRecipeDialog } from "@/components/dashboard/recipes/AddRecipeDialog";
import {
  ChefHat,
  AlertTriangle,
  Link as LinkIcon,
  FileText,
  Search,
  Plus,
  Edit,
} from "lucide-react";

interface RecipeIngredient {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  id: string;
  name: string;
  product: string;
  ingredients: RecipeIngredient[];
  isLinked: boolean;
  lastUpdated: Date;
}

export default function RecipesPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleAddRecipe = (recipe: Omit<Recipe, "id" | "lastUpdated">) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      lastUpdated: new Date(),
    };
    setRecipes([...recipes, newRecipe]);
    setShowAddDialog(false);
  };

  // Calculate statistics
  const totalProducts = recipes.length;
  const linkedProducts = recipes.filter((r) => r.isLinked).length;
  const unlinkedProducts = recipes.filter((r) => !r.isLinked).length;
  const totalIngredients = recipes.reduce(
    (sum, r) => sum + r.ingredients.length,
    0
  );

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ChefHat className="h-8 w-8" />
            <h1 className="text-3xl font-bold">إدارة الوصفات والربط</h1>
          </div>
          <p className="text-slate-600">
            ربط المنتجات بالمكونات لتحديث التلقائي عن المبيعات
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">إجمالي المنتجات</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">منتجات مربوطة</p>
              <p className="text-2xl font-bold">
                {linkedProducts} / 0{" "}
                <LinkIcon className="inline h-4 w-4 text-green-600" />
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <LinkIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">منتجات غير مربوطة</p>
              <p className="text-2xl font-bold">{unlinkedProducts} / 0</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">مكونات في الوصفة</p>
              <p className="text-2xl font-bold">
                {totalIngredients}{" "}
                <Plus className="inline h-4 w-4 text-slate-400" />
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Side - Linked Products */}
        <Card className="col-span-1">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-green-600" />
              ملخص المنتجات المربوطة
            </h3>
          </div>
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المنتج</TableHead>
                  <TableHead className="text-right">الفئة</TableHead>
                  <TableHead className="text-right">المكونات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-slate-500 py-8">
                    لا توجد منتجات مربوطة بعد
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Right Side - Recipe Editor */}
        <Card className="col-span-2">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Edit className="h-4 w-4" />
              تحرير الوصفة
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 ml-2" />
                إضافة مكون
              </Button>
              <Button variant="outline" size="sm">
                حفظ الوصفة
              </Button>
            </div>
          </div>

          <div className="p-6">
            {/* Product Selection */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <LinkIcon className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">اختر المنتج لتحرير وصفته</span>
              </div>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="ابحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            {/* Empty State */}
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                اختر منتجاً أولاً لتحرير وصفته
              </h3>
            </div>
          </div>
        </Card>
      </div>

      <AddRecipeDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddRecipe}
      />
    </div>
  );
}
