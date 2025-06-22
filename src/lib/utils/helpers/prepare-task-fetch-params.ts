import { auth } from '@/auth'
import TASK_DATA from '@/lib/constants/data/sample-task'
import { fetchUser } from '@/lib/services/queries/user'
import {
  getSearchParams,
  SearchParamsObject,
} from '@/lib/utils/helpers/get-search-params'
import { getSessionData } from '@/lib/utils/helpers/get-session-data'

export default async function prepareTaskFetchParams(
  searchParamsObject?: SearchParamsObject,
) {
  const session = await auth()
  if (!session) {
    return { sampleData: { tasks: TASK_DATA, totalPages: 1 } } // for sampleTasksList
  }

  const { userEmail, userId } = await getSessionData() // or userTasksList
  if (!userEmail) return { error: new Error('User email is undefined') }
  const { data, error } = await fetchUser.uniqueData('tasksPerPage')
  if (!data) return { error }

  const { query, currentPage, sort, status, priority } =
    getSearchParams(searchParamsObject)
  const offset = (currentPage - 1) * data
  const orderBy = getOrderBy(sort)

  return {
    data: {
      userId,
      offset,
      orderBy,
      query,
      status,
      priority,
      tasksPerPage: data,
    },
  }
}

function getOrderBy(sortParams: string) {
  const [field, order] = sortParams.split(' ')

  return {
    [field]: order,
  }
}
