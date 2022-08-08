const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: '.',
  coverageThreshold: {
    // global: {
    // branches: 50,
    // lines: 50,
    // statements: 50,
    // },
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
  // coveragePathIgnorePatterns: [' /test-utils.tsx'],
});

const moduleNames = {
  '^@common/(.*)$': '<rootDir>/src/common/$1',
  '^@components/(.*)$': '<rootDir>/src/common/components/$1',
  '^@types/(.*)$': '<rootDir>/src/types/$1',
  '^@views/(.*)$': '<rootDir>/src/views/$1',
  '^@api/(.*)$': '<rootDir>/src/api/$1',
  '^@src/(.*)$': '<rootDir>/src/$1',
};

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // coveragePathIgnorePatterns: ['<rootdir>/src/test-utils.tsx'],
  moduleNameMapper: moduleNames,
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
module.exports = createJestConfig(customJestConfig);

// {
// '@pages/*': [ '@pages/*/<rootDir>/./src/pages/*' ],
// '@common/*': [ '@common/*/<rootDir>/./src/common/*' ],
// '@components/*': [ '@components/*/<rootDir>/./src/common/components/*' ],
// 'types/*': [ 'types/*/<rootDir>/./src/types/*' ],
// '@views/*': [ '@views/*/<rootDir>/./src/views/*' ],
// '@base': [ '@base/<rootDir>/.' ],
// '@api/*': [ '@api/*/<rootDir>/src/api/*' ],
// '@src/*': [ '@src/*/<rootDir>/./src/*' ]
// }
