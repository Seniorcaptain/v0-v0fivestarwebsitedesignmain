"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Search, Phone, MessageCircle, HelpCircle } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  popular: boolean
}

export function InteractiveFAQ() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "What is included in your all-inclusive fee?",
      answer:
        "Our all-inclusive fee covers 30 practical lessons, unlimited theory sessions, basic mechanics training, and a FREE learner's manual. There are no hidden costs - everything you need to get your license is included in the price.",
      category: "pricing",
      popular: true,
    },
    {
      id: "2",
      question: "How long does it take to complete the course?",
      answer:
        "Most students complete their course in 4-6 weeks for car licenses and 2-3 weeks for motorcycle licenses. The duration depends on your availability, learning pace, and the type of course you choose.",
      category: "courses",
      popular: true,
    },
    {
      id: "3",
      question: "What are your operating hours?",
      answer:
        "We operate Monday to Friday from 7:00 AM to 7:00 PM, and Saturday from 8:00 AM to 5:00 PM. Sunday lessons are available upon request. Hours may vary slightly by branch.",
      category: "general",
      popular: true,
    },
    {
      id: "4",
      question: "Do you offer pick and drop services?",
      answer:
        "Yes! Our Private Classes include pick and drop services. This service is available for students who choose our premium private instruction option.",
      category: "services",
      popular: true,
    },
    {
      id: "5",
      question: "What documents do I need to bring?",
      answer:
        "You need to bring your original ID card or passport, and we'll handle the rest. We'll help you with all the NTSA paperwork and requirements.",
      category: "requirements",
      popular: false,
    },
    {
      id: "6",
      question: "Can I choose my preferred branch?",
      answer:
        "We have 20+ locations across Nairobi. You can choose the branch most convenient for you, and even switch between branches if needed.",
      category: "locations",
      popular: false,
    },
    {
      id: "7",
      question: "What's the difference between B1 and B2 licenses?",
      answer:
        "B1 is for automatic cars only, while B2 covers both manual and automatic cars. If you get a B2 license, you can drive both types of vehicles. B1 is easier to learn but more limiting.",
      category: "courses",
      popular: true,
    },
    {
      id: "8",
      question: "Do you provide the vehicle for the driving test?",
      answer:
        "Yes, we provide a well-maintained vehicle with dual controls for your driving test. Our instructors will accompany you to ensure you're comfortable and confident.",
      category: "testing",
      popular: false,
    },
    {
      id: "9",
      question: "What if I fail the driving test?",
      answer:
        "Don't worry! We have a 97% first-time pass rate, but if you need additional practice, we offer refresher lessons at discounted rates to help you succeed.",
      category: "testing",
      popular: false,
    },
    {
      id: "10",
      question: "Can I pay in installments?",
      answer:
        "Yes, we offer flexible payment plans. You can discuss payment options with our team when you enroll. We accept mobile money, and bank transfers.",
      category: "pricing",
      popular: false,
    },
    {
      id: "11",
      question: "Are your instructors certified?",
      answer:
        "All our instructors are NTSA-certified professionals with years of experience. They undergo regular training to maintain the highest standards of instruction.",
      category: "instructors",
      popular: false,
    },
    {
      id: "12",
      question: "What's included in the theory classes?",
      answer:
        "Theory classes cover road signs, traffic rules, defensive driving techniques, and basic vehicle mechanics. You get unlimited theory sessions until you're confident for the test.",
      category: "courses",
      popular: false,
    },
  ]

  const categories = [
    { value: "all", label: "All Categories", count: faqs.length },
    { value: "pricing", label: "Pricing & Payments", count: faqs.filter((f) => f.category === "pricing").length },
    { value: "courses", label: "Courses", count: faqs.filter((f) => f.category === "courses").length },
    { value: "general", label: "General Info", count: faqs.filter((f) => f.category === "general").length },
    { value: "services", label: "Services", count: faqs.filter((f) => f.category === "services").length },
    { value: "testing", label: "Testing", count: faqs.filter((f) => f.category === "testing").length },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const popularFAQs = faqs.filter((faq) => faq.popular)

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  return (
    <section id="faq" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Find answers to common questions about our driving courses, pricing, and services
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white border-gray-300 focus:border-red-500"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                className={`rounded-full transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg"
                    : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600 bg-white hover:bg-red-50"
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 bg-white/20 text-current border-0">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Popular FAQs */}
        {selectedCategory === "all" && searchTerm === "" && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 mr-2 text-red-500" />
              Most Popular Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {popularFAQs.slice(0, 4).map((faq) => (
                <Card
                  key={faq.id}
                  className="bg-gradient-to-r from-red-50 to-blue-50 border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 text-sm">{faq.question}</h4>
                      <Badge className="bg-red-500 text-white text-xs border-0 ml-2">Popular</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card
              key={faq.id}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <div className="flex items-center space-x-3">
                    {faq.popular && <Badge className="bg-red-500 text-white text-xs border-0">Popular</Badge>}
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No questions found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or browse different categories.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="border-red-500 text-red-600 hover:bg-red-50 bg-transparent"
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-red-500 to-blue-600 border-0 text-white mt-16">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-xl mb-6 opacity-90">
              Our friendly team is here to help you with any questions about learning to drive with <span className="text-red-600">FIVE ST<span className="text-blue-600">★</span>R</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
                onClick={() => window.open("tel:0794478773", "_self")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: 0794 478 773
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full font-semibold bg-transparent"
                onClick={() => {
                  window.open(
                    "https://wa.me/254794478773?text=Hi! I have some questions about FIVE ST★R Driving School courses and would like to speak with someone.",
                    "_blank",
                  )
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
