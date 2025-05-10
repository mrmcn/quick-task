'use client'

import { ListFormNamesProps } from '@/lib/constants/text-const'
import { ActionProps, StateProps } from '@/lib/services/actions/user'
import RenderErrors from '@/ui/common/forms/render-errors'
import { useActionState } from 'react'

export default function FormWrapperUsesActionStateAndRendersErrors({
  action,
  renderWrappedComponent,
}: FormWrapperWithActionProps) {
  const [state, formAction, isPending] = useActionState(action, undefined)
  const wrappedComponent = renderWrappedComponent({ isPending })

  return (
    <form action={formAction}>
      {wrappedComponent}
      <RenderErrors state={state} />
    </form>
  )
}

interface FormWrapperWithActionProps {
  action: ActionProps<StateProps>
  renderWrappedComponent: (
    props: RenderWrappedComponentProps,
  ) => React.ReactNode
}

export interface RenderWrappedComponentProps {
  isPending: boolean
}

export interface FormProps {
  formName?: ListFormNamesProps
}
