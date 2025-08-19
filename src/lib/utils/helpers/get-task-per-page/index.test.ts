import { defaultTaskPerPage, PAGE_VALUE } from '@/lib/constants/data/ui-config'
import {
  mockBadResponses,
  notValidTasksPerPage,
  testTasksPerPage,
} from '@/lib/constants/test-const'
import { fetchUser } from '@/lib/services/queries/user/fetchUser'
import { getTaskPerPage } from '@/lib/utils/helpers/get-task-per-page'

jest.mock('@/lib/services/queries/user/fetchUser')

describe('getTaskPerPage', () => {
  test('should return a valid PageValue from the database', async () => {
    await expect(getTaskPerPage()).resolves.toBe(testTasksPerPage)
  })

  test('should return the default value when the database response is undefined', async () => {
    jest
      .mocked(fetchUser.uniqueData)
      .mockResolvedValueOnce(mockBadResponses.undefinedData)
    await expect(getTaskPerPage()).resolves.toBe(defaultTaskPerPage)
  })

  test('should validate that notValidTasksPerPage is not in PAGE_VALUE', () => {
    expect(PAGE_VALUE).not.toContain(notValidTasksPerPage)
  })

  test('should return the default value when the database response is invalid', async () => {
    jest
      .mocked(fetchUser.uniqueData)
      .mockResolvedValueOnce(mockBadResponses.notValidData)
    await expect(getTaskPerPage()).resolves.toBe(defaultTaskPerPage)
  })
})
