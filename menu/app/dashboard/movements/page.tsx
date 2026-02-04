"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RotateCcw,
  ShoppingCart,
  Wrench,
  TrendingUp,
  TrendingDown,
  Package,
  Save,
  RefreshCw,
  Info,
  Calculator,
} from "lucide-react";

interface Movement {
  id: string;
  type: "purchase" | "sale" | "adjustment" | "return";
  ingredient: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  supplier?: string;
  notes?: string;
  date: Date;
}

export default function MovementsPage() {
  const [activeTab, setActiveTab] = useState("movements");
  const [movements, setMovements] = useState<Movement[]>([]);
  
  // Form states
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [movementType, setMovementType] = useState("شراء (إضافة)");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  // Accounting states
  const [accountingIngredient, setAccountingIngredient] = useState("");
  const [accountingUnit, setAccountingUnit] = useState("وحدة");
  const [accountingPrice, setAccountingPrice] = useState("");
  const [accountingSupplier, setAccountingSupplier] = useState("");

  const handleSaveMovement = () => {
    if (!selectedIngredient || !quantity) return;

    const newMovement: Movement = {
      id: Date.now().toString(),
      type: movementType === "شراء (إضافة)" ? "purchase" : "sale",
      ingredient: selectedIngredient,
      quantity: parseFloat(quantity),
      unit: "وحدة",
      pricePerUnit: 0,
      notes,
      date: new Date(),
    };

    setMovements([newMovement, ...movements]);
    
    // Reset form
    setSelectedIngredient("");
    setQuantity("");
    setNotes("");
  };

  const handleSaveAccounting = () => {
    if (!accountingIngredient || !accountingPrice) return;

    // Save accounting entry logic here
    console.log("Saving accounting entry");
    
    // Reset form
    setAccountingIngredient("");
    setAccountingUnit("وحدة");
    setAccountingPrice("");
    setAccountingSupplier("");
  };

  // Calculate statistics
  const totalMovements = movements.length;
  const purchases = movements.filter((m) => m.type === "purchase").length;
  const sales = movements.filter((m) => m.type === "sale").length;
  const adjustments = movements.filter((m) => m.type === "adjustment").length;
  const returns = movements.filter((m) => m.type === "return").length;

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <RotateCcw className="h-8 w-8" />
          <h1 className="text-3xl font-bold">حركات المخزون</h1>
        </div>
        <Input placeholder="tt" className="w-32" />
      </div>

      <p className="text-slate-600 mb-6">
        تتبع وإدارة حركات المخزون، والمشتريات
      </p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">إجمالي الحركات</p>
              <p className="text-2xl font-bold">{totalMovements}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <RotateCcw className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">عمليات شراء</p>
              <p className="text-2xl font-bold">{purchases}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">خصم كميات</p>
              <p className="text-2xl font-bold">{sales}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">تسويات</p>
              <p className="text-2xl font-bold">{adjustments}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Wrench className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">مرتجعات</p>
              <p className="text-2xl font-bold">{returns}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
        <TabsList className="mb-6">
          <TabsTrigger value="movements" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            الحركات
          </TabsTrigger>
          <TabsTrigger value="accounting" className="gap-2">
            <Calculator className="h-4 w-4" />
            المحاسبة الذكية
          </TabsTrigger>
        </TabsList>

        {/* Movements Tab */}
        <TabsContent value="movements">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Side - Movement Log */}
            <Card className="col-span-2">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  سجل الحركات
                </h3>
              </div>
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">المكون</TableHead>
                      <TableHead className="text-right">الفرع</TableHead>
                      <TableHead className="text-right">الكمية</TableHead>
                      <TableHead className="text-right">ملاحظة</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movements.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                          لا توجد حركات مسجلة
                        </TableCell>
                      </TableRow>
                    ) : (
                      movements.map((movement) => (
                        <TableRow key={movement.id}>
                          <TableCell>
                            <Badge variant={movement.type === "purchase" ? "default" : "secondary"}>
                              {movement.type === "purchase" ? "شراء" : "بيع"}
                            </Badge>
                          </TableCell>
                          <TableCell>{movement.ingredient}</TableCell>
                          <TableCell>الفرع الرئيسي</TableCell>
                          <TableCell>{movement.quantity} {movement.unit}</TableCell>
                          <TableCell>{movement.notes || "-"}</TableCell>
                          <TableCell>{movement.date.toLocaleDateString("ar-SA")}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Right Side - New Movement Form */}
            <Card>
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  تسجيل حركة جديدة
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-right block">
                    المكون <span className="text-red-500">*</span>
                  </Label>
                  <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المكون" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="سكر">سكر</SelectItem>
                      <SelectItem value="دقيق">دقيق</SelectItem>
                      <SelectItem value="زيت">زيت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-right block">
                    نوع الحركة <span className="text-red-500">*</span>
                  </Label>
                  <Select value={movementType} onValueChange={setMovementType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="شراء (إضافة)">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          شراء (إضافة)
                        </div>
                      </SelectItem>
                      <SelectItem value="خصم">خصم</SelectItem>
                      <SelectItem value="تسوية">تسوية</SelectItem>
                      <SelectItem value="مرتجع">مرتجع</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-right block">
                    الكمية <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    placeholder="أدخل الكمية"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="text-right"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-right block">ملاحظة (اختياري)</Label>
                  <Textarea
                    placeholder="أية تفاصيل إضافية..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="text-right resize-none"
                    dir="rtl"
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleSaveMovement}
                  disabled={!selectedIngredient || !quantity}
                  className="w-full gap-2"
                >
                  <Save className="h-4 w-4" />
                  حفظ الحركة
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Accounting Tab */}
        <TabsContent value="accounting">
          <Card>
            {/* Component Prices Section */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-6">
                <Package className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">أسعار المكونات</h3>
              </div>

              <div className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-3 space-y-2">
                  <Label className="text-right block">
                    المكون <span className="text-red-500">*</span>
                  </Label>
                  <Select value={accountingIngredient} onValueChange={setAccountingIngredient}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="سكر">سكر</SelectItem>
                      <SelectItem value="دقيق">دقيق</SelectItem>
                      <SelectItem value="زيت">زيت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label className="text-right block">
                    الوحدة <span className="text-red-500">*</span>
                  </Label>
                  <Select value={accountingUnit} onValueChange={setAccountingUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="وحدة">وحدة</SelectItem>
                      <SelectItem value="كيلو">كيلو</SelectItem>
                      <SelectItem value="جرام">جرام</SelectItem>
                      <SelectItem value="لتر">لتر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label className="text-right block">
                    السعر/وحدة <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={accountingPrice}
                    onChange={(e) => setAccountingPrice(e.target.value)}
                    className="text-right"
                    dir="rtl"
                  />
                </div>

                <div className="col-span-3 space-y-2">
                  <Label className="text-right block">المورد</Label>
                  <Input
                    placeholder="اسم المورد (اختياري)"
                    value={accountingSupplier}
                    onChange={(e) => setAccountingSupplier(e.target.value)}
                    className="text-right"
                    dir="rtl"
                  />
                </div>

                <div className="col-span-2 flex gap-2">
                  <Button 
                    onClick={handleSaveAccounting}
                    disabled={!accountingIngredient || !accountingPrice}
                    className="flex-1"
                  >
                    حفظ
                  </Button>
                  <Button variant="outline" className="flex-1">
                    مسح
                  </Button>
                </div>
              </div>

              {/* Ingredients Price Table */}
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">المكون</TableHead>
                      <TableHead className="text-right">الوحدة</TableHead>
                      <TableHead className="text-right">السعر/وحدة</TableHead>
                      <TableHead className="text-right">المورد</TableHead>
                      <TableHead className="text-right">آخر تحديث</TableHead>
                      <TableHead className="text-right">إجراء</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                        لا توجد أسعار مسجلة
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Profit and Cost Analysis Section */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">تحليل الأرباح والتكاليف</h3>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700">
                  <Info className="h-5 w-5" />
                  <span className="font-semibold">إجمالي المصروفات التقديرية:</span>
                  <span className="text-xl font-bold">0.00 جنيه</span>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">المنتج</TableHead>
                    <TableHead className="text-right">الفئة</TableHead>
                    <TableHead className="text-right">السعر</TableHead>
                    <TableHead className="text-right">التكلفة</TableHead>
                    <TableHead className="text-right">الربح</TableHead>
                    <TableHead className="text-right">الهامش %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                      لا توجد بيانات متاحة
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
