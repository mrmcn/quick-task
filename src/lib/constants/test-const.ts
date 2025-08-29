import {
  NameAttributeList,
  SearchParameterList,
  SortingParameterList,
} from '@/lib/constants/text-const'
import { PageValue } from '@/lib/constants/type'
import {
  GetUserTasksParams,
  GroupInProgressProps,
} from '@/lib/repositories/interfaces/tasks'
import {
  MonitoringStatesProps,
  ResponseObject,
  UserTasksResult,
} from '@/lib/services/types'
import { HandleDBError, HandleZodError } from '@/lib/utils/error-handling/types'
import { ValidationError } from '@/lib/utils/errors/validation-error'
import {
  CurrentAndNewPassword,
  PaginationErrorResult,
  PaginationSuccessResult,
  SearchParamsObject,
  ValidateParamValueMap,
} from '@/lib/utils/types'
import { Priority, Prisma, Status, Task, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { z } from 'zod'
import { TaskListDto } from '../db/selects'

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
export const testWithSearchParams = '?query=Test+query'
export const testEmptySearchParams = '?'
export const testParamPage = '2'
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

// test error
export const testErrorDB = new PrismaClientKnownRequestError(
  'P2025: An operation failed because it depends on one or more records that were required but not found.',
  { code: 'P2025', clientVersion: 'test' },
)
export const testValidateError = new ValidationError(
  'The current password entered is incorrect.',
)
export const testResponseFetchErrorDB = {
  error: testErrorDB,
}
export const testZodError: HandleZodError = {
  type: 'zodValidation',
  message: 'Validation error.',
  details: {},
}
export const testDBError: HandleDBError = {
  type: 'database',
  message: '',
  details: '',
}
export const testZodErrorThrow = () => {
  throw testZodError
}
export const testDBErrorThrow = async () => {
  throw testDBError
}

// Prisma test response
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
export const testPrismaSelectName: Prisma.UserSelect = { name: true }

export const testErrorMessage = 'testError'
export const testPasswords: CurrentAndNewPassword = {
  currentPassword: 'testCurrentPassword',
  newPassword: 'testNewPassword',
}

// Prisma test Status count
const testCompletedNumber = 3
const testIn_progressNumber = 8
export const testGroupInProgress: GroupInProgressProps = [
  { _count: { status: testCompletedNumber }, status: Status.completed },
  { _count: { status: testIn_progressNumber }, status: Status.in_progress },
]
export const testStatusCount: MonitoringStatesProps = {
  [Status.completed]: testCompletedNumber,
  [Status.in_progress]: testIn_progressNumber,
}

// Zod validate
const { id, title } = NameAttributeList
export const testValidatedTaskTitle: Partial<Task> = {
  [id]: testTaskId,
  [title]: testTitle,
}
export const testSchemaUpdateTitle = z.object({
  [id]: z.string(),
  [title]: z.string({ message: '"This field is required."' }),
})

// DB test data
const testTasks: TaskListDto[] = [
  {
    id: testTaskId,
    title: testTitle,
    details: testDetails,
    priority: testPriority,
    status: testStatus,
  },
]

// Service test data
const testTotalPage: number = 4
export const testUserTasksResult: UserTasksResult = {
  tasks: testTasks,
  totalPages: testTotalPage,
}

// Pagination test data
export const testPaginationParams = {
  currentPage: Number(testParamPage),
  countPages: testUserTasksResult.totalPages,
}
export const testErrorPaginationParams: PaginationErrorResult = {
  resolve: 'error',
}
export const testResponseWithValidData: ResponseObject<UserTasksResult> = {
  data: testUserTasksResult,
}
export const testResponseWithError: ResponseObject<UserTasksResult> = {
  error: testDBError,
}
export const testInvalidTotalPagesResponses: Record<
  string,
  ResponseObject<UserTasksResult>
> = {
  lessOne: {
    data: { ...testUserTasksResult, totalPages: 0 },
  },
  invalidType: {
    data: {
      ...testUserTasksResult,
      totalPages: 'invalid' as unknown as number,
    },
  },
  undefined: {
    data: {
      ...testUserTasksResult,
      totalPages: undefined as unknown as number,
    },
  },
}
export const testSuccessPaginationParams: PaginationSuccessResult = {
  resolve: testPaginationParams,
}
export const testPaginationParamsWithCurrentPage1: PaginationSuccessResult = {
  resolve: { ...testPaginationParams, currentPage: 1 },
}
