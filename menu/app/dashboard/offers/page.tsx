"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OffersSlider } from "./offers_slider";
import { OffersCoupons } from "./offers_sale";

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState("slider");

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-end mb-6">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
            
            <TabsTrigger
              value="coupons"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none pb-2 px-6 bg-transparent"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                كوبونات الخصم
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="slider"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none pb-2 px-6 bg-transparent"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                سلايدر العروض
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="slider">
          <OffersSlider />
        </TabsContent>
        <TabsContent value="coupons">
          <OffersCoupons />
        </TabsContent>
      </Tabs>
    </div>
  );
}