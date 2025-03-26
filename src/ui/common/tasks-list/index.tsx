import { SearchParamsProps } from '@/app/dashboard/page'
import { ListPhrases, ListPlaceholder } from '@/lib/constants/text-const'
import {
  fetchCountNumberPagesTasks,
  fetchUserTasksData,
  UserTasks,
} from '@/lib/services/queries/task'
import { HandleErrorProps } from '@/lib/utils/error-handling'
import TaskItem from '@/ui/common/tasks-list/task-item'
import PaginationRow from '@/ui/dashboard/page/pagination'
import Search from '@/ui/dashboard/page/search'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function TasksList({ searchParams }: TasksListProps) {
  const { query } = getSearchParams(searchParams)
  const response = await fetchCountNumberPagesTasks(query)

  return (
    <>
      <Suspense>
        <Search placeholder={ListPlaceholder.search} />
      </Suspense>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          mt: { xs: '3vh', sm: '3vh' },
        }}
      >
        <Suspense fallback={<TaskItemSkeleton />}>
          <SuspenseTaskList searchParams={searchParams} />
        </Suspense>
      </List>
      <Suspense>
        <PaginationRow data={response} />
      </Suspense>
    </>
  )
}

async function SuspenseTaskList({ searchParams }: TasksListProps) {
  const { query, currentPage } = getSearchParams(searchParams)
  const { data, error } = await fetchUserTasksData(query, currentPage)

  return (
    <TaskListContent
      data={data}
      error={error}
      searchParams={searchParams}
    />
  )
}

function TaskListContent({ data, error, searchParams }: TaskListContentProps) {
  const { query } = getSearchParams(searchParams)
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
      searchParams={searchParams}
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

export const getSearchParams = (searchParams: SearchParamsProps) => {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  return { query, currentPage }
}

interface TasksListProps {
  searchParams?: SearchParamsProps
}

interface TaskListContentProps {
  data: UserTasks | undefined
  error: HandleErrorProps | undefined
  searchParams?: SearchParamsProps
}

interface EmptyStateProps {
  error: HandleErrorProps | undefined
  query: string
}
