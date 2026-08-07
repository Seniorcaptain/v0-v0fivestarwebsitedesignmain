"use client"

import { useState, useEffect } from "react"
import { VideoHero } from "@/components/video-hero"
import { TrustStatsBar } from "@/components/trust-stats-bar"
import { MegaMenu } from "@/components/mega-menu"
import { InteractiveCourseCards } from "@/components/interactive-course-cards"
import { RefresherPackages } from "@/components/refresher-packages"
import { EnhancedBookingSystem } from "@/components/enhanced-booking-system"
import { GoogleReviewsTestimonials } from "@/components/google-reviews-testimonials"
import { GalleryShowcase } from "@/components/gallery-showcase"
import { InteractiveFAQ } from "@/components/interactive-faq"
import { InteractiveMap } from "@/components/interactive-map"
import { ChatSupportToggle } from "@/components/chat-support-toggle"
import { AboutSection } from "@/components/about-section"
import { branches } from "@/lib/branches"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/254794478773?text=Hi! I'm interested in learning to drive with FIVE ST★R Driving School. Can you please provide me with more information about your courses and pricing?",
      "_blank",
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MegaMenu isScrolled={isScrolled} />
      <VideoHero />
      <TrustStatsBar />
      <InteractiveCourseCards />
      <RefresherPackages />
      <GalleryShowcase />
      <EnhancedBookingSystem />
      <AboutSection />

      <section id="branches" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
              Find Our Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium mb-8">
              Explore all our branches on our interactive map - Click markers for details and directions
            </p>
          </ScrollReveal>

          <InteractiveMap branches={branches} />
        </div>
      </section>

      <GoogleReviewsTestimonials />
      <InteractiveFAQ />

      <ChatSupportToggle onWhatsAppClick={handleWhatsAppClick} />
    </div>
  )
}
