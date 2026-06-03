import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Input schema — allowlist validation
const InquirySchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s'-]+$/, 'Invalid name format'),
  phone: z.string().regex(/^(\+254|0)[17]\d{8}$/, 'Invalid Kenyan phone number'),
  email: z.string().email().max(254).optional(),
  course: z.enum(['A2', 'A3', 'B1', 'B2', 'C', 'D', 'E', 'combined']),
  message: z.string().max(500).optional(),
})

// Simple in-memory rate limiter (use Upstash Redis for production scaling)
const rateLimitMap = new Map<string, { count: number; reset: number }>()

function rateLimit(ip: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + windowMs })
    return true // allowed
  }
  if (entry.count >= limit) return false // blocked
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  // 1. Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // 2. Validate Content-Type
  const contentType = req.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  // 3. Parse & validate body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = InquirySchema.safeParse(body)
  if (!result.success) {
    // Generic error — don't leak validation details
    return NextResponse.json({ error: 'Invalid submission' }, { status: 422 })
  }

  // 4. Process inquiry (send to CRM / email backend)
  // TODO: Implement your backend integration here
  // await sendInquiryToBackend(result.data)

  return NextResponse.json(
    { 
      success: true, 
      message: 'Thank you for your inquiry. We will contact you soon.' 
    },
    { status: 200 }
  )
}

// Disable GET on this endpoint
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
