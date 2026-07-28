"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function QuickBookingCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Info */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 md:p-10 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
                  <p className="text-gray-200 mb-6 text-lg">
                    Registration takes just 2 minutes. No hidden fees. Clear pricing. Start your driving journey today.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">Simple 5-step registration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">Transparent all-inclusive pricing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">Confirmation within 24 hours</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400">
                    No commitment. Cancel anytime.
                  </p>
                </div>

                {/* Right Side - CTA */}
                <div className="bg-white p-8 md:p-10 flex flex-col justify-center items-center text-center">
                  <p className="text-gray-600 mb-4 font-semibold">Join 20,000+ Students</p>

                  <Link href="/book-lesson" className="w-full mb-4">
                    <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg h-14 rounded-lg">
                      Start Registration Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>

                  <p className="text-sm text-gray-600">
                    Questions? Call{" "}
                    <a href="tel:0794478773" className="text-red-600 font-semibold hover:underline">
                      0794 478 773
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
