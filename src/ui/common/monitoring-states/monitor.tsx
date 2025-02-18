import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import MonitoringState from './state'

export default function MonitoringScreen({
  dataMonitoring,
}: {
  dataMonitoring: MonitoringScreenProps
}) {
  const monitor = dataMonitoring.map((state) => (
    <MonitoringState
      key={state.name}
      name={state.name}
      value={state.value}
    />
  ))

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
        {monitor}
      </Stack>
    </Box>
  )
}

export type MonitoringScreenProps = MonitoringStateProps[]

export interface MonitoringStateProps {
  name: string
  value: number
}
