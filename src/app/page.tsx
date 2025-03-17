import CreateTaskBtn from '@/ui/common/create-task-fab'
import MonitoringScreen from '@/ui/common/monitoring-screen'
import TasksList from '@/ui/common/tasks-list'
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
