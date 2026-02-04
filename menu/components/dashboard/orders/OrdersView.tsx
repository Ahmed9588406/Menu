"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Share2,
  List,
  Grid,
  Search,
  Clock,
  Wallet,
} from "lucide-react";

interface OrdersViewProps {
  shift: {
    id: string;
    startAmount: number;
    startTime: Date;
  };
  onEndShift: () => void;
}

export function OrdersView({ shift, onEndShift }: OrdersViewProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getShiftDuration = () => {
    const now = new Date();
    const diff = now.getTime() - shift.startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}س ${minutes}د`;
  };

  return (
    <div className="space-y-4">
      {/* Header with shift info */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">وقت البدء</p>
                <p className="font-semibold">{formatTime(shift.startTime)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">رصيد البداية</p>
                <p className="font-semibold">{shift.startAmount.toFixed(2)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600">مدة الوردية</p>
              <p className="font-semibold">{getShiftDuration()}</p>
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={onEndShift}
            className="bg-red-500 hover:bg-red-600"
          >
            إنهاء العمل
          </Button>
        </div>
      </Card>

      {/* Action bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push("/dashboard/orders/new")}
            >
              <Settings className="h-4 w-4 ml-2" />
              إضافة طلب
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 ml-2" />
              الحجوزات
            </Button>
            <Button variant="outline" size="sm">
              تحديث
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-sm">
              رصيد البداية: {shift.startAmount}
            </Badge>
            <Badge variant="secondary" className="text-sm bg-green-100 text-green-700">
              وردية مفتوحة
            </Badge>
          </div>
        </div>
      </Card>

      {/* Filters and search */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              الكل
            </Button>
            <Button variant="ghost" size="sm">
              قيد الانتظار
            </Button>
            <Button variant="ghost" size="sm">
              قيد التحضير
            </Button>
            <Button variant="ghost" size="sm">
              تم التسليم
            </Button>
            <Button variant="ghost" size="sm">
              ملغي
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="بحث برقم الطلب / الهاتف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
      </Card>

      {/* Orders list - empty state */}
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <List className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">لا توجد طلبات حالياً</h3>
          <p className="text-slate-600 mb-6">
            تم إغلاق الطلبات الموقوفين تلقائياً. يتضمن بشكل تلقائي منتج، ويحمل بشكل
            تلقائي منتج.
          </p>
        </div>
      </Card>
    </div>
  );
}
