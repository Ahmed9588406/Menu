"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, CreditCard, Wallet, Banknote } from "lucide-react";

export default function PaymentSettingsPage() {
  return (
    <div className="p-8" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">طرق الدفع</h1>
          <p className="text-slate-600">إدارة وإضافة طرق الدفع وترتيبها</p>
        </div>
        <Button>
          <Plus className="ml-2 h-4 w-4" />
          إضافة طريقة دفع
        </Button>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Banknote className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>نقدي</CardTitle>
                  <CardDescription>الدفع النقدي عند الاستلام</CardDescription>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>بطاقة ائتمانية</CardTitle>
                  <CardDescription>الدفع عبر البطاقات الائتمانية</CardDescription>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Wallet className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>محفظة إلكترونية</CardTitle>
                  <CardDescription>الدفع عبر المحافظ الإلكترونية</CardDescription>
                </div>
              </div>
              <Switch />
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
