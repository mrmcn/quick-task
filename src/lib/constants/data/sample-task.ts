import { TaskListDto } from '@/lib/db/selects'

/**
 * This `TASK_DATA` array contains sample (stock) task entries.
 * It's used for demonstrating application functionality,
 * for displaying a page with stock data for unauthorized users.
 * The `TaskListDto[]` type ensures that the data structure conforms
 * to the fields expected for displaying a task list.
 */
const TASK_DATA: TaskListDto[] = [
  {
    id: '1',
    title: 'Sample 1',
    details: 'Details task',
    priority: 'high',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Sample 2',
    details: 'Details task 2',
    priority: 'high',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Sample 3',
    details: 'Details task 3',
    priority: 'high',
    status: 'in_progress',
  },
]

export default TASK_DATA
