import { auth } from '@/auth'
import Link from 'next/link'

export default async function Dashboard() {
  const session = await auth()

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
      </div>
    </>
  )
}
