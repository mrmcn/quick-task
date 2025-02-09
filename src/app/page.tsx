import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <nav>
        <div>
          <Link href='/dashboard'>dashboard</Link>
        </div>
        <div>
          <Link href='/sample'>sample</Link>
        </div>
        <div>
          <Link href='/signin'>login</Link>
        </div>
      </nav>
    </>
  )
}
