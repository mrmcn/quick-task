import SigninForm from '@/ui/signin/form'
import { Suspense } from 'react'

export default function SigninPage() {
  return (
    <Suspense>
      <SigninForm />
    </Suspense>
  )
}
