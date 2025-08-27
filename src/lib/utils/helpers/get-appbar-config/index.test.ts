import { PAGES } from '@/lib/constants/routes'
import { testPrismaSelectName, testUser } from '@/lib/constants/test-const'
import { BtnNamesList } from '@/lib/constants/text-const'
import { fetchUser } from '@/lib/services/queries/user/fetchUser'
import { mockedAuth } from '@/lib/test-mocks/auth'
import { getAppBarConfig } from '@/lib/utils/helpers/get-appbar-config'

jest.mock('@/lib/services/queries/user/fetchUser')

const testAuthenticatedConfig = {
  secondBtnUrl: PAGES.USER, // URL for the user cabinet page.
  secondBtnText: testUser, // Button text: user's name.
  secondBtnAriaLabel: 'Go to user cabinet', // Accessibility attribute.
}
const testUnauthenticatedConfig = {
  secondBtnUrl: PAGES.SIGNIN, // URL for the sign-in page.
  secondBtnText: BtnNamesList.signin, // Button text: "Sign In".
  secondBtnAriaLabel: 'Go to sign in', // Accessibility attribute.
}

describe('getAppBarConfig', () => {
  test('when the user is authenticated', async () => {
    await expect(getAppBarConfig()).resolves.toEqual(testAuthenticatedConfig)
    expect(fetchUser.uniqueData).toHaveBeenCalledWith(testPrismaSelectName)
  })

  test('when the user is not authenticated', async () => {
    mockedAuth.mockResolvedValueOnce(null)
    await expect(getAppBarConfig()).resolves.toEqual(testUnauthenticatedConfig)
  })
})
