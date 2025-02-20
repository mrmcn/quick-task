import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
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
      size={state.size}
    />
  ))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
      >
        {monitor}
      </Grid>
    </Box>
  )
}

export type MonitoringScreenProps = MonitoringStateProps[]

export interface MonitoringStateProps {
  name: string
  value: number
  size: number
}
