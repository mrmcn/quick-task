import { testEmail, testId } from '@/lib/constants/test-const'
import { Session } from 'next-auth'

export const testSession: Session = {
  user: {
    id: testId,
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
