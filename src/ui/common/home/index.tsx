import { SearchParamsObjectProps } from '@/lib/utils/get-search-params'
import TasksList from '@/ui/common/home/page-blocks/tasks-list'
import Grid from '@mui/material/Grid2'
import MonitoringScreen from './page-blocks/monitoring-screen'
import SortAndSearch from './page-blocks/sorting-searching'

export default function Home({ searchParamsObject }: SearchParamsObjectProps) {
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
        <TasksList searchParamsObject={searchParamsObject} />
      </Grid>
    </Grid>
  )
}
