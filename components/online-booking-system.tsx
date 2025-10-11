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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarIcon, Clock, MapPin, User, Phone, CreditCard, CheckCircle, AlertCircle, Loader } from "lucide-react"
import { format } from "date-fns"

interface TimeSlot {
  time: string
  available: boolean
  instructor?: string
}

interface BookingData {
  course: string
  branch: string
  date: Date | undefined
  timeSlot: string
  instructor: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    age: string
    experience: string
  }
  paymentMethod: string
  specialRequests: string
}

export function OnlineBookingSystem() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [bookingData, setBookingData] = useState<BookingData>({
    course: "",
    branch: "",
    date: undefined,
    timeSlot: "",
    instructor: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      experience: "",
    },
    paymentMethod: "",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  const courses = [
    { id: "b1-auto", name: "B1 Automatic Car License", price: 13000, duration: "30 lessons" },
    { id: "b2-manual", name: "B2 Manual Car License", price: 13000, duration: "30 lessons" },
    { id: "motorcycle", name: "A2/A3 Motorcycle License", price: 7000, duration: "20 lessons" },
    { id: "combined", name: "B1 & B2 Combined Package", price: 14000, duration: "35 lessons" },
    { id: "truck", name: "C1/C2 Light Truck License", price: 13000, duration: "30 lessons" },
    { id: "van", name: "D1/D2 Van License", price: 8500, duration: "25 lessons" },
  ]

  const branches = [
    { id: "roysambu", name: "Roysambu", address: "Kamiti Road", phone: "0794 478 773" },
    { id: "zimmerman", name: "Zimmerman", address: "Kamiti Road", phone: "0797 719 618" },
    { id: "tassia", name: "Tassia", address: "Embakasi", phone: "0796 247 793" },
    { id: "kahawa-west", name: "Kahawa West", address: "Kiambu Road", phone: "0707 297 889" },
    { id: "utawala", name: "Utawala", address: "Eastern Bypass", phone: "0717 772 212" },
    { id: "kahawa-wendani", name: "Kahawa Wendani", address: "Kiambu Road", phone: "0790 161 009" },
    { id: "sunton", name: "Sunton", address: "Kasarani", phone: "0748 429 757" },
  ]

  const instructors = [
    { id: "", name: "", specialization: "Manual & Automatic Cars", rating: 4.9 },
    { id: "", name: "", specialization: "Motorcycles & Tuk Tuks", rating: 4.8 },
    { id: "", name: "", specialization: "Trucks & Commercial Vehicles", rating: 4.9 },
    { id: "", name: "", specialization: "Theory & Road Safety", rating: 4.7 },
    { id: "", name: "", specialization: "All Vehicle Types", rating: 4.8 },
  ]

  const timeSlots: TimeSlot[] = [
    { time: "08:00 AM", available: true, instructor: "" },
    { time: "09:00 AM", available: true, instructor: "" },
    { time: "10:00 AM", available: false, instructor: "" },
    { time: "11:00 AM", available: true, instructor: "" },
    { time: "12:00 PM", available: true, instructor: "" },
    { time: "01:00 PM", available: false, instructor: "" },
    { time: "02:00 PM", available: true, instructor: "" },
    { time: "03:00 PM", available: true, instructor: "" },
    { time: "04:00 PM", available: true, instructor: "" },
    { time: "05:00 PM", available: false, instructor: "" },
  ]

  const handleSubmitBooking = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsSubmitting(false)
    setBookingComplete(true)

    // Send confirmation email/SMS (simulated)
    console.log("Booking submitted:", bookingData)
  }

  const selectedCourse = courses.find((c) => c.id === bookingData.course)
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
              <p className="text-lg text-gray-600 mb-8">
                Your driving lesson has been successfully booked. You'll receive a confirmation email and SMS shortly.
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Booking Details:</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Course:</strong> {selectedCourse?.name}
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
                  <p>
                    <strong>Instructor:</strong> {bookingData.instructor}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
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
                      branch: "",
                      date: undefined,
                      timeSlot: "",
                      instructor: "",
                      personalInfo: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        age: "",
                        experience: "",
                      },
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
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            Book Your Lesson
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Schedule your driving lesson with our expert instructors
          </p>
        </div>

        {/* Progress Steps */}
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
            {/* Step 1: Course & Branch Selection */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Course & Branch</h3>

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
                              <div className="flex justify-between items-center w-full">
                                <span>{course.name}</span>
                                <Badge variant="outline" className="ml-2">
                                  Ksh {course.price.toLocaleString()}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

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
                  </div>

                  {selectedCourse && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl">
                      <h4 className="font-semibold text-gray-900 mb-2">Selected Course:</h4>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{selectedCourse.name}</p>
                          <p className="text-sm text-gray-600">{selectedCourse.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-red-600">Ksh {selectedCourse.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white px-8 py-3"
                    onClick={() => setCurrentStep(2)}
                    disabled={!bookingData.course || !bookingData.branch}
                  >
                    Next: Select Date & Time
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h3>

                  <div className="grid md:grid-cols-2 gap-8">
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
                            disabled={
                              (date) => date < new Date() || date.getDay() === 0 // Disable past dates and Sundays
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label className="text-lg font-semibold text-gray-700 mb-4 block">Available Time Slots</Label>
                      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
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
                                  instructor: slot.instructor || "",
                                }))
                              }
                            }}
                            disabled={!slot.available}
                          >
                            <div className="text-center">
                              <div className="font-medium">{slot.time}</div>
                              {slot.instructor && <div className="text-xs opacity-75">{slot.instructor}</div>}
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {bookingData.timeSlot && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                      <h4 className="font-semibold text-gray-900 mb-2">Selected Schedule:</h4>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{selectedDate ? format(selectedDate, "PPP") : "No date selected"}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{bookingData.timeSlot}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{bookingData.instructor}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white px-8 py-3"
                    onClick={() => setCurrentStep(3)}
                    disabled={!selectedDate || !bookingData.timeSlot}
                  >
                    Next: Personal Information
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Personal Information */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 mb-2 block">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={bookingData.personalInfo.firstName}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, firstName: e.target.value },
                          }))
                        }
                        className="h-12"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={bookingData.personalInfo.lastName}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, lastName: e.target.value },
                          }))
                        }
                        className="h-12"
                        placeholder="Enter your last name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.personalInfo.email}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, email: e.target.value },
                          }))
                        }
                        className="h-12"
                        placeholder="Enter your email"
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
                        placeholder="0700 000 000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="age" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Age *
                      </Label>
                      <Select
                        value={bookingData.personalInfo.age}
                        onValueChange={(value) =>
                          setBookingData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, age: value },
                          }))
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16-17">16-17 years</SelectItem>
                          <SelectItem value="18-25">18-25 years</SelectItem>
                          <SelectItem value="26-35">26-35 years</SelectItem>
                          <SelectItem value="36-45">36-45 years</SelectItem>
                          <SelectItem value="46-55">46-55 years</SelectItem>
                          <SelectItem value="55+">55+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="experience" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Driving Experience
                      </Label>
                      <Select
                        value={bookingData.personalInfo.experience}
                        onValueChange={(value) =>
                          setBookingData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, experience: value },
                          }))
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Complete beginner</SelectItem>
                          <SelectItem value="basic">Some practice with family/friends</SelectItem>
                          <SelectItem value="intermediate">Can drive but need certification</SelectItem>
                          <SelectItem value="refresher">Need refresher training</SelectItem>
                        </SelectContent>
                      </Select>
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
                      !bookingData.personalInfo.firstName ||
                      !bookingData.personalInfo.lastName ||
                      !bookingData.personalInfo.email ||
                      !bookingData.personalInfo.phone ||
                      !bookingData.personalInfo.age
                    }
                  >
                    Next: Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Payment & Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment & Confirmation</h3>

                  {/* Booking Summary */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h4>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Course:</span>
                          <span className="font-medium">{selectedCourse?.name}</span>
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
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">{bookingData.timeSlot}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Instructor:</span>
                          <span className="font-medium">{bookingData.instructor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Student:</span>
                          <span className="font-medium">
                            {bookingData.personalInfo.firstName} {bookingData.personalInfo.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{bookingData.personalInfo.phone}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-gray-900 font-semibold">Total Amount:</span>
                          <span className="text-2xl font-bold text-red-600">
                            Ksh {selectedCourse?.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <Label className="text-lg font-semibold text-gray-700 mb-4 block">Choose Payment Method</Label>

                    <Tabs
                      value={bookingData.paymentMethod}
                      onValueChange={(value) => setBookingData((prev) => ({ ...prev, paymentMethod: value }))}
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="mpesa">M-PESA</TabsTrigger>
                        <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                        <TabsTrigger value="branch">Pay at Branch</TabsTrigger>
                      </TabsList>

                      <TabsContent value="mpesa" className="mt-6">
                        <Card className="border-green-200 bg-green-50">
                          <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                                <CreditCard className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">M-PESA Payment</h4>
                                <p className="text-sm text-gray-600">Pay instantly via M-PESA</p>
                              </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium">Paybill:</span>
                                <span className="font-bold text-green-600">400200</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Account:</span>
                                <span className="font-bold text-green-600">40096666</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Amount:</span>
                                <span className="font-bold">Ksh {selectedCourse?.price.toLocaleString()}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-3">
                              After payment, upload your M-PESA confirmation message via WhatsApp
                            </p>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="bank" className="mt-6">
                        <Card className="border-blue-200 bg-blue-50">
                          <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                                <CreditCard className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">Bank Transfer</h4>
                                <p className="text-sm text-gray-600">Transfer to our bank account</p>
                              </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium">Bank:</span>
                                <span className="font-bold">CO-OPERATIVE BANK</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Branch:</span>
                                <span className="font-bold">TRM Branch</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Account:</span>
                                <span className="font-bold text-blue-600">01192245021100</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Amount:</span>
                                <span className="font-bold">Ksh {selectedCourse?.price.toLocaleString()}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="branch" className="mt-6">
                        <Card className="border-purple-200 bg-purple-50">
                          <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                                <MapPin className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">Pay at Branch</h4>
                                <p className="text-sm text-gray-600">Pay when you arrive for your lesson</p>
                              </div>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                              <p className="text-sm text-gray-700 mb-2">
                                You can pay at the <strong>{selectedBranch?.name}</strong> branch before your lesson
                                starts.
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Address:</strong> {selectedBranch?.address}
                                <br />
                                <strong>Phone:</strong> {selectedBranch?.phone}
                              </p>
                            </div>
                            <div className="flex items-center mt-3 text-amber-600">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              <span className="text-xs">Please arrive 15 minutes early for payment processing</span>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Back
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3"
                        disabled={!bookingData.paymentMethod}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm Booking
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Your Booking</DialogTitle>
                        <DialogDescription>
                          Please review your booking details before confirming. This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="py-4">
                        <p className="text-sm text-gray-600 mb-4">
                          By confirming this booking, you agree to our terms and conditions. You will receive a
                          confirmation email and SMS with further instructions.
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
