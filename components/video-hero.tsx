"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, MapPin, Award, Users, Star, ChevronLeft, ChevronRight } from "lucide-react"

export function VideoHero() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Video options - Optimized hero images with vibrant motion photography
  const videoOptions = [
    {
      id: 1,
      title: "White Van Fleet",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4002.JPG-S8LHBZgu1aLzRP29H8hQMA9JwwI69d.jpeg",
      poster: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4002.JPG-S8LHBZgu1aLzRP29H8hQMA9JwwI69d.jpeg",
      description: "Professional training vehicle in action",
    },
    {
      id: 2,
      title: "Blue Mazda Training",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3422-QpHhuJSt27Ca0XQQMsQXHQgxVW83u1.jpg",
      poster: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3422-QpHhuJSt27Ca0XQQMsQXHQgxVW83u1.jpg",
      description: "Dynamic driving demonstration",
    },
    {
      id: 3,
      title: "Black Nissan Fleet",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3986.JPG-omaqh2JVwWLVny60UxaizPoN8FfWcO.jpeg",
      poster: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3986.JPG-omaqh2JVwWLVny60UxaizPoN8FfWcO.jpeg",
      description: "Professional training in motion",
    },
    {
      id: 4,
      title: "White Avanza Fleet",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4001-N6LDlOQjmOTc5Athd6C8it3A85Chkn.jpg",
      poster: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4001-N6LDlOQjmOTc5Athd6C8it3A85Chkn.jpg",
      description: "Impressive fleet showcase",
    },
    {
      id: 5,
      title: "Premium Training Vehicle",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3990.JPG-8dglCxD0RZJxjBhVirom7s1nw5ONvq.jpeg",
      poster: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3990.JPG-8dglCxD0RZJxjBhVirom7s1nw5ONvq.jpeg",
      description: "Real-world driving training",
    },
    {
      id: 6,
      title: "Black Vehicle Professional",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3989-ip3zXdZzWWR6DZf0BiQ8kcl8DDXjA.jpg",
      poster: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3989-ip3zXdZzWWR6DZf0BiQ8kcl8DDXjA.jpg",
      description: "Complete vehicle lineup",
    },
  ]

  const currentVideo = videoOptions[currentVideoIndex]

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
  }, [isPlaying, isMuted])

  useEffect(() => {
    const autoRotateInterval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoOptions.length)
    }, 5000) // 5 seconds for faster rotation

    return () => clearInterval(autoRotateInterval)
  }, [videoOptions.length])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const switchVideo = (index: number) => {
    setCurrentVideoIndex(index)
    setIsPlaying(false) // Pause current video when switching
  }

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoOptions.length)
    setIsPlaying(false)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videoOptions.length) % videoOptions.length)
    setIsPlaying(false)
  }

  const handleBookNow = () => {
    router.push("/book-lesson")
  }

  const handleWhatsApp = () => {
    window.open("https://wa.me/254794478773", "_blank")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={currentVideo.poster || "/placeholder.svg"}
          alt={currentVideo.title}
          fill
          priority={true}
          quality={80}
          className="object-cover transition-all duration-300"
          sizes="100vw"
          loading="eager"
        />

        {/* Video Overlay - Vibrant color gradient */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-blue-600/20 to-transparent"></div>
      </div>

      {/* Video Controls */}
      <div
        className="absolute top-4 right-4 z-20 flex space-x-2 opacity-0 hover:opacity-100 transition-opacity duration-300"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Button size="sm" className="bg-black/50 hover:bg-black/70 text-white border-0" onClick={prevVideo}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-black/50 hover:bg-black/70 text-white border-0" onClick={nextVideo}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>



      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-up">
          <Badge className="bg-red-600 text-white border-0 px-4 py-2 text-sm font-semibold">
            <Award className="w-4 h-4 mr-2" />
            NTSA Certified
          </Badge>
          <Badge className="bg-blue-600 text-white border-0 px-4 py-2 text-sm font-semibold">
            <Users className="w-4 h-4 mr-2" />
            20,000+ Students Trained
          </Badge>
          <Badge className="bg-green-600 text-white border-0 px-4 py-2 text-sm font-semibold">
            <MapPin className="w-4 h-4 mr-2" />
            20+ Locations
          </Badge>
          <Badge className="bg-yellow-600 text-white border-0 px-4 py-2 text-sm font-semibold">
            <Star className="w-4 h-4 mr-2" />
            97% Pass Rate
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up drop-shadow-lg">
          <span className="block text-red-500 mb-2 drop-shadow-lg">
            FIVE ST<span className="text-yellow-400 drop-shadow-lg">★</span>R
          </span>
          <span className="block bg-gradient-to-r from-red-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            Driving School
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-yellow-300 animate-fade-in-up drop-shadow-lg">
          "Get All Your Stars In Driving"
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up opacity-90">
          Learn to drive with Kenya's most trusted NTSA-certified instructors. Modern vehicles, structured programs, and
          all-inclusive pricing across 20+ locations in Nairobi and Kiambu.
        </p>

        {/* Pricing Highlight */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto animate-scale-in">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">🎉 Our Fee is All Inclusive 🎉</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">Ksh 13,000</div>
              <div className="text-sm opacity-80">B1/B2 Car License</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">Ksh 7,000</div>
              <div className="text-sm opacity-80">Motorcycle License</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">Ksh 14,000</div>
              <div className="text-sm opacity-80">Combined Package</div>
            </div>
          </div>
          <p className="text-sm mt-4 text-yellow-200">Includes FREE Learner's Manual + 30 Lessons + Unlimited Theory</p>
        </div>

        {/* CTA Buttons - Vibrant and prominent */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up">
          <Button
            size="lg"
            onClick={handleBookNow}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-7 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-red-400 cursor-pointer"
          >
            <Phone className="w-6 h-6 mr-3" />
            Book Classes Now
          </Button>
          <Button
            size="lg"
            onClick={handleWhatsApp}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-7 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-blue-400 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Chat with Us
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">20,000+</div>
            <div className="text-sm opacity-80">Students Trained</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">20+</div>
            <div className="text-sm opacity-80">Locations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">97%</div>
            <div className="text-sm opacity-80">Pass Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">6+</div>
            <div className="text-sm opacity-80">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
