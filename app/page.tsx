'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const FEATURED_IMAGES = [
  '/images/WhatsApp Image 2026-01-21 at 16.40.23.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.24.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.24 (1).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.24 (2).jpeg',
  '/images/WhatsApp Image 2026-01-21 at 16.40.25.jpeg',
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
              Beautiful Moments Captured
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 text-pretty max-w-2xl mx-auto">
              Explore our curated collection of stunning images showcasing timeless beauty and authentic moments.
            </p>
            <Link href="/gallery">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Full Gallery
              </Button>
            </Link>
          </div>

          {/* Featured Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            {FEATURED_IMAGES.map((image, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-square">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Featured image ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Ready to explore?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Discover the complete collection of all our images in the gallery.
          </p>
          <Link href="/gallery">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Images
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
