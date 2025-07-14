import { auth } from '@/auth'
import { ListPhrases } from '@/lib/constants/text-const'
import { getSearchParams } from '@/lib/utils/helpers/get-search-params'
import TaskListItemSwipeable from '@/ui/common/tasks-list/swipeable-list-items'
import { EmptyStateProps, TasksItemsProps } from '@/ui/common/tasks-list/types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default async function TasksItems({
  searchParamsObject,
  userTasksPromise,
}: TasksItemsProps) {
  const response = await userTasksPromise

  if (response.error || response.data?.tasks.length === 0) {
    return (
      <EmptyState
        {...response}
        searchParamsObject={searchParamsObject}
      />
    )
  }

  const session = await auth()
  const taskItem = response.data.tasks.map((task) => (
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
