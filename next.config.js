const nextConfig = {
  experimental: {
    images: { allowFutureImage: true },
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
