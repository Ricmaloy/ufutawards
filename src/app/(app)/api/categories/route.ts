// import { getFirebaseApp } from '@/app/auth/firebase'
import { authConfig } from '@/config/server-config'
// import { getFirestore } from 'firebase/firestore'
import { getFirebaseAuth, getTokens } from 'next-firebase-auth-edge'
import { refreshNextResponseCookies } from 'next-firebase-auth-edge/lib/next/cookies'
import { NextRequest, NextResponse } from 'next/server'

const auth = getFirebaseAuth({
  serviceAccount: authConfig.serviceAccount,
  apiKey: authConfig.apiKey,
})

export async function POST(request: NextRequest) {
  const tokens = await getTokens(request.cookies, authConfig)

  if (!tokens) {
    throw new Error('Cannot vote of unauthenticated user')
  }

  // const db = getFirestore(getFirebaseApp())
  // const snapshot = await db.collection('')

  const user = await auth.getUser(tokens.decodedToken.uid)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const response = new NextResponse(
    JSON.stringify({
      user,
    }),
    {
      status: 200,
      headers,
    },
  )

  return refreshNextResponseCookies(request, response, authConfig)
}
