/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['newsapi.org', 'images.unsplash.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig

