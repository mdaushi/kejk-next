/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["imgix.cosmicjs.com"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  async redirects() {
    return [
      {
        source: "/thoughts",
        destination: "/writing",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
