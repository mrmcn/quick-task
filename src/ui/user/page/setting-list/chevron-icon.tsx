import { sxUser } from '@/ui/user/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemIcon from '@mui/material/ListItemIcon'

export default function ChevronIcon() {
  return (
    <ListItemIcon sx={sxUser.chevron}>
      <ChevronRightIcon fontSize='small' />
    </ListItemIcon>
  )
}
