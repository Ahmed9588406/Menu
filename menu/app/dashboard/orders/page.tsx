"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StartShiftDialog } from "@/components/dashboard/orders/StartShiftDialog";
import { EndShiftDialog } from "@/components/dashboard/orders/EndShiftDialog";
import { OrdersView } from "@/components/dashboard/orders/OrdersView";

export default function OrdersPage() {
  const [activeShift, setActiveShift] = useState<{
    id: string;
    startAmount: number;
    startTime: Date;
  } | null>(null);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);

  const handleStartShift = (amount: number) => {
    setActiveShift({
      id: Date.now().toString(),
      startAmount: amount,
      startTime: new Date(),
    });
    setShowStartDialog(false);
  };

  const handleEndShift = (endAmount: number) => {
    // Here you would save the shift data to your database
    console.log("Shift ended:", {
      ...activeShift,
      endAmount,
      endTime: new Date(),
    });
    setActiveShift(null);
    setShowEndDialog(false);
  };

  if (!activeShift) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50" dir="rtl">
        <Card className="p-12 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">ابدأ الوردية لعرض الطلبات</h1>
          <p className="text-slate-600 mb-6">
            لن تظهر أي طلبات حتى تقوم في "بدء العمل". سيتم إظهار طلبات اليوم فقط.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline">مراجعة</Button>
            <Button onClick={() => setShowStartDialog(true)}>بدء العمل</Button>
          </div>
        </Card>

        <StartShiftDialog
          open={showStartDialog}
          onOpenChange={setShowStartDialog}
          onStart={handleStartShift}
        />
      </div>
    );
  }

  return (
    <div className="p-8" dir="rtl">
      <OrdersView
        shift={activeShift}
        onEndShift={() => setShowEndDialog(true)}
      />

      <EndShiftDialog
        open={showEndDialog}
        onOpenChange={setShowEndDialog}
        startAmount={activeShift.startAmount}
        onEnd={handleEndShift}
      />
    </div>
  );
}
