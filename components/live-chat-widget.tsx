"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Send, Phone, MessageCircle, Bot } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "agent"
  timestamp: Date
  agentName?: string
}

interface Agent {
  name: string
  role: string
  status: "online" | "busy" | "offline"
  avatar: string
}

export function LiveChatWidget() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to FIVE ST★R Driving School. How can I help you today?",
      sender: "agent",
      timestamp: new Date(),
      agentName: "Customer Support",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const agents: Agent[] = [
    {
      name: "Customer Support",
      role: "Support Agent",
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40&text=CS",
    },
  ]

  const quickReplies = ["Course information", "Pricing details", "Branch locations", "Book a lesson", "Operating hours"]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setNewMessage("")
      setIsTyping(true)

      // Simulate agent response
      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getAgentResponse(newMessage),
          sender: "agent",
          timestamp: new Date(),
          agentName: "Customer Support",
        }
        setMessages((prev) => [...prev, agentResponse])
        setIsTyping(false)
      }, 1500)
    }
  }

  const getAgentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("price") || message.includes("cost") || message.includes("fee")) {
      return "Our fees are all-inclusive! B1/B2 car licenses are Ksh 13,000, motorcycles are Ksh 7,000. This includes 30 practical lessons, unlimited theory, basic mechanics, and a FREE learner's manual. Would you like to know more about any specific course?"
    }

    if (message.includes("location") || message.includes("branch")) {
      return "We have 14 convenient locations across Nairobi including Roysambu, Zimmerman, Tassia, Kahawa West, and more. Which area would be most convenient for you? I can provide specific branch details and contact information."
    }

    if (message.includes("book") || message.includes("schedule")) {
      return "Great! I can help you book a lesson. We offer Private Classes (with pick & drop), Open Classes, and Refresher sessions. Our hours are Mon-Fri 8AM-5PM, Sat 8AM-5PM. Which course interests you?"
    }

    if (message.includes("time") || message.includes("hour") || message.includes("schedule")) {
      return "We're open Monday-Friday 8:00 AM - 5:00 PM, and Saturday 8:00 AM - 5:00 PM. Sunday lessons are available upon request. We offer flexible scheduling to fit your needs!"
    }

    return "Thank you for your question! For detailed information about our courses, pricing, and scheduling, I'd recommend calling our main office at 0794 478 773 or visiting your nearest branch. Is there anything specific I can help clarify?"
  }

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply)
    sendMessage()
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white rounded-full w-16 h-16 shadow-2xl animate-bounce"
          onClick={() => setIsMinimized(false)}
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="bg-white border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-red-500 to-blue-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Live Chat Support</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm opacity-90">Online</span>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 p-1"
              onClick={() => setIsMinimized(true)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-red-500 to-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.sender === "agent" && (
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot className="w-4 h-4" />
                      <span className="text-xs font-medium">{message.agentName}</span>
                    </div>
                  )}
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs px-4 py-2 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-1">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs font-medium">Customer Support</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  className="text-xs border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 border-gray-300 focus:border-red-500"
              />
              <Button
                className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white"
                onClick={sendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Contact Options */}
          <div className="p-4 bg-gray-50 rounded-b-lg">
            <p className="text-xs text-gray-600 mb-3">Need immediate assistance?</p>
            <div className="flex space-x-2">
              <Button
                size="sm"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs"
                onClick={() => window.open("tel:0794478773", "_self")}
              >
                <Phone className="w-3 h-3 mr-1" />
                Call Now
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 text-xs bg-transparent"
                onClick={() => {
                  window.open(
                    "https://wa.me/254794478773?text=Hi! I need assistance with FIVESTAR Driving School services.",
                    "_blank",
                  )
                }}
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
