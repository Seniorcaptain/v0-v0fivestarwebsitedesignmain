"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarIcon, Phone, CheckCircle, Loader, Download } from "lucide-react"
import { format } from "date-fns"
import jsPDF from "jspdf"

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingData {
  course: string
  classType: string
  branch: string
  date: Date | undefined
  timeSlot: string
  personalInfo: {
    name: string
    phone: string
    idNumber: string
  }
  paymentMethod: string
  specialRequests: string
}

export function EnhancedBookingSystem() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [bookingData, setBookingData] = useState<BookingData>({
    course: "",
    classType: "",
    branch: "",
    date: undefined,
    timeSlot: "",
    personalInfo: {
      name: "",
      phone: "",
      idNumber: "",
    },
    paymentMethod: "",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingReference, setBookingReference] = useState("")

  const courses = [
    {
      id: "a2-a3-motorcycle",
      name: "A2/A3 Motorcycle License",
      price: "Ksh 7,000 - 12,000",
      description:
        "Motorcycle training with multiple pricing options - A2 (7,000) Test & Theory or A2/A3 (12,000) 10 Lessons",
      features: [
        "Option 1: A2 Motorcycle - Ksh 7,000 (Test & Theory)",
        "Option 2: A2 Motorcycle - Ksh 12,000 (10 Lessons)",
        "Option 3: A3 M/Cycle Taxi & 3 Wheelers - Ksh 12,000 (10 Lessons)",
        "Duration: 21 Days for all options",
        "FREE Learner's Manual",
      ],
    },
    {
      id: "b1-auto",
      name: "B1 Automatic Car License",
      price: "Ksh 13,000",
      description: "Perfect for beginners - Our Fee is All Inclusive",
      features: ["30 Practical Lessons", "Unlimited Theory", "Basic Mechanics", "FREE Learner's Manual"],
    },
    {
      id: "b2-manual",
      name: "B2 Manual Car License",
      price: "Ksh 13,000",
      description: "Complete driving mastery - Our Fee is All Inclusive",
      features: ["30 Practical Lessons", "Unlimited Theory", "Basic Mechanics", "FREE Learner's Manual"],
    },
    {
      id: "combined",
      name: "B1 & B2 Combined Package",
      price: "Ksh 20,000",
      description: "Best value package - Our Fee is All Inclusive",
      features: ["30 Practical Lessons", "Unlimited Theory", "Basic Mechanics", "FREE Learner's Manual"],
    },
    {
      id: "truck",
      name: "C1/C2 Light Truck License",
      price: "Ksh 18,000",
      description: "Commercial driving - Our Fee is All Inclusive",
      features: ["30 Practical Lessons", "Unlimited Theory", "Basic Mechanics", "FREE Learner's Manual"],
    },
    {
      id: "van",
      name: "B3/D1/D2 Professional Van License",
      price: "Ksh 8,500 - 11,000",
      description:
        "Professional van training with multiple pricing options - B3 (8,500) Test & Theory or D1/D2 (11,000) 10 Lessons",
      features: [
        "Option 1: B3 Professional 7 Seater - Ksh 8,500 (Test & Theory)",
        "Option 2: D1 14 Seater Van - Ksh 11,000 (10 Lessons)",
        "Option 3: D2 33 Seater Van - Ksh 11,000 (10 Lessons)",
        "Duration: 21 Days for all options",
        "Unlimited Theory Sessions",
        "FREE Learner's Manual",
      ],
    },
  ]

  const classTypes = [
    {
      id: "private",
      name: "Private Classes",
      description: "One-on-one instruction with pick and drop services",
      features: ["Personal instructor", "Pick and drop services", "Flexible timings", "Customized pace"],
    },
    {
      id: "open",
      name: "Open Class",
      description: "Flexible scheduling with group learning environment",
      features: ["Group learning", "Flexible scheduling", "Peer interaction", "Cost effective"],
    },
    {
      id: "refresher",
      name: "Refresher Booking",
      description: "For students needing additional practice with customized lesson plans",
      features: ["Additional practice", "Customized lessons", "Skill improvement", "Confidence building"],
    },
  ]

  const branches = [
    { id: "roysambu", name: "Roysambu", address: "Kamiti Road", phone: "0794478773", whatsapp: "254794478773" },
    { id: "zimmerman", name: "Zimmerman", address: "Kamiti Road", phone: "0797719618", whatsapp: "254797719618" },
    { id: "tassia", name: "Tassia", address: "Embakasi", phone: "0796247793", whatsapp: "254796247793" },
    { id: "kahawa-west", name: "Kahawa West", address: "Kiambu Road", phone: "0707297889", whatsapp: "254707297889" },
    { id: "utawala", name: "Utawala", address: "Eastern Bypass", phone: "0717772212", whatsapp: "254717772212" },
    {
      id: "kahawa-wendani",
      name: "Kahawa Wendani",
      address: "Kiambu Road",
      phone: "0790161009",
      whatsapp: "254790161009",
    },
    { id: "sunton", name: "Sunton", address: "Kasarani", phone: "0748429757", whatsapp: "254748429757" },
    { id: "thika", name: "Thika", address: "Thika Town", phone: "0712345678", whatsapp: "254712345678" },
    { id: "kiambu", name: "Kiambu", address: "Kiambu Town", phone: "0723456789", whatsapp: "254723456789" },
    { id: "ruiru", name: "Ruiru", address: "Ruiru Town", phone: "0734567890", whatsapp: "254734567890" },
    { id: "juja", name: "Juja", address: "Juja Town", phone: "0745678901", whatsapp: "254745678901" },
    { id: "githurai", name: "Githurai", address: "Githurai 44", phone: "0756789012", whatsapp: "254756789012" },
    { id: "kasarani", name: "Kasarani", address: "Kasarani Area", phone: "0767890123", whatsapp: "254767890123" },
    { id: "pipeline", name: "Pipeline", address: "Pipeline Estate", phone: "0778901234", whatsapp: "254778901234" },
  ]

  const timeSlots: TimeSlot[] = [
    { time: "08:00 AM", available: true },
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "12:00 PM", available: true },
    { time: "01:00 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:00 PM", available: true },
    { time: "05:00 PM", available: true },
  ]

  const generateBookingReference = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `FS${timestamp}${random}`
  }

  const downloadBookingPDF = () => {
    const selectedCourse = courses.find((c) => c.id === bookingData.course)
    const selectedClassType = classTypes.find((ct) => ct.id === bookingData.classType)
    const selectedBranch = branches.find((b) => b.id === bookingData.branch)

    const doc = new jsPDF()
    
    // Set up colors
    const redColor = '#dc2626'
    const blueColor = '#2563eb'
    const grayColor = '#6b7280'
    
    // Title
    doc.setFontSize(24)
    doc.setTextColor(redColor)
    doc.text('FIVE ST★R DRIVING SCHOOL', 105, 30, { align: 'center' })
    
    doc.setFontSize(18)
    doc.setTextColor(grayColor)
    doc.text('BOOKING CONFIRMATION', 105, 45, { align: 'center' })
    
    // Booking Reference
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Booking Reference: ${bookingReference}`, 20, 70)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80)
    
    // Student Information
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text('STUDENT INFORMATION', 20, 100)
    
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Name: ${bookingData.personalInfo.name}`, 20, 115)
    doc.text(`Phone: ${bookingData.personalInfo.phone}`, 20, 125)
    doc.text(`ID Number: ${bookingData.personalInfo.idNumber}`, 20, 135)
    
    // Course Details
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text('COURSE DETAILS', 20, 155)
    
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Course: ${selectedCourse?.name}`, 20, 170)
    doc.text(`Price: ${selectedCourse?.price}`, 20, 180)
    doc.text(`Class Type: ${selectedClassType?.name}`, 20, 190)
    doc.text(`Branch: ${selectedBranch?.name} - ${selectedBranch?.address}`, 20, 200)
    doc.text(`Scheduled Date: ${selectedDate ? format(selectedDate, "PPP") : "Not selected"}`, 20, 210)
    doc.text(`Time: ${bookingData.timeSlot}`, 20, 220)
    
    // Course Features
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text('COURSE FEATURES', 20, 240)
    
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    const features = [
      '✓ 30 Practical Lessons',
      '✓ Unlimited Theory Sessions',
      '✓ Basic Mechanics Training',
      '✓ FREE Learner\'s Manual',
      '✓ NTSA Certified Training'
    ]
    
    features.forEach((feature, index) => {
      doc.text(feature, 20, 255 + (index * 10))
    })
    
    // Operating Hours
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text('OPERATING HOURS', 20, 320)
    
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text('Monday - Friday: 7:00 AM - 7:00 PM', 20, 335)
    doc.text('Saturday: 8:00 AM - 5:00 PM', 20, 345)
    doc.text('Sunday: Available Upon Request', 20, 355)
    
    // Contact Information
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text('CONTACT INFORMATION', 20, 375)
    
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Branch Phone: ${selectedBranch?.phone}`, 20, 390)
    doc.text('Main Office: 0794 478 773', 20, 400)
    doc.text('Email: info@fivestardrivingschool.co.ke', 20, 410)
    
    // Footer
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text('Thank you for choosing FIVE ST★R Driving School!', 105, 440, { align: 'center' })
    doc.text('Driving Is Fun, Driving Is Freedom.', 105, 450, { align: 'center' })
    
    // Save the PDF
    doc.save(`FIVE_STAR_Booking_${bookingReference}.pdf`)
  }

  const sendWhatsAppMessage = () => {
    const selectedCourse = courses.find((c) => c.id === bookingData.course)
    const selectedClassType = classTypes.find((ct) => ct.id === bookingData.classType)
    const selectedBranch = branches.find((b) => b.id === bookingData.branch)

    const message = `🚗 NEW BOOKING - FIVE ST★R DRIVING SCHOOL

📋 Booking Reference: ${bookingReference}
📅 Date: ${new Date().toLocaleDateString()}

👤 STUDENT DETAILS:
Name: ${bookingData.personalInfo.name}
Phone: ${bookingData.personalInfo.phone}
ID: ${bookingData.personalInfo.idNumber}

🎓 COURSE DETAILS:
Course: ${selectedCourse?.name}
Price: ${selectedCourse?.price}
Class Type: ${selectedClassType?.name}
Branch: ${selectedBranch?.name}
Date: ${selectedDate ? format(selectedDate, "PPP") : "Not selected"}
Time: ${bookingData.timeSlot}

${bookingData.specialRequests ? `📝 Special Requests: ${bookingData.specialRequests}` : ""}

Please confirm this booking and contact the student.`

    const branchWhatsApp = `https://wa.me/${selectedBranch?.whatsapp}?text=${encodeURIComponent(message)}`
    const mainWhatsApp = `https://wa.me/254794478773?text=${encodeURIComponent(message)}`

    window.open(branchWhatsApp, "_blank")
    setTimeout(() => {
      window.open(mainWhatsApp, "_blank")
    }, 1000)
  }

  const handleSubmitBooking = async () => {
    setIsSubmitting(true)
    const reference = generateBookingReference()
    setBookingReference(reference)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setBookingComplete(true)
    setTimeout(() => {
      sendWhatsAppMessage()
    }, 500)
  }

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^(\+254|254|0)[17]\d{8}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const validateIdNumber = (id: string) => {
    const idRegex = /^\d{7,8}$/
    return idRegex.test(id)
  }

  const selectedCourse = courses.find((c) => c.id === bookingData.course)
  const selectedClassType = classTypes.find((ct) => ct.id === bookingData.classType)
  const selectedBranch = branches.find((b) => b.id === bookingData.branch)

  if (bookingComplete) {
    return (
      <section id="booking" className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-white border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
              <p className="text-lg text-gray-600 mb-4">Your driving lesson has been successfully booked.</p>
              <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-4 mb-6">
                <p className="text-2xl font-bold text-red-600">Booking Reference: {bookingReference}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Booking Details:</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Course:</strong> {selectedCourse?.name}
                  </p>
                  <p>
                    <strong>Price:</strong> {selectedCourse?.price}
                  </p>
                  <p>
                    <strong>Class Type:</strong> {selectedClassType?.name}
                  </p>
                  <p>
                    <strong>Branch:</strong> {selectedBranch?.name}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedDate ? format(selectedDate, "PPP") : "Not selected"}
                  </p>
                  <p>
                    <strong>Time:</strong> {bookingData.timeSlot}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  onClick={downloadBookingPDF}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Booking Confirmation
                </Button>

                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  onClick={() => window.open(`tel:${selectedBranch?.phone}`, "_self")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Branch: {selectedBranch?.phone}
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setBookingComplete(false)
                    setCurrentStep(1)
                    setBookingData({
                      course: "",
                      classType: "",
                      branch: "",
                      date: undefined,
                      timeSlot: "",
                      personalInfo: { name: "", phone: "", idNumber: "" },
                      paymentMethod: "",
                      specialRequests: "",
                    })
                  }}
                >
                  Book Another Lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            Book Your Lesson
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Schedule your driving lesson with our expert instructors across 14 locations
          </p>
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border-2 border-yellow-300">
            <p className="text-2xl font-bold text-orange-800">🎉 Our Fee is All Inclusive 🎉</p>
            <p className="text-lg text-orange-700 mt-2">Includes a FREE Learner's Manual</p>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    currentStep >= step
                      ? "bg-gradient-to-r from-red-500 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      currentStep > step ? "bg-gradient-to-r from-red-500 to-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-white border-0 shadow-2xl">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Course & Class Type</h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Label htmlFor="course" className="text-lg font-semibold text-gray-700 mb-4 block">
                        Choose Your Course
                      </Label>
                      <Select
                        value={bookingData.course}
                        onValueChange={(value) => setBookingData((prev) => ({ ...prev, course: value }))}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              <div>
                                <div className="font-medium">{course.name}</div>
                                <div className="text-sm text-green-600 font-semibold">{course.price}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="classType" className="text-lg font-semibold text-gray-700 mb-4 block">
                        Choose Class Type
                      </Label>
                      <Select
                        value={bookingData.classType}
                        onValueChange={(value) => setBookingData((prev) => ({ ...prev, classType: value }))}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select class type" />
                        </SelectTrigger>
                        <SelectContent>
                          {classTypes.map((classType) => (
                            <SelectItem key={classType.id} value={classType.id}>
                              <div>
                                <div className="font-medium">{classType.name}</div>
                                <div className="text-sm text-gray-500">{classType.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {selectedCourse && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl">
                      <h4 className="font-semibold text-gray-900 mb-3">Selected Course Features:</h4>
                      <div className="grid md:grid-cols-1 gap-2">
                        {selectedCourse.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-2xl font-bold text-green-600">{selectedCourse.price}</p>
                        <p className="text-sm text-green-700">Multiple Pricing Options Available</p>
                      </div>
                    </div>
                  )}

                  {selectedClassType && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                      <h4 className="font-semibold text-gray-900 mb-3">Class Type Benefits:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedClassType.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white px-8 py-3"
                    onClick={() => setCurrentStep(2)}
                    disabled={!bookingData.course || !bookingData.classType}
                  >
                    Next: Select Branch & Time
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Branch & Schedule</h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Label htmlFor="branch" className="text-lg font-semibold text-gray-700 mb-4 block">
                        Choose Branch Location
                      </Label>
                      <Select
                        value={bookingData.branch}
                        onValueChange={(value) => setBookingData((prev) => ({ ...prev, branch: value }))}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select a branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch.id} value={branch.id}>
                              <div>
                                <div className="font-medium">{branch.name}</div>
                                <div className="text-sm text-gray-500">{branch.address}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-lg font-semibold text-gray-700 mb-4 block">Choose Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full h-12 justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date)
                              setBookingData((prev) => ({ ...prev, date }))
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {selectedBranch && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl">
                      <h4 className="font-semibold text-gray-900 mb-3">Branch Operating Hours:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">Monday - Friday:</span>
                          <span>8:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Saturday:</span>
                          <span>8:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Sunday:</span>
                          <span className="text-blue-600">Available Upon Request</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-lg font-semibold text-gray-700 mb-4 block">Available Time Slots</Label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={bookingData.timeSlot === slot.time ? "default" : "outline"}
                          className={`h-12 text-sm ${
                            !slot.available
                              ? "opacity-50 cursor-not-allowed"
                              : bookingData.timeSlot === slot.time
                                ? "bg-gradient-to-r from-red-500 to-blue-600 text-white"
                                : "hover:border-red-500 hover:text-red-600"
                          }`}
                          onClick={() => {
                            if (slot.available) {
                              setBookingData((prev) => ({
                                ...prev,
                                timeSlot: slot.time,
                              }))
                            }
                          }}
                          disabled={!slot.available}
                        >
                          <div className="text-center">
                            <div className="font-medium">{slot.time}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white px-8 py-3"
                    onClick={() => setCurrentStep(3)}
                    disabled={!bookingData.branch || !selectedDate || !bookingData.timeSlot}
                  >
                    Next: Personal Information
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>

                  <div className="grid md:grid-cols-1 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={bookingData.personalInfo.name}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, name: e.target.value },
                          }))
                        }
                        className="h-12"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={bookingData.personalInfo.phone}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, phone: e.target.value },
                          }))
                        }
                        className="h-12"
                        placeholder="0700 000 000 or +254700000000"
                      />
                      {bookingData.personalInfo.phone && !validatePhoneNumber(bookingData.personalInfo.phone) && (
                        <p className="text-red-500 text-sm mt-1">Please enter a valid Kenyan phone number</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="idNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                        ID Number *
                      </Label>
                      <Input
                        id="idNumber"
                        value={bookingData.personalInfo.idNumber}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, idNumber: e.target.value },
                          }))
                        }
                        className="h-12"
                        placeholder="Enter your ID number"
                      />
                      {bookingData.personalInfo.idNumber && !validateIdNumber(bookingData.personalInfo.idNumber) && (
                        <p className="text-red-500 text-sm mt-1">Please enter a valid ID number (7-8 digits)</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="requests" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Special Requests (Optional)
                    </Label>
                    <Textarea
                      id="requests"
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                      className="min-h-[100px]"
                      placeholder="Any special requirements, pickup location, or additional information..."
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white px-8 py-3"
                    onClick={() => setCurrentStep(4)}
                    disabled={
                      !bookingData.personalInfo.name ||
                      !bookingData.personalInfo.phone ||
                      !bookingData.personalInfo.idNumber ||
                      !validatePhoneNumber(bookingData.personalInfo.phone) ||
                      !validateIdNumber(bookingData.personalInfo.idNumber)
                    }
                  >
                    Next: Confirmation
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Booking</h3>

                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h4>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Course:</span>
                          <span className="font-medium">{selectedCourse?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium text-green-600">{selectedCourse?.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Class Type:</span>
                          <span className="font-medium">{selectedClassType?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Branch:</span>
                          <span className="font-medium">{selectedBranch?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">
                            {selectedDate ? format(selectedDate, "PPP") : "Not selected"}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">{bookingData.timeSlot}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Student:</span>
                          <span className="font-medium">{bookingData.personalInfo.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{bookingData.personalInfo.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">Our Fee is All Inclusive</p>
                        <p className="text-lg text-green-700">Includes FREE Learner's Manual</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Back
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm Booking
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Your Booking</DialogTitle>
                        <DialogDescription>
                          Please review your booking details before confirming. You will receive a booking confirmation
                          and WhatsApp messages will be sent to the branch.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="py-4">
                        <p className="text-sm text-gray-600 mb-4">
                          By confirming this booking, you agree to our terms and conditions. You will receive a
                          downloadable confirmation and WhatsApp messages will be sent to the branch.
                        </p>

                        <div className="flex space-x-3">
                          <Button
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                            onClick={handleSubmitBooking}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Yes, Confirm Booking
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
