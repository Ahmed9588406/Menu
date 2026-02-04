"use client";

import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-[#1e3a5f] px-6" dir="rtl">
      {/* Right Side - Logo and Brand */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">SNAPEX</span>
        </div>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <span className="text-sm">لوحة التحكم</span>
        </Button>
      </div>

      {/* Left Side - Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <span className="text-sm">EN</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <span className="text-sm">AR</span>
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <span className="text-sm">+ إضافة طلب</span>
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-white text-[#1e3a5f] hover:bg-gray-100"
        >
          <span className="text-sm">+ إضافة طلب محلي</span>
        </Button>
        
        {/* Notification Bell */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
          </Button>
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 flex items-center justify-center text-xs">
            0
          </Badge>
        </div>

        {/* User Avatar */}
        <Button variant="ghost" size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600">
          <User className="h-5 w-5 text-white" />
        </Button>
      </div>
    </header>
  );
}
