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
  // Await the promise to get the response containing data or an error.
  const response = await userTasksPromise

  // Check if there's an error or if the task list is empty.
  if (response.error || response.data?.tasks.length === 0)
    // If so, render the EmptyState component with the relevant data.
    return (
      <EmptyState
        {...response} // Pass the entire response object (with data and/or error).
        searchParamsObject={searchParamsObject}
      />
    )

  // Get the current authentication session to determine if the user is authenticated.
  const session = await auth()

  // Map the array of tasks to an array of React TaskListItemSwipeable components.
  const taskItem = response.data.tasks.map((task) => (
    <TaskListItemSwipeable
      key={task.id}
      task={task}
      searchParamsObject={searchParamsObject}
      authenticated={!!session} // Pass the authentication status (true/false).
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
  // Get the current search query from the URL parameters.
  const { query } = getValidateSearchParams(searchParamsObject)

  // Determine the content of the message based on the state.
  const content =
    data?.tasks === undefined
      ? error?.message // If data.tasks is undefined, it indicates an error.
      : data.tasks.length === 0 && query !== ''
      ? PhrasesList.taskNoFound // If no tasks and there's a search query.
      : PhrasesList.createNewTask // If no tasks at all, prompt to create.

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
