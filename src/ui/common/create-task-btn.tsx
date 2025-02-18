import AddIcon from '@mui/icons-material/Add'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Link from 'next/link'

export default function CreateTaskBtn() {
  return (
    <Box
      component='article'
      sx={{ display: 'flex', justifyContent: 'flex-end', mt: '5vh' }}
    >
      <IconButton
        component={Link}
        href='/dashboard/create'
        size='large'
        color='success'
        aria-label='delete'
      >
        <AddIcon fontSize='large' />
      </IconButton>
    </Box>
  )
}
