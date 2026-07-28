import { PhotoGalleryViewer } from "@/components/photo-gallery-viewer"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Photo Gallery | FIVE ST★R Driving School Kenya",
  description: "Browse our modern vehicle fleet, branches, and training facilities. NTSA-certified driving school with state-of-the-art equipment and professional instructors.",
  keywords: "driving school vehicles, training facilities, NTSA certified, vehicle fleet Kenya",
  openGraph: {
    title: "Photo Gallery | FIVE ST★R Driving School",
    description: "Explore our modern training vehicles and professional facilities.",
    url: "https://fivestardrivingschools.com/gallery",
  },
}

export default function GalleryPage() {
  return <PhotoGalleryViewer />
}
