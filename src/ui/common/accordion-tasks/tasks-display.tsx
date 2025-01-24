import { AccordionTaskProps } from '@/lib/definitions'
import AccordionTask from '@/ui/common/accordion-tasks/accordion-task'
import { Box } from '@mui/material'

export default function TasksDisplay({
  tasks,
}: {
  tasks: AccordionTaskProps[]
}) {
  const listItem = tasks.map(({ id, summary, details }) => (
    <AccordionTask
      key={id}
      id={id}
      summary={summary}
      details={details}
    />
  ))

  return <Box sx={{ mt: '5vh' }}>{listItem}</Box>
}
