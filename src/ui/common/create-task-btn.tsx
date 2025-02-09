import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'

export default function CreateTaskBtn() {
  return (
    <Box
      component='article'
      sx={{ display: 'flex', justifyContent: 'flex-end', mt: '5vh' }}
    >
      <Button
        component={Link}
        href='/dashboard/create'
        startIcon={<AddIcon />}
      >
        Add task
      </Button>
    </Box>
  )
}
