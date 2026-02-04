"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Search } from "lucide-react";

type ReservationStatus = "all" | "pending" | "confirmed" | "cancelled";

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState<ReservationStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [timeFilter, setTimeFilter] = useState("today");

  const tabs = [
    { id: "all" as ReservationStatus, label: "الكل" },
    { id: "pending" as ReservationStatus, label: "قيد الانتظار" },
    { id: "confirmed" as ReservationStatus, label: "مقبول" },
    { id: "cancelled" as ReservationStatus, label: "ملغي" },
  ];

  const reservationsCount = {
    all: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">الحجوزات</h1>
          <Badge variant="secondary" className="text-sm">
            المجموع: {reservationsCount.all}/5
          </Badge>
        </div>
        <Button>تحديث</Button>
      </div>

      {/* Filters Card */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                size="sm"
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200" />

          {/* Time Filter */}
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">اليوم</SelectItem>
              <SelectItem value="tomorrow">غداً</SelectItem>
              <SelectItem value="week">هذا الأسبوع</SelectItem>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="all">الكل</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {startDate ? formatDate(startDate) : <span>← البداية</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {endDate ? formatDate(endDate) : <span>← النهاية</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="بحث بالاسم/الهاتف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>
      </Card>

      {/* Reservations List - Empty State */}
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarIcon className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">لا توجد حجوزات</h3>
          <p className="text-slate-600 mb-6">
            لم يتم العثور على أي حجوزات. ابدأ بإضافة حجز جديد.
          </p>
          <Button>إضافة حجز جديد</Button>
        </div>
      </Card>
    </div>
  );
}
