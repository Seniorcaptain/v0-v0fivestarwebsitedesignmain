"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid3X3,
  Download,
  Share2,
  Info,
  Keyboard,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryImage {
  id: string
  src: string
  title: string
  description: string
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "1",
    src: "/images/mg-9973.jpeg",
    title: "Training Vehicle Rear View",
    description: "Five Star Driving School branded Mazda 3 with student driver signage and safety warnings",
  },
  {
    id: "2",
    src: "/images/mg-9989.jpeg",
    title: "Mazda 3 Training Vehicle",
    description: "Modern white Mazda 3 with full Five Star branding against scenic green backdrop",
  },
  {
    id: "3",
    src: "/images/mg-9988.jpeg",
    title: "Fleet Vehicle Side Profile",
    description: "Professional side view showcasing the complete Five Star Driving School livery",
  },
  {
    id: "4",
    src: "/images/mg-9984.jpeg",
    title: "Dynamic Rear Angle",
    description: "Mazda 3 captured from rear three-quarter angle showing branding and roof signage",
  },
  {
    id: "5",
    src: "/images/mg-999n2.jpg",
    title: "Front Quarter View",
    description: "Stunning front-left angle of the training vehicle against dramatic cloudy sky",
  },
  {
    id: "6",
    src: "/images/mg-0164-2c.jpeg",
    title: "Toyota Fielder Training Vehicle",
    description: "White Toyota Fielder wagon with doors open at Kasarani Stadium showcasing branding",
  },
  {
    id: "7",
    src: "/images/mg-9976.jpeg",
    title: "Urban Training Location",
    description: "Training vehicle positioned with city skyline in background and lush green surroundings",
  },
  {
    id: "8",
    src: "/images/mg-9992.jpeg",
    title: "Road Training Session",
    description: "Mazda 3 on red dirt road ready for practical driving lessons",
  },
  {
    id: "9",
    src: "/images/mg-9975.jpeg",
    title: "Detailed Fleet Number",
    description: "Close-up showing Fleet No. 015, star branding, and contact information",
  },
]

export function PhotoGalleryViewer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnails, setShowThumbnails] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showInfo, setShowInfo] = useState(true)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const slideshowInterval = useRef<NodeJS.Timeout | null>(null)

  const currentImage = GALLERY_IMAGES[currentIndex]

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)
    resetZoom()
    setIsLoading(true)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
    resetZoom()
    setIsLoading(true)
  }, [])

  const goToImage = (index: number) => {
    setCurrentIndex(index)
    resetZoom()
    setIsLoading(true)
  }

  // Zoom functions
  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 4))
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1))
  const resetZoom = () => {
    setZoom(1)
    setPanPosition({ x: 0, y: 0 })
  }

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Slideshow control
  const toggleSlideshow = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  // Handle slideshow
  useEffect(() => {
    if (isPlaying) {
      slideshowInterval.current = setInterval(goToNext, 4000)
    } else if (slideshowInterval.current) {
      clearInterval(slideshowInterval.current)
    }
    return () => {
      if (slideshowInterval.current) clearInterval(slideshowInterval.current)
    }
  }, [isPlaying, goToNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "l":
          goToNext()
          break
        case "ArrowLeft":
        case "h":
          goToPrev()
          break
        case "f":
          toggleFullscreen()
          break
        case " ":
          e.preventDefault()
          toggleSlideshow()
          break
        case "+":
        case "=":
          zoomIn()
          break
        case "-":
          zoomOut()
          break
        case "0":
          resetZoom()
          break
        case "i":
          setShowInfo((prev) => !prev)
          break
        case "t":
          setShowThumbnails((prev) => !prev)
          break
        case "Escape":
          if (isFullscreen) {
            document.exitFullscreen()
            setIsFullscreen(false)
          }
          break
        case "?":
          setShowKeyboardHelp((prev) => !prev)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev, toggleFullscreen, toggleSlideshow, isFullscreen])

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Pan functionality for zoomed images
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1 && e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - panPosition.x,
        y: e.touches[0].clientY - panPosition.y,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom > 1 && e.touches.length === 1) {
      setPanPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      })
    }
  }

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      if (e.deltaY < 0) {
        zoomIn()
      } else {
        zoomOut()
      }
    }
  }

  // Download image
  const downloadImage = async () => {
    try {
      const response = await fetch(currentImage.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `five-star-driving-${currentIndex + 1}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  // Share image
  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: currentImage.description,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Share failed:", error)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-zinc-950 flex flex-col overflow-hidden select-none"
      onWheel={handleWheel}
    >
      {/* Top Control Bar */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-white hover:text-orange-500 transition-colors">
            <span className="text-xl font-bold tracking-tight">
              FIVE<span className="text-orange-500">★</span>STAR
            </span>
          </a>
          <Badge variant="outline" className="text-zinc-400 border-zinc-700 hidden sm:flex">
            Fleet Gallery
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="hidden md:flex items-center gap-1 mr-2 bg-zinc-800/50 rounded-full px-2 py-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomOut}
              disabled={zoom <= 1}
              className="w-8 h-8 text-zinc-400 hover:text-white hover:bg-zinc-700/50"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs text-zinc-400 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomIn}
              disabled={zoom >= 4}
              className="w-8 h-8 text-zinc-400 hover:text-white hover:bg-zinc-700/50"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            {zoom > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={resetZoom}
                className="w-8 h-8 text-zinc-400 hover:text-white hover:bg-zinc-700/50"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Action Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={cn(
              "w-9 h-9 rounded-full",
              showThumbnails ? "text-orange-500 bg-zinc-800" : "text-zinc-400 hover:text-white hover:bg-zinc-800",
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInfo(!showInfo)}
            className={cn(
              "w-9 h-9 rounded-full",
              showInfo ? "text-orange-500 bg-zinc-800" : "text-zinc-400 hover:text-white hover:bg-zinc-800",
            )}
          >
            <Info className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSlideshow}
            className={cn(
              "w-9 h-9 rounded-full",
              isPlaying ? "text-orange-500 bg-zinc-800" : "text-zinc-400 hover:text-white hover:bg-zinc-800",
            )}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={downloadImage}
            className="w-9 h-9 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Download className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={shareImage}
            className="w-9 h-9 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 hidden sm:flex"
          >
            <Share2 className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
            className="w-9 h-9 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 hidden md:flex"
          >
            <Keyboard className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>

          <a href="/">
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </header>

      {/* Main Image Area */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
      >
        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrev}
          className="absolute left-4 md:left-8 z-40 w-12 h-12 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-white border border-zinc-700 transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="absolute right-4 md:right-8 z-40 w-12 h-12 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-white border border-zinc-700 transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Main Image */}
        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
              <div className="w-12 h-12 border-4 border-zinc-700 border-t-orange-500 rounded-full animate-spin" />
            </div>
          )}
          <img
            ref={imageRef}
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.title}
            className={cn(
              "max-w-full max-h-full object-contain transition-all duration-300",
              isLoading ? "opacity-0" : "opacity-100",
            )}
            style={{
              transform: `scale(${zoom}) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
              transition: isDragging ? "none" : "transform 0.3s ease",
            }}
            onLoad={() => setIsLoading(false)}
            draggable={false}
          />
        </div>

        {/* Image Info Overlay */}
        {showInfo && (
          <div className="absolute bottom-0 left-0 right-0 z-30 p-4 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl md:text-2xl font-bold text-white">{currentImage.title}</h2>
                <Badge className="bg-orange-500 text-white border-0">
                  <span className="text-orange-200">{String(currentIndex + 1).padStart(2, "0")}</span>
                  <span className="mx-1 text-orange-300">/</span>
                  <span>{GALLERY_IMAGES.length}</span>
                </Badge>
              </div>
              <p className="text-zinc-400 text-sm md:text-base max-w-2xl">{currentImage.description}</p>
            </div>
          </div>
        )}

        {/* Progress Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5">
          {GALLERY_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "w-8 bg-orange-500" : "bg-zinc-600 hover:bg-zinc-400",
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {showThumbnails && (
        <div className="absolute bottom-20 md:bottom-24 left-0 right-0 z-30">
          <div className="flex items-center justify-center gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
            {GALLERY_IMAGES.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToImage(index)}
                className={cn(
                  "relative flex-shrink-0 w-16 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all duration-300",
                  index === currentIndex
                    ? "ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-950 scale-110"
                    : "opacity-50 hover:opacity-100 hover:scale-105",
                )}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {index === currentIndex && <div className="absolute inset-0 bg-orange-500/20" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Help Modal */}
      {showKeyboardHelp && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Keyboard Shortcuts</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowKeyboardHelp(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { keys: ["←", "H"], action: "Previous image" },
                { keys: ["→", "L"], action: "Next image" },
                { keys: ["Space"], action: "Toggle slideshow" },
                { keys: ["F"], action: "Toggle fullscreen" },
                { keys: ["+"], action: "Zoom in" },
                { keys: ["-"], action: "Zoom out" },
                { keys: ["0"], action: "Reset zoom" },
                { keys: ["I"], action: "Toggle info" },
                { keys: ["T"], action: "Toggle thumbnails" },
                { keys: ["Esc"], action: "Exit fullscreen" },
              ].map(({ keys, action }) => (
                <div key={action} className="flex items-center justify-between">
                  <span className="text-zinc-400">{action}</span>
                  <div className="flex gap-1">
                    {keys.map((key) => (
                      <kbd key={key} className="px-2 py-1 bg-zinc-800 rounded text-zinc-300 text-xs font-mono">
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Slideshow indicator */}
      {isPlaying && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40">
          <Badge className="bg-orange-500/90 text-white border-0 animate-pulse">
            <Play className="w-3 h-3 mr-1 fill-current" />
            Slideshow Playing
          </Badge>
        </div>
      )}

      {/* Mobile Zoom Controls */}
      <div className="md:hidden absolute bottom-32 right-4 z-40 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={zoomIn}
          disabled={zoom >= 4}
          className="w-10 h-10 rounded-full bg-zinc-900/80 text-white border border-zinc-700"
        >
          <ZoomIn className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={zoomOut}
          disabled={zoom <= 1}
          className="w-10 h-10 rounded-full bg-zinc-900/80 text-white border border-zinc-700"
        >
          <ZoomOut className="w-5 h-5" />
        </Button>
        {zoom > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={resetZoom}
            className="w-10 h-10 rounded-full bg-zinc-900/80 text-white border border-zinc-700"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  )
}
