"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Car,
  MapPin,
  CreditCard,
  HelpCircle,
  Users,
  Phone,
  Menu,
  X,
  ChevronDown,
  Award,
  Shield,
  Star,
} from "lucide-react"

interface MegaMenuProps {
  isScrolled: boolean
}

export function MegaMenu({ isScrolled }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (menuTitle: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveMenu(menuTitle)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 150)
  }

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleDropdownMouseLeave = () => {
    setActiveMenu(null)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const menuItems = [
    {
      title: "Courses",
      icon: Car,
      href: "#courses",
      hasDropdown: true,
      content: {
        featured: [
          {
            title: "B1 Automatic Car",
            description: "Perfect for beginners",
            price: "Ksh 13,000",
            popular: true,
            icon: "🚗",
          },
          {
            title: "B2 Manual Car",
            description: "Complete driving mastery",
            price: "Ksh 13,000",
            popular: true,
            icon: "🚙",
          },
          {
            title: "Motorcycle License",
            description: "Two-wheel freedom",
            price: "Ksh 7,000",
            popular: false,
            icon: "🏍️",
          },
        ],
        categories: [
          { name: "Car Licenses", count: 4 },
          { name: "Motorcycle", count: 2 },
          { name: "Commercial Vehicles", count: 3 },
          { name: "Combined Packages", count: 2 },
        ],
      },
    },
    {
      title: "Locations",
      icon: MapPin,
      href: "#branches",
      hasDropdown: true,
      content: {
        branches: [
          { name: "Roysambu", address: "Kamiti Road", phone: "0794 478 773", status: "Open" },
          { name: "Zimmerman", address: "Kamiti Road", phone: "0797 719 618", status: "Open" },
          { name: "Tassia", address: "Embakasi", phone: "0796 247 793", status: "Open" },
          { name: "Kahawa West", address: "Kiambu Road", phone: "0707 297 889", status: "Open" },
        ],
      },
    },
    {
      title: "Pricing",
      icon: CreditCard,
      href: "#courses",
      hasDropdown: false,
    },
    {
      title: "About",
      icon: Users,
      href: "#about",
      hasDropdown: true,
      content: {
        links: [
          { title: "Our Story", href: "#about", icon: Award },
          { title: "Our Staff", href: "#about", icon: Users },
          { title: "Why Choose Us", href: "#about", icon: Shield },
          { title: "Success Stories", href: "#testimonials", icon: Star },
        ],
      },
    },
    {
      title: "FAQs",
      icon: HelpCircle,
      href: "#faq",
      hasDropdown: false,
    },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <a href="#" className="flex flex-col items-start">
                <div className="flex items-center font-bold text-2xl leading-none">
                  <span className="text-red-600">FIVE ST</span>
                  <span className="text-blue-600">★</span>
                  <span className="text-red-600">R</span>
                </div>
                <div className="text-red-600 font-semibold text-sm leading-none mt-1">Driving School</div>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 relative group font-medium ${
                      isScrolled
                        ? "text-gray-700 hover:text-red-600 hover:bg-red-50"
                        : "text-white hover:text-yellow-300 hover:bg-white/10"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeMenu === item.title ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </a>

                  {/* Mega Menu Dropdown */}
                  {item.hasDropdown && activeMenu === item.title && (
                    <div
                      className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 animate-fade-in-up z-50"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      {item.title === "Courses" && item.content && (
                        <div className="grid md:grid-cols-3 gap-8">
                          {/* Featured Courses */}
                          <div className="md:col-span-2">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Courses</h3>
                            <div className="space-y-4">
                              {item.content.featured?.map((course, index) => (
                                <Card
                                  key={index}
                                  className="border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{course.icon}</span>
                                        <div>
                                          <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                                            {course.title}
                                            {course.popular && (
                                              <Badge className="ml-2 bg-red-500 text-white text-xs">Popular</Badge>
                                            )}
                                          </h4>
                                          <p className="text-sm text-gray-600">{course.description}</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-bold text-red-600">{course.price}</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>

                          {/* Categories */}
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                            <div className="space-y-3">
                              {item.content.categories?.map((category, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                  <span className="text-gray-700 font-medium">{category.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {category.count}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {item.title === "Locations" && item.content && (
                        <div className="grid md:grid-cols-2 gap-6">
                          {item.content.branches?.map((branch, index) => (
                            <Card
                              key={index}
                              className="border-0 hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900">{branch.name}</h4>
                                  <Badge className="bg-green-100 text-green-800 text-xs">{branch.status}</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{branch.address}</p>
                                <div className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-700">{branch.phone}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {item.title === "About" && item.content && (
                        <div className="grid md:grid-cols-2 gap-6">
                          {item.content.links?.map((link, index) => (
                            <a
                              key={index}
                              href={link.href}
                              className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <link.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                                  {link.title}
                                </h4>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <Button
                className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 hover:shadow-lg hover:shadow-yellow-400/50 text-white px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg border-2 border-yellow-400"
                onClick={() => window.open("tel:+254794478773", "_self")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden transition-colors duration-300 ${isScrolled ? "text-gray-700" : "text-white"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 lg:hidden transition-all duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="mb-8 flex justify-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center font-bold text-4xl leading-none">
                <span className="text-red-600">FIVE ST</span>
                <span className="text-blue-600">★</span>
                <span className="text-red-600">R</span>
              </div>
              <div className="text-red-600 font-semibold text-lg leading-none mt-2">Driving School</div>
            </div>
          </div>
          <div className="space-y-6">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center space-x-3 text-2xl text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.title}</span>
              </a>
            ))}
            <Button
              className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white text-lg py-4 rounded-full mt-8 border-2 border-yellow-400"
              onClick={() => {
                window.open("tel:+254794478773", "_self")
                setIsOpen(false)
              }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
