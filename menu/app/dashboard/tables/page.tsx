"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddTableDialog } from "@/components/dashboard/tables/AddTableDialog";
import { LayoutGrid, Plus, RefreshCw } from "lucide-react";

interface Table {
  id: string;
  number: string;
  branch: string;
  floor: string;
  seats: number;
  status: "available" | "occupied" | "reserved" | "unavailable";
  notes?: string;
  isActive: boolean;
}

export default function TablesPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [showInactive, setShowInactive] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleAddTable = (table: Omit<Table, "id">) => {
    const newTable: Table = {
      ...table,
      id: Date.now().toString(),
    };
    setTables([...tables, newTable]);
    setShowAddDialog(false);
  };

  // Filter tables
  const filteredTables = tables.filter((table) => {
    if (!showInactive && !table.isActive) return false;
    if (selectedBranch !== "all" && table.branch !== selectedBranch) return false;
    if (selectedFloor !== "all" && table.floor !== selectedFloor) return false;
    if (statusFilter !== "all" && table.status !== statusFilter) return false;
    return true;
  });

  // Count by status
  const availableCount = tables.filter((t) => t.status === "available").length;
  const occupiedCount = tables.filter((t) => t.status === "occupied").length;
  const reservedCount = tables.filter((t) => t.status === "reserved").length;
  const unavailableCount = tables.filter((t) => t.status === "unavailable").length;
  const waitingCount = 0; // For future implementation

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "occupied":
        return "bg-red-500";
      case "reserved":
        return "bg-yellow-500";
      case "unavailable":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "متاحة";
      case "occupied":
        return "محجوزة";
      case "reserved":
        return "محجوزة";
      case "unavailable":
        return "غير متاحة";
      default:
        return status;
    }
  };

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">إظهار غير المفعل</span>
              <Switch checked={showInactive} onCheckedChange={setShowInactive} />
            </div>

            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="بحث برقم الطاولة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الفروع</SelectItem>
                <SelectItem value="main">الفرع الرئيسي</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFloor} onValueChange={setSelectedFloor}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="الطابق" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الطوابق</SelectItem>
                <SelectItem value="0">الطابق الأرضي</SelectItem>
                <SelectItem value="1">الطابق الأول</SelectItem>
                <SelectItem value="2">الطابق الثاني</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="اختر الفرع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="available">متاحة</SelectItem>
                <SelectItem value="occupied">محجوزة</SelectItem>
                <SelectItem value="reserved">محجوزة</SelectItem>
                <SelectItem value="unavailable">غير متاحة</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">الطاولات: {tables.length}/5</span>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 ml-2" />
              تحديث
            </Button>
            <Button onClick={() => setShowAddDialog(true)} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة طاولة
            </Button>
          </div>
        </div>
      </Card>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
          size="sm"
        >
          الكل
        </Button>
        <Button
          variant={statusFilter === "available" ? "default" : "outline"}
          onClick={() => setStatusFilter("available")}
          size="sm"
        >
          متاحة ({availableCount})
        </Button>
        <Button
          variant={statusFilter === "occupied" ? "default" : "outline"}
          onClick={() => setStatusFilter("occupied")}
          size="sm"
        >
          محجوزة ({occupiedCount})
        </Button>
        <Button
          variant={statusFilter === "reserved" ? "default" : "outline"}
          onClick={() => setStatusFilter("reserved")}
          size="sm"
        >
          قيد الانتظار ({reservedCount})
        </Button>
        <Button
          variant={statusFilter === "unavailable" ? "default" : "outline"}
          onClick={() => setStatusFilter("unavailable")}
          size="sm"
        >
          غير متاحة ({unavailableCount})
        </Button>
        <Button variant="outline" size="sm">
          تم التحضير ({waitingCount})
        </Button>
        <Button variant="outline" size="sm">
          تم التسليم ({waitingCount})
        </Button>
      </div>

      {/* Status Legend */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span className="text-sm">متاحة</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span className="text-sm">محجوزة</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded" />
          <span className="text-sm">محجوزة</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500 rounded" />
          <span className="text-sm">غير مفعلة</span>
        </div>
      </div>

      {/* Tables Grid or Empty State */}
      {filteredTables.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutGrid className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">لا توجد طاولات</h3>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredTables.map((table) => (
            <Card
              key={table.id}
              className={`p-4 cursor-pointer hover:shadow-lg transition-shadow border-2 ${
                table.status === "available"
                  ? "border-green-500"
                  : table.status === "occupied"
                  ? "border-red-500"
                  : table.status === "reserved"
                  ? "border-yellow-500"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold">{table.number}</h3>
                  <p className="text-sm text-slate-600">{table.floor}</p>
                </div>
                <Badge
                  className={`${getStatusColor(table.status)} text-white`}
                >
                  {getStatusLabel(table.status)}
                </Badge>
              </div>
              <div className="text-sm text-slate-600">
                <p>المقاعد: {table.seats}</p>
                {table.notes && <p className="mt-1 text-xs">{table.notes}</p>}
              </div>
            </Card>
          ))}
        </div>
      )}

      <AddTableDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddTable}
      />
    </div>
  );
}
