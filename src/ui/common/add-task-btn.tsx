import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import Link from 'next/link'

export default function AddTaskBtn() {
  return (
    <Box
      component='article'
      sx={{ display: 'flex', justifyContent: 'flex-end', mt: '5vh' }}
    >
      <Button
        component={Link}
        href='/dashboard/add-task'
        startIcon={<AddIcon />}
      >
        ADD TASK
      </Button>
    </Box>
  )
}
