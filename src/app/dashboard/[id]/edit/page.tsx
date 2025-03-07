import { fetchTaskIdData } from '@/lib/data'
import TaskForm from '@/ui/dashboard/task-form'
import { Box, Typography } from '@mui/material'
import { notFound } from 'next/navigation'

export default async function EditTaskPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const id = params.id
  const task = await fetchTaskIdData(id)

  if (!task) notFound()
  if ('type' in task)
    return (
      <Box>
        <Typography>{task.message}</Typography>
        <Typography>{task.type}</Typography>
      </Box>
    )

  return <TaskForm task={task} />
}
