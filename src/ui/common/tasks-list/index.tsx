import { getSearchParams, SearchParamsProps } from '@/app/dashboard/page'
import { ListPhrases, ListPlaceholder } from '@/lib/constants/text-const'
import { fetchUserTasksData } from '@/lib/services/queries/task'
import { HandleErrorProps } from '@/lib/utils/error-handling'
import TaskItem from '@/ui/common/tasks-list/task-item'
import Search from '@/ui/dashboard/search'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default function TasksList({ searchParams }: TasksListProps) {
  // const totalPages = await fetchInvoicesPages(query)

  return (
    <>
      <Search placeholder={ListPlaceholder.search} />
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
    </>
  )
}

async function SuspenseTaskList({ searchParams }: TasksListProps) {
  const { query, currentPage } = getSearchParams(searchParams)
  const { data, error } = await fetchUserTasksData(query, currentPage)

  if (error && error.type !== 'database') notFound()
  if (!data) return <Empty error={error} />
  if (data.length === 0) return <Empty />
  return data.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
    />
  ))
}

function Empty({ error }: { error?: HandleErrorProps | undefined }) {
  const content = error ? error.message : ListPhrases.createNewTask

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

interface TasksListProps {
  searchParams: SearchParamsProps
}
