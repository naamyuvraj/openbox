/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  // ⭐ IMPORTANT: Increase body upload limit for API + Server Actions
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',   // Increase limit from 1 MB → 50 MB
    },
  },

  api: {
    bodyParser: {
      sizeLimit: '50mb',       // API routes can now accept large uploads
    },
  },
};

export default nextConfig;
