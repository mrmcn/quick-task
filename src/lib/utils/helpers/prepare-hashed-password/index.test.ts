import {
  testPasswords,
  testResponseFetchErrorDB,
  testUserId,
} from '@/lib/constants/test-const'
import { mockedFetchUserUniqueData } from '@/lib/test-mocks/fetch-user-unique-data'
import { prepareHashedPassword } from '@/lib/utils/helpers/prepare-hashed-password'
import { testHashedPassword } from '@/lib/utils/helpers/verify-and-hash-password/__mocks__/makePassword'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

jest.mock('@/lib/services/queries/user/fetchUser')
jest.mock('@/lib/utils/helpers/verify-and-hash-password/makePassword')

describe('prepareHashedPassword', () => {
  test('user password retrieved from DB', async () => {
    await expect(
      prepareHashedPassword(testPasswords, testUserId),
    ).resolves.toBe(testHashedPassword)
  })
  test('error received from DB', async () => {
    mockedFetchUserUniqueData.mockResolvedValueOnce(testResponseFetchErrorDB)
    await expect(
      prepareHashedPassword(testPasswords, testUserId),
    ).rejects.toBeInstanceOf(PrismaClientKnownRequestError)
  })
})
