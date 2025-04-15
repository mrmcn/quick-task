import { ListPhrases } from '@/lib/constants/text-const'
import {
  fetchUserTasksData,
  UserTasksResult,
} from '@/lib/services/queries/task'
import Await from '@/lib/utils/await'
import {
  getSearchParams,
  OptionalSearchParamsObject,
  SearchParamsObject,
} from '@/lib/utils/get-search-params'
import TaskItem from '@/ui/common/tasks-list/task-item'
import PaginationRow from '@/ui/dashboard/page/pagination'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

export default async function TasksList({
  searchParamsObject,
}: TasksListProps) {
  const tasksDataPromise = fetchUserTasksData(searchParamsObject)

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box component='main'>
        <List
          sx={{
            width: { xs: '90%', sm: '95%' },
          }}
        >
          <Suspense fallback={<Fallback />}>
            <Await promise={tasksDataPromise}>
              <TaskListContent searchParamsObject={searchParamsObject} />
            </Await>
          </Suspense>
        </List>
      </Box>
      <Suspense>
        <PaginationRow tasksDataPromise={tasksDataPromise} />
      </Suspense>
    </Box>
  )
}

function TaskListContent({ searchParamsObject, data }: TaskListContentProps) {
  const { tasks, notTasks } = processTasksData(data)

  if (notTasks) return <EmptyState searchParamsObject={searchParamsObject} />

  const taskItem = tasks?.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      searchParamsObject={searchParamsObject}
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

function processTasksData(data: UserTasksResult | undefined) {
  const tasks = data?.tasks
  const notTasks = !tasks || tasks.length === 0

  return { notTasks, tasks }
}

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

interface EmptyStateProps {
  searchParamsObject: OptionalSearchParamsObject
}

interface TaskListContentProps {
  searchParamsObject: OptionalSearchParamsObject
  data?: UserTasksResult
}

interface TasksListProps {
  searchParamsObject?: SearchParamsObject | undefined
}
