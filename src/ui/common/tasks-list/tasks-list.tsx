import { auth } from '@/auth'
import { fetchTasksData } from '@/lib/data'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { $Enums } from '@prisma/client'
import Task from './list'

const DATA: TasksListProps[] = [
  {
    id: '1',
    summary: 'Sample 1',
    details: 'Details task 1',
    priority: 'high',
    status: 'completed',
  },
  {
    id: '2',
    summary: 'Sample 2',
    details: 'Details task 2',
    priority: 'high',
    status: 'completed',
  },
  {
    id: '3',
    summary: 'Sample 3',
    details: 'Details task 3',
    priority: 'high',
    status: 'in_progress',
  },
]

export default async function TasksList() {
  const session = await auth()
  const tasks = session ? await fetchTasksData() : DATA

  const tasksList =
    tasks.length !== 0 ? (
      tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
        />
      ))
    ) : (
      <Empty />
    )

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

export interface TasksListProps {
  id: string
  summary: string
  details: string
  priority: $Enums.Priority
  status: $Enums.Status
}
