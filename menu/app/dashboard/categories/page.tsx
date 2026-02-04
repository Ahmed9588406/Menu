"use client";

import { useState } from "react";
import { CategoriesTable, type Category } from "@/components/dashboard/CategoriesTable";
import { CategoryDialog, type CategoryFormData } from "@/components/dashboard/CategoryDialog";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const editingCategory = editingId
    ? categories.find((c) => c.id === editingId)
    : null;

  const handleAddCategory = () => {
    setEditingId(null);
    setDialogOpen(true);
  };

  const handleEditCategory = (id: string) => {
    setEditingId(id);
    setDialogOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الفئة؟")) {
      setCategories(categories.filter((c) => c.id !== id));
      toast.success("تم حذف الفئة بنجاح");
    }
  };

  const handleViewCategory = (id: string) => {
    const category = categories.find((c) => c.id === id);
    if (category) {
      toast.info(`عرض الفئة: ${category.nameAr}`);
    }
  };

  const handleSubmitCategory = async (data: CategoryFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingId) {
        // Update existing category
        setCategories(
          categories.map((c) =>
            c.id === editingId
              ? { 
                  ...c, 
                  nameAr: data.nameAr,
                  nameEn: data.nameEn,
                  order: data.order,
                  status: data.status,
                  showInOffers: data.showInOffers,
                  icon: data.icon,
                  iconComponent: data.iconComponent,
                }
              : c
          )
        );
        toast.success("تم تحديث الفئة بنجاح");
      } else {
        // Add new category
        const newCategory: Category = {
          id: Date.now().toString(),
          nameAr: data.nameAr,
          nameEn: data.nameEn,
          order: data.order,
          status: data.status,
          showInOffers: data.showInOffers,
          icon: data.icon,
          iconComponent: data.iconComponent,
          productsCount: 0,
        };
        setCategories([...categories, newCategory]);
        toast.success("تم إضافة الفئة بنجاح");
      }
      setEditingId(null);
    } catch (error) {
      toast.error("حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="space-y-6 p-8">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">الفئات</h1>
              <p className="mt-1 text-slate-600">إدارة فئات المنيو الخاص بك</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{categories.length}/4 الفئات</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <CategoriesTable
            categories={categories}
            onAdd={handleAddCategory}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
            onView={handleViewCategory}
          />
        </div>
      </div>

      {/* Category Dialog */}
      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmitCategory}
        initialData={
          editingCategory
            ? {
                nameAr: editingCategory.nameAr,
                nameEn: editingCategory.nameEn || "",
                order: editingCategory.order,
                status: editingCategory.status,
                showInOffers: editingCategory.showInOffers || false,
                icon: editingCategory.icon,
                iconComponent: editingCategory.iconComponent,
              }
            : undefined
        }
        isLoading={isLoading}
        title={editingId ? "تعديل الفئة" : "إضافة فئة جديدة"}
        description={
          editingId
            ? "عدّل بيانات الفئة"
            : "أضف فئة جديدة لمنيوك"
        }
      />
    </div>
  );
}
