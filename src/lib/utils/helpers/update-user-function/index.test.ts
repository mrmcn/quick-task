import { PAGES } from '@/lib/constants/routes'
import { testEmail, testUserId } from '@/lib/constants/test-const'
import { userRepository } from '@/lib/repositories/prisma/user/user'
import { updateUserFunction } from '@/lib/utils/helpers/update-user-function'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

jest.mock('@/lib/utils/helpers/get-session-data/session')
jest.mock('@/lib/repositories/prisma/user/user')

const testValidateData: Partial<User> = { email: testEmail }
const { action } = updateUserFunction

describe('updateUserFunction', () => {
  test('should invoke userRepository.updateUser when action is called', async () => {
    await expect(action(testValidateData)).resolves.toBeUndefined()
    expect(userRepository.updateUser).toHaveBeenCalledWith(
      { id: testUserId },
      testValidateData,
    )
  })
  test('should revalidate user path and redirect to user page when updateAndRedirect is called', async () => {
    await updateUserFunction.updateAndRedirect()
    expect(revalidatePath).toHaveBeenCalledWith(PAGES.USER)
    expect(redirect).toHaveBeenCalledWith(PAGES.USER)
  })
})
