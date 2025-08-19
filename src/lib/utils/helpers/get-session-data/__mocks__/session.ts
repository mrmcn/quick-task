import { testEmail, testId } from '@/lib/constants/test-const'

export const expectedAuthData = {
  userId: testId,
  userEmail: testEmail,
}

export const getSessionData = jest.fn().mockResolvedValue(expectedAuthData)
