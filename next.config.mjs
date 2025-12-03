/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out for dev server - uncomment for static export builds
  
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true
  },

  experimental: {
    largePageDataBytes: 128 * 1024 * 1024, // 128MB
  },

  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;