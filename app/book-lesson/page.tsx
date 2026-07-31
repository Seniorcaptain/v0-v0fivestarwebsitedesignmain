import type { Metadata } from "next"
import { StreamlinedRegistration } from "@/components/streamlined-registration"

export const metadata: Metadata = {
  title: "Book Your Driving Lesson | FIVE ST★R Driving School Kenya",
  description: "Schedule your NTSA-certified driving lesson with expert instructors. 15+ locations, flexible scheduling, all-inclusive pricing. Book now - automatic & manual cars available.",
  keywords: "book driving lesson Kenya, NTSA certified instructor, driving lessons Nairobi, automatic driving, manual transmission training",
  openGraph: {
    title: "Book Your Driving Lesson | FIVE ST★R Driving School",
    description: "Schedule with our NTSA-certified instructors. Multiple locations, flexible times, transparent pricing.",
    url: "https://fivestardrivingschools.com/book-lesson",
  },
}

export default function BookLessonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Book Your Lesson</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Quick, simple registration. No hidden fees. Start learning today.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Streamlined Registration Form */}
        <StreamlinedRegistration />
      </div>
    </div>
  )
}
