import {
  testGroupInProgress,
  testStatusCount,
} from '@/lib/constants/test-const'
import { getTaskStatusCountsFromPrismaSchema } from '@/lib/utils/helpers/task-status-counts'

test('getTaskStatusCountsFromPrismaSchema returns the expected result', () => {
  expect(getTaskStatusCountsFromPrismaSchema(testGroupInProgress)).toEqual(
    testStatusCount,
  )
})
