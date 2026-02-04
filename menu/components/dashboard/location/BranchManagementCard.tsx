"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { TaxRegistryDialog } from "./TaxRegistryDialog";
import { useRouter } from "next/navigation";

export function BranchManagementCard() {
  const [taxDialogOpen, setTaxDialogOpen] = useState(false);
  const router = useRouter();

  const handleNavigateToBranches = () => {
    router.push("/dashboard/branches");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">الفروع</CardTitle>
        <CardDescription>إدارة العناوين والخدمات تتم من هنا</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-between p-3 h-auto"
            onClick={handleNavigateToBranches}
          >
            <span className="text-sm font-medium">إدارة الأروال والتفعيلات</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              تفعيل الطلبات والخدمات ويتم التوصيل
            </p>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setTaxDialogOpen(true)}
            >
              <Plus className="w-4 h-4 ml-2" />
              السجل الضريبي
            </Button>
          </div>
        </div>
      </CardContent>

      <TaxRegistryDialog open={taxDialogOpen} onOpenChange={setTaxDialogOpen} />
    </Card>
  );
}
