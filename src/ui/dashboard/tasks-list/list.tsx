import { auth } from '@/auth'
import CheckBox from '@mui/icons-material/CheckBox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText'
import Link from 'next/link'
import EditStatusForm from './edit-status-form'
import { TasksListProps } from './tasks-list'

export default function TaskItem({ task }: { task: TasksListProps }) {
  const { id, summary, details } = task

  return (
    <ListItem
      disablePadding
      secondaryAction={secondaryAction(task)}
    >
      <ListItemButton
        component={Link}
        href={`/dashboard/${id}/edit`}
        dense
      >
        <ListItemText {...getListItemText(id, summary, details)} />
      </ListItemButton>
    </ListItem>
  )
}

const secondaryAction = async (task: TasksListProps) => {
  const session = await auth()
  if (session?.user.email) {
    return (
      <EditStatusForm
        id={task.id}
        summary={task.summary}
        status={task.status}
      />
    )
  } else {
    return <CheckBox />
  }
}

const getListItemText = (
  id: string,
  primary: string,
  secondary: string,
): ListItemTextProps => ({
  id,
  primary,
  secondary,
  slotProps: {
    primary: { variant: 'h5', color: 'textPrimary' },
    secondary: { variant: 'body1', color: 'textSecondary' },
  },
})
