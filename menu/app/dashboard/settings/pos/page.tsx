// @ts-nocheck
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Power,
  Inbox,
  X,
  HelpCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface POSDevice {
  id: string;
  name: string;
  role: string;
  branch: string;
  contactType: string;
  ip?: string;
  port?: string;
  driver: string;
  language: string;
  active: boolean;
  printSlogan: boolean;
}

export default function POSSettingsPage() {
  const [devices, setDevices] = useState<POSDevice[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<POSDevice | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    branch: "",
    contactType: "IP (شبكة)",
    ip: "",
    port: "9100",
    driver: "ESC/POS (عام)",
    language: "العربية",
    active: true,
    printSlogan: true,
  });

  const handleAddDevice = () => {
    if (!formData.name || !formData.role || !formData.contactType) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    const newDevice: POSDevice = {
      id: Date.now().toString(),
      name: formData.name,
      role: formData.role,
      branch: formData.branch,
      contactType: formData.contactType,
      ip: formData.ip,
      port: formData.port,
      driver: formData.driver,
      language: formData.language,
      active: formData.active,
      printSlogan: formData.printSlogan,
    };

    setDevices([...devices, newDevice]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("تم إضافة الجهاز بنجاح");
  };

  const handleEditDevice = () => {
    if (!selectedDevice) return;

    if (!formData.name || !formData.role || !formData.contactType) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    setDevices(
      devices.map((device) =>
        device.id === selectedDevice.id
          ? {
              ...device,
              name: formData.name,
              role: formData.role,
              branch: formData.branch,
              contactType: formData.contactType,
              ip: formData.ip,
              port: formData.port,
              driver: formData.driver,
              language: formData.language,
              active: formData.active,
              printSlogan: formData.printSlogan,
            }
          : device
      )
    );

    setIsEditDialogOpen(false);
    setSelectedDevice(null);
    resetForm();
    toast.success("تم تحديث الجهاز بنجاح");
  };

  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter((device) => device.id !== id));
    toast.success("تم حذف الجهاز بنجاح");
  };

  const handleToggleActive = (id: string) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, active: !device.active } : device
      )
    );
    toast.success("تم تحديث حالة الجهاز");
  };

  const openEditDialog = (device: POSDevice) => {
    setSelectedDevice(device);
    setFormData({
      name: device.name,
      role: device.role,
      branch: device.branch,
      contactType: device.contactType,
      ip: device.ip || "",
      port: device.port || "9100",
      driver: device.driver,
      language: device.language,
      active: device.active,
      printSlogan: device.printSlogan,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      branch: "",
      contactType: "IP (شبكة)",
      ip: "",
      port: "9100",
      driver: "ESC/POS (عام)",
      language: "العربية",
      active: true,
      printSlogan: true,
    });
  };

  const filteredDevices = devices.filter((device) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return device.active;
    if (activeTab === "inactive") return !device.active;
    return true;
  });

  const DeviceFormFields = () => (
    <div className="space-y-6 py-4">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base">
          الاسم <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder=""
          className="text-right"
        />
      </div>

      {/* Role Field */}
      <div className="space-y-2">
        <Label htmlFor="role" className="text-base">
          الدور <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
        >
          <SelectTrigger id="role" className="text-right">
            <SelectValue placeholder="كاشير (إيصال العملاء)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cashier">كاشير (إيصال العملاء)</SelectItem>
            <SelectItem value="kitchen">مطبخ</SelectItem>
            <SelectItem value="bar">بار</SelectItem>
            <SelectItem value="receipt">إيصال</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Branch Field */}
      <div className="space-y-2">
        <Label htmlFor="branch" className="text-base">
          الفرع
        </Label>
        <Select
          value={formData.branch}
          onValueChange={(value) => setFormData({ ...formData, branch: value })}
        >
          <SelectTrigger id="branch" className="text-right">
            <SelectValue placeholder="اختر فرع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main">الفرع الرئيسي</SelectItem>
            <SelectItem value="branch1">الفرع الأول</SelectItem>
            <SelectItem value="branch2">الفرع الثاني</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contact Type Field */}
      <div className="space-y-2">
        <Label htmlFor="contact-type" className="text-base">
          نوع الاتصال <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.contactType}
          onValueChange={(value) =>
            setFormData({ ...formData, contactType: value })
          }
        >
          <SelectTrigger id="contact-type" className="text-right">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IP (شبكة)">IP (شبكة)</SelectItem>
            <SelectItem value="USB">USB</SelectItem>
            <SelectItem value="Bluetooth">Bluetooth</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* IP Address Field */}
      {formData.contactType === "IP (شبكة)" && (
        <div className="space-y-2">
          <Label htmlFor="ip" className="text-base">
            IP <span className="text-red-500">*</span>
          </Label>
          <Input
            id="ip"
            value={formData.ip}
            onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
            placeholder="192.168.1.50"
            className="text-right"
            dir="ltr"
          />
        </div>
      )}

      {/* Port Field */}
      {formData.contactType === "IP (شبكة)" && (
        <div className="space-y-2">
          <Label htmlFor="port" className="text-base">
            المنفذ (Port)
          </Label>
          <Input
            id="port"
            value={formData.port}
            onChange={(e) => setFormData({ ...formData, port: e.target.value })}
            placeholder="9100"
            className="text-right"
            dir="ltr"
          />
        </div>
      )}

      {/* Driver Field */}
      <div className="space-y-2">
        <Label htmlFor="driver" className="text-base">
          المعرف (Driver)
        </Label>
        <Select
          value={formData.driver}
          onValueChange={(value) => setFormData({ ...formData, driver: value })}
        >
          <SelectTrigger id="driver" className="text-right">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ESC/POS (عام)">ESC/POS (عام)</SelectItem>
            <SelectItem value="Epson">Epson</SelectItem>
            <SelectItem value="Star">Star</SelectItem>
            <SelectItem value="Citizen">Citizen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Language Field */}
      <div className="space-y-2">
        <Label htmlFor="language" className="text-base">
          لغة الإيصال
        </Label>
        <Select
          value={formData.language}
          onValueChange={(value) =>
            setFormData({ ...formData, language: value })
          }
        >
          <SelectTrigger id="language" className="text-right">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="العربية">العربية</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Français">Français</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Switch */}
      <div className="flex items-center justify-between py-2">
        <Label htmlFor="active" className="text-base">
          نشط
        </Label>
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, active: checked })
          }
        />
      </div>

      {/* Print Slogan Switch */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="print-slogan" className="text-base">
            طباعة الشعار (افتراضي)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-slate-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>طباعة شعار المطعم على الإيصال</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Switch
          id="print-slogan"
          checked={formData.printSlogan}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, printSlogan: checked })
          }
        />
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">الأجهزة (POS)</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">تحديث</Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة جهاز
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
              <DialogHeader className="relative">
                <DialogTitle className="text-2xl text-center">إضافة جهاز</DialogTitle>
              </DialogHeader>
              <DeviceFormFields />
              <DialogFooter className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
                <Button onClick={handleAddDevice} className="flex-1">
                  إنشاء
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
            <TabsList>
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="active">نشط</TabsTrigger>
              <TabsTrigger value="inactive">غير نشط</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredDevices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-slate-100 p-6 mb-4">
                <Inbox className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">لا توجد بيانات</h3>
              <p className="text-slate-500 mb-4">
                لم يتم إضافة أي أجهزة POS بعد
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة جهاز جديد
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">الدور</TableHead>
                    <TableHead className="text-right">الفرع</TableHead>
                    <TableHead className="text-right">نوع الاتصال</TableHead>
                    <TableHead className="text-right">المعرف (Driver)</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">اخر ظهور</TableHead>
                    <TableHead className="text-right">نشط</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.name}</TableCell>
                      <TableCell>{device.role}</TableCell>
                      <TableCell>{device.branch || "-"}</TableCell>
                      <TableCell>{device.contactType}</TableCell>
                      <TableCell>{device.driver}</TableCell>
                      <TableCell>
                        <Badge variant={device.active ? "default" : "secondary"}>
                          {device.active ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleActive(device.id)}
                        >
                          <Power
                            className={`h-4 w-4 ${
                              device.active ? "text-green-600" : "text-slate-400"
                            }`}
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu dir="rtl">
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(device)}>
                              <Pencil className="ml-2 h-4 w-4" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteDevice(device.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="ml-2 h-4 w-4" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">تعديل جهاز</DialogTitle>
          </DialogHeader>
          <DeviceFormFields />
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button onClick={handleEditDevice} className="flex-1">
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
