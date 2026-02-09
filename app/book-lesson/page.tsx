"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Clock, CheckCircle2, Calendar, Users, Zap } from "lucide-react"

export default function BookLessonPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    lessonType: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "",
        lessonType: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
      })
      setSubmitted(false)
    }, 3000)
  }

  const branches = [
    "Roysambu (Head Office)",
    "Zimmerman",
    "Tassia / Nyayo Estate",
    "Kahawa West",
    "Utawala",
    "Utawala B",
    "Kahawa Wendani",
    "Sunton",
    "Maziwa/Kiamumbi",
    "Ruiru",
    "Kahawa Sukari",
    "Juja",
    "Seasons (Kasarani)",
  ]

  const lessonTypes = [
    "Automatic Manual",
    "Manual Transmission",
    "Refresher Course",
    "Advanced Training",
    "HGV/PSV Training",
    "Express Course",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Lesson</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Start your journey to becoming a confident driver with Five Star Driving School
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Why Book With Us */}
          <Card className="border-2 border-red-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <CheckCircle2 className="w-5 h-5" />
                Why Book With Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Zap className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-sm">Professional instructors with years of experience</p>
              </div>
              <div className="flex gap-2">
                <Zap className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-sm">Modern, well-maintained vehicles</p>
              </div>
              <div className="flex gap-2">
                <Zap className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-sm">Flexible scheduling to fit your needs</p>
              </div>
              <div className="flex gap-2">
                <Zap className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-sm">Multiple branches across Nairobi and Kiambu</p>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Types */}
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Users className="w-5 h-5" />
                Our Lesson Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lessonTypes.map((type) => (
                <div key={type} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  {type}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Contact */}
          <Card className="border-2 border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Phone className="w-5 h-5" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Call Us</p>
                <p className="text-sm text-gray-600">0794 478 773</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/254794478773"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Chat with us
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Hours</p>
                <p className="text-sm text-gray-600">Mon-Fri: 7AM-7PM</p>
                <p className="text-sm text-gray-600">Sat: 8AM-5PM</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <Card className="max-w-2xl mx-auto shadow-2xl border-2 border-red-200">
          <CardHeader className="bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Fill in Your Details
            </CardTitle>
            <CardDescription className="text-white/90">
              Tell us about your lesson preferences and we'll get back to you shortly
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="mb-4 flex justify-center">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Received!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for booking with Five Star Driving School. We'll contact you shortly to confirm your lesson.
                </p>
                <p className="text-sm text-gray-500">Redirecting...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-800">Personal Information</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="border-2 border-gray-300 focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="border-2 border-gray-300 focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0700 000 000"
                      required
                      className="border-2 border-gray-300 focus:border-red-600"
                    />
                  </div>
                </div>

                {/* Lesson Preferences */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-lg text-gray-800">Lesson Preferences</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Branch *</label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-red-600 focus:outline-none"
                      >
                        <option value="">Choose a branch</option>
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Type *</label>
                      <select
                        name="lessonType"
                        value={formData.lessonType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-red-600 focus:outline-none"
                      >
                        <option value="">Choose lesson type</option>
                        {lessonTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                      <Input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300 focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-red-600 focus:outline-none"
                      >
                        <option value="">Choose time</option>
                        <option value="07:00">7:00 AM</option>
                        <option value="08:00">8:00 AM</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special requests or information you'd like to share..."
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-red-600 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6 flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Book Your Lesson Now
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  * Required fields. We'll contact you to confirm your booking.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
