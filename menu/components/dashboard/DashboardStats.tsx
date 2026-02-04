"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      title: "إجمالي الطلبات",
      value: "1,234",
      change: "+12%",
      icon: ShoppingCart,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "الإيرادات",
      value: "45,231 ر.س",
      change: "+8%",
      icon: DollarSign,
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "العملاء",
      value: "892",
      change: "+5%",
      icon: Users,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "معدل النمو",
      value: "23.5%",
      change: "+3%",
      icon: TrendingUp,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
