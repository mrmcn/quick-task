import { fetchDisplayData, fetchTasksData } from '@/lib/data'
import TasksDisplay from '@/ui/common/accordion-tasks/tasks-display'
import AddTaskBtn from '@/ui/common/add-task-btn'
import ControlDisplay from '@/ui/common/control-display'
import { Box } from '@mui/material'

export default async function DashboardPage() {
  const tasks = await fetchTasksData()
  const { completed, pending, progress } = await fetchDisplayData()

  return (
    <Box component='main'>
      <ControlDisplay
        completed={completed}
        pending={pending}
        progress={progress}
      />
      <AddTaskBtn />
      <TasksDisplay tasks={tasks} />
    </Box>
  )
}
