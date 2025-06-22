import { GroupInProgressProps } from '@/lib/repositories/interfaces/tasks'
import { Status } from '@prisma/client'

export function getTaskStatusCountsFromPrismaSchema(
  groupInProgress: GroupInProgressProps,
) {
  // Retrieves an array of keys (values) from the Status enum defined in the Prisma schema.
  // This ensures automatic updates if the Status enum changes.
  const statusKeys = Object.keys(Status) as (keyof typeof Status)[]

  // Creates an initial accumulator object to count the number of tasks for each status.
  // The keys of the object will be the values of the Status enum, and the initial values will be 0.
  const initialAccumulator = statusKeys.reduce((acc, key) => {
    acc[key] = 0
    return acc
  }, {} as Record<keyof typeof Status, number>)

  // Iterates over the results of grouping tasks by status (`groupInProgress`).
  const data = groupInProgress.reduce((acc, curr) => {
    acc[curr.status] = curr._count.status
    return acc
  }, initialAccumulator)

  return data
}
