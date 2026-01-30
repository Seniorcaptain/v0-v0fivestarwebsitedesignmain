'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const GALLERY_IMAGES = [
  '/images/WhatsApp Image 2026-01-21 at 16.40.23.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.24.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.24 (1).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.24 (2).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.25.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.25 (1).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.27.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.29.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.30.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.32.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.34.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.35.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.36.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.38.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.39.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.39 (1).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.39 (2).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.40.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.40 (1).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.40 (2).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.40 (3).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.41.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.41 (1).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.41 (2).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.41 (3).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.41 (4).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.41 (5).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.42.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.42 (1).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.42 (2).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.42 (3).jpeg',
]

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-slate-900 cursor-pointer hover:text-blue-600 transition-colors">
              Gallery
            </h1>
          </Link>
          <Link href="/">
            <Button variant="outline">Back Home</Button>
          </Link>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Complete Collection
          </h2>
          <p className="text-lg text-slate-600">
            Browse through all {GALLERY_IMAGES.length} images in our collection.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((image, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Image {idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-600 mb-4">
            Total images: {GALLERY_IMAGES.length}
          </p>
          <Link href="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </div>
      </footer>
    </main>
  )
}
