import { ListPhrases } from '@/lib/constants/text-const'
import {
  fetchCountNumberPagesTasks,
  fetchUserTasksData,
  UserTasks,
} from '@/lib/services/queries/task'
import { HandleErrorProps } from '@/lib/utils/error-handling'
import {
  getSearchParams,
  SearchParamsObject,
  SearchParamsObjectProps,
} from '@/lib/utils/get-search-params'
import TaskItem from '@/ui/common/home/page-blocks/tasks-list/task-item'
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

export default async function TasksList({
  searchParamsObject,
}: SearchParamsObjectProps) {
  const query = getSearchParams(searchParamsObject).query
  const countPages = await fetchCountNumberPagesTasks(query)

  return (
    <>
      <Box
        component='article'
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Suspense>
          <PaginationRow countPages={countPages} />
        </Suspense>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <List
          sx={{
            maxWidth: 'md',
            width: { xs: '90%', md: '100%' },
          }}
        >
          <Suspense fallback={<TaskItemSkeleton />}>
            <SuspenseTaskList searchParamsObject={searchParamsObject} />
          </Suspense>
        </List>
      </Box>
    </>
  )
}

async function SuspenseTaskList({
  searchParamsObject,
}: SearchParamsObjectProps) {
  const { data, error } = await fetchUserTasksData(searchParamsObject)

  return (
    <TaskListContent
      data={data}
      error={error}
      searchParamsObject={searchParamsObject}
    />
  )
}

function TaskListContent({
  data,
  error,
  searchParamsObject,
}: TaskListContentProps) {
  const { query } = getSearchParams(searchParamsObject)
  if (error && error.type !== 'database') notFound()
  if (!data || data.length === 0)
    return (
      <EmptyState
        error={error}
        query={query}
      />
    )
  return data.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      searchParamsObject={searchParamsObject}
    />
  ))
}

function EmptyState({ error, query }: EmptyStateProps) {
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

function TaskItemSkeleton() {
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

interface TaskListContentProps {
  data: UserTasks | undefined
  error: HandleErrorProps | undefined
  searchParamsObject?: SearchParamsObject | undefined
}

interface EmptyStateProps {
  error: HandleErrorProps | undefined
  query: string
}
