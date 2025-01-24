import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'

export default function AddTaskBtn() {
  return (
    <Box
      component='article'
      sx={{ display: 'flex', justifyContent: 'flex-end', mt: '5vh' }}
    >
      <Button startIcon={<AddIcon />}>ADD TASK</Button>
    </Box>
  )
}
