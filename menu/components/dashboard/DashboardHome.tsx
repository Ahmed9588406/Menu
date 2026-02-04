"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, TrendingDown, MapPin, Package, DollarSign, ShoppingCart } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";

const statsData = [
  {
    title: "إيراد اليوم",
    value: "٠.٠٠",
    currency: "ج.م",
    change: "0.0%",
    isPositive: true,
    icon: DollarSign,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-500",
  },
  {
    title: "طلبات اليوم",
    value: "0",
    currency: "",
    change: "0.0%",
    isPositive: true,
    icon: ShoppingCart,
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50 to-orange-100",
    iconBg: "bg-amber-500",
  },
  {
    title: "طلبات قيد التنفيذ",
    value: "0",
    currency: "",
    change: "0.0%",
    isPositive: true,
    icon: Package,
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-500",
  },
  {
    title: "إجمالي الإيراد",
    value: "٠.٠٠",
    currency: "ج.م",
    change: "0.0%",
    isPositive: true,
    icon: TrendingUp,
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100",
    iconBg: "bg-emerald-500",
  },
];

const weeklyData = [
  { date: "26 يناير", orders: 0, revenue: 0 },
  { date: "27 يناير", orders: 0, revenue: 0 },
  { date: "28 يناير", orders: 0, revenue: 0 },
  { date: "29 يناير", orders: 0, revenue: 0 },
  { date: "30 يناير", orders: 0, revenue: 0 },
  { date: "31 يناير", orders: 0, revenue: 0 },
  { date: "1 فبراير", orders: 0, revenue: 0 },
];

const orderTypeData = [
  { type: "داخلي", orders: 0, fill: "#3b82f6" },
  { type: "تيك أواي", orders: 0, fill: "#f59e0b" },
  { type: "ديلفري", orders: 0, fill: "#8b5cf6" },
];

export function DashboardHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100" dir="rtl">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .stat-card {
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .chart-card {
          opacity: 0;
          transition: all 0.3s ease;
        }

        .chart-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
        }

        .icon-wrapper {
          transition: all 0.3s ease;
        }

        .stat-card:hover .icon-wrapper {
          transform: rotate(-5deg) scale(1.1);
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        .value-text {
          transition: all 0.3s ease;
        }

        .stat-card:hover .value-text {
          transform: scale(1.05);
        }
      `}</style>

      <div className="space-y-8 p-8">
        {/* Header */}
        <div className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">لوحة التحكم</h1>
          <p className="text-slate-600">نظرة عامة على الأداء والإحصائيات</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className={`stat-card relative overflow-hidden border-0 shadow-lg bg-gradient-to-br ${stat.bgGradient} animate-fadeInUp`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r shimmer-effect" style={{ backgroundImage: `linear-gradient(90deg, ${stat.gradient})` }} />
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-semibold text-slate-700">
                      {stat.title}
                    </CardTitle>
                    <div className={`icon-wrapper p-2.5 rounded-xl ${stat.iconBg} shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="value-text text-3xl font-bold text-slate-900 mb-3">
                    {stat.value} <span className="text-xl text-slate-700">{stat.currency}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {stat.isPositive ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm font-semibold ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-slate-500">مقارنة بالأمس</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue Comparison */}
          <Card className="chart-card border-0 shadow-lg bg-white animate-slideInRight" style={{ animationDelay: "0.6s" }}>
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                مقارنة ربح اليوم مقابل أمس
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 border border-blue-200">
                  <span className="text-xs font-semibold text-blue-700 block mb-1">اليوم</span>
                  <span className="text-2xl font-bold text-blue-900">٠.٠٠ ج.م</span>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 border border-slate-200">
                  <span className="text-xs font-semibold text-slate-700 block mb-1">أمس</span>
                  <span className="text-2xl font-bold text-slate-900">٠.٠٠ ج.م</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-lg bg-blue-50 px-3 py-2.5 border border-blue-100">
                  <div className="text-xs text-blue-700 font-medium mb-1">متوسط قيمة الطلب</div>
                  <div className="text-lg font-bold text-blue-900">٠.٠٠ ج.م</div>
                </div>
                <div className="rounded-lg bg-emerald-50 px-3 py-2.5 border border-emerald-100">
                  <div className="text-xs text-emerald-700 font-medium mb-1">معدل التسليم</div>
                  <div className="text-lg font-bold text-emerald-900">%0</div>
                </div>
                <div className="rounded-lg bg-red-50 px-3 py-2.5 border border-red-100">
                  <div className="text-xs text-red-700 font-medium mb-1">معدل الإلغاء</div>
                  <div className="text-lg font-bold text-red-900">%0</div>
                </div>
              </div>
              
              <div className="rounded-xl bg-slate-50 p-8 text-center border-2 border-dashed border-slate-200">
                <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-600">لا توجد بيانات متاحة حالياً</p>
              </div>
            </CardContent>
          </Card>

          {/* Branch Map */}
          <Card className="chart-card border-0 shadow-lg bg-white animate-slideInRight" style={{ animationDelay: "0.7s" }}>
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                خريطة الفروع
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-12 text-center border-2 border-dashed border-slate-200">
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center shadow-lg">
                  <MapPin className="h-10 w-10 text-emerald-600" />
                </div>
                <p className="text-base font-semibold text-slate-700 mb-1">لا توجد مواقع الفروع</p>
                <p className="text-sm text-slate-500">قم بإضافة مواقع الفروع لعرضها على الخريطة</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Order Type Distribution */}
          <Card className="chart-card border-0 shadow-lg bg-white animate-scaleIn" style={{ animationDelay: "0.8s" }}>
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                نوع الطلب (7 أيام)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer
                config={{
                  orders: {
                    label: "طلبات",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-72"
              >
                <BarChart data={orderTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="type" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="orders" 
                    fill="url(#colorGradient)" 
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Best Times */}
          <Card className="chart-card border-0 shadow-lg bg-white animate-scaleIn" style={{ animationDelay: "0.9s" }}>
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                أفضل الأوقات
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer
                config={{
                  orders: {
                    label: "طلبات",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-72"
              >
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 3 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Last 7 Days Orders */}
          <Card className="chart-card border-0 shadow-lg bg-white animate-fadeInUp" style={{ animationDelay: "1s" }}>
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                طلبات آخر 7 أيام
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer
                config={{
                  orders: {
                    label: "طلبات",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-72"
              >
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#areaGradient)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Product Performance */}
          <Card className="chart-card border-0 shadow-lg bg-white animate-fadeInUp" style={{ animationDelay: "1.1s" }}>
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                أداء المنتجات (اليوم)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-12 text-center border-2 border-dashed border-slate-200">
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center shadow-lg">
                  <Package className="h-10 w-10 text-emerald-600" />
                </div>
                <p className="text-base font-semibold text-slate-700 mb-1">لا توجد بيانات</p>
                <p className="text-sm text-slate-500">ستظهر بيانات أداء المنتجات هنا</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Summary */}
        <Card className="chart-card border-0 shadow-lg bg-white animate-fadeInUp" style={{ animationDelay: "1.2s" }}>
          <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              ملخص أيام الأسبوع
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer
              config={{
                revenue: {
                  label: "إيرادات",
                  color: "hsl(var(--chart-4))",
                },
                orders: {
                  label: "طلبات",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-80"
            >
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fill="url(#ordersGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}