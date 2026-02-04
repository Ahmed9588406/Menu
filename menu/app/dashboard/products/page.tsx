"use client";

import { useState } from "react";
import { ProductsTable, type Product } from "@/components/dashboard/ProductsTable";
import { ProductForm, type ProductFormData } from "@/components/dashboard/ProductForm";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock categories - replace with actual data from your API
  const categories = [
    { id: "1", nameAr: "ساندويتشات" },
    { id: "2", nameAr: "مشروبات" },
    { id: "3", nameAr: "حلويات" },
  ];

  const editingProduct = editingId
    ? products.find((p) => p.id === editingId)
    : null;

  const handleAddProduct = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditProduct = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success("تم حذف المنتج بنجاح");
    }
  };

  const handleViewProduct = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      toast.info(`عرض المنتج: ${product.nameAr}`);
    }
  };

  const handleSubmitProduct = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingId) {
        // Update existing product
        setProducts(
          products.map((p) =>
            p.id === editingId
              ? {
                  ...p,
                  nameAr: data.nameAr,
                  nameEn: data.nameEn,
                  descriptionAr: data.descriptionAr,
                  descriptionEn: data.descriptionEn,
                  price: data.price,
                  category: data.category,
                  status: "active",
                  image: data.image,
                  order: 0,
                }
              : p
          )
        );
        toast.success("تم تحديث المنتج بنجاح");
      } else {
        // Add new product
        const newProduct: Product = {
          id: Date.now().toString(),
          nameAr: data.nameAr,
          nameEn: data.nameEn,
          descriptionAr: data.descriptionAr,
          descriptionEn: data.descriptionEn,
          price: data.price,
          category: data.category,
          status: "active",
          image: data.image,
          order: 0,
        };
        setProducts([...products, newProduct]);
        toast.success("تم إضافة المنتج بنجاح");
      }
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      toast.error("حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  // Show form if adding or editing
  if (showForm) {
    return (
      <ProductForm
        onSubmit={handleSubmitProduct}
        onCancel={handleCancelForm}
        initialData={
          editingProduct
            ? {
                nameAr: editingProduct.nameAr,
                nameEn: editingProduct.nameEn || "",
                descriptionAr: editingProduct.descriptionAr || "",
                descriptionEn: editingProduct.descriptionEn || "",
                price: editingProduct.price,
                category: editingProduct.category,
                image: editingProduct.image,
                variants: [],
                optionGroups: [],
              }
            : undefined
        }
        isLoading={isLoading}
        categories={categories}
      />
    );
  }

  // Show table by default
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="space-y-6 p-8">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">المنتجات</h1>
              <p className="mt-1 text-slate-600">إدارة منتجات المنيو الخاص بك</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{products.length} منتج</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <ProductsTable
            products={products}
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
          />
        </div>
      </div>
    </div>
  );
}
