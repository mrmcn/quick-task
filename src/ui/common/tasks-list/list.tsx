import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import EditStatusForm from './edit-status-form'
import { TasksListProps } from './tasks-list'

export default function Task({ task }: { task: TasksListProps }) {
  const { id, summary, status, details } = task

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <EditStatusForm
          id={id}
          summary={summary}
          status={status}
        />
      }
    >
      <ListItemButton
        component={Link}
        href={`/dashboard/${id}/edit`}
        role={undefined}
        dense
      >
        <ListItemIcon>
          <IconButton
            edge='start'
            aria-label='edit'
          >
            <EditIcon />
          </IconButton>
        </ListItemIcon>
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
