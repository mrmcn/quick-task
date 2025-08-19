import {
  testId,
  testPriority,
  testStatus,
  testTasksPerPage,
} from '@/lib/constants/test-const'
import {
  NameAttributeList,
  SortingParameterList,
} from '@/lib/constants/text-const'
import { GetUserTasksParams } from '@/lib/repositories/interfaces/tasks'
import {
  ParamValueMap,
  PartialParamValueMap,
  SearchParamsObject,
} from '@/lib/utils/types'
import { Prisma } from '@prisma/client'

const testCurrentPage = 2
const testQuery = 'Test query'
const testSort = SortingParameterList.dateAsc
const testOrderBy: Prisma.TaskOrderByWithRelationInput = { date: 'asc' }

export const testSearchParams = {
  page: testCurrentPage,
  priority: testPriority,
  query: testQuery,
  sort: testSort,
  status: testStatus,
}
export const testSearchParamsObject: SearchParamsObject = testSearchParams
export const testNormalizedSearchParams: ParamValueMap = testSearchParams
export const testParamPage: PartialParamValueMap = {
  page: testNormalizedSearchParams.page,
}
export const testParamPriority: PartialParamValueMap = {
  priority: testNormalizedSearchParams.priority,
}
export const testParamQuery: PartialParamValueMap = {
  query: testNormalizedSearchParams.query,
}
export const testParamSort: PartialParamValueMap = {
  sort: testNormalizedSearchParams.sort,
}
export const testParamStatus: PartialParamValueMap = {
  status: testNormalizedSearchParams.status,
}

const testWhere: Prisma.TaskWhereInput = {
  author: { id: testId },
  status: testNormalizedSearchParams.status,
  priority: testNormalizedSearchParams.priority,
  OR: [
    {
      [NameAttributeList.title]: {
        contains: testNormalizedSearchParams.query,
        mode: 'insensitive',
      },
    },
    {
      [NameAttributeList.details]: {
        contains: testNormalizedSearchParams.query,
        mode: 'insensitive',
      },
    },
  ],
}
const testSkip = (testCurrentPage - 1) * testTasksPerPage
export const testTaskWhereInput: GetUserTasksParams = {
  where: testWhere,
  skip: testSkip,
  orderBy: testOrderBy,
  take: testTasksPerPage,
}

export const getSearchParams = jest
  .fn()
  .mockReturnValue(testNormalizedSearchParams)
