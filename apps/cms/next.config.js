/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['payload'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        child_process: false,
        worker_threads: false,
        dns: false,
        tls: false,
        readline: false,
        module: false,
        'node-fetch': false,
        sharp: false,
      }
    }

    // Handle binary files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    })

    return config
  },
  // Use pages directory instead of app directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig
