import { auth } from '@/auth'
import { DASHBOARD_EDIT_URL, SIGNIN_URL } from '@/lib/constants/url'
import { TaskData } from '@/lib/services/queries/task'
import { formatSearchParams } from '@/lib/utils/format-search-params'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import UpdateTaskStatus from './update-status-form'

export default async function TaskItem({ task, searchParamsObject }: TaskItem) {
  const { href, renderTaskStatus } = await getTaskNavigationAndStatus(
    task,
    searchParamsObject,
  )

  return (
    <ListItem
      disablePadding
      sx={{
        m: 1,
        bgcolor: 'secondary.light',
      }}
    >
      <ListItemButton
        component={Link}
        href={href}
        dense
      >
        <ListItemText
          primary={task.title}
          secondary={task.details}
          sx={{ color: 'primary.contrastText' }}
          slotProps={{
            primary: { variant: 'h5' },
            secondary: { variant: 'body1', color: 'primary.contrastText' },
          }}
        />
      </ListItemButton>
      {renderTaskStatus}
    </ListItem>
  )
}

// This function determines the URL for editing and deleting a task, depending on whether the user is authorized,
// and returns a component that displays the task status.

async function getTaskNavigationAndStatus(
  task: TaskData,
  searchParamsObject?: Props,
) {
  const session = await auth()
  // Constructs the URL for editing or deleting a task, including search parameters if the user is authorized.
  // This allows preserving the context of the current page (e.g., filters, sorting, pagination)
  // and returning to it after updating or deleting the task.
  // Uses the formatSearchParams function from the library to convert searchParams to a query string.
  if (session)
    return {
      href: `${DASHBOARD_EDIT_URL(task.id)}${formatSearchParams(
        searchParamsObject,
      )}`,
      renderTaskStatus: (
        <UpdateTaskStatus
          id={task.id}
          title={task.title}
          status={task.status}
        />
      ),
    }

  return {
    href: SIGNIN_URL,
    renderTaskStatus: <Checkbox color='secondary' />,
  }
}

interface TaskItem {
  task: TaskData
  searchParamsObject?: Props
}

type Props = SearchParamsObject | undefined
