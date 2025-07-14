import { GroupInProgressProps } from '@/lib/repositories/interfaces/tasks'
import { Status } from '@prisma/client'

/**
 * @function getTaskStatusCountsFromPrismaSchema
 * @description Calculates the count of tasks for each status using data
 * grouped by Prisma statuses. This function dynamically retrieves all possible statuses
 * from the Prisma `Status` enum, initializes counters for each status to zero,
 * and then populates them with actual values from the provided grouped data.
 *
 * @param  groupInProgress - An object containing the result of grouping tasks by status,
 * obtained directly from a Prisma query.
 * @returns  - An object where keys are the values of the Prisma `Status` enum,
 * and values are the count of tasks for the corresponding status.
 */
export function getTaskStatusCountsFromPrismaSchema(
  groupInProgress: GroupInProgressProps,
) {
  // Retrieves an array of keys (values) from the Status enum defined in the Prisma schema.
  // This ensures automatic updates if the Status enum changes in Prisma.
  const statusKeys = Object.keys(Status) as (keyof typeof Status)[]

  // Creates an initial accumulator object to count the number of tasks for each status.
  // The keys of the object will be the values of the Status enum, and the initial values will be 0.
  const initialAccumulator = statusKeys.reduce((acc, key) => {
    acc[key] = 0 // Set initial value to 0 for each status
    return acc
  }, {} as Record<keyof typeof Status, number>) // Assert type to ensure type safety

  // Iterates over the results of grouping tasks by status (`groupInProgress`).
  // Populates the accumulator with the actual task counts for each status.
  const data = groupInProgress.reduce((acc, curr) => {
    // Assign the status count (`_count.status`) to the current status (`curr.status`) in the accumulator.
    // Uses spread to keep the `initialAccumulator` as the base object.
    acc[curr.status] = curr._count.status
    return acc
  }, initialAccumulator) // Start with `initialAccumulator` to ensure all statuses are present with 0 if not in `groupInProgress`.

  return data // Return the aggregated data.
}
