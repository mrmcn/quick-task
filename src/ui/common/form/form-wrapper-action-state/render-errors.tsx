import { ListError } from '@/lib/constants/text-const'
import { StateProps } from '@/lib/services/actions/user'
import { HandleErrorProps } from '@/lib/utils/error-handling'
import { ValidateErrorsProps } from '@/lib/zod/validate'
import Typography from '@mui/material/Typography'
import { nanoid } from 'nanoid'

export default function RenderErrors({ state }: { state: StateProps }) {
  if (state?.error) {
    if (state?.error.type === 'validation' && state.error.details)
      return renderValidationErrors(state.error.details as ValidateErrorsProps)
    if (state?.error.message) return renderErrorMessage(state.error.message)
  }
  return null
}

function renderValidationErrors(details: ValidateErrorsProps) {
  const listErrors = Object.entries(details).map(([key, value]) => (
    <ErrorMessage
      key={nanoid()}
      nameField={key}
      value={value}
    />
  ))
  return <>{listErrors}</>
}

function renderErrorMessage(message: HandleErrorProps['message']) {
  return (
    <Typography
      align='center'
      color='error'
      aria-live='polite'
      aria-atomic='true'
    >
      {message}
    </Typography>
  )
}

function ErrorMessage({ nameField, value }: ErrorMessageProps) {
  return (
    <Typography
      component='p'
      align='center'
      color='error'
      aria-live='polite'
      aria-atomic='true'
    >
      {ListError.errorInField}
      <Typography
        component='span'
        variant='subtitle1'
      >
        {` "${nameField}" `}:{' '}
      </Typography>
      {value.join(', ')}
    </Typography>
  )
}

interface ErrorMessageProps {
  nameField: string
  value: string[]
}
