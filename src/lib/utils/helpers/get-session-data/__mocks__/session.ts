import { testEmail, testUserId } from '@/lib/constants/test-const'
import { AuthData } from '@/lib/utils/types'

export const expectedAuthData: AuthData = {
  userId: testUserId,
  userEmail: testEmail,
}

export const getSessionData = jest.fn().mockResolvedValue(expectedAuthData)
