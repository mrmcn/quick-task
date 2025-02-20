import { fetchTaskIdData } from '@/lib/data'
import TaskForm from '@/ui/dashboard/task-form'
import { notFound } from 'next/navigation'

export default async function EditTaskPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const id = params.id
  const task = await fetchTaskIdData(id)
  if (!task) {
    notFound()
  }

  return <TaskForm task={task} />
}
