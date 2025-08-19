import { GroupInProgressProps } from '@/lib/repositories/interfaces/tasks'
import { MonitoringStatesProps } from '@/lib/services/types'
import { getTaskStatusCountsFromPrismaSchema } from '@/lib/utils/helpers/task-status-counts'
import { Status } from '@prisma/client'

const testCompletedNumber = 3
const testIn_progressNumber = 8
const testGroupInProgress: GroupInProgressProps = [
  { _count: { status: testCompletedNumber }, status: Status.completed },
  { _count: { status: testIn_progressNumber }, status: Status.in_progress },
]
const expectData: MonitoringStatesProps = {
  completed: testCompletedNumber,
  in_progress: testIn_progressNumber,
}

test('getTaskStatusCountsFromPrismaSchema returns the expected result', () => {
  expect(getTaskStatusCountsFromPrismaSchema(testGroupInProgress)).toEqual(
    expectData,
  )
})
