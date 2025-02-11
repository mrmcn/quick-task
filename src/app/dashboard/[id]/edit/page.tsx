import { fetchTaskIdData } from '@/lib/data'
import EditTaskForm from '@/ui/dashboard/edit-task/form'
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

  return <EditTaskForm task={task} />
}
