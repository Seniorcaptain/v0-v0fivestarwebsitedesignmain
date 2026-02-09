# Image Upload Checklist - Five Star Driving School

Quick reference checklists for common image operations.

---

## 📋 PRE-UPLOAD CHECKLIST

Use this before uploading any images:

### Image Preparation
- [ ] Image resolution: 1920x1080 (hero) or 1200x900 (gallery)
- [ ] File format: WebP or JPEG (85% quality)
- [ ] File size: < 800 KB (or 15 MB before compression)
- [ ] Aspect ratio: Correct for intended use
- [ ] Filename: Follows naming convention (lowercase, hyphens, descriptive)
- [ ] No metadata/EXIF data (privacy)
- [ ] Quality review: In focus, well-lit, on-brand
- [ ] Brand consistency: Logo visible, professional standards met

### Documentation
- [ ] Title prepared (clear, descriptive)
- [ ] Description written (2-3 sentences)
- [ ] Category selected (vehicles/training/facilities/team/events)
- [ ] Location recorded if applicable
- [ ] Tags prepared (3-5 relevant tags)
- [ ] Date documented
- [ ] Featured status decided

### Technical Verification
- [ ] Image opens correctly on computer
- [ ] No corruption or artifacts
- [ ] Color accuracy verified
- [ ] Backup copy created
- [ ] Legal rights confirmed (copyright/permissions)

---

## 🚀 SINGLE IMAGE UPLOAD WORKFLOW

### 1. Prepare (5 minutes)
- [ ] Open image in editor
- [ ] Resize to recommended dimensions
- [ ] Compress to < 1 MB
- [ ] Export as WebP or JPEG (85%)
- [ ] Rename file (e.g., fs-fleet-new.jpg)

### 2. Upload to Vercel (2 minutes)
- [ ] Log into Vercel dashboard
- [ ] Navigate to Blob Storage
- [ ] Upload file
- [ ] Confirm successful upload
- [ ] Note the returned URL path

### 3. Update Configuration (3 minutes)
- [ ] Open `/lib/gallery-config.ts`
- [ ] Add new entry to GALLERY_IMAGES array
- [ ] Fill in all required fields:
  - id (unique identifier)
  - src (path from Vercel)
  - title
  - description
  - category
  - location (optional)
  - featured (true/false)
  - date
  - tags (array)
- [ ] Save file

### 4. Test Locally (5 minutes)
- [ ] Run `npm run dev`
- [ ] Navigate to `/gallery` page
- [ ] Verify image appears in gallery
- [ ] Check mobile responsiveness
- [ ] Test zoom/gallery functions
- [ ] Stop dev server

### 5. Deploy (3 minutes)
- [ ] Commit changes: `git add . && git commit -m "Add new fleet image"`
- [ ] Push to repository: `git push origin main`
- [ ] Monitor Vercel deployment
- [ ] Verify deployment successful
- [ ] Clear browser cache and test

### 6. Verify Live (5 minutes)
- [ ] Open website in production
- [ ] Check gallery page loads
- [ ] Verify image displays correctly
- [ ] Test on mobile device
- [ ] Monitor performance metrics
- [ ] Check analytics start counting

**Total Time: ~25 minutes**

---

## 🔄 REPLACE EXISTING IMAGE WORKFLOW

### Quick Replace (Same Filename)
- [ ] Prepare new image (same dimensions)
- [ ] Export and compress
- [ ] Upload to Vercel with SAME filename
- [ ] Force CDN cache clear
- [ ] Wait 5-10 minutes for propagation
- [ ] Verify on staging URL
- [ ] Verify on production URL
- [ ] Test on multiple devices

**Time: 10-15 minutes | Downtime: None**

### Full Replace (New Filename)
- [ ] Prepare new image
- [ ] Upload to Vercel with new filename
- [ ] Open `/lib/gallery-config.ts`
- [ ] Update src path in relevant entry
- [ ] Update metadata if needed
- [ ] Test locally
- [ ] Deploy to production
- [ ] Verify live
- [ ] Update documentation

**Time: 25-35 minutes | Downtime: None**

---

## 🗑️ DELETE IMAGE WORKFLOW

### Before Deletion
- [ ] Backup original image locally
- [ ] Search codebase for references:
  - [ ] `/lib/gallery-config.ts`
  - [ ] `components/video-hero.tsx`
  - [ ] `components/gallery-showcase.tsx`
  - [ ] `components/team-section.tsx`
  - [ ] `app/gallery/page.tsx`
- [ ] Check analytics for engagement metrics
- [ ] Notify team of planned deletion
- [ ] Get approval if needed
- [ ] Plan deployment window

### Deletion Process
- [ ] Comment out entry in `/lib/gallery-config.ts`
- [ ] Update any hardcoded references
- [ ] Test locally - verify no broken links
- [ ] Deploy to production
- [ ] Monitor for 24 hours
- [ ] Verify website functions correctly
- [ ] Wait 48 hours for cache clearance
- [ ] Delete from Vercel Blob Storage
- [ ] Update deletion log

**Total Time: 10 minutes active + 48 hour wait**

---

## 📦 BULK UPLOAD WORKFLOW (10+ Images)

### Phase 1: Preparation (1-2 hours)
- [ ] Gather all image files
- [ ] Resize all to appropriate dimensions
- [ ] Compress all files to < 1 MB each
- [ ] Convert all to WebP/JPEG format
- [ ] Apply naming convention consistently
- [ ] Organize into logical groups
- [ ] Create backup copies
- [ ] Prepare metadata spreadsheet

### Phase 2: Spreadsheet Documentation (30 minutes)
Create CSV or spreadsheet with columns:
- [ ] Filename
- [ ] Title
- [ ] Description
- [ ] Category
- [ ] Location
- [ ] Featured (Y/N)
- [ ] Date
- [ ] Tags (comma-separated)

### Phase 3: Upload to Vercel (15 minutes)
- [ ] Log into Vercel Blob Storage
- [ ] Upload all files (in batches if > 50 MB total)
- [ ] Confirm all uploads successful
- [ ] Document returned URL paths
- [ ] Verify all files present in storage

### Phase 4: Config Update (30 minutes)
- [ ] Open `/lib/gallery-config.ts`
- [ ] Generate config entries from spreadsheet
- [ ] Add entries in alphabetical order
- [ ] Verify syntax (no typos, proper quotes)
- [ ] Verify all entries have required fields
- [ ] Save file

### Phase 5: Staging Verification (20 minutes)
- [ ] Run local dev server
- [ ] Check gallery page loads
- [ ] Verify all new images appear
- [ ] Test mobile responsiveness
- [ ] Check gallery navigation
- [ ] Verify performance (< 3 second load)
- [ ] Screenshot successful state

### Phase 6: Production Deployment (10 minutes)
- [ ] Commit changes with descriptive message
- [ ] Push to repository
- [ ] Monitor Vercel deployment
- [ ] Confirm deployment successful
- [ ] Clear browser cache

### Phase 7: Live Verification (15 minutes)
- [ ] Access production website
- [ ] Verify all images load correctly
- [ ] Test on mobile device
- [ ] Check gallery filtering works
- [ ] Monitor analytics dashboard
- [ ] Log completion details

**Total Time: 3-4 hours | Recommended frequency: Monthly**

---

## 🎯 IMAGE QUALITY REVIEW

Before every upload, complete this quality check:

### Visual Quality
- [ ] Image is in focus and clear
- [ ] Lighting is professional and even
- [ ] Composition is well-balanced
- [ ] Colors are accurate and vibrant
- [ ] No unwanted shadows or glare
- [ ] No visible dust or artifacts
- [ ] Background is appropriate/clean
- [ ] Subject is centered and prominent

### Brand Consistency
- [ ] Five Star logo visible (if applicable)
- [ ] Brand colors used correctly
- [ ] Vehicles show proper branding
- [ ] Professional standards maintained
- [ ] Consistent with other photos
- [ ] On-brand aesthetic maintained

### Technical Quality
- [ ] Correct file format (WebP/JPEG)
- [ ] Proper compression applied
- [ ] No visible compression artifacts
- [ ] Correct dimensions
- [ ] Aspect ratio appropriate
- [ ] File size within limits

### Safety & Privacy
- [ ] No personal information visible
- [ ] No license plate numbers clear (if desired)
- [ ] No sensitive information
- [ ] Copyright/permissions verified
- [ ] No people without consent
- [ ] Metadata stripped (optional)

**Failed check? → Send back for editing before upload**

---

## ⚡ PERFORMANCE MONITORING

After uploading, monitor these metrics:

### Loading Performance
- [ ] Hero image loads < 1 second
- [ ] Gallery cards load < 500 ms
- [ ] Thumbnails load < 300 ms
- [ ] Full page load < 3 seconds
- [ ] No layout shifts
- [ ] No broken images

### Analytics (First 24 Hours)
- [ ] Views counter increments
- [ ] Page load times stable
- [ ] No error messages
- [ ] Engagement metrics normal
- [ ] Mobile performance acceptable

### User Feedback
- [ ] No error reports
- [ ] Website functions normally
- [ ] Images display correctly everywhere
- [ ] Performance acceptable for all users

**Issue detected? → See troubleshooting guide**

---

## 🚨 EMERGENCY ROLLBACK

If something goes wrong:

### Immediate Action (< 5 minutes)
- [ ] Hard refresh browser: Ctrl+Shift+Delete (Windows) or Cmd+Shift+R (Mac)
- [ ] Check Vercel status page for outages
- [ ] Test on different device/network
- [ ] Check browser console for errors

### Rollback (5-10 minutes)
- [ ] Access repository code
- [ ] Run: `git log --oneline` (last 5 commits)
- [ ] Identify last working commit
- [ ] Run: `git revert HEAD` or `git reset --hard <commit>`
- [ ] Push changes: `git push origin main`
- [ ] Monitor Vercel redeploy
- [ ] Verify website restored

### Root Cause Analysis
- [ ] Check file paths for typos
- [ ] Verify image dimensions
- [ ] Review config syntax
- [ ] Test images locally
- [ ] Check browser console errors
- [ ] Review deployment logs

---

## 📞 ESCALATION CONTACTS

| Issue | Action |
|-------|--------|
| Images won't load for 1+ hour | Check Vercel status → Contact Vercel support |
| Performance degradation > 20% | Review recent uploads, consider rollback |
| Config errors / syntax issues | Review changes locally first, fix and retry |
| Bulk upload failures | Try smaller batches, contact Vercel support |
| Can't access Vercel dashboard | Check credentials, reset password, contact Vercel |

---

**Tip:** Save this checklist to your desktop for quick reference!

**Last Updated:** January 2024
