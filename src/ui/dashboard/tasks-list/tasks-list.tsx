import { fetchTasksData } from '@/lib/data'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { Task } from '@prisma/client'
import TaskItem from './list'

export default async function TasksList() {
  const tasksList = getTasksList()

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        mt: { xs: '3vh', sm: '5vh' },
      }}
    >
      {tasksList}
    </List>
  )
}

const getTasksList = async () => {
  const tasks = await fetchTasksData()
  if (tasks.length === 0) return <Empty />

  return tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
    />
  ))
}

function Empty() {
  return (
    <Box sx={{ mt: '5vh' }}>
      <Typography
        component='h1'
        variant='h4'
        align='center'
      >
        This is empty for now. Create a new task.
      </Typography>
    </Box>
  )
}

export type TasksListProps = Omit<Task, 'date' | 'authorId'>
