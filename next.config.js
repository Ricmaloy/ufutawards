/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'github.com' },
      { hostname: 'lh3.googleusercontent.com' },
    ],
  },
}

module.exports = nextConfig
