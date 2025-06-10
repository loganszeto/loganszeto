/** @type {import('next').NextConfig} */
// Trigger rebuild - Testing Cloud Run deployment with new service account
const nextConfig = {
  // Output configuration based on the environment
  output: 'export',
  
  // Base path for GitHub Pages (your repository name)
  basePath: process.env.GITHUB_ACTIONS ? '/loganszeto' : '',

  // Asset prefix for GitHub Pages
  assetPrefix: process.env.GITHUB_ACTIONS ? '/loganszeto' : '',

  // Other configurations like reactStrictMode might be here
  reactStrictMode: true,

  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './app/image.ts',
  },

  trailingSlash: true,

  typescript: {
    // During development, type errors won't fail the build
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true
  },

  // CORS headers only for non-static deployment
  ...(process.env.GITHUB_ACTIONS ? {} : {
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
            { key: 'Access-Control-Max-Age', value: '86400' },
          ],
        },
      ];
    },
  }),

  experimental: {
    serverActions: {
      enabled: true,
    },
    // Enable large payload support
    largePageDataBytes: 128 * 1024 * 1024, // 128MB
  },

  // Configuration for static export
  ...(process.env.GITHUB_ACTIONS ? {
    distDir: '.next',
    cleanDistDir: true,
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
    optimizeFonts: true,
    swcMinify: true,
    compiler: {
      removeConsole: false,
    },
    webpack: (config) => {
      config.resolve.fallback = { fs: false, path: false };
      return config;
    },
  } : {
    generateEtags: false,
    poweredByHeader: false,
    compress: true,
  }),

  env: {
    MONGODB_URI: process.env.MONGODB_URI, // allows static injection if needed
  },

  // Exclude API routes from static export
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/posts': { page: '/posts' },
      '/data': { page: '/data' }
    };
  }
};

export default nextConfig; 