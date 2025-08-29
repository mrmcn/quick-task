import { auth } from '@/auth'
import { PAGES } from '@/lib/constants/routes'
import { BtnNamesList, ErrorList } from '@/lib/constants/text-const'
import { fetchUser } from '@/lib/services/queries/user/fetchUser'

export const unauthenticatedConfig = {
  secondBtnUrl: PAGES.SIGNIN, // URL for the sign-in page.
  secondBtnText: BtnNamesList.signin, // Button text: "Sign In".
  secondBtnAriaLabel: 'Go to sign in', // Accessibility attribute.
}

export const authenticatedConfig = (userName: string) => {
  return {
    secondBtnUrl: PAGES.USER, // URL for the user cabinet page.
    secondBtnText: userName, // Button text: user's name.
    secondBtnAriaLabel: 'Go to user cabinet', // Accessibility attribute.
  }
}

/**
 * @function getAppBarConfig
 * @description An asynchronous helper function that determines the appbar button configuration
 * based on the current user session.
 *
 * @returns A configuration object with URLs and text/aria labels for the appbar buttons.
 */
export async function getAppBarConfig() {
  const session = await auth()

  if (session) {
    const { data } = await fetchUser.uniqueData({ name: true })
    const userName = data?.name ?? ErrorList.failed

    return authenticatedConfig(userName)
  }

  return unauthenticatedConfig
}
