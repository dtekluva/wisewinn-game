/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleNameMapper: {
    // '^@/(.*)$': '<rootDir>/src/$1',
    '^@uiball/loaders$': require.resolve('@uiball/loaders'),
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  //   transformIgnorePatterns: ['/node_modules/(?!@uiball/loaders)'],
};

module.exports = createJestConfig(customJestConfig);
