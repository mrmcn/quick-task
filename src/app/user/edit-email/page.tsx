import { auth } from '@/auth'
import fetchUserData from '@/lib/data'
import EmailEditingForm from '@/ui/user/email-editing-form'
import { redirect } from 'next/navigation'

export default async function EditEmail() {
  const session = await auth()
  if (!session) redirect('/')
  const userData = await fetchUserData()
  const email = userData.email

  return <EmailEditingForm email={email} />
}
