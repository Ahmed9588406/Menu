"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface LocationLinkCardProps {
  locationUrl: string;
  domain: string;
  onLocationUrlChange: (url: string) => void;
}

export function LocationLinkCard({
  locationUrl,
  domain,
  onLocationUrlChange,
}: LocationLinkCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">رابط الموقع</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">https://</span>
            <Input
              value={locationUrl}
              onChange={(e) => onLocationUrlChange(e.target.value)}
              className="flex-1"
            />
            <span className="text-gray-600">.{domain}</span>
          </div>
          <a
            href={`https://${locationUrl}.${domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline block"
          >
            https://{locationUrl}.{domain} ↗
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
