import { AccordionTaskProps } from '@/lib/definitions'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function AccordionTask({
  id,
  summary,
  details,
}: AccordionTaskProps) {
  return (
    <Accordion elevation={5}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${id}-content`}
        id={`panel${id}-header`}
      >
        <Typography component='span'>
          <Box sx={{ fontSize: 20 }}>{summary}</Box>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ color: 'success.main', ml: 5 }}>{details}</Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </AccordionActions>
    </Accordion>
  )
}
