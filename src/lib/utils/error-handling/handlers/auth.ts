import { HandleError } from '@/lib/utils/error-handling/type'
import { AuthError } from 'next-auth'

export function handleAuthError(error: AuthError): HandleError {
  switch (error.type) {
    case 'CredentialsSignin':
      return {
        type: 'authenticate',
        message: 'Invalid credentials.',
        details: undefined,
      }
    default:
      return {
        type: 'authenticate',
        message: 'Something went wrong.',
        details: undefined,
      }
  }
}
