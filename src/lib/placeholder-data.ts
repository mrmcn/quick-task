import { MonitoringScreenProps } from '@/ui/common/monitoring-states/monitor'
import { TasksListProps } from '@/ui/common/tasks-list/list'

export const TasksSample: TasksListProps[] = [
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

export const MonitoringDataSample: MonitoringScreenProps = [
  { name: 'Completed tasks', value: 2, size: 6 },
  { name: 'Pending tasks', value: 1, size: 6 },
  { name: 'Progress, %', value: 67, size: 12 },
]

export const MonitoringDataSkeleton: MonitoringScreenProps = [
  { name: 'Completed tasks', value: 0, size: 6 },
  { name: 'Pending tasks', value: 0, size: 6 },
  { name: 'Progress, %', value: 0, size: 12 },
]
