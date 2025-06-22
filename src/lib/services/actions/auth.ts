'use server'

import { signIn, signOut } from '@/auth'
import { PAGES } from '@/lib/constants/routes'
import { ActionProps, StateProps } from '@/lib/services/actions/types'
import { handleError } from '@/lib/utils/error-handling'
import { HandleErrorProps } from '@/lib/utils/error-handling/type'

export const authenticate: ActionProps<StateProps> = async (
  state,
  formData,
) => {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    return { status: 'error', error: handleError(error as HandleErrorProps) }
  }
}

export async function signout() {
  await signOut({ redirectTo: PAGES.HOME })
}
