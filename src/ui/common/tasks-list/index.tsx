import { ListPhrases } from '@/lib/constants/text-const'
import { fetchUserTasksData } from '@/lib/services/queries/task'
import { HandleErrorProps } from '@/lib/utils/error-handling'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import TaskItem, { TaskItemSkeleton } from './task-item'

export default function TasksList() {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        mt: { xs: '3vh', sm: '5vh' },
      }}
    >
      <Suspense fallback={<TaskItemSkeleton />}>
        <SuspenseItem />
      </Suspense>
    </List>
  )
}

async function SuspenseItem() {
  const { data, error } = await fetchUserTasksData()

  if (error && error.type !== 'database') notFound()
  if (!data) return <Empty error={error} />
  if (data.length === 0) return <Empty />
  return data.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
    />
  ))
}

function Empty({ error }: { error?: HandleErrorProps | undefined }) {
  const content = error ? error.message : ListPhrases.createNewTask

  return (
    <Box sx={{ mt: '5vh' }}>
      <Typography
        component='h1'
        variant='h4'
        align='center'
      >
        {content}
      </Typography>
    </Box>
  )
}
