"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("@/components/map/LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2" />
        <p className="text-sm text-gray-500">جاري تحميل الخريطة...</p>
      </div>
    </div>
  ),
});

interface Branch {
  id: string;
  name: string;
  phone: string;
  address: string;
  detailedAddress: string;
  latitude: number;
  longitude: number;
  active: boolean;
  deliveryRange: number;
  governorate: string;
}

interface BranchEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branch: Branch | null;
  onSave: (branch: Branch) => void;
}

export function BranchEditDialog({ open, onOpenChange, branch, onSave }: BranchEditDialogProps) {
  const [formData, setFormData] = useState<Branch>({
    id: "",
    name: "",
    phone: "",
    address: "",
    detailedAddress: "",
    latitude: 30.8599598595602,
    longitude: 30.1391524428339,
    active: true,
    deliveryRange: 0,
    governorate: "",
  });

  useEffect(() => {
    if (branch) {
      setFormData(branch);
    } else {
      setFormData({
        id: Date.now().toString(),
        name: "",
        phone: "",
        address: "",
        detailedAddress: "",
        latitude: 30.8599598595602,
        longitude: 30.1391524428339,
        active: true,
        deliveryRange: 0,
        governorate: "",
      });
    }
  }, [branch, open]);

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const handleLocationSelect = (data: {
    address: string;
    latitude: number;
    longitude: number;
  }) => {
    setFormData({
      ...formData,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {branch ? "تعديل فرع" : "إضافة فرع جديد"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          {/* Right Column - Form Fields */}
          <div className="space-y-4">
            {/* Branch Name */}
            <div className="space-y-2">
              <Label htmlFor="branch-name">
                اسم الفرع <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branch-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="tt"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="branch-phone">الهاتف</Label>
              <Input
                id="branch-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="01158879319"
              />
            </div>

            {/* Active Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>نشط</Label>
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
              </div>
            </div>

            {/* Delivery Range Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">نطاق التوصيل</h3>
              <p className="text-sm text-muted-foreground">
                اختر المحافظات تم المدن التابعة لها، يمكنك تحديد الكل.
              </p>

              {/* Governorate */}
              <div className="space-y-2">
                <Label>المحافظة</Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.governorate}
                    onValueChange={(value: string) => setFormData({ ...formData, governorate: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر محافظة..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="القاهرة">القاهرة</SelectItem>
                      <SelectItem value="الإسكندرية">الإسكندرية</SelectItem>
                      <SelectItem value="الجيزة">الجيزة</SelectItem>
                      <SelectItem value="الدقهلية">الدقهلية</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column - Address and Map */}
          <div className="space-y-4">
            {/* Detailed Address */}
            <div className="space-y-2">
              <Label htmlFor="detailed-address">العنوان التفصيلي</Label>
              <Input
                id="detailed-address"
                value={formData.detailedAddress}
                onChange={(e) => setFormData({ ...formData, detailedAddress: e.target.value })}
                placeholder="Alexandria - Agamy - bitach"
              />
            </div>

            {/* Interactive Map */}
            <div className="space-y-2">
              <Label>الموقع على الخريطة</Label>
              <LocationPicker
                onLocationSelect={handleLocationSelect}
                initialLat={formData.latitude}
                initialLng={formData.longitude}
              />
            </div>

            {/* Address Display */}
            <div className="space-y-2">
              <Label>العنوان المحدد</Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="العنوان من الخريطة"
                readOnly
                className="bg-gray-50"
              />
            </div>

            {/* Coordinates Display */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>خط العرض (Latitude)</Label>
                <Input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>خط الطول (Longitude)</Label>
                <Input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSave} className="px-8">
            تحديث
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
