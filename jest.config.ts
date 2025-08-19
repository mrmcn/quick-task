import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^next-auth$': '<rootDir>/__mocks__/next-auth.ts',
    '^next-auth/jwt$': '<rootDir>/__mocks__/next-auth/jwt.ts',
    '^@auth/core/jwt$': '<rootDir>/__mocks__/@auth/core/jwt.ts',
    '^next-auth/providers/credentials$':
      '<rootDir>/__mocks__/@auth/core/providers/credentials.ts',
    '^@/auth$': '<rootDir>/__mocks__/auth.ts',
    '^next-auth/providers/(.*)$':
      '<rootDir>/__mocks__/next-auth/providers/$1.ts',
  },
}

export default createJestConfig(config)
