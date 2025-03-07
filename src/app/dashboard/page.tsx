import { checkAuth } from '@/auth'
import CreateTaskBtn from '@/ui/dashboard/create-task-fab'
import MonitoringScreen from '@/ui/dashboard/monitoring-screen'
import TasksList from '@/ui/dashboard/tasks-list/tasks-list'
import MonitoringScreenSkeleton from '@/ui/skeletons/monitoring-states'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import { Suspense } from 'react'

export default async function Dashboard() {
  checkAuth()

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
