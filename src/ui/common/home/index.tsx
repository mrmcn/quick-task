import { SearchParamsProps } from '@/app/dashboard/page'
import TasksList, {
  FirstCenteringBox,
  SecondCenteringBox,
} from '@/ui/common/home/page-blocks/tasks-list'
import Grid from '@mui/material/Grid2'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import { Suspense } from 'react'
import MonitoringScreen from './page-blocks/monitoring-screen'
import SortAndSearch from './page-blocks/sorting-searching'

export default function Home({ searchParams }: SearchParamsProps) {
  return (
    <Grid
      component='main'
      container
      rowSpacing={4}
      sx={{ mt: 3 }}
    >
      <Grid
        component='section'
        container
        spacing={{ xs: 1, md: 2 }}
        size={12}
      >
        <MonitoringScreen />
      </Grid>
      <Grid
        component='nav'
        container
        size={12}
      >
        <SortAndSearch />
      </Grid>
      <Grid
        component='section'
        size={12}
      >
        <Suspense fallback={<Fallback />}>
          <TasksList searchParams={searchParams} />
        </Suspense>
      </Grid>
    </Grid>
  )
}

function Fallback() {
  return (
    <>
      <FirstCenteringBox>
        <Skeleton width={170} />
      </FirstCenteringBox>
      <SecondCenteringBox>
        <ListItem disablePadding>
          <ListItemButton dense>
            <ListItemText
              primary={<Skeleton width={100} />}
              secondary={<Skeleton width={170} />}
              slotProps={{
                primary: { variant: 'h5' },
                secondary: { variant: 'body1' },
              }}
            />
          </ListItemButton>
        </ListItem>
      </SecondCenteringBox>
    </>
  )
}
