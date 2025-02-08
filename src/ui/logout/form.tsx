import { signOut } from '@/auth'

export function LogOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button type='submit'>Sign Out</button>
    </form>
  )
}
