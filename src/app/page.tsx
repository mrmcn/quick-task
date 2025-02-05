import TasksDisplay from '@/ui/common/accordion-tasks/tasks-display'
import AddTaskBtn from '@/ui/common/create-task-btn'
import ControlDisplay from '@/ui/common/control-display'
import { Box } from '@mui/material'

const tasksSample = [
  { id: '1', summary: 'Sample 1', details: 'Details task 1' },
  { id: '2', summary: 'Sample 2', details: 'Details task 2' },
  { id: '3', summary: 'Sample 3', details: 'Details task 3' },
]

export default function RootPage() {
  return (
    <Box component='main'>
      <ControlDisplay
        completed={1}
        pending={2}
        progress={33}
      />
      <AddTaskBtn />
      <TasksDisplay tasks={tasksSample} />
    </Box>
  )
}
