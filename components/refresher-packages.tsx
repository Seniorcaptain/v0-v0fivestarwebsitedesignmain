"use client"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Clock, MapPin, Zap, CheckCircle } from "lucide-react"

interface RefresherPackage {
  id: string
  distance: string
  km: number
  days: number
  price: number
  priceFormatted: string
  features: string[]
  bestFor: string
  color: string
}

export function RefresherPackages() {
  const [selectedPackage, setSelectedPackage] = useState<RefresherPackage | null>(null)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    idNumber: "",
    branch: "",
    package: "",
    date: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const packages: RefresherPackage[] = [
    {
      id: "8km-5days",
      distance: "8km",
      km: 8,
      days: 5,
      price: 4000,
      priceFormatted: "Ksh 4,000",
      features: ["Perfect for beginners", "5 days intensive practice", "Flexible scheduling", "Beginner-friendly pace"],
      bestFor: "First-time refreshers",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "10km-5days",
      distance: "10km",
      km: 10,
      days: 5,
      price: 5000,
      priceFormatted: "Ksh 5,000",
      features: ["Intermediate practice", "Covers diverse routes", "Urban navigation", "Confidence building"],
      bestFor: "Intermediate drivers",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "12km-5days",
      distance: "12km",
      km: 12,
      days: 5,
      price: 6000,
      priceFormatted: "Ksh 6,000",
      features: [
        "Advanced route coverage",
        "Highway exposure",
        "Mixed traffic scenarios",
        "Professional driving skills",
      ],
      bestFor: "Experienced drivers",
      color: "from-green-500 to-green-600",
    },
    {
      id: "14km-5days",
      distance: "14km",
      km: 14,
      days: 5,
      price: 7000,
      priceFormatted: "Ksh 7,000",
      features: ["Comprehensive coverage", "High traffic areas", "Advanced techniques", "Mastery level training"],
      bestFor: "Professional drivers",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "16km-5days",
      distance: "16km",
      km: 16,
      days: 5,
      price: 8000,
      priceFormatted: "Ksh 8,000",
      features: ["Elite package", "Maximum route coverage", "Expert-level training", "Performance optimization"],
      bestFor: "Advanced professionals",
      color: "from-red-500 to-red-600",
    },
  ]

  const branches = [
    { id: "roysambu", name: "Roysambu", whatsapp: "254794478773" },
    { id: "zimmerman", name: "Zimmerman", whatsapp: "254797719618" },
    { id: "tassia", name: "Tassia", whatsapp: "254796247793" },
    { id: "kahawa-west", name: "Kahawa West", whatsapp: "254707297889" },
    { id: "utawala", name: "Utawala", whatsapp: "254717772212" },
    { id: "kahawa-wendani", name: "Kahawa Wendani", whatsapp: "254790161009" },
    { id: "sunton", name: "Sunton", whatsapp: "254748429757" },
    { id: "thika", name: "Thika", whatsapp: "254712345678" },
    { id: "kiambu", name: "Kiambu", whatsapp: "254723456789" },
  ]

  const handleBookingSubmit = () => {
    if (!bookingData.name || !bookingData.phone || !bookingData.branch || !selectedPackage) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Create WhatsApp message
    const message = `🚗 REFRESHER PACKAGE BOOKING - FIVE ST★R DRIVING SCHOOL

👤 STUDENT DETAILS:
Name: ${bookingData.name}
Phone: ${bookingData.phone}
ID Number: ${bookingData.idNumber || "N/A"}

📦 REFRESHER PACKAGE:
Package: ${selectedPackage.distance} for ${selectedPackage.days} Days
Price: ${selectedPackage.priceFormatted}
Branch: ${bookingData.branch}
Preferred Date: ${bookingData.date || "Flexible"}

📝 Additional Notes:
${bookingData.notes || "No special requests"}

Please confirm this refresher package booking and contact the student to finalize details.

🌟 "Driving Is Fun, Driving Is Freedom" 🌟`

    const selectedBranch = branches.find((b) => b.id === bookingData.branch)
    const whatsappLink = `https://wa.me/254794478773?text=${encodeURIComponent(message)}`

    setTimeout(() => {
      window.open(whatsappLink, "_blank")
      setIsSubmitting(false)
      setBookingConfirmed(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setShowBookingDialog(false)
        setBookingConfirmed(false)
        setBookingData({
          name: "",
          phone: "",
          idNumber: "",
          branch: "",
          package: "",
          date: "",
          notes: "",
        })
      }, 3000)
    }, 500)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              ⚡ BOOST YOUR SKILLS
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
            Weekly Refresher Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium mb-8">
            Perfect for experienced drivers seeking additional practice and skill enhancement. Choose your ideal
            distance and intensity level.
          </p>
          
          {/* Payment Info Banner */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-blue-900 mb-4">Same Pricing as Displayed - Easy Payment Process</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-700 mb-2">M-Pesa Payment:</p>
                <p className="text-xs text-gray-600">Paybill: <span className="font-bold">400200</span></p>
                <p className="text-xs text-gray-600">Account: <span className="font-bold">40096666</span></p>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-700 mb-2">After Payment:</p>
                <p className="text-xs text-gray-600">Send confirmation to:<br/><span className="font-bold">0794 478 773 or 0727 555 558</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="group relative bg-white border-2 border-gray-200 hover:border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pkg.color}`} />

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900">{pkg.km}km</CardTitle>
                    <CardDescription className="text-sm text-gray-500">{pkg.days} Days</CardDescription>
                  </div>
                  <Badge className={`bg-gradient-to-r ${pkg.color} text-white border-0`}>Active</Badge>
                </div>
                <div className="text-2xl font-bold text-amber-600">{pkg.priceFormatted}</div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm font-semibold text-gray-700">{pkg.bestFor}</p>

                <div className="space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Dialog open={showBookingDialog && selectedPackage?.id === pkg.id} onOpenChange={setShowBookingDialog}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelectedPackage(pkg)}
                      className={`w-full bg-gradient-to-r ${pkg.color} hover:shadow-lg text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105`}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </DialogTrigger>

                  {selectedPackage?.id === pkg.id && (
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          {bookingConfirmed ? "✅ Booking Confirmed!" : `Book ${pkg.distance} Package`}
                        </DialogTitle>
                        <DialogDescription>
                          {bookingConfirmed
                            ? "Your refresher package has been sent to our main office. You'll receive confirmation shortly!"
                            : "Complete your booking details below"}
                        </DialogDescription>
                      </DialogHeader>

                      {!bookingConfirmed ? (
                        <div className="space-y-4">
                          <div className="bg-amber-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">
                              {pkg.km}km for {pkg.days} Days
                            </p>
                            <p className="text-2xl font-bold text-amber-600">{pkg.priceFormatted}</p>
                          </div>

                          <div>
                            <Label className="text-sm font-semibold">Full Name *</Label>
                            <Input
                              placeholder="Your full name"
                              value={bookingData.name}
                              onChange={(e) => setBookingData((prev) => ({ ...prev, name: e.target.value }))}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-semibold">Phone Number *</Label>
                            <Input
                              placeholder="0794 478 773"
                              value={bookingData.phone}
                              onChange={(e) => setBookingData((prev) => ({ ...prev, phone: e.target.value }))}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-semibold">ID Number</Label>
                            <Input
                              placeholder="Optional"
                              value={bookingData.idNumber}
                              onChange={(e) => setBookingData((prev) => ({ ...prev, idNumber: e.target.value }))}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-semibold">Branch Location *</Label>
                            <Select
                              value={bookingData.branch}
                              onValueChange={(value) => setBookingData((prev) => ({ ...prev, branch: value }))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select a branch" />
                              </SelectTrigger>
                              <SelectContent>
                                {branches.map((branch) => (
                                  <SelectItem key={branch.id} value={branch.id}>
                                    {branch.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-sm font-semibold">Preferred Date</Label>
                            <Input
                              type="date"
                              value={bookingData.date}
                              onChange={(e) => setBookingData((prev) => ({ ...prev, date: e.target.value }))}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-semibold">Additional Notes</Label>
                            <Textarea
                              placeholder="Any special requests or notes..."
                              value={bookingData.notes}
                              onChange={(e) => setBookingData((prev) => ({ ...prev, notes: e.target.value }))}
                              className="mt-1 h-20"
                            />
                          </div>

                          {/* Payment Information */}
                          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                            <p className="text-sm font-semibold text-gray-700 mb-3">M-Pesa Payment Details:</p>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Paybill:</span>
                                <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded">400200</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Account:</span>
                                <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded">40096666</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-3">After payment, send confirmation via WhatsApp to 0794 478 773 or 0727 555 558</p>
                          </div>

                          <Button
                            onClick={handleBookingSubmit}
                            disabled={isSubmitting}
                            className={`w-full bg-gradient-to-r ${pkg.color} text-white font-semibold py-3 rounded-lg`}
                          >
                            {isSubmitting ? "Processing..." : "Confirm & Send to WhatsApp"}
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          </div>
                          <p className="text-gray-600 mb-4">
                            Check your WhatsApp for the main office message. They'll contact you shortly to confirm.
                          </p>
                          <Button onClick={() => setShowBookingDialog(false)} className="w-full">
                            Done
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  )}
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features & Benefits */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Choose Our Refresher Packages?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Intensive Practice</h4>
                  <p className="text-gray-600">
                    5-day focused programs designed to build confidence and master specific driving scenarios.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Diverse Route Coverage</h4>
                  <p className="text-gray-600">
                    Experience varied road conditions and traffic scenarios tailored to your skill level.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
                  <p className="text-gray-600">
                    Choose dates and times that work best for your schedule across all our branch locations.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
