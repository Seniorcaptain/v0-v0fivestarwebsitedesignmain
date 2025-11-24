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
  ArrowRight,
  Navigation,
  GraduationCap,
  Building2,
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
            description: "Perfect for beginners - Easy to learn",
            price: "Ksh 13,000",
            popular: true,
            icon: "🚗",
            features: ["15 Lessons", "Weekend Available", "Fast Track Option"],
          },
          {
            title: "B2 Manual Car",
            description: "Master complete driving control",
            price: "Ksh 13,000",
            popular: true,
            icon: "🚙",
            features: ["15 Lessons", "Flexible Timing", "Expert Instructors"],
          },
          {
            title: "Motorcycle License",
            description: "Two-wheel freedom & mobility",
            price: "Ksh 7,000",
            popular: false,
            icon: "🏍️",
            features: ["10 Lessons", "Safety Training", "Fast Completion"],
          },
        ],
        categories: [
          { name: "Car Licenses", count: 4, icon: Car },
          { name: "Motorcycle", count: 2, icon: GraduationCap },
          { name: "Commercial Vehicles", count: 3, icon: Building2 },
          { name: "Combined Packages", count: 2, icon: Award },
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
          {
            name: "Roysambu (Head Office)",
            address: "Jeda Plaza, Lumumba Drive",
            phone: "0794 478 773",
            status: "Open",
            featured: true,
          },
          { name: "Zimmerman", address: "Near Ocean Hardware", phone: "0797 719 618", status: "Open", featured: false },
          {
            name: "Tassia/Nyayo Estate",
            address: "Near Footbridge",
            phone: "0796 247 793",
            status: "Open",
            featured: false,
          },
          { name: "Kahawa West", address: "Mukuyu Plaza", phone: "0707 297 889", status: "Open", featured: false },
          { name: "Utawala", address: "Benedicta Junction", phone: "0717 772 212", status: "Open", featured: false },
          {
            name: "Kahawa Wendani",
            address: "Next to Magunas Supermarket",
            phone: "0790 161 009",
            status: "Open",
            featured: false,
          },
        ],
      },
    },
    {
      title: "Pricing",
      icon: CreditCard,
      href: "#courses",
      hasDropdown: true,
      content: {
        pricing: [
          { category: "Car Licenses", price: "From Ksh 13,000", description: "Automatic & Manual options", icon: "💳" },
          { category: "Motorcycle", price: "From Ksh 7,000", description: "Quick & affordable", icon: "🏍️" },
          { category: "Commercial", price: "From Ksh 15,000", description: "Professional training", icon: "🚛" },
          { category: "Packages", price: "Custom Pricing", description: "Combine & save more", icon: "🎁" },
        ],
      },
    },
    {
      title: "About",
      icon: Users,
      href: "#about",
      hasDropdown: true,
      content: {
        links: [
          { title: "Our Story", description: "6 years of excellence", href: "#about", icon: Award },
          { title: "Our Team", description: "Expert instructors", href: "#about", icon: Users },
          { title: "Why Choose Us", description: "Trusted by thousands", href: "#about", icon: Shield },
          { title: "Success Stories", description: "Hear from our graduates", href: "#testimonials", icon: Star },
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
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg"
            : "bg-gradient-to-r from-red-600/90 to-blue-600/90 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <a href="#" className="flex flex-col items-start group">
                <div className="flex items-center font-bold text-2xl leading-none transition-transform group-hover:scale-105">
                  <span className={isScrolled ? "text-red-600" : "text-white"}>FIVE ST</span>
                  <span className={isScrolled ? "text-blue-600" : "text-yellow-300"}>★</span>
                  <span className={isScrolled ? "text-red-600" : "text-white"}>R</span>
                </div>
                <div
                  className={`font-semibold text-sm leading-none mt-1 ${isScrolled ? "text-red-600" : "text-white"}`}
                >
                  Driving School
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 relative group font-semibold ${
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

                  {item.hasDropdown && activeMenu === item.title && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-screen max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-8 animate-fade-in-up z-50"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      {/* Courses Dropdown */}
                      {item.title === "Courses" && item.content && (
                        <div className="grid md:grid-cols-3 gap-8">
                          {/* Featured Courses */}
                          <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-2xl font-bold text-gray-900">Popular Courses</h3>
                              <Badge className="bg-gradient-to-r from-red-500 to-blue-500 text-white">
                                6TH ANNIVERSARY DISCOUNT
                              </Badge>
                            </div>
                            <div className="space-y-4">
                              {item.content.featured?.map((course, index) => (
                                <Card
                                  key={index}
                                  className="border-2 border-gray-100 hover:border-red-300 hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-gray-50"
                                >
                                  <CardContent className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex items-start space-x-4 flex-1">
                                        <div className="text-4xl">{course.icon}</div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                                              {course.title}
                                            </h4>
                                            {course.popular && (
                                              <Badge className="bg-red-500 text-white text-xs">🔥 Popular</Badge>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                                          <div className="flex flex-wrap gap-2">
                                            {course.features?.map((feature, idx) => (
                                              <Badge
                                                key={idx}
                                                variant="outline"
                                                className="text-xs border-blue-200 text-blue-700"
                                              >
                                                {feature}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-bold text-2xl text-red-600">{course.price}</p>
                                        <Button
                                          size="sm"
                                          className="mt-2 bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white"
                                        >
                                          Learn More
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>

                          {/* Categories */}
                          <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">All Categories</h3>
                            <div className="space-y-3">
                              {item.content.categories?.map((category, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-4 rounded-xl bg-white hover:shadow-lg cursor-pointer transition-all group border border-gray-100"
                                >
                                  <div className="flex items-center space-x-3">
                                    {category.icon && <category.icon className="w-5 h-5 text-red-500" />}
                                    <span className="text-gray-800 font-semibold group-hover:text-red-600 transition-colors">
                                      {category.name}
                                    </span>
                                  </div>
                                  <Badge variant="outline" className="text-xs font-bold">
                                    {category.count} {category.count === 1 ? "Course" : "Courses"}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Locations Dropdown */}
                      {item.title === "Locations" && item.content && (
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Our Branches</h3>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                              Locations Across Nairobi & Kiambu
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-3 gap-5">
                            {item.content.branches?.map((branch, index) => (
                              <Card
                                key={index}
                                className={`border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                                  branch.featured
                                    ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50"
                                    : "border-gray-100"
                                }`}
                              >
                                <CardContent className="p-5">
                                  <div className="flex items-start justify-between mb-3">
                                    <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors flex-1">
                                      {branch.name}
                                    </h4>
                                    <Badge className="bg-green-100 text-green-800 text-xs">{branch.status}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3 flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <span>{branch.address}</span>
                                  </p>
                                  <div className="flex items-center gap-2 mb-4">
                                    <Phone className="w-4 h-4 text-green-500" />
                                    <a
                                      href={`tel:${branch.phone}`}
                                      className="text-sm font-semibold text-green-600 hover:text-green-700"
                                    >
                                      {branch.phone}
                                    </a>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                                  >
                                    <Navigation className="w-3 h-3 mr-2" />
                                    Get Directions
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          <div className="mt-6 text-center">
                            <a
                              href="#branches"
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                            >
                              View All Branches on Map
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Pricing Dropdown */}
                      {item.title === "Pricing" && item.content && (
                        <div>
                          <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Affordable Pricing Plans</h3>
                            <p className="text-gray-600">Transparent pricing with no hidden fees</p>
                          </div>
                          <div className="grid md:grid-cols-4 gap-5">
                            {item.content.pricing?.map((pricing, index) => (
                              <Card
                                key={index}
                                className="border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer group text-center"
                              >
                                <CardContent className="p-6">
                                  <div className="text-4xl mb-3">{pricing.icon}</div>
                                  <h4 className="font-bold text-lg text-gray-900 mb-2">{pricing.category}</h4>
                                  <p className="text-2xl font-bold text-blue-600 mb-2">{pricing.price}</p>
                                  <p className="text-sm text-gray-600">{pricing.description}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          <div className="mt-6 text-center">
                            <a
                              href="#courses"
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                            >
                              View Detailed Pricing
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      )}

                      {/* About Dropdown */}
                      {item.title === "About" && item.content && (
                        <div>
                          <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">About FIVE ST★R</h3>
                            <p className="text-gray-600">Learn more about Kenya's premier driving school</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            {item.content.links?.map((link, index) => (
                              <a
                                key={index}
                                href={link.href}
                                className="flex items-center space-x-4 p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-xl transition-all group border-2 border-gray-100 hover:border-blue-200"
                              >
                                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                  <link.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors mb-1">
                                    {link.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">{link.description}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* </CHANGE> */}
                </div>
              ))}

              <Button
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-6 py-2.5 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ml-2"
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
        <div className="container mx-auto px-4 pt-24 pb-8 h-full overflow-y-auto">
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
          <div className="space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center justify-between p-4 text-xl text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-semibold border-2 border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-6 h-6" />
                  <span>{item.title}</span>
                </div>
                <ChevronDown className="w-5 h-5" />
              </a>
            ))}
            <Button
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg py-6 rounded-2xl mt-8 shadow-lg"
              onClick={() => {
                window.open("tel:+254794478773", "_self")
                setIsOpen(false)
              }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: 0794 478 773
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
