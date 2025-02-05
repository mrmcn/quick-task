import TasksDisplay, {
  AccordionTaskProps,
} from '@/ui/common/accordion-tasks/tasks-display'
import AddTaskBtn from '@/ui/common/create-task-btn'
import ControlDisplay from '@/ui/common/control-display'
import { Box } from '@mui/material'

const tasksSample: AccordionTaskProps[] = [
  { id: '1', summary: 'Sample 1', details: 'Details task 1', priority: 'high' },
  { id: '2', summary: 'Sample 2', details: 'Details task 2', priority: 'high' },
  { id: '3', summary: 'Sample 3', details: 'Details task 3', priority: 'high' },
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
