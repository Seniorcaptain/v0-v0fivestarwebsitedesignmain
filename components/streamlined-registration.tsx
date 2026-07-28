"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, ArrowRight, AlertCircle } from "lucide-react"

interface FormData {
  fullName: string
  phone: string
  email: string
  branch: string
  courseType: string
  preferredDate: string
  experience: string
}

const COURSES = [
  { id: "a2a3", name: "A2/A3 Motorcycle License", price: "8,000 KES", lessons: "20 lessons" },
  { id: "b1", name: "B1 Automatic Car License", price: "12,000 KES", lessons: "30 lessons" },
  { id: "b2", name: "B2 Manual Car License", price: "14,000 KES", lessons: "30 lessons" },
  { id: "b1b2", name: "B1 & B2 Combined Package", price: "26,000 KES (Save 2,000)", lessons: "60 lessons" },
  { id: "c", name: "C Light Truck License", price: "16,000 KES", lessons: "30 lessons" },
  { id: "d", name: "D Van License", price: "18,000 KES", lessons: "30 lessons" },
  { id: "e", name: "E Heavy Truck License", price: "20,000 KES", lessons: "30 lessons" },
]

const BRANCHES = [
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

export function StreamlinedRegistration() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    branch: "",
    courseType: "",
    preferredDate: "",
    experience: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.branch) newErrors.branch = "Please select a branch"
    if (!formData.courseType) newErrors.courseType = "Please select a course"
    if (!formData.preferredDate) newErrors.preferredDate = "Please select a preferred date"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        branch: "",
        courseType: "",
        preferredDate: "",
        experience: "",
      })
      setSubmitted(false)
    }, 5000)
  }

  const selectedCourse = COURSES.find((c) => c.id === formData.courseType)

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Success State */}
      {submitted ? (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-300">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Registration Confirmed</h3>
            <p className="text-gray-700 mb-2">Thank you for registering with FIVE STAR Driving School!</p>
            <p className="text-sm text-gray-600">
              We will contact you within 24 hours to confirm your lesson schedule.
            </p>
            <p className="text-xs text-gray-500 mt-6">Redirecting to home page...</p>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Simple Registration</h2>
            <p className="text-gray-600">
              Just a few details and you&apos;re ready to start your driving journey
            </p>
          </div>

          {/* Personal Information Section */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Your Information</CardTitle>
              <CardDescription>Tell us about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value })
                    if (errors.fullName) setErrors({ ...errors, fullName: "" })
                  }}
                  className={`border-2 ${errors.fullName ? "border-red-400" : "border-gray-300"} focus:border-blue-500`}
                />
                {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone & Email Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    placeholder="0700 000 000"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      if (errors.phone) setErrors({ ...errors, phone: "" })
                    }}
                    className={`border-2 ${errors.phone ? "border-red-400" : "border-gray-300"} focus:border-blue-500`}
                  />
                  {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (errors.email) setErrors({ ...errors, email: "" })
                    }}
                    className={`border-2 ${errors.email ? "border-red-400" : "border-gray-300"} focus:border-blue-500`}
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Driving Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driving Experience</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner - Never driven</option>
                  <option value="some">Some experience</option>
                  <option value="refresher">Refresher course</option>
                  <option value="professional">Professional/Commercial</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Course Selection Section */}
          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-lg">Select Your Course</CardTitle>
              <CardDescription>Choose the license type you want to learn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {COURSES.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, courseType: course.id })
                      if (errors.courseType) setErrors({ ...errors, courseType: "" })
                    }}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      formData.courseType === course.id
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    <p className="font-medium text-sm text-gray-900">{course.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{course.price}</p>
                  </button>
                ))}
              </div>
              {errors.courseType && <p className="text-sm text-red-600">{errors.courseType}</p>}

              {/* Price Display */}
              {selectedCourse && (
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200 mt-4">
                  <p className="text-sm text-gray-600">Selected Course:</p>
                  <p className="text-lg font-bold text-red-600">{selectedCourse.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedCourse.lessons}</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">{selectedCourse.price}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Branch & Date Section */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg">Lesson Details</CardTitle>
              <CardDescription>Choose your preferred branch and date</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Branch Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Branch *</label>
                <select
                  value={formData.branch}
                  onChange={(e) => {
                    setFormData({ ...formData, branch: e.target.value })
                    if (errors.branch) setErrors({ ...errors, branch: "" })
                  }}
                  className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none bg-white ${
                    errors.branch ? "border-red-400" : "border-gray-300"
                  } focus:border-green-500`}
                >
                  <option value="">Select a branch near you</option>
                  {BRANCHES.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
                {errors.branch && <p className="text-sm text-red-600 mt-1">{errors.branch}</p>}
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Date *</label>
                <Input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => {
                    setFormData({ ...formData, preferredDate: e.target.value })
                    if (errors.preferredDate) setErrors({ ...errors, preferredDate: "" })
                  }}
                  className={`border-2 ${errors.preferredDate ? "border-red-400" : "border-gray-300"} focus:border-green-500`}
                />
                {errors.preferredDate && <p className="text-sm text-red-600 mt-1">{errors.preferredDate}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="space-y-4">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg py-6 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              Complete Registration
              <ArrowRight className="w-5 h-5" />
            </Button>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-semibold">All fees are all-inclusive</p>
                <p className="text-xs mt-1">No hidden costs. We&apos;ll contact you within 24 hours to confirm your schedule.</p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
