/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the crucial line to add
  output: 'standalone',

  // Other configurations like reactStrictMode might be here
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  typescript: {
    // During development, type errors won't fail the build
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true
  },

  // Bypass authentication for the health sync endpoint
  async headers() {
    return [
      {
        source: '/api/health/sync',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default nextConfig; 