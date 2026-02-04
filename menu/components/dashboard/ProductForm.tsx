"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Minus, Plus, Trash2, Link as LinkIcon, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Variant {
  id: string;
  nameAr: string;
  size: string;
  price: string;
}

interface OptionChoice {
  id: string;
  nameAr: string;
  price: string;
}

interface OptionGroup {
  id: string;
  nameAr: string;
  minLimit: number;
  maxLimit: number;
  choices: OptionChoice[];
}

export interface ProductFormData {
  nameAr: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  price: number;
  category: string;
  image?: string;
  variants: Variant[];
  optionGroups: OptionGroup[];
  linkedRecipe?: string;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  initialData?: ProductFormData;
  isLoading?: boolean;
  categories?: Array<{ id: string; nameAr: string }>;
}

export function ProductForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
  categories = [],
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      nameAr: "",
      nameEn: "",
      descriptionAr: "",
      descriptionEn: "",
      price: 0,
      category: "",
      image: undefined,
      variants: [],
      optionGroups: [],
      linkedRecipe: undefined,
    }
  );

  const [variantsOpen, setVariantsOpen] = useState(true);
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [recipeOpen, setRecipeOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nameAr.trim() && formData.category) {
      onSubmit(formData);
    }
  };

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

  const addVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      nameAr: "",
      size: "",
      price: "",
    };
    setFormData({ ...formData, variants: [...formData.variants, newVariant] });
  };

  const removeVariant = (id: string) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((v) => v.id !== id),
    });
  };

  const addOptionGroup = () => {
    const newGroup: OptionGroup = {
      id: Date.now().toString(),
      nameAr: "",
      minLimit: 0,
      maxLimit: 1,
      choices: [],
    };
    setFormData({ ...formData, optionGroups: [...formData.optionGroups, newGroup] });
  };

  const removeOptionGroup = (id: string) => {
    setFormData({
      ...formData,
      optionGroups: formData.optionGroups.filter((g) => g.id !== id),
    });
  };

  const addChoice = (groupId: string) => {
    const newChoice: OptionChoice = {
      id: Date.now().toString(),
      nameAr: "",
      price: "",
    };
    setFormData({
      ...formData,
      optionGroups: formData.optionGroups.map((g) =>
        g.id === groupId ? { ...g, choices: [...g.choices, newChoice] } : g
      ),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>المنيو</span>
            <ChevronRight className="h-4 w-4" />
            <span>المنتجات</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900 font-medium">إضافة منتج</span>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="text-blue-600 border-blue-600"
            >
              رجوع
            </Button>
            <Button
              type="submit"
              form="product-form"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              حفظ
            </Button>
          </div>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Right Column - Image */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 text-right">صورة المنتج</h3>
              <div className="space-y-3">
                {formData.image ? (
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={formData.image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                    <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">لا صورة</span>
                  </div>
                )}
                <label className="block">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 ml-2" />
                    اختيار صورة
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-4">
            {/* Names and Descriptions */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 text-right">الأسماء والأوصاف</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nameAr" className="text-right block text-slate-700">
                    الاسم (عربي) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nameAr"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    className="text-right bg-white"
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
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="text-left bg-white"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descriptionAr" className="text-right block text-slate-700">
                    الوصف (عربي)
                  </Label>
                  <Textarea
                    id="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                    className="text-right bg-white min-h-20"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descriptionEn" className="text-right block text-slate-700">
                    الوصف (English)
                  </Label>
                  <Textarea
                    id="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    className="text-left bg-white min-h-20"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Classification and Pricing */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 text-right">التصنيف والتسعير</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-right block text-slate-700">
                    الفئة <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: string) => setFormData({ ...formData, category: value })}
                    dir="rtl"
                  >
                    <SelectTrigger className="text-right bg-white">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-right block text-slate-700">
                    السعر
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="text-right bg-white"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Options and Status */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 text-right">الخيارات والحالة</h3>
              <div className="grid grid-cols-3 gap-3">
                <Button type="button" variant="outline" className="border-red-200 text-red-600">
                  <span className="text-2xl mr-2">🔥</span>
                  إضافة شارة
                </Button>
                <Button type="button" variant="outline" className="border-orange-200 text-orange-600">
                  <span className="text-2xl mr-2">⭐</span>
                  إضافة شارة
                </Button>
                <Button type="button" variant="outline" className="border-pink-200 text-pink-600">
                  <span className="text-2xl mr-2">💝</span>
                  إضافة شارة
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-right block text-slate-700">الاسم (عربي)</Label>
                  <Input className="text-right bg-white" dir="rtl" placeholder="اسم الشارة" />
                </div>
                <div className="space-y-2">
                  <Label className="text-right block text-slate-700">الاسم (English)</Label>
                  <Input className="text-left bg-white" dir="ltr" placeholder="Badge name" />
                </div>
              </div>
              <p className="text-xs text-slate-500 text-right mt-2">
                يمكنك إضافة ما تصل إلى 3 شارات (المستخدم الآن: 0/3)
              </p>
            </div>

            {/* Variants Section */}
            <Collapsible open={variantsOpen} onOpenChange={setVariantsOpen}>
              <div className="bg-white rounded-lg border">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                  <h3 className="text-lg font-semibold text-slate-900 text-right">التنويعات (أحجام)</h3>
                  <Button type="button" variant="ghost" size="icon">
                    <Minus className={`h-4 w-4 transition-transform ${variantsOpen ? "" : "rotate-180"}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6 space-y-3">
                    <p className="text-sm text-slate-600 text-right">
                      أضف التنويعات إذا كان المنتج يأتي بأحجام مختلفة (مثلاً: صغير / وسط / كبير).
                    </p>
                    {formData.variants.map((variant, index) => (
                      <div key={variant.id} className="flex gap-2 items-end">
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <Input
                            placeholder="مثلاً: صغير"
                            value={variant.nameAr}
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].nameAr = e.target.value;
                              setFormData({ ...formData, variants: newVariants });
                            }}
                            className="text-right"
                            dir="rtl"
                          />
                          <Input
                            placeholder="e.g., Small"
                            value={variant.size}
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].size = e.target.value;
                              setFormData({ ...formData, variants: newVariants });
                            }}
                            className="text-left"
                            dir="ltr"
                          />
                          <Input
                            placeholder="السعر"
                            value={variant.price}
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].price = e.target.value;
                              setFormData({ ...formData, variants: newVariants });
                            }}
                            className="text-right"
                            dir="rtl"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeVariant(variant.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon">
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addVariant}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة تنوع
                    </Button>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Option Groups Section */}
            <Collapsible open={optionsOpen} onOpenChange={setOptionsOpen}>
              <div className="bg-white rounded-lg border">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                  <h3 className="text-lg font-semibold text-slate-900 text-right">مجموعات الاختيار (إضافات)</h3>
                  <Button type="button" variant="ghost" size="icon">
                    <Minus className={`h-4 w-4 transition-transform ${optionsOpen ? "" : "rotate-180"}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6 space-y-4">
                    <p className="text-sm text-slate-600 text-right">
                      أضف مجموعات الاختيار لهذا المنتج – مثل إضافات، مشروبات، جوانب. يمكن ربط الخيار بمنتج قائم ليدخل اسمه وصورته.
                    </p>
                    {formData.optionGroups.map((group, groupIndex) => (
                      <div key={group.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-right">مجموعة {groupIndex + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOptionGroup(group.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="اسم المجموعة (عربي)"
                            value={group.nameAr}
                            onChange={(e) => {
                              const newGroups = [...formData.optionGroups];
                              newGroups[groupIndex].nameAr = e.target.value;
                              setFormData({ ...formData, optionGroups: newGroups });
                            }}
                            className="text-right"
                            dir="rtl"
                          />
                          <Input
                            placeholder="Group name (English)"
                            className="text-left"
                            dir="ltr"
                            onChange={(e) => {
                              // Handle English name if needed
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-right text-xs">الحد الأدنى:</Label>
                            <Input
                              type="number"
                              value={group.minLimit}
                              onChange={(e) => {
                                const newGroups = [...formData.optionGroups];
                                newGroups[groupIndex].minLimit = parseInt(e.target.value) || 0;
                                setFormData({ ...formData, optionGroups: newGroups });
                              }}
                              className="text-right"
                              dir="rtl"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-right text-xs">الحد الأقصى:</Label>
                            <Input
                              type="number"
                              value={group.maxLimit}
                              onChange={(e) => {
                                const newGroups = [...formData.optionGroups];
                                newGroups[groupIndex].maxLimit = parseInt(e.target.value) || 1;
                                setFormData({ ...formData, optionGroups: newGroups });
                              }}
                              className="text-right"
                              dir="rtl"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-right block font-medium">اختيارات</Label>
                          {group.choices.map((choice, choiceIndex) => (
                            <div key={choice.id} className="flex gap-2">
                              <Input
                                placeholder="اسم الخيار"
                                value={choice.nameAr}
                                onChange={(e) => {
                                  const newGroups = [...formData.optionGroups];
                                  newGroups[groupIndex].choices[choiceIndex].nameAr = e.target.value;
                                  setFormData({ ...formData, optionGroups: newGroups });
                                }}
                                className="text-right flex-1"
                                dir="rtl"
                              />
                              <Input
                                placeholder="السعر"
                                value={choice.price}
                                onChange={(e) => {
                                  const newGroups = [...formData.optionGroups];
                                  newGroups[groupIndex].choices[choiceIndex].price = e.target.value;
                                  setFormData({ ...formData, optionGroups: newGroups });
                                }}
                                className="text-right w-24"
                                dir="rtl"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newGroups = [...formData.optionGroups];
                                  newGroups[groupIndex].choices = newGroups[groupIndex].choices.filter(
                                    (c) => c.id !== choice.id
                                  );
                                  setFormData({ ...formData, optionGroups: newGroups });
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addChoice(group.id)}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة خيار
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addOptionGroup}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      إنشاء مجموعة اختيارات
                    </Button>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Recipe Link Section */}
            <Collapsible open={recipeOpen} onOpenChange={setRecipeOpen}>
              <div className="bg-white rounded-lg border">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                  <h3 className="text-lg font-semibold text-slate-900 text-right">ربط بالمخزون</h3>
                  <Button type="button" variant="ghost" size="icon">
                    <Minus className={`h-4 w-4 transition-transform ${recipeOpen ? "" : "rotate-180"}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6">
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <LinkIcon className="h-5 w-5 text-slate-400" />
                      <span className="text-slate-600">ربط بوصفة/مخزون</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </div>
      </form>
    </div>
  );
}
