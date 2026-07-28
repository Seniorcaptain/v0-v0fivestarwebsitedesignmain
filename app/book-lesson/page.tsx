"use client"

import type { Metadata } from "next"
import { StreamlinedRegistration } from "@/components/streamlined-registration"

export const metadata: Metadata = {
  title: "Book Your Driving Lesson | FIVE ST★R Driving School Kenya",
  description: "Schedule your NTSA-certified driving lesson with expert instructors. 15+ locations, flexible scheduling, all-inclusive pricing. Book now - automatic & manual cars available.",
  keywords: "book driving lesson Kenya, NTSA certified instructor, driving lessons Nairobi, automatic driving, manual transmission training",
  openGraph: {
    title: "Book Your Driving Lesson | FIVE ST★R Driving School",
    description: "Schedule with our NTSA-certified instructors. Multiple locations, flexible times, transparent pricing.",
    url: "https://fivestardrivingschools.com/book-lesson",
  },
}

export default function BookLessonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Book Your Lesson</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Quick, simple registration. No hidden fees. Start learning today.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Streamlined Registration Form */}
        <StreamlinedRegistration />
      </div>
    </div>
  )
}
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Fill in Your Details
            </CardTitle>
            <CardDescription className="text-white/90">
              Tell us about your lesson preferences and we'll get back to you shortly
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="mb-4 flex justify-center">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Received!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for booking with Five Star Driving School. We'll contact you shortly to confirm your lesson.
                </p>
                <p className="text-sm text-gray-500">Redirecting...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-800">Personal Information</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="border-2 border-gray-300 focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="border-2 border-gray-300 focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0700 000 000"
                      required
                      className="border-2 border-gray-300 focus:border-red-600"
                    />
                  </div>
                </div>

                {/* Lesson Preferences */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-lg text-gray-800">Lesson Preferences</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Branch *</label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-red-600 focus:outline-none"
                      >
                        <option value="">Choose a branch</option>
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Type (NTSA Curriculum) *</label>
                      <select
                        name="lessonType"
                        value={formData.lessonType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-red-600 focus:outline-none"
                      >
                        <option value="">Choose lesson type</option>
                        {lessonTypes.map((type) => {
                          const pricing = lessonTypesPricing[type as keyof typeof lessonTypesPricing]
                          const displayPrice = pricing.discount > 0 
                            ? `KES ${(pricing.price - pricing.discount).toLocaleString()} (was KES ${pricing.price.toLocaleString()})`
                            : `KES ${pricing.price.toLocaleString()}`
                          return (
                            <option key={type} value={type}>
                              {type} - {displayPrice}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Note about Private Classes */}
                  <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
                    <p className="text-sm text-amber-800">
                      <span className="font-semibold">Note:</span> For Private Class bookings, Terms & Conditions apply. Contact our team at 0794 478 773 or 0727 555 558 for custom packages and pricing.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                      <Input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300 focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-red-600 focus:outline-none"
                      >
                        <option value="">Choose time</option>
                        <option value="07:00">7:00 AM</option>
                        <option value="08:00">8:00 AM</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Price Summary */}
                  {getSelectedLessonPrice() && (
                    <div className="bg-gradient-to-r from-red-50 to-blue-50 p-4 rounded-lg border-2 border-red-200">
                      <p className="text-sm text-gray-600 mb-2">Selected Package Price:</p>
                      <div className="flex items-baseline gap-3">
                        {getSelectedLessonPrice()!.discount > 0 ? (
                          <>
                            <span className="text-sm line-through text-gray-500">
                              KES {getSelectedLessonPrice()!.price.toLocaleString()}
                            </span>
                            <span className="text-2xl font-bold text-red-600">
                              KES {(getSelectedLessonPrice()!.price - getSelectedLessonPrice()!.discount).toLocaleString()}
                            </span>

                          </>
                        ) : (
                          <span className="text-2xl font-bold text-blue-600">
                            KES {getSelectedLessonPrice()!.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special requests or information you'd like to share..."
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-red-600 focus:outline-none resize-none"
                  />
                </div>

                {/* Payment Information */}
                {getSelectedLessonPrice() && (
                  <div className="pt-6 border-t">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        Payment Instructions
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">Amount Due:</p>
                          <p className="text-2xl font-bold text-red-600">
                            KES {(getSelectedLessonPrice()!.price - getSelectedLessonPrice()!.discount).toLocaleString()}
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-sm font-semibold text-gray-700 mb-3">M-Pesa Payment Details:</p>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600">Paybill Number:</span>
                              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded">400200</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600">Account Number:</span>
                              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded">40096666</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-sm font-semibold text-gray-700 mb-3">After Payment:</p>
                          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                            <li>Send confirmation via WhatsApp to <span className="font-semibold">0794 478 773</span></li>
                            <li>Or text to <span className="font-semibold">0727 555 558</span></li>
                            <li>Include your name and lesson details in the message</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6 flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Book Your Lesson Now
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  * Required fields. We'll contact you to confirm your booking.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
