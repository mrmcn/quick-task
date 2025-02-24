import CreateTaskBtn from '@/ui/common/create-task-btn'
import MonitoringScreen from '@/ui/common/monitoring-states/monitor'
import TasksList from '@/ui/common/tasks-list/tasks-list'
import Box from '@mui/material/Box'

export default async function Home() {
  return (
    <Box component='main'>
      <MonitoringScreen />
      <CreateTaskBtn />
      <TasksList />
    </Box>
  )
}
