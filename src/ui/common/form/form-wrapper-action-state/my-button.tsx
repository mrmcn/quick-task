import {
  FormButtonName,
  FormName,
  FormNameProps,
} from '@/lib/constants/text-const'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import { FormProps } from '.'

export default function MyButton({ formName, ...props }: MyButtonProps) {
  const formHeader = formName ? getFormHeader(formName) : null

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '10vh',
      }}
    >
      <Fab
        component={Button}
        variant='extended'
        type='submit'
        color='primary'
        aria-label='add'
        sx={{
          width: '100%',
          maxWidth: '300px',
        }}
        {...props}
      >
        {formHeader}
      </Fab>
    </Box>
  )
}

function getFormHeader(formName: FormNameProps) {
  if (formName === FormName.signin) return FormButtonName.signIn
  return FormButtonName.save
}

interface MyButtonProps extends FormProps {
  disabled?: boolean
}
