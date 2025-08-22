import { PAGES } from '@/lib/constants/routes'
import { testEmail } from '@/lib/constants/test-const'
import { userRepository } from '@/lib/repositories/prisma/user/user'
import { updateUserFunction } from '@/lib/utils/helpers/update-user-function'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

jest.mock('@/lib/utils/helpers/get-session-data/session')
jest.mock('@/lib/repositories/prisma/user/user')

const tetsValidateData: Partial<User> = { email: testEmail }

describe('updateUserFunction', () => {
  test('should invoke userRepository.updateUser when action is called', async () => {
    await updateUserFunction.action(tetsValidateData)
    expect(jest.mocked(userRepository.updateUser)).toHaveBeenCalled()
  })
  test('should revalidate user path and redirect to user page when updateAndRedirect is called', async () => {
    await updateUserFunction.updateAndRedirect()
    expect(jest.mocked(revalidatePath)).toHaveBeenCalledWith(PAGES.USER)
    expect(jest.mocked(redirect)).toHaveBeenCalledWith(PAGES.USER)
  })
})
