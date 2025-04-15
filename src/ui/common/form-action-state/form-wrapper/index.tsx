'use client'

import { ListFormNamesProps } from '@/lib/constants/text-const'
import { ActionProps, StateProps } from '@/lib/services/actions/user'
import BackButton from '@/ui/common/form-action-state/form-wrapper/back-btn'
import Typography from '@mui/material/Typography'
import { useActionState } from 'react'
import FormContainer from './container'
import MyButton from './my-button'
import RenderErrors from './render-errors'

export default function FormWrapperActionState({
  action,
  children,
  formName,
  ...props
}: FormWrapperWithActionProps) {
  const [state, formAction, isPending] = useActionState(action, undefined)

  return (
    <form action={formAction}>
      <BackButton />
      <FormContainer>
        <Typography
          component='h1'
          variant='h4'
          align='center'
          gutterBottom
        >
          {formName}
        </Typography>
        {children}
        <RenderErrors state={state} />
        <MyButton
          formName={formName}
          disabled={isPending}
          {...props}
        />
      </FormContainer>
    </form>
  )
}

interface FormWrapperWithActionProps extends FormProps {
  action: ActionProps<StateProps>
  children: React.ReactNode
}

export interface FormProps {
  name?: RedirectNameProps // for redirect, component SigninForm app/signin/page.tsx
  value?: string // for redirect, component SigninForm app/signin/page.tsx
  formName?: ListFormNamesProps
}

export enum RedirectNameProps {
  signin = 'redirectTo',
}
