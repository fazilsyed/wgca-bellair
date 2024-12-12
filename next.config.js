/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this configuration
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
    ]
  }
}

module.exports = nextConfig 