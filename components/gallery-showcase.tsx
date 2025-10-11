"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, X, Camera, Users, Car, Award, MapPin, Search, Filter, Download, Share2, Heart, Eye, Star, Clock, Calendar, Phone } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  title: string
  description: string
  category: string
  location?: string
  featured?: boolean
  likes?: number
  views?: number
  date?: string
  tags?: string[]
}

export function GalleryShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid")
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest")

  const galleryImages: GalleryImage[] = [
    {
      id: "training-1",
      src: "/placeholder.svg?height=400&width=600&text=Practical+Driving+Lesson",
      title: "Practical Driving Lessons",
      description: "Students learning with our professional instructors on real roads",
      category: "training",
      location: "Roysambu Branch",
      featured: true,
      likes: 124,
      views: 856,
      date: "2024-01-15",
      tags: ["driving", "lessons", "instructor", "practical"]
    },
    {
      id: "training-2",
      src: "/placeholder.svg?height=400&width=600&text=Theory+Class+Session",
      title: "Theory Class Sessions",
      description: "Interactive classroom learning with modern teaching methods",
      category: "training",
      location: "Zimmerman Branch",
      featured: false,
      likes: 89,
      views: 642,
      date: "2024-01-12",
      tags: ["theory", "classroom", "learning", "education"]
    },
    {
      id: "vehicles-1",
      src: "/placeholder.svg?height=400&width=600&text=Modern+Training+Vehicles",
      title: "Modern Training Fleet",
      description: "Well-maintained automatic and manual vehicles for training",
      category: "vehicles",
      location: "Multiple Locations",
      featured: true,
      likes: 156,
      views: 1203,
      date: "2024-01-20",
      tags: ["vehicles", "fleet", "modern", "training"]
    },
    {
      id: "vehicles-2",
      src: "/placeholder.svg?height=400&width=600&text=Motorcycle+Training",
      title: "Motorcycle Training",
      description: "Professional motorcycle and tuk-tuk training sessions",
      category: "vehicles",
      location: "Tassia Branch",
    },
    {
      id: "facilities-1",
      src: "/placeholder.svg?height=400&width=600&text=Modern+Classroom",
      title: "Modern Classrooms",
      description: "Air-conditioned classrooms with multimedia learning equipment",
      category: "facilities",
      location: "Kahawa West Branch",
    },
    {
      id: "facilities-2",
      src: "/placeholder.svg?height=400&width=600&text=Branch+Office",
      title: "Branch Offices",
      description: "Professional branch offices across Nairobi and Kiambu",
      category: "facilities",
      location: "Utawala Branch",
    },
    {
      id: "graduation-1",
      src: "/placeholder.svg?height=400&width=600&text=Graduation+Ceremony",
      title: "Graduation Ceremonies",
      description: "Celebrating successful students who passed their driving tests",
      category: "events",
      location: "Main Office",
    },
    {
      id: "graduation-2",
      src: "/placeholder.svg?height=400&width=600&text=Certificate+Presentation",
      title: "Certificate Presentations",
      description: "Proud moments as students receive their driving certificates",
      category: "events",
      location: "Various Branches",
    },
    {
      id: "instructors-1",
      src: "/placeholder.svg?height=400&width=600&text=NTSA+Certified+Instructors",
      title: "NTSA Certified Instructors",
      description: "Our team of professional, certified driving instructors",
      category: "team",
      location: "All Branches",
    },
    {
      id: "instructors-2",
      src: "/placeholder.svg?height=400&width=600&text=Instructor+Training",
      title: "Instructor Training",
      description: "Continuous professional development for our instructors",
      category: "team",
      location: "Training Center",
    },
    {
      id: "success-1",
      src: "/placeholder.svg?height=400&width=600&text=Happy+Students",
      title: "Happy Students",
      description: "Satisfied students who successfully learned to drive with us",
      category: "success",
      location: "Multiple Branches",
    },
    {
      id: "success-2",
      src: "/placeholder.svg?height=400&width=600&text=First+Time+Pass",
      title: "First Time Pass",
      description: "Students celebrating their first-time driving test success",
      category: "success",
      location: "NTSA Testing Centers",
    },
  ]

  const categories = [
    { id: "all", label: "All Photos", icon: Camera },
    { id: "training", label: "Training", icon: Users },
    { id: "vehicles", label: "Vehicles", icon: Car },
    { id: "facilities", label: "Facilities", icon: MapPin },
    { id: "events", label: "Events", icon: Award },
    { id: "team", label: "Our Team", icon: Users },
    { id: "success", label: "Success Stories", icon: Award },
  ]

  // Enhanced filtering and sorting
  const filteredImages = galleryImages
    .filter((img) => {
      const matchesCategory = selectedCategory === "all" || img.category === selectedCategory
      const matchesSearch = searchQuery === "" || 
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
        case "oldest":
          return new Date(a.date || "").getTime() - new Date(b.date || "").getTime()
        case "popular":
          return (b.likes || 0) - (a.likes || 0)
        default:
          return 0
      }
    })

  const toggleLike = (imageId: string) => {
    setLikedImages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(imageId)) {
        newSet.delete(imageId)
      } else {
        newSet.add(imageId)
      }
      return newSet
    })
  }

  const openImageModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const navigateImage = (direction: "prev" | "next") => {
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage?.id)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredImages[newIndex])
    setCurrentImageIndex(newIndex)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Our Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium mb-8">
            Discover our world-class facilities, training excellence, and student success stories through our comprehensive photo collection
          </p>
          
          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search photos, locations, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-full border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full px-6 py-3"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              <div className="flex border rounded-full overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "masonry" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("masonry")}
                  className="rounded-none"
                >
                  Masonry
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "popular")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Show Only</label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      Featured
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      Recent
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quick Stats</label>
                  <div className="text-sm text-gray-600">
                    {filteredImages.length} photos • {new Set(filteredImages.map(img => img.category)).size} categories
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg"
                  : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600 bg-white hover:bg-red-50"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "md:grid-cols-2 lg:grid-cols-3"
        }`}>
          {filteredImages.map((image, index) => (
            <Card
              key={image.id}
              className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden transform hover:-translate-y-2"
              onClick={() => openImageModal(image, index)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay with modern effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <div className="flex gap-2">
                        {image.featured && (
                          <Badge className="bg-yellow-500 text-white border-0 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge className="bg-red-600 text-white border-0 text-xs">
                          {categories.find((cat) => cat.id === image.category)?.label}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-8 h-8 p-0 bg-white/20 hover:bg-white/30 text-white rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(image.id)
                          }}
                        >
                          <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-8 h-8 p-0 bg-white/20 hover:bg-white/30 text-white rounded-full"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-4 text-white text-sm mb-2">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {image.views || 0}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {(image.likes || 0) + (likedImages.has(image.id) ? 1 : 0)}
                        </div>
                        {image.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(image.date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Center play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors text-lg">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {image.description}
                  </p>
                  
                  {image.location && (
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-red-500" />
                      {image.location}
                    </div>
                  )}
                  
                  {/* Tags */}
                  {image.tags && image.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {image.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          #{tag}
                        </Badge>
                      ))}
                      {image.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          +{image.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />

                {/* Navigation Arrows */}
                <Button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
                  onClick={() => navigateImage("prev")}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
                  onClick={() => navigateImage("next")}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Close Button */}
                <Button
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                    <Badge className="bg-red-600 text-white border-0">
                      {categories.find((cat) => cat.id === selectedImage.category)?.label}
                    </Badge>
                  </div>
                  <p className="text-gray-200 mb-2">{selectedImage.description}</p>
                  {selectedImage.location && (
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedImage.location}
                    </div>
                  )}
                  <div className="mt-3 text-sm text-gray-400">
                    {currentImageIndex + 1} of {filteredImages.length}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Be part of our gallery of successful drivers. Start your journey with <span className="text-yellow-300">FIVE ST<span className="text-yellow-200">★</span>R</span> Driving School today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Book Your Lesson Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg rounded-full font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={() => window.open("tel:0794478773", "_self")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: 0794 478 773
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <Card className="bg-white border-0 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-red-600 mb-2">20+</div>
              <p className="text-gray-600 font-medium">Branch Locations</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600 font-medium">Training Vehicles</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">30+</div>
              <p className="text-gray-600 font-medium">Certified Instructors</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">10,000+</div>
              <p className="text-gray-600 font-medium">Happy Students</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
