import { SearchParamsProps } from '@/app/dashboard/page'
import { ListPhrases } from '@/lib/constants/text-const'
import {
  fetchUserTasksData,
  FetchUserTasksResult,
} from '@/lib/services/queries/task'
import { HandleErrorProps } from '@/lib/utils/error-handling'
import {
  getSearchParams,
  OptionalSearchParamsObject,
  SearchParamsObject,
} from '@/lib/utils/get-search-params'
import TaskItem from '@/ui/common/home/page-blocks/tasks-list/task-item'
import PaginationRow from '@/ui/dashboard/page/pagination'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { notFound } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

export default async function TasksList({ searchParams }: SearchParamsProps) {
  const { countPages, searchParamsObject, response } =
    await fetchAndGetSearchParamsObject(searchParams)

  return (
    <>
      <FirstCenteringBox>
        <Suspense>
          <PaginationRow countPages={countPages} />
        </Suspense>
      </FirstCenteringBox>
      <SecondCenteringBox>
        <List
          sx={{
            maxWidth: 'md',
            width: { xs: '90%', md: '100%' },
          }}
        >
          <TaskListContent
            searchParamsObject={searchParamsObject}
            response={response}
          />
        </List>
      </SecondCenteringBox>
    </>
  )
}

function TaskListContent({
  searchParamsObject,
  response,
}: TaskListContentProps) {
  const { tasks, error, errorNotFromDB, notData } = processTasksData(response)

  if (errorNotFromDB) notFound()
  if (notData)
    return (
      <EmptyState
        error={error}
        searchParamsObject={searchParamsObject}
      />
    )

  const taskItem = tasks?.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      searchParamsObject={searchParamsObject}
    />
  ))
  return <>{taskItem}</>
}

function EmptyState({ error, searchParamsObject }: EmptyStateProps) {
  const { query } = getSearchParams(searchParamsObject)
  const content = error
    ? error.message
    : query !== ''
    ? ListPhrases.taskNoFound
    : ListPhrases.createNewTask

  return (
    <Box sx={{ mt: '5vh' }}>
      <Typography
        component='h1'
        variant='h4'
        align='center'
      >
        {content}
      </Typography>
    </Box>
  )
}

async function fetchAndGetSearchParamsObject(
  searchParams: Promise<SearchParamsObject> | undefined,
) {
  const searchParamsObject = await searchParams
  const response = await fetchUserTasksData(searchParamsObject)
  const countPages = response.data?.totalPages

  return { countPages, searchParamsObject, response }
}

function processTasksData(response: ResponseProps) {
  const { data, error } = response
  const errorNotFromDB = error && error.type !== 'database'
  const notData = !data?.tasks || data.tasks.length === 0
  const tasks = data?.tasks

  return { errorNotFromDB, notData, error, tasks }
}

export function FirstCenteringBox({ children }: Children) {
  return (
    <Box
      component='article'
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  )
}

export function SecondCenteringBox({ children }: Children) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}

interface EmptyStateProps {
  error: HandleErrorProps | undefined
  searchParamsObject: OptionalSearchParamsObject
}

interface TaskListContentProps {
  searchParamsObject: OptionalSearchParamsObject
  response: ResponseProps
}

type ResponseProps =
  | {
      error: HandleErrorProps
      data?: undefined
    }
  | {
      data: FetchUserTasksResult
      error?: undefined
    }

interface Children {
  children: ReactNode
}
