"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Upload, X } from "lucide-react";

interface Slide {
  id: string;
  title: string;
  image?: string;
  link?: string;
  order: number;
}

export function OffersSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: undefined as string | undefined,
    link: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (formData.title) {
      const newSlide: Slide = {
        id: Date.now().toString(),
        title: formData.title,
        image: formData.image,
        link: formData.link,
        order: slides.length + 1,
      };
      setSlides([...slides, newSlide]);
      setFormData({ title: "", image: undefined, link: "" });
      setDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          أضف صورة الإعلانات وستظهر كسلايدر في المنيو
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            حمّل الترتيب
          </Button>
          <Button
            onClick={() => setDialogOpen(true)}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            إضافة
          </Button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">معاينة</h3>
        {slides.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500">لا توجد صورة المعاينة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" dir="rtl">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="relative group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  {slide.image ? (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm">{slide.title}</p>
                  {slide.link && (
                    <p className="text-xs text-slate-500 truncate">{slide.link}</p>
                  )}
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white"
                    onClick={() => {
                      setSlides(slides.filter((s) => s.id !== slide.id));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Text */}
      <p className="text-sm text-slate-500 text-center">
        اختر بطاقة لتُعرضها بالحجم الكبير
      </p>

      {/* Add Slide Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة سلايد</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-right block">
                العنوان <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="عنوان عرض الصيف"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-right"
                dir="rtl"
              />
            </div>

            {/* Link */}
            <div className="space-y-2">
              <Label htmlFor="link" className="text-right block">
                رابط منتج (اختياري)
              </Label>
              <Input
                id="link"
                placeholder="اكتب ابحث عن منتج"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="text-right"
                dir="rtl"
              />
              <p className="text-xs text-slate-500 text-right">
                عندك عرض الصيف
              </p>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-right block">الصورة (اختياري)</Label>
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 left-2"
                    onClick={() => setFormData({ ...formData, image: undefined })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">اختيار صورة</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <DialogFooter className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!formData.title}
            >
              إضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
