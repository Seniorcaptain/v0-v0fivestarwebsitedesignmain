"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, MapPin, Clock, Users, Award } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  branch: string
  phone: string
  whatsapp: string
  specialization: string[]
  experience: string
  image: string
  available: boolean
}

export function TeamSection() {
  const [selectedBranch, setSelectedBranch] = useState("all")

  const teamMembers: TeamMember[] = [
    {
      id: "james",
      name: "James Mwangi",
      role: "Chief Instructor",
      branch: "Roysambu",
      phone: "0794478773",
      whatsapp: "254794478773",
      specialization: ["Manual Cars", "Automatic Cars", "Defensive Driving"],
      experience: "8+ years",
      image: "/placeholder.svg?height=300&width=300&text=James+Mwangi",
      available: true,
    },
    {
      id: "mary",
      name: "Mary Wanjiku",
      role: "Senior Instructor",
      branch: "Zimmerman",
      phone: "0797719618",
      whatsapp: "254797719618",
      specialization: ["Motorcycles", "Tuk Tuks", "Road Safety"],
      experience: "6+ years",
      image: "/placeholder.svg?height=300&width=300&text=Mary+Wanjiku",
      available: true,
    },
    {
      id: "peter",
      name: "Peter Kamau",
      role: "Commercial Vehicle Instructor",
      branch: "Tassia",
      phone: "0796247793",
      whatsapp: "254796247793",
      specialization: ["Trucks", "Vans", "Commercial Driving"],
      experience: "10+ years",
      image: "/placeholder.svg?height=300&width=300&text=Peter+Kamau",
      available: true,
    },
    {
      id: "grace",
      name: "Grace Akinyi",
      role: "Theory Instructor",
      branch: "Kahawa West",
      phone: "0707297889",
      whatsapp: "254707297889",
      specialization: ["Road Signs", "Traffic Rules", "NTSA Theory"],
      experience: "5+ years",
      image: "/placeholder.svg?height=300&width=300&text=Grace+Akinyi",
      available: true,
    },
    {
      id: "david",
      name: "David Ochieng",
      role: "Branch Manager & Instructor",
      branch: "Utawala",
      phone: "0717772212",
      whatsapp: "254717772212",
      specialization: ["All Vehicle Types", "Student Coordination", "Quality Assurance"],
      experience: "12+ years",
      image: "/placeholder.svg?height=300&width=300&text=David+Ochieng",
      available: true,
    },
    {
      id: "susan",
      name: "Susan Njeri",
      role: "Customer Relations Manager",
      branch: "Kahawa Wendani",
      phone: "0790161009",
      whatsapp: "254790161009",
      specialization: ["Student Support", "Course Guidance", "Enrollment"],
      experience: "4+ years",
      image: "/placeholder.svg?height=300&width=300&text=Susan+Njeri",
      available: true,
    },
  ]

  const branches = [
    "all",
    "Roysambu",
    "Zimmerman",
    "Tassia",
    "Kahawa West",
    "Utawala",
    "Kahawa Wendani",
    "Sunton",
    "Thika",
    "Kiambu",
    "Ruiru",
    "Juja",
    "Githurai",
    "Kasarani",
    "Pipeline",
  ]

  const filteredMembers =
    selectedBranch === "all" ? teamMembers : teamMembers.filter((member) => member.branch === selectedBranch)

  return (
    <section id="team" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            Talk to Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Connect directly with our experienced instructors and support staff across all 14 locations
          </p>
        </div>

        {/* Branch Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {branches.map((branch) => (
            <Button
              key={branch}
              variant={selectedBranch === branch ? "default" : "outline"}
              className={`rounded-full transition-all duration-300 capitalize ${
                selectedBranch === branch
                  ? "bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg"
                  : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600 bg-white hover:bg-red-50"
              }`}
              onClick={() => setSelectedBranch(branch)}
            >
              {branch === "all" ? "All Branches" : branch}
            </Button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-white border-0 hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 group overflow-hidden"
            >
              <div className="relative">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`${member.available ? "bg-green-500" : "bg-red-500"} text-white border-0`}>
                    {member.available ? "Available" : "Busy"}
                  </Badge>
                </div>

                {/* Branch Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white border-0">
                    <MapPin className="w-3 h-3 mr-1" />
                    {member.branch}
                  </Badge>
                </div>

                {/* Name and Role Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm opacity-90">{member.role}</p>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Experience */}
                <div className="flex items-center text-gray-600 mb-4">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{member.experience} Experience</span>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Specializations:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.specialization.map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Available Hours:</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Mon-Fri: 7:00 AM - 7:00 PM</div>
                    <div>Saturday: 7:00 AM - 7:00 PM</div>
                    <div>Sunday: Available Upon Request</div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${member.whatsapp}?text=Hi ${member.name}, I'd like to discuss driving lessons at the ${member.branch} branch.`,
                        "_blank",
                      )
                    }
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Chat
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                    onClick={() => window.open(`tel:${member.phone}`, "_self")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Direct: {member.phone}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact All Team CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-red-500 to-blue-600 border-0 text-white">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-4">Need Help Choosing?</h3>
              <p className="text-xl mb-6 opacity-90">
                Our team is here to guide you to the perfect course and instructor for your needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
                  onClick={() => window.open("tel:0794478773", "_self")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Main Office
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full font-semibold bg-transparent"
                  onClick={() => {
                    window.open(
                      "https://wa.me/254794478773?text=Hi! I'd like to speak with someone about choosing the right driving course and instructor for me.",
                      "_blank",
                    )
                  }}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Chat with Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
