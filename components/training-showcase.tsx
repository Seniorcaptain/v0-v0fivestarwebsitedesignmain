"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, CheckCircle, Users, Clock, Award } from "lucide-react"

interface TrainingVideo {
  id: string
  title: string
  description: string
  videoSrc: string
  category: string
  duration: string
  features: string[]
}

export function TrainingShowcase() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const trainingVideos: TrainingVideo[] = [
    {
      id: "practical",
      title: "Practical Driving Lessons",
      description: "Real footage from our hands-on driving sessions with professional instructors",
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "Practical Training",
      duration: "30 Lessons Included",
      features: ["One-on-one instruction", "Dual control vehicles", "Real road experience", "Safety focused"],
    },
    {
      id: "theory",
      title: "Theory Classes",
      description: "Comprehensive classroom sessions covering road signs, traffic rules, and safety",
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      category: "Theory Training",
      duration: "Unlimited Sessions",
      features: ["Interactive learning", "NTSA curriculum", "Road signs mastery", "Traffic rules"],
    },
    {
      id: "mechanics",
      title: "Basic Mechanics Training",
      description: "Learn essential vehicle maintenance and basic mechanical knowledge",
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "Mechanics Training",
      duration: "Included in Course",
      features: ["Engine basics", "Maintenance tips", "Troubleshooting", "Safety checks"],
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
  }, [isPlaying, isMuted, currentVideo])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const currentTraining = trainingVideos[currentVideo]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            Professional Training
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Experience our comprehensive training program designed to make you a confident, safe driver
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
                    <source src={currentTraining.videoSrc} type="video/mp4" />
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

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white border-0">{currentTraining.category}</Badge>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{currentTraining.title}</h3>
                      <p className="text-gray-600">{currentTraining.description}</p>
                    </div>
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      {currentTraining.duration}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {currentTraining.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Options */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">What You'll Learn</h3>

            {trainingVideos.map((video, index) => (
              <Card
                key={video.id}
                className={`cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-xl ${
                  currentVideo === index
                    ? "bg-gradient-to-r from-red-50 to-blue-50 ring-2 ring-red-500"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => {
                  setCurrentVideo(index)
                  setIsPlaying(false)
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-900">{video.title}</CardTitle>
                    <Badge className={`${currentVideo === index ? "bg-red-500" : "bg-gray-500"} text-white border-0`}>
                      {video.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">{video.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {video.duration}
                    </div>
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

            {/* Training Stats */}
            <Card className="bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white mt-8">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-4">Training Highlights</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold mb-1">30</div>
                    <p className="text-sm opacity-90">Practical Lessons</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">∞</div>
                    <p className="text-sm opacity-90">Theory Sessions</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">100%</div>
                    <p className="text-sm opacity-90">NTSA Certified</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">FREE</div>
                    <p className="text-sm opacity-90">Learner's Manual</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Training Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Expert Instructors</h4>
              <p className="text-gray-600">NTSA-certified professionals with years of experience in driver training</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Flexible Schedule</h4>
              <p className="text-gray-600">Morning, afternoon, and weekend classes to fit your busy lifestyle</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">97% Pass Rate</h4>
              <p className="text-gray-600">
                Our proven teaching methods ensure high success rates on the first attempt
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
