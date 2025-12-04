import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { authConfig } from '../../../config/server-config'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  const tokens = await getTokens(await cookies(), authConfig)

  if (!tokens) {
    throw new Error('Unauthenticated')
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const response = new NextResponse(
    JSON.stringify({
      tokens,
    }),
    {
      status: 200,
      headers,
    },
  )

  return response
}
