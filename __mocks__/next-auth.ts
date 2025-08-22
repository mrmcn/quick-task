import { testEmail, testUserId } from '@/lib/constants/test-const'
import { Session } from 'next-auth'

export const testSession: Session = {
  user: {
    id: testUserId,
    email: testEmail,
  },
  expires: '1',
}

const NextAuth = jest.fn(() => ({
  auth: jest.fn().mockResolvedValue(testSession),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

export default NextAuth
