"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { IconPicker } from "./IconPicker";
import { Utensils } from "lucide-react";

export interface CategoryFormData {
  nameAr: string;
  nameEn?: string;
  order: number;
  status: "active" | "inactive";
  showInOffers: boolean;
  icon?: string;
  iconComponent?: any;
}

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CategoryFormData) => void;
  initialData?: CategoryFormData;
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export function CategoryDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading = false,
  title = "إضافة فئة",
  description,
}: CategoryDialogProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    nameAr: "",
    nameEn: "",
    order: 0,
    status: "active",
    showInOffers: false,
    icon: undefined,
    iconComponent: undefined,
  });
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [removeIcon, setRemoveIcon] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        nameAr: "",
        nameEn: "",
        order: 0,
        status: "active",
        showInOffers: false,
        icon: undefined,
        iconComponent: undefined,
      });
    }
    setRemoveIcon(false);
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nameAr.trim()) {
      onSubmit(formData);
    }
  };

  const handleSelectIcon = (iconName: string, iconComponent: any) => {
    setFormData({ ...formData, icon: iconName, iconComponent });
    setRemoveIcon(false);
  };

  const handleRemoveIcon = () => {
    setFormData({ ...formData, icon: undefined, iconComponent: undefined });
    setRemoveIcon(true);
  };

  const IconComponent = formData.iconComponent;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white" dir="rtl">
          <DialogHeader className="bg-white">
            <DialogTitle className="text-right text-xl text-slate-900">{title}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white">
            {/* Arabic and English Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameAr" className="text-right block text-slate-700">
                  الاسم (عربي) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nameAr"
                  placeholder="مثلاً: ساندويتشات"
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData({ ...formData, nameAr: e.target.value })
                  }
                  className="text-right bg-white border-slate-300"
                  dir="rtl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameEn" className="text-right block text-slate-700">
                  الاسم (English)
                </Label>
                <Input
                  id="nameEn"
                  placeholder="e.g., Sandwiches"
                  value={formData.nameEn}
                  onChange={(e) =>
                    setFormData({ ...formData, nameEn: e.target.value })
                  }
                  className="text-left bg-white border-slate-300"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Order */}
            <div className="space-y-2">
              <Label htmlFor="order" className="text-right block text-slate-700">
                الترتيب
              </Label>
              <Input
                id="order"
                type="number"
                min="0"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                }
                className="text-right bg-white border-slate-300"
                dir="rtl"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              {/* Show in Offers Toggle */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-shrink-0 order-2">
                    <Switch
                      checked={formData.showInOffers}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, showInOffers: checked })
                      }
                    />
                  </div>
                  <div className="flex-1 space-y-1 order-1">
                    <Label className="text-right block font-medium text-slate-900">
                      زر العروض
                    </Label>
                    <p className="text-xs text-slate-600 text-right leading-relaxed">
                      تفعيل هذا الزر يتم اعتبار هذه الفئة كفئة عروض، ويظهر في النيمع مع شارة حصم و يظهر في المنيو كسلايدر عروض في أول المنيو
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-shrink-0 order-2">
                    <Switch
                      checked={formData.status === "active"}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          status: checked ? "active" : "inactive",
                        })
                      }
                    />
                  </div>
                  <div className="flex-1 space-y-1 order-1">
                    <Label className="text-right block font-medium text-slate-900">
                      زر المتاح
                    </Label>
                    <p className="text-xs text-slate-600 text-right leading-relaxed">
                      إذا كان هذا الزر غير مفعل لن يظهر هذه الفئة في تطبيقات العملاء.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon Section */}
            <div className="space-y-3 bg-white">
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-slate-600" />
                <Label className="text-right block font-medium text-slate-900">
                  أيقونة الفئة (افتراضي شوكة وسكين)
                </Label>
              </div>
              <p className="text-sm text-slate-600 text-right">
                تظهر الأيقونة صغيرة بجانب اسم الفئة في كل الشاشات. يمكنك اختيار أيقونات ثابتة أو متحركة.
              </p>

              {/* Selected Icon Preview */}
              {formData.icon && IconComponent && !removeIcon && (
                <div className="flex items-center justify-center gap-3 rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
                  <IconComponent className="h-12 w-12 text-blue-600" />
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-900">الأيقونة المختارة</p>
                    <p className="text-xs text-blue-700">{formData.icon}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  onClick={() => setIconPickerOpen(true)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  اختيار من مكتبة الأيقونات
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemoveIcon}
                  className="flex-1 bg-white hover:bg-slate-100"
                  disabled={!formData.icon}
                >
                  إزالة الأيقونة
                </Button>
              </div>
            </div>

            <DialogFooter className="flex gap-2 justify-end bg-white pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-white hover:bg-slate-100"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isLoading || !formData.nameAr.trim()}
              >
                {isLoading ? "جاري الحفظ..." : "إنشاء"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Icon Picker Dialog */}
      <IconPicker
        open={iconPickerOpen}
        onOpenChange={setIconPickerOpen}
        onSelectIcon={handleSelectIcon}
        selectedIcon={formData.icon}
      />
    </>
  );
}