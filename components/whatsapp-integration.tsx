"use client"

import { formatDateConsistent } from "@/lib/utils"

interface WhatsAppMessage {
  branchWhatsApp: string
  mainWhatsApp: string
  message: string
}

export class WhatsAppService {
  static formatBookingMessage(bookingData: any): string {
    const message = `🚗 NEW BOOKING - FIVE ST★R DRIVING SCHOOL

📋 Booking Reference: ${bookingData.reference}
📅 Date: ${formatDateConsistent(new Date())}

👤 STUDENT DETAILS:
Name: ${bookingData.personalInfo.name}
Phone: ${bookingData.personalInfo.phone}
ID: ${bookingData.personalInfo.idNumber}

🎓 COURSE DETAILS:
Course: ${bookingData.course}
Class Type: ${bookingData.classType}
Branch: ${bookingData.branch}
Date: ${bookingData.date}
Time: ${bookingData.timeSlot}
Instructor: ${bookingData.instructor}

💰 PRICING: Our Fee is All Inclusive
📚 Includes: FREE Learner's Manual

🕐 OPERATING HOURS:
Mon-Fri: 7:00 AM - 7:00 PM
Saturday: 8:00 AM - 5:00 PM
Sunday: Available Upon Request

${bookingData.specialRequests ? `📝 Special Requests: ${bookingData.specialRequests}` : ""}

Please confirm this booking and contact the student promptly.

#FiveStarDriving #NewBooking #DrivingSchool`

    return message
  }

  static sendToMultipleNumbers(message: string, numbers: string[]): void {
    numbers.forEach((number, index) => {
      const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`

      // Stagger the opening of WhatsApp links to avoid browser blocking
      setTimeout(() => {
        window.open(whatsappUrl, "_blank")
      }, index * 1000)
    })
  }

  static sendBookingNotification(bookingData: any, branchWhatsApp: string): void {
    const message = this.formatBookingMessage(bookingData)
    const numbers = [
      branchWhatsApp,
      "254794478773", // Main office
    ]

    this.sendToMultipleNumbers(message, numbers)
  }

  static generateBookingConfirmationMessage(bookingData: any): string {
    return `✅ BOOKING CONFIRMED - FIVE ST★R DRIVING SCHOOL

Dear ${bookingData.personalInfo.name},

Your booking has been confirmed!

📋 Reference: ${bookingData.reference}
🎓 Course: ${bookingData.course}
📍 Branch: ${bookingData.branch}
📅 Date: ${bookingData.date}
⏰ Time: ${bookingData.timeSlot}
👨‍🏫 Instructor: ${bookingData.instructor}

💰 Our Fee is All Inclusive
📚 Includes FREE Learner's Manual

📞 Branch Contact: ${bookingData.branchPhone}

We look forward to helping you master the road!

FIVE ST★R Driving School
"Driving Is Fun, Driving Is Freedom"`
  }
}

export default WhatsAppService
