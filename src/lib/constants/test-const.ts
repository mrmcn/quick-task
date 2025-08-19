import { PageValue } from '@/lib/constants/type'
import { MockResponse } from '@/lib/utils/types'
import { Priority, Status, Task, User } from '@prisma/client'

// user
export const testEmail: User['email'] = 'Test email'
export const testId: User['id'] = 'Test ID'
export const testUser: User['name'] = 'Test User'
export const testPassword: User['password'] = '123'
export const testTasksPerPage: PageValue = 5
export const notValidTasksPerPage = 1

// task
export const testTaskId: Task['id'] = 'test task id'
export const testTitle: Task['title'] = 'test task title'
export const testDetails: Task['details'] = 'test task details'
export const testPriority: Task['priority'] = Priority.high
export const testStatus: Task['status'] = Status.completed

export const testError = 'testError'
export const mockBadResponses: Record<string, MockResponse> = {
  undefinedData: { data: undefined },
  notValidData: { data: { tasksPerPage: notValidTasksPerPage } },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorDB: { error: new Error(testError) as any },
}
