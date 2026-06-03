import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FIVE ST★R Driving School - Driving is Fun",
  description:
    "Learn to drive with Kenya's most trusted NTSA-certified instructors. Modern vehicles, structured programs, all-inclusive pricing. 20+ locations across Nairobi and Kiambu - Over 20,000+ students trained.",
  keywords:
    "driving school Kenya, NTSA certified, learn to drive Nairobi, driving lessons, automatic car lessons, manual car lessons, motorcycle license, truck license, 20+ locations, all inclusive fees",
  openGraph: {
    title: "FIVE ST★R Driving School - Kenya's Premier Driving School",
    description: "Driving is Fun. Learn from NTSA-certified instructors. 20+ locations, 20,000+ students trained.",
    images: ["/placeholder.svg?height=630&width=1200&text=FIVE ST★R+Driving+School"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIVE ST★R Driving School - Kenya's Premier Driving School",
    description: "Driving is Fun. Learn from NTSA-certified instructors. 20+ locations, 20,000+ students trained.",
    images: ["/placeholder.svg?height=630&width=1200&text=FIVE ST★R+Driving+School"],
  },
  generator: "custom",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#dc2626",
  icons: {
    icon: "/placeholder.svg?height=32&width=32&text=FS",
    apple: "/placeholder.svg?height=180&width=180&text=FS",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
