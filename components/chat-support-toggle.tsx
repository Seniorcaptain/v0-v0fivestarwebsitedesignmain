"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone, X } from "lucide-react"

interface ChatSupportToggleProps {
  onWhatsAppClick: () => void
}

export function ChatSupportToggle({ onWhatsAppClick }: ChatSupportToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isExpanded && (
        <Card className="mb-4 bg-white border-0 shadow-2xl animate-fade-in-up">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Get Support</h3>
              <Button size="sm" variant="ghost" className="p-1" onClick={() => setIsExpanded(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white justify-start"
                onClick={() => {
                  onWhatsAppClick()
                  setIsExpanded(false)
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Chat
              </Button>

              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50 justify-start bg-transparent"
                onClick={() => {
                  window.open("tel:0794478773", "_self")
                  setIsExpanded(false)
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call: 0794 478 773
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-full w-14 h-14 shadow-2xl"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  )
}
