/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the crucial line to add
  output: 'export',

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
};

export default nextConfig; 