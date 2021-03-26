
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/infra/validators/**',
    '!<rootDir>/src/infra/bd/postgresql/typeorm/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.*\\.ts$': 'ts-jest'
  }
}
