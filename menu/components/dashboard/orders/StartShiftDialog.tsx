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
import { X } from "lucide-react";

interface StartShiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStart: (amount: number) => void;
}

export function StartShiftDialog({
  open,
  onOpenChange,
  onStart,
}: StartShiftDialogProps) {
  const [amount, setAmount] = useState("");

  const handleStart = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount >= 0) {
      onStart(numAmount);
      setAmount("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute left-4 top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <DialogTitle className="text-2xl text-right">بدء العمل</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="startAmount" className="text-right block">
              رصيد الدرج عند البدء
            </Label>
            <Input
              id="startAmount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-start">
          <Button onClick={handleStart} disabled={!amount}>
            بدء
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
