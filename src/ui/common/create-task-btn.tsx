import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import Link from 'next/link'

export default function CreateTaskBtn() {
  return (
    <Box
      component='article'
      sx={{
        '& > :not(style)': { position: 'fixed', bottom: '10vh', right: '10vw' },
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
