"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Clock, Users, Award, Calendar, CreditCard, CheckCircle, Filter, Zap, Truck, Download } from "lucide-react"
import { formatDateConsistent } from "@/lib/utils"

interface Course {
  id: string
  title: string
  price: string
  duration: string
  lessons: number | string
  category: string
  ageGroup: string
  vehicleType: string
  transmission: string
  ntsa_category: string
  class_type: string
  description: string
  features: string[]
  schedule: string[]
  requirements: string[]
  icon: string
  popular: boolean
  discount?: number
  bestSelling?: boolean
}

export function InteractiveCourseCards() {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    ageGroup: "all",
    transmission: "all",
    priceRange: "all",
  })
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    idNumber: "",
    branch: "",
    date: "",
    time: "",
  })
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  // Generate booking reference
  const generateBookingReference = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `FS${timestamp}${random}`
  }

  // Generate PDF for booking confirmation
  const generateBookingPDF = (course: Course) => {
    setIsGeneratingPDF(true)
    const doc = new jsPDF()
    const bookingRef = generateBookingReference()

    // Set up colors
    const redColor = "#dc2626"
    const blueColor = "#2563eb"
    const grayColor = "#6b7280"

    // Title
    doc.setFontSize(24)
    doc.setTextColor(redColor)
    doc.text("FIVE ST★R DRIVING SCHOOL", 105, 30, { align: "center" })

    doc.setFontSize(18)
    doc.setTextColor(grayColor)
    doc.text("BOOKING CONFIRMATION", 105, 45, { align: "center" })

    // Booking Reference
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Booking Reference: ${bookingRef}`, 20, 70)
    doc.text(`Date: ${formatDateConsistent(new Date())}`, 20, 80)

    // Student Information
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text("STUDENT INFORMATION", 20, 100)

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Name: ${bookingData.name}`, 20, 115)
    doc.text(`Phone: ${bookingData.phone}`, 20, 125)
    doc.text(`ID Number: ${bookingData.idNumber}`, 20, 135)

    // Course Details
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text("COURSE DETAILS", 20, 155)

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Course: ${course.title}`, 20, 170)
    doc.text(`Price: ${course.price}`, 20, 180)
    doc.text(`Branch: ${bookingData.branch}`, 20, 190)
    doc.text(`Scheduled Date: ${bookingData.date}`, 20, 200)
    doc.text(`Time: ${bookingData.time}`, 20, 210)

    // Course Features
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text("COURSE FEATURES", 20, 230)

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    const features = [
      "✓ 30 Practical Lessons (NEW NTSA Curriculum)",
      "✓ Unlimited Digital Theory Sessions",
      "✓ Enhanced Mechanics Training (2024 Standards)",
      "✓ FREE Learner's Manual (Latest Edition)",
      "✓ NTSA Certified Training (Updated Standards)",
    ]

    features.forEach((feature, index) => {
      doc.text(feature, 20, 245 + index * 10)
    })

    // Contact Information
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text("CONTACT INFORMATION", 20, 310)

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text("Main Office: 0794 478 773", 20, 325)
    doc.text("Email: info@fivestardrivingschool.co.ke", 20, 335)
    doc.text("Website: www.fivestardrivingschool.co.ke", 20, 345)

    // Footer
    doc.setFontSize(14)
    doc.setTextColor(redColor)
    doc.text("Thank you for choosing FIVE ST★R Driving School!", 105, 370, { align: "center" })
    doc.text("Driving Is Fun, Driving Is Freedom.", 105, 380, { align: "center" })

    // Save the PDF
    doc.save(`FIVE_STAR_Booking_${bookingRef}.pdf`)
    setIsGeneratingPDF(false)
  }

  // Handle direct booking
  const handleDirectBooking = (course: Course) => {
    setSelectedCourse(course)
    setShowBookingDialog(true)
  }

  // Handle booking form submission
  const handleBookingSubmit = () => {
    if (
      !bookingData.name ||
      !bookingData.phone ||
      !bookingData.idNumber ||
      !bookingData.branch ||
      !bookingData.date ||
      !bookingData.time
    ) {
      alert("Please fill in all required fields")
      return
    }

    if (selectedCourse) {
      // Generate WhatsApp message with booking details
      const whatsappMessage =
        `Hi! I would like to book the following course:%0A%0A` +
        `*Course:* ${selectedCourse.title}%0A` +
        `*Price:* ${selectedCourse.price}%0A` +
        `*Name:* ${bookingData.name}%0A` +
        `*Phone:* ${bookingData.phone}%0A` +
        `*ID Number:* ${bookingData.idNumber}%0A` +
        `*Branch:* ${bookingData.branch}%0A` +
        `*Date:* ${bookingData.date}%0A` +
        `*Time:* ${bookingData.time}%0A%0A` +
        `Please confirm my booking. Thank you!`

      // Send to WhatsApp
      window.open(`https://wa.me/254794478773?text=${whatsappMessage}`, "_blank")

      // Also generate PDF for user's records
      generateBookingPDF(selectedCourse)

      // Close dialog and reset form
      setShowBookingDialog(false)
      setBookingData({
        name: "",
        phone: "",
        idNumber: "",
        branch: "",
        date: "",
        time: "",
      })
    }
  }

  const courses: Course[] = [
    {
      id: "a2-a3-motorcycle",
      title: "A2/A3 Motorcycle License",
      price: "Ksh 7,000",
      duration: "21 Days",
      lessons: "Multiple Options",
      category: "motorcycle",
      ageGroup: "adult",
      vehicleType: "motorcycle",
      transmission: "manual",
      ntsa_category: "Category A",
      class_type: "A2 (MOTORCYCLE) / A3 (M/CYCLE TAXI & 3 WHEELERS)",
      description:
        "Complete motorcycle training program covering both A2 standard motorcycles and A3 commercial motorcycle taxi & 3-wheelers. Multiple pricing options available for different training needs.",
      features: [
        "Option 1: A2 Motorcycle - Ksh 6,500 (Test & Theory)",
        "Option 2: A2/A3 Motorcycle - Ksh 11,500 (10 Lessons)",
        "Duration: 21 Days",
        "Unlimited Theory Sessions",
        "Motorcycle Safety Training",
        "Traffic Rules & Regulations",
        "FREE Learner's Manual (NEW NTSA Curriculum)",
        "NTSA Certified Training (2024 Standards)",
        "Enhanced Digital Theory Modules",
        "Comprehensive Assessment Methods",
        "Inclusive of PDL Assessment & Final Exams",
      ],
      schedule: ["Monday - Friday: 7:00 AM - 7:00 PM", "Saturday: 8:00 AM - 5:00 PM", "Pickup and Drop (extra charge)"],
      requirements: ["Minimum age: 18 years and over", "A2/A3 Motorcycle: Valid National ID", "Passport photos (2)"],
      icon: "🏍️",
      popular: false,
      discount: 500,
    },
    {
      id: "b1-automatic",
      title: "B1 Automatic Car License",
      price: "Ksh 13,000",
      duration: "3-6 weeks",
      lessons: 30,
      category: "car",
      ageGroup: "adult",
      vehicleType: "car",
      transmission: "automatic",
      ntsa_category: "Category B",
      class_type: "B1 - (AUTOMATIC)",
      description:
        "Perfect for beginners who want to learn driving with automatic transmission vehicles. Comprehensive training with 30 practical lessons.",
      features: [
        "30 Practical Lessons (NEW NTSA Curriculum)",
        "Unlimited Digital Theory Sessions",
        "Enhanced Mechanics Training",
        "FREE Learner's Manual (2024 Edition)",
        "NTSA Certified Training (Latest Standards)",
        "Comprehensive Assessment & Testing",
        "Inclusive of PDL Assessment & Final Exams",
      ],
      schedule: ["Monday - Friday: 7:00 AM - 7:00 PM", "Saturday: 8:00 AM - 5:00 PM", "Pickup and Drop (extra charge)"],
      requirements: ["Minimum age: 18 years and over", "Valid National ID", "Passport photos (2)"],
      icon: "🚗",
      popular: true,
      discount: 0,
    },
    {
      id: "b2-manual",
      title: "B2 Manual Car License",
      price: "Ksh 13,000",
      duration: "3-6 weeks",
      lessons: 30,
      category: "car",
      ageGroup: "adult",
      vehicleType: "car",
      transmission: "manual",
      ntsa_category: "Category B",
      class_type: "B2 - (MANUAL)",
      description:
        "Master manual transmission driving with comprehensive clutch control and gear shifting training. 30 practical lessons included.",
      features: [
        "30 Practical Lessons (NEW NTSA Curriculum)",
        "Unlimited Digital Theory Sessions",
        "Enhanced Mechanics Training",
        "FREE Learner's Manual (2024 Edition)",
        "NTSA Certified Training (Latest Standards)",
        "Comprehensive Assessment & Testing",
        "Inclusive of PDL Assessment & Final Exams",
      ],
      schedule: ["Monday - Friday: 7:00 AM - 7:00 PM", "Saturday: 8:00 AM - 5:00 PM", "Pickup and Drop (extra charge)"],
      requirements: ["Minimum age: 18 years and over", "Valid National ID", "Passport photos (2)"],
      icon: "🚙",
      popular: true,
      discount: 500,
    },
    {
      id: "b1-b2-combined",
      title: "B1 & B2 Combined Package",
      price: "Ksh 14,000",
      duration: "3-6 weeks",
      lessons: 30,
      category: "car",
      ageGroup: "adult",
      vehicleType: "car",
      transmission: "both",
      ntsa_category: "Category B1 & B2",
      class_type: "MANUAL & AUTOMATIC COMBINED",
      description:
        "Get the best value! Learn both automatic and manual transmission driving in one comprehensive package. Save money with our combined course.",
      features: [
        "30 Total Lessons (Both Transmissions - NEW NTSA Curriculum)",
        "Unlimited Digital Theory Sessions",
        "Enhanced Mechanics Training",
        "FREE Learner's Manual (2024 Edition)",
        "NTSA Certified Training (Latest Standards)",
        "Comprehensive Assessment & Testing",
        "Inclusive of PDL Assessment & Final Exams",
        "SAVE KES 2000 with NEW NTSA CURRICULUM Offer!",
      ],
      schedule: ["Monday - Friday: 7:00 AM - 7:00 PM", "Saturday: 8:00 AM - 5:00 PM", "Pickup and Drop (extra charge)"],
      requirements: ["Minimum age: 18 years and over", "Valid B2 License (2 years)", "Passport photos (2)"],
      icon: "🚘",
      popular: false,
      bestSelling: true,
      discount: 2000,
    },
    {
      id: "c1-light-trucks",
      title: "C1 Light Trucks License",
      price: "Ksh 13,000",
      duration: "3-6 weeks",
      lessons: 30,
      category: "commercial",
      ageGroup: "adult",
      vehicleType: "truck",
      transmission: "manual",
      ntsa_category: "Category C",
      class_type: "C1 (LIGHT TRUCKS)",
      description:
        "Professional training for light truck driving. Perfect for delivery services and light commercial vehicle operation.",
      features: [
        "30 Practical Lessons (NEW NTSA Curriculum)",
        "Unlimited Digital Theory Sessions",
        "Enhanced Mechanics Training",
        "FREE Learner's Manual (2024 Edition)",
        "NTSA Certified Training (Latest Standards)",
        "Comprehensive Assessment & Testing",
        "Inclusive of PDL Assessment & Final Exams",
      ],
      schedule: ["Monday - Friday: 7:00 AM - 7:00 PM", "Saturday: 8:00 AM - 5:00 PM", "Pickup and Drop (extra charge)"],
      requirements: ["Minimum age: 18 years and over", "Valid B2 License (2 years)", "Passport photos (2)"],
      icon: "🚚",
      popular: false,
      discount: 500,
    },
    {
      id: "c2-medium-trucks",
      title: "C2 Medium Trucks License",
      price: "Ksh 13,000",
      duration: "3-6 weeks",
      lessons: 30,
      category: "commercial",
      ageGroup: "adult",
      vehicleType: "truck",
      transmission: "manual",
      ntsa_category: "Category C",
      class_type: "C2 (MEDIUM TRUCKS)",
      description:
        "Advanced training for medium truck operation. Ideal for those looking to drive larger commercial vehicles and cargo trucks.",
      features: [
        "30 Practical Lessons (NEW NTSA Curriculum)",
        "Unlimited Digital Theory Sessions",
        "Commercial Vehicle Training (Updated Standards)",
        "FREE Learner's Manual (2024 Edition)",
        "NTSA Certified Training (Latest Standards)",
        "Comprehensive Assessment & Testing",
        "Inclusive of PDL Assessment & Final Exams",
      ],
      schedule: ["Monday - Friday: 7:00 AM - 7:00 PM", "Saturday: 8:00 AM - 5:00 PM", "Pickup and Drop (extra charge)"],
      requirements: ["Minimum age: 18 years and over", "Valid B2 License (2 years)", "Passport photos (2)"],
      icon: "🚚",
      popular: false,
      discount: 500,
    },
    {
      id: "c2-medium-trucks",
      title: "C2 Medium Trucks License",
      price: "Ksh 13,000",
      duration: "3-6 weeks",
      lessons: 30,
      category: "commercial",
      ageGroup: "adult",
      vehicleType: "truck",
      transmission: "manual",
      ntsa_category: "Category C",
      class_type: "C2 (MEDIUM TRUCKS)",
      description:
        "Advanced training for medium truck operation. Ideal for those looking to drive larger commercial vehicles and cargo trucks.",
      features: [
        "30 Practical Lessons (NEW NTSA Curriculum)",
        "Unlimited Digital Theory Sessions",
        "Heavy Vehicle Training (Updated Standards)",
        "FREE Learner's Manual (2024 Edition)",
        "NTSA Certified Training (Latest Standards)",
        "Comprehensive Assessment & Testing",
        "Inclusive of PDL Assessment & Final Exams",
      ],
      schedule: ["Monday - Friday: 7:00 AM - 7:00 PM", "Saturday: 8:00 AM - 5:00 PM", "Pickup and Drop (extra charge)"],
      requirements: ["Minimum age: 18 years and over", "Valid C1 License", "Passport photos (2)"],
      icon: "🚛",
      popular: false,
      discount: 500,
    },
    {
      id: "b2-c1-combined",
      title: "B2:C1 Trucks & Saloon Combined",
      price: "Ksh 16,000",
      duration: "4-8 weeks",
      lessons: 30,
      category: "commercial",
      ageGroup: "adult",
      vehicleType: "combined",
      transmission: "manual",
      ntsa_category: "Category B2:C1",
      class_type: "TRUCK & SALOON COMBINED",
      description:
        "Comprehensive package combining car and light truck licenses. Perfect for those who need both personal and commercial driving capabilities.",
      features: [
        "30 Total Lessons (Cars & Trucks - NEW NTSA Curriculum)",
        "Unlimited Digital Theory Sessions",
        "Dual Vehicle Training (Updated Standards)",
        "FREE Learner's Manual (2024 Edition)",
        "NTSA Certified Training (Latest Standards)",
        "Comprehensive Assessment & Testing",
        "Inclusive of PDL Assessment & Final Exams",
        "Has Two Seperate Exams",
      ],
      schedule: ["Monday - Friday: 7:00 AM - 7:00 PM", "Saturday: 8:00 AM - 5:00 PM", "Pickup and Drop (extra charge)"],
      requirements: ["Minimum age: 18 years and over", "Valid National ID", "Passport photos (2)"],
      icon: "🚗🚚",
      popular: false,
      bestSelling: true,
      discount: 2000,
    },
    {
      id: "b3-d1-d2-van-license",
      title: "B3/D1/D2 Professional Van License",
      price: "Ksh 8,500",
      duration: "21 Days",
      lessons: "Professional",
      category: "commercial",
      ageGroup: "adult",
      vehicleType: "van",
      transmission: "manual",
      ntsa_category: "Category D",
      class_type: "PSV,Matatus,Uber,TSV",
      description:
        "Comprehensive van license program covering 7-seater, 14-seater, and 33-seater vehicles. Multiple pricing options available for different training needs.",
      features: [
        "Option 1: B3/D1/D2 Professional 7 Seater - Ksh 8,000 (Test & Theory)",
        "Option 2: B3/D1/D2 14 Seater Van - Ksh 10,500 (10 Lessons)",
        "Duration: 21 Days (NEW NTSA Curriculum)",
        "Unlimited Digital Theory Sessions",
        "Professional Driving Standards (Updated)",
        "Large Vehicle Handling (Enhanced Training)",
        "FREE Learner's Manual (2024 Edition)",
        "NTSA Certified Training (Latest Standards)",
        "Comprehensive Assessment & Testing",
        "Inclusive of PDL Assessment & Final Exams",
      ],
      schedule: ["Monday - Friday: 7:00 AM - 7:00 PM", "Saturday: 8:00 AM - 5:00 PM", "Pickup and Drop (extra charge)"],
      requirements: [
        "Age: 18 years and over",
        "B3/D1/D2 Professional: Valid B2 License",
        "Passport photos (2)",
        "Inclusive of PDL Assessment & Final Exams",
      ],
      icon: "🚐",
      popular: false,
      discount: 500,
    },
  ]

  const filterOptions = {
    category: [
      { value: "all", label: "All", icon: Filter },
      { value: "motorcycle", label: "Motorcycle", icon: Car },
      { value: "car", label: "Car", icon: Car },
      { value: "commercial", label: "Commercial", icon: Truck },
    ],
    ageGroup: [
      { value: "all", label: "All" },
      { value: "adult", label: "Adult" },
    ],
    transmission: [
      { value: "all", label: "All" },
      { value: "automatic", label: "Automatic" },
      { value: "manual", label: "Manual" },
    ],
    priceRange: [
      { value: "all", label: "All" },
      { value: "budget", label: "Under 10K" },
      { value: "standard", label: "10K - 15K" },
      { value: "premium", label: "Above 15K" },
    ],
  }

  const filteredCourses = courses.filter((course) => {
    if (selectedFilters.category !== "all" && course.category !== selectedFilters.category) return false
    if (selectedFilters.ageGroup !== "all" && course.ageGroup !== selectedFilters.ageGroup) return false
    if (
      selectedFilters.transmission !== "all" &&
      course.transmission !== selectedFilters.transmission &&
      course.transmission !== "both"
    )
      return false

    if (selectedFilters.priceRange !== "all") {
      const priceNum = Number.parseInt(course.price.replace(/[^\d]/g, ""))
      if (selectedFilters.priceRange === "budget" && priceNum >= 10000) return false
      if (selectedFilters.priceRange === "standard" && (priceNum < 10000 || priceNum > 15000)) return false
      if (selectedFilters.priceRange === "premium" && priceNum <= 15000) return false
    }

    return true
  })

  const updateFilter = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  return (
    <section id="courses" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
              🆕 LATEST UPDATE
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
            NEW NTSA CURRICULUM
          </h2>
          <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-6 mx-auto max-w-4xl mb-6">
            <p className="text-xl text-gray-800 font-semibold mb-3">
              🎯 Now Fully Compliant with Latest NTSA Standards (2024)
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
              Experience our updated curriculum featuring enhanced practical training, digital theory modules, and
              comprehensive assessment methods aligned with Kenya's new driving education requirements.
            </p>
          </div>
          <div className="mt-6 inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-8 py-4 shadow-lg">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold">6TH ANNIVERSARY</div>
              <div className="text-sm font-medium">DISCOUNT</div>
            </div>
          </div>
          {/* NEW NTSA CURRICULUM Benefits */}
          <div className="mt-6 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-green-200 rounded-xl p-4 shadow-lg">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-green-700 text-sm mb-1">Updated Standards</h3>
              <p className="text-xs text-gray-600">2024 NTSA Compliant Training</p>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-blue-700 text-sm mb-1">Digital Integration</h3>
              <p className="text-xs text-gray-600">Modern Theory Modules</p>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-xl p-4 shadow-lg">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-purple-700 text-sm mb-1">Enhanced Assessment</h3>
              <p className="text-xs text-gray-600">Comprehensive Testing</p>
            </div>
          </div>

          <div className="mt-6 inline-flex items-center bg-red-50 border border-red-200 rounded-full px-6 py-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
              <Award className="w-4 h-4 text-white" />
            </div>
            <span className="text-red-700 font-semibold text-sm">
              All courses inclusive of PDL Assessment & Final Exams
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <Tabs defaultValue="category" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="category">Category</TabsTrigger>
              <TabsTrigger value="age">Age Group</TabsTrigger>
              <TabsTrigger value="transmission">Transmission</TabsTrigger>
              <TabsTrigger value="price">Price Range</TabsTrigger>
            </TabsList>

            <TabsContent value="category">
              <div className="flex flex-wrap justify-center gap-3">
                {filterOptions.category.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedFilters.category === option.value ? "default" : "outline"}
                    className={`rounded-full transition-all duration-300 ${
                      selectedFilters.category === option.value
                        ? "bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg"
                        : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600 bg-white hover:bg-red-50"
                    }`}
                    onClick={() => updateFilter("category", option.value)}
                  >
                    <option.icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="age">
              <div className="flex flex-wrap justify-center gap-3">
                {filterOptions.ageGroup.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedFilters.ageGroup === option.value ? "default" : "outline"}
                    className={`rounded-full transition-all duration-300 ${
                      selectedFilters.ageGroup === option.value
                        ? "bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg"
                        : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600 bg-white hover:bg-red-50"
                    }`}
                    onClick={() => updateFilter("ageGroup", option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transmission">
              <div className="flex flex-wrap justify-center gap-3">
                {filterOptions.transmission.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedFilters.transmission === option.value ? "default" : "outline"}
                    className={`rounded-full transition-all duration-300 ${
                      selectedFilters.transmission === option.value
                        ? "bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg"
                        : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600 bg-white hover:bg-red-50"
                    }`}
                    onClick={() => updateFilter("transmission", option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="price">
              <div className="flex flex-wrap justify-center gap-3">
                {filterOptions.priceRange.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedFilters.priceRange === option.value ? "default" : "outline"}
                    className={`rounded-full transition-all duration-300 ${
                      selectedFilters.priceRange === option.value
                        ? "bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg"
                        : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600 bg-white hover:bg-red-50"
                    }`}
                    onClick={() => updateFilter("priceRange", option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className={`bg-white border-0 hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 group overflow-hidden relative cursor-pointer ${
                course.popular ? "ring-2 ring-red-500" : ""
              }`}
            >
              {course.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg z-10">
                  POPULAR
                </div>
              )}

              {course.bestSelling && !course.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 text-sm font-bold rounded-bl-lg z-10">
                  BEST SELLING
                </div>
              )}
              {course.discount && course.id === "b1-b2-combined" && (
                <div className="absolute top-0 left-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 text-sm font-bold rounded-br-lg z-10">
                  SAVE KES {course.discount.toLocaleString()}
                </div>
              )}



              <div className="absolute top-4 right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center z-10 opacity-90">
                <Award className="w-6 h-6 text-white" />
              </div>

              <CardHeader className="relative pb-4">
                <div className="absolute top-4 right-16 text-4xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  {course.icon}
                </div>

                <div className="flex justify-between items-start mb-4">
                  <CardTitle className="text-lg text-gray-800 group-hover:text-red-600 transition-colors duration-300 flex-1 font-bold pr-4">
                    {course.title}
                  </CardTitle>
                </div>

                <div className="mb-3">
                  <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 bg-blue-50 mb-1">
                    {course.ntsa_category}
                  </Badge>
                  <div className="text-xs text-gray-500 font-medium">{course.class_type}</div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <CardDescription className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    {course.price}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {course.duration} •{" "}
                      {typeof course.lessons === "number" ? `${course.lessons} lessons` : course.lessons}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm capitalize">{course.transmission} transmission</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Award className="w-4 h-4 mr-2" />
                    <span className="text-sm">NTSA Certified</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{course.description.substring(0, 120)}...</p>

                <div className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg"
                        onClick={() => setSelectedCourse(course)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        View Details & Book
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
                          <span className="text-3xl mr-3">{course.icon}</span>
                          {course.title}
                          {course.popular && <Badge className="ml-3 bg-red-500 text-white">Popular</Badge>}
                        </DialogTitle>
                        <DialogDescription className="text-lg text-gray-600">{course.description}</DialogDescription>
                      </DialogHeader>

                      <div className="grid md:grid-cols-2 gap-8 mt-6">
                        {/* Course Details */}
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Features</h3>
                            <ul className="space-y-2">
                              {course.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                            <ul className="space-y-2">
                              {course.requirements.map((requirement, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                                  {requirement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Pricing & Schedule */}
                        <div className="space-y-6">
                          {/* Multi-tier pricing display for A2/A3 and B3/D1/D2 */}
                          {course.id === "a2-a3-motorcycle" || course.id === "b3-d1-d2-van-license" ? (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Duration Options</h3>

                              {/* First Pricing Tier */}
                              {course.id === "a2-a3-motorcycle" && (
                                <>
                                  <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 border-2 border-pink-200">
                                    <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg text-center font-bold mb-4">
                                      Pricing Option 1
                                    </div>
                                    <div className="text-center mb-4">
                                      <div className="text-4xl font-bold text-pink-600 mb-2">6,500 KSH</div>
                                      <div className="text-sm text-gray-600">A2 Motorcycle</div>
                                    </div>
                                    <div className="space-y-2 text-sm bg-white rounded-lg p-4">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Course Fee:</span>
                                        <span className="font-semibold">Ksh 6,500 (A2)</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-semibold">21 Days</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Total Lessons:</span>
                                        <span className="font-semibold">Test & Theory</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">NTSA Category:</span>
                                        <span className="font-semibold">Category A</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Second Pricing Tier */}
                                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-200">
                                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-center font-bold mb-4">
                                      Pricing Option 2
                                    </div>
                                    <div className="text-center mb-4">
                                      <div className="text-4xl font-bold text-purple-600 mb-2">11,500 KSH</div>
                                      <div className="text-sm text-gray-600">A2 Motorcycle / A3 M/Cycle Taxi</div>
                                    </div>
                                    <div className="space-y-2 text-sm bg-white rounded-lg p-4">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Course Fee:</span>
                                        <span className="font-semibold">Ksh 11,500 (A2/A3)</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-semibold">3-6 weeks</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Total Lessons:</span>
                                        <span className="font-semibold">10 Lessons</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">NTSA Category:</span>
                                        <span className="font-semibold">Category A</span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}

                              {course.id === "b3-d1-d2-van-license" && (
                                <>
                                  <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 border-2 border-pink-200">
                                    <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg text-center font-bold mb-4">
                                      Pricing Option 1
                                    </div>
                                    <div className="text-center mb-4">
                                      <div className="text-4xl font-bold text-pink-600 mb-2">8,000 KSH</div>
                                      <div className="text-sm text-gray-600">B3/D1/D2 Professional 7 Seater</div>
                                    </div>
                                    <div className="space-y-2 text-sm bg-white rounded-lg p-4">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Course Fee:</span>
                                        <span className="font-semibold">Ksh 8,000 (B3)</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-semibold">21 Days</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Total Lessons:</span>
                                        <span className="font-semibold">Test & Theory</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">NTSA Category:</span>
                                        <span className="font-semibold">Category D</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Second Pricing Tier */}
                                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-200">
                                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-center font-bold mb-4">
                                      Pricing Option 2
                                    </div>
                                    <div className="text-center mb-4">
                                      <div className="text-4xl font-bold text-purple-600 mb-2">10,500 KSH</div>
                                      <div className="text-sm text-gray-600">B3 ,D1 14 Seater / D2 33 Seater</div>
                                    </div>
                                    <div className="space-y-2 text-sm bg-white rounded-lg p-4">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Course Fee:</span>
                                        <span className="font-semibold">Ksh 10,500 (D1/D2)</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-semibold">3-6 weeks</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Total Lessons:</span>
                                        <span className="font-semibold">10 Lessons</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">NTSA Category:</span>
                                        <span className="font-semibold">Category D</span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          ) : (
                            // Standard single pricing display for other courses
                            <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-6">
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Duration</h3>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700">Course Fee:</span>
                                  <span className="text-2xl font-bold text-red-600">{course.price}</span>
                                </div>
                                {course.discount && (
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-700">You Save:</span>
                                    <span className="text-lg font-semibold text-green-600">
                                      Ksh {course.discount.toLocaleString()}
                                    </span>
                                  </div>
                                )}
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700">Duration:</span>
                                  <span className="font-semibold">{course.duration}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700">Total Lessons:</span>
                                  <span className="font-semibold">
                                    {typeof course.lessons === "number" ? `${course.lessons} lessons` : course.lessons}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700">NTSA Category:</span>
                                  <span className="font-semibold">{course.ntsa_category}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Schedule</h3>
                            <ul className="space-y-2">
                              {course.schedule.map((time, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                  <Clock className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                                  {time}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-3">
                            <Button
                              className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white text-lg py-3 rounded-full shadow-lg"
                              onClick={() => handleDirectBooking(course)}
                            >
                              <Calendar className="w-5 h-5 mr-2" />
                              Book This Course
                            </Button>

                            <Button
                              variant="outline"
                              className="w-full border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600 bg-transparent"
                              onClick={() => {
                                window.open("tel:0794478773", "_self")
                              }}
                            >
                              <CreditCard className="w-5 h-5 mr-2" />
                              Call for Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600 bg-white"
                    onClick={() => {
                      window.open(
                        `https://wa.me/254794478773?text=Hi, I'm interested in the ${course.title} course. Can you provide more information?`,
                        "_blank",
                      )
                    }}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Quick Inquiry
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No courses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more courses</p>
            <Button
              variant="outline"
              onClick={() =>
                setSelectedFilters({
                  category: "all",
                  ageGroup: "all",
                  transmission: "all",
                  priceRange: "all",
                })
              }
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Direct Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Book <span className="text-red-600">{selectedCourse?.title}</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Fill in your details to complete your booking and download your confirmation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Course Info */}
            {selectedCourse && (
              <div className="bg-gradient-to-r from-red-50 to-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{selectedCourse.title}</h3>
                <p className="text-2xl font-bold text-red-600">{selectedCourse.price}</p>
                <p className="text-sm text-gray-600">{selectedCourse.description}</p>
              </div>
            )}

            {/* Booking Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="0700123456"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  placeholder="12345678"
                  value={bookingData.idNumber}
                  onChange={(e) => setBookingData({ ...bookingData, idNumber: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Preferred Branch *</Label>
                <Select
                  value={bookingData.branch}
                  onValueChange={(value) => setBookingData({ ...bookingData, branch: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Roysambu">Roysambu - Jeda Plaza</SelectItem>
                    <SelectItem value="Zimmerman">Zimmerman - Near Ocean Hardware</SelectItem>
                    <SelectItem value="Tassia">Tassia/Nyayo Estate - Near Footbridge</SelectItem>
                    <SelectItem value="Kahawa West">Kahawa West - Mukuyu Plaza</SelectItem>
                    <SelectItem value="Utawala">Utawala - Benedicta Junction</SelectItem>
                    <SelectItem value="Utawala B">Utawala B - Opposite AP Training Centre</SelectItem>
                    <SelectItem value="Kahawa Wendani">Kahawa Wendani - Next to Magunas Supermarket</SelectItem>
                    <SelectItem value="Sunton">Sunton - Opposite Murema Primary School</SelectItem>
                    <SelectItem value="Maziwa/Kiamumbi">Maziwa/Kiamumbi - Opposite PCEA Kahawa Farmers</SelectItem>
                    <SelectItem value="Ruiru">Ruiru - National Bank Building</SelectItem>
                    <SelectItem value="Kahawa Sukari">Kahawa Sukari - Baraka House next to Quickmart</SelectItem>
                    <SelectItem value="Juja">Juja - Next to Daykan College</SelectItem>
                    <SelectItem value="Seasons">Seasons, Kasarani - Seasons Stage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time *</Label>
                <Select
                  value={bookingData.time}
                  onValueChange={(value) => setBookingData({ ...bookingData, time: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7:00 AM">7:00 AM</SelectItem>
                    <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                    <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                    <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                    <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleBookingSubmit}
                disabled={isGeneratingPDF}
                className="flex-1 bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white"
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Complete Booking & Download PDF
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={() => setShowBookingDialog(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
