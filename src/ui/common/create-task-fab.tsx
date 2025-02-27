import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import Link from 'next/link'

export default function CreateTaskBtn() {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          position: 'fixed',
          top: '85%',
          left: '70%',
        },
      }}
    >
      <Fab
        component={Link}
        href='/dashboard/create'
        color='primary'
        aria-label='add'
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}
