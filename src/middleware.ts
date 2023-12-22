import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get('session')
  const { pathname, origin } = request.nextUrl

  console.log({ session, pathname, origin })

  if (request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  // Return to /login if don't have a session
  // if (!session && pathname !== '/login') {
  //   console.log('sem session ou diferente de login')

  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // // Call the authentication
  // if (session) {
  //   const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
  //     headers: {
  //       Cookie: `session=${session?.value}`,
  //     },
  //   })

  //   // Return to /login if token is not authorized
  //   if (responseAPI.status !== 200) {
  //     return NextResponse.redirect(new URL('/login', request.url))
  //   }

  //   return NextResponse.next()
  // }
}

// Add your protected routes
export const config = {
  matcher: ['/:path*'],
}
