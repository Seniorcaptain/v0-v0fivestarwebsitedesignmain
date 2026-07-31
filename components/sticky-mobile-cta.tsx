"use client"

import Link from "next/link"
import { Phone, Calendar } from "lucide-react"

/**
 * Persistent bottom action bar, mobile only (md:hidden).
 * Keeps "Call" and "Book" one thumb-tap away regardless of scroll position —
 * most visitors arrive on mobile and previously had to scroll back to the
 * hero (past ~8 sections) to find a CTA.
 */
export function StickyMobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 flex md:hidden border-t border-black/10 bg-white/95 backdrop-blur shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href="tel:+254794478773"
        className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold text-blue-700 active:bg-blue-50"
        aria-label="Call FIVE ST★R Driving School"
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a>
      <div className="w-px bg-black/10" />
      <Link
        href="/book-lesson"
        className="flex flex-1 items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 py-3 text-sm font-bold text-white active:from-red-700 active:to-red-800"
        aria-label="Book a driving lesson"
      >
        <Calendar className="h-4 w-4" />
        Book Now
      </Link>
    </div>
  )
}
