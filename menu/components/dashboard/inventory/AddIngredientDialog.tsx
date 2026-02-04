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
import { X, Plus } from "lucide-react";

interface AddIngredientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (ingredient: {
    name: string;
    unit: string;
    quantity: number;
    minQuantity: number;
    costPerUnit: number;
    branch: string;
  }) => void;
}

export function AddIngredientDialog({
  open,
  onOpenChange,
  onAdd,
}: AddIngredientDialogProps) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("وحدة");
  const [quantity, setQuantity] = useState("0.00");
  const [minQuantity, setMinQuantity] = useState("10.00");
  const [costPerUnit, setCostPerUnit] = useState("0.00");

  const handleSubmit = () => {
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      unit,
      quantity: parseFloat(quantity) || 0,
      minQuantity: parseFloat(minQuantity) || 0,
      costPerUnit: parseFloat(costPerUnit) || 0,
      branch: "الفرع الرئيسي",
    });

    // Reset form
    setName("");
    setUnit("وحدة");
    setQuantity("0.00");
    setMinQuantity("10.00");
    setCostPerUnit("0.00");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl" dir="rtl">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute left-4 top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <DialogTitle className="text-2xl text-right flex items-center gap-2">
            <Plus className="h-6 w-6" />
            إضافة مكون جديد
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Component Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right block">
              اسم المكون <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="مثال: سكر، زيت، دقيق"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>

          {/* Unit and Initial Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-right block">
                الكمية الابتدائية
              </Label>
              <Input
                id="quantity"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit" className="text-right block">
                الوحدة <span className="text-red-500">*</span>
              </Label>
              <Select value={unit} onValueChange={setUnit}>
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
                  <SelectItem value="علبة">علبة</SelectItem>
                  <SelectItem value="كيس">كيس</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Alert Threshold and Cost */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="costPerUnit" className="text-right block">
                التكلفة لكل وحدة (جنيه)
              </Label>
              <Input
                id="costPerUnit"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minQuantity" className="text-right block">
                حد التنبيه
              </Label>
              <Input
                id="minQuantity"
                type="number"
                step="0.01"
                placeholder="10.00"
                value={minQuantity}
                onChange={(e) => setMinQuantity(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-start">
          <Button onClick={handleSubmit} disabled={!name.trim()} className="gap-2">
            <Plus className="h-4 w-4" />
            حفظ المكون
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
