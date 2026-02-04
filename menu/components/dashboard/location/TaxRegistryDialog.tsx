"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Minus, Upload } from "lucide-react";

interface TaxRegistryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaxRegistryDialog({ open, onOpenChange }: TaxRegistryDialogProps) {
  const [taxRegistered, setTaxRegistered] = useState(false);
  const [taxStatus, setTaxStatus] = useState("غير مسجل ضريبياً");
  const [taxNumber, setTaxNumber] = useState("");
  const [etaClientId, setEtaClientId] = useState("");
  const [etaClientSecret, setEtaClientSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSave = () => {
    console.log("Saving tax registry data...", {
      taxRegistered,
      taxStatus,
      taxNumber,
      etaClientId,
      etaClientSecret,
      uploadedFile: uploadedFile?.name,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">السجل الضريبي</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Collapsible Section */}
          <div className="border rounded-lg">
            <button
              type="button"
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <span className="text-sm font-medium">إدارة الأروال والتفعيلات</span>
              <Minus className="w-4 h-4" />
            </button>
            <div className="px-4 pb-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                تفعيل الطلبات والخدمات ويتم التوصيل
              </p>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <span className="text-sm">إدارة الأروال والتفعيلات</span>
              </div>
            </div>
          </div>

          {/* Tax Registration Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>حالة التسجيل الضريبي</Label>
              <Input
                value={taxStatus}
                onChange={(e) => setTaxStatus(e.target.value)}
                placeholder="غير مسجل ضريبياً"
              />
            </div>
            <div className="space-y-2">
              <Label>مسجل ضريبياً</Label>
              <div className="flex items-center h-10">
                <Switch
                  checked={taxRegistered}
                  onCheckedChange={setTaxRegistered}
                />
              </div>
            </div>
          </div>

          {/* Tax Number */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الرقم الضريبي</Label>
              <Input
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
                placeholder="مثال: 123456789"
              />
            </div>
            <div className="space-y-2">
              <Label>ETA Client ID</Label>
              <Input
                value={etaClientId}
                onChange={(e) => setEtaClientId(e.target.value)}
                placeholder="اختياري"
              />
            </div>
          </div>

          {/* ETA Client Secret */}
          <div className="space-y-2">
            <Label>مستند إثبات (اختياري)</Label>
            <div className="relative">
              <Input
                type={showSecret ? "text" : "password"}
                value={etaClientSecret}
                onChange={(e) => setEtaClientSecret(e.target.value)}
                placeholder="اختياري"
                className="pl-10"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showSecret ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {/* File Upload */}
            <div className="mt-2">
              <Label htmlFor="tax-file-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                  <Upload className="w-4 h-4" />
                  <span>اختيار ملف</span>
                </div>
                <Input
                  id="tax-file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Label>
              {uploadedFile && (
                <p className="text-xs text-green-600 mt-1">
                  تم اختيار: {uploadedFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Save Tax Registry Button */}
          <div className="flex justify-center pt-4">
            <Button onClick={handleSave} className="px-8">
              حفظ السجل الضريبي فقط
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
