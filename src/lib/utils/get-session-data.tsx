import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export async function getSessionData() {
  const session = await auth()
  if (!session) redirect('/signin')
  const userId = session.user.id
  const userName = session.user?.name ?? undefined
  const userEmail = session.user?.email ?? undefined
  return { userId, userName, userEmail }
}
