# Installation Instructions

## Required Dependencies

To use the interactive map feature in the branches tab, you need to install Leaflet and its TypeScript types:

```bash
pnpm add leaflet
pnpm add -D @types/leaflet
```

Or with npm:

```bash
npm install leaflet
npm install --save-dev @types/leaflet
```

Or with yarn:

```bash
yarn add leaflet
yarn add -D @types/leaflet
```

## What's Included

### Interactive Map Component
- **Location**: `components/map/LocationPicker.tsx`
- **Features**:
  - Click on map to select location
  - Drag marker to adjust position
  - Search for locations by name
  - Automatic reverse geocoding (converts coordinates to address)
  - Arabic language support
  - Real-time coordinate updates

### Updated Components
- **PaymentTab** (now BranchesTab): `components/onboarding/tabs/PaymentTab.tsx`
  - Multiple branch management
  - Interactive map integration
  - Address auto-fill from map selection
  - Coordinate extraction

### Layout Updates
- **Layout**: `app/layout.tsx`
  - Added Leaflet CSS and JS from CDN
  - No build configuration needed

## How It Works

1. User clicks "اختر من الخريطة" button
2. Interactive map appears with search bar
3. User can:
   - Click anywhere on the map
   - Drag the marker
   - Search for a location
4. Selected location automatically fills:
   - Address field (in Arabic)
   - Latitude field
   - Longitude field

## Map Features

- **OpenStreetMap** tiles (free, no API key required)
- **Nominatim** geocoding service (free, no API key required)
- **Arabic language** support for addresses
- **Responsive** design
- **Loading states** for better UX

## Notes

- Map uses OpenStreetMap and Nominatim (free services)
- No API keys required
- Works offline after initial tile loading
- Coordinates are stored with 6 decimal precision
- Default location: Cairo, Egypt (30.0444, 31.2357)

## Troubleshooting

If you see "Leaflet is not defined" error:
1. Make sure Leaflet CSS and JS are loaded in layout.tsx
2. Clear your browser cache
3. Restart the development server

If map doesn't appear:
1. Check browser console for errors
2. Ensure you're not blocking external resources
3. Try a different browser
