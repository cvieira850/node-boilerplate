
module.exports = {
  rootDir: './',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!**/test/**',
    '!<rootDir>/src/main/**',
    // '!<rootDir>/src/domain/**',
    '!<rootDir>/src/infra/db/pg/typeorm/**'
  ],
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/src/main/config/env.ts'],
  testEnvironment: 'node',
  transform: {
    '.*\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
