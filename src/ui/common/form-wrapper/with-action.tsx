'use client'

import { StateProps } from '@/lib/services/actions/user-service'
import { ValidateErrorsProps } from '@/lib/zod/validate'
import Typography from '@mui/material/Typography'
import { Fragment, useActionState } from 'react'
import FormWrapper from './with-fab'

export default function FormWrapperWithAction({
  action,
  children,
  ...props
}: FormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined)
  const validationErrorsRendering = renderValidationErrors(state)
  const otherPropsRendering = renderOtherErrors(state)

  return (
    <FormWrapper
      disabled={isPending}
      formAction={formAction}
      {...props}
    >
      {children}
      {validationErrorsRendering}
      {otherPropsRendering}
    </FormWrapper>
  )
}

function renderValidationErrors(state: StateProps) {
  if (state?.type === 'validation' && state.details) {
    return Object.entries(state.details as ValidateErrorsProps).map(
      ([key, value]) => (
        <Fragment key={key}>
          <Typography
            component='p'
            align='center'
            color='error'
            aria-live='polite'
            aria-atomic='true'
          >
            Error in field
            <Typography
              component='span'
              variant='subtitle1'
            >
              {` "${key}" `}:{' '}
            </Typography>
            {[...value]}
          </Typography>
        </Fragment>
      ),
    )
  }
}

function renderOtherErrors(state: StateProps) {
  if (state?.type !== 'validation' && state?.message)
    return (
      <Typography
        align='center'
        color='error'
        aria-live='polite'
        aria-atomic='true'
      >
        {state.message}
      </Typography>
    )
}

export interface FormProps {
  action: ActionProps<StateProps>
  name?: string
  value?: string
  formName: string
  children: React.ReactNode
}

export type ActionProps<T> = (state: T, formData: FormData) => Promise<T>
