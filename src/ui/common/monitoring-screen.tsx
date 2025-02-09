import { Box } from '@mui/material'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import IndicatorScreen from './indicator-screen'

export default function MonitoringScreen({
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
        <IndicatorScreen
          name='Completed tasks'
          value={completed}
        />
        <IndicatorScreen
          name='Pending tasks'
          value={pending}
        />
        <IndicatorScreen
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
