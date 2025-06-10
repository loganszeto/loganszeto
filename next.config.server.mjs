/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

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