import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FIVE ST★R Driving School Kenya - NTSA Certified Lessons",
  description:
    "Kenya's trusted NTSA-certified driving school. Expert instructors, modern vehicles, flexible scheduling. 15+ Nairobi & Kiambu branches. 20,000+ students trained. Book your driving lessons today.",
  keywords:
    "driving school Kenya, NTSA certified driving instructor, learn to drive Nairobi, automatic driving lessons, manual transmission lessons, motorcycle training, truck license, Kiambu driving school, best driving school Kenya",
  authors: [{ name: "FIVE ST★R Driving School" }],
  creator: "FIVE ST★R Driving School",
  canonical: "https://fivestardrivingschools.com/",
  openGraph: {
    title: "FIVE ST★R Driving School Kenya - Premium Driving Training",
    description: "Kenya's #1 NTSA-certified driving school. Learn from expert instructors across 15+ locations. 20,000+ students trained. Affordable, flexible, and professional.",
    url: "https://fivestardrivingschools.com/",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200&text=FIVE ST★R+Driving+School",
        width: 1200,
        height: 630,
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
    images: ["/placeholder.svg?height=630&width=1200&text=FIVE ST★R+Driving+School"],
    creator: "@FiveStarDriving",
  },
  generator: "Next.js",
  applicationName: "FIVE ST★R Driving School",
  referrer: "strict-origin-when-cross-origin",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: "#dc2626",
  icons: {
    icon: "/placeholder.svg?height=32&width=32&text=FS",
    apple: "/placeholder.svg?height=180&width=180&text=FS",
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
    logo: "https://fivestardrivingschools.com/placeholder.svg",
    image: "https://fivestardrivingschools.com/placeholder.svg",
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
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
