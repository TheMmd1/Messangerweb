/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  distDir: 'out',   // Optional: makes output go to "out" folder
  images: {
    unoptimized: true, // Required if you're using Next.js <14 image optimization
  },
  trailingSlash: true, // Often necessary for GitHub Pages routing to work
  basePath: '/Messangerweb', // Your repo name
  assetPrefix: '/Messangerweb', // Needed for correct static file paths
};

export default nextConfig;
