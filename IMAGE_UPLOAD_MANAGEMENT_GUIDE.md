# Five Star Driving School - Image Upload & Management Guide

## Overview
This guide provides comprehensive instructions for uploading, managing, and replacing images on the Five Star Driving School platform. Follow these guidelines to maintain consistent quality, optimize performance, and ensure seamless website functionality.

---

## 1. IMAGE FORMAT SPECIFICATIONS

### Supported Formats
| Format | Use Case | Compression | Notes |
|--------|----------|-------------|-------|
| **WebP** | Primary format (all images) | Excellent (20-30% smaller) | Automatic conversion by Next.js |
| **JPEG/JPG** | Fallback for older browsers | Good (8-12 quality loss) | Maximum 85% quality |
| **PNG** | Graphics with transparency | Poor (larger files) | Only use for logos/icons |
| **AVIF** | High-quality, modern devices | Excellent (up to 50% smaller) | Automatic format selection |

### Format Guidelines by Category
- **Vehicle Photos**: WebP/JPEG (85% quality recommended)
- **Gallery Thumbnails**: WebP/JPEG (60-70% quality)
- **Hero/Featured Images**: WebP/JPEG (90% quality)
- **Team Photos**: WebP/JPEG (80% quality)
- **Icons/Logos**: PNG with transparency

---

## 2. IMAGE SIZE SPECIFICATIONS

### Maximum File Sizes
\`\`\`
Original Upload: 8-15 MB (auto-optimized to 200-800 KB)
Hero Images: 1920 x 1080 px (16:9 aspect ratio)
Gallery Cards: 1200 x 900 px (4:3 aspect ratio)
Thumbnails: 400 x 300 px (4:3 aspect ratio)
Full-width: 2400 x 1600 px (maximum, will be auto-scaled)
\`\`\`

### Recommended Dimensions by Device
\`\`\`
Mobile:  640px wide × aspect ratio maintained
Tablet:  1024px wide × aspect ratio maintained
Desktop: 1920px wide × aspect ratio maintained
4K:      2560px+ wide × aspect ratio maintained
\`\`\`

### Aspect Ratios by Use Case
- **Hero/Featured**: 16:9 (landscape)
- **Gallery Cards**: 4:3 (landscape)
- **Thumbnails**: 1:1 (square)
- **Portrait/Team**: 3:4 (portrait)

---

## 3. DIRECTORY STRUCTURE & NAMING CONVENTIONS

### Current Directory Organization
\`\`\`
public/images/
├── dji-*.jpeg          # Aerial/drone photos
├── img-*.jpg           # General images
├── mg-*.jpg/.jpeg      # Professional vehicle photos
└── placeholder.*       # Fallback images
\`\`\`

### File Naming Convention
**Format**: `[source]-[subject]-[angle].ext`

Examples:
\`\`\`
mg-0050.jpeg           # MG (photographer) - 0050 (sequence) - vehicle photo
dji-0268.jpeg          # DJI (drone) - 0268 (sequence) - aerial photo
img-2015.jpg           # IMG (general) - 2015 (sequence) - general image
fs-fleet-lineup.jpg    # FS (Five Star) - specific identifier
\`\`\`

### Naming Best Practices
- Use lowercase letters and numbers only
- Replace spaces with hyphens
- Use sequential numbers for series (0001, 0002, etc.)
- Keep filenames under 50 characters
- Use descriptive prefixes: `fs-`, `fleet-`, `vehicle-`, `team-`, `facility-`

---

## 4. IMAGE UPLOAD WORKFLOW

### Step 1: Prepare Your Images
\`\`\`
1. Export/save images at recommended dimensions
2. Compress using appropriate tool:
   - TinyPNG/TinyJPG (online)
   - ImageOptim (Mac)
   - FileOptimizer (Windows)
   - GIMP (free, cross-platform)
3. Convert to WebP format (recommended)
4. Name files according to naming convention
5. Organize by category (if uploading many)
\`\`\`

### Step 2: Upload Images to Vercel Blob Storage
\`\`\`
1. Navigate to project settings in Vercel
2. Go to Storage → Blob Storage
3. Upload files using Vercel dashboard
4. Record the returned blob URLs
5. Note the exact filename and path
\`\`\`

### Step 3: Update Gallery Configuration
\`\`\`
Location: /lib/gallery-config.ts

1. Open the gallery config file
2. Add new entry to GALLERY_IMAGES array:

{
  id: "vehicles-fleet-new",
  src: "/images/fs-fleet-2024.jpg",
  title: "New Fleet Photo",
  description: "Description of the image",
  category: "vehicles",
  location: "Location name",
  featured: false,
  likes: 0,
  views: 0,
  date: "2024-01-22",
  tags: ["fleet", "vehicles", "training"]
}

3. Save the file
4. Verify in local dev environment
5. Deploy changes
\`\`\`

### Step 4: Verification
\`\`\`
1. Clear browser cache (Ctrl+Shift+Delete)
2. Access website in incognito/private mode
3. Check that image loads correctly
4. Verify mobile responsiveness
5. Test on multiple devices if possible
\`\`\`

---

## 5. REPLACING EXISTING IMAGES

### Seamless Replacement Process

#### Option A: Replace with Same Filename (Recommended)
\`\`\`
1. Prepare new image with identical dimensions
2. Upload to Vercel Blob with SAME filename
3. Force browser cache clear on CDN
4. No config changes needed - URL remains the same
5. Change propagates within 5-10 minutes

Pros: No code changes, instant propagation
Cons: Requires same filename and path
\`\`\`

#### Option B: Update with New Filename
\`\`\`
1. Prepare new image
2. Upload to Vercel Blob with new filename
3. Update /lib/gallery-config.ts with new src path
4. Update metadata (date, title, description if needed)
5. Commit and deploy changes
6. Old image will be replaced in all views

Pros: Keeps version history
Cons: Requires config update and deployment
\`\`\`

#### Option C: Batch Replace Multiple Images
\`\`\`
1. Prepare all new images
2. Upload all files to Vercel Blob
3. Update config file with all new entries
4. Test in staging environment first
5. Deploy to production
6. Monitor performance for 24 hours
\`\`\`

---

## 6. DELETING IMAGES

### Before Deletion Checklist
\`\`\`
☐ Backup the original image file
☐ Check where image is used:
  - Gallery config
  - Hero component
  - Team section
  - Gallery showcase
  - Photo gallery viewer
☐ Verify no active references in code
☐ Check analytics for views/engagement
☐ Communicate plan to team
☐ Plan deployment window
\`\`\`

### Safe Deletion Process

#### Step 1: Remove from Configuration
\`\`\`
In /lib/gallery-config.ts:
1. Find the image entry
2. Comment it out (don't delete yet):

// ARCHIVED: {
//   id: "old-image",
//   src: "/images/old-image.jpg",
//   ...
// }

3. Save changes
\`\`\`

#### Step 2: Update All References
Search codebase for any hardcoded references:
\`\`\`bash
# Check all components
grep -r "old-image" components/
grep -r "old-image" app/

# Update any direct references
# Update: components/video-hero.tsx
# Update: components/gallery-showcase.tsx
\`\`\`

#### Step 3: Deploy Changes
\`\`\`
1. Commit changes with message: "Remove old-image from gallery"
2. Deploy to staging first
3. Verify website functions correctly
4. Deploy to production
5. Monitor for 24 hours
\`\`\`

#### Step 4: Remove from Storage
\`\`\`
1. Wait 48 hours after deployment (caching buffer)
2. Log into Vercel Blob Storage
3. Delete the image file
4. Verify deletion completed
5. Update deletion log
\`\`\`

### Permanent Deletion Log
Keep a record of deleted images for audit purposes:
\`\`\`
Date: 2024-01-22
Filename: old-image.jpg
Reason: Outdated photo, replaced with newer version
Size: 1.2 MB
Views: 156
Archived: Yes (backup stored locally)
\`\`\`

---

## 7. BULK IMAGE OPERATIONS

### Uploading Large Photo Sets (10+ images)

#### Pre-Upload Checklist
\`\`\`
☐ All images processed and compressed
☐ Naming convention applied consistently
☐ Metadata prepared in spreadsheet
☐ Backup copies created
☐ Quality review completed
☐ Team approval obtained
\`\`\`

#### Upload Process
\`\`\`
1. Create batch upload in Vercel:
   - Upload all files with consistent naming
   - Total batch size: max 50 MB
   - Monitor upload progress
   
2. Document in spreadsheet:
   - Filename
   - Title
   - Description
   - Category
   - Location
   - Featured (yes/no)
   - Date taken
   - Tags
   
3. Generate config entries from spreadsheet
4. Add to /lib/gallery-config.ts in alphabetical order
5. Deploy in staging environment
6. Perform quality assurance:
   - Check all images load correctly
   - Verify responsive display on mobile/tablet/desktop
   - Test gallery navigation
   - Check performance metrics
7. Deploy to production
\`\`\`

#### Post-Upload Verification
\`\`\`
Task                          | Check  | Notes
------------------------------|--------|-------------------
All images visible            | ☐      | Check gallery page
Mobile responsiveness         | ☐      | Test on phone
Thumbnail generation          | ☐      | Verify in gallery
Lazy loading working          | ☐      | Use DevTools Network
Metadata displays correctly   | ☐      | Title, description
Performance acceptable        | ☐      | Page load < 3s
Analytics tracking           | ☐      | Views counter works
SEO metadata                 | ☐      | Alt text present
\`\`\`

---

## 8. CONSTRAINTS & REQUIREMENTS

### System Constraints
\`\`\`
Maximum images in gallery:      1000 (performance tested)
Maximum concurrent uploads:     10 per minute
Maximum single file size:       15 MB (auto-optimized)
Cache TTL for images:          1 year (immutable)
CDN propagation time:          5-10 minutes
Rollback window:               48 hours
\`\`\`

### Technical Requirements
\`\`\`
Browser Support:
  - Chrome/Edge 90+
  - Firefox 88+
  - Safari 14+
  - Mobile browsers 2021+

Required Permissions:
  - Vercel Blob Storage access
  - Code repository write access
  - Staging environment access
  - Production deployment access
\`\`\`

### Performance Requirements
\`\`\`
Target Metrics:
  - Hero image load time: < 1 second
  - Gallery card load time: < 500 ms
  - Thumbnail load time: < 300 ms
  - Full gallery page load: < 3 seconds
  - LCP (Largest Contentful Paint): < 2.5s
  - CLS (Cumulative Layout Shift): < 0.1
\`\`\`

---

## 9. ZERO-DOWNTIME REPLACEMENT STRATEGY

### Seamless Image Transition Process
\`\`\`
Timeline: 15 minutes from start to finish

T-0:00    Prepare new images + backup originals
T-0:05    Upload images to Vercel Blob
T-0:10    Update config file and test locally
T-0:12    Deploy to staging, verify everything
T-0:13    Deploy to production
T-0:14    Monitor analytics dashboard
T-0:15    Verify all changes live
\`\`\`

### Immediate Rollback Plan (if issues occur)
\`\`\`
If website breaks or images don't load:

1. Check CDN cache status
   - Vercel Status page
   - CloudFlare dashboard
   
2. Clear browser cache:
   - Ctrl+Shift+Delete (Windows)
   - Cmd+Shift+Delete (Mac)
   
3. Revert to previous commit:
   git revert HEAD
   git push origin main
   
4. Expected recovery time: 2-5 minutes

5. Root cause analysis:
   - Check file paths
   - Verify image dimensions
   - Review config syntax
   - Check for typos in src URLs
\`\`\`

---

## 10. IMAGE QUALITY & CONSISTENCY STANDARDS

### Quality Checklist Before Upload
\`\`\`
Visual Quality:
☐ Image is in focus and well-lit
☐ Composition is visually appealing
☐ Colors are accurate and vibrant
☐ No watermarks or artifacts
☐ No sensitive information visible
☐ Consistent with brand aesthetic

Technical Quality:
☐ Correct aspect ratio maintained
☐ File properly compressed
☐ No visible compression artifacts
☐ Metadata removed (privacy)
☐ Correct file format selected
☐ File size within limits

Branding Consistency:
☐ Images align with brand guidelines
☐ Consistent color palette used
☐ Proper vehicle branding visible
☐ Professional photography standards
☐ Vehicle condition is immaculate
☐ Location is appropriate
\`\`\`

### Brand Guidelines for Vehicle Photos
\`\`\`
Vehicle Branding Requirements:
- Five Star logo clearly visible
- Vehicle must be clean and well-maintained
- Professional lighting and photography
- Clear registration plates visible
- Student driver roof signs visible
- Multiple angles for variety (front, side, rear, interior)
- Natural or professional studio backgrounds
- Consistent photo shoot timing (golden hour preferred)

Color Standards:
- Primary: Five Star Blue (#003399)
- Accent: Five Star Red (#CC0000)
- Vehicle: White, Silver, or Branded colors
- Background: Natural or professional
\`\`\`

---

## 11. TROUBLESHOOTING COMMON ISSUES

### Image Not Loading

**Problem**: Image shows broken icon or placeholder
\`\`\`
Solution 1: Check file path
  - Verify src path in config matches actual filename
  - Case-sensitive? Check capitalization
  - Verify file extension (.jpg vs .jpeg)
  
Solution 2: Clear cache
  - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
  - Clear browser cache completely
  - Check private/incognito window
  
Solution 3: Verify Vercel Blob
  - Confirm file exists in Vercel Storage
  - Check file permissions
  - Verify URL accessibility directly
  
Solution 4: Check network
  - Verify internet connection stable
  - Try different device/network
  - Check firewall/proxy settings
\`\`\`

### Images Load Slowly

**Problem**: Gallery takes > 3 seconds to load
\`\`\`
Solution 1: Image size
  - Reduce image dimensions to recommended sizes
  - Compress files further
  - Convert to WebP format
  
Solution 2: Lazy loading
  - Verify loading="lazy" applied
  - Check Next.js Image priority settings
  - Monitor DevTools Network tab
  
Solution 3: Cache issues
  - Force CDN cache clear in Vercel dashboard
  - Clear Next.js build cache
  - Rebuild and redeploy
\`\`\`

### Images Distorted/Stretched

**Problem**: Images don't maintain aspect ratio
\`\`\`
Solution 1: Check CSS
  - Verify object-fit: cover applied
  - Check aspect-ratio property set
  - Verify container dimensions
  
Solution 2: Image dimensions
  - Ensure source image correct aspect ratio
  - Match recommended dimensions
  - Use aspect-ratio prop in Image component
  
Solution 3: Responsive sizing
  - Verify sizes prop configured
  - Check media query breakpoints
  - Test on multiple screen sizes
\`\`\`

---

## 12. BEST PRACTICES SUMMARY

### Always Do
\`\`\`
✓ Optimize images before uploading
✓ Use descriptive filenames
✓ Add meaningful metadata
✓ Test in staging environment first
✓ Keep backups of original images
✓ Document changes in commit messages
✓ Monitor performance metrics
✓ Update this guide with new learnings
\`\`\`

### Never Do
\`\`\`
✗ Upload uncompressed original files
✗ Use generic names like "image1.jpg"
✗ Skip quality review before upload
✗ Deploy directly to production without testing
✗ Delete images without backup
✗ Use copyrighted images without permission
✗ Upload sensitive personal information
✗ Ignore performance degradation warnings
\`\`\`

---

## 13. QUICK REFERENCE COMMANDS

### Check Current Images in Config
\`\`\`bash
# Count total images
grep -c '"id":' lib/gallery-config.ts

# List all categories
grep '"category":' lib/gallery-config.ts | sort | uniq

# Find images by category
grep -A 2 '"category": "vehicles"' lib/gallery-config.ts
\`\`\`

### Local Testing
\`\`\`bash
# Start dev server
npm run dev

# Build for production
npm run build

# Test production build
npm run start
\`\`\`

### Git Operations
\`\`\`bash
# Undo recent changes
git restore lib/gallery-config.ts

# Revert to previous version
git revert HEAD

# Create branch for testing
git checkout -b image-updates
\`\`\`

---

## 14. SUPPORT & ESCALATION

### When to Escalate
\`\`\`
Issue Type                      | Action
--------------------------------|----------------------------------
Images not loading after 1 hour | Check Vercel status, contact support
Performance degradation > 20%   | Review recent uploads, rollback
Config syntax errors            | Review changes, fix locally first
Bulk upload failures            | Try smaller batches, contact support
Cache not clearing              | Vercel support ticket required
\`\`\`

### Support Resources
\`\`\`
Vercel Documentation:     https://vercel.com/docs
Next.js Image Docs:       https://nextjs.org/docs/api-reference/next/image
Image Optimization Guide: See IMAGE_OPTIMIZATION_STRATEGY.md
GitHub Issues:            Create issue with details and screenshots
\`\`\`

---

**Last Updated**: January 2024
**Version**: 1.0
**Maintained By**: Development Team
