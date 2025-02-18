import { fetchTasksData } from '@/lib/data'
import TasksList from '@/ui/common/tasks-list/list'

export default async function TasksMonitor() {
  const tasks = await fetchTasksData()
  const tasksList = tasks.length === 0 ? null : <TasksList tasks={tasks} />

  return <>{tasksList}</>
}
