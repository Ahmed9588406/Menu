"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function InvoiceSettingsPage() {
  // Print Settings State
  const [printMode, setPrintMode] = useState<"a4" | "pos">("a4");
  const [paperSize, setPaperSize] = useState("80mm");
  const [autoPrint, setAutoPrint] = useState(false);

  // Design Settings State
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#1d4ed8");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [showQR, setShowQR] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showTaxAsOne, setShowTaxAsOne] = useState(false);
  const [showTaxSeparate, setShowTaxSeparate] = useState(true);

  // Text Settings State
  const [footerText, setFooterText] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [contactLink, setContactLink] = useState("");
  const [termsText, setTermsText] = useState("");

  // Language & Numbering State
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [direction, setDirection] = useState<"rtl" | "ltr" | "auto">("rtl");
  const [invoicePrefix, setInvoicePrefix] = useState("INV");
  const [digitCount, setDigitCount] = useState(5);
  const [startNumber, setStartNumber] = useState(1);

  // Tax Settings State
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [taxRate, setTaxRate] = useState(14);
  const [taxMethod, setTaxMethod] = useState<"exclusive" | "inclusive">("exclusive");

  const handleSave = () => {
    // Save logic here
    toast.success("تم حفظ الإعدادات بنجاح");
  };

  // Calculate preview values
  const subtotal = 100;
  const taxAmount = taxEnabled ? (subtotal * taxRate) / 100 : 0;
  const total = taxMethod === "exclusive" ? subtotal + taxAmount : subtotal;
  const taxIncluded = taxMethod === "inclusive" ? (subtotal * taxRate) / (100 + taxRate) : 0;

  return (
    <div className="p-4 md:p-8" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">إعدادات الفاتورة</h1>
        <p className="text-slate-600">ضبط ضريبة القيمة المضافة ونموذج الفاتورة (POS)</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tax Settings */}
          <Card>
            <CardHeader>
              <CardTitle>الضريبة ورسوم الخدمة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="tax-enabled" className="text-base">
                  نسبة ضريبة القيمة المضافة (%)
                </Label>
                <Switch
                  id="tax-enabled"
                  checked={taxEnabled}
                  onCheckedChange={setTaxEnabled}
                />
              </div>

              {taxEnabled && (
                <>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="text-center text-lg font-semibold"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base">طريقة احتساب الضريبة</Label>
                    <RadioGroup value={taxMethod} onValueChange={(v: any) => setTaxMethod(v)}>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="exclusive" id="exclusive" />
                        <Label htmlFor="exclusive" className="font-normal cursor-pointer">
                          غير شامل (إضافة الضريبة فوق السعر)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="inclusive" id="inclusive" />
                        <Label htmlFor="inclusive" className="font-normal cursor-pointer">
                          شامل (السعر يتضمن الضريبة)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="service-fee">رسوم الخدمة</Label>
                <div className="flex gap-2">
                  <Input
                    id="service-fee"
                    type="number"
                    placeholder="0.0"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" className="px-6">
                    نسبة مئوية
                  </Button>
                  <Button variant="outline" size="sm" className="px-6">
                    مبلغ ثابت
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Print Settings */}
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الطباعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base">وضع الطباعة الافتراضي</Label>
                <Tabs value={printMode} onValueChange={(v: any) => setPrintMode(v)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="a4">فاتورة متصفح (A4/80mm)</TabsTrigger>
                    <TabsTrigger value="pos">وصل حراري POS</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paper-size">مقاس ورق الفاتورة عند الطباعة من المتصفح</Label>
                <Select value={paperSize} onValueChange={setPaperSize}>
                  <SelectTrigger id="paper-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="80mm">80mm حراري</SelectItem>
                    <SelectItem value="58mm">58mm حراري</SelectItem>
                    <SelectItem value="a4">A4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-print" className="text-base">
                  الطباعة التلقائية بعد إنشاء الطلب
                </Label>
                <Switch
                  id="auto-print"
                  checked={autoPrint}
                  onCheckedChange={setAutoPrint}
                />
              </div>
            </CardContent>
          </Card>

          {/* Design Settings */}
          <Card>
            <CardHeader>
              <CardTitle>تصميم الفاتورة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base">ألوان قالب الفاتورة</Label>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-10 h-10 rounded border-2 cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                      onClick={() => document.getElementById("primary-color")?.click()}
                    />
                    <input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <Label className="text-sm">اللون الأساسي</Label>
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        placeholder="#000000"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-10 h-10 rounded border-2 cursor-pointer"
                      style={{ backgroundColor: secondaryColor }}
                      onClick={() => document.getElementById("secondary-color")?.click()}
                    />
                    <input
                      id="secondary-color"
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <Label className="text-sm">لون ثانوي</Label>
                      <Input
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        placeholder="#1d4ed8"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base">حجم الخط في الفاتورة</Label>
                <RadioGroup value={fontSize} onValueChange={(v: any) => setFontSize(v)}>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small" className="font-normal cursor-pointer">
                        صغير
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="font-normal cursor-pointer">
                        متوسط
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large" className="font-normal cursor-pointer">
                        كبير
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base">خيارات عرض متقدمة</Label>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-qr" className="font-normal">
                    إظهار QR Code للفاتورة
                  </Label>
                  <Switch
                    id="show-qr"
                    checked={showQR}
                    onCheckedChange={setShowQR}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-logo" className="font-normal">
                    إظهار لوجو المكان في الفاتورة
                  </Label>
                  <Switch
                    id="show-logo"
                    checked={showLogo}
                    onCheckedChange={setShowLogo}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-tax-one" className="font-normal">
                    عرض الضريبة ورسوم الخدمة كمجموع واحد
                  </Label>
                  <Switch
                    id="show-tax-one"
                    checked={showTaxAsOne}
                    onCheckedChange={setShowTaxAsOne}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-tax-separate" className="font-normal">
                    إظهار إجمالي قبل الضريبة وبعد الضريبة
                  </Label>
                  <Switch
                    id="show-tax-separate"
                    checked={showTaxSeparate}
                    onCheckedChange={setShowTaxSeparate}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Text Settings */}
          <Card>
            <CardHeader>
              <CardTitle>نصوص الفاتورة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="footer-text">نص أسفل الفاتورة</Label>
                <Textarea
                  id="footer-text"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  placeholder="مثال: شكراً لزيارتكم"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="return-policy">سياسة الاسترجاع</Label>
                <Textarea
                  id="return-policy"
                  value={returnPolicy}
                  onChange={(e) => setReturnPolicy(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-link">رابط تواصل أو موقع</Label>
                <Input
                  id="contact-link"
                  value={contactLink}
                  onChange={(e) => setContactLink(e.target.value)}
                  placeholder="رابط موقع أو واتساب"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms-text">تحذيرات أو تعليمات</Label>
                <Textarea
                  id="terms-text"
                  value={termsText}
                  onChange={(e) => setTermsText(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language & Numbering */}
          <Card>
            <CardHeader>
              <CardTitle>اللغة والترقيم</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base">لغة الفاتورة</Label>
                <RadioGroup value={language} onValueChange={(v: any) => setLanguage(v)}>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="ar" id="ar" />
                      <Label htmlFor="ar" className="font-normal cursor-pointer">
                        العربية
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="en" id="en" />
                      <Label htmlFor="en" className="font-normal cursor-pointer">
                        English
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-base">اتجاه الفاتورة</Label>
                <RadioGroup value={direction} onValueChange={(v: any) => setDirection(v)}>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="rtl" id="rtl" />
                      <Label htmlFor="rtl" className="font-normal cursor-pointer">
                        من اليمين لليسار
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="ltr" id="ltr" />
                      <Label htmlFor="ltr" className="font-normal cursor-pointer">
                        من اليسار لليمين
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="auto" id="auto" />
                      <Label htmlFor="auto" className="font-normal cursor-pointer">
                        تلقائي
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base">ترقيم الفواتير</Label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prefix" className="text-sm">Prefix</Label>
                    <Input
                      id="prefix"
                      value={invoicePrefix}
                      onChange={(e) => setInvoicePrefix(e.target.value)}
                      placeholder="INV"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="digit-count" className="text-sm">عدد الخانات</Label>
                    <Input
                      id="digit-count"
                      type="number"
                      value={digitCount}
                      onChange={(e) => setDigitCount(Number(e.target.value))}
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-number" className="text-sm">
                    رقم بداية الطلب في كل شيفت
                  </Label>
                  <Input
                    id="start-number"
                    type="number"
                    value={startNumber}
                    onChange={(e) => setStartNumber(Number(e.target.value))}
                    min="1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg" className="px-8">
              حفظ الإعدادات
            </Button>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>معاينة الفاتورة</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="border rounded-lg p-6 bg-white shadow-sm"
                style={{ 
                  fontSize: fontSize === "small" ? "12px" : fontSize === "large" ? "16px" : "14px",
                  direction: direction === "auto" ? "rtl" : direction
                }}
              >
                {/* Header */}
                <div className="text-center mb-4 pb-4 border-b">
                  <h3 className="font-bold text-lg mb-1">test</h3>
                  <p className="text-xs text-slate-600">فاتورة</p>
                </div>

                {/* Invoice Info */}
                <div className="space-y-1 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">التاريخ</span>
                    <span>01-01-2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">نوع الطلب</span>
                    <span>توصيل</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">اسم العميل</span>
                    <span>اسم العميل</span>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border-t border-b py-3 mb-3">
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold mb-2">
                    <div className="text-right">المنتج</div>
                    <div className="text-center">الكمية</div>
                    <div className="text-left">السعر</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-right">منتج تجريبي</div>
                    <div className="text-center">1</div>
                    <div className="text-left">100 ج</div>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-1 text-xs mb-4">
                  {showTaxSeparate && (
                    <div className="flex justify-between">
                      <span>الإجمالي الفرعي</span>
                      <span>{subtotal.toFixed(2)} ج</span>
                    </div>
                  )}
                  
                  {taxEnabled && (
                    <div className="flex justify-between">
                      <span>الضريبة ({taxRate}%)</span>
                      <span>
                        {taxMethod === "exclusive" 
                          ? taxAmount.toFixed(2) 
                          : taxIncluded.toFixed(2)} ج
                      </span>
                    </div>
                  )}

                  {showTaxSeparate && taxEnabled && (
                    <>
                      <div className="flex justify-between">
                        <span>قبل الضريبة</span>
                        <span>{subtotal.toFixed(2)} ج</span>
                      </div>
                      <div className="flex justify-between">
                        <span>بعد الضريبة</span>
                        <span>{total.toFixed(2)} ج</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between font-bold text-sm pt-2 border-t">
                    <span>الإجمالي الكلي</span>
                    <span>{total.toFixed(2)} ج</span>
                  </div>
                </div>

                {/* Footer */}
                {footerText && (
                  <div className="text-center text-xs text-slate-600 mt-4 pt-4 border-t">
                    {footerText}
                  </div>
                )}

                <div className="text-center text-xs text-slate-500 mt-2">
                  شكراً لزيارتكم
                </div>

                <div className="text-center text-xs text-slate-400 mt-2">
                  هذه معاينة تصميم الفاتورة. الأسعار والبيانات هنا للإيضاح فقط
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
