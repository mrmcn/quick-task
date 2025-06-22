import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export async function getSessionData() {
  const session = await auth()

  if (!session?.user) {
    redirect('/signin')
  }

  const { id, email } = session.user
  return {
    userId: id,
    userEmail: email,
  }
}
