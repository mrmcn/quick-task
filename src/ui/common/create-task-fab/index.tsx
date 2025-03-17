import { DASHBOARD_CREATE_URL } from '@/lib/constants/url'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Link from 'next/link'

export default function CreateTaskFab() {
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
        href={DASHBOARD_CREATE_URL}
        color='primary'
        aria-label='add'
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}
