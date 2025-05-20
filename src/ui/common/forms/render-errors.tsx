import { ListError } from '@/lib/constants/text-const'
import { StateProps } from '@/lib/services/actions/user'
import { HandleErrorProps, ZodErrors } from '@/lib/utils/error-handling'
import Typography from '@mui/material/Typography'
import { nanoid } from 'nanoid'

export default function RenderErrors({ state }: { state: StateProps }) {
  if (state?.status === 'error') {
    if (state.error.type === 'zodValidation') {
      return renderZodErrors(state.error.details)
    }
    if (state.error.type === 'validation')
      return renderValidationErrors(state.error.message)
  }
  return null
}

function renderZodErrors(details: ZodErrors) {
  const listErrors = Object.entries(details).map(([key, value]) => (
    <ValidationErrorMessage
      key={nanoid()}
      nameField={key}
      value={value}
    />
  ))
  return <>{listErrors}</>
}

function renderValidationErrors(message: HandleErrorProps['message']) {
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

function ValidationErrorMessage({ nameField, value }: ErrorMessageProps) {
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
