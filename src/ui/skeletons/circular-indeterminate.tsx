import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10vh' }}>
      <CircularProgress />
    </Box>
  )
}
