/** @type {import('next').NextConfig} */
const nextConfig = {
  // Needed for `signInWithRedirect` and custom `authDomain` configuration. See https://firebase.google.com/docs/auth/web/redirect-best-practices#proxy-requests
  // If you don't plan to use `signInWithRedirect` or custom `authDomain`, you can safely remove `rewrites` config.
  async rewrites() {
    return [
      {
        source: '/__/src/auth',
        destination: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth`,
      },
      {
        source: '/__/src/auth/:path*',
        destination: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth/:path*`,
      },
      {
        source: '/__/src/firebase/init.json',
        destination: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com/__/firebase/init.json`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  env: {
    VERCEL: process.env.VERCEL,
  },
}

module.exports = nextConfig
