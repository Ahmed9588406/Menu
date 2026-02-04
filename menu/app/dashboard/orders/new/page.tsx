"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowRight,
  Search,
  ShoppingCart,
  User,
  FileText,
  Trash2,
  Percent,
  CreditCard,
  Printer,
  Plus,
  Minus,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function NewOrderPage() {
  const router = useRouter();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const categories = ["الكل", "test"];

  // Sample menu items - replace with actual data
  const menuItems = [
    { id: "1", name: "برجر كلاسيك", price: 25.0, category: "test" },
    { id: "2", name: "بيتزا مارجريتا", price: 35.0, category: "test" },
    { id: "3", name: "سلطة سيزر", price: 18.0, category: "test" },
  ];

  const addItem = (item: { id: string; name: string; price: number }) => {
    const existingItem = orderItems.find((i) => i.id === item.id);
    if (existingItem) {
      setOrderItems(
        orderItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setOrderItems(
      orderItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <div className="flex h-screen">
        {/* Left side - Menu */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              رجوع
            </Button>
            <h1 className="text-2xl font-bold">إضافة طلب جديد</h1>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="ابحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <ScrollArea className="flex-1">
            <div className="grid grid-cols-3 gap-4 pb-4">
              {menuItems
                .filter(
                  (item) =>
                    (selectedCategory === "الكل" ||
                      item.category === selectedCategory) &&
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                  <Card
                    key={item.id}
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => addItem(item)}
                  >
                    <div className="aspect-square bg-slate-100 rounded-lg mb-3 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-lg font-bold text-blue-600">
                      {item.price.toFixed(2)} ر.س
                    </p>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right side - Order Summary */}
        <div className="w-96 bg-white border-r shadow-lg flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">السلة</h2>
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <User className="h-4 w-4 ml-2" />
                عميل
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <FileText className="h-4 w-4 ml-2" />
                ملاحظة
              </Button>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Order Items */}
          <ScrollArea className="flex-1 p-4">
            {orderItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">السلة فارغة</p>
                <p className="text-sm text-slate-400 mt-1">
                  أضف منتجات لبدء الطلب
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <Card key={item.id} className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-slate-600">
                          {item.price.toFixed(2)} ر.س
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-bold">
                        {(item.price * item.quantity).toFixed(2)} ر.س
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Action Buttons */}
          <div className="p-4 border-t space-y-3">
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                <CreditCard className="h-4 w-4 mb-1" />
                <span className="text-xs">الدفع</span>
                <span className="text-xs text-slate-500">كاش</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                <FileText className="h-4 w-4 mb-1" />
                <span className="text-xs">ملاحظة</span>
                <span className="text-xs text-slate-500">بدون</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                <Percent className="h-4 w-4 mb-1" />
                <span className="text-xs">تخفيض</span>
                <span className="text-xs text-slate-500">غير مفعل</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                <User className="h-4 w-4 mb-1" />
                <span className="text-xs">الخدمة</span>
                <span className="text-xs text-slate-500">غير محدد</span>
              </Button>
            </div>

            <Separator />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">الإجمالي الفرعي</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>المجموع</span>
                <span>{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                disabled={orderItems.length === 0}
              >
                <Printer className="h-4 w-4 ml-2" />
                طباعة الفاتورة
              </Button>
              <Button
                className="flex-1"
                disabled={orderItems.length === 0}
              >
                إنشاء الطلب
              </Button>
            </div>

            {/* Current Order Info */}
            <div className="flex items-center justify-between text-sm pt-2 border-t">
              <span className="text-slate-600">السلة الحالية</span>
              <Badge variant="secondary">
                {orderItems.length} عناصر
              </Badge>
            </div>
            <div className="text-sm text-slate-600">السلة فارغة</div>
          </div>
        </div>
      </div>
    </div>
  );
}
