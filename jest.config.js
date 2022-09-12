const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: '.',
  coverageThreshold: {
    '<rootdir>/src/': {
      functions: 50,
      branches: 40,
      statements: 40,
    },
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/test-utils',
    '!**/stories/**',
  ],
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/src/mocks/singleton.ts'],
  resolver: `<rootDir>/resolver.js`,
  moduleNameMapper: {
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@components/(.*)$': '<rootDir>/src/common/components/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@views/(.*)$': '<rootDir>/src/views/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/test-utils',
    '!**/stories/**',
    '!**/mocks/**',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const asyncConfig = createJestConfig(customJestConfig);
module.exports = async () => {
  const config = await asyncConfig();
  config.transformIgnorePatterns = ['<rootDir>/node_modules/(?!nanoid)/'];
  return config;
};
