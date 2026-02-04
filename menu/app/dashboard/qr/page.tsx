import QRGenerator from "@/components/dashboard/QRGenerator";

export default function QRPage() {
  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">مولد QR احترافي</h1>
        <p className="mt-2 text-muted-foreground">
          أنشئ رموز QR مخصصة بتصميم احترافي لاستخدامك أو كتابتك من معلومات متقدمة
        </p>
      </div>
      <QRGenerator />
    </div>
  );
}
