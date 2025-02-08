import LoginForm from '@/ui/login/form'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
