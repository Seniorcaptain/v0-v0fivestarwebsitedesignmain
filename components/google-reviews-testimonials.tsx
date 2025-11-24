"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, Calendar } from "lucide-react"

interface GoogleReview {
  id: string
  name: string
  course: string
  rating: number
  review: string
  location: string
  date: string
  verified: boolean
  profileImage?: string
}

export function GoogleReviewsTestimonials() {
  const [currentPage, setCurrentPage] = useState(0)
  const reviewsPerPage = 6

  const reviews: GoogleReview[] = [
    {
      id: "1",
      name: "winfred mwendwa",
      course: "Driving Course",
      rating: 5,
      review:
        "Thanks alot to five star driving school you are the best driving in kenya 🇰🇪 with Affordable pricing and easy installment with NO HIDDEN CHANGES And safe clean modern vehicles. I enjoyed my training with you Guys and finally I passed my test!",
      location: "Five Star Branch",
      date: "a month ago",
      verified: true,
    },
    {
      id: "2",
      name: "Calvin nyabuti",
      course: "Driving Course",
      rating: 5,
      review:
        "I had an outstanding experience with Five star! From start to finish, everything was smooth, professional, and incredibly helpful. The instructors are not only knowledgeable but also patient and encouraging, which made me feel confident behind the wheel.",
      location: "Five Star Branch",
      date: "a month ago",
      verified: true,
    },
    {
      id: "3",
      name: "Agnes Kibandi",
      course: "Driving Course",
      rating: 5,
      review:
        "My training experience at five start was exemplary. I especially want to appreciate our theory teacher Mr. Felix and Our trainer in the field Mr. Mike and Mr. Jack and all Sunton management team who were so patient, flexible and respectful.",
      location: "Sunton Branch",
      date: "4 days ago",
      verified: true,
    },
    {
      id: "4",
      name: "JOSHUA KYALO",
      course: "Driving Course",
      rating: 5,
      review:
        "Five Star Driving School truly lives up to its name! From start to finish, my experience was exceptional. The instructors are incredibly patient, knowledgeable, and genuinely invested in your success. They broke down complex maneuvers into easy-to-understand steps and provided constructive feedback every single time. I felt fully prepared and confident for my driving test, and I passed with flying colors thanks to their thorough teaching. Highly recommend them to anyone looking for top-notch driving instruction!",
      location: "Five Star Branch",
      date: "3 months ago",
      verified: true,
    },
    {
      id: "5",
      name: "Aurelia Ari",
      course: "Driving Course",
      rating: 5,
      review:
        "The best driving school in kenya with very affordable pricing. With no hidden charges. They've got safe, clean and modern vehicles. I enjoyed my training with you guys",
      location: "Five Star Branch",
      date: "4 days ago",
      verified: true,
    },
    {
      id: "6",
      name: "Wangoi Mwaniki",
      course: "Driving Course",
      rating: 5,
      review: "I have had the best experience ever. This school deserves the five stars just as it's name😊",
      location: "Five Star Branch",
      date: "3 months ago",
      verified: true,
    },
    {
      id: "7",
      name: "Brian Gichure",
      course: "Driving Course",
      rating: 5,
      review:
        "Had a great experience with Five Star, I went to the Ruiru branch where I was welcomed well at reception and I found the registration, as well as application for my provisional driving license smooth and seamless. The instructors were knowledgeable and patient with me, which made me feel comfortable and confident, especially when driving manual transmission cars for the first time. I highly recommend anyone to join this school at a branch near you.",
      location: "Ruiru Branch",
      date: "a month ago",
      verified: true,
    },
    {
      id: "8",
      name: "Daniel Onyango",
      course: "Driving Course",
      rating: 5,
      review:
        "Great services indeed at affordable cost. The receptionist was so welcoming and teachers like Mr. Walter from Wendani branch exercised high working ethics and standards in their elaborate trainings both for theory and practicals, very firm. I highly recommend Five Star. Splendid, bravo.",
      location: "Wendani Branch",
      date: "a month ago",
      verified: true,
    },
    {
      id: "9",
      name: "GEOFFREY KIPKEMEI",
      course: "Driving Course",
      rating: 5,
      review:
        "Five Star Driving School is the best Driving school with full professionals and I gained experience and skills with the understanding instructors with the help of the theory teacher. I will always recommend everyone to consider five star Driving school for the best and quality Driving and theory skills.",
      location: "Five Star Branch",
      date: "3 days ago",
      verified: true,
    },
    {
      id: "10",
      name: "C. skylate",
      course: "Driving Course",
      rating: 5,
      review:
        "It's the best driving school I've ever attended. Personally, I had an amazing experience and gradually gained the confidence to drive throughout my time there. Thank you Five star team.",
      location: "Five Star Branch",
      date: "a month ago",
      verified: true,
    },
    {
      id: "11",
      name: "JUDY KARIMI",
      course: "Driving Course",
      rating: 5,
      review:
        "The best affordable driving school with best tutors and instructors. So friendly ensuring that you understand everything. At Kahawa West Branch- A young gentleman by name Peter, he is friendly, patient and ensures his 'students' are always guided in every area on matters driving. Bravo PETER!",
      location: "Kahawa West Branch",
      date: "4 months ago",
      verified: true,
    },
    {
      id: "12",
      name: "Ella Kaari",
      course: "Driving Course",
      rating: 5,
      review:
        "Great experience with this driving school. They had incredibly patient instructors who have taught me to be confident on the road. They also had very professional teachers for the theory classes.",
      location: "Five Star Branch",
      date: "a month ago",
      verified: true,
    },
    {
      id: "13",
      name: "Tasha Kimberly",
      course: "Driving Course",
      rating: 5,
      review:
        "The best driving school with professional and friendly instructors who make the driving experience fun. The Good planning and quality cars is top notch. God bless Five Star Driving school and Sunton Branch team Felix, Edward and Tabitha",
      location: "Sunton Branch",
      date: "2 months ago",
      verified: true,
    },
    {
      id: "14",
      name: "Nothando Olembo",
      course: "Driving Course",
      rating: 5,
      review:
        "By far the best driving school I've encountered! From the theory instructors to the practical instructors; I have learnt so much while being here. I appreciate everything they have done to ensure I pass my driving test. Thank you, Five Star Driving School.",
      location: "Five Star Branch",
      date: "4 months ago",
      verified: true,
    },
    {
      id: "15",
      name: "Timothy Sancho",
      course: "Driving Course",
      rating: 5,
      review:
        "Five Star Driving School is an excellent choice for learners of all ages. Known for its professional, patient instructors and well-structured lessons, the school ensures students gain confidence and skill behind the wheel. Their flexible scheduling makes it easy to fit lessons into any routine.",
      location: "Five Star Branch",
      date: "2 months ago",
      verified: true,
    },
    {
      id: "16",
      name: "Maurice Mwaura",
      course: "Driving Course",
      rating: 5,
      review:
        "The best driving school so far, fair price, great instructor, theory you are taken at your own well and kuanguka with Five star utawala is close to impossible....I am glad I choice five star....",
      location: "Utawala Branch",
      date: "a month ago",
      verified: true,
    },
    {
      id: "17",
      name: "Ngonyoku Githinji",
      course: "Driving Course",
      rating: 5,
      review:
        "I had a good time in in my training. Competent and well equipped instructors. I definitely would recommend.",
      location: "Five Star Branch",
      date: "4 days ago",
      verified: true,
    },
    {
      id: "18",
      name: "Tatyana Lahey",
      course: "Driving Course",
      rating: 5,
      review:
        "My experience at five star was honestly amazing, starting with the friendly instructors and the affordable fee with no hidden charges. I would recommend it to anyone looking for good learning experience.",
      location: "Five Star Branch",
      date: "a month ago",
      verified: true,
    },
    {
      id: "19",
      name: "Lucy Nyawira",
      course: "Driving Course",
      rating: 5,
      review:
        "To be honest it's the best driving school in Kenya. The instructors are amazing, kind and patient with their students. It really wass a five star experience",
      location: "Five Star Branch",
      date: "2 months ago",
      verified: true,
    },
    {
      id: "20",
      name: "Jimmy James Wanyama",
      course: "Driving Course",
      rating: 5,
      review:
        "Five star driving school is a driving school with very good and experienced teachers and they have a flexible timetable for someone whose either working or busy with pother things. I recommend it to another whose willing to learn driving.",
      location: "Five Star Branch",
      date: "2 months ago",
      verified: true,
    },
    {
      id: "21",
      name: "Ben Avunga",
      course: "Driving Course",
      rating: 5,
      review:
        "As a student my opinion is that they offer the best in terms of fees payment it's affordable. Learning with five star was my best experience. Thanks to all the staff and keep up the good work.",
      location: "Five Star Branch",
      date: "a month ago",
      verified: true,
    },
  ]

  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  const currentReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const totalReviews = reviews.length

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            Student Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium mb-8">
            Real reviews from over 20,000 students who successfully learned to drive with FIVE STAR
          </p>

          {/* Google Reviews Summary */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">{renderStars(5)}</div>
              <span className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">{totalReviews}</span> Google Reviews
            </div>
            <Badge className="bg-green-100 text-green-800 border-0 px-3 py-1">Verified Reviews</Badge>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentReviews.map((review) => (
            <Card key={review.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.course}</p>
                    </div>
                  </div>
                  {review.verified && <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">Verified</Badge>}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-600">{review.rating}.0</span>
                </div>

                {/* Review Text */}
                <div className="mb-4">
                  <Quote className="w-4 h-4 text-red-500 mb-2" />
                  <p className="text-gray-700 leading-relaxed text-sm">{review.review}</p>
                </div>

                {/* Review Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{review.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{review.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <Button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === i ? "bg-red-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-8">
          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-red-600 mb-2">20,000+</div>
              <p className="text-gray-600 font-medium">Students Trained</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-green-600 mb-2">97%</div>
              <p className="text-gray-600 font-medium">First-Time Pass Rate</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <p className="text-gray-600 font-medium">Locations</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-yellow-500 mb-2">5.0</div>
              <p className="text-gray-600 font-medium">Google Rating</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
