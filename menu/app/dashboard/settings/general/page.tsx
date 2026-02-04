"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save, Settings, Clock, Store, Calendar, ShoppingBag, Truck, Home, Zap, Grid, MessageCircle, Info, Plus } from "lucide-react";
import { toast } from "sonner";

interface DaySchedule {
  enabled: boolean;
  shifts: Array<{
    from: string;
    to: string;
  }>;
}

interface WorkingHours {
  [key: string]: DaySchedule;
}

export default function GeneralSettingsPage() {
  // Main tab state
  const [mainTab, setMainTab] = useState("activations");

  // Activation toggles
  const [onlineOrdersEnabled, setOnlineOrdersEnabled] = useState(false);
  const [branchPickupEnabled, setBranchPickupEnabled] = useState(true);
  
  // Services
  const [deliveryEnabled, setDeliveryEnabled] = useState(false);
  const [pickupEnabled, setPickupEnabled] = useState(false);
  const [insideServiceEnabled, setInsideServiceEnabled] = useState(false);
  const [reservationEnabled, setReservationEnabled] = useState(false);
  const [tableManagementEnabled, setTableManagementEnabled] = useState(false);

  // WhatsApp settings
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  // Order settings
  const [autoCreateOrderEnabled, setAutoCreateOrderEnabled] = useState(false);

  // Non-region items
  const [nonRegionItemsEnabled, setNonRegionItemsEnabled] = useState(false);

  // Working hours
  const [workingHoursEnabled, setWorkingHoursEnabled] = useState(false);
  const [closureMessage, setClosureMessage] = useState("");
  const [timeFrom, setTimeFrom] = useState("12:00-09:00");
  const [timeTo, setTimeTo] = useState("17:00-05:00");

  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    sunday: { enabled: false, shifts: [] },
    monday: { enabled: false, shifts: [] },
    tuesday: { enabled: false, shifts: [] },
    wednesday: { enabled: false, shifts: [] },
    thursday: { enabled: false, shifts: [] },
    friday: { enabled: false, shifts: [] },
    saturday: { enabled: false, shifts: [] },
  });

  const dayNames: { [key: string]: string } = {
    sunday: "الأحد",
    monday: "الاثنين",
    tuesday: "الثلاثاء",
    wednesday: "الأربعاء",
    thursday: "الخميس",
    friday: "الجمعة",
    saturday: "السبت",
  };

  const toggleDay = (day: string) => {
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        enabled: !workingHours[day].enabled,
      },
    });
  };

  const addShift = (day: string) => {
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        shifts: [...workingHours[day].shifts, { from: "", to: "" }],
      },
    });
  };

  const updateShift = (day: string, index: number, field: "from" | "to", value: string) => {
    const newShifts = [...workingHours[day].shifts];
    newShifts[index][field] = value;
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        shifts: newShifts,
      },
    });
  };

  const handleSave = () => {
    toast.success("تم حفظ الإعدادات بنجاح");
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="p-6">
        {/* Top Level Tabs */}
        <div className="mb-6 flex gap-2 border-b bg-white rounded-t-lg">
          <button
            onClick={() => setMainTab("activations")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              mainTab === "activations"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            الأدوار والتفعيلات
          </button>
          <button
            onClick={() => setMainTab("working-hours")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              mainTab === "working-hours"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            مواقيت العمل
          </button>
        </div>

        {/* Activations Tab Content */}
        {mainTab === "activations" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold">الأدوار والتفعيلات</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                إدارة اختيارية للأدوار والتفعيلات الخاصة بالطلبات والخدمات
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  اختر الفرع
                </Button>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                  حفظ الفرع
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* General Activation */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Grid className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>التفعيل العام</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-gray-600" />
                      <Label className="text-sm font-medium">تفعيل الطلبات أونلاين</Label>
                    </div>
                    <Switch
                      checked={onlineOrdersEnabled}
                      onCheckedChange={setOnlineOrdersEnabled}
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-900">
                      عند إيقاف الطلبات أونلاين، سيتم تعطيل الخدمات التابعة (داخل المطعم الحجز)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Branch / Shift */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Store className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>الفرع / الوردية</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Store className="w-5 h-5 text-gray-600" />
                      <Label className="text-sm font-medium">تفعيل نظام فتح وغلق الفرع</Label>
                    </div>
                    <Switch
                      checked={branchPickupEnabled}
                      onCheckedChange={setBranchPickupEnabled}
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-900">
                      عند الإيقاف سيظهر الطلبات بدون وردية وسيتم إضافة أزرار بدء/إنهاء العمل
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>الخدمات</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-600" />
                      <Label className="text-sm">تفعيل التوصيل</Label>
                    </div>
                    <Switch checked={deliveryEnabled} onCheckedChange={setDeliveryEnabled} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-gray-600" />
                      <Label className="text-sm">تفعيل البناب أولى</Label>
                    </div>
                    <Switch checked={pickupEnabled} onCheckedChange={setPickupEnabled} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-600" />
                      <Label className="text-sm">تفعيل داخل المطعم</Label>
                    </div>
                    <Switch checked={insideServiceEnabled} onCheckedChange={setInsideServiceEnabled} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <Label className="text-sm">تفعيل الحجز</Label>
                    </div>
                    <Switch checked={reservationEnabled} onCheckedChange={setReservationEnabled} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Grid className="w-4 h-4 text-gray-600" />
                      <Label className="text-sm">تفعيل إدارة الطاولات</Label>
                    </div>
                    <Switch checked={tableManagementEnabled} onCheckedChange={setTableManagementEnabled} />
                  </div>
                </CardContent>
              </Card>

              {/* Non-Region Items */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Grid className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>إخفاء الأقسام غير المتاحة</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Grid className="w-5 h-5 text-gray-600" />
                      <Label className="text-sm font-medium">
                        إخفاء الأقسام غير المتاحة في المنطقة من الشريط الجانبي وصفحة الإعدادات
                      </Label>
                    </div>
                    <Switch
                      checked={nonRegionItemsEnabled}
                      onCheckedChange={setNonRegionItemsEnabled}
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 ml-2" />
                    حفظ إعداد الإخفاء
                  </Button>
                </CardContent>
              </Card>

              {/* Order Settings */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>إعدادات عامة للطلبات</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-gray-600" />
                      <Label className="text-sm font-medium">إنشاء طلبية تلقائياً عند إنشاء الطلب</Label>
                    </div>
                    <Switch
                      checked={autoCreateOrderEnabled}
                      onCheckedChange={setAutoCreateOrderEnabled}
                    />
                  </div>
                  <Button variant="outline" className="w-full justify-start">
                    <Info className="w-4 h-4 ml-2" />
                    إرسال الطلبات
                  </Button>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-900">
                      يجب تفعيل الطلبات للزبائن لتفعيل هذا الخيار
                    </p>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 ml-2" />
                    حفظ الإعداد العام
                  </Button>
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <CardTitle>رسائل واتساب</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                      <Label className="text-sm font-medium">رسائل واتساب تلقائية عند الطلبية</Label>
                    </div>
                    <Switch
                      checked={whatsappEnabled}
                      onCheckedChange={setWhatsappEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">وجهة واتساب</Label>
                    <Input
                      placeholder="رقم واتساب، المكان..."
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      disabled={!whatsappEnabled}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Working Hours Tab Content */}
        {mainTab === "working-hours" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold">مواقيت العمل</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                حدد أيام وساعات العمل، ويمكنك إضافة أكثر من وردية يومياً
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  تفعيل كل الأيام
                </Button>
                <Button variant="outline" size="sm">
                  مسح كل الورديات
                </Button>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                  حفظ الفرع
                </Button>
              </div>
            </div>

            {/* Working Hours Control */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>تفعيل ضبط مواقيت العمل</CardTitle>
                    <CardDescription className="mt-2">رسالة الإغلاق</CardDescription>
                  </div>
                  <Switch
                    checked={workingHoursEnabled}
                    onCheckedChange={setWorkingHoursEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    مثال: بإمكانك استخدام متغير الآن، وسيتم تحسين ساعات العمل
                  </Label>
                  <Input
                    placeholder="أدخل رسالة الإغلاق..."
                    value={closureMessage}
                    onChange={(e) => setClosureMessage(e.target.value)}
                    disabled={!workingHoursEnabled}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ضبط برنامج (09:00-12:00)</Label>
                    <Input
                      value={timeFrom}
                      onChange={(e) => setTimeFrom(e.target.value)}
                      disabled={!workingHoursEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>نهاية أسبوع (05:00-17:00)</Label>
                    <Input
                      value={timeTo}
                      onChange={(e) => setTimeTo(e.target.value)}
                      disabled={!workingHoursEnabled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Days Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(workingHours).map((day) => (
                <Card key={day} className={!workingHours[day].enabled ? "opacity-60" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{dayNames[day]}</CardTitle>
                      <Switch
                        checked={workingHours[day].enabled}
                        onCheckedChange={() => toggleDay(day)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {workingHours[day].shifts.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        لا توجد وردات لهذا اليوم
                      </p>
                    ) : (
                      workingHours[day].shifts.map((shift, index) => (
                        <div key={index} className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="من"
                              value={shift.from}
                              onChange={(e) => updateShift(day, index, "from", e.target.value)}
                              disabled={!workingHours[day].enabled}
                            />
                            <Input
                              placeholder="إلى"
                              value={shift.to}
                              onChange={(e) => updateShift(day, index, "to", e.target.value)}
                              disabled={!workingHours[day].enabled}
                            />
                          </div>
                        </div>
                      ))
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => addShift(day)}
                      disabled={!workingHours[day].enabled}
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة وردية
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
