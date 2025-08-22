import { testPassword, testPasswords } from '@/lib/constants/test-const'
import { ValidationError } from '@/lib/utils/errors/validation-error'
import { testHashedPassword } from '@/lib/utils/helpers/verify-and-hash-password/__mocks__/makePassword'
import { verifyAndHashPassword } from '@/lib/utils/helpers/verify-and-hash-password/makePassword'
import { MockCompare, MockHash } from '@/lib/utils/types'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}))

const testValidateError: ValidationError = {
  message: 'The current password entered is incorrect.',
  type: 'validation',
}

describe('verifyAndHashPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return a new hashed password when the current password is valid', async () => {
    jest.mocked<MockCompare>(bcrypt.compare).mockResolvedValue(true)
    jest.mocked<MockHash>(bcrypt.hash).mockResolvedValue(testHashedPassword)

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
    jest.mocked<MockCompare>(bcrypt.compare).mockResolvedValue(false)

    await expect(
      verifyAndHashPassword(testPasswords, testPassword),
    ).rejects.toBeInstanceOf(ValidationError)
    await expect(
      verifyAndHashPassword(testPasswords, testPassword),
    ).rejects.toEqual(testValidateError)
  })
})
