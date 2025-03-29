'use client'

import { Btn } from '@/ui/dashboard/edit/btn'
import { useFormStatus } from 'react-dom'

export default function BtnWithUseFormStatus() {
  const { pending } = useFormStatus()

  return <Btn disabled={pending} />
}
