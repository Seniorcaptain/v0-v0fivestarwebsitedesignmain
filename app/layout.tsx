import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://fivestardrivingschools.com"),
  title: {
    default: "FIVE ST★R Driving School Kenya - NTSA Certified Lessons",
    template: "%s | FIVE ST★R Driving School",
  },
  description:
    "Kenya's trusted NTSA-certified driving school. Expert instructors, modern vehicles, flexible scheduling. 15+ Nairobi & Kiambu branches. 20,000+ students trained. Book your driving lessons today.",
  keywords:
    "driving school Kenya, NTSA certified driving instructor, learn to drive Nairobi, automatic driving lessons, manual transmission lessons, motorcycle training, truck license, Kiambu driving school, best driving school Kenya",
  authors: [{ name: "FIVE ST★R Driving School" }],
  creator: "FIVE ST★R Driving School",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FIVE ST★R Driving School Kenya - Premium Driving Training",
    description:
      "Kenya's #1 NTSA-certified driving school. Learn from expert instructors across 15+ locations. 20,000+ students trained. Affordable, flexible, and professional.",
    url: "https://fivestardrivingschools.com/",
    images: [
      {
        url: "/logo.png",
        width: 1586,
        height: 944,
        alt: "FIVE ST★R Driving School - Kenya's Premier Driving Training",
      },
    ],
    type: "website",
    siteName: "FIVE ST★R Driving School",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIVE ST★R Driving School Kenya - NTSA Certified",
    description: "Learn from certified instructors at Kenya's #1 driving school. 15+ locations, flexible scheduling, 20,000+ students trained.",
    images: ["/logo.png"],
    creator: "@FiveStarDriving",
  },
  generator: "Next.js",
  applicationName: "FIVE ST★R Driving School",
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#dc2626",
}

// Kept in sync with components/interactive-faq.tsx — update both if FAQ copy changes.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in your all-inclusive fee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our all-inclusive fee covers 30 practical lessons, unlimited theory sessions, basic mechanics training, and a FREE learner's manual. There are no hidden costs.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to complete the course?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most students complete their course in 4-6 weeks for car licenses and 2-3 weeks for motorcycle licenses, depending on availability and learning pace.",
      },
    },
    {
      "@type": "Question",
      name: "What are your operating hours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Monday to Friday from 7:00 AM to 7:00 PM, and Saturday from 8:00 AM to 5:00 PM. Sunday lessons are available upon request; hours may vary slightly by branch.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer pick and drop services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Private Classes include pick and drop services, available to students who choose the premium private instruction option.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I need to bring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bring your original ID card or passport. The school handles all NTSA paperwork and requirements for you.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between B1 and B2 licenses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B1 covers automatic cars only. B2 covers both manual and automatic cars, so a B2 license lets you drive both vehicle types. B1 is easier to learn but more limiting.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide the vehicle for the driving test?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — a well-maintained vehicle with dual controls is provided for the driving test, and an instructor accompanies each student.",
      },
    },
    {
      "@type": "Question",
      name: "What if I fail the driving test?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The school has a 97% first-time pass rate. Students who need more practice can take refresher lessons at discounted rates.",
      },
    },
    {
      "@type": "Question",
      name: "Can I pay in installments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — flexible payment plans are available, including mobile money and bank transfers. Discuss options with the team at enrollment.",
      },
    },
    {
      "@type": "Question",
      name: "Are your instructors certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All instructors are NTSA-certified professionals with years of experience who undergo regular training.",
      },
    },
    {
      "@type": "Question",
      name: "What's included in the theory classes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Theory classes cover road signs, traffic rules, defensive driving techniques, and basic vehicle mechanics, with unlimited sessions until you're confident for the test.",
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://fivestardrivingschools.com",
    name: "FIVE ST★R Driving School",
    description: "Kenya's trusted NTSA-certified driving school with 15+ locations across Nairobi and Kiambu counties",
    url: "https://fivestardrivingschools.com",
    telephone: "+254794478773",
    email: "info@fivestardrivingschools.com",
    logo: "https://fivestardrivingschools.com/logo.png",
    image: "https://fivestardrivingschools.com/logo.png",
    priceRange: "KSH",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jeda Plaza, Roysambu, Lumumba Drive, 2nd Floor, Rm K12",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2281,
      longitude: 36.8219,
    },
    sameAs: [
      "https://www.google.com/maps/search/FIVE+STAR+Driving+School+Nairobi",
      "https://www.facebook.com/fivestardrivingschool",
      "https://www.instagram.com/fivestardrivingschool",
      "https://www.youtube.com/fivestardrivingschool",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1000",
      bestRating: "5",
      worstRating: "1",
    },
    knowsAbout: [
      "Automatic car driving lessons",
      "Manual transmission training",
      "Motorcycle license training",
      "Truck and commercial vehicle training",
      "NTSA-approved driving tests",
    ],
    founder: {
      "@type": "Organization",
      name: "FIVE ST★R Driving School",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "50+",
    },
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
