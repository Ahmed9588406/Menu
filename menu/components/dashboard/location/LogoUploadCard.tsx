"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import Image from "next/image";

interface LogoUploadCardProps {
  logo: string | null;
  onLogoChange: (logo: string | null) => void;
}

export function LogoUploadCard({ logo, onLogoChange }: LogoUploadCardProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">الشعار</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 relative overflow-hidden">
            {logo ? (
              <Image src={logo} alt="Logo" fill className="object-cover" />
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <p className="text-xs text-gray-500 mt-2">اختيار صورة</p>
              </div>
            )}
          </div>
          <Label htmlFor="logo-upload" className="mt-4 cursor-pointer">
            <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
              <Upload className="w-4 h-4" />
              <span>اختيار صورة</span>
            </div>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </Label>
          <p className="text-xs text-gray-500 mt-2">80x80</p>
        </div>
      </CardContent>
    </Card>
  );
}
