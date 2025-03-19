import {
  ListButtonNames,
  ListFormNames,
  ListFormNamesProps,
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

function getFormHeader(formName: ListFormNamesProps) {
  if (formName === ListFormNames.signin) return ListButtonNames.signIn
  return ListButtonNames.save
}

interface MyButtonProps extends FormProps {
  disabled?: boolean
}
