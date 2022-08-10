/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imgix.cosmicjs.com"],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  async redirects() {
    return [
      {
        source: '/thoughts',
        destination: '/writing',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
