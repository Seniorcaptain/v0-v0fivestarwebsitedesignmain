import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { branches } from "@/lib/branches"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://fivestardrivingschools.com"),
  title: "FIVE ST★R Driving School Kenya - NTSA Certified Lessons",
  description:
    `Kenya's trusted NTSA-certified driving school. Expert instructors, modern vehicles, flexible scheduling. ${branches.length} Nairobi & Kiambu branches. 20,000+ students trained. Book your driving lessons today.`,
  keywords:
    "driving school Kenya, NTSA certified driving instructor, learn to drive Nairobi, automatic driving lessons, manual transmission lessons, motorcycle training, truck license, Kiambu driving school, best driving school Kenya",
  authors: [{ name: "FIVE ST★R Driving School" }],
  creator: "FIVE ST★R Driving School",
  alternates: {
    canonical: "https://fivestardrivingschools.com/",
  },
  openGraph: {
    title: "FIVE ST★R Driving School Kenya - Premium Driving Training",
    description: `Kenya's #1 NTSA-certified driving school. Learn from expert instructors across ${branches.length} locations. 20,000+ students trained. Affordable, flexible, and professional.`,
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
    description: `Learn from certified instructors at Kenya's #1 driving school. ${branches.length} locations, flexible scheduling, 20,000+ students trained.`,
    images: ["/logo.png"],
    creator: "@FiveStarDriving",
  },
  applicationName: "FIVE ST★R Driving School",
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
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
    description: `Kenya's trusted NTSA-certified driving school with ${branches.length} locations across Nairobi and Kiambu counties`,
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
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
