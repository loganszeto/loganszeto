/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the crucial line to add
  output: 'export',

  // Other configurations like reactStrictMode might be here
  reactStrictMode: true,
};

export default nextConfig; 