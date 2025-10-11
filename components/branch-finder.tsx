"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Navigation, Search, Clock } from "lucide-react"

interface Branch {
  name: string
  phone: string
  location: string
  address: string
  coordinates: { lat: number; lng: number }
  hours?: string
  services?: string[]
}

interface BranchFinderProps {
  branches: Branch[]
}

export function BranchFinder({ branches }: BranchFinderProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Find Your Nearest Branch</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Search through our 20+ locations to find the most convenient branch for your driving lessons
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search by area, branch name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 bg-white border-gray-300 focus:border-red-500"
        />
      </div>

      {/* Branch Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBranches.map((branch, index) => (
          <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                {branch.name}
              </CardTitle>
              <p className="text-gray-600 text-sm">{branch.location}</p>
              <p className="text-gray-500 text-xs">{branch.address}</p>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  <span className="font-medium">{branch.phone}</span>
                </div>

                <div className="flex items-start text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-blue-500 mt-0.5" />
                  <div className="text-xs">
                    <div>Mon-Fri: 7:00 AM - 7:00 PM</div>
                    <div>Sat: 8:00 AM - 5:00 PM</div>
                    <div>Sun: Available Upon Request</div>
                  </div>
                </div>
              </div>

              {branch.services && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {branch.services.map((service, serviceIndex) => (
                    <Badge key={serviceIndex} variant="outline" className="text-xs border-green-200 text-green-700">
                      {service}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  onClick={() => window.open(`tel:${branch.phone}`, "_self")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Branch
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates.lat},${branch.coordinates.lng}`,
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
        ))}
      </div>

      {/* No Results */}
      {filteredBranches.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No branches found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search terms to find branches in your area.</p>
          <Button
            variant="outline"
            onClick={() => setSearchTerm("")}
            className="border-red-500 text-red-600 hover:bg-red-50 bg-transparent"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}
