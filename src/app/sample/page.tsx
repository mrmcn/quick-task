import Link from 'next/link'

export default function Sample() {
  return (
    <>
      <h1>Sample page</h1>
      <nav>
        <div>
          <Link href='/'>home</Link>
        </div>
        <div>
          <Link href='/login'>login</Link>
        </div>
        <div>
          <Link href='/dashboard'>dashboard</Link>
        </div>
      </nav>
    </>
  )
}
