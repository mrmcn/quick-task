import { auth } from '@/auth'
import { TaskListDto } from '@/lib/repositories/prisma/tasks'
import { fetchUniqueUserData } from '@/lib/services/queries/user'
import { getSearchParams, SearchParamsObject } from '../get-search-params'
import { getSessionData } from '../get-session-data'

export default async function prepareTaskFetchParams(
  searchParamsObject?: SearchParamsObject,
) {
  const session = await auth()
  if (!session) {
    return { sampleData: { tasks: getTasksDATA(), totalPages: 1 } } // for sampleTasksList
  }

  const { userEmail, userId } = await getSessionData() // or userTasksList
  if (!userEmail) return { error: new Error('User email is undefined') }
  const { data, error } = await fetchUniqueUserData('tasksPerPage')
  if (error) return { error }

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

const getTasksDATA = (): TaskListDto[] => [
  {
    id: '1',
    title: 'Sample 1',
    details: 'Details task',
    priority: 'high',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Sample 2',
    details: 'Details task 2',
    priority: 'high',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Sample 3',
    details: 'Details task 3',
    priority: 'high',
    status: 'in_progress',
  },
] // for 'app/page'
