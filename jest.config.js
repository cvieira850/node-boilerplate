
module.exports = {
  rootDir: './',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/infra/db/pg/typeorm/**'
  ],
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/src/main/config/env.ts'],
  testEnvironment: 'node',
  transform: {
    '.*\\.ts$': 'ts-jest'
  }
}
