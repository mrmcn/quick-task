import { auth } from '@/auth'
import { fetchStatusMonitoringData, fetchTasksData } from '@/lib/data'
import CreateTaskBtn from '@/ui/common/create-task-btn'
import MonitoringScreen from '@/ui/common/monitoring-screen'
import ViewTasks from '@/ui/common/view tasks/view-tasks'
import Box from '@mui/material/Box'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()
  if (session === null) return redirect('/signin')
  const authorId = session.user.id
  const { completed, pending, progress } = await fetchStatusMonitoringData(
    authorId,
  )
  const tasks = await fetchTasksData(authorId)

  return (
    <Box component='main'>
      <MonitoringScreen
        completed={completed}
        pending={pending}
        progress={progress}
      />
      <CreateTaskBtn />
      {tasks.length !== 0 ? <ViewTasks tasks={tasks} /> : null}
    </Box>
  )
}
