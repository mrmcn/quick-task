import { fetchTasksData } from '@/lib/data'
import TasksList from '@/ui/common/tasks-list/list'

export default async function TasksMonitor() {
  const tasks = await fetchTasksData()

  return <TasksList tasks={tasks} />
}
