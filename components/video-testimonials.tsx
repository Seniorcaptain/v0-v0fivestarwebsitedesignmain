"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  course: string
  videoSrc: string
  quote: string
  location: string
  completionDate: string
}

export function VideoTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const testimonials: Testimonial[] = [
    {
      id: "sarah",
      name: "Sarah Wanjiku",
      course: "B1 Automatic Car",
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      quote: "FIVE ST★R made learning to drive so easy and enjoyable. The instructors were patient and professional.",
      location: "Roysambu Branch",
      completionDate: "December 2023",
    },
    {
      id: "john",
      name: "John Kamau",
      course: "B2 Manual Car",
      videoSrc: "/testimonial-john.mp4",
      quote: "I passed my driving test on the first try thanks to the excellent training at FIVE ST★R.",
      location: "Zimmerman Branch",
      completionDate: "November 2023",
    },
    {
      id: "grace",
      name: "Grace Akinyi",
      course: "Combined Package",
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      quote: "The combined package was perfect for me. I learned both automatic and manual driving confidently.",
      location: "Tassia Branch",
      completionDate: "October 2023",
    },
    {
      id: "peter",
      name: "Peter Ochieng",
      course: "Motorcycle License",
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      quote: "Learning to ride a motorcycle was a dream come true. FIVE ST★R made it safe and fun.",
      location: "Kahawa West Branch",
      completionDate: "September 2023",
    },
    {
      id: "mary",
      name: "Mary Njeri",
      course: "B1 Automatic Car",
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      quote: "The theory classes were comprehensive and the practical lessons were well-structured.",
      location: "Utawala Branch",
      completionDate: "August 2023",
    },
    {
      id: "david",
      name: "David Mwangi",
      course: "Light Truck License",
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      quote: "Professional commercial vehicle training that prepared me for my career as a driver.",
      location: "Sunton Branch",
      completionDate: "July 2023",
    },
  ]

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = isMuted
      if (isPlaying) {
        video.play().catch(console.error)
      } else {
        video.pause()
      }
    }
  }, [isPlaying, isMuted, currentTestimonial])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsPlaying(false)
  }

  const currentVideo = testimonials[currentTestimonial]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            Student Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Hear from over 10,000 students who successfully learned to drive with <span className="text-red-600">FIVE ST<span className="text-blue-600">★</span>R</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Player */}
          <div className="relative">
            <Card className="bg-white border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted={isMuted}
                    playsInline
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source src={currentVideo.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="lg"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 rounded-full w-16 h-16"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </Button>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Navigation Arrows */}
                  <Button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12"
                    onClick={prevTestimonial}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12"
                    onClick={nextTestimonial}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{currentVideo.name}</h3>
                      <p className="text-gray-600">{currentVideo.course}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-0">{currentVideo.location}</Badge>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Quote className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 italic leading-relaxed">{currentVideo.quote}</p>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">Completed: {currentVideo.completionDate}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">More Success Stories</h3>

            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-xl ${
                  currentTestimonial === index
                    ? "bg-gradient-to-r from-red-50 to-blue-50 ring-2 ring-red-500"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => {
                  setCurrentTestimonial(index)
                  setIsPlaying(false)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.course}</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                      {testimonial.location}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-2">{testimonial.quote}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">{testimonial.completionDate}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-red-500 text-red-600 hover:bg-red-50 bg-transparent"
                    >
                      Watch Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentTestimonial === index ? "bg-red-500" : "bg-gray-300"
              }`}
              onClick={() => {
                setCurrentTestimonial(index)
                setIsPlaying(false)
              }}
            />
          ))}
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-red-600 mb-2">10,000+</div>
              <p className="text-gray-600 font-medium">Students Trained</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-green-600 mb-2">97%</div>
              <p className="text-gray-600 font-medium">First-Time Pass Rate</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <p className="text-gray-600 font-medium">Locations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
