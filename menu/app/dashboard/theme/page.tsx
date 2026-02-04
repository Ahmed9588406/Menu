"use client";

import { useState } from "react";
import { themes, Theme } from "@/lib/theme-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Check, Smartphone, Monitor, Sidebar } from "lucide-react";
import ThemePreviewModal from "@/components/theme-previews/ThemePreviewModal";

export default function ThemePage() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (theme: Theme) => {
    setPreviewTheme(theme);
    setIsPreviewOpen(true);
  };

  const handleSelectTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    // Here you would save the theme selection to your database
  };

  const getNavIcon = (navPosition: string) => {
    switch (navPosition) {
      case "top":
        return <Monitor className="w-5 h-5" />;
      case "bottom":
        return <Smartphone className="w-5 h-5" />;
      case "sidebar":
        return <Sidebar className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getNavLabel = (navPosition: string) => {
    switch (navPosition) {
      case "top":
        return "شريط علوي";
      case "bottom":
        return "شريط سفلي";
      case "sidebar":
        return "شريط جانبي";
      default:
        return "";
    }
  };

  return (
    <div className="p-6" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">اختيار قالبك</h1>
        <p className="mt-2 text-muted-foreground">
          اختر القالب المناسب لمطعمك من بين مجموعة متنوعة من التصاميم الاحترافية
        </p>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`overflow-hidden transition-all hover:shadow-lg ${
              selectedTheme?.id === theme.id ? "ring-2 ring-primary" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 text-right">
                  <CardTitle className="text-xl mb-1">{theme.nameAr}</CardTitle>
                  <CardDescription className="text-sm">{theme.name}</CardDescription>
                </div>
                {theme.isFree && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    مجاناً
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="pb-3">
              {/* Theme Preview */}
              <div
                className="w-full h-48 rounded-lg mb-4 relative overflow-hidden cursor-pointer group"
                style={{ background: theme.gradient }}
                onClick={() => handlePreview(theme)}
              >
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                    <div className="bg-white rounded-full p-4">
                      <Eye className="w-8 h-8 text-gray-800" />
                    </div>
                  </div>
                </div>

                {/* Mini Preview Content - Simulates the actual layout */}
                <div className="absolute inset-0 p-4">
                  {theme.navPosition === "top" && (
                    <div className="flex flex-col h-full">
                      {/* Top Nav */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white bg-opacity-40"></div>
                          <div className="h-2 w-16 bg-white bg-opacity-40 rounded"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-4 h-4 rounded bg-white bg-opacity-40"></div>
                          <div className="w-4 h-4 rounded bg-white bg-opacity-40"></div>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-white bg-opacity-30 rounded w-3/4"></div>
                        <div className="h-2 bg-white bg-opacity-30 rounded w-1/2"></div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="h-16 bg-white bg-opacity-20 rounded"></div>
                          <div className="h-16 bg-white bg-opacity-20 rounded"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {theme.navPosition === "bottom" && (
                    <div className="flex flex-col h-full">
                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div className="text-center mb-3">
                          <div className="h-3 w-20 bg-white bg-opacity-40 rounded mx-auto"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-12 bg-white bg-opacity-20 rounded"></div>
                          <div className="h-12 bg-white bg-opacity-20 rounded"></div>
                          <div className="h-12 bg-white bg-opacity-20 rounded"></div>
                        </div>
                      </div>
                      {/* Bottom Nav */}
                      <div className="flex justify-around items-center pt-2 border-t border-white border-opacity-30">
                        <div className="w-4 h-4 rounded bg-white bg-opacity-40"></div>
                        <div className="w-4 h-4 rounded bg-white bg-opacity-40"></div>
                        <div className="w-6 h-6 rounded-full bg-white bg-opacity-60"></div>
                        <div className="w-4 h-4 rounded bg-white bg-opacity-40"></div>
                        <div className="w-4 h-4 rounded bg-white bg-opacity-40"></div>
                      </div>
                    </div>
                  )}
                  {theme.navPosition === "sidebar" && (
                    <div className="flex h-full gap-2">
                      {/* Sidebar */}
                      <div className="w-12 flex flex-col items-center gap-2 py-2 bg-white bg-opacity-20 rounded">
                        <div className="w-6 h-6 rounded-full bg-white bg-opacity-60"></div>
                        <div className="w-6 h-6 rounded bg-white bg-opacity-40"></div>
                        <div className="w-6 h-6 rounded bg-white bg-opacity-40"></div>
                        <div className="w-6 h-6 rounded bg-white bg-opacity-40"></div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-white bg-opacity-30 rounded w-3/4"></div>
                        <div className="h-2 bg-white bg-opacity-30 rounded w-1/2"></div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="h-14 bg-white bg-opacity-20 rounded"></div>
                          <div className="h-14 bg-white bg-opacity-20 rounded"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Theme Info */}
              <div className="space-y-3">
                {/* Navigation Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getNavIcon(theme.navPosition)}
                    <span className="text-sm font-medium">{getNavLabel(theme.navPosition)}</span>
                  </div>
                </div>

                {/* Color Palette */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">الألوان:</span>
                  <div className="flex gap-1">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: theme.primaryColor }}
                      title="اللون الأساسي"
                    ></div>
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: theme.accentColor }}
                      title="اللون المميز"
                    ></div>
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: theme.backgroundColor }}
                      title="لون الخلفية"
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 pt-3 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handlePreview(theme)}
              >
                <Eye className="w-4 h-4 ml-2" />
                معاينة
              </Button>
              <Button
                className="flex-1"
                style={{
                  backgroundColor: selectedTheme?.id === theme.id ? theme.primaryColor : undefined,
                }}
                onClick={() => handleSelectTheme(theme)}
              >
                {selectedTheme?.id === theme.id ? (
                  <>
                    <Check className="w-4 h-4 ml-2" />
                    محدد
                  </>
                ) : (
                  <>
                    {theme.isFree ? "اختيار" : `${theme.price} SP`}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Selected Theme Info */}
      {selectedTheme && (
        <div className="mt-8 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h3 className="text-lg font-bold">القالب المحدد</h3>
              <p className="text-muted-foreground">{selectedTheme.nameAr}</p>
            </div>
            <Button size="lg" style={{ backgroundColor: selectedTheme.primaryColor }}>
              تفعيل القالب
            </Button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTheme && (
        <ThemePreviewModal
          theme={previewTheme}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}
