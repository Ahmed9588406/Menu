"use client";

import OnboardingTabs from "@/components/onboarding/OnboardingTabs";
import RestaurantInfoTab from "@/components/onboarding/tabs/RestaurantInfoTab";
import ContactInfoTab from "@/components/onboarding/tabs/ContactInfoTab";
import MenuCategoriesTab from "@/components/onboarding/tabs/MenuCategoriesTab";
import BrandingTab from "@/components/onboarding/tabs/BrandingTab";
import PaymentTab from "@/components/onboarding/tabs/PaymentTab";
import SettingsTab from "@/components/onboarding/tabs/SettingsTab";
import ReviewTab from "@/components/onboarding/tabs/ReviewTab";

export default function OnboardingPage() {
  const tabs = [
    {
      id: 1,
      label: "Restaurant Info",
      labelAr: "بيانات المطعم",
      component: <RestaurantInfoTab />,
    },
    {
      id: 2,
      label: "Contact",
      labelAr: "معلومات التواصل",
      component: <ContactInfoTab />,
    },
    {
      id: 3,
      label: "Menu Categories",
      labelAr: "الكريديت  المجانية",
      component: <MenuCategoriesTab />,
    },
    {
      id: 4,
      label: "Branding",
      labelAr: "العلامة التجارية",
      component: <BrandingTab />,
    },
    {
      id: 5,
      label: "Payment",
      labelAr: " أضافة الفروع",
      component: <PaymentTab />,
    },
    {
      id: 6,
      label: "Settings",
      labelAr: "تفعيل الخدمات",
      component: <SettingsTab />,
    },
    {
      id: 7,
      label: "Review",
      labelAr: "المراجعة",
      component: <ReviewTab />,
    },
  ];

  const handleComplete = () => {
    console.log("Onboarding completed!");
    // Redirect to dashboard or next page
    // router.push("/dashboard");
  };

  return <OnboardingTabs tabs={tabs} onComplete={handleComplete} />;
}
