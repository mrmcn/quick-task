import { testEmail, testUserId } from '@/lib/constants/test-const'
import { AuthData } from '@/lib/utils/types'

export const expectedAuthData: AuthData = {
  id: testUserId,
  email: testEmail,
}

export const getSessionData = jest.fn().mockResolvedValue(expectedAuthData)
