"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone, X } from "lucide-react"

export function ChatSupportToggle() {
  const [isExpanded, setIsExpanded] = useState(false)

  const onWhatsAppClick = () => {
    window.open(
      "https://wa.me/254794478773?text=Hi! I'm interested in learning to drive with FIVE ST★R Driving School. Can you please provide me with more information about your courses and pricing?",
      "_blank",
    )
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6">
      {isExpanded && (
        <Card className="mb-4 bg-white border-2 border-gray-200 shadow-lg animate-fade-in-up w-64">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 text-sm">Need Help?</h3>
              <Button
                size="sm"
                variant="ghost"
                className="p-0 h-auto"
                onClick={() => setIsExpanded(false)}
              >
                <X className="w-4 h-4 text-gray-500" />
              </Button>
            </div>

            <div className="space-y-2">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white justify-start text-sm h-9"
                onClick={() => {
                  onWhatsAppClick()
                  setIsExpanded(false)
                }}
              >
                <MessageCircle className="w-3.5 h-3.5 mr-2" />
                WhatsApp
              </Button>

              <Button
                variant="outline"
                className="w-full text-gray-700 hover:text-red-600 hover:border-red-400 justify-start text-sm h-9"
                onClick={() => {
                  window.open("tel:0794478773", "_self")
                  setIsExpanded(false)
                }}
              >
                <Phone className="w-3.5 h-3.5 mr-2" />
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center"
        onClick={() => setIsExpanded(!isExpanded)}
        title="Get help"
      >
        {isExpanded ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </Button>
    </div>
  )
}
