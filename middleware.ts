import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle blog image requests - redirect to 404 instead of treating as blog posts
  if (pathname.startsWith('/blog/') && 
      (pathname.endsWith('.jpg') || 
       pathname.endsWith('.jpeg') || 
       pathname.endsWith('.png') || 
       pathname.endsWith('.gif') || 
       pathname.endsWith('.webp') || 
       pathname.endsWith('.svg'))) {
    
    // Return a 404 response for image requests in blog path
    return new NextResponse(null, { status: 404 })
  }

  // Continue with normal request processing
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths starting with /blog/
    '/blog/:path*',
  ],
}