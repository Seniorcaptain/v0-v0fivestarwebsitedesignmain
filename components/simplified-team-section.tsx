"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MessageCircle, Users, Clock, MapPin } from "lucide-react"

export function SimplifiedTeamSection() {
  const contactOptions = [
    {
      title: "Main Office",
      description: "General inquiries, course information, and enrollment assistance",
      phone: "0794 478 773",
      whatsapp: "254794478773",
      hours: "Mon-Fri: 7:00 AM - 7:00 PM, Sat: 8:00 AM - 5:00 PM",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Branch Support",
      description: "Direct contact with your local branch for scheduling and support",
      phone: "Branch-specific numbers",
      whatsapp: "Available at each location",
      hours: "Mon-Fri: 7:00 AM - 7:00 PM, Sat: 8:00 AM - 5:00 PM",
      icon: MapPin,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Customer Care",
      description: "24/7 WhatsApp support for urgent inquiries and assistance",
      phone: "0794 478 773",
      whatsapp: "254794478773",
      hours: "WhatsApp: Available 24/7",
      icon: MessageCircle,
      color: "from-red-500 to-red-600",
    },
  ]

  return (
    <section id="team" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            Talk to Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Get in touch with our professional team for course information, bookings, and support across all 20+
            locations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactOptions.map((option, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <option.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>

                <div className="space-y-3 mb-6 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-medium">{option.phone}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{option.whatsapp}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-xs">{option.hours}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {option.phone !== "Branch-specific numbers" && (
                    <Button
                      className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 text-white`}
                      onClick={() => window.open(`tel:${option.phone.replace(/\s/g, "")}`, "_self")}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  )}

                  {option.whatsapp !== "Available at each location" && (
                    <Button
                      variant="outline"
                      className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                      onClick={() => {
                        const message = `Hi! I'd like to speak with the FIVESTAR team about driving courses and enrollment.`
                        window.open(`https://wa.me/${option.whatsapp}?text=${encodeURIComponent(message)}`, "_blank")
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Chat
                    </Button>
                  )}

                  {option.phone === "Branch-specific numbers" && (
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                      onClick={() => {
                        document.getElementById("branches")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Find Your Branch
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-red-500 to-blue-600 border-0 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-4xl font-bold mb-4">Need Immediate Assistance?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Our team is ready to help you choose the right course, schedule lessons, and answer any questions about
              learning to drive with <span className="text-red-600">FIVE ST<span className="text-blue-600">★</span>R</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-semibold"
                onClick={() => window.open("tel:0794478773", "_self")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Main Office
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg rounded-full font-semibold bg-transparent"
                onClick={() => {
                  const message = `Hi! I need help choosing the right driving course and would like to speak with someone from FIVESTAR Driving School.`
                  window.open(`https://wa.me/254794478773?text=${encodeURIComponent(message)}`, "_blank")
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Support
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg rounded-full font-semibold bg-transparent"
                onClick={() => {
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Book Online
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
