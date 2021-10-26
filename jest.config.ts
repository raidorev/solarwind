export default {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts,vue}', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    // lodash-es requires ESM configuration, I have not figured out how to interface ts-jest with this
    '^lodash-es$': 'lodash',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec).[tj]s?(x)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
}
