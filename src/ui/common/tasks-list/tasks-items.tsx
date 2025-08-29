import { PhrasesList } from '@/lib/constants/text-const'
import { getValidateSearchParams } from '@/lib/utils/helpers/get-search-params/searchParams'
import TaskListItemSwipeable from '@/ui/common/tasks-list/swipeable-list-items'
import { EmptyStateProps, TasksItemsProps } from '@/ui/common/tasks-list/types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { auth } from '../../../auth'
import { sxTasksList } from './styles'

/**
 * The TasksItems component is responsible for rendering individual task list items.
 * It receives a Promise containing task data and a search parameters object.
 *
 * If data is not loaded or the task list is empty, it displays
 * the `EmptyState` component with an appropriate message. Otherwise,
 * it maps the fetched tasks to interactive `TaskListItemSwipeable` components.
 *
 * @param searchParamsObject - An object of search parameters used for filtering and pagination of tasks.
 * @param userTasksPromise - A Promise that resolves to user task data or an error.
 * @returns A list of React `TaskListItemSwipeable` elements or an `EmptyState` component.
 */
export default async function TasksItems({
  searchParamsObject,
  userTasksPromise,
}: TasksItemsProps) {
  const response = await userTasksPromise

  if (response.error || response.data?.tasks.length === 0)
    return (
      <EmptyState
        {...response}
        searchParamsObject={searchParamsObject}
      />
    )

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

/**
 * The EmptyState component displays a message indicating no tasks
 * or a loading error.
 *
 * The message content depends on:
 * - The presence of an error.
 * - Whether the task list is empty and there's an active search query.
 * - Whether there are simply no tasks, prompting the user to create a new one.
 *
 * @param searchParamsObject - Search parameters object to determine context (e.g., presence of a search query).
 * @param data - The data object containing tasks, if available.
 * @param error - The error object, if an error occurred during loading.
 * @returns A React component displaying a text message.
 */
function EmptyState({ searchParamsObject, data, error }: EmptyStateProps) {
  const { query } = getValidateSearchParams(searchParamsObject)

  const content =
    data?.tasks === undefined
      ? error?.message
      : data.tasks.length === 0 && query !== ''
      ? PhrasesList.taskNoFound
      : PhrasesList.createNewTask

  return (
    <Box sx={sxTasksList.emptyBox}>
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
