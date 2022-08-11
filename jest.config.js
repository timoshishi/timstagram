const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
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
  // transformIgnorePatterns: ['<rootDir>/node_modules/(?!@supabase)'],
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // transformIgnorePatterns: ['<rootDir>/node_modules/(?!@supabase)'],
  // transformIgnorePatterns: ['<rootDir>/node_modules/(?!)'],

  // preset: 'ts-jest/presets/js-with-ts',
  // testEnvironment: 'jsdom',
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
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const asyncConfig = createJestConfig(customJestConfig);
module.exports = async () => {
  const config = await asyncConfig();
  config.transformIgnorePatterns = ['<rootDir>/node_modules/(?!@supabase)'];
  return config;
};
