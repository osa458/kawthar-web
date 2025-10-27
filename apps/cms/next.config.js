const { withPayload } = require('@payloadcms/next/withPayload')

const nextConfig = {
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

module.exports = withPayload(nextConfig)
