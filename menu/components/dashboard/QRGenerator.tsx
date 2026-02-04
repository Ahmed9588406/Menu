"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, Download, Eye, Link2, Palette, Frame, Text, Image as ImageIcon, Upload } from "lucide-react";
import { toast } from "sonner";

type DotStyle = "squares" | "dots" | "rounded" | "classy" | "extra-rounded";

export default function QRGenerator() {
  const [url, setUrl] = useState("https://test40.snapoxmenu.com");
  const [size, setSize] = useState(256);
  const [activeTab, setActiveTab] = useState("simple");
  const [dotStyle, setDotStyle] = useState<DotStyle>("squares");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [includeMargin, setIncludeMargin] = useState(true);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [frameText, setFrameText] = useState("");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate canvas size including text
    const padding = 20;
    const textHeight = frameText ? 40 : 0;
    const canvasWidth = size + (padding * 2);
    const canvasHeight = size + (padding * 2) + textHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Convert SVG to image
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const qrImage = new Image();
    qrImage.onload = () => {
      // Draw QR code
      ctx.drawImage(qrImage, padding, padding, size, size);
      
      // If logo exists, draw it on top
      if (logoImage) {
        const logoImg = new Image();
        logoImg.onload = () => {
          const logoSize = size * 0.2; // Logo is 20% of QR size
          const logoX = padding + (size - logoSize) / 2;
          const logoY = padding + (size - logoSize) / 2;
          
          // Draw white background for logo
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8);
          
          // Draw logo
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          
          // Draw text if exists
          if (frameText) {
            ctx.fillStyle = fgColor;
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(frameText, canvasWidth / 2, size + padding + 30);
          }
          
          // Download
          downloadCanvas(canvas);
        };
        logoImg.src = logoImage;
      } else {
        // Draw text if exists (no logo)
        if (frameText) {
          ctx.fillStyle = fgColor;
          ctx.font = "bold 16px Arial";
          ctx.textAlign = "center";
          ctx.fillText(frameText, canvasWidth / 2, size + padding + 30);
        }
        
        // Download
        downloadCanvas(canvas);
      }
      
      URL.revokeObjectURL(svgUrl);
    };
    
    qrImage.src = svgUrl;
  };

  const downloadCanvas = (canvas: HTMLCanvasElement) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-code.png";
      downloadLink.href = url;
      downloadLink.click();
      URL.revokeObjectURL(url);
      toast.success("تم تنزيل رمز QR بنجاح");
    }, "image/png");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
        toast.success("تم رفع الشعار بنجاح");
      };
      reader.readAsDataURL(file);
    }
  };

  const getQRStyle = () => {
    switch (dotStyle) {
      case "dots":
        return { rx: 50, ry: 50 };
      case "rounded":
        return { rx: 3, ry: 3 };
      case "classy":
        return { rx: 5, ry: 5 };
      case "extra-rounded":
        return { rx: 8, ry: 8 };
      default:
        return {};
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" dir="rtl">
      {/* Right Side - Preview */}
      <Card className="lg:col-span-1">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
          <div 
            ref={qrRef}
            className="bg-white p-4 rounded-lg shadow-sm border-2 border-gray-100 mb-4"
            style={{ backgroundColor: bgColor }}
          >
            {url ? (
              <div className="relative">
                <QRCodeSVG
                  value={url}
                  size={size}
                  level={errorLevel}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  includeMargin={includeMargin}
                  {...getQRStyle()}
                />
                {logoImage && (
                  <img
                    src={logoImage}
                    alt="Logo"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-lg p-1"
                  />
                )}
              </div>
            ) : (
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-300" />
              </div>
            )}
            {frameText && (
              <div className="text-center mt-2 font-medium text-sm" style={{ color: fgColor }}>
                {frameText}
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={downloadQR}>
              <Download className="w-4 h-4 ml-2" />
              PNG تنزيل
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Left Side - Configuration */}
      <Card className="lg:col-span-2">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                رابط الموقع أو المنيو
              </Label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://test40.snapoxmenu.com"
                className="text-left"
                dir="ltr"
              />
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="simple">
                  <QrCode className="w-4 h-4 ml-1" />
                  البسيط
                </TabsTrigger>
                <TabsTrigger value="colors">
                  <Palette className="w-4 h-4 ml-1" />
                  الألوان
                </TabsTrigger>
                <TabsTrigger value="frame">
                  <Frame className="w-4 h-4 ml-1" />
                  الإطار
                </TabsTrigger>
                <TabsTrigger value="text">
                  <Text className="w-4 h-4 ml-1" />
                  النص
                </TabsTrigger>
                <TabsTrigger value="logo">
                  <ImageIcon className="w-4 h-4 ml-1" />
                  الشعار
                </TabsTrigger>
              </TabsList>

              <TabsContent value="simple" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>نمط النقاط</Label>
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        variant={dotStyle === "squares" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setDotStyle("squares")}
                      >
                        مربعات
                      </Button>
                      <Button 
                        variant={dotStyle === "dots" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setDotStyle("dots")}
                      >
                        دوائر
                      </Button>
                      <Button 
                        variant={dotStyle === "rounded" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setDotStyle("rounded")}
                      >
                        دائرية
                      </Button>
                      <Button 
                        variant={dotStyle === "classy" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setDotStyle("classy")}
                      >
                        أنيقة
                      </Button>
                      <Button 
                        variant={dotStyle === "extra-rounded" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setDotStyle("extra-rounded")}
                      >
                        دائرية جداً
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>حجم الرمز: {size}px</Label>
                    </div>
                    <Slider
                      value={[size]}
                      onValueChange={(value: number[]) => setSize(value[0])}
                      max={512}
                      min={128}
                      step={16}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>مستوى تصحيح الخطأ</Label>
                    <div className="flex gap-2">
                      <Button 
                        variant={errorLevel === "L" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setErrorLevel("L")}
                      >
                        منخفض
                      </Button>
                      <Button 
                        variant={errorLevel === "M" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setErrorLevel("M")}
                      >
                        متوسط
                      </Button>
                      <Button 
                        variant={errorLevel === "Q" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setErrorLevel("Q")}
                      >
                        عالي
                      </Button>
                      <Button 
                        variant={errorLevel === "H" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setErrorLevel("H")}
                      >
                        عالي جداً
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="margin" 
                      className="rounded"
                      checked={includeMargin}
                      onChange={(e) => setIncludeMargin(e.target.checked)}
                    />
                    <Label htmlFor="margin">إضافة هامش</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>لون الرمز</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-20 h-10"
                      />
                      <Input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="flex-1"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>لون الخلفية</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-20 h-10"
                      />
                      <Input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>ألوان جاهزة</Label>
                    <div className="grid grid-cols-4 gap-2">
                      <Button 
                        variant="outline" 
                        className="h-12"
                        style={{ backgroundColor: "#000000", color: "#ffffff" }}
                        onClick={() => { setFgColor("#000000"); setBgColor("#ffffff"); }}
                      >
                        كلاسيكي
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-12"
                        style={{ backgroundColor: "#3b82f6", color: "#ffffff" }}
                        onClick={() => { setFgColor("#3b82f6"); setBgColor("#ffffff"); }}
                      >
                        أزرق
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-12"
                        style={{ backgroundColor: "#ef4444", color: "#ffffff" }}
                        onClick={() => { setFgColor("#ef4444"); setBgColor("#ffffff"); }}
                      >
                        أحمر
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-12"
                        style={{ backgroundColor: "#10b981", color: "#ffffff" }}
                        onClick={() => { setFgColor("#10b981"); setBgColor("#ffffff"); }}
                      >
                        أخضر
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="frame" className="space-y-4 mt-6">
                <p className="text-sm text-muted-foreground">
                  خيارات الإطار المتقدمة ستكون متاحة قريباً
                </p>
              </TabsContent>

              <TabsContent value="text" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label>نص أسفل الرمز</Label>
                  <Textarea
                    value={frameText}
                    onChange={(e) => setFrameText(e.target.value)}
                    placeholder="أدخل النص الذي تريد إضافته أسفل رمز QR"
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="logo" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>رفع شعار</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 ml-2" />
                      اختر صورة الشعار
                    </Button>
                  </div>
                  {logoImage && (
                    <div className="flex items-center gap-2">
                      <img src={logoImage} alt="Logo preview" className="w-16 h-16 object-contain border rounded" />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setLogoImage(null)}
                      >
                        إزالة
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    ملاحظة: استخدم مستوى تصحيح خطأ عالي (H) عند إضافة شعار
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Generate Button */}
            <Button className="w-full" size="lg" onClick={downloadQR}>
              <Download className="w-5 h-5 ml-2" />
              تنزيل QR
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
