"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Settings, Edit, RefreshCw } from "lucide-react";
import { BranchEditDialog } from "./BranchEditDialog";

interface BranchActivationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function BranchActivationsDialog({ open, onOpenChange }: BranchActivationsDialogProps) {
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
      // Update existing branch
      setBranches(
        branches.map((branch) =>
          branch.id === updatedBranch.id ? updatedBranch : branch
        )
      );
    } else {
      // Add new branch
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
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl" dir="rtl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl flex items-center gap-2">
                <Settings className="w-5 h-5" />
                إدارة الأروال والتفعيلات
              </DialogTitle>
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
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Description */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                تفعيل الطلبات والخدمات ويتم التوصيل
              </p>
            </div>

            {/* Branches List */}
            <div className="space-y-3">
              {branches.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg mb-2">لا توجد فروع حالياً</p>
                  <p className="text-sm">انقر على "فرع جديد" لإضافة فرع</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {branches.map((branch) => (
                    <div
                      key={branch.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Branch Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{branch.name}</h3>
                            {branch.active ? (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                نشط
                              </span>
                            ) : (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                غير نشط
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>📞 {branch.phone}</p>
                            <p>📍 {branch.detailedAddress}</p>
                            <p className="text-xs">
                              الإحداثيات: {branch.latitude.toFixed(6)}, {branch.longitude.toFixed(6)}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditBranch(branch)}
                            className="gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            تعديل
                          </Button>
                          <div className="flex items-center gap-2 justify-end">
                            <span className="text-xs text-muted-foreground">الحالة</span>
                            <Switch
                              checked={branch.active}
                              onCheckedChange={() => toggleBranchActive(branch.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BranchEditDialog
        open={branchEditDialogOpen}
        onOpenChange={setBranchEditDialogOpen}
        branch={editingBranch}
        onSave={handleSaveBranch}
      />
    </>
  );
}
