import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

export default function MonitoringState({
  name,
  value,
  size,
}: MonitoringStateProps) {
  return (
    <Grid size={size}>
      <Card
        component='section'
        raised
      >
        <CardContent>
          <Typography
            variant='h6'
            align='center'
          >
            {name}
          </Typography>
          <Typography align='center'>{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export interface MonitoringStateProps {
  name: string
  value: number
  size: number
}
