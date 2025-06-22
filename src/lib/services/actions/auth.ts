'use server'

import { signIn, signOut } from '@/auth'
import { PAGES } from '@/lib/constants/url'
import { handleError, HandleErrorProps } from '@/lib/utils/error-handling'
import { ActionProps, StateProps } from './types'

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
