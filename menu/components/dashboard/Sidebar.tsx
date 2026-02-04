"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Menu,
  Tag,
  Package,
  Store,
  ChevronDown,
  ChevronRight,
  Settings,
  BarChart3,
  QrCode,
  MapPin,
  ShoppingCart,
  Archive,
  Grid3x3,
  LayoutGrid,
  DollarSign,
  Users,
  FileText,
  ChevronLeft,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
  isRTL?: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  href?: string;
  expandable?: boolean;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  href: string;
}

export function Sidebar({ className, isRTL = true }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const menuStructure: MenuItem[] = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      icon: Home,
      href: "/dashboard",
    },
    {
      id: "menu",
      label: "المنيو",
      icon: Menu,
      expandable: true,
      subItems: [
        { id: "categories", label: "الفئات", href: "/dashboard/categories" },
        { id: "products", label: "المنتجات", href: "/dashboard/products" },
      ],
    },
    {
      id: "offers",
      label: "العروض",
      icon: Tag,
      href: "/dashboard/offers",
    },
    {
      id: "e-menu",
      label: "المنيو الإلكتروني",
      icon: Store,
      expandable: true,
      subItems: [
        { id: "location", label: "تفاصيل مكانك", href: "/dashboard/location" },
        { id: "theme", label: "اختيار قالبك", href: "/dashboard/theme" },
        { id: "qr", label: "مولد QR", href: "/dashboard/qr" },
      ],
    },
    {
      id: "orders",
      label: "الطلبات",
      icon: ShoppingCart,
      expandable: true,
      subItems: [
        { id: "orders-list", label: "طلبات", href: "/dashboard/orders" },
        { id: "reservations", label: "الحجوزات", href: "/dashboard/reservations" },
      ],
    },
    {
      id: "inventory",
      label: "المخزون",
      icon: Archive,
      expandable: true,
      subItems: [
        { id: "inventory-list", label: "المخزون", href: "/dashboard/inventory" },
        { id: "recipes", label: "وصفات", href: "/dashboard/recipes" },
        { id: "movements", label: "حركات المخزون", href: "/dashboard/movements" },
      ],
    },
    {
      id: "tables",
      label: "الطاولات",
      icon: Grid3x3,
      href: "/dashboard/tables",
    },
    {
      id: "services",
      label: "الخدمات",
      icon: LayoutGrid,
      href: "/dashboard/services",
    },
    {
      id: "reports",
      label: "التقارير",
      icon: BarChart3,
      expandable: true,
      subItems: [
        { id: "revenue", label: "إيراد", href: "/dashboard/reports/revenue" },
        { id: "orders-report", label: "طلبات", href: "/dashboard/reports/orders" },
        { id: "financial", label: "المالية", href: "/dashboard/reports/financial" },
        { id: "customers", label: "العملاء", href: "/dashboard/reports/customers" },
        { id: "summary", label: "الملخص", href: "/dashboard/reports/summary" },
      ],
    },
    {
      id: "settings",
      label: "الإعدادات",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-l bg-slate-50/50 transition-all duration-300 overflow-hidden", // added overflow-hidden
        isRTL && "border-l-0 border-r",
        collapsed ? "w-16" : "w-64",
        className
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b bg-white px-4 shrink-0"> {/* added shrink-0 */}
        {!collapsed && (
          <h2 className="text-sm font-semibold text-slate-600">عام</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* ScrollArea now has min-h-0 to allow proper shrinking inside flex */}
      <ScrollArea className="flex-1 min-h-0 py-4">
        <div className="space-y-1 px-2">
          {menuStructure.map((item, index) => (
            <div key={item.id}>
              {/* Separator before certain sections */}
              {(item.id === "e-menu" || item.id === "orders" || item.id === "reports") && (
                <Separator className="my-3" />
              )}

              {/* Section Label */}
              {item.id === "e-menu" && !collapsed && (
                <div className="mb-2 mt-3 px-3 text-xs font-medium text-slate-400">
                  الموقع الإلكتروني
                </div>
              )}
              {item.id === "orders" && !collapsed && (
                <div className="mb-2 mt-3 px-3 text-xs font-medium text-slate-400">
                  المميزات
                </div>
              )}

              {/* Menu Item */}
              {item.href && !item.expandable ? (
                <Link href={item.href}>
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-between transition-all",
                      isRTL && "flex-row-reverse",
                      collapsed && "justify-center px-2",
                      pathname === item.href
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "hover:bg-slate-100"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className={cn("flex items-center gap-3", collapsed && "gap-0")}>
                      {item.icon && <item.icon className="h-5 w-5 shrink-0" />}
                      {!collapsed && <span className="text-sm">{item.label}</span>}
                    </span>
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between transition-all hover:bg-slate-100",
                      isRTL && "flex-row-reverse",
                      collapsed && "justify-center px-2"
                    )}
                    onClick={() => !collapsed && toggleItem(item.id)}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className={cn("flex items-center gap-3", collapsed && "gap-0")}>
                      {item.icon && <item.icon className="h-5 w-5 shrink-0" />}
                      {!collapsed && <span className="text-sm">{item.label}</span>}
                    </span>
                    {!collapsed && item.expandable && (
                      <span>
                        {expandedItems[item.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </Button>

                  {/* Sub Items */}
                  {!collapsed && item.expandable && expandedItems[item.id] && item.subItems && (
                    <div className={cn("mt-1 space-y-1 bg-slate-100/50 py-2", isRTL ? "pr-4" : "pl-4")}>
                      {item.subItems.map((subItem) => (
                        <Link key={subItem.id} href={subItem.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start text-sm transition-all",
                              isRTL && "justify-end",
                              pathname === subItem.href
                                ? "bg-white text-blue-600 font-medium shadow-sm"
                                : "hover:bg-white/50"
                            )}
                          >
                            {subItem.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}