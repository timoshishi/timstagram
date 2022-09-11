/**
 * @type {import('next/config').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['picsum.photos', 'witter-dev.s3.amazonaws.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['src'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
