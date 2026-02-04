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

interface EndShiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startAmount: number;
  onEnd: (endAmount: number) => void;
}

export function EndShiftDialog({
  open,
  onOpenChange,
  startAmount,
  onEnd,
}: EndShiftDialogProps) {
  const [endAmount, setEndAmount] = useState("");

  const handleEnd = () => {
    const numAmount = parseFloat(endAmount);
    if (!isNaN(numAmount) && numAmount >= 0) {
      onEnd(numAmount);
      setEndAmount("");
    }
  };

  const difference = endAmount
    ? parseFloat(endAmount) - startAmount
    : 0;

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
          <DialogTitle className="text-2xl text-right">إنهاء العمل</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-slate-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">رصيد البداية:</span>
              <span className="font-semibold">{startAmount.toFixed(2)}</span>
            </div>
            {endAmount && (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-600">رصيد النهاية:</span>
                  <span className="font-semibold">
                    {parseFloat(endAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-slate-600">الفرق:</span>
                  <span
                    className={`font-bold ${
                      difference >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {difference >= 0 ? "+" : ""}
                    {difference.toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endAmount" className="text-right block">
              رصيد الدرج عند النهاية
            </Label>
            <Input
              id="endAmount"
              type="number"
              placeholder="0.00"
              value={endAmount}
              onChange={(e) => setEndAmount(e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-start">
          <Button onClick={handleEnd} disabled={!endAmount}>
            إنهاء الوردية
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
