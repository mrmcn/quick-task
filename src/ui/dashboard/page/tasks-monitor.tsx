import { fetchTasksData } from '@/lib/data'
import TasksList from '@/ui/common/tasks-list/list'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default async function TasksMonitor() {
  const tasks = await fetchTasksData()
  const tasksList =
    tasks.length === 0 ? (
      <Box sx={{ mt: '5vh' }}>
        <Typography
          component='h1'
          variant='h4'
          align='center'
        >
          This is empty for now. Create a new task.
        </Typography>
      </Box>
    ) : (
      <TasksList tasks={tasks} />
    )

  return <>{tasksList}</>
}
