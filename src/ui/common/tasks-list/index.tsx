import { fetchTask } from '@/lib/services/queries/task/task'
import TasksItems from '@/ui/common/tasks-list//tasks-items'
import { sxTasksList } from '@/ui/common/tasks-list/styles'
import { TasksListProps } from '@/ui/common/tasks-list/types'
import PaginationRow from '@/ui/dashboard/page/pagination'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import { Suspense } from 'react'

/**
 * The TasksList component is responsible for rendering the user's task list.
 * This is a Server Component that asynchronously fetches task data.
 *
 * It utilizes React Suspense to manage the loading states of its child components,
 * TasksItems and PaginationRow, displaying a Skeleton fallback during data fetching.
 *
 * @param searchParamsObject - An object containing search parameters used for filtering and pagination of tasks.
 * @returns A React component that displays the task list and pagination.
 */
export default async function TasksList({
  searchParamsObject,
}: TasksListProps) {
  // Asynchronously fetch user task data using the provided search parameters.
  // This "promise" will be passed down to child components.
  const userTasksPromise = fetchTask.userTasksData(searchParamsObject)

  return (
    <Box sx={sxTasksList.indexBox}>
      <Box component='main'>
        <List>
          {/* Suspense for the TasksItems component, which renders the list of tasks.
              The fallback is shown until the data is loaded. */}
          <Suspense fallback={<Fallback />}>
            <TasksItems
              userTasksPromise={userTasksPromise}
              searchParamsObject={searchParamsObject}
            />
          </Suspense>
        </List>
      </Box>
      {/* Suspense for the PaginationRow component.
          This is necessary because PaginationRow is a client component ('use client')
          and uses the `useSearchParams` hook, which is only available on the client. */}
      <Suspense>
        <PaginationRow userTasksPromise={userTasksPromise} />
      </Suspense>
    </Box>
  )
}

/**
 * The Fallback component displays a skeleton placeholder while data is loading.
 * It mimics the structure of a task list item for improved UX.
 *
 * @returns A React component displaying a skeleton placeholder.
 */
function Fallback() {
  return (
    <ListItem disablePadding>
      <ListItemButton dense>
        <ListItemText
          primary={<Skeleton width={100} />}
          secondary={<Skeleton width={170} />}
          slotProps={{
            primary: { variant: 'h5' },
            secondary: { variant: 'body1' },
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
