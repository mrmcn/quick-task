import { Box } from '@mui/material'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'

export default function ControlDisplay({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '5vh' }}>
      <Stack
        component='article'
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider
            orientation='vertical'
            flexItem
          />
        }
        spacing={{ xs: 3, sm: 6 }}
      >
        {children}
      </Stack>
    </Box>
  )
}
