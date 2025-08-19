import { testEmail } from '@/lib/constants/test-const'
import { userRepository } from '@/lib/repositories/prisma/user/user'
import { updateUserFunction } from '@/lib/utils/helpers/update-user-function'
import { User } from '@prisma/client'

jest.mock('@/lib/utils/helpers/get-session-data/session')
jest.mock('@/lib/repositories/prisma/user/user')

const tetsValidateData: Partial<User> = { email: testEmail }

describe('updateUserFunction', () => {
  test('action: confirms the invocation of taskRepository.updateTask', async () => {
    await updateUserFunction.action(tetsValidateData)
    expect(jest.mocked(userRepository.updateUser)).toHaveBeenCalled()
  })
})
