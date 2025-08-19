import { mockBadResponses, testError, testId } from '@/lib/constants/test-const'
import { fetchUser } from '@/lib/services/queries/user/fetchUser'
import { prepareHashedPassword } from '@/lib/utils/helpers/prepare-hashed-password'
import { testHashedPassword } from '@/lib/utils/helpers/verify-and-hash-password/__mocks__/makePassword'
import { CurrentAndNewPassword } from '@/lib/utils/types'

jest.mock('@/lib/services/queries/user/fetchUser')
jest.mock('@/lib/utils/helpers/verify-and-hash-password/makePassword')

const passwords: CurrentAndNewPassword = {
  currentPassword: 'testCurrentPassword',
  newPassword: 'testNewPassword',
}

describe('prepareHashedPassword', () => {
  test('user password retrieved from DB', async () => {
    await expect(prepareHashedPassword(passwords, testId)).resolves.toBe(
      testHashedPassword,
    )
  })
  test('error received from DB', async () => {
    jest
      .mocked(fetchUser.uniqueData)
      .mockResolvedValueOnce(mockBadResponses.errorDB)
    await expect(prepareHashedPassword(passwords, testId)).rejects.toThrow(
      testError,
    )
  })
})
