import { auth } from '@/auth'
import { fetchStatusMonitoringData } from '@/lib/data'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()
  if (session === null) return redirect('/signin')
  const authorId = session.user.id
  const { completed, pending, progress } = await fetchStatusMonitoringData(
    authorId,
  )

  return (
    <>
      <h1>Dashboard page</h1>
      <nav>
        <div>
          <Link href='/'>home</Link>
        </div>
        <div>
          <Link href='/sample'>sample</Link>
        </div>
        <div>
          <Link href='/signin'>login</Link>
        </div>
      </nav>
      <div>
        <h1>Hi, {session?.user.name}.</h1>
        <p>You id: {session?.user.id}</p>
        {completed} {pending} {progress}
      </div>
    </>
  )
}
