import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { SIGNIN_URL } from '../constants/url'

export async function checkAuth() {
  const session = await auth()
  if (!session) return redirect(SIGNIN_URL)
  const { id, email, name } = session.user
  return { id, email, name }
}
