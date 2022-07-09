const nextConfig = {
  eslint: {
    ignoreBuildErrors: true,
    dirs: ['src'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
