"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, Users, Clock, MapPin, Phone, MessageCircle, Car, BookOpen, Target } from "lucide-react"

export function AboutSection() {
  const whyChooseUsFeatures = [
    {
      icon: Award,
      title: "NTSA Certified",
      description: "Fully licensed and certified by the National Transport and Safety Authority",
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      icon: Users,
      title: "Over 20,000+ Students Trained",
      description: "Join thousands of successful drivers who learned with us",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: MapPin,
      title: "20+ Convenient Locations",
      description: "Multiple branches across Nairobi for easy access",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: Shield,
      title: "97% First-Time Pass Rate",
      description: "Our proven teaching methods ensure high success rates",
      color: "text-red-600 bg-red-100",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Morning, afternoon, and weekend classes available",
      color: "text-purple-600 bg-purple-100",
    },
    {
      icon: Car,
      title: "Modern Fleet",
      description: "Well-maintained vehicles with dual controls for safety",
      color: "text-indigo-600 bg-indigo-100",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Training",
      description: "30 practical lessons, unlimited theory, and basic mechanics",
      color: "text-orange-600 bg-orange-100",
    },
    {
      icon: Target,
      title: "All-Inclusive Fees",
      description: "No hidden costs - everything included with FREE learner's manual",
      color: "text-teal-600 bg-teal-100",
    },
  ]

  const staffMembers = [
    {
      name: "Management Team",
      role: "School Administration",
      description: "Experienced administrators ensuring smooth operations across all branches",
      phone: "0794 478 773",
      whatsapp: "254794478773",
    },
    {
      name: "Certified Instructors",
      role: "Professional Driving Instructors",
      description: "NTSA-certified instructors with years of experience in driver training",
      phone: "Available at each branch",
      whatsapp: "Branch-specific numbers",
    },
    {
      name: "Customer Support",
      role: "Student Relations",
      description: "Dedicated support team to help with bookings, schedules, and inquiries",
      phone: "0794 478 773",
      whatsapp: "254794478773",
    },
    {
      name: "Theory Instructors",
      role: "Classroom Training",
      description: "Specialized instructors for road signs, traffic rules, and NTSA theory",
      phone: "Available at each branch",
      whatsapp: "Branch-specific numbers",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            About{" "}
            <span className="text-red-600">
              FIVE ST<span className="text-blue-600">★</span>R
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Kenya's premier driving school with over 20,000+ successful graduates. We've been teaching safe, confident
            driving across Nairobi for years, making driving education accessible and enjoyable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <span className="text-red-600">
                  FIVE ST<span className="text-blue-600">★</span>R
                </span>{" "}
                Driving School was founded with a simple mission: to make quality driving education accessible to
                everyone in Nairobi. What started as a single location has grown into a network of 20+ branches serving
                communities across the city.
              </p>
              <p>
                Our commitment to excellence has helped over 20,000+ students successfully obtain their driving
                licenses. We believe that learning to drive should be fun, safe, and stress-free, which is why we've
                developed our comprehensive training programs with student success as our top priority.
              </p>
              <p>
                Today,{" "}
                <span className="text-red-600">
                  FIVE ST<span className="text-blue-600">★</span>R
                </span>{" "}
                stands as one of Kenya's most trusted driving schools, known for our professional instructors, modern
                fleet, and industry-leading pass rates. We continue to innovate and expand to serve more communities
                across Nairobi.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white px-6 py-3"
                onClick={() => {
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50 bg-transparent px-6 py-3"
                onClick={() => window.open("tel:0794478773", "_self")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us Today
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="bg-gradient-to-br from-red-50 to-blue-50 border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-red-600 mb-2">20,000+</div>
                    <p className="text-gray-600 font-medium">Students Trained</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
                    <p className="text-gray-600 font-medium">Locations</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">97%</div>
                    <p className="text-gray-600 font-medium">Pass Rate</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">6+</div>
                    <p className="text-gray-600 font-medium">Years Experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span className="text-red-600">
                FIVE ST<span className="text-blue-600">★</span>R
              </span>
              ?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes us Kenya's most trusted driving school
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Professional Staff</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who make your driving education successful
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {staffMembers.map((staff, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{staff.name}</h4>
                      <Badge className="bg-blue-100 text-blue-800 border-0 mb-2">{staff.role}</Badge>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{staff.description}</p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-green-500" />
                      <span>{staff.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{staff.whatsapp}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-r from-red-500 to-blue-600 border-0 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-4xl font-bold mb-4">Ready to Start Your Driving Journey?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join over 20,000+ successful students who chose{" "}
              <span className="text-red-600">
                FIVE ST<span className="text-blue-600">★</span>R
              </span>{" "}
              for their driving education. Experience the difference of professional, comprehensive training.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-semibold"
                onClick={() => {
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Book Your First Lesson
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg rounded-full font-semibold bg-transparent"
                onClick={() => window.open("tel:0794478773", "_self")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: 0794 478 773
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg rounded-full font-semibold bg-transparent"
                onClick={() => {
                  window.open(
                    "https://wa.me/254794478773?text=Hi! I'd like to learn more about FIVE ST★R Driving School and your courses.",
                    "_blank",
                  )
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
