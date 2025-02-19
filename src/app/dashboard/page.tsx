import CreateTaskBtn from '@/ui/common/create-task-btn'
import MonitoringStates from '@/ui/dashboard/page/monitoring-states'
import TasksMonitor from '@/ui/dashboard/page/tasks-monitor'
import CircularIndeterminate from '@/ui/skeletons/circular-indeterminate'
import MonitoringScreenSkeleton from '@/ui/skeletons/monitoring-states'
import Box from '@mui/material/Box'
import { Suspense } from 'react'

export default async function Dashboard() {
  return (
    <Box component='main'>
      <Suspense fallback={<MonitoringScreenSkeleton />}>
        <MonitoringStates />
      </Suspense>
      <Suspense fallback={<CircularIndeterminate />}>
        <TasksMonitor />
      </Suspense>
      <CreateTaskBtn />
    </Box>
  )
}
