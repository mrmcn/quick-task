import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { AccordionTaskProps } from './tasks-display'
import Link from 'next/link'
import { deleteTask } from '@/lib/actions'

export default function AccordionTask({
  id,
  summary,
  details,
}: AccordionTaskProps) {
  // const deleteTaskWithId = deleteTask.bind(null, id)

  return (
    <Accordion elevation={5}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${summary}-content`}
        id={`panel${summary}-header`}
      >
        <Typography component='span'>
          <Box sx={{ fontSize: 20 }}>{summary}</Box>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ color: 'success.main', ml: 5 }}>{details}</Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button
          component={Link}
          href={`/dashboard/${id}/edit`}
        >
          Edit
        </Button>
        <Button onClick={deleteTask.bind(null, id)}>Delete</Button>
      </AccordionActions>
    </Accordion>
  )
}
