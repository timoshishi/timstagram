module.exports = ({ config }) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'next/future/image$': 'next/image',
        // styles: path.resolve(__dirname, '../src/lib/'),
      },
    },
  };
};
