import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // 1. Force HTTPS (belt-and-suspenders alongside Vercel)
  if (
    request.headers.get('x-forwarded-proto') === 'http' &&
    process.env.NODE_ENV === 'production'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    )
  }

  // 2. Block path traversal attempts
  const pathname = request.nextUrl.pathname
  if (pathname.includes('..') || pathname.includes('%2e%2e')) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // 3. Add security headers for runtime-dependent values
  response.headers.set('X-Request-ID', crypto.randomUUID())

  return response
}

export const config = {
  matcher: [
    // Apply to all routes except static assets and _next internals
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}
