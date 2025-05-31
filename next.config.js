/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: false },
  // This fixes the "Cannot read properties of null (reading 'useContext')" error
  // by completely disabling static generation
  output: 'export',  // Use export mode to generate static HTML
  // Disable static optimization for server components
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
