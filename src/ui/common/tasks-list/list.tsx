import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { $Enums } from '@prisma/client'
import Link from 'next/link'
import EditStatusForm from './edit-status-form'

export default function TasksList({ tasks }: { tasks: TasksListProps[] }) {
  const tasksList =
    tasks.length !== 0 ? (
      tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
        />
      ))
    ) : (
      <Empty />
    )

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        mt: { xs: '3vh', sm: '5vh' },
      }}
    >
      {tasksList}
    </List>
  )
}

function Task({ task }: { task: TasksListProps }) {
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

function Empty() {
  return (
    <Box sx={{ mt: '5vh' }}>
      <Typography
        component='h1'
        variant='h4'
        align='center'
      >
        This is empty for now. Create a new task.
      </Typography>
    </Box>
  )
}

export interface TasksListProps {
  id: string
  summary: string
  details: string
  priority: $Enums.Priority
  status: $Enums.Status
}
