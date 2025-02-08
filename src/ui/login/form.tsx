'use client'

import { authenticate } from '@/lib/actions'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  )

  return (
    <>
      <h1>Login page</h1>
      <nav>
        <div>
          <Link href='/'>home</Link>
        </div>
        <div>
          <Link href='/sample'>sample</Link>
        </div>
        <div>
          <Link href='/dashboard'>dashboard</Link>
        </div>
      </nav>
      <form action={formAction}>
        <h1>Please log in to continue.</h1>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          placeholder='Enter your email address'
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          name='password'
          placeholder='Enter password'
          required
          minLength={6}
        />
        <input
          type='hidden'
          name='redirectTo'
          value={callbackUrl}
        />
        <button aria-disabled={isPending}>Sign in</button>
        <div
          aria-live='polite'
          aria-atomic='true'
        >
          {errorMessage && (
            <>
              <p>{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </>
  )
}
