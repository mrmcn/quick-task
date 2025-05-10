import { auth } from '@/auth'
import { ListPhrases } from '@/lib/constants/text-const'
import { FetchData, UserTasksResult } from '@/lib/services/queries/task'
import {
  getSearchParams,
  OptionalSearchParamsObject,
} from '@/lib/utils/get-search-params'
import TaskListItemSwipeable from '@/ui/common/tasks-list/swipeable-list-items'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { notFound } from 'next/navigation'

export default async function TasksItems({
  searchParamsObject,
  tasksDataPromise,
}: TaskListContentProps) {
  const tasks = await processTasksData(tasksDataPromise)

  if (!tasks) return <EmptyState searchParamsObject={searchParamsObject} />

  const session = await auth()
  const taskItem = tasks.map((task) => (
    <TaskListItemSwipeable
      key={task.id}
      task={task}
      searchParamsObject={searchParamsObject}
      authenticated={!!session}
    />
  ))

  return <>{taskItem}</>
}

function EmptyState({ searchParamsObject }: EmptyStateProps) {
  const { query } = getSearchParams(searchParamsObject)
  const content =
    query !== '' ? ListPhrases.taskNoFound : ListPhrases.createNewTask

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

async function processTasksData(tasksDataPromise: FetchData<UserTasksResult>) {
  const taskData = await tasksDataPromise
  const { data, error } = taskData
  if (error) return notFound()
  const tasks = data.tasks.length === 0 ? null : data.tasks

  return tasks
}

interface EmptyStateProps {
  searchParamsObject: OptionalSearchParamsObject
}

interface TaskListContentProps {
  searchParamsObject: OptionalSearchParamsObject
  tasksDataPromise: FetchData<UserTasksResult>
}
