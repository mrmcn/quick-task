import { Box } from '@mui/material'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import ProgressDisplay from './progress-display'

export default function ControlDisplay({
  completed,
  pending,
  progress,
}: ControlDisplayProps) {
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
        <ProgressDisplay
          name='Completed tasks'
          value={completed}
        />
        <ProgressDisplay
          name='Pending tasks'
          value={pending}
        />
        <ProgressDisplay
          name='Progress, %'
          value={progress}
        />
      </Stack>
    </Box>
  )
}

export interface ControlDisplayProps {
  completed: number
  pending: number
  progress: number
}
