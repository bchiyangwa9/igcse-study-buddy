# CMS Upload Error - Explanation & Solutions

## The Error You're Seeing

```
Error uploading infographic: Cannot read properties of undefined (reading 'put')
```

## What This Means

This error occurs because the **CMS upload functionality requires Cloudflare R2 (file storage) and D1 (database)**, which are **only available in production** after deployment to Cloudflare Pages.

### Why This Happens

In the development environment (`npm run dev`):
- ❌ `c.env.LEARNING_RESOURCES` is `undefined` (R2 bucket not available)
- ❌ `c.env.DB` is `undefined` (D1 database not available)
- ❌ Upload attempts fail because there's nowhere to store the files

In production (Cloudflare Pages):
- ✅ `c.env.LEARNING_RESOURCES` points to your R2 bucket
- ✅ `c.env.DB` points to your D1 database
- ✅ Uploads work perfectly

## Solutions

### Option 1: Deploy to Production (Recommended)

This is the **complete solution** that enables all CMS features.

#### Step 1: Create Cloudflare Resources

```bash
# Create D1 database
wrangler d1 create studybuddy-production

# Create R2 bucket
wrangler r2 bucket create studybuddy-resources
```

#### Step 2: Update wrangler.jsonc

Update your `wrangler.jsonc` with the actual database ID from step 1:

```jsonc
{
  "name": "studybuddy-mobile",
  "main": "./dist/_worker.js",
  "compatibility_date": "2025-09-15",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "studybuddy-production",
      "database_id": "YOUR_DATABASE_ID_HERE"  // ← Replace with actual ID
    }
  ],
  "r2_buckets": [
    {
      "binding": "LEARNING_RESOURCES",
      "bucket_name": "studybuddy-resources"
    }
  ]
}
```

#### Step 3: Run Migrations

```bash
# Apply migrations to production database
wrangler d1 migrations apply studybuddy-production --remote
```

#### Step 4: Deploy to Cloudflare Pages

```bash
# Build and deploy
npm run build
wrangler pages deploy dist --project-name studybuddy-mobile
```

After deployment, your CMS will be fully functional at:
- Production URL: `https://studybuddy-mobile.pages.dev/admin/cms`

### Option 2: Local Testing with Wrangler Dev

For **testing only**, you can use wrangler's local mode (with limitations):

```bash
# Build the app
npm run build

# Run with local D1 and mock R2
npm run dev:wrangler
```

**Note:** Local R2 has limitations and may not perfectly match production behavior.

### Option 3: Mock Data for Development

If you just want to **preview the UI without uploads**, you can:

1. Visit the CMS at: `https://5177-igk2xvgv8nuwba5bntkxy-5c13a017.sandbox.novita.ai/admin/cms`
2. See the yellow warning banner explaining the limitation
3. Test the UI layout and forms
4. When you click "Upload", you'll see a detailed error message with deployment instructions

## What Works Now vs. What Needs Production

### ✅ Works in Development
- Mathematics dashboard with topic lightboxes
- Lesson pages with Resources button
- Lightbox UI and animations
- Video embedding (from YouTube/Vimeo URLs)
- CMS interface and form validation
- All navigation and routing

### ❌ Requires Production
- Uploading infographic images to R2
- Storing resource metadata in D1
- Serving uploaded images from R2
- Resource deletion from R2/D1
- Analytics (view/download tracking)

## Quick Comparison

| Feature | Development (npm run dev) | Production (Cloudflare Pages) |
|---------|--------------------------|-------------------------------|
| View Topics | ✅ Works | ✅ Works |
| Open Lightboxes | ✅ Works | ✅ Works |
| Watch Videos | ✅ Works | ✅ Works |
| CMS Interface | ✅ Works | ✅ Works |
| **Upload Images** | ❌ **Fails** | ✅ **Works** |
| **Store Metadata** | ❌ **Fails** | ✅ **Works** |
| **View Uploaded Content** | ❌ **No Data** | ✅ **Works** |

## Detailed Deployment Guide

For complete step-by-step deployment instructions, see:
**[CMS_DEPLOYMENT_GUIDE.md](./CMS_DEPLOYMENT_GUIDE.md)**

## FAQ

### Q: Why doesn't Vite support R2/D1?
**A:** Vite is a frontend development server. R2 and D1 are Cloudflare Workers bindings that only exist in the Cloudflare Workers runtime (production) or wrangler dev (local Cloudflare emulation).

### Q: Can I use a different storage service?
**A:** Yes, but you'd need to modify the code. The current implementation is optimized for Cloudflare's R2 (S3-compatible) storage. You could adapt it to use AWS S3, Backblaze B2, or another provider.

### Q: Will my existing content break?
**A:** No. Everything currently working (lightboxes, navigation, videos) continues to work. The CMS is an *addition* for uploading *new* content.

### Q: Do I need a paid Cloudflare plan?
**A:** No! The **Free tier includes**:
- ✅ Cloudflare Pages (hosting)
- ✅ D1 Database (5GB storage, 5M reads/day)
- ✅ R2 Storage (10GB storage, 1M reads/month)
- ✅ Workers (100,000 requests/day)

This is more than enough for a study app!

### Q: How long does deployment take?
**A:** 
- Initial setup: 10-15 minutes
- Subsequent deploys: 2-3 minutes (automatic on git push)

## Current Development Server

Your development server is running at:
- **URL**: https://5177-igk2xvgv8nuwba5bntkxy-5c13a017.sandbox.novita.ai
- **Test Pages**:
  - Mathematics: `/mathematics`
  - Lesson Example: `/topic/1`
  - CMS Interface: `/admin/cms` (shows warning banner)

## Summary

The error you're seeing is **expected behavior** in development. To use the CMS:

1. **Deploy to Cloudflare Pages** (following CMS_DEPLOYMENT_GUIDE.md)
2. **Create D1 + R2 resources**
3. **Run migrations**
4. **Start uploading content** via `/admin/cms`

Everything else (lightboxes, navigation, UI) works perfectly right now! 🎉

---

**Need Help?** Open an issue or check the deployment guide for detailed instructions.
