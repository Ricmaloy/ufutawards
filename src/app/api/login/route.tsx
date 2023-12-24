import { auth } from 'firebase-admin'
import { customInitApp } from '@/lib/admin'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Init the Firebase SDK every time the server is called
customInitApp()

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get('Authorization')

  console.log(authorization)

  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1]

    const decodedToken = await auth().verifyIdToken(idToken)

    if (decodedToken) {
      // Generate session cookie

      const expiresIn = 1000 * 60 * 5 // 5 days
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      })

      const options = {
        name: 'session',
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      }

      // Add the cookie to the browser
      cookies().set(options)
    }
  }

  return NextResponse.json({}, { status: 200 })
}

export async function GET(request: NextRequest) {
  const session = cookies().get('session')?.value

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 })
  }

  const decodedClaims = await auth().verifySessionCookie(session, true)

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 })
  }

  return NextResponse.json({ isLogged: true }, { status: 200 })
}
