/** @type {import('next').NextConfig} */
// Trigger rebuild - Testing Cloud Run deployment with new service account
const nextConfig = {
  // Output configuration based on the environment
  output: process.env.GITHUB_ACTIONS ? 'export' : 'standalone',
  
  // Base path for GitHub Pages (your repository name)
  basePath: process.env.GITHUB_ACTIONS ? '/loganszeto' : '',

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

  // CORS headers only for Cloud Run (not for static export)
  ...(process.env.GITHUB_ACTIONS ? {} : {
    async headers() {
      return [
        {
          source: '/api/health/sync',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
            { key: 'Access-Control-Max-Age', value: '86400' },
          ],
        },
      ];
    }
  }),

  experimental: {
    serverActions: {
      enabled: true,
    },
    // Enable large payload support
    largePageDataBytes: 128 * 1024 * 1024, // 128MB
  },

  env: {
    MONGODB_URI: process.env.MONGODB_URI, // allows static injection if needed
  },
};

export default nextConfig; 