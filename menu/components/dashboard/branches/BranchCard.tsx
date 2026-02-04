"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, MapPin, Phone } from "lucide-react";

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

interface BranchCardProps {
  branch: Branch;
  onEdit: (branch: Branch) => void;
  onToggleActive: (id: string) => void;
}

export function BranchCard({ branch, onEdit, onToggleActive }: BranchCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{branch.name}</h3>
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(branch)}
              className="gap-2"
            >
              <Edit className="w-4 h-4" />
              تعديل
            </Button>
          </div>

          {/* Details */}
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{branch.phone}</span>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{branch.detailedAddress}</span>
            </div>
            <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
              <p>الإحداثيات:</p>
              <p className="font-mono">
                {branch.latitude.toFixed(6)}, {branch.longitude.toFixed(6)}
              </p>
            </div>
            {branch.governorate && (
              <div className="text-xs">
                <span className="text-muted-foreground">المحافظة: </span>
                <span className="font-medium">{branch.governorate}</span>
              </div>
            )}
          </div>

          {/* Toggle Active */}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-muted-foreground">حالة الفرع</span>
            <Switch
              checked={branch.active}
              onCheckedChange={() => onToggleActive(branch.id)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
