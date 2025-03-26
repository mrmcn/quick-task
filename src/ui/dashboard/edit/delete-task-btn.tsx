'use client'

import { Btn } from '@/ui/dashboard/edit/btn'
import { useFormStatus } from 'react-dom'

export default function BtnWithPending() {
  const { pending } = useFormStatus()

  return <Btn disabled={pending} />
}
