import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'http://localhost:3300/api/:path*',
        destination:
          'https://powerblock-backend-production.up.railway.app/api/:path*',
      },
    ]
  },
  images: {
    domains: [
      'localhost',
      'hiway-dev.s3.eu-north-1.amazonaws.com',
      'powerblock.s3.us-west-1.amazonaws.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'powerblock.s3.us-west-1.amazonaws.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            // value: 'http://localhost:3000',
            value: 'https://nalikes-powerblock-frontend.vercel.app',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, Cookie',
          },
        ],
      },
    ]
  },
}

export default nextConfig
