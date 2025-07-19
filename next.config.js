/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eu-west-2.graphassets.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'graphassets.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // This fixes the "Cannot read properties of null (reading 'useContext')" error
  // by completely disabling static generation
  // output: 'export',
  // Use export mode to generate static HTML
  // Disable static optimization for server components
  // staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;