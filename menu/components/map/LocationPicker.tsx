"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Search } from "lucide-react";

interface LocationPickerProps {
  onLocationSelect: (data: {
    address: string;
    latitude: number;
    longitude: number;
  }) => void;
  initialLat?: number;
  initialLng?: number;
}

export default function LocationPicker({
  onLocationSelect,
  initialLat = 30.0444,
  initialLng = 31.2357,
}: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    let mapInstance: any = null;
    let markerInstance: any = null;

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      // Check if map container already has a map
      if (mapRef.current && (mapRef.current as any)._leaflet_id) {
        return;
      }

      // Fix for default marker icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Initialize map
      mapInstance = L.map(mapRef.current!).setView([initialLat, initialLng], 13);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(mapInstance);

      // Add initial marker
      markerInstance = L.marker([initialLat, initialLng], {
        draggable: true,
      }).addTo(mapInstance);

      // Handle marker drag
      markerInstance.on("dragend", async () => {
        const position = markerInstance.getLatLng();
        await reverseGeocode(position.lat, position.lng);
      });

      // Handle map click
      mapInstance.on("click", async (e: any) => {
        const { lat, lng } = e.latlng;
        markerInstance.setLatLng([lat, lng]);
        await reverseGeocode(lat, lng);
      });

      setMap(mapInstance);
      setMarker(markerInstance);

      // Get initial address
      reverseGeocode(initialLat, initialLng);
    });

    // Cleanup
    return () => {
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
      }
      if (markerInstance) {
        markerInstance = null;
      }
    };
  }, []);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
      );
      const data = await response.json();

      const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

      onLocationSelect({
        address,
        latitude: lat,
        longitude: lng,
      });
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      onLocationSelect({
        address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        latitude: lat,
        longitude: lng,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !map) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&accept-language=ar&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);

        // Update map view and marker
        map.setView([latNum, lonNum], 15);
        if (marker) {
          marker.setLatLng([latNum, lonNum]);
        }

        await reverseGeocode(latNum, lonNum);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          placeholder="ابحث عن موقع..."
          className="w-full pr-10 pl-4 py-2 rounded-lg border-2 focus:outline-none transition-all text-right"
          style={{
            borderColor: "#547792",
            color: "#1A3263",
            direction: "rtl",
          }}
          dir="rtl"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-all"
        >
          <Search size={18} style={{ color: "#547792" }} />
        </button>
      </div>

      {/* Map Container */}
      <div className="relative rounded-lg overflow-hidden border-2" style={{ borderColor: "#547792" }}>
        <div ref={mapRef} style={{ height: "300px", width: "100%" }} />
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "#FAB95B" }} />
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="flex items-center gap-2 text-xs text-right" style={{ color: "#547792" }} dir="rtl">
        <MapPin size={14} />
        <p>اضغط على الخريطة أو اسحب العلامة لتحديد الموقع</p>
      </div>
    </div>
  );
}
