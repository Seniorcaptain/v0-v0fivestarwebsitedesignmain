"use client"

import { useState, useEffect } from "react"
import { VideoHero } from "@/components/video-hero"
import { MegaMenu } from "@/components/mega-menu"
import { InteractiveCourseCards } from "@/components/interactive-course-cards"
import { RefresherPackages } from "@/components/refresher-packages"
import { EnhancedBookingSystem } from "@/components/enhanced-booking-system"
import { GoogleReviewsTestimonials } from "@/components/google-reviews-testimonials"
import { GalleryShowcase } from "@/components/gallery-showcase"
import { InteractiveFAQ } from "@/components/interactive-faq"
import { InteractiveMap } from "@/components/interactive-map"
import { LiveChatWidget } from "@/components/live-chat-widget"
import { ChatSupportToggle } from "@/components/chat-support-toggle"
import { AboutSection } from "@/components/about-section"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLiveChat, setShowLiveChat] = useState(false)

  const branches = [
    {
      name: "Head Office - Roysambu",
      phone: "0794 478 773",
      location: "Jeda Plaza, Roysambu",
      address: "Jeda Plaza, Roysambu, Lumumba Drive, 2nd Floor, Rm K12",
      coordinates: { lat: -1.2281, lng: 36.8219 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["Automatic Cars", "Manual Cars", "Administrative Services"],
      county: "Nairobi" as const,
      constituency: "Roysambu",
    },
    {
      name: "Zimmerman Branch",
      phone: "0797 719 618",
      location: "Zimmerman",
      address: "Near Ocean Hardware, Zimmerman",
      coordinates: { lat: -1.2167, lng: 36.8833 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["Automatic Cars", "Manual Cars", "Practical Lessons"],
      county: "Nairobi" as const,
      constituency: "Roysambu",
    },
    {
      name: "Tassia / Nyayo Estate Branch",
      phone: "0796 247 793",
      location: "Tassia / Nyayo Estate",
      address: "Near Footbridge, Tassia / Nyayo Estate",
      coordinates: { lat: -1.3167, lng: 36.8833 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["All Vehicle Types", "Weekend Classes"],
      county: "Nairobi" as const,
      constituency: "Embakasi South",
    },
    {
      name: "Kahawa West Branch",
      phone: "0707 297 889",
      location: "Kahawa West",
      address: "Mukuyu Plaza, Kahawa West",
      coordinates: { lat: -1.1833, lng: 36.9167 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["Automatic Cars", "Manual Cars"],
      county: "Nairobi" as const,
      constituency: "Ruaraka",
    },
    {
      name: "Utawala Branch",
      phone: "0717 772 212",
      location: "Utawala",
      address: "Benedicta Junction, Utawala",
      coordinates: { lat: -1.3, lng: 36.95 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["All Vehicle Types", "Express Courses"],
      county: "Nairobi" as const,
      constituency: "Embakasi East",
    },
    {
      name: "Utawala B Branch",
      phone: "0708 819 667",
      location: "Utawala B",
      address: "Opposite AP Training Centre Gate, Utawala",
      coordinates: { lat: -1.301, lng: 36.951 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["All Vehicle Types", "Flexible Timing"],
      county: "Nairobi" as const,
      constituency: "Embakasi East",
    },
    {
      name: "Kahawa Wendani Branch",
      phone: "0790 161 009",
      location: "Kahawa Wendani",
      address: "Next to Magunas Supermarket, Kahawa Wendani",
      coordinates: { lat: -1.1667, lng: 36.9333 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["Automatic Cars", "Manual Cars", "Vans"],
      county: "Kiambu" as const,
      constituency: "Ruiru",
    },
    {
      name: "Sunton Branch",
      phone: "0748 429 757",
      location: "Sunton",
      address: "Opposite Murema Primary School, Sunton",
      coordinates: { lat: -1.25, lng: 36.8167 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["All Vehicle Types", "Flexible Timing"],
      county: "Nairobi" as const,
      constituency: "Kasarani",
    },
    {
      name: "Maziwa/Kiamumbi Branch",
      phone: "0740 541 154",
      location: "Maziwa/Kiamumbi",
      address: "Opposite PCEA Kahawa Farmers, Maziwa/Kiamumbi",
      coordinates: { lat: -1.18, lng: 36.92 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["All Vehicle Types", "Community Classes"],
      county: "Kiambu" as const,
      constituency: "Ruiru",
    },
    {
      name: "Ruiru Branch",
      phone: "0727 654 977",
      location: "Ruiru",
      address: "National Bank Building, Ruiru",
      coordinates: { lat: -1.1463, lng: 36.9618 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["All Vehicle Types", "Commercial Training"],
      county: "Kiambu" as const,
      constituency: "Ruiru",
    },
    {
      name: "Kahawa Sukari Branch",
      phone: "0790 356 991",
      location: "Kahawa Sukari",
      address: "Baraka House next to Quickmart, Kahawa Sukari",
      coordinates: { lat: -1.17, lng: 36.93 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["All Vehicle Types", "Quick Courses"],
      county: "Nairobi" as const,
      constituency: "Kasarani",
    },
    {
      name: "Juja Branch",
      phone: "0790 248 830",
      location: "Juja",
      address: "Next to Daykan College, Juja",
      coordinates: { lat: -1.1009, lng: 37.012 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["All Vehicle Types", "Student Packages"],
      county: "Kiambu" as const,
      constituency: "Juja",
    },
    {
      name: "Seasons (Kasarani) Branch",
      phone: "0745 791 009",
      location: "Seasons, Kasarani",
      address: "Seasons Stage, Kasarani",
      coordinates: { lat: -1.2167, lng: 36.8833 },
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["All Vehicle Types", "Evening Classes"],
      county: "Nairobi" as const,
      constituency: "Kasarani",
    },
  ]

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

  const handleLiveChatClick = () => {
    setShowLiveChat(true)
  }

  const handleLiveChatClose = () => {
    setShowLiveChat(false)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MegaMenu isScrolled={isScrolled} />
      <VideoHero />
      <InteractiveCourseCards />
      <RefresherPackages />
      <GalleryShowcase />
      <EnhancedBookingSystem />
      <AboutSection />

      <section id="branches" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Find Our Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium mb-8">
              Explore all our branches on our interactive map - Click markers for details and directions
            </p>
          </div>

          <InteractiveMap branches={branches} />
        </div>
      </section>

      <GoogleReviewsTestimonials />
      <InteractiveFAQ />

      {showLiveChat && <LiveChatWidget onClose={handleLiveChatClose} />}
      <ChatSupportToggle onWhatsAppClick={handleWhatsAppClick} onLiveChatClick={handleLiveChatClick} />
    </div>
  )
}
