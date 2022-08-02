const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
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
  moduleNameMapper: moduleNames,
  testEnvironment: 'jest-environment-jsdom',
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
