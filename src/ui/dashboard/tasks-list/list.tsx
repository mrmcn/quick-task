import { auth } from '@/auth'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText'
import Link from 'next/link'
import EditStatusForm from './edit-status-form'
import { TasksListProps } from './tasks-list'

export default async function TaskItem({ task }: { task: TasksListProps }) {
  const session = await auth()
  const { id, summary, details } = task

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        href={session ? `/dashboard/${id}/edit` : '/signin'}
        dense
      >
        <ListItemText {...getListItemText(id, summary, details)} />
      </ListItemButton>
      {session ? (
        <EditStatusForm
          id={task.id}
          summary={task.summary}
          status={task.status}
        />
      ) : (
        <CheckBoxIcon color='primary' />
      )}
    </ListItem>
  )
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
