import { PageValue } from '@/lib/constants/type'
import {
  CurrentAndNewPassword,
  SearchParamsObject,
  ValidateParamValueMap,
} from '@/lib/utils/types'
import { Priority, Prisma, Status, Task, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { GetUserTasksParams } from '../repositories/interfaces/tasks'
import {
  NameAttributeList,
  SearchParameterList,
  SortingParameterList,
} from './text-const'

// Prisma test User
export const testEmail: User['email'] = 'Test email'
export const testUserId: User['id'] = 'Test ID'
export const testUser: User['name'] = 'Test User'
export const testPassword: User['password'] = '123'
export const testTasksPerPage: PageValue = 5
export const notValidTasksPerPage = 1

// Prisma test Task
export const testTaskId: Task['id'] = 'test task id'
export const testTitle: Task['title'] = 'test task title'
export const testDetails: Task['details'] = 'test task details'
export const testPriority: Task['priority'] = Priority.high
export const testStatus: Task['status'] = Status.completed

// test searchParamsObject
const { page, priority, query, sort, status } = SearchParameterList
const testParamPage = '2'
export const testParamQuery = 'Test query'
const testParamSort = SortingParameterList.dateAsc
export const testValidPage = Number(testParamPage)
const testValidQuery = 'Test query'
const testValidSort = SortingParameterList.dateAsc
const testValidPriority = Priority.high
const testValidStatus = Status.completed
export const testSearchParamsObjectWithPage = { [page]: testParamPage }
export const testSearchParamsObjectWithPriority = { [priority]: testPriority }
export const testSearchParamsObjectWithQuery = { [query]: testParamQuery }
export const testSearchParamsObjectWithSort = { [sort]: testParamSort }
export const testSearchParamsObjectWithStatus = { [status]: testStatus }
export const testValidParamPage = { [page]: testValidPage }
export const testValidParamPriority = { [priority]: testValidPriority }
export const testValidParamQuery = { [query]: testValidQuery }
export const testValidParamSort = { [sort]: testValidSort }
export const testValidParamStatus = { [status]: testValidStatus }
export const testSearchParamsObject: SearchParamsObject = {
  ...testSearchParamsObjectWithPage,
  ...testSearchParamsObjectWithPriority,
  ...testSearchParamsObjectWithQuery,
  ...testSearchParamsObjectWithSort,
  ...testSearchParamsObjectWithStatus,
}
export const testValidParams: ValidateParamValueMap = {
  ...testValidParamPage,
  ...testValidParamPriority,
  ...testValidParamQuery,
  ...testValidParamSort,
  ...testValidParamStatus,
}
export const searchParamsEmptyObject: SearchParamsObject = {}

// Prisma test response
export const testErrorDB = new PrismaClientKnownRequestError(
  'P2025: An operation failed because it depends on one or more records that were required but not found.',
  { code: 'P2025', clientVersion: 'test' },
)
export const testResponseFetchErrorDB = {
  error: testErrorDB,
}
export const testResponseFetchNotValidTasksPerPageData = {
  data: { tasksPerPage: notValidTasksPerPage },
}
export const testResponseUndefinedData = { data: undefined }
// Prisma test tasksRequestParams
const testParamOrderBy: Prisma.TaskOrderByWithRelationInput = { date: 'asc' }
const testWhere: Prisma.TaskWhereInput = {
  author: { id: testUserId },
  status: testStatus,
  priority: testPriority,
  OR: [
    {
      [NameAttributeList.title]: {
        contains: testParamQuery,
        mode: 'insensitive',
      },
    },
    {
      [NameAttributeList.details]: {
        contains: testParamQuery,
        mode: 'insensitive',
      },
    },
  ],
}
const testSkip = (testValidPage - 1) * testTasksPerPage
export const testTasksRequestParams: GetUserTasksParams = {
  where: testWhere,
  skip: testSkip,
  orderBy: testParamOrderBy,
  take: testTasksPerPage,
}

// Prisma test UserSelect
export const testPrismaSelectTasksPerPage: Prisma.UserSelect = {
  tasksPerPage: true,
}

export const testErrorMessage = 'testError'
export const testPasswords: CurrentAndNewPassword = {
  currentPassword: 'testCurrentPassword',
  newPassword: 'testNewPassword',
}
