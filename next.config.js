/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fazestore.online"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
