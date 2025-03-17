import { Prisma } from '@prisma/client'
import { MonitoringStatesProps } from '../services/queries/task'

export function calculateMonitoringStates(
  groupInProgress: GroupInProgressProps,
): MonitoringStatesProps {
  const { completed, pending } = groupInProgress.reduce(
    (acc, item) => {
      if (item.status !== 'in_progress') {
        acc.completed += item._count.status
      } else {
        acc.pending += item._count.status
      }
      return acc
    },
    { completed: 0, pending: 0 },
  )

  const progress =
    completed + pending === 0
      ? 0
      : Math.round((completed * 100) / (completed + pending))
  return { completed, pending, progress }
}

type GroupInProgressProps = (Prisma.PickEnumerable<
  Prisma.TaskGroupByOutputType,
  'status'[]
> & {
  _count: {
    status: number
  }
})[]
