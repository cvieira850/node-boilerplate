
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/infra/db/postgresql/typeorm/**'
  ],
  coverageDirectory: 'coverage',

  testEnvironment: 'node',
  transform: {
    '.*\\.ts$': 'ts-jest'
  }
}
