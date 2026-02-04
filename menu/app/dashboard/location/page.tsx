"use client";

import { useState } from "react";
import { LogoUploadCard } from "@/components/dashboard/location/LogoUploadCard";
import { LocationLinkCard } from "@/components/dashboard/location/LocationLinkCard";
import { BranchManagementCard } from "@/components/dashboard/location/BranchManagementCard";
import { LocationDetailsForm } from "@/components/dashboard/location/LocationDetailsForm";

export default function LocationPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [locationName, setLocationName] = useState("test");
  const [activityType, setActivityType] = useState("مطعم");
  const [phoneNumber, setPhoneNumber] = useState("2001158879319");
  const [whatsapp, setWhatsapp] = useState("2001158879319");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [tiktokEnabled, setTiktokEnabled] = useState(false);
  const [locationUrl, setLocationUrl] = useState("test40");
  const [domain] = useState("snapexmenu.com");

  const handleSave = () => {
    console.log("Saving location data...", {
      logo,
      locationName,
      activityType,
      phoneNumber,
      whatsapp,
      instagram,
      facebook,
      tiktok,
      tiktokEnabled,
      locationUrl,
    });
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold">تفاصيل مكانك</h1>
        <p className="text-sm text-muted-foreground mt-1">
          تتكون بيانات مكانك الأساسية: لإدارة العنوان والمواقع اذهب إلى صفحة الفروع
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Right Column - Logo, Link, and Branches */}
        <div className="space-y-6">
          <LogoUploadCard logo={logo} onLogoChange={setLogo} />
          <LocationLinkCard
            locationUrl={locationUrl}
            domain={domain}
            onLocationUrlChange={setLocationUrl}
          />
          <BranchManagementCard />
        </div>

        {/* Left Column - Main Form */}
        <div className="lg:col-span-2">
          <LocationDetailsForm
            locationName={locationName}
            activityType={activityType}
            phoneNumber={phoneNumber}
            whatsapp={whatsapp}
            instagram={instagram}
            facebook={facebook}
            tiktok={tiktok}
            tiktokEnabled={tiktokEnabled}
            onLocationNameChange={setLocationName}
            onActivityTypeChange={setActivityType}
            onPhoneNumberChange={setPhoneNumber}
            onWhatsappChange={setWhatsapp}
            onInstagramChange={setInstagram}
            onFacebookChange={setFacebook}
            onTiktokChange={setTiktok}
            onTiktokEnabledChange={setTiktokEnabled}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
