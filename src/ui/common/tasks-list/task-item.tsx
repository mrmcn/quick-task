import { SearchParamsProps } from '@/app/dashboard/page'
import { auth } from '@/auth'
import { DASHBOARD_EDIT_URL, SIGNIN_URL } from '@/lib/constants/url'
import { TaskData } from '@/lib/services/queries/task'
import { formatSearchParams } from '@/lib/utils/format-search-params'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import UpdateTaskStatus from './update-status-form'

export default async function TaskItem({ task, searchParams }: TaskItem) {
  const { title, details } = task
  const { href, renderTaskStatus } = await getTaskNavigationAndStatus(
    task,
    searchParams,
  )

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        href={href}
        dense
      >
        <ListItemText
          primary={title}
          secondary={details}
          slotProps={{
            primary: { variant: 'h5', color: 'textPrimary' },
            secondary: { variant: 'body1', color: 'textSecondary' },
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
  searchParams?: SearchParamsProps,
) {
  const session = await auth()
  // Constructs the URL for editing or deleting a task, including search parameters if the user is authorized.
  // This allows preserving the context of the current page (e.g., filters, sorting, pagination)
  // and returning to it after updating or deleting the task.
  // Uses the formatSearchParams function from the library to convert searchParams to a query string.
  const href = session
    ? `${DASHBOARD_EDIT_URL(task.id)}${formatSearchParams(searchParams)}`
    : SIGNIN_URL

  const renderTaskStatus = session ? (
    <UpdateTaskStatus
      id={task.id}
      title={task.title}
      status={task.status}
    />
  ) : (
    <CheckBoxIcon color='primary' />
  )
  return { href, renderTaskStatus }
}

interface TaskItem {
  task: TaskData
  searchParams?: SearchParamsProps
}
