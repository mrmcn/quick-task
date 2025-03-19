import { DASHBOARD_CREATE_URL } from '@/lib/constants/url'
import { checkAuth } from '@/lib/utils/check-auth'
import MonitoringScreen from '@/ui/common/monitoring-screen'
import TasksList from '@/ui/common/tasks-list'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Link from 'next/link'

export default function Dashboard() {
  checkAuth()

  return (
    <Box component='main'>
      <MonitoringScreen />
      <CreateTaskFab />
      <TasksList />
    </Box>
  )
}

function CreateTaskFab() {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          position: 'fixed',
          top: '85%',
          left: '70%',
        },
      }}
    >
      <Fab
        component={Link}
        href={DASHBOARD_CREATE_URL}
        color='primary'
        aria-label='add'
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}
