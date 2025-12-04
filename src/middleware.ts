import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from 'next-firebase-auth-edge'
import { authConfig } from './config/server-config'

const PUBLIC_PATHS = ['/register', '/login', '/reset-password']

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/src/api/login',
    logoutPath: '/src/api/logout',
    refreshTokenPath: '/src/api/refresh-token',
    debug: authConfig.debug,
    enableMultipleCookies: authConfig.enableMultipleCookies,
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
    experimental_enableTokenRefreshOnExpiredKidHeader:
      authConfig.experimental_enableTokenRefreshOnExpiredKidHeader,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleValidToken: async ({ token, decodedToken, customToken }, headers) => {
      // Authenticated user should not be able to access /login, /register and /reset-password routes
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request)
      }

      return NextResponse.next({
        request: {
          headers,
        },
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleInvalidToken: async (_reason) => {
      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS,
      })
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error })

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS,
      })
    },
  })
}

export const config = {
  matcher: [
    '/',
    '/((?!_next|favicon.ico|__/auth|__/firebase|api|.*\\.).*)',
    '/src/api/login',
    '/src/api/logout',
    '/src/api/refresh-token',
  ],
}
