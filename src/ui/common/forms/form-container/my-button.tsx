import { ListBtnNamesValue } from '@/lib/constants/type'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'

export default function MyButton({ btnName, disabled }: MyButtonProps) {
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

interface MyButtonProps {
  disabled?: boolean
  btnName: ListBtnNamesValue
}
