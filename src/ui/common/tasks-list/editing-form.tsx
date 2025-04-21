'use client'

import { ActionProps, StateProps } from '@/lib/services/actions/user'
import { useActionState } from 'react'
import RenderErrors from '../form-action-state/form-wrapper/render-errors'

export default function EditForm({
  children,
  action,
}: FormWrapperWithActionProps) {
  const [state, formAction] = useActionState(action, undefined)

  return (
    <form action={formAction}>
      {children}
      <RenderErrors state={state} />
    </form>
  )
}

interface FormWrapperWithActionProps {
  action: ActionProps<StateProps>
  children: React.ReactNode
}
