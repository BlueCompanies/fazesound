/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fazestore.online",
      },
    ],
  },

  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
