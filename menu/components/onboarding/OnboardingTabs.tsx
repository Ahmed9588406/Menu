"use client";

import { useState } from "react";
import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Tab {
  id: number;
  label: string;
  labelAr: string;
  component: React.ReactNode;
}

interface OnboardingTabsProps {
  tabs: Tab[];
  onComplete?: () => void;
}

export default function OnboardingTabs({ tabs, onComplete }: OnboardingTabsProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleNext = () => {
    if (currentTab < tabs.length - 1) {
      setCurrentTab(currentTab + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleTabClick = (index: number) => {
    setCurrentTab(index);
  };

  const colors = {
    darkBlue: "#1A3263",
    mediumBlue: "#547792",
    gold: "#FAB95B",
    cream: "#E8E2DB",
  };

  return (
    <div style={{ backgroundColor: colors.cream }} className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 text-right">
          <h1 style={{ color: colors.darkBlue }} className="text-3xl sm:text-4xl font-bold mb-2">
            إكمال إعداد حسابك
          </h1>
          <p style={{ color: colors.mediumBlue }} className="text-lg">
            7 خطوات لتجهيز متجرك
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 min-w-max pb-2">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(index)}
                className={`px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  index === currentTab
                    ? "text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                style={{
                  backgroundColor: index === currentTab ? colors.gold : undefined,
                  color: index === currentTab ? colors.darkBlue : undefined,
                }}
              >
                <span
                  className="text-xs font-bold px-2 py-1 rounded"
                  style={{
                    backgroundColor: index === currentTab ? colors.darkBlue : colors.mediumBlue,
                    color: colors.cream,
                  }}
                >
                  {index + 1}
                </span>
                <span className="text-sm">{tab.labelAr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${((currentTab + 1) / tabs.length) * 100}%`,
              backgroundColor: colors.gold,
            }}
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {React.cloneElement(tabs[currentTab].component as React.ReactElement<any>, {
            onNext: handleNext,
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center flex-row-reverse">
          <button
            onClick={handlePrev}
            disabled={currentTab === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-row-reverse"
            style={{
              backgroundColor: currentTab === 0 ? "#f0f0f0" : colors.cream,
              color: colors.darkBlue,
              border: `2px solid ${colors.mediumBlue}`,
            }}
          >
            السابق
            <ChevronLeft size={20} />
          </button>

          <div style={{ color: colors.mediumBlue }} className="text-sm font-semibold">
            {currentTab + 1} / {tabs.length}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg flex-row-reverse"
            style={{
              backgroundColor: colors.gold,
              color: colors.darkBlue,
            }}
          >
            {currentTab === tabs.length - 1 ? "إنهاء" : "التالي"}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
