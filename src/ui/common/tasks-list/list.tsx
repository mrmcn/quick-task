import { auth } from '@/auth'
import CheckBox from '@mui/icons-material/CheckBox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import EditStatusForm from './edit-status-form'
import { TasksListProps } from './tasks-list'

export default async function Task({ task }: { task: TasksListProps }) {
  const { id, summary, status, details } = task
  const session = await auth()
  const secondaryAction = session?.user.email ? (
    <EditStatusForm
      id={id}
      summary={summary}
      status={status}
    />
  ) : (
    <CheckBox />
  )

  return (
    <ListItem
      disablePadding
      secondaryAction={secondaryAction}
    >
      <ListItemButton
        component={Link}
        href={`/dashboard/${id}/edit`}
        role={undefined}
        dense
      >
        <ListItemText
          id={id}
          primary={summary}
          secondary={details}
          slotProps={{
            primary: { variant: 'h5', color: 'textPrimary' },
            secondary: { variant: 'body1', color: 'textSecondary' },
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
