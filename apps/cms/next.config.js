import { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kawthar.app',
      },
      {
        protocol: 'https',
        hostname: 'www.kawthar.app',
      },
    ],
  },
}

export default withPayload(nextConfig)
