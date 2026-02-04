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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface AddTableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (table: {
    number: string;
    branch: string;
    floor: string;
    seats: number;
    status: "available" | "occupied" | "reserved" | "unavailable";
    notes?: string;
    isActive: boolean;
  }) => void;
}

export function AddTableDialog({
  open,
  onOpenChange,
  onAdd,
}: AddTableDialogProps) {
  const [tableNumber, setTableNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [floor, setFloor] = useState("");
  const [seats, setSeats] = useState("4");
  const [notes, setNotes] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = () => {
    if (!tableNumber.trim()) return;

    onAdd({
      number: tableNumber.trim(),
      branch: branch || "الفرع الرئيسي",
      floor: floor || "الطابق الأرضي",
      seats: parseInt(seats) || 4,
      status: "available",
      notes: notes.trim() || undefined,
      isActive,
    });

    // Reset form
    setTableNumber("");
    setBranch("");
    setFloor("");
    setSeats("4");
    setNotes("");
    setIsActive(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl" dir="rtl">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute left-4 top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <DialogTitle className="text-2xl text-right">
            إضافة طاولة
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Table Number */}
          <div className="space-y-2">
            <Label htmlFor="tableNumber" className="text-right block">
              رقم الطاولة <span className="text-red-500">*</span>
            </Label>
            <Input
              id="tableNumber"
              placeholder="مثال: A-01"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>

          {/* Branch */}
          <div className="space-y-2">
            <Label htmlFor="branch" className="text-right block">
              الفرع <span className="text-red-500">*</span>
            </Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger id="branch">
                <SelectValue placeholder="اختر الفرع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">الفرع الرئيسي</SelectItem>
                <SelectItem value="branch1">الفرع الأول</SelectItem>
                <SelectItem value="branch2">الفرع الثاني</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Floor */}
          <div className="space-y-2">
            <Label htmlFor="floor" className="text-right block">
              الطابق
            </Label>
            <Input
              id="floor"
              placeholder="مثال: 0 أو 1 أو 2"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>

          {/* Seats */}
          <div className="space-y-2">
            <Label htmlFor="seats" className="text-right block">
              عدد المقاعد
            </Label>
            <Input
              id="seats"
              type="number"
              placeholder="مثال: 4"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-right block">
              ملاحظة
            </Label>
            <Textarea
              id="notes"
              placeholder="ملاحظات داخلية"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-right resize-none"
              dir="rtl"
              rows={3}
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <Label htmlFor="active" className="text-right">
              مفعلة
            </Label>
            <Switch
              id="active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-start">
          <Button onClick={handleSubmit} disabled={!tableNumber.trim()}>
            إضافة
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
