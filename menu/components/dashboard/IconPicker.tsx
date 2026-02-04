"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Verified Gi icons from react-icons/gi [web:14]
import {
  GiKnifeFork,
  GiHamburger,
  GiPizzaSlice,
  GiSandwich,
  GiBread,
  GiChickenOven,
  GiChickenLeg,
  GiBarbecue,
  GiSteak,
  GiFishCooked,
  GiShrimp,
  GiSushis,
  GiNoodles,
  GiHotMeal,
  GiTomato,
  GiCarrot,
  GiWatermelon,
  GiIceCreamCone,
  GiDonut,
  GiCookie,
  GiCupcake,
  GiCoffeeCup,
  GiSodaCan,
  GiOrange,
  GiWaterBottle,
  GiFriedEggs,
  GiCroissant,
  GiHotDog,
  GiFrenchFries,
  GiPotato,
  GiMeat,
  GiCoffeeBeans,
  GiChocolateBar,
  GiCakeSlice,
  GiGrapple,
  GiBanana,
  GiGrapes,
  GiStrawberry,
} from "react-icons/gi";
// Verified Fa icons [web:14][web:21]
import { FaPizzaSlice, FaBirthdayCake, FaMugHot, FaCoffee } from "react-icons/fa";

interface IconPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectIcon: (iconName: string, iconComponent: any) => void;
  selectedIcon?: string;
}

// Verified food icons only (removed invalid ones like GiTacos)
const foodIcons = [
  { name: "شوكة وسكينة", icon: "GiKnifeFork", component: GiKnifeFork },
  { name: "برجر", icon: "GiHamburger", component: GiHamburger },
  { name: "بيتزا", icon: "GiPizzaSlice", component: GiPizzaSlice },
  { name: "شريحة بيتزا", icon: "FaPizzaSlice", component: FaPizzaSlice },
  { name: "ساندويتش", icon: "GiSandwich", component: GiSandwich },
  { name: "خبز", icon: "GiBread", component: GiBread },
  { name: "دجاج", icon: "GiChickenOven", component: GiChickenOven },
  { name: "باكيت دجاج", icon: "GiChickenLeg", component: GiChickenLeg },
  { name: "باربكيو", icon: "GiBarbecue", component: GiBarbecue },
  { name: "ستيك", icon: "GiSteak", component: GiSteak },
  { name: "سمك", icon: "GiFishCooked", component: GiFishCooked },
  { name: "جمبري", icon: "GiShrimp", component: GiShrimp },
  { name: "سوشي", icon: "GiSushis", component: GiSushis },
  { name: "نودلز", icon: "GiNoodles", component: GiNoodles },
  { name: "حساء", icon: "GiHotMeal", component: GiHotMeal },
  { name: "سلطة", icon: "GiTomato", component: GiTomato },
  { name: "خضروات", icon: "GiCarrot", component: GiCarrot },
  { name: "فواكه", icon: "GiWatermelon", component: GiWatermelon },
  { name: "تفاح", icon: "GiApple", component: GiGrapple },
  { name: "موز", icon: "GiBanana", component: GiBanana },
  { name: "عنب", icon: "GiGrapes", component: GiGrapes },
  { name: "فراولة", icon: "GiStrawberry", component: GiStrawberry },
  { name: "آيس كريم", icon: "GiIceCreamCone", component: GiIceCreamCone },
  { name: "كيك", icon: "FaBirthdayCake", component: FaBirthdayCake },
  { name: "شريحة كيك", icon: "GiCakeSlice", component: GiCakeSlice },
  { name: "دونات", icon: "GiDonut", component: GiDonut },
  { name: "كوكيز", icon: "GiCookie", component: GiCookie },
  { name: "حلويات", icon: "GiCupcake", component: GiCupcake },
  { name: "شوكولاتة", icon: "GiChocolateBar", component: GiChocolateBar },
  { name: "قهوة", icon: "GiCoffeeCup", component: GiCoffeeCup },
  { name: "قهوة 2", icon: "FaCoffee", component: FaCoffee },
  { name: "حبوب قهوة", icon: "GiCoffeeBeans", component: GiCoffeeBeans },
  { name: "شاي", icon: "FaMugHot", component: FaMugHot },
  { name: "عصير", icon: "GiSodaCan", component: GiSodaCan },
  { name: "برتقال", icon: "GiOrange", component: GiOrange },
  { name: "ماء", icon: "GiWaterBottle", component: GiWaterBottle },
  { name: "بيض", icon: "GiFriedEggs", component: GiFriedEggs },
  { name: "كرواسون", icon: "GiCroissant", component: GiCroissant },
  { name: "هوت دوج", icon: "GiHotDog", component: GiHotDog },
  { name: "بطاطس مقلية", icon: "GiFrenchFries", component: GiFrenchFries },
  { name: "بطاطس", icon: "GiPotato", component: GiPotato },
  { name: "لحم", icon: "GiMeat", component: GiMeat },
];

export function IconPicker({ open, onOpenChange, onSelectIcon, selectedIcon }: IconPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIcons = foodIcons.filter((icon) =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectIcon = (iconName: string, iconComponent: any) => {
    onSelectIcon(iconName, iconComponent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-white flex flex-col" dir="rtl">
        <DialogHeader className="bg-white flex-shrink-0">
          <DialogTitle className="text-right text-xl text-slate-900">مكتبة أيقونات الفئات</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 bg-white flex-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="relative flex-shrink-0">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="ابحث باسم الأيقونة أو نوع الأكل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 bg-white border-slate-300"
            />
          </div>

          {/* Icons Grid - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="grid grid-cols-4 gap-3 pr-4">
              {filteredIcons.map((icon) => {
                const IconComponent = icon.component;
                
                return (
                  <button
                    key={icon.icon}
                    onClick={() => handleSelectIcon(icon.icon, IconComponent)}
                    className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-blue-500 hover:bg-blue-50 bg-white ${
                      selectedIcon === icon.icon
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200"
                    }`}
                  >
                    <IconComponent className="h-8 w-8 text-slate-700" />
                    <span className="text-xs text-slate-600 text-center">{icon.name}</span>
                  </button>
                );
              })}
            </div>
            
            {filteredIcons.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 bg-white">
                <p className="text-slate-500">لم يتم العثور على أيقونات</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
