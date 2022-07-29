/**
 * @type {import('next/config').NextConfig}
 */
const nextConfig = {
  experimental: {
    images: { allowFutureImage: true },
  },
  images: {
    domains: ['picsum.photos'],
  },
  eslint: {
    ignoreBuildErrors: true,
    dirs: ['src'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
