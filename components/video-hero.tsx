"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Phone, MessageCircle, MapPin, Award, Users, Star } from "lucide-react"

export function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          poster="/placeholder.svg?height=1080&width=1920&text=FIVESTAR+Hero+Video"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-blue-600/30"></div>
      </div>

      {/* Video Controls */}
      <div
        className="absolute top-4 right-4 z-20 flex space-x-2 opacity-0 hover:opacity-100 transition-opacity duration-300"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Button size="sm" className="bg-black/50 hover:bg-black/70 text-white border-0" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button size="sm" className="bg-black/50 hover:bg-black/70 text-white border-0" onClick={toggleMute}>
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
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
            10,000+ Students Trained
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
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="block text-white mb-2">
            FIVE ST<span className="text-yellow-400">★</span>R
          </span>
          <span className="block bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
            Driving School
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-yellow-300 animate-fade-in-up">
          "Driving is Fun"
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

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => {
              document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Book Your Lesson Now
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg rounded-full font-semibold bg-transparent backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            onClick={() => window.open("tel:0794478773", "_self")}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call: 0794 478 773
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white px-8 py-4 text-lg rounded-full font-semibold bg-transparent backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            onClick={() => {
              window.open(
                "https://wa.me/254794478773?text=Hi! I'm interested in learning to drive with FIVE ST★R. Can you help me get started?",
                "_blank",
              )
            }}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp Us
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">10,000+</div>
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
