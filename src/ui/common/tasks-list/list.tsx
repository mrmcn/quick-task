import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { $Enums } from '@prisma/client'
import Link from 'next/link'
import EditStatusForm from './edit-status-form'

export default function TasksList({ tasks }: { tasks: TasksListProps[] }) {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        mt: { xs: '3vh', sm: '5vh' },
      }}
    >
      {tasks.map(({ id, summary, details, status }) => (
        <ListItem
          key={id}
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
      ))}
    </List>
  )
}

export interface TasksListProps {
  id: string
  summary: string
  details: string
  priority: $Enums.Priority
  status: $Enums.Status
}
