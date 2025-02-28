import CreateTaskBtn from '@/ui/dashboard/create-task-fab'
import MonitoringScreen from '@/ui/dashboard/monitoring-screen'
import TasksList from '@/ui/dashboard/tasks-list/tasks-list'
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
