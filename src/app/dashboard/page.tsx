import CreateTaskBtn from '@/ui/common/create-task-btn'
import MonitoringScreen from '@/ui/common/monitoring-states/monitor'
import TasksList from '@/ui/common/tasks-list/tasks-list'
import CircularIndeterminate from '@/ui/skeletons/circular-indeterminate'
import MonitoringScreenSkeleton from '@/ui/skeletons/monitoring-states'
import Box from '@mui/material/Box'
import { Suspense } from 'react'

export default async function Dashboard() {
  return (
    <Box component='main'>
      <Suspense fallback={<MonitoringScreenSkeleton />}>
        <MonitoringScreen />
      </Suspense>
      <CreateTaskBtn />
      <Suspense fallback={<CircularIndeterminate />}>
        <TasksList />
      </Suspense>
    </Box>
  )
}
