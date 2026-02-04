"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { BranchCard } from "@/components/dashboard/branches/BranchCard";
import { BranchEditDialog } from "@/components/dashboard/location/BranchEditDialog";

interface Branch {
  id: string;
  name: string;
  phone: string;
  address: string;
  detailedAddress: string;
  latitude: number;
  longitude: number;
  active: boolean;
  deliveryRange: number;
  governorate: string;
}

export default function BranchesSettingsPage() {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: "1",
      name: "tt",
      phone: "01158879319",
      address: "Alexandria",
      detailedAddress: "Alexandria - Agamy - bitach",
      latitude: 30.8599598595602,
      longitude: 30.1391524428339,
      active: true,
      deliveryRange: 0,
      governorate: "الإسكندرية",
    },
    {
      id: "2",
      name: "الفرع الرئيسي",
      phone: "01234567890",
      address: "Cairo",
      detailedAddress: "Cairo - Nasr City - Abbas El Akkad",
      latitude: 30.0444,
      longitude: 31.2357,
      active: true,
      deliveryRange: 5,
      governorate: "القاهرة",
    },
  ]);

  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [branchEditDialogOpen, setBranchEditDialogOpen] = useState(false);

  const handleEditBranch = (branch: Branch) => {
    setEditingBranch(branch);
    setBranchEditDialogOpen(true);
  };

  const handleAddBranch = () => {
    setEditingBranch(null);
    setBranchEditDialogOpen(true);
  };

  const handleSaveBranch = (updatedBranch: Branch) => {
    if (editingBranch) {
      setBranches(
        branches.map((branch) =>
          branch.id === updatedBranch.id ? updatedBranch : branch
        )
      );
    } else {
      setBranches([...branches, updatedBranch]);
    }
  };

  const toggleBranchActive = (id: string) => {
    setBranches(
      branches.map((branch) =>
        branch.id === id ? { ...branch, active: !branch.active } : branch
      )
    );
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة الفروع</h1>
          <p className="text-sm text-muted-foreground mt-1">
            تفعيل الطلبات والخدمات ويتم التوصيل
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث
          </Button>
          <Button size="sm" onClick={handleAddBranch}>
            <Plus className="w-4 h-4 ml-2" />
            فرع جديد
          </Button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          يمكنك إدارة جميع الفروع من هنا، تفعيل وتعطيل الفروع، وتحديد نطاق التوصيل لكل فرع
        </p>
      </div>

      {/* Branches Grid */}
      {branches.length === 0 ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Plus className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold">لا توجد فروع حالياً</h3>
            <p className="text-muted-foreground">
              ابدأ بإضافة فرعك الأول لإدارة الطلبات والتوصيل
            </p>
            <Button onClick={handleAddBranch} className="mt-4">
              <Plus className="w-4 h-4 ml-2" />
              إضافة فرع جديد
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              onEdit={handleEditBranch}
              onToggleActive={toggleBranchActive}
            />
          ))}
        </div>
      )}

      <BranchEditDialog
        open={branchEditDialogOpen}
        onOpenChange={setBranchEditDialogOpen}
        branch={editingBranch}
        onSave={handleSaveBranch}
      />
    </div>
  );
}
