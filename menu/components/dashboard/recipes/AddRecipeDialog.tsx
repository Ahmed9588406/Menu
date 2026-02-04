"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface RecipeIngredient {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
}

interface AddRecipeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (recipe: {
    name: string;
    product: string;
    ingredients: RecipeIngredient[];
    isLinked: boolean;
  }) => void;
}

export function AddRecipeDialog({
  open,
  onOpenChange,
  onAdd,
}: AddRecipeDialogProps) {
  const [productName, setProductName] = useState("");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [currentUnit, setCurrentUnit] = useState("وحدة");

  const handleAddIngredient = () => {
    if (!currentIngredient.trim() || !currentQuantity) return;

    const newIngredient: RecipeIngredient = {
      ingredientId: Date.now().toString(),
      ingredientName: currentIngredient.trim(),
      quantity: parseFloat(currentQuantity),
      unit: currentUnit,
    };

    setIngredients([...ingredients, newIngredient]);
    setCurrentIngredient("");
    setCurrentQuantity("");
    setCurrentUnit("وحدة");
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.ingredientId !== id));
  };

  const handleSubmit = () => {
    if (!productName.trim() || ingredients.length === 0) return;

    onAdd({
      name: productName.trim(),
      product: productName.trim(),
      ingredients,
      isLinked: true,
    });

    // Reset form
    setProductName("");
    setIngredients([]);
    setCurrentIngredient("");
    setCurrentQuantity("");
    setCurrentUnit("وحدة");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute left-4 top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <DialogTitle className="text-2xl text-right flex items-center gap-2">
            <Plus className="h-6 w-6" />
            إضافة وصفة جديدة
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="productName" className="text-right block">
              اسم المنتج <span className="text-red-500">*</span>
            </Label>
            <Input
              id="productName"
              placeholder="مثال: برجر كلاسيك، بيتزا مارجريتا"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>

          {/* Add Ingredient Section */}
          <Card className="p-4 bg-slate-50">
            <h3 className="font-semibold mb-4">إضافة مكون للوصفة</h3>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-5">
                <Label htmlFor="ingredient" className="text-right block mb-2">
                  المكون
                </Label>
                <Input
                  id="ingredient"
                  placeholder="اختر مكون..."
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  className="text-right"
                  dir="rtl"
                />
              </div>

              <div className="col-span-3">
                <Label htmlFor="quantity" className="text-right block mb-2">
                  الكمية
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={currentQuantity}
                  onChange={(e) => setCurrentQuantity(e.target.value)}
                  className="text-right"
                  dir="rtl"
                />
              </div>

              <div className="col-span-3">
                <Label htmlFor="unit" className="text-right block mb-2">
                  الوحدة
                </Label>
                <Select value={currentUnit} onValueChange={setCurrentUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="وحدة">وحدة</SelectItem>
                    <SelectItem value="كيلو">كيلو</SelectItem>
                    <SelectItem value="جرام">جرام</SelectItem>
                    <SelectItem value="لتر">لتر</SelectItem>
                    <SelectItem value="مل">مل</SelectItem>
                    <SelectItem value="قطعة">قطعة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1 flex items-end">
                <Button
                  type="button"
                  onClick={handleAddIngredient}
                  disabled={!currentIngredient.trim() || !currentQuantity}
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Ingredients List */}
          {ingredients.length > 0 && (
            <div className="space-y-2">
              <Label className="text-right block">
                المكونات المضافة ({ingredients.length})
              </Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {ingredients.map((ingredient) => (
                  <Card key={ingredient.ingredientId} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold">{ingredient.ingredientName}</p>
                        <p className="text-sm text-slate-600">
                          {ingredient.quantity} {ingredient.unit}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveIngredient(ingredient.ingredientId)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-start">
          <Button
            onClick={handleSubmit}
            disabled={!productName.trim() || ingredients.length === 0}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            حفظ الوصفة
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
