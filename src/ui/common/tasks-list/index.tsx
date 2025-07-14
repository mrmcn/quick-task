import { fetchTask } from '@/lib/services/queries/task'
import TasksItems from '@/ui/common/tasks-list//tasks-items'
import { TasksListProps } from '@/ui/common/tasks-list/types'
import PaginationRow from '@/ui/dashboard/page/pagination'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import { Suspense } from 'react'

export default async function TasksList({
  searchParamsObject,
}: TasksListProps) {
  const userTasksPromise = fetchTask.userTasksData(searchParamsObject)

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box component='main'>
        <List>
          <Suspense fallback={<Fallback />}>
            <TasksItems
              userTasksPromise={userTasksPromise}
              searchParamsObject={searchParamsObject}
            />
          </Suspense>
        </List>
      </Box>
      <Suspense>
        <PaginationRow userTasksPromise={userTasksPromise} />
      </Suspense>
    </Box>
  )
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
