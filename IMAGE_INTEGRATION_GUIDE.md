# FIVE STAR Driving School - Image Integration Guide

## Overview
This guide explains how to integrate images from your PIXIESet gallery (https://ian51.pixieset.com/fivestardrivingschoolshoot/) into your website.

## Folder Structure
```
/public/images/gallery/
├── training/
│   ├── practical-lesson-*.jpg
│   ├── theory-class-*.jpg
│   └── classroom-*.jpg
├── vehicles/
│   ├── training-fleet-*.jpg
│   ├── manual-car-*.jpg
│   ├── automatic-car-*.jpg
│   └── motorcycle-training-*.jpg
├── facilities/
│   ├── classroom-modern-*.jpg
│   ├── office-space-*.jpg
│   └── reception-*.jpg
├── events/
│   ├── graduation-ceremony-*.jpg
│   ├── certificate-presentation-*.jpg
│   └── awards-ceremony-*.jpg
├── team/
│   ├── instructors-*.jpg
│   ├── instructor-training-*.jpg
│   └── staff-group-*.jpg
└── success/
    ├── happy-students-*.jpg
    ├── first-time-pass-*.jpg
    └── student-celebration-*.jpg
```

## Steps to Add Images

### 1. Download from PIXIESet
- Go to https://ian51.pixieset.com/fivestardrivingschoolshoot/
- Download images in bulk or individually
- Optimize images (recommended: 1200x800px, 80-90% quality, max 150KB)

### 2. Organize Images
- Place downloaded images in the appropriate `/public/images/gallery/{category}/` folder
- Use consistent naming: `{image-type}-{number}.jpg`
- Example: `practical-lesson-01.jpg`, `training-fleet-02.jpg`

### 3. Update Configuration
- Open `/lib/gallery-config.ts`
- Add new entries to `GALLERY_IMAGES` array
- Update: id, src (file path), title, description, category, location, date, tags
- Example:
  ```typescript
  {
    id: "training-5",
    src: "/images/gallery/training/practical-lesson-05.jpg",
    title: "Practical Driving on Highway",
    description: "Advanced highway driving techniques",
    category: "training",
    location: "Utawala Branch",
    featured: false,
    likes: 0,
    views: 0,
    date: "2024-01-25",
    tags: ["driving", "highway", "practical"],
  }
  ```

### 4. Test & Verify
- Save changes and refresh website
- Verify images display correctly in gallery
- Check mobile responsiveness

## Image Specifications
- **Format**: JPG or WebP (preferred)
- **Resolution**: 1200x800px (HD), 600x400px (mobile)
- **Quality**: 80-90% compression
- **Max Size**: 150KB per image
- **Ratio**: 4:3 aspect ratio recommended

## Naming Convention
```
{category}-{type}-{number}.jpg

Examples:
- training-practical-lesson-01.jpg
- vehicles-manual-car-03.jpg
- facilities-classroom-modern-02.jpg
- events-graduation-ceremony-01.jpg
- team-instructors-01.jpg
- success-happy-students-02.jpg
```

## Categories
- **training**: Practical lessons, theory classes, classrooms
- **vehicles**: Cars, motorcycles, fleet photos
- **facilities**: Classrooms, offices, reception areas
- **events**: Graduations, certificates, ceremonies
- **team**: Instructors, staff, training moments
- **success**: Happy students, celebrations, achievements

## Auto-Update Your Site
Once images are in the correct folders with entries in `/lib/gallery-config.ts`, they automatically appear on:
- Gallery Showcase section
- Gallery filtering and search
- Gallery statistics and analytics
- Mobile and desktop views

## Future Enhancements
- Add admin dashboard for image management
- Implement automatic image optimization
- Connect to Supabase for dynamic image updates
- Add image upload functionality for team members

## Need Help?
- Check existing gallery entries for reference
- Ensure file paths are correct (case-sensitive)
- Verify images are in correct format (JPG/WebP)
- Test on mobile and desktop before deploying

---
Created: 2024
Last Updated: 2024
