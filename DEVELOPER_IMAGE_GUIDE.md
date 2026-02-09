# Developer Image Integration Guide - Five Star Driving School

Technical documentation for developers implementing image handling and management.

---

## 1. IMAGE CONFIGURATION STRUCTURE

### Gallery Config Interface
```typescript
// lib/gallery-config.ts

export interface GalleryImageConfig {
  id: string                              // Unique identifier
  src: string                             // Image path (/images/filename)
  title: string                           // Display title (max 100 chars)
  description: string                     // Full description (max 500 chars)
  category: "training" | "vehicles" 
           | "facilities" | "events" | "team"  // Image category
  location?: string                       // Optional location name
  featured?: boolean                      // Featured on homepage
  likes?: number                          // Engagement metric
  views?: number                          // View counter
  date?: string                           // Date taken (YYYY-MM-DD)
  tags?: string[]                         // Search tags (3-5 recommended)
}
```

### Adding New Image Entry
```typescript
// Example: Adding new vehicle photo

const newImage: GalleryImageConfig = {
  id: "vehicles-mazda-2024",
  src: "/images/fs-mazda-2024.jpg",
  title: "Mazda 3 Training Vehicle 2024",
  description: "Modern Mazda 3 hatchback with full Five Star Driving School branding and professional setup",
  category: "vehicles",
  location: "Training Ground",
  featured: true,
  likes: 0,
  views: 0,
  date: "2024-01-22",
  tags: ["mazda", "training", "vehicle", "modern", "branded"]
}

// Add to array in GALLERY_IMAGES
export const GALLERY_IMAGES: GalleryImageConfig[] = [
  // ... existing images
  newImage,
  // ... more images
]
```

---

## 2. NEXT.JS IMAGE COMPONENT IMPLEMENTATION

### Basic Usage
```typescript
import Image from "next/image"

// Hero image with priority
<Image
  src="/images/fleet-hero.jpg"
  alt="Five Star Fleet"
  fill
  priority
  quality={90}
  sizes="100vw"
  className="object-cover"
/>

// Gallery card with lazy loading
<Image
  src={image.src}
  alt={image.title}
  fill
  quality={80}
  loading="lazy"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>

// Thumbnail with low quality
<Image
  src={image.src}
  alt={image.title}
  fill
  quality={60}
  sizes="100px"
  loading="lazy"
  className="object-cover"
/>
```

### Performance Optimization Props
```typescript
Interface Image Props {
  src: string              // Image path
  alt: string              // Accessibility text
  fill?: boolean           // Fill container (requires position: relative parent)
  width?: number           // Fixed width (alternative to fill)
  height?: number          // Fixed height (alternative to fill)
  priority?: boolean       // Preload image (hero images only)
  quality?: number         // Compression quality 1-100 (default: 75)
  loading?: "lazy" | "eager"  // Lazy load below-fold (default: lazy)
  sizes?: string           // Responsive sizes query
  className?: string       // CSS classes
  style?: CSSProperties    // Inline styles
  onLoadingComplete?: fn   // Callback when loaded
}
```

### Responsive Sizes Configuration
```typescript
// Mobile-first approach with breakpoints

sizes="
  (max-width: 640px) 100vw,        // Mobile: full width
  (max-width: 1024px) 50vw,        // Tablet: half width
  33vw                              // Desktop: one-third
"

// For hero images
sizes="100vw"

// For fixed-width containers
sizes="300px"

// For thumbnail grid
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

---

## 3. NEXT.JS CONFIGURATION FOR IMAGES

### next.config.mjs Settings
```javascript
const nextConfig = {
  images: {
    unoptimized: false,              // Enable Next.js optimization
    formats: ["image/avif", "image/webp"],  // Modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,  // 1 year cache
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
    ],
  },
}
```

### Image Optimization Benefits
```
Format          | Size Reduction | Browser Support
----------------|----------------|------------------
AVIF           | 50% smaller    | Modern browsers
WebP           | 25-35% smaller | Chrome, Firefox, Edge
JPEG (optimized) | 10-15% smaller | All browsers
Original       | Baseline       | Baseline
```

---

## 4. VERCEL BLOB STORAGE INTEGRATION

### Upload Configuration
```typescript
// Upload images to Vercel Blob Storage

import { put } from '@vercel/blob'

export async function uploadImage(file: File) {
  try {
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: false,  // Keep original filename
    })
    
    return {
      success: true,
      url: blob.url,
      pathname: blob.pathname,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}
```

### Image URL Format
```
Public URL: /images/images-filename.jpg
Local Reference: /images/filename.jpg (in src prop)
Next.js uses local reference, auto-routes to CDN
```

### Access Control
```javascript
// Public access (for web display)
access: 'public'

// Private access (for sensitive content)
access: 'private'

// Temporary URLs (if needed)
const url = blob.downloadUrl
```

---

## 5. COMPONENT EXAMPLES

### Gallery Showcase Component
```typescript
"use client"

import Image from "next/image"
import { useState } from "react"
import { GALLERY_IMAGES } from "@/lib/gallery-config"

export function GalleryShowcase() {
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null)

  return (
    <div>
      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {GALLERY_IMAGES.filter(img => img.category === "vehicles").map(image => (
          <div key={image.id} className="relative aspect-[4/3]">
            <Image
              src={image.src}
              alt={image.title}
              fill
              quality={80}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </div>

      {/* Modal with Full Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              fill
              quality={90}
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
```

### Hero Component with Image
```typescript
"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const heroImages = [
  "/images/fleet-hero-1.jpg",
  "/images/fleet-hero-2.jpg",
  "/images/fleet-hero-3.jpg",
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % heroImages.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen">
      <Image
        src={heroImages[currentImage]}
        alt="Five Star Fleet"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover transition-opacity duration-1000"
      />
    </div>
  )
}
```

---

## 6. DATABASE SCHEMA (If Using Database)

### Future: Store image metadata in database
```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY,
  filename VARCHAR(255) UNIQUE NOT NULL,
  original_url VARCHAR(500) NOT NULL,
  optimized_url VARCHAR(500) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  width INT,
  height INT,
  file_size INT,
  format VARCHAR(10),
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  date_taken DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  tags TEXT[], -- Array of tags
  metadata JSONB -- Extensible metadata
);

CREATE INDEX idx_category ON gallery_images(category);
CREATE INDEX idx_featured ON gallery_images(featured);
CREATE INDEX idx_date_taken ON gallery_images(date_taken);
```

---

## 7. IMAGE CACHING STRATEGY

### Client-Side Caching
```typescript
// Next.js Image automatically caches optimized images
// Cache location: .next/cache/images/
// TTL: 365 days (configured in next.config.mjs)

// Force revalidation (if needed)
import { revalidateTag } from 'next/cache'

revalidateTag('gallery-images')
```

### Server-Side Caching
```typescript
// Cache gallery images at request time
export async function getGalleryImages(category?: string) {
  const cacheKey = `gallery-${category || 'all'}`
  
  // Check cache first
  const cached = await cache.get(cacheKey)
  if (cached) return cached
  
  // Fetch from config
  let images = GALLERY_IMAGES
  if (category) {
    images = images.filter(img => img.category === category)
  }
  
  // Cache for 1 hour
  await cache.set(cacheKey, images, 3600)
  return images
}
```

### CDN Caching Headers
```javascript
// In next.config.mjs
headers: async () => [
  {
    source: '/images/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
    ],
  },
]
```

---

## 8. PERFORMANCE MONITORING

### Web Vitals Metrics
```typescript
// Monitor image performance
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

// Track Largest Contentful Paint (LCP) - target: < 2.5s
getLCP(metric => console.log('LCP:', metric.value))

// Track Cumulative Layout Shift (CLS) - target: < 0.1
getCLS(metric => console.log('CLS:', metric.value))

// Custom image load timing
const startTime = performance.now()
const img = new Image()
img.onload = () => {
  const loadTime = performance.now() - startTime
  console.log('Image load time:', loadTime, 'ms')
}
img.src = '/images/hero.jpg'
```

### Analytics Integration
```typescript
// Track image views
import { trackEvent } from '@/lib/analytics'

export function trackImageView(imageId: string, category: string) {
  trackEvent('image_viewed', {
    image_id: imageId,
    category: category,
    timestamp: new Date().toISOString(),
  })
}

// Track in component
useEffect(() => {
  trackImageView(image.id, image.category)
}, [image.id, image.category])
```

---

## 9. ERROR HANDLING & FALLBACKS

### Image Error Handling
```typescript
const [imageFailed, setImageFailed] = useState(false)

<Image
  src={image.src}
  alt={image.title}
  fill
  onError={() => setImageFailed(true)}
  className="object-cover"
/>

{imageFailed && (
  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
    <p className="text-gray-600">Image failed to load</p>
  </div>
)}
```

### Fallback Image Strategy
```typescript
const getFallbackImage = (category: string) => {
  const fallbacks: Record<string, string> = {
    vehicles: '/images/placeholder-vehicle.jpg',
    team: '/images/placeholder-team.jpg',
    facilities: '/images/placeholder-facility.jpg',
    events: '/images/placeholder-event.jpg',
    training: '/images/placeholder-training.jpg',
  }
  return fallbacks[category] || '/images/placeholder.jpg'
}

// Use in component
<Image
  src={image.src || getFallbackImage(image.category)}
  alt={image.title}
  fill
  onError={() => setImageFailed(true)}
/>
```

---

## 10. TESTING IMAGES

### Unit Tests
```typescript
// Example using Jest + React Testing Library

import { render, screen } from '@testing-library/react'
import { GalleryShowcase } from '@/components/gallery-showcase'

describe('GalleryShowcase', () => {
  it('renders images with correct alt text', () => {
    render(<GalleryShowcase />)
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  it('loads images with lazy loading', () => {
    render(<GalleryShowcase />)
    const lazyImages = screen.getAllByRole('img').filter(
      img => img.getAttribute('loading') === 'lazy'
    )
    expect(lazyImages.length).toBeGreaterThan(0)
  })
})
```

### Performance Tests
```typescript
// Lighthouse CI configuration
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/gallery"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertMatrix": [
        {
          "matchingUrlPattern": ".*",
          "metrics": {
            "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
            "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
            "first-input-delay": ["error", { "maxNumericValue": 100 }]
          }
        }
      ]
    }
  }
}
```

---

## 11. ACCESSIBILITY REQUIREMENTS

### Alt Text Best Practices
```typescript
// Good: Descriptive, includes relevant details
alt="White Toyota Corolla Axio training vehicle with Five Star Driving School branding"

// Bad: Vague or generic
alt="car"
alt="image"
alt="photo of vehicle"

// For decorative images only
alt=""  // Empty alt for purely decorative elements
```

### ARIA Labels for Complex Images
```typescript
<figure>
  <Image
    src="/images/fleet.jpg"
    alt="Five Star fleet of three training vehicles"
    role="img"
    aria-describedby="fleet-description"
  />
  <figcaption id="fleet-description">
    Fleet includes Toyota Fielder wagons and Mazda 3 hatchbacks
  </figcaption>
</figure>
```

### Color Contrast for Overlays
```typescript
// Ensure text over images is readable
<div className="absolute inset-0 bg-black/40">
  {/* Text with sufficient contrast */}
  <h2 className="text-white text-2xl font-bold">Title</h2>
</div>
```

---

## 12. DEPLOYMENT CHECKLIST

Before deploying image changes:

```
Code Review:
☐ Config syntax verified
☐ All image paths correct
☐ No hardcoded IDs
☐ Responsive sizing tested
☐ Accessibility reviewed

Performance:
☐ Image sizes optimized
☐ Quality levels appropriate
☐ Lazy loading applied
☐ No layout shifts
☐ LCP < 2.5s

Testing:
☐ Local testing passed
☐ Mobile testing passed
☐ Desktop testing passed
☐ No console errors
☐ Analytics tracking works

Security:
☐ No sensitive data in images
☐ Metadata stripped
☐ Permissions verified
☐ URLs properly configured
☐ No path traversal issues
```

---

## Resources

- [Next.js Image Documentation](https://nextjs.org/docs/api-reference/next/image)
- [Vercel Image Optimization](https://vercel.com/docs/concepts/image-optimization)
- [Web Vitals](https://web.dev/vitals/)
- [WebP Format](https://developers.google.com/speed/webp)
- [Image Compression Tools](https://tinypng.com/)

---

**Last Updated:** January 2024
**Version:** 1.0
