import {
  testPassword,
  testPasswords,
  testValidateError,
} from '@/lib/constants/test-const'
import {
  mockedBcryptCompare,
  mockedBcryptHash,
} from '@/lib/test-mocked-function/bcrypt'
import { ValidationError } from '@/lib/utils/errors/validation-error'
import { testHashedPassword } from '@/lib/utils/helpers/verify-and-hash-password/__mocks__/makePassword'
import { verifyAndHashPassword } from '@/lib/utils/helpers/verify-and-hash-password/makePassword'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}))

describe('verifyAndHashPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return a new hashed password when the current password is valid', async () => {
    mockedBcryptCompare.mockResolvedValue(true)
    mockedBcryptHash.mockResolvedValue(testHashedPassword)

    await expect(
      verifyAndHashPassword(testPasswords, testPassword),
    ).resolves.toBe(testHashedPassword)
    expect(bcrypt.compare).toHaveBeenCalledWith(
      testPasswords.currentPassword,
      testPassword,
    )
    expect(bcrypt.hash).toHaveBeenCalledWith(testPasswords.newPassword, 10)
  })

  test('should throw a ValidationError when the current password is invalid', async () => {
    mockedBcryptCompare.mockResolvedValue(false)

    await expect(
      verifyAndHashPassword(testPasswords, testPassword),
    ).rejects.toBeInstanceOf(ValidationError)
    await expect(
      verifyAndHashPassword(testPasswords, testPassword),
    ).rejects.toEqual(testValidateError)
  })
})
