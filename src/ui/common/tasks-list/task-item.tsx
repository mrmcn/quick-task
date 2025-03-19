import { auth } from '@/auth'
import { DASHBOARD_EDIT_URL, SIGNIN_URL } from '@/lib/constants/url'
import { TaskData } from '@/lib/services/queries/task'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import Link from 'next/link'
import UpdateTaskStatus from './update-status-form'

export default async function TaskItem({ task }: TaskItem) {
  const { title, details } = task
  const { href, renderTaskStatus } = await getTaskNavigationAndStatus(task)

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

export function TaskItemSkeleton() {
  return [1, 2, 3].map((i) => (
    <ListItem
      key={i}
      disablePadding
    >
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
  ))
}

async function getTaskNavigationAndStatus(task: TaskData) {
  const session = await auth()
  const href = session ? DASHBOARD_EDIT_URL(task.id) : SIGNIN_URL
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
}
