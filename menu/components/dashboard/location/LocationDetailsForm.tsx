"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface LocationDetailsFormProps {
  locationName: string;
  activityType: string;
  phoneNumber: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  tiktokEnabled: boolean;
  onLocationNameChange: (value: string) => void;
  onActivityTypeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onWhatsappChange: (value: string) => void;
  onInstagramChange: (value: string) => void;
  onFacebookChange: (value: string) => void;
  onTiktokChange: (value: string) => void;
  onTiktokEnabledChange: (value: boolean) => void;
  onSave: () => void;
}

export function LocationDetailsForm({
  locationName,
  activityType,
  phoneNumber,
  whatsapp,
  instagram,
  facebook,
  tiktok,
  tiktokEnabled,
  onLocationNameChange,
  onActivityTypeChange,
  onPhoneNumberChange,
  onWhatsappChange,
  onInstagramChange,
  onFacebookChange,
  onTiktokChange,
  onTiktokEnabledChange,
  onSave,
}: LocationDetailsFormProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
          {/* Location Name and Activity Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location-name">
                اسم المكان <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location-name"
                value={locationName}
                onChange={(e) => onLocationNameChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity-type">
                نوع النشاط <span className="text-red-500">*</span>
              </Label>
              <Input
                id="activity-type"
                value={activityType}
                onChange={(e) => onActivityTypeChange(e.target.value)}
              />
            </div>
          </div>

          {/* Phone and WhatsApp */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => onPhoneNumberChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">واتساب</Label>
              <Input
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => onWhatsappChange(e.target.value)}
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="https://instagram.com/..."
                value={instagram}
                onChange={(e) => onInstagramChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                placeholder="https://facebook.com/..."
                value={facebook}
                onChange={(e) => onFacebookChange(e.target.value)}
              />
            </div>
          </div>

          {/* TikTok with Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="tiktok">TikTok</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">نشط</span>
                <Switch
                  checked={tiktokEnabled}
                  onCheckedChange={onTiktokEnabledChange}
                />
              </div>
            </div>
            <Input
              id="tiktok"
              placeholder="@/https://tiktok.com/..."
              value={tiktok}
              onChange={(e) => onTiktokChange(e.target.value)}
              disabled={!tiktokEnabled}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" className="px-8">
              حفظ
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
