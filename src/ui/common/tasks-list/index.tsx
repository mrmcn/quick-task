import { auth } from '@/auth'
import { ListPhrases } from '@/lib/constants/text-const'
import {
  FetchData,
  fetchUserTasksData,
  UserTasksResult,
} from '@/lib/services/queries/task'
import {
  getSearchParams,
  OptionalSearchParamsObject,
  SearchParamsObject,
} from '@/lib/utils/get-search-params'
import PaginationRow from '@/ui/dashboard/page/pagination'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import TaskListItemSwipeable from './swipeable-list-items'

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
            <TaskListContent
              tasksDataPromise={tasksDataPromise}
              searchParamsObject={searchParamsObject}
            />
          </Suspense>
        </List>
      </Box>
      <Suspense>
        <PaginationRow tasksDataPromise={tasksDataPromise} />
      </Suspense>
    </Box>
  )
}

async function TaskListContent({
  searchParamsObject,
  tasksDataPromise,
}: TaskListContentProps) {
  const { tasks, notTasks } = await processTasksData(tasksDataPromise)

  if (notTasks) return <EmptyState searchParamsObject={searchParamsObject} />
  const session = await auth()
  const taskItem = tasks?.map((task) => (
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
  const tasks = data.tasks
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
  tasksDataPromise: FetchData<UserTasksResult>
}

interface TasksListProps {
  searchParamsObject?: SearchParamsObject | undefined
}
