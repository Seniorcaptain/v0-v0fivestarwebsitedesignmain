"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X, Camera, Users, Car, Award, MapPin } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  title: string
  description: string
  category: string
  location?: string
}

export function GalleryShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const galleryImages: GalleryImage[] = [
    {
      id: "training-1",
      src: "/placeholder.svg?height=400&width=600&text=Practical+Driving+Lesson",
      title: "Practical Driving Lessons",
      description: "Students learning with our professional instructors on real roads",
      category: "training",
      location: "Roysambu Branch",
    },
    {
      id: "training-2",
      src: "/placeholder.svg?height=400&width=600&text=Theory+Class+Session",
      title: "Theory Class Sessions",
      description: "Interactive classroom learning with modern teaching methods",
      category: "training",
      location: "Zimmerman Branch",
    },
    {
      id: "vehicles-1",
      src: "/placeholder.svg?height=400&width=600&text=Modern+Training+Vehicles",
      title: "Modern Training Fleet",
      description: "Well-maintained automatic and manual vehicles for training",
      category: "vehicles",
      location: "Multiple Locations",
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

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

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
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Take a look at our modern facilities, training sessions, and success stories across all our branches
          </p>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <Card
              key={image.id}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => openImageModal(image, index)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-red-600 text-white border-0 text-xs">
                    {categories.find((cat) => cat.id === image.category)?.label}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{image.description}</p>
                  {image.location && (
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {image.location}
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

        {/* Gallery Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-red-600 mb-2">20+</div>
              <p className="text-gray-600 font-medium">Branch Locations</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600 font-medium">Training Vehicles</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">30+</div>
              <p className="text-gray-600 font-medium">Certified Instructors</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">10,000+</div>
              <p className="text-gray-600 font-medium">Happy Students</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
