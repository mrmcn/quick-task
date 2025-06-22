import { auth } from '@/auth'
import { ListPhrases } from '@/lib/constants/text-const'
import { HandleError } from '@/lib/error-handling'
import { FetchData, UserTasksResult } from '@/lib/services/queries/types'
import {
  getSearchParams,
  SearchParamsObject,
} from '@/lib/utils/helpers/get-search-params'
import TaskListItemSwipeable from '@/ui/common/tasks-list/swipeable-list-items'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default async function TasksItems({
  searchParamsObject,
  tasksDataPromise,
}: TaskListContentProps) {
  const { data, error } = await tasksDataPromise

  if (!data?.tasks || data?.tasks.length === 0)
    return (
      <EmptyState
        data={data}
        error={error}
        searchParamsObject={searchParamsObject}
      />
    )

  const session = await auth()
  const taskItem = data.tasks.map((task) => (
    <TaskListItemSwipeable
      key={task.id}
      task={task}
      searchParamsObject={searchParamsObject}
      authenticated={!!session}
    />
  ))

  return <>{taskItem}</>
}

function EmptyState({ searchParamsObject, data, error }: EmptyStateProps) {
  const { query } = getSearchParams(searchParamsObject)
  const content =
    data?.tasks === undefined
      ? error?.message
      : data.tasks.length === 0 && query !== ''
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

interface EmptyStateProps {
  searchParamsObject?: SearchParamsObject
  data: UserTasksResult | undefined
  error: HandleError | undefined
}

interface TaskListContentProps {
  searchParamsObject?: SearchParamsObject
  tasksDataPromise: FetchData<UserTasksResult>
}
