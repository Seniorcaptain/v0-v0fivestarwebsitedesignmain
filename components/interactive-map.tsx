"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Navigation, Clock, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"

interface Branch {
  name: string
  phone: string
  location: string
  address: string
  coordinates: { lat: number; lng: number }
  hours?: string
  services?: string[]
  county: "Nairobi" | "Kiambu"
  constituency: string
}

interface InteractiveMapProps {
  branches: Branch[]
}

export function InteractiveMap({ branches }: InteractiveMapProps) {
  const [selectedCounty, setSelectedCounty] = useState<"Nairobi" | "Kiambu">("Nairobi")
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const filteredBranches = branches.filter((branch) => branch.county === selectedCounty)

  const latLngToSVG = (lat: number, lng: number, county: "Nairobi" | "Kiambu") => {
    if (county === "Nairobi") {
      // Nairobi bounds: lat -1.45 to -1.15, lng 36.65 to 37.1
      const x = ((lng - 36.65) / (37.1 - 36.65)) * 800
      const y = ((lat - -1.15) / (-1.45 - -1.15)) * 600
      return { x, y }
    } else {
      // Kiambu bounds: lat -1.25 to -0.9, lng 36.7 to 37.05
      const x = ((lng - 36.7) / (37.05 - 36.7)) * 800
      const y = ((lat - -0.9) / (-1.25 - -0.9)) * 600
      return { x, y }
    }
  }

  const handleMarkerClick = (branch: Branch) => {
    setSelectedBranch(branch)
  }

  const closePopup = () => {
    setSelectedBranch(null)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleResetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="space-y-8">
      {/* County Selector */}
      <div className="flex justify-center gap-4 flex-wrap">
        <Button
          size="lg"
          onClick={() => {
            setSelectedCounty("Nairobi")
            setSelectedBranch(null)
            handleResetView()
          }}
          className={`px-8 py-6 text-lg font-bold transition-all ${
            selectedCounty === "Nairobi"
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl scale-105"
              : "bg-white text-gray-700 border-2 border-gray-300 hover:border-green-500"
          }`}
        >
          <MapPin className="w-5 h-5 mr-2" />
          Nairobi County
        </Button>
        <Button
          size="lg"
          onClick={() => {
            setSelectedCounty("Kiambu")
            setSelectedBranch(null)
            handleResetView()
          }}
          className={`px-8 py-6 text-lg font-bold transition-all ${
            selectedCounty === "Kiambu"
              ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl scale-105"
              : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500"
          }`}
        >
          <MapPin className="w-5 h-5 mr-2" />
          Kiambu County
        </Button>
      </div>

      {/* Map Section */}
      <Card className="bg-white border-0 shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50">
            <div
              className="relative w-full h-[600px] md:h-[700px] overflow-hidden cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transition: isDragging ? "none" : "transform 0.3s ease",
                }}
              >
                {/* Map Background with Grid */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                  </pattern>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                  </filter>
                </defs>

                <rect width="800" height="600" fill="#f0f9ff" />
                <rect width="800" height="600" fill="url(#grid)" />

                {/* County Regions - Stylized areas */}
                {selectedCounty === "Nairobi" ? (
                  <>
                    {/* Nairobi constituencies as colored regions */}
                    <path
                      d="M 100 150 L 250 100 L 350 150 L 300 250 L 150 280 Z"
                      fill="#86efac"
                      opacity="0.3"
                      stroke="#22c55e"
                      strokeWidth="2"
                    />
                    <path
                      d="M 350 150 L 500 120 L 550 200 L 480 280 L 300 250 Z"
                      fill="#7dd3fc"
                      opacity="0.3"
                      stroke="#0ea5e9"
                      strokeWidth="2"
                    />
                    <path
                      d="M 150 280 L 300 250 L 350 380 L 200 420 Z"
                      fill="#fbbf24"
                      opacity="0.3"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    <path
                      d="M 300 250 L 480 280 L 500 400 L 350 380 Z"
                      fill="#c084fc"
                      opacity="0.3"
                      stroke="#a855f7"
                      strokeWidth="2"
                    />
                    <path
                      d="M 480 280 L 550 200 L 680 250 L 650 380 L 500 400 Z"
                      fill="#fb923c"
                      opacity="0.3"
                      stroke="#f97316"
                      strokeWidth="2"
                    />
                  </>
                ) : (
                  <>
                    {/* Kiambu constituencies as colored regions */}
                    <path
                      d="M 120 100 L 280 80 L 350 180 L 250 250 L 150 220 Z"
                      fill="#a78bfa"
                      opacity="0.3"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                    />
                    <path
                      d="M 280 80 L 450 100 L 500 200 L 350 180 Z"
                      fill="#86efac"
                      opacity="0.3"
                      stroke="#22c55e"
                      strokeWidth="2"
                    />
                    <path
                      d="M 150 220 L 250 250 L 300 380 L 180 400 Z"
                      fill="#fca5a5"
                      opacity="0.3"
                      stroke="#ef4444"
                      strokeWidth="2"
                    />
                    <path
                      d="M 250 250 L 350 180 L 500 200 L 480 320 L 300 380 Z"
                      fill="#fde047"
                      opacity="0.3"
                      stroke="#eab308"
                      strokeWidth="2"
                    />
                    <path
                      d="M 500 200 L 650 180 L 680 300 L 580 380 L 480 320 Z"
                      fill="#67e8f9"
                      opacity="0.3"
                      stroke="#06b6d4"
                      strokeWidth="2"
                    />
                  </>
                )}

                {/* Roads/Highways */}
                <path
                  d="M 0 300 Q 200 280 400 300 T 800 300"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                  opacity="0.5"
                />
                <path
                  d="M 400 0 Q 380 200 400 400 T 400 600"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                  opacity="0.5"
                />

                {/* Branch Markers */}
                {filteredBranches.map((branch, index) => {
                  const pos = latLngToSVG(branch.coordinates.lat, branch.coordinates.lng, selectedCounty)
                  return (
                    <g
                      key={index}
                      onClick={() => handleMarkerClick(branch)}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      filter="url(#shadow)"
                    >
                      {/* Marker Pin */}
                      <path
                        d={`M ${pos.x} ${pos.y - 30} C ${pos.x - 15} ${pos.y - 30} ${pos.x - 15} ${pos.y - 15} ${pos.x - 15} ${pos.y - 15} C ${pos.x - 15} ${pos.y - 5} ${pos.x} ${pos.y} ${pos.x} ${pos.y} C ${pos.x} ${pos.y} ${pos.x + 15} ${pos.y - 5} ${pos.x + 15} ${pos.y - 15} C ${pos.x + 15} ${pos.y - 15} ${pos.x + 15} ${pos.y - 30} ${pos.x} ${pos.y - 30} Z`}
                        fill="#dc2626"
                        stroke="#991b1b"
                        strokeWidth="2"
                      />
                      <circle cx={pos.x} cy={pos.y - 20} r="5" fill="white" />

                      {/* Pulse Animation */}
                      <circle cx={pos.x} cy={pos.y - 20} r="8" fill="#dc2626" opacity="0.3">
                        <animate attributeName="r" from="8" to="20" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>

                      {/* Branch Label */}
                      <text
                        x={pos.x}
                        y={pos.y + 5}
                        textAnchor="middle"
                        className="text-xs font-bold fill-gray-800"
                        style={{ fontSize: "10px", pointerEvents: "none" }}
                      >
                        {branch.location}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* Zoom Controls */}
              <div className="absolute bottom-6 right-6 z-[500] flex flex-col gap-2">
                <Button
                  size="icon"
                  onClick={handleZoomIn}
                  className="bg-white hover:bg-gray-100 text-gray-700 shadow-xl border-2 border-gray-200"
                >
                  <ZoomIn className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={handleZoomOut}
                  className="bg-white hover:bg-gray-100 text-gray-700 shadow-xl border-2 border-gray-200"
                >
                  <ZoomOut className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={handleResetView}
                  className="bg-white hover:bg-gray-100 text-gray-700 shadow-xl border-2 border-gray-200"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Selected Branch Popup */}
              {selectedBranch && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
                  <Card className="bg-white max-w-md w-full shadow-2xl border-0 animate-in fade-in zoom-in duration-300">
                    <CardContent className="p-6">
                      {/* Close Button */}
                      <button
                        onClick={closePopup}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>

                      {/* Branch Header */}
                      <div className="mb-6">
                        <div className="flex items-start mb-3">
                          <MapPin className="w-6 h-6 text-red-600 fill-red-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-balance">
                              {selectedBranch.name}
                            </h3>
                            <Badge variant="outline" className="border-blue-200 text-blue-700">
                              {selectedBranch.constituency}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Branch Details */}
                      <div className="space-y-4 mb-6">
                        {/* Address */}
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                            <p className="text-gray-900">{selectedBranch.address}</p>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start">
                          <Phone className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Contact</p>
                            <a
                              href={`tel:${selectedBranch.phone}`}
                              className="text-green-600 font-semibold hover:underline"
                            >
                              {selectedBranch.phone}
                            </a>
                          </div>
                        </div>

                        {/* Hours */}
                        {selectedBranch.hours && (
                          <div className="flex items-start">
                            <Clock className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Operating Hours</p>
                              <p className="text-gray-900">{selectedBranch.hours}</p>
                            </div>
                          </div>
                        )}

                        {/* Services */}
                        {selectedBranch.services && selectedBranch.services.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-2">Services Available</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedBranch.services.map((service, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-green-50 text-green-700">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => window.open(`tel:${selectedBranch.phone}`, "_self")}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        <Button
                          variant="outline"
                          className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/dir/?api=1&destination=${selectedBranch.coordinates.lat},${selectedBranch.coordinates.lng}`,
                              "_blank",
                            )
                          }
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 z-[500] border-2 border-gray-200 hidden md:block">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                LEGEND
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-red-600 fill-red-600 mr-3" />
                  <span className="text-gray-700 font-medium">FIVE ST★R Branch Locations</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 italic">Click markers • Drag to pan • Use zoom controls</p>
                </div>
              </div>
            </div>

            {/* County Info Badge */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl px-6 py-3 z-[500] border-2 border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                {selectedCounty === "Nairobi" ? "NAIROBI COUNTY" : "KIAMBU COUNTY"}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {filteredBranches.length} Branch{filteredBranches.length !== 1 ? "es" : ""} Available
              </p>
            </div>

            {/* Quick Actions */}
            <div className="absolute top-6 right-6 z-[500] hidden md:block">
              <Button
                size="sm"
                className="bg-white/95 backdrop-blur-sm text-gray-700 hover:bg-white border-2 border-gray-200 shadow-xl"
                onClick={() =>
                  window.open("https://www.google.com/maps/search/FIVESTAR+Driving+School+Nairobi", "_blank")
                }
              >
                <Navigation className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Branch Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">{filteredBranches.length}</div>
            <div className="text-sm text-green-100">{selectedCounty === "Nairobi" ? "Nairobi" : "Kiambu"} Branches</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">20+</div>
            <div className="text-sm text-blue-100">Total Locations</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">2</div>
            <div className="text-sm text-purple-100">Counties Covered</div>
          </CardContent>
        </Card>
      </div>

      {/* Help Card */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <h4 className="font-bold text-2xl mb-3">Need Help Finding Us?</h4>
          <p className="text-green-100 mb-6 text-lg">
            Click any branch marker on the map or call for detailed directions
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-green-600 border-white hover:bg-green-50 font-medium"
              onClick={() =>
                window.open(
                  "https://wa.me/254794478773?text=Hi, I need directions to the nearest FIVESTAR branch",
                  "_blank",
                )
              }
            >
              <Phone className="w-5 h-5 mr-2" />
              WhatsApp for Directions
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-green-600 border-white hover:bg-green-50 font-medium"
              onClick={() => window.open("tel:0794478773", "_self")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Head Office
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
