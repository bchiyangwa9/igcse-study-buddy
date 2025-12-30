# Content Management System - Deployment Guide

## Overview

This guide covers the complete deployment process for the Study Buddy CMS with Cloudflare R2 and D1 integration.

## Prerequisites

- Cloudflare account with Pages and Workers enabled
- Wrangler CLI installed (`npm install -g wrangler`)
- GitHub repository access

## Part 1: Cloudflare Setup

### 1. Create D1 Database

```bash
# Create the D1 database
wrangler d1 create studybuddy-production

# Output will show database_id - copy this!
# Example: database_id: "abc123-def456-ghi789"
```

Update `wrangler.jsonc` with the database_id:
```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "studybuddy-production",
    "database_id": "YOUR_DATABASE_ID_HERE"  // Replace this
  }
]
```

### 2. Run Database Migrations

```bash
# Run the main curriculum migration
wrangler d1 execute studybuddy-production --file=./migrations/0010_simple_curriculum.sql --remote

# Run the learning resources migration
wrangler d1 execute studybuddy-production --file=./migrations/0020_learning_resources.sql --remote
```

### 3. Create R2 Bucket

```bash
# Create R2 bucket for production
wrangler r2 bucket create studybuddy-resources

# Create R2 bucket for preview/development
wrangler r2 bucket create studybuddy-resources-preview
```

The buckets are already configured in `wrangler.jsonc`!

### 4. Set Environment Variables (Optional)

```bash
# Set admin credentials (optional - for future authentication)
wrangler pages project create studybuddy-mobile

# Add secrets
wrangler pages secret put ADMIN_USERNAME
wrangler pages secret put ADMIN_PASSWORD_HASH
```

## Part 2: Deploy to Cloudflare Pages

### Option A: Deploy via GitHub (Recommended)

1. **Push to GitHub** (already done via PR)
2. **Connect to Cloudflare Pages:**
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect your GitHub repository
   - Select the repository: `igcse-study-buddy`
   - Select branch: `main` (after merging PR)

3. **Configure Build Settings:**
   ```
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

4. **Add Environment Variables:**
   - Go to Settings → Environment variables
   - Add the D1 binding (should auto-detect)
   - Add the R2 binding (should auto-detect)

5. **Deploy:**
   - Click "Save and Deploy"
   - Wait for deployment to complete

### Option B: Deploy via Wrangler CLI

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=studybuddy-mobile
```

## Part 3: Post-Deployment Setup

### 1. Verify Deployment

Visit your deployment URL (e.g., `https://studybuddy-mobile.pages.dev`)

Test these pages:
- ✅ `/mathematics` - Dashboard with topic lightboxes
- ✅ `/topic/1` - Lesson with Resources button
- ✅ `/admin/cms` - Admin CMS (should load)

### 2. Test Database Connection

```bash
# Check if tables exist
wrangler d1 execute studybuddy-production --command="SELECT name FROM sqlite_master WHERE type='table';" --remote

# Should show:
# - topics
# - lessons
# - resource_types
# - learning_resources
# - resource_views
# - resource_downloads
# - admin_logs
```

### 3. Test R2 Connection

The R2 bucket will be tested when you upload your first resource via CMS.

## Part 4: Upload Content via CMS

### 1. Access the CMS

Navigate to: `https://your-domain.pages.dev/admin/cms`

### 2. Upload Your First Infographic

1. Click **Infographics** tab
2. Select a **Topic** (e.g., Topic 1)
3. Select **Resource Type** (e.g., Key Concepts)
4. Enter **Title**: "Number Operations - Key Concepts"
5. Enter **Description**: "Visual summary of number operations"
6. **Drag and drop** or **browse** for your image file
7. Preview appears below
8. Click **Upload Infographic**
9. Success message confirms upload!

### 3. Add Your First Video

1. Click **Videos** tab
2. Select a **Topic** (e.g., Topic 1)
3. Select **Video Type** (e.g., Introduction)
4. Enter **Title**: "Introduction to Number Operations"
5. Enter **Description**: "Overview of basic number operations"
6. Select **Platform**: YouTube
7. Enter **YouTube URL** or **Video ID**
8. Enter **Duration** in minutes (e.g., 8)
9. Click **Save Video**
10. Success!

### 4. Verify Resources in Lesson

1. Go to `/topic/1`
2. Click the purple **Resources** button
3. Your uploaded infographic and video should appear!
4. Click to view in full-screen lightbox

## Part 5: Content Upload Best Practices

### Infographic Guidelines

**Recommended Specifications:**
- **Format**: PNG or JPG
- **Size**: Max 5MB (will be enforced)
- **Dimensions**: 1200x900px or 1600x1200px (4:3 ratio)
- **Resolution**: 72-150 DPI
- **Color**: RGB color space

**Content Recommendations:**
- Clear, readable fonts (minimum 16pt)
- High contrast colors
- Proper heading hierarchy
- Step-by-step numbering
- Visual diagrams and examples
- Professional design

### Video Guidelines

**YouTube Videos:**
- Create educational playlists per topic
- Use clear video titles
- Add timestamps in description
- Enable closed captions
- Set to "Unlisted" if needed

**Video Duration Recommendations:**
- Introduction: 5-10 minutes
- Worked Examples: 10-15 minutes
- Practice Problems: 12-20 minutes

## Part 6: Content Organization Strategy

### Recommended Upload Order

**Phase 1: Core Topics (1-5)**
1. Upload Key Concepts infographic
2. Upload Formula Sheet
3. Add Introduction video
4. Add Worked Examples video
5. Test in lesson lightbox

**Phase 2: Expand Coverage (6-21)**
- Repeat for each topic
- Prioritize high-demand topics
- Gather student feedback

**Phase 3: Advanced Resources**
- Add Study Tips infographics
- Add Practice Problems videos
- Add PDF worksheets (when implemented)

### Content Checklist per Topic

- [ ] Key Concepts Infographic
- [ ] Formula Sheet Infographic  
- [ ] Worked Examples Infographic
- [ ] Study Tips Infographic
- [ ] Introduction Video
- [ ] Worked Examples Video
- [ ] Practice Problems Video

## Part 7: Monitoring and Analytics

### Check Upload Status

Go to `/admin/cms` → **Manage** tab:
- View all uploaded resources
- See topic coverage
- Edit or delete resources
- Track upload history

### Database Queries for Analytics

```bash
# Count resources per topic
wrangler d1 execute studybuddy-production --command="
  SELECT topic_id, COUNT(*) as resource_count 
  FROM learning_resources 
  GROUP BY topic_id;" --remote

# Most viewed resources
wrangler d1 execute studybuddy-production --command="
  SELECT lr.title, lr.views_count 
  FROM learning_resources lr 
  ORDER BY lr.views_count DESC 
  LIMIT 10;" --remote

# Most downloaded resources
wrangler d1 execute studybuddy-production --command="
  SELECT lr.title, lr.downloads_count 
  FROM learning_resources lr 
  ORDER BY lr.downloads_count DESC 
  LIMIT 10;" --remote
```

## Part 8: Troubleshooting

### Issue: Images Not Displaying

**Check:**
1. R2 bucket is created
2. R2 binding is correct in wrangler.jsonc
3. Image was successfully uploaded (check Manage tab)
4. Browser console for errors

**Fix:**
```bash
# Verify R2 bucket exists
wrangler r2 bucket list

# Check image URL endpoint
curl https://your-domain.pages.dev/api/resources/image/1
```

### Issue: Videos Not Playing

**Check:**
1. Video URL is correct
2. YouTube video is public or unlisted (not private)
3. Embed code is generated correctly

**Fix:**
- Test video URL directly in browser
- Try different video platform (Vimeo)
- Check browser console for embed errors

### Issue: CMS Upload Fails

**Check:**
1. File size (must be < 5MB)
2. File type (JPG, PNG, GIF only)
3. Network connection
4. Browser console for errors

**Debug:**
```bash
# Check D1 connection
wrangler d1 execute studybuddy-production --command="SELECT 1;" --remote

# Check R2 connection
wrangler r2 bucket list
```

## Part 9: Backup and Maintenance

### Backup Database

```bash
# Export all resources
wrangler d1 export studybuddy-production --output=backup.sql --remote
```

### Backup R2 Files

Use Cloudflare dashboard or R2 API to download all objects in bucket.

### Update Schema

If you need to add new features:
```bash
# Create new migration file
touch migrations/0030_new_feature.sql

# Apply migration
wrangler d1 execute studybuddy-production --file=./migrations/0030_new_feature.sql --remote
```

## Part 10: Testing Checklist

### Before Going Live

- [ ] All 21 topics have at least 1 resource
- [ ] Infographics display correctly
- [ ] Videos play without errors
- [ ] Lightbox animations work smoothly
- [ ] Mobile responsive design works
- [ ] CMS is accessible and functional
- [ ] Database queries are efficient
- [ ] R2 storage is optimized
- [ ] Error handling works properly
- [ ] Analytics tracking functions

### User Acceptance Testing

- [ ] Students can browse topics
- [ ] Lightboxes open and close properly
- [ ] Resources load quickly
- [ ] Download links work
- [ ] Videos autoplay when needed
- [ ] Keyboard navigation works (Escape key)
- [ ] Mobile experience is smooth

## Support and Documentation

**Repository:** https://github.com/bchiyangwa9/igcse-study-buddy

**Pull Request:** https://github.com/bchiyangwa9/igcse-study-buddy/pull/1

**Development Server:** https://5174-igk2xvgv8nuwba5bntkxy-5c13a017.sandbox.novita.ai

**Key Routes:**
- `/mathematics` - Dashboard with lightboxes
- `/topic/:id` - Lesson with resources (1-21)
- `/admin/cms` - Content management system

**API Documentation:**
- POST `/api/admin/resources/infographic`
- POST `/api/admin/resources/video`
- GET `/api/admin/resources/list`
- DELETE `/api/admin/resources/:id`
- GET `/api/resources/topic/:topicId`
- GET `/api/resources/image/:id`

## Next Steps

1. **Merge PR** on GitHub
2. **Deploy** to Cloudflare Pages
3. **Run migrations** on D1
4. **Create R2 buckets**
5. **Upload content** via CMS
6. **Test thoroughly**
7. **Launch** to students! 🎓✨

---

**Questions or Issues?**
Refer to the repository README or create an issue on GitHub.

**Happy Content Creating!** 📚🎨🎥
