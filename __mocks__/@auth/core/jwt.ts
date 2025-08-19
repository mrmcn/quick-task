import { jest } from '@jest/globals'

export const getToken = jest.fn(() => ({
  name: 'Test User',
  email: 'test@example.com',
  sub: '123',
}))
