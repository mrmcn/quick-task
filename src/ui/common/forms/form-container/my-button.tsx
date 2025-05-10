import {
  ListBtnNames,
  ListFormNames,
  ListFormNamesProps,
} from '@/lib/constants/text-const'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import { FormProps } from '../form-use-action-state'

export default function MyButton({ formName, disabled }: MyButtonProps) {
  const btnName = formName ? getFormHeader(formName) : null

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
        loading={disabled}
        loadingPosition='end'
        disabled={disabled}
      >
        {btnName}
      </Fab>
    </Box>
  )
}

function getFormHeader(formName: ListFormNamesProps) {
  if (formName === ListFormNames.signin) return ListBtnNames.signIn
  return ListBtnNames.save
}

interface MyButtonProps extends FormProps {
  disabled?: boolean
}
