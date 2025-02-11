import { TasksSample } from '@/lib/placeholder-data'
import CreateTaskBtn from '@/ui/common/create-task-btn'
import MonitoringScreen from '@/ui/common/monitoring-screen'
import ViewTasks from '@/ui/common/view tasks/view-tasks'
import Box from '@mui/material/Box'

export default async function Home() {
  return (
    <Box component='main'>
      <MonitoringScreen
        completed={1}
        pending={3}
        progress={25}
      />
      <CreateTaskBtn />
      <ViewTasks tasks={TasksSample} />
    </Box>
  )
}
