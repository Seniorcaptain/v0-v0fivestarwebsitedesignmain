"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, BookOpen, Award } from "lucide-react"
import Link from "next/link"

interface CourseCard {
  id: string
  name: string
  icon: string
  price: string
  lessons: number
  duration: string
  features: string[]
  popular?: boolean
}

const COURSES: CourseCard[] = [
  {
    id: "a2a3",
    name: "Motorcycle License (A2/A3)",
    icon: "🏍️",
    price: "8,000 KES",
    lessons: 20,
    duration: "4-6 weeks",
    features: ["Theory lessons", "Practical training", "Safety certification", "License exam prep"],
    popular: false,
  },
  {
    id: "b1",
    name: "B1 Automatic Car",
    icon: "🚗",
    price: "12,000 KES",
    lessons: 30,
    duration: "6-8 weeks",
    features: ["Comfortable learning", "Modern vehicles", "Flexible schedule", "Expert instructors"],
    popular: true,
  },
  {
    id: "b2",
    name: "B2 Manual Car",
    icon: "🚙",
    price: "14,000 KES",
    lessons: 30,
    duration: "6-8 weeks",
    features: ["Full control", "Advanced skills", "Professional training", "Career ready"],
    popular: true,
  },
  {
    id: "b1b2",
    name: "B1 & B2 Combined",
    icon: "🚕",
    price: "26,000 KES",
    lessons: 60,
    duration: "12-14 weeks",
    features: ["Both licenses", "Save money", "Complete mastery", "Most popular"],
    popular: false,
  },
  {
    id: "c",
    name: "C Light Truck",
    icon: "🚛",
    price: "16,000 KES",
    lessons: 30,
    duration: "6-8 weeks",
    features: ["Commercial driving", "Cargo handling", "Safety procedures", "Road rules"],
    popular: false,
  },
  {
    id: "d",
    name: "D Van License",
    icon: "🚐",
    price: "18,000 KES",
    lessons: 30,
    duration: "6-8 weeks",
    features: ["Passenger safety", "Vehicle maintenance", "Emergency response", "Professional cert"],
    popular: false,
  },
]

export function SimpleCourseCards() {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Courses</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All-inclusive pricing with no hidden fees. Choose your course and start learning today.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {COURSES.map((course) => (
            <Card
              key={course.id}
              className={`flex flex-col h-full border-2 transition-all hover:shadow-lg ${
                course.popular
                  ? "border-red-400 bg-gradient-to-br from-red-50 to-white ring-2 ring-red-200"
                  : "border-gray-200 hover:border-red-300"
              }`}
            >
              {/* Popular Badge */}
              {course.popular && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{course.icon}</div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
                    <p className="text-2xl font-bold text-red-600">{course.price}</p>
                  </div>
                </div>
                <CardTitle className="text-lg text-gray-900">{course.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex-grow flex flex-col">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-semibold text-gray-800">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-red-600" />
                    <div>
                      <p className="text-xs text-gray-500">Lessons</p>
                      <p className="text-sm font-semibold text-gray-800">{course.lessons}</p>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-6 flex-grow">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href="/book-lesson" className="w-full">
                  <Button
                    className={`w-full ${
                      course.popular
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Choose Course
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All-Inclusive Banner */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">All-Inclusive Pricing</h3>
                <p className="text-gray-700">
                  Every course includes unlimited theory lessons, practical training with modern vehicles, NTSA-certified
                  instructors, and your learner's manual. No hidden fees. No surprises. Just professional driving education.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
