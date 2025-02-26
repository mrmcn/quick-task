import { auth } from '@/auth'
import fetchUserData from '@/lib/data'
import UsernameEditingForm from '@/ui/user/name-editing-form'
import { redirect } from 'next/navigation'

export default async function EditUsername() {
  const session = await auth()
  if (!session) redirect('/')
  const userData = await fetchUserData()
  const userName = userData.name ?? 'User'

  return <UsernameEditingForm userName={userName} />
}
