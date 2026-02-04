# Supabase Storage Buckets Setup Guide

## Overview
This guide explains how to set up storage buckets for images and files in your Supabase project.

## Required Buckets

### 1. **restaurant-logos** (Public)
Stores restaurant logo images uploaded during onboarding (Tab 1).

**Configuration:**
- **Name:** `restaurant-logos`
- **Public:** Yes
- **File size limit:** 5MB
- **Allowed MIME types:** `image/png`, `image/jpeg`, `image/jpg`, `image/gif`, `image/webp`

**Folder Structure:**
```
restaurant-logos/
  └── {user_id}/
      └── logo.{ext}
```

### 2. **menu-items** (Public)
Stores menu item images.

**Configuration:**
- **Name:** `menu-items`
- **Public:** Yes
- **File size limit:** 5MB
- **Allowed MIME types:** `image/png`, `image/jpeg`, `image/jpg`, `image/gif`, `image/webp`

**Folder Structure:**
```
menu-items/
  └── {restaurant_id}/
      └── {item_id}.{ext}
```

### 3. **qr-codes** (Public)
Stores generated QR codes for tables and menus.

**Configuration:**
- **Name:** `qr-codes`
- **Public:** Yes
- **File size limit:** 1MB
- **Allowed MIME types:** `image/png`, `image/svg+xml`

**Folder Structure:**
```
qr-codes/
  └── {restaurant_id}/
      ├── menu-qr.png
      └── tables/
          └── table-{number}.png
```

### 4. **offers** (Public)
Stores promotional offer images.

**Configuration:**
- **Name:** `offers`
- **Public:** Yes
- **File size limit:** 5MB
- **Allowed MIME types:** `image/png`, `image/jpeg`, `image/jpg`, `image/gif`, `image/webp`

**Folder Structure:**
```
offers/
  └── {restaurant_id}/
      └── {offer_id}.{ext}
```

## Setup Instructions

### Step 1: Create Buckets via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket** for each bucket listed above
4. Configure each bucket with the settings specified

### Step 2: Set Up Storage Policies

For each bucket, create the following policies:

#### Policy 1: Public Read Access
```sql
-- Allow public to read files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'bucket-name-here');
```

#### Policy 2: Authenticated Users Can Upload
```sql
-- Allow authenticated users to upload their own files
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'bucket-name-here' 
  AND auth.role() = 'authenticated'
);
```

#### Policy 3: Users Can Update Their Own Files
```sql
-- Allow users to update their own files
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'bucket-name-here' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

#### Policy 4: Users Can Delete Their Own Files
```sql
-- Allow users to delete their own files
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'bucket-name-here' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### Step 3: Apply Policies to Each Bucket

Replace `'bucket-name-here'` with:
- `restaurant-logos`
- `menu-items`
- `qr-codes`
- `offers`

## Usage Examples

### Upload Logo (TypeScript)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function uploadLogo(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/logo.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('restaurant-logos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('restaurant-logos')
    .getPublicUrl(fileName);
  
  return publicUrl;
}
```

### Upload Menu Item Image
```typescript
async function uploadMenuItemImage(
  file: File, 
  restaurantId: string, 
  itemId: string
) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${restaurantId}/${itemId}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('menu-items')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('menu-items')
    .getPublicUrl(fileName);
  
  return publicUrl;
}
```

### Delete File
```typescript
async function deleteFile(bucket: string, filePath: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);
  
  if (error) throw error;
}
```

## File Size Limits

- **Logos:** 5MB max
- **Menu Items:** 5MB max
- **QR Codes:** 1MB max
- **Offers:** 5MB max

## Recommended Image Formats

- **Logos:** PNG (with transparency) or JPG
- **Menu Items:** JPG or WebP (for better compression)
- **QR Codes:** PNG or SVG
- **Offers:** JPG or WebP

## Image Optimization Tips

1. **Compress images** before upload using tools like TinyPNG or ImageOptim
2. **Use WebP format** for better compression and quality
3. **Resize images** to appropriate dimensions:
   - Logos: 512x512px
   - Menu items: 800x600px
   - Offers: 1200x630px
4. **Use lazy loading** for images in your frontend

## Security Considerations

1. **Validate file types** on the client and server
2. **Check file sizes** before upload
3. **Sanitize file names** to prevent path traversal
4. **Use authenticated uploads** to prevent abuse
5. **Implement rate limiting** for uploads

## Troubleshooting

### Issue: "Policy violation" error
**Solution:** Ensure RLS policies are correctly set up for the bucket.

### Issue: Files not appearing
**Solution:** Check if the bucket is set to public and policies allow SELECT.

### Issue: Upload fails
**Solution:** Verify file size limits and MIME types are correct.

## Additional Resources

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Storage Policies Guide](https://supabase.com/docs/guides/storage/security/access-control)
- [Image Optimization Best Practices](https://web.dev/fast/#optimize-your-images)
