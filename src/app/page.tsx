import { MonitoringDataSample, TasksSample } from '@/lib/placeholder-data'
import CreateTaskBtn from '@/ui/common/create-task-btn'
import MonitoringScreen from '@/ui/common/monitoring-states/monitor'
import TasksList from '@/ui/common/tasks-list/list'
import Box from '@mui/material/Box'

export default async function Home() {
  return (
    <Box component='main'>
      <MonitoringScreen dataMonitoring={MonitoringDataSample} />
      <CreateTaskBtn />
      <TasksList tasks={TasksSample} />
    </Box>
  )
}
