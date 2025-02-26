import CreateTaskBtn from '@/ui/common/create-task-btn'
import MonitoringScreen from '@/ui/common/monitoring-states/monitor'
import TasksList from '@/ui/common/tasks-list/tasks-list'
import MonitoringScreenSkeleton from '@/ui/skeletons/monitoring-states'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import { Suspense } from 'react'

export default async function Dashboard() {
  return (
    <Box component='main'>
      <Suspense fallback={<MonitoringScreenSkeleton />}>
        <MonitoringScreen />
      </Suspense>
      <CreateTaskBtn />
      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10vh' }}>
            <CircularProgress />
          </Box>
        }
      >
        <TasksList />
      </Suspense>
    </Box>
  )
}
